module View exposing (view)

import Array exposing (Array)
import Bitwise
import Common exposing (..)
import File exposing (File)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Html.Events.Extra.Mouse exposing (onDown, onLeave, onMove, onUp)
import Image exposing (Image)
import Json.Decode as JsonDecode


-- VIEW
filesDecoder : JsonDecode.Decoder (List File)
filesDecoder =
  JsonDecode.at [ "target", "files" ] (JsonDecode.list File.decoder)


detectionCandidateImgView : Pixels Int -> Rect -> Html Msg
detectionCandidateImgView imageGrayscalePixels area =
  let
    areaGsPixelData : Array Int
    areaGsPixelData =
      List.foldr Array.append Array.empty
      ( List.map
        ( \row ->
          let
            start : Int
            start = row * imageGrayscalePixels.size.width + area.location.x

            end : Int
            end = start + area.size.width
          in
            Array.slice start end imageGrayscalePixels.data
        )
        ( List.range area.location.y (area.location.y + area.size.height - 1) )
      )

    areaRgbaPixelData : Array Image.Pixel
    areaRgbaPixelData =
      Array.map
      ( \px ->
        (Bitwise.shiftLeftBy 24 px) + -- R
        (Bitwise.shiftLeftBy 16 px) + -- G
        (Bitwise.shiftLeftBy 8 px) + -- B
        0xFF -- A
      )
      areaGsPixelData
  in
    img [ src (Image.toPngUrl (Image.fromArray area.size.width areaRgbaPixelData))] []


featureView : Size -> Feature -> Html Msg
featureView cascadeSize feature =
  let
    widthPx : Float
    widthPx = 120
  in
    div
    [ class "feature"
    , style "width" ((String.fromFloat widthPx) ++ "px")
    , style "height" ((String.fromFloat (toFloat cascadeSize.height / toFloat cascadeSize.width * widthPx)) ++ "px")
    ]
    ( List.map
      ( \cell ->
        let
          x : Int
          x = cell.rect.location.x

          y : Int
          y = cell.rect.location.y

          w : Int
          w = cell.rect.size.width

          h : Int
          h = cell.rect.size.height

          factor : Float
          factor = cell.factor
        in
          div
          [ class "rect"
          , style "left" ((String.fromFloat (toFloat x / toFloat cascadeSize.width * 100)) ++ "%")
          , style "top" ((String.fromFloat (toFloat y / toFloat cascadeSize.height * 100)) ++ "%")
          , style "width" ((String.fromFloat (toFloat w / toFloat cascadeSize.width * 100)) ++ "%")
          , style "height" ((String.fromFloat (toFloat h / toFloat cascadeSize.height * 100)) ++ "%")
          , style "transform" (if feature.tilted then "rotate(45deg)" else "none")
          , style "background-color"
            ( if factor == -1.0 then "#000"
              else if factor == 2.0 then "#CCC"
              else if factor == 3.0 then "#DDD"
              else "#FFF"
            )
          ]
          ( if factor == -1.0 || factor == 2.0 || factor == 3.0 then []
            else [ text (String.fromFloat factor) ]
          )
      )
      feature.cells
    )


weakClassifierView : Size -> Maybe DetectionStatus -> Maybe WeakClassification -> Int -> Int -> WeakClassifier -> Html Msg
weakClassifierView cascadeSize maybeDetectionStatus maybeClassification stageIdx classifierIdx classifier =
  --let
  --  (left, right) = classifier.leafValues
  --in
    li
    ( id ("stage" ++ (String.fromInt stageIdx) ++ "-classifier" ++ (String.fromInt classifierIdx))
    ::class "classifier"
    ::case maybeDetectionStatus of
        Just (Running runningStageIdx _ _) ->
          if stageIdx /= runningStageIdx then []
          else [ class "running" ]
        _ -> []
    )
    ( case maybeClassification of
        Just classification ->
          [ text "Value: "
          , span
            [ class (if classification.value >= classifier.threshold then "positive" else "negative")
            , title ("Threshold: " ++ (String.fromFloat classifier.threshold))
            ]
            [ text (String.fromFloat classification.value) ]
          , br [] []
          , img
            [ width 120, height 120, style "border" "solid black 1px"
            , src classification.featureExtractedImageDataUrl
            ]
            []
          ]
        Nothing ->
          [ text ("Threshold: " ++ (String.fromFloat classifier.threshold))
          , br [] []
          --, text ("/Left: " ++ (String.fromFloat left))
          --, text ("/Right: " ++ (String.fromFloat right))
          , featureView cascadeSize classifier.feature
          ]
    )


stageView : Size -> Maybe DetectionStatus -> Maybe (Array WeakClassification) -> Int -> Stage -> Html Msg
stageView cascadeSize maybeDetectionStatus maybeWeakClassifications stageIdx stage =
  div
  ( class "stage"
  ::case maybeDetectionStatus of
      Just (Running runningStageIdx _ _) ->
        if stageIdx /= runningStageIdx then []
        else [ class "running" ]
      _ -> []
  )
  [ h4 [] [ text ("Stage " ++ (String.fromInt (stageIdx + 1))) ]
  , p [] [ text ("Threshold: " ++ (String.fromFloat stage.threshold)) ]
  , ol []
    ( List.indexedMap
      ( \classifierIdx classifier ->
        weakClassifierView
        cascadeSize maybeDetectionStatus
        ( Maybe.andThen (Array.get classifierIdx) maybeWeakClassifications )
        stageIdx classifierIdx classifier
      )
      ( Array.toList stage.weakClassifiers )
    )
  , hr [] []
  ]


view : Model -> Html Msg
view model =
  div
  ( case (model.image.maybeGrayscalePixels, model.maybeDetection, Maybe.andThen .maybeDragState model.maybeDetection) of
    (Just pixels, Just detection, Just dragState) ->
      [ onMove (CreateCandidateResize pixels.size dragState)
      , onUp (always (CreateCandidateStop pixels detection))
      , onLeave (always (CreateCandidateStop pixels detection))
      ]
    _ -> []
  )
  [ div [ id "image-column", style "right" ((String.fromInt modelColumnWidthPx) ++ "px") ]
    [ div []
      [ label [ for "image-file" ] [ text "Image:" ]
      , input
        [ id "image-file"
        , type_ "file"
        , accept "image/*"
        , multiple False
        , on "change" (JsonDecode.map ImageFiles filesDecoder)
        ]
        []
      ]
    , div
      ( id "image-container"
      ::case model.image.maybeGrayscalePixels of
        Just pixels ->
          [ style "cursor" "crosshair"
          , onDown (CreateCandidateStart pixels.size)
          ]
        Nothing -> []
      )
      ( img
        [ id "image"
        , src model.image.url
        , style "width" "100%"
        ]
        []
      ::case (model.image.maybeGrayscalePixels, model.maybeDetection) of
        (Just pixels, Just detection) ->
          [ div
            ( let
                area : Rect
                area = detection.candidateArea

                magnification : Float
                magnification = (toFloat model.renderedImageWidthPx) / (toFloat pixels.size.width)

                left : Float
                left = (toFloat area.location.x) * magnification

                top : Float
                top = (toFloat area.location.y) * magnification

                width : Float
                width = (toFloat area.size.width) * magnification

                height : Float
                height = (toFloat area.size.height) * magnification
              in
                [ id "detection-candidate"
                , style "left" ((String.fromFloat left) ++ "px")
                , style "top" ((String.fromFloat top) ++ "px")
                , style "width" ((String.fromFloat (Basics.max 0 (width - 4))) ++ "px")
                , style "height" ((String.fromFloat (Basics.max 0 (height - 4))) ++ "px")
                ]
            )
            []
          , detectionCandidateImgView pixels detection.candidateArea
          ]

        _ -> []
      )
    ]
  , div [ id "model-column", style "width" ((String.fromInt modelColumnWidthPx) ++ "px") ]
    [ div []
      [ label [ for "cascade-file" ] [ text "Cascade XML:" ]
      , input
        [ id "cascade-file"
        , type_ "file"
        , accept "text/xml"
        , multiple False
        , on "change" (JsonDecode.map CascadeFiles filesDecoder)
        ]
        []
      ]
    , pre [ class "error" ]
      [ text (Maybe.withDefault "" model.maybeErrorMsg) ]
    , div []
      ( ( text
          ( "h: " ++ (String.fromInt model.cascade.size.height)
          ++", w: " ++ (String.fromInt model.cascade.size.width)
          )
        )
      ::( List.indexedMap
          ( \idx stage ->
            stageView model.cascade.size
            ( Maybe.map .status model.maybeDetection )
            ( Maybe.andThen
              ( Array.get idx << .stages )
              model.maybeDetection
            )
            idx stage
          )
          ( Array.toList model.cascade.stages )
        )
      )
    ]
  ]
