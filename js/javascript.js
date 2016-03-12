<script>

  var displayedDate = new Date();
  function timing() {
    var start = new Date.now(); //Variable that stores the date when play button is pushed
      function counter() {
      var now = new Date.now(); //Variable that stores the present's date
      /*Time spent is the difference between now and start*/
      var displayedSec = now.getSeconds() - start.getSeconds();
      var displayedMin = now.getMinutes() - start.getMinutes();
      var displayedHours = now.getHours() - start.getHours();
      
      displayedDate =  new Date(displayedHours, displayedMin, displayedSec);
      
      /*Showing the result*/
      document.getElementbyId(game-counter).innerHTML = displayedDate.toLocateString();
      }
    
    counter();
    var aux = setInterval(counter, 1000); //We need to execute counter() each second (1000 miliseconds)
  }
</script>