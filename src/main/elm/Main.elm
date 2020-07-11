port module Main exposing (main)

import Array exposing (Array)
import Bitwise
import Browser
import Browser.Dom as Dom
import Browser.Events as Events
import Common exposing (..)
import File
import Image exposing (Image)
import Json.Decode as JsonDecode
import Task
import Time
import Tuple
import View exposing (view)


-- JSON
decodeSpaceDelimitedSize : String -> Maybe Size
decodeSpaceDelimitedSize spaceDelimited =
  case String.split " " (String.trim spaceDelimited) of
    [ widthStr, heightStr ] ->
      Maybe.map2 Size
      (String.toInt widthStr)
      (String.toInt heightStr)
    _ -> Nothing


decodeSpaceDelimitedCell : String -> Maybe Cell
decodeSpaceDelimitedCell spaceDelimited =
  case String.split " " (String.trim spaceDelimited) of
    [ xStr, yStr, wStr, hStr, factorStr] ->
      Maybe.map2 Cell
      ( Maybe.map2 Rect
        ( Maybe.map2 Point
          (String.toInt xStr)
          (String.toInt yStr)
        )
        ( Maybe.map2 Size
          (String.toInt wStr)
          (String.toInt hStr)
        )
      )
      (String.toFloat factorStr)
    _ -> Nothing


featureJsonDecoder : JsonDecode.Decoder Feature
featureJsonDecoder =
  JsonDecode.map2 Feature
  ( JsonDecode.at [ "rects", "_" ]
    ( JsonDecode.list
      ( JsonDecode.andThen
        ( \spaceDelimitedRect ->
          case decodeSpaceDelimitedCell spaceDelimitedRect of
            Just rect -> JsonDecode.succeed rect
            Nothing -> JsonDecode.fail "Unable to parse rect string"
        )
        JsonDecode.string
      )
    )
  )
  ( JsonDecode.map
    ( Maybe.withDefault False )
    ( JsonDecode.maybe ( JsonDecode.field "tilted" JsonDecode.bool ) )
  )


cascadeOldJsonDecoder : JsonDecode.Decoder Cascade
cascadeOldJsonDecoder =
  JsonDecode.at [ "opencv_storage", "cascade" ]
  ( JsonDecode.map2 Cascade
    ( JsonDecode.andThen
      ( \spaceDelimitedSize ->
        case decodeSpaceDelimitedSize spaceDelimitedSize of
          Just cascade -> JsonDecode.succeed cascade
          Nothing -> JsonDecode.fail "Unable to parse size string"
      )
      ( JsonDecode.field "size" JsonDecode.string )
    )
    ( JsonDecode.at [ "stages", "_" ]
      ( JsonDecode.array
        ( JsonDecode.map2 Stage
          ( JsonDecode.at [ "stage_threshold" ] JsonDecode.float )
          ( JsonDecode.at [ "trees", "_" ]
            ( JsonDecode.array
              ( JsonDecode.field "_"
                ( JsonDecode.map3 WeakClassifier
                  ( JsonDecode.field "feature" featureJsonDecoder )
                  ( JsonDecode.field "threshold" JsonDecode.float )
                  ( JsonDecode.map2 Tuple.pair
                    ( JsonDecode.field "left_val" JsonDecode.float )
                    ( JsonDecode.field "right_val" JsonDecode.float )
                  )
                )
              )
            )
          )
        )
      )
    )
  )


decodeSpaceDelimitedInternalNode : String -> Maybe (Int, Float)
decodeSpaceDelimitedInternalNode spaceDelimited =
  case String.split " " (String.trim spaceDelimited) of
    [ _, _, featureIdxStr, thresholdStr ] ->
      Maybe.map2 Tuple.pair
      (String.toInt featureIdxStr)
      (String.toFloat thresholdStr)
    _ -> Nothing


decodeSpaceDelimitedFloatPair : String -> Maybe (Float, Float)
decodeSpaceDelimitedFloatPair spaceDelimited =
  case String.split " " (String.trim spaceDelimited) of
    [ leftStr, rightStr ] ->
      Maybe.map2 Tuple.pair
      (String.toFloat leftStr)
      (String.toFloat rightStr)
    _ -> Nothing


cascadeNewJsonDecoder : JsonDecode.Decoder Cascade
cascadeNewJsonDecoder =
  JsonDecode.andThen
  ( \features ->
    ( JsonDecode.map2 Cascade
      ( JsonDecode.map2 Size
        ( JsonDecode.at [ "opencv_storage", "cascade", "width" ] JsonDecode.int )
        ( JsonDecode.at [ "opencv_storage", "cascade", "height" ] JsonDecode.int )
      )
      ( JsonDecode.at [ "opencv_storage", "cascade", "stages", "_" ]
        ( JsonDecode.array
          ( JsonDecode.map2 Stage
            ( JsonDecode.field "stageThreshold" JsonDecode.float )
            ( JsonDecode.at [ "weakClassifiers", "_" ]
              ( JsonDecode.array
                ( JsonDecode.andThen
                  ( \(featureIdx, threshold, leafValues) ->
                    case Array.get featureIdx features of
                      Just feature ->
                        JsonDecode.succeed (WeakClassifier feature threshold leafValues)
                      Nothing ->
                        JsonDecode.fail ("feature index " ++ (String.fromInt featureIdx) ++ "is out of range")
                  )
                  ( JsonDecode.map2
                    ( \(featureIdx, threshold) -> \leafValues ->
                      ( featureIdx, threshold, leafValues )
                    )
                    ( JsonDecode.field "internalNodes"
                      ( JsonDecode.andThen
                        ( \spaceDelimitedInternalNodes ->
                          case decodeSpaceDelimitedInternalNode spaceDelimitedInternalNodes of
                            Just featureIdxThreshold -> JsonDecode.succeed featureIdxThreshold
                            Nothing -> JsonDecode.fail "Unable to parse internalNodes string"
                        )
                        JsonDecode.string
                      )
                    )
                    ( JsonDecode.field "leafValues"
                      ( JsonDecode.andThen
                        ( \spaceDelimitedPair ->
                          case decodeSpaceDelimitedFloatPair spaceDelimitedPair of
                            Just leafValues -> JsonDecode.succeed leafValues
                            Nothing -> JsonDecode.fail "Unable to parse leafValues string"
                        )
                        JsonDecode.string
                      )
                    )
                  )
                )
              )
            )
          )
        )
      )
    )
  )
  ( JsonDecode.at [ "opencv_storage", "cascade", "features", "_" ] (JsonDecode.array featureJsonDecoder) )


cascadeJsonDecoder : JsonDecode.Decoder Cascade
cascadeJsonDecoder =
  JsonDecode.oneOf [ cascadeOldJsonDecoder, cascadeNewJsonDecoder ]


-- INIT
init : Flags -> (Model, Cmd Msg)
init flags =
  ( let
      model : Model
      model =
        { cascade =
          { size = { width = 0, height = 0 }
          , stages = Array.empty
          }
        , image =
          { url = defaultImageUrl
          , maybeGrayscalePixels = Nothing
          }
        , maybeDetection = Nothing
        , renderedImageWidthPx = 0
        , otherContentWidthPx = defaultOtherContentWidthPx
        , maybeErrorMsg = Nothing
        }
    in
      case JsonDecode.decodeValue cascadeJsonDecoder flags.cascadeJsonValue of
        Ok cascade -> { model | cascade = cascade }
        Err jsonErr -> { model | maybeErrorMsg = Just (JsonDecode.errorToString jsonErr) }
  , Cmd.batch
    [ getImagePixelsCmd { url = defaultImageUrl, longEdgePx = imageLongEdgePx }
    , Task.attempt RenderedImageSize (Dom.getElement "image")
    ]
  )


-- UPDATE
port getImagePixelsCmd : { url : String, longEdgePx : Int } -> Cmd msg
--port drawImagePixelsCmd : { width : Int, height: Int, data: Array Int } -> Cmd msg
port parseXmlCmd : String -> Cmd msg


--pixelFactorsImage : Pixels Int -> Image
--pixelFactorsImage pixelFactors =
--  Image.fromArray pixelFactors.size.width
--  ( Array.map
--    ( \px ->
--      if px == 0 then 0x000000FF -- Black for zero
--      else if px > 0 then
--        (Bitwise.shiftLeftBy 8 (px * 128 - 1)) + -- Blue for positive
--        0xFF -- A
--      else
--        (Bitwise.shiftLeftBy 24 (-px * 128 - 1)) + -- Red for Negative
--        0xFF -- A
--    )
--    pixelFactors.data
--  )
--
--
featureExtractionImage : Pixels Int -> Image
featureExtractionImage pixels =
  Image.fromArray pixels.size.width
  ( Array.map
    ( \unadjPx ->
      let
        px : Int
        px =
          max 0
          ( min 255
            ( if unadjPx < 0 then 255 + unadjPx else unadjPx )
          )
      in
        (Bitwise.shiftLeftBy 24 px) + -- R
        (Bitwise.shiftLeftBy 16 px) + -- G
        (Bitwise.shiftLeftBy 8 px) + -- B
        0xFF -- A
    )
    pixels.data
  )


weakClassify : Cascade -> Int -> Int -> Pixels Int -> Maybe WeakClassification
weakClassify cascade stageIdx classifierIdx image =
  Maybe.map
  ( \classifier ->
    let
      pixelFeatureFactors : Array Int
      pixelFeatureFactors =
        List.foldl
        ( \cell pixels ->
          let
            magnification : Int
            magnification = image.size.width // cascade.size.width

            left : Int
            left = cell.rect.location.x * magnification

            right : Int
            right = left + cell.rect.size.width * magnification

            top : Int
            top = cell.rect.location.y * magnification

            bottom: Int
            bottom = top + cell.rect.size.height * magnification
          in
            Array.indexedMap
            ( \idx px ->
              let
                col : Int
                col = modBy image.size.width idx

                row : Int
                row = idx // image.size.width
              in
                if col >= left && col < right && row >= top && row < bottom then
                  round (toFloat px + cell.factor)
                else px
            )
            pixels
        )
        ( Array.repeat (image.size.width * image.size.height) 0 )
        classifier.feature.cells

      pixelFeatureValues : Array Int
      pixelFeatureValues =
        Array.indexedMap
        ( \idx px ->
          (px + 1) * (Maybe.withDefault 0 (Array.get idx pixelFeatureFactors))
        )
        image.data

      featureValue : Float
      featureValue =
        ( toFloat (Array.foldl (+) 0 pixelFeatureValues) ) /
        ( toFloat (Array.length pixelFeatureValues) ) / 255.0
    in
      { featureExtractedImageDataUrl =
        Image.toPngUrl
        ( featureExtractionImage
          { size = image.size, data = pixelFeatureValues }
        )
      , value = featureValue
      , success = featureValue >= classifier.threshold
      }
  )
  ( Maybe.andThen
    ( Array.get classifierIdx << .weakClassifiers )
    ( Array.get stageIdx cascade.stages )
  )


scrollToClassification : String -> Cmd Msg
scrollToClassification id =
  Task.attempt
  ( always NoOp )
  ( Task.andThen
    ( \scrollY ->
      Dom.setViewportOf "model-column" 0 scrollY
    )
    ( Task.map2
      ( \containerInfo classifierInfo ->
        containerInfo.viewport.y + classifierInfo.element.y
      )
      ( Dom.getViewportOf "model-column" )
      ( Dom.getElement id )
    )
  )


update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    CascadeFiles files ->
      ( model
      , case files of
          file :: _ ->
            Task.perform CascadeXml (File.toString file)
          [] -> Cmd.none
      )

    CascadeXml cascadeXml ->
      ( model, parseXmlCmd cascadeXml )

    CascadeResult cascadeRes ->
      ( case cascadeRes of
        Ok cascade ->
          { model
          | cascade = cascade
          , maybeDetection = Nothing
          , maybeErrorMsg = Nothing
          }
        Err err ->
          { model
          | maybeErrorMsg = Just ("Failed to parse XML: " ++ err)
          }
      , Cmd.none
      )

    ImageFiles files ->
      ( model
      , case files of
          file :: _ ->
            Task.perform ImageDataUrl (File.toUrl file)
          [] -> Cmd.none
      )

    ImageDataUrl url ->
      ( { model | image = { url = url, maybeGrayscalePixels = Nothing} }
      , getImagePixelsCmd { url = url, longEdgePx = imageLongEdgePx }
      )

    ImagePixels pixels ->
      let
        image : ImageResource
        image = model.image
      in
        ( { model
          | image = { image | maybeGrayscalePixels = Just pixels }
          }
        , Cmd.none
        )

    CreateCandidateStart imageSize event ->
      ( let
          (clientX, clientY) = event.clientPos

          (offsetX, offsetY) = event.offsetPos

          magnification : Float
          magnification = (toFloat model.renderedImageWidthPx) / (toFloat imageSize.width)

          candidateX : Float
          candidateX = offsetX / magnification

          candidateY : Float
          candidateY = offsetY / magnification

          toRight : Float
          toRight = (toFloat imageSize.width) - candidateX

          toBottom : Float
          toBottom = (toFloat imageSize.height) - candidateY

          cascadeWidth : Float
          cascadeWidth = toFloat model.cascade.size.width

          cascadeHeight : Float
          cascadeHeight = toFloat model.cascade.size.height

          maxSize : Size
          maxSize =
            if toRight / cascadeWidth > toBottom / cascadeHeight then
              { width = round (toBottom * cascadeWidth / cascadeHeight), height = round toBottom }
            else
              { width = round toRight, height = round (toRight * cascadeHeight / cascadeWidth) }
        in
          { model
          | maybeDetection =
            Just
            { candidateArea =
              { location = { x = round candidateX, y = round candidateY }
              , size = model.cascade.size
              }
            , stages = Array.empty
            , status = Initializing
            , maybeDragState =
              Just
              { startClientPoint = { x = round clientX, y = round clientY }
              , minSize = model.cascade.size
              , maxSize = maxSize
              }
            }
          }
      , Cmd.none
      )

    CreateCandidateResize imageSize dragState event ->
      ( { model
        | maybeDetection =
          Maybe.map
          ( \detection ->
            let
              (clientX, clientY) = event.clientPos

              area : Rect
              area = detection.candidateArea

              minWidth : Float
              minWidth = toFloat dragState.minSize.width

              minHeight : Float
              minHeight = toFloat dragState.minSize.height

              maxWidth : Float
              maxWidth = toFloat dragState.maxSize.width

              maxHeight : Float
              maxHeight = toFloat dragState.maxSize.height

              cascadeWidth : Float
              cascadeWidth = toFloat model.cascade.size.width

              cascadeHeight : Float
              cascadeHeight = toFloat model.cascade.size.height

              magnification : Float
              magnification = (toFloat model.renderedImageWidthPx) / (toFloat imageSize.width)

              distXUnrounded : Float
              distXUnrounded = (clientX - (toFloat dragState.startClientPoint.x)) / magnification

              distX : Float
              distX = (toFloat (round (distXUnrounded / cascadeWidth))) * cascadeWidth

              distYUnrounded : Float
              distYUnrounded = (clientY - (toFloat dragState.startClientPoint.y)) / magnification

              distY : Float
              distY = (toFloat (round (distYUnrounded / cascadeHeight))) * cascadeHeight

              size : Size
              size =
                if distX < minWidth || distY < minHeight then dragState.minSize
                else if distX > maxWidth || distY > maxHeight then dragState.maxSize
                else
                  if distX / cascadeWidth > distY / cascadeHeight then
                    { width = round distX, height = round (distX * cascadeHeight / cascadeWidth) }
                  else
                    { width = round (distY * cascadeWidth / cascadeHeight), height = round distY }
            in
              { detection
              | candidateArea = { area | size = size }
              }
          )
          model.maybeDetection
        }
      , Cmd.none
      )

    CreateCandidateStop imagePixels detection ->
      let
        area : Rect
        area = detection.candidateArea

        areaGsPixelData : Array Int
        areaGsPixelData =
          List.foldr Array.append Array.empty
          ( List.map
            ( \row ->
              let
                start : Int
                start = row * imagePixels.size.width + area.location.x

                end : Int
                end = start + area.size.width
              in
                Array.slice start end imagePixels.data
            )
            ( List.range area.location.y (area.location.y + area.size.height - 1) )
          )
      in
        ( { model
          | maybeDetection =
            Just
            { detection
            | stages = Array.empty
            , status = Running -1 -1 { size = area.size, data = areaGsPixelData }
            , maybeDragState = Nothing
            }
          }
        , Cmd.none
        )

    PerformNextDetectionStep ->
      case Maybe.map ( \d -> (d, d.status) ) model.maybeDetection of
        Just (detection, (Running lastStageIdx lastClassifierIdx image)) ->
          case weakClassify model.cascade lastStageIdx (lastClassifierIdx + 1) image of
            Just weakClassification ->
              ( { model
                | maybeDetection =
                  Just
                  { detection
                  | stages =
                    case Array.get lastStageIdx detection.stages of
                      Just weakClassifications ->
                        Array.set lastStageIdx
                        ( Array.push weakClassification weakClassifications )
                        detection.stages
                      Nothing ->
                        detection.stages
                  , status =
                    if not weakClassification.success then Failed
                    else Running lastStageIdx (lastClassifierIdx + 1) image
                  }
                }
                , scrollToClassification
                  ("stage" ++ (String.fromInt lastStageIdx) ++ "-classifier" ++ (String.fromInt (lastClassifierIdx + 1)))
              )

            Nothing ->
              case weakClassify model.cascade (lastStageIdx + 1) 0 image of
                Just weakClassification ->
                  ( { model
                    | maybeDetection =
                      Just
                      { detection
                      | stages =
                        Array.push
                        ( Array.fromList [ weakClassification ] )
                        detection.stages
                      , status =
                        if not weakClassification.success then Failed
                        else Running (lastStageIdx + 1) 0 image
                      }
                    }
                  , scrollToClassification
                    ("stage" ++ (String.fromInt (lastStageIdx + 1)) ++ "-classifier0")
                  )

                Nothing ->
                  ( { model
                    | maybeDetection =
                      Just { detection | status = Succeeded }
                    }
                  , Cmd.none
                  )

        _ ->
          ( model, Cmd.none )

    WindowWidthPx widthPx ->
      ( { model | renderedImageWidthPx = widthPx - model.otherContentWidthPx }
      , getImagePixelsCmd { url = model.image.url, longEdgePx = imageLongEdgePx }
      )

    RenderedImageSize (Ok image) ->
      ( { model
        | renderedImageWidthPx = round image.element.width
        , otherContentWidthPx = round (image.viewport.width - image.element.width)
        }
      , Cmd.none
      )

    RenderedImageSize (Err _) ->
      -- Unable to get image size for some reason, this probably never happens
      ( model
      , Task.perform (WindowWidthPx << round << .width << .viewport) (Dom.getViewport)
      )

    NoOp ->
      ( model, Cmd.none )


-- SUBSCRIPTIONS
port getImagePixelsSub : (ImageData -> msg) -> Sub msg
port parseXmlSub : (JsonDecode.Value -> msg) -> Sub msg


groupSubPixels : Array Int -> Array (Int, Int, Int)
groupSubPixels subPixels =
   let
     (_, pixels) =
      Array.foldl
      ( \subPx (pxAccum, pxs) ->
        case pxAccum of
          [ b, g, r ] -> ([], Array.push (r, g, b) pxs)
          _ -> (subPx :: pxAccum, pxs)
      )
      ([], Array.empty)
      subPixels
   in
     pixels


grayscale : Array (Int, Int, Int) -> Array Int
grayscale rgbPixels =
  Array.map
  ( \(r, g, b) -> round (0.3 * (toFloat r) +  0.59 * (toFloat g) + 0.11 * (toFloat b)))
  rgbPixels


subscriptions : Model -> Sub Msg
subscriptions model =
  Sub.batch
  [ getImagePixelsSub
    ( \imgData ->
      ImagePixels
      { size = { width = imgData.width, height = imgData.height }
      , data = (grayscale (groupSubPixels imgData.pixels))
      }
    )
  , parseXmlSub
    ( CascadeResult
    <<Result.mapError JsonDecode.errorToString
    <<JsonDecode.decodeValue cascadeJsonDecoder
    )
  , case Maybe.map .status model.maybeDetection of
      Just (Running _ _ _) -> Time.every 250 (always PerformNextDetectionStep)
      _ -> Sub.none
  , Events.onResize (\w _ -> WindowWidthPx w)
  ]


-- MAIN
main : Program Flags Model Msg
main =
  Browser.element
  { init = init
  , view = view
  , update = update
  , subscriptions = subscriptions
  }
