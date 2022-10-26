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
let count_3 = 0;

flechas = new Array(11);
var flechasPOS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var position = 0;


function preload()
{
  
  tabla_coord_1 = loadTable("https://hipermedial.surwww.com/2021/martin_aran/trayectorias/assets/notreDame.csv", "csv", "header");
  tabla_coord_2 = loadTable("https://hipermedial.surwww.com/2021/martin_aran/trayectorias/assets/solaris.csv", "csv", "header");
  
  for( var i=0; i < flechas.length ; i++ )
  {
    if(i == 10 )
    {
      flechas[i] = loadImage('assets/flechas/flecha.png');
      break;
    }
    flechas[i] = loadImage('assets/flechas/flecha'+i+'.png');
  }
}

function setup() 
{
  colorMode(HSB, 360, 100,100);


  let canvas = createCanvas(650, 650)
  canvas.parent("anim")

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
  for (let f = 0; f < columnas_1.length; f++)
  { 
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
  for (let f = 0; f < columnas_2.length; f++)
  { 
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
      color: color(240,100,50),
      ancho: 4,
      halo: false,
      path: false
      
    } 
    cursores.push(cursor);
  }
  
  background(360,0,100);
  image(flechas[10],0,0,75,108);

  flechasPOS = shuffle(flechasPOS);

}


function draw() {

  //background(360,0,100,0.01);
  noStroke();
  

  if (count_1  < frames_1) {
    //columnas = tabla_coord.getRows();

    let x = columnas_1[count_1].getNum('x');
    cursores[0].x = map(x,min_x_1,max_x_1,10,590);

    let y = columnas_1[count_1].getNum('y');
    cursores[0].y = map(y,min_y_1,max_y_1,10,590);
    
    let altitud = columnas_1[count_1].getNum('elevation');
    cursores[0].color = color((map(altitud,min_alt_1,max_alt_1,180,360)),100,75);
    
    
    fill(cursores[0].color);

    circle(cursores[0].x, cursores[0].y, cursores[0].ancho);

    count_1 += 3;

    if (count_2 < frames_2)
    {
      x = columnas_2[count_2].getNum('x');
      cursores[1].x = map(x,min_x_2,max_x_2,590,10);

      y = columnas_2[count_2].getNum('y');
      cursores[1].y = map(y,min_y_2,max_y_2,590,10);
      
      altitud = columnas_2[count_2].getNum('elevation');
      cursores[1].color = color((map(altitud,min_alt_2,max_alt_2,180,360)),100,75);
      
      
      fill(cursores[1].color);

      circle(cursores[1].x, cursores[1].y, cursores[1].ancho);

      count_2 += 2;

    } else 
      {
        count_2 = frames_2
      }
    //print(cursor.x + ' ' + cursor.y);
    //print(cursor.color);
    

  } else 
    {
      background(360,0,100);
      count_1 = 0;
      count_2 = 0;
      //noLoop();
    }
  
}

function mousePressed()
{
  
  image(flechas[numeroFlecha()],random(0,450),random(0,450));
  count_3++

  if(count_3 >25)
  {
    background(360,0,0,100);
    window.open('https://hipermedial.surwww.com/2021/martin_aran/trayectorias/pag2.html', '_self');

  }

}

function numeroFlecha() 
{

  var v = flechasPOS[position];


  position++;


  if (position == flechasPOS.length) {
    flechasPOS = shuffle(flechasPOS);
    position = 0;
  }


  return v;
}