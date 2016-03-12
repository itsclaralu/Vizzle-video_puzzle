/* Initial set ups*/
document.ready = function() {
  button = addEventListener('click', switchButton);
}

/* Switching the button to play/pause*/
button = document.getElementbyId("play-button");
var i = 0; //Will be != 0 if we've already launched the game

function switchButton() {
  if(button.id == "play-button") {
      button.setAttribute("src", "images/vizzle_pause.svg");
      button.setAttribute("id", "pause-button");
      if( i == 0) { // Launch the game
           //TODO: Aquí hacemos que comience el juego
      }else { // Resume the game
          //TODO: Aquí hacemos que se reanude el juego
      }
  }else {
      button.setAttribute("src", "images/vizzle_play.svg");
      button.setAttribute("id", "play-button");
      //TODO: Aquí hacemos que se pause el juego
  }
}

function timing() {
    var start = new Date.now(); //Variable that stores the date when play button is pushed
      function counter() {
      var now = new Date.now(); //Variable that stores the present's date
      /*Time spent is the difference between now and start*/
      var displayedSec = now.getSeconds() - start.getSeconds();
      var displayedMin = now.getMinutes() - start.getMinutes();
      var displayedHours = now.getHours() - start.getHours();
      
      var displayedDate =  new Date(displayedHours, displayedMin, displayedSec);
      
      /*Showing the result*/
      document.getElementbyId(game-counter).innerHTML = displayedDate.toLocateString();
      }
    
    counter();
    var aux = setInterval(counter, 1000); //We need to execute counter() each second (1000 miliseconds)
}