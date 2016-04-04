/* Global variables*/
var numberPieces = 4;
var pieces = [numberPieces];
var puzzleWidth = 0;
var puzzleHeight = 0;
var pieceWidth = 0;
var pieceHeight = 0; 
var clickCounter = 0; //Will be != 1 if we've already launched the game
var seconds = 0; //Second counter
var minutes = 0;
var timer;
var video;
var canvas;
var container;
var context;
var cursor = {};
  cursor.x = 0;
  cursor.y = 0;
var thisPiece;
var thisDroppablePiece;

/* Initial set ups*/
window.onload = function() {
  button = document.getElementById("play-button");
  button.addEventListener('click', switchButton);
  canvas = document.getElementById("game-screen");
  container = document.getElementById("puzzle-board");
  video = document.getElementById("video");
  video.addEventListener('play', function () {
    drawVideo(video, context, puzzleWidth, puzzleHeight);
  });
  launchGame();
}
function launchGame(){
  init();
  video.play();
}

function init() {
  if(canvas && canvas.getContext) { //Checking browser compatibility
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
    video.setAttribute('width', puzzleWidth);
    video.setAttribute('height', puzzleHeight);
    button.setAttribute("src", "images/vizzle_play.svg");
    button.setAttribute("id", "play-button");
    clearInterval(timer); 
    clickCounter = 0;
    seconds = 0;
    minutes = 0;
    hours = 0;
  } else { // Canvas-unsupported code
    // TODO: Añadir nodo al DOM con un p que diga que no se pue
  }
}

function drawVideo(video, context, width, height) {
  if(this.video.paused || this.video.ended)
    return false;
  //else
  this.context.drawImage(this.video, 0, 0, width, height, 0, 0, width, height);
  this.context.fillStyle= "rgba(0,0,0,0.9)";
  setTimeout(drawVideo, 1000/60, video, context, width, height); //Play video at 60fps
}

function counter() {
  var hours = Math.floor(seconds/3600);
  seconds++;
  date = new Date(null, null, null, hours, minutes, seconds, null); //We don't need to show year, month, day or millisecs
  /*Showing the result*/
  date = date.toTimeString().split(" ");
  displayedDate = date[0]; //To erase the GMT part of the date string
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
          console.log("Cuando inicio el juego, clickCounter = "+ clickCounter);
          video.pause();
          counter();
          timer = setInterval(counter, 1000); //We need to execute counter() each second (1000 miliseconds)
          createBoard();
          shufflePuzzle();
      }else { // Resume the game
          timer = setInterval(counter, 1000);
          console.log("Reanudo el juego, clickCounter = "+ clickCounter);
      }
  }else { // Game paused
      clickCounter++;
      console.log("Pauso el juego, clickCounter = "+ clickCounter);
      button.setAttribute("src", "images/vizzle_play.svg");
      button.setAttribute("id", "play-button");
      clearInterval(timer);

  }
}

function createBoard() {
  var i, piece;
  var xAux = 0;
  var yAux = 0;
  if(canvas && canvas.getContext) { //Checking if the nav is compatible
    for(i = 0; i < numberPieces ; i++) {
      piece = {};
      piece.xPosition = xAux;
      piece.yPosition = yAux;
      pieces[i] = piece;
      context.fillStyle= "rgba(45,45,45,0.5)";
      context.fillRect(xAux, yAux, pieceWidth, pieceHeight);
      xAux += pieceWidth;
      if(xAux >= puzzleWidth) {
        yAux += pieceHeight;
        xAux = 0;
      }
    }
  }else { // Canvas-unsupported code
    // TODO: Añadir nodo al DOM con un p que diga que no se pue
  }
}

/* Shuffleing the pieces basing on the Fisher–Yates shuffle algorithm:*/
function shuffleArray(arrayPieces) {
  var shuffleCounter = arrayPieces.length -1;
  var arrayLength = shuffleCounter;
  //We go down the array
  while(shuffleCounter >= 0) {
    //Getting a random index
    var index = Math.floor(Math.random()*arrayLength);
    var aux = arrayPieces[shuffleCounter];
    arrayPieces[shuffleCounter] = arrayPieces[index];
    arrayPieces[index] = aux;
    shuffleCounter--;
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
    piece.actualX = xAux;
    piece.actualY = yAux;
    context.drawImage(video, piece.xPosition, piece.yPosition, pieceWidth, pieceHeight, piece.actualX, piece.actualY, pieceWidth, pieceHeight);
    context.strokeStyle="#eee";
    context.strokeRect(piece.actualX, piece.actualY, pieceWidth, pieceHeight);
    xAux += pieceWidth;
      if(xAux>=puzzleWidth) {
        yAux += pieceHeight;
        xAux = 0;
      }
  }
  document.onmousedown = onClickPiece;
}

function onClickPiece(click) {
  // Finding out where the user clicked
  if(click.offsetX == null){ //Code for Firefox support
    cursor.x = click.originalEvent.layerX;
    cursor.y = click.originalEvent.layerY;
  }else { //Other browsers
    cursor.x = click.offsetX;
    cursor.y = click.offsetY;
  }
   // Is there a piece?
  thisPiece = checkPiece();
  if(thisPiece != null) { // If the piece exists
    context.clearRect(thisPiece.actualX, thisPiece.actualY, pieceWidth, pieceHeight);
    context.save();
    context.globalAlpha = 0.8;
    context.strokeStyle="#222";
    context.strokeRect(thisPiece.actualX, thisPiece.actualY, pieceWidth, pieceHeight);
    context.drawImage(video, thisPiece.xPosition, thisPiece.yPosition , pieceWidth, pieceHeight, cursor.x - (pieceWidth / 2), cursor.y - (pieceHeight / 2), pieceWidth, pieceHeight);
    //Note that cursor.x - (pieceWidth / 2), cursor.y - (pieceHeight / 2) centers the piece into the cursor position
    context.restore();
    document.onmousemove = updatePuzzle;
    document.onmouseup = dropPiece;
  }
}

//Which piece was clicked?
function checkPiece(){
    var i;
    var piece;
    for(i = 0; i < pieces.length; i++){
        piece = pieces[i];
        if((cursor.x < piece.actualX || cursor.x > (piece.actualX + pieceWidth)) || (cursor.y < piece.actualY || cursor.y > (piece.actualY + pieceHeight)));
            //We never hit the piece of the stored coordinates
        else{
            //Congrats! The piece was hit
            return piece;
        }
    }
    //If we don't find the piece, we do nothing
    return null;
}

function updatePuzzle(move) {
  var i;
  var piece;
  thisDroppablePiece = null; //This variable stores the piece position were we can drop our active piece
    if(move.offsetX == null){ //Code for Firefox support
    cursor.x = move.originalEvent.layerX;
    cursor.y = move.originalEvent.layerY;
  }else { //Other browsers
    cursor.x = move.offsetX;
    cursor.y = move.offsetY;
  }
  //Erasing the whole puzzle; if we don't the user won't understand what the floating piece means
  context.clearRect(0, 0, puzzleWidth, puzzleHeight);
  //Painting the board as usual, except for the active piece
  for (i = 0; i<pieces.length; i++){
    piece = pieces[i];
    if (piece == thisPiece)
      continue; //We don't want to draw the current piece because we will move it
    context.drawImage(video, piece.xPosition, piece.yPosition, pieceWidth, pieceHeight, piece.actualX, piece.actualY, pieceWidth, pieceHeight);
    context.strokeStyle="#eee";
    context.strokeRect(piece.actualX, piece.actualY, pieceWidth, pieceHeight);
    if(thisDroppablePiece == null){
      if((cursor.x < piece.actualX || cursor.x > (piece.actualX + pieceWidth)) || (cursor.y < piece.actualY || cursor.y > (piece.actualY + pieceHeight)));
        //We're not over a droppable piece
      else{ //We mark the droppable piece
        thisDroppablePiece = piece;
        context.save();
        context.globalAlpha = 0.5;
        context.fillStyle = "#A846A0";
        context.fillRect(thisDroppablePiece.actualX, thisDroppablePiece.actualY, pieceWidth, pieceHeight);
        context.restore();
      }
    }
  }
  //Drawing the active piece as usual
  context.save();
  context.globalAlpha = 0.8;
  context.strokeStyle="#222";
  context.strokeRect(cursor.x - (pieceWidth/2), cursor.y - (pieceHeight/2), pieceWidth, pieceHeight);
  context.drawImage(video, thisPiece.xPosition, thisPiece.yPosition, pieceWidth, pieceHeight, cursor.x - (pieceWidth/2), cursor.y - (pieceHeight/2), pieceWidth, pieceHeight);
  context.restore();
}

function dropPiece() {
  document.onmousemove = null;
  document.onmouseup = null;
  if(thisDroppablePiece != null) { //If we can drop our piece somewhere
    var auxPiece = {}; // To store the active piece
    auxPiece.actualX = thisPiece.actualX;
    auxPiece.actualY = thisPiece.actualY;
    thisPiece.actualX = thisDroppablePiece.actualX;
    thisPiece.actualY = thisDroppablePiece.actualY;
    thisDroppablePiece.actualX = auxPiece.actualX;
    thisDroppablePiece.actualY = auxPiece.actualY;
  }
  checkWin();
}

function checkWin() {
  context.clearRect(0, 0, puzzleWidth, puzzleHeight);
  var winner = true;
  var i;
  var piece;
  for(i = 0; i < pieces.length; i++){
    piece = pieces[i];
    context.drawImage(video, piece.xPosition, piece.yPosition, pieceWidth, pieceHeight, piece.actualX, piece.actualY, pieceWidth, pieceHeight);
    context.strokeStyle="#eee";
    context.strokeRect(piece.actualX, piece.actualY, pieceWidth, pieceHeight);
    if((piece.actualX != piece.xPosition) || (piece.actualY != piece.yPosition)){
      winner = false;
      console.log(pieces);
    }
  }
    if(winner){
      console.log("Congrats, you won!");
      context.clearRect(0, 0, puzzleWidth, puzzleHeight);
      pieces = [numberPieces];
      console.log(pieces);
      launchGame();
  }
}

