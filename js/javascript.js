/* Variables: */
var clickCounter = 0; //Will be != 1 if we've already launched the game
var seconds = 0; //Second counter
var start;
var timer;
var minutes = 0;

/* Initial set ups*/
window.onload = function() {
  button = document.getElementById("play-button");
  button.addEventListener('click', switchButton);
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
      if( clickCounter == 1) { // Launch the game
           //TODO: Aquí hacemos que comience el juego
          //start = new Date(); //Variable that stores the date when play button is pushed
          counter();
          timer = setInterval(counter, 1000); //We need to execute counter() each second (1000 miliseconds)
      }else { // Resume the game
          //TODO: Aquí hacemos que se reanude el juego
          timer = setInterval(counter, 1000);
      }
  }else { // Game paused
      clickCounter++;
      button.setAttribute("src", "images/vizzle_play.svg");
      button.setAttribute("id", "play-button");
      //TODO: Aquí hacemos que se pause el juego
      clearInterval(timer);
      //TODO: Ajustar counter cuando el juego se pausa; guardar fecha en la que se pausa para que no acumule el tiempo.
  }
}