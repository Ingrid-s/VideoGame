//  Obtenemos nuestro elemento canvas que será nuestro espacio de trabajo y le decimos que trabajaremos en 2 dimensiones
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

//ctx.fillRect(0,0,50,50);

//primera etapa del constructor
/*var image =new Image();
image.src='https://bit.ly/2L7yH3f';
image.onload = function(){

  // los numeros corresponen a las cordenadas de x, y, ancho y alto de la image
  ctx.drawImage(image, 0,0,80,100);
}*/

//usamos la palabra reservada class y su método constructor para crear nuestro objeto Mario, le asignamos imagenes, tamaño y otras propiedades.
class Mario {
  constructor(lastName){
    this.lastName = 'Jauregui'
    this.image1 = new Image()
    this.image1.src = 'https://bit.ly/2L7yH3f'
    this.image2 = new Image ()
    this.image2.src = 'https://bit.ly/2L3ikoe'
    this.image = this.image1;
    this.x = 10;
    this.y = 295;
    this.width = 30;
    this.height = 40;
    
  }
  //esta función valida que se cumplan todas las condiciones, que si la imagen de Mario y la de su enemigo coinciden en el mismo espacio, al mismo tiempo se considera una colisión.
  collision(item){
    return(this.x < item.x + item.width) &&
    (this.x + this.width > item.x) &&
    (this.y < item.y + item.height)&&
    (this.y + this.height > item.y);
  }
  //método para dibujar a nuestro Mario a la altura de la imagen de fondo correcta.
  draw(){
    if(this.y < 295) this.y += 4;
    if(frames % 10 === 0){
         this.image = this.image == this.image1 ? this.image2 : this.image1;
    }
    ctx.drawImage(this.image, this.x, this.y, this.width,this.height);
  }
}
// clase y constructor de la imagen de fondo con sus respectivas características
class Background{
  constructor(){
    this.x = 0
    this.y = 0
    this.width = canvas.width
    this.height = canvas.height
    this.image = new Image()
    this.image.src = 'https://bit.ly/2m9qY9Q'
  }
  // Detiene el intervalo de tiempo y pinta el game over en la pantalla con el color, tamaño y tipo de fuente que le definimos.
  gameOver() {
    //se detiene el set Interval
    clearInterval(interval);
    // características del texto: tamaño y fuente
    ctx.font = "82px Orbitron";
    ctx.fillStyle = "#791f51";
    //imprimimos el texto en el canvas
    ctx.fillText("Game Over", 250, 190);
  }
  //método para dibujar propio de la clase Backgroud, dibuja una imagen tras otra y resetea las coordenadas de la primera para dar la ilusión de continuidad
  draw(){
    //se resta en x para moverlo
    this.x--;
    //si llega al final del canvas se resetea x 
    if(this.x <-canvas.width) this.x = 0;
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    //se dibuja una segunda image identica a la primera pero al final de esta
    ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
  }
}

//clase y constructor de los enemigos, todas las clases posteriores a Mario, estan basadas en este.
class Enemy{
  constructor(){
    this.x = canvas.width;
    this.y = 295;
    this.width = 20;
    this.height = 40;
    this.image = new Image();
    this.image.src = "https://bit.ly/2upxkWp";
  }
  //Método que corresponde y dibuja a la clase Enemy con el mismo tamaño de Mario
  draw(){
    if(frames % 10) this.x -=5;
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}


var fondo = new Background();
var marioPerez = new Mario ("Jauregui");

// genera un intervalo de tiempo para que se pinten constantemente las imagenes de Mario y los enemigos en diferentes ubicaciones y así crear la ilución de movimineto, esta gunción llama a los metodos dibujar del fondo, de mario y tambien llama a las funciones que generan y pintan los enemigos en 50 cuados por milisegundo.
var frames = 0;
var interval = setInterval(function(){
  //aumentamos en uno cada cuadro que se dibuja
  frames ++
  //limpiar el cambas
  ctx.clearRect(0,0,256,256);
  //dibujar 256 cuadros por segundo
  fondo.draw();
  marioPerez.draw();

  generateEnemies();
  drawingEnemies();
}, 1000/50 );

//esta función detecta el evento al presionar la barra espaciadora para elevar a Mario y que baje lentamente.
addEventListener('keydown', function(event){
  if(event.keyCode === 32){
    marioPerez.y -=80;
  }
})

// en este arreglo vacío se almacenarán los enemigos generados aleatoriamente 
var enemies = [];

function generateEnemies() {
    if(frames % 100 == 0 || frames % 60 == 0 || frames % 170 == 0){
        
        var enemy = new Enemy
        enemies.push(enemy);
    }
}
//esta función recorre el arreglo para detectar donde hay enemigos si se dan colisiones con Mario
function drawingEnemies(){
  enemies.forEach(function(enemy){
    enemy.draw()
    if(marioPerez.collision(enemy)){
      fondo.gameOver();
    }
  })
}