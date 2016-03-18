/* Variables: */
var clickCounter = 0; //Will be != 1 if we've already launched the game
var start;
var timer;

/* Initial set ups*/
window.onload = function() {
  button = document.getElementById("play-button");
  button.addEventListener('click', switchButton);
}

function counter() {
  var now = new Date(); //Variable that stores the present's date
  /*Time spent is the difference between now and start*/
  var displayedSec = now.getSeconds() - start.getSeconds();
  var displayedMin = now.getMinutes() - start.getMinutes();
  var displayedHours = now.getHours() - start.getHours();
  displayedDate = displayedHours+":"+displayedMin+":"+displayedSec;
  /*Showing the result*/
   document.getElementById("game-counter").innerHTML = displayedDate;
}

/* Switching the button to play/pause*/
function switchButton() {
  if(button.id == "play-button") {
      clickCounter++;
      button.setAttribute("src", "images/vizzle_pause.svg");
      button.setAttribute("id", "pause-button");
      if( clickCounter == 1) { // Launch the game
           //TODO: Aquí hacemos que comience el juego
          start = new Date(); //Variable that stores the date when play button is pushed
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
  }
}