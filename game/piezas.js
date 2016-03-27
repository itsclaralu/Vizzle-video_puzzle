    filas = 5;
    col = 4;
    piezas(640, 360, filas, col);
    
    //Se crean los objetos solo una vez
    var puzzOriginal = true;
    
    //Constructor con coordenadas x e y para inicar el canvas
    function cuadricula(nombre, x, y) {
      this.nombre = nombre;
      this.x = x;
      this.y = y;
    }
    //Matrix de objetos
    var piezasVideo = new Array();
  
    var video = $("#source-vid")[0];
    update(video);

    function update(video) {
      piezas(640, 360, filas, col, video);
      setTimeout(function() { update(video) }, 33);
    }

    function piezas(a, b, r, c, source) {
        var ancho = Math.round(a / c);
        var altura = Math.round(b / r);
        
        //posición de reinicio
        var p = $( "#box" );
        var position = p.offset();
        
        // filas
        for(var ri = 0; ri < r; ri += 1) {
          // columnas
          for(var ci = 0; ci < c; ci += 1) {

            // Dibujar canvas 

            //construir de cero
            if (typeof source === 'undefined') {
              var puzzle = $('<div><canvas class="puzzle" id="puzzle' + ri + ci + '" height="' + altura + '" width="' + ancho + '"></canvas></div>').get(0);
              $("#box").append(puzzle);
            } else {

              // construir según posición anterior
              if (puzzOriginal) {

              //Crear cuadrícula y añadir al matriz de piezas
                video1 = new cuadricula(('puzzle'+ri+ci), ri*altura+position.top, ci*ancho+position.left);
                piezasVideo.push(video1);
              }
                  
                var crear = $('#puzzle' + ri + ci).get(0);
                
                context = crear.getContext('2d');
                context.drawImage(source, ci*ancho, ri*altura, ancho, altura, 0, 0, ancho, altura);
            }
          }
        }
        puzzOriginal = false;
    }
     
  $(document).ready(function() {
      $('#Desordenar').click(function() {
        $('body').jGravity({ 
         target: 'canvas', 
          weight: 22, 
        depth: 5, 
       drag: true
      });
    });
    
    $('#Ordenar').click(function() {
     for (var item in piezasVideo) {

        //rotar las piezas para darle animación
        $("#"+piezasVideo[item].nombre).animate({textIndent: 0}, {
          duration:1000,
          step: function(now,fx) {
            $("#"+piezasVideo[item].nombre).css('-webkit-transform','rotate('+now+'deg)');
          } 
        },'linear');

        //Reordenar piezas
        $("#"+piezasVideo[item].nombre).replaceWith($("#"+piezasVideo[item].nombre).clone());
        $("#"+piezasVideo[item].nombre).animate({top: piezasVideo[item].x, left: piezasVideo[item].y}); 
      }
    });  
  });
