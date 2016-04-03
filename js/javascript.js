/* Global variables*/
var xPosition = 0;
var yPosition = 0;
var numberPieces = 16;
var puzzleWidth = 0;
var puzzleHeight = 0;
var pieceWidth = 0;
var pieceHeight = 0; 
var clickCounter = 0; //Will be != 1 if we've already launched the game
var seconds = 0; //Second counter
var start;
var timer;
var minutes = 0;
var video;
var canvas;
var container;
var context;
var pieces = [];

/* Initial set ups*/
window.onload = function() {
  button = document.getElementById("play-button");
  button.addEventListener('click', switchButton);
  canvas = document.getElementById("game-screen");
  container = document.getElementById("puzzle-board");
  video = document.getElementById("video");
  init();
  
}

function init() {
  if(canvas && canvas.getContext) { //Checking if the nav is compatible
  context = canvas.getContext('2d');
  // Drawing the game board
  puzzleWidth = container.offsetWidth;
  console.log("Ancho del puzzle"+ puzzleWidth);
  puzzleHeight = container.offsetHeight;
  console.log("Alto del puzzle"+ puzzleHeight);
  pieceWidth = puzzleWidth/Math.sqrt(numberPieces);
  console.log("Ancho de las piezas"+ pieceWidth);
  pieceHeight = puzzleHeight/Math.sqrt(numberPieces);
  console.log("Alto de las piezas"+ pieceHeight);
  canvas.width = puzzleWidth;
  canvas.height = puzzleHeight;
  context.drawImage(video, 0, 0, puzzleWidth, puzzleHeight, 0, 0, puzzleWidth, puzzleHeight);
  createBoard();
  }else { // Canvas-unsupported code
    // TODO: Añadir nodo al DOM con un p que diga que no se pue
  }
}

function counter() {
  var hours = Math.floor(seconds/3600);
  //var minutes = Math.floor(((seconds/3600)%1)*60); //%1 extracts decimal part of hours
  seconds++;
  console.log("horas: "+hours);
  console.log("minutos: "+minutes);
  console.log("segundos: "+seconds);
  date = new Date(null, null, null, hours, minutes, seconds, null); //We don't need to show year, month, day or millisecs
  /*Showing the result*/
  console.log("date (objeto Date): "+date);
  date = date.toTimeString().split(" ");
  console.log("date tras split: "+date);
  displayedDate = date[0]; //To erase the GMT part of the date string
  console.log("Date: "+displayedDate);
  document.getElementById("game-counter").innerHTML = displayedDate;
  if(seconds >= 60) {
    seconds = 0;
    minutes++
  }
}

/* Switching the button to play/pause*/
function switchButton() {
  if(button.id == "play-button") {
      clickCounter++;
      button.setAttribute("src", "images/vizzle_pause.svg");
      button.setAttribute("id", "pause-button");
      if(clickCounter == 1) { // Launch the game
          //start = new Date(); //Variable that stores the date when play button is pushed
          counter();
          timer = setInterval(counter, 1000); //We need to execute counter() each second (1000 miliseconds)
      }else { // Resume the game
          timer = setInterval(counter, 1000);
      }
  }else { // Game paused
      clickCounter++;
      button.setAttribute("src", "images/vizzle_play.svg");
      button.setAttribute("id", "play-button");
      clearInterval(timer);
  }
}

//function canvas() {
//  if(canvas && canvas.getContext) { //Checking if the nav is compatible
//    var context = canvas.getContext('2d');
//    context.fillRect(50, 0, 10, 150);
//  }
//}

function createBoard() {
  var i, piece;
  var xAux = 0;
  var yAux = 0;
  if(canvas && canvas.getContext) { //Checking if the nav is compatible
    for(i = 0; i < 20 ; i++) {
      piece = {};
      piece.xPosition = xAux;
      piece.yPosition = yAux;
      pieces.push(piece);
      /*context.fillStyle= "red";
      context.fillRect(xAux, yAux, pieceWidth, pieceHeight);
      context.strokeRect(xAux, yAux, pieceWidth, pieceHeight);*/
      xAux += pieceWidth;
      if(xAux > puzzleWidth) {
        yAux += pieceHeight;
        xAux = 0;
      }
    }
    //document.onmousedown = shufflePuzzle;
  }else { // Canvas-unsupported code
    // TODO: Añadir nodo al DOM con un p que diga que no se pue
  }
}

/* Shuffleing the pieces basing on the Fisher–Yates shuffle algorithm:*/
function shuffleArray(arrayPieces) {
  var shuffleCounter = arrayPieces.length;
  //We go down the array
  while(shuffleCounter > 0) {
    //Getting a random index
    var index = Math.floor(Math.random*shuffleCounter);
    shuffleCounter--;
    var aux = arrayPieces[shuffleCounter];
    arrayPieces[shuffleCounter] = arrayPieces[index];
    arrayPieces[index] = aux;
  }
  return arrayPieces;
}

function shufflePuzzle() {
  pieces = shuffleArray(pieces);
  context.clearRect(0, 0, puzzleWidth, puzzleHeight);
  var i, piece;
  var xAux = 0;
  var yAux = 0;
  for(i = 0; i < pieces.length; i++) {
    piece = pieces[i];
    piece.xPosition = xAux;
    piece.yPosition = yAux;
    console.log("xPosition "+ xPosition)
    context.drawImage(video, piece.xPosition, piece.yPosition, pieceWidth, pieceHeight, xAux, yAux, pieceWidth, pieceHeight);
    context.strokeRect(xAux, yAux, pieceWidth, pieceHeight);
    xAux += pieceWidth;
      if(xAux>puzzleWidth) {
        yAux += pieceHeight;
        xAux = 0;
      }
  }
}