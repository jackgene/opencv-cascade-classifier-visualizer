module Common exposing (..)

import Array exposing (Array)
import Browser.Dom as Dom
import File exposing (File)
import Html.Events.Extra.Mouse as Mouse
import Json.Decode as JsonDecode


-- CONSTANTS
modelColumnWidthPx : Int
modelColumnWidthPx = 340

defaultOtherContentWidthPx : Int
defaultOtherContentWidthPx = modelColumnWidthPx + 16

defaultImageUrl : String
defaultImageUrl = "image/puddings.jpg"

imageLongEdgePx : Int
imageLongEdgePx = 480

-- MODEL
type alias Flags =
  { cascadeJsonValue : JsonDecode.Value
  }
type alias Point =
  { x : Int
  , y : Int
  }
type alias Size =
  { width : Int
  , height : Int
  }
type alias Rect =
  { location : Point
  , size : Size
  }

type alias Cell =
  { rect : Rect
  , factor : Float
  }
type alias Feature =
  { cells : List Cell
  , tilted : Bool
  }
type alias WeakClassifier =
  { feature : Feature
  , threshold : Float
  , leafValues : (Float, Float)
  }
type alias Stage =
  { threshold : Float
  , weakClassifiers : Array WeakClassifier
  }
type alias Cascade =
  { size : Size
  , stages : Array Stage
  }

type alias Pixels px =
  { size : Size
  , data : Array px
  }
type alias ImageResource =
  { url : String
  , maybeGrayscalePixels : Maybe (Pixels Int)
  }

type alias WeakClassification =
  { featureExtractedImageDataUrl : String
  , value : Float
  , success : Bool
  }
type DetectionStatus
  = Initializing
  | Running Int Int (Pixels Int)
  | Succeeded
  | Failed
type alias DragState =
  { startClientPoint : Point
  , minSize : Size
  , maxSize : Size
  }
type alias Detection =
  { candidateArea : Rect
  , stages : Array (Array WeakClassification)
  , status : DetectionStatus
  , maybeDragState : Maybe DragState
  }

type alias Model =
  { cascade : Cascade
  , image : ImageResource
  , maybeDetection : Maybe Detection
  , renderedImageWidthPx : Int
  , otherContentWidthPx : Int
  , maybeErrorMsg : Maybe String
  }


type alias ImageData =
  { width : Int
  , height : Int
  , pixels : Array Int
  }
type Msg
  = CascadeFiles (List File)
  | CascadeXml String
  | CascadeResult (Result String Cascade)
  | ImageFiles (List File)
  | ImageDataUrl String
  | ImagePixels (Pixels Int)
  | CreateCandidateStart Size Mouse.Event
  | CreateCandidateResize Size DragState Mouse.Event
  | CreateCandidateStop (Pixels Int) Detection
  | PerformNextDetectionStep
  | WindowWidthPx Int
  | RenderedImageSize (Result Dom.Error Dom.Element)
  | NoOp
