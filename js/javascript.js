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

/* Initial set ups*/
window.onload = function() {
  button = document.getElementById("play-button");
  //canvas = document.getElementById('game-screen');
  button.addEventListener('click', switchButton);
  //canvas.addEventListener('click', drawBoard);
  drawBoard();
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

function drawBoard() {
  var canvas = document.getElementById("game-screen");
  var container = document.getElementById("prueba");
  if(canvas && canvas.getContext) { //Checking if the nav is compatible
    var context = canvas.getContext('2d');
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
    for(i = 0; i <20; i++) {
      context.fillStyle= "red";
      context.fillRect(xPosition, yPosition, pieceWidth, pieceHeight);
      context.strokeRect(xPosition, yPosition, pieceWidth, pieceHeight);
      xPosition += pieceWidth;
      if(xPosition>puzzleWidth) {
        yPosition += pieceHeight;
        xPosition = 0;
      }
    }
  }else { // Canvas-unsupported code
    // TODO: Añadir nodo al DOM con un p que diga que no se pue
  }
}