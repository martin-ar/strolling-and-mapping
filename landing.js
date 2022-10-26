let cursores = [] // lista de cursores
let N_CURSORES = 2 // cantidad de cursores iniciales

let min_x_1 = Infinity;
let max_x_1 = -Infinity;
let min_y_1 = Infinity;
let max_y_1 = -Infinity;
let min_alt_1 = Infinity;
let max_alt_1 = -Infinity;

let min_x_2 = Infinity;
let max_x_2 = -Infinity;
let min_y_2 = Infinity;
let max_y_2 = -Infinity;
let min_alt_2 = Infinity;
let max_alt_2 = -Infinity;

let frames_1 = 0;
let frames_2 = 0;

let tabla_coord_1;
let tabla_coord_2;

let columnas_1;
let columnas_2;

let count_1 = 0;
let count_2 = 0;

let contador = 100

titulo1 = 'Tentacularidad de la vida';
titulo2 = 'Pinceles de pixeles';
texto1 = 'la vida vivida a través de lineas\n-Y qué riqueza de lineas!-\nSeries de senderos entrelazados.';
texto2 = 'bolsas espaciosas para recolectar,\nllevar y contar las cosas de la vida.';

let crear = false
let existe = false
let texto = false

function preload() {
  
  tabla_coord_1 = loadTable("https://hipermedial.surwww.com/2021/martin_aran/trayectorias/assets/notreDame.csv", "csv", "header");
  tabla_coord_2 = loadTable("https://hipermedial.surwww.com/2021/martin_aran/trayectorias/assets/solaris.csv", "csv", "header");
  puntero = loadImage('assets/punteros/bici4.png');
  
}

function setup() {
  
  colorMode(HSB, 360, 100,100,100);
  
  textAlign(CENTER, CENTER);
  imageMode(CENTER);

  let canvas = createCanvas(windowWidth,windowHeight)
  canvas.parent("anim")
  canvas.mouseMoved(resaltar);
  canvas.mousePressed(interaccion);


  //numero de frames de la animacion
  //frames = tabla_coord.get(tabla_coord.getRowCount(),'point_id');
  frames_1 = tabla_coord_1.getRowCount();
  frames_2 = tabla_coord_2.getRowCount();
  print('el numero de frames 1 es: ' + frames_1);

  //cantidad de filas
  print('el bnumero de frames 2 es: ' + frames_2);
  
  //nombres de columnas
  for (let c = 0; c < tabla_coord_1.getColumnCount(); c++)
  {
    print('la columna ' + c + ' se llama ' + tabla_coord_1.columns[c]);
  }
  
  
  columnas_1 = tabla_coord_1.getRows();
  //calculo max y min de los valores de la tabla
  for (let f = 0; f < columnas_1.length; f++) { 
    let x = columnas_1[f].getNum('x');
    min_x_1 = min(min_x_1, x);
    max_x_1 = max(max_x_1, x);

    let y = columnas_1[f].getNum('y');
    min_y_1 = min(min_y_1, y);
    max_y_1 = max(max_y_1, y);

    let altitud = columnas_1[f].getNum('elevation');
    min_alt_1 = min(min_alt_1, altitud);
    max_alt_1 = max(max_alt_1, altitud);

  }

  columnas_2 = tabla_coord_2.getRows();
  //calculo max y min de los valores de la tabla
  for (let f = 0; f < columnas_2.length; f++) { 
    let x = columnas_2[f].getNum('x');
    min_x_2 = min(min_x_2, x);
    max_x_2 = max(max_x_2, x);

    let y = columnas_2[f].getNum('y');
    min_y_2 = min(min_y_2, y);
    max_y_2 = max(max_y_2, y);

    let altitud = columnas_2[f].getNum('elevation');
    min_alt_2 = min(min_alt_2, altitud);
    max_alt_2 = max(max_alt_2, altitud);

  }

  print('Datos de tabla 1');
  print('minimo de x = ' + min_x_1 + ', maximo de x = ' + max_x_1);
  print('minimo de y = ' + min_y_1 + ', maximo de y = ' + max_y_1);
  print('minimo de altitud = ' + min_alt_1 + ', maximo de altitud = ' + max_alt_1);
  
  print('Datos de tabla 2');
  print('minimo de x = ' + min_x_2 + ', maximo de x = ' + max_x_2);
  print('minimo de y = ' + min_y_2 + ', maximo de y = ' + max_y_2);
  print('minimo de altitud = ' + min_alt_2 + ', maximo de altitud = ' + max_alt_2);

  //creo el/los cursor/es
  for(let i = 0; i < N_CURSORES ; i++)
  {
    let cursor = {
      x: 0,
      y: 0,
      tipo: 0,
      //color: color(240,100,50,0.1),
      color: 0,
      ancho: 2200,
      seleccion: false,
      path: false
      

    }
    cursores.push(cursor)
    

  }
  
  background(360,0,100);
}



function draw() {

  cursor('assets/punteros/bici4.png');
  
  if (texto == true){
    stroke(255);
    fill(300,100,80,80);
    textSize(60);
    text('seguime...',(windowWidth/2) + sin(frameCount/10) * 20,windowHeight/2);
    noFill();
    noStroke();
  }

  if (contador >= 0) {

    let c1 = color (360,0,30,contador)
    let c2 = color (360,0,80,0) 

    fadeIn(0,0,windowWidth,windowHeight,c2,c1);
    
    contador -- ;
  }
  
  background(360,0,100,2);
  noStroke();
  

  if (count_1  < frames_1) {
    //columnas = tabla_coord.getRows();

    let x = columnas_1[count_1].getNum('x');
    cursores[0].x = map(x,min_x_1,max_x_1,590,10);

    let y = columnas_1[count_1].getNum('y');
    cursores[0].y = map(y,min_y_1,max_y_1,10,590);
    
    let altitud = columnas_1[count_1].getNum('elevation');
    //cursores[0].color = color((map(altitud,min_alt_1,max_alt_1,180,360)),100,75,75);
    cursores[0].color = map(altitud,min_alt_1,max_alt_1,180,360);
    
    
  
    dibujarGradiente(cursores[0].x,cursores[0].y,cursores[0].color,cursores[0].ancho);

    
    count_1 += 2;
  }

  if (count_2 < frames_2)
  {
    x = columnas_2[count_2].getNum('x');
    cursores[1].x = map(x,min_x_2,max_x_2,590,10);

    y = columnas_2[count_2].getNum('y');
    cursores[1].y = map(y,min_y_2,max_y_2,590,10);
    
    altitud = columnas_2[count_2].getNum('elevation');
    //cursores[1].color = color((map(altitud,min_alt_2,max_alt_2,180,360)),100,75,75);
    cursores[1].color = map(altitud,min_alt_2,max_alt_2,180,360);
    
    
    dibujarGradiente(cursores[1].x,cursores[1].y,cursores[1].color,cursores[1].ancho);

  
    if (cursores[0].seleccion == true)
    {
      cursor('pointer');
      noFill();
      stroke(255);
      strokeWeight(10);
      circle(cursores[0].x,cursores[0].y,150);
      strokeWeight(3);
      line(cursores[0].x,cursores[0].y,0,windowHeight);
    }
    if (cursores[1].seleccion == true)
    {
      cursor('pointer');
      noFill();
      stroke(255);
      strokeWeight(10);
      circle(cursores[1].x,cursores[1].y,150);
      strokeWeight(3);
      line(cursores[1].x,cursores[1].y,windowWidth,0);

    }
    

    count_2 += 1;
 
/*    } else {
        count_2 = frames_2
  } */
    
  if (count_1 > frames_1 ) {
      
    background(360,0,100);
      count_1 = 0;
      count_2 = 0;
      //noLoop();
  }
  tint(255,20);
  image(puntero,mouseX,mouseY,64,40);
  noTint();
}
crearDiv();
  
}

function fadeIn(x,y,w,h,c1,c2) {

  noFill();


    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, y + h, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
}


function dibujarGradiente(x,y,c,d) {
  let radius = d / 2;
  let a = 1;
  noStroke();
  if (cursores[0].seleccion == true || cursores[1].seleccion == true ){
    fill(0,0,80,5 );
    rect(0,0,windowWidth,windowHeight);
  }
  for (let r = 0; r < radius; r+=80) {
    fill(c, 100, random(65,90),a);
    circle(x, y, r);
    a = a - 0.01;
  }
  fill(255);
  circle(x,y,7);
  
  
}

function resaltar(){
  
  for (let i = 0; i < N_CURSORES ; i++){
    
    let d = dist(cursores[i].x,cursores[i].y,mouseX,mouseY);

    if(d <= 80 && existe == false){
      crear = true;
      cursores[i].seleccion = true ;
    }  
    if (d > 100){
      cursores[i].seleccion = false
      removeElements();
      existe = false;
       
    }
    
  }
}
function crearDiv(){

  if (crear == true && cursores[0].seleccion == true){
    elementoDiv = createDiv();
    //elementoDiv.addClass('container-xl');
    elementoDiv.id('info2');
    elementoDiv.parent('anim');
    titulo = createP(titulo1);
    titulo.addClass('titulo-info');
    titulo.parent(elementoDiv);
    texto = createP(texto1);
    texto.addClass('texto-info');
    texto.parent(titulo);
    boton = createButton('clickeame');
    boton.addClass('link-mov');
    boton.parent('anim');
    boton.position(cursores[0].x,cursores[0].y);
    boton.mousePressed(link0);
    
    existe = true;
    crear = false;
  }
  if (crear == true && cursores[1].seleccion == true){
    elementoDiv = createDiv();
    elementoDiv.id('info');
    elementoDiv.parent('anim');
    titulo = createP(titulo2);
    titulo.addClass('titulo-info');
    titulo.parent(elementoDiv);
    texto = createP(texto2);
    texto.addClass('texto-info');
    texto.parent(titulo);
    boton = createButton('clickeame');
    boton.addClass('link-mov');
    boton.parent('anim');
    boton.position(cursores[1].x,cursores[1].y);
    boton.mousePressed(link1);
    
    existe = true;
    crear = false;
  }
}

function interaccion()
{
  texto = true;

}

function link0(){
  window.open('https://hipermedial.surwww.com/2021/martin_aran/trayectorias/pag1.html', '_self')
}

function link1(){
  window.open('https://hipermedial.surwww.com/2021/martin_aran/trayectorias/pag2.html', '_self')
  
  }