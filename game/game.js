document.addEventListener("DOMContentLoaded", init, false);
function init(){
  var video = document.getElementById("");
  var source = document.createElement("spurce");
  source.setAttribute("src", "http://mooplay.challet.eu/media/video/sintel-1024-stereo.mp4");
  video.appendChild(source);
  video.addEventListener("load", onImage, false);
}

function onImage(){
  var pieceWidth = Math.floor(video.width/4);
  var pieceHeight = Math.floor(video.height/4);
  var puzzleWidth = pieceWidth*4;
  var puzzleHeight = pieceHeight*4;
  var canvas = document.getElementById("");
  context = canvas.getContext("2d");
  canvas.width = puzzleWidth;
  canvas.height = puzzleHeight;
  initPuzzle();
}


function initPuzzle(){
  var i;
  var pieces = [];
  var mouse = {x:0, y:0};
  var xPos;
  var yPos;
  var curPiece = null;
  var curDropPiece = null;
  context.drawImage(video, 0, 0, puzzleWidth, puzzleHeight);
  for(i=0; i<16; i++){
     pieces[i].sx = xPos;
     pieces[i].sy = yPos;
     xPos += pieceWidth;
     if(xPos >= puzzleWidth){
        xPos = 0;
        yPos += pieceHeigth;
     }
     
  }
  
  
}
