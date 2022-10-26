//let cursores = [] // lista de cursores
//let N_CURSORES = 1 // cantidad de cursores iniciales
//instanciar un espacio

let min_alt1 = Infinity;
let max_alt1 = -Infinity;
let altitud1 = 0;
let min_alt2 = Infinity;
let max_alt2 = -Infinity;
let altitud2 = 0;

var figura = function(p)
{
  p.canvas_x = 800;
  p.canvas_y = 400;
  
  p.min_x = Infinity;
  p.max_x = -Infinity;
  p.min_y = Infinity;
  p.max_y = -Infinity;

  p.frames = 0;

  p.columnas;

  p.count = 0;
  p.index = 0;

  p.timer = 1500;
  p.cambio = p.timer;

  p.fotos = new Array(13);

  /* let offset_x = 0;
  let offset_y = 0;
  let easing = 0.005; */

  //creo el/los cursor/es
  //for(let i = 0; i < N_CURSORES ; i++)
  //{
  //crearCursor()
  p.cursor =
  {
    x: 0,
    y: 0,
    tipo: 0,
    color: p.color(240,100,50),
    ancho: 500,
    halo: false,
    path: false
  }
      
  //cursores.push(cursor)
  p.tabla_coord;


  p.preload = function() {
  
    //cargo tabla
    p.tabla_coord = p.loadTable("https://hipermedial.surwww.com/2021/martin_aran/trayectorias/assets/notreDame.csv", "csv", "header");
    
    //cargo imagenes
    for( var i=0; i < p.fotos.length ; i++ )
    {
      p.fotos[i] = p.loadImage('assets/fotos/notre-dame/foto'+i+'.jpg');
    }
    
  }
  
  p.setup = function ()
  {
    p.colorMode(p.HSB, 360,100,100,1);
    p.imageMode(p.CENTER);
  
    p.canvas = p.createCanvas(p.canvas_x,p.canvas_y);
    
    p.canvas.parent("anim");
    
    //numero de frames de la animacion
    //frames = tabla_coord.get(tabla_coord.getRowCount(),'point_id');
    p.frames = p.tabla_coord.getRowCount();
    p.print('el numero de frames es: ' + p.frames);
  
    //cantidad de filas
    p.print('La cantidad de filas de la tabla es: ' + p.frames);
    
    //nombres de columnas
    for (let c = 0; c < p.tabla_coord.getColumnCount(); c++)
    {
      p.print('la columna ' + c + ' se llama ' + p.tabla_coord.columns[c]);
    }
    
    
  
  
    p.columnas = p.tabla_coord.getRows();
    //calculo max y min de los valores de la tabla
    for (let f = 0; f < p.columnas.length; f++) { 
      let x = p.columnas[f].getNum('x');
      p.min_x = p.min(p.min_x, x);
      p.max_x = p.max(p.max_x, x);
  
      let y = p.columnas[f].getNum('y');
      p.min_y = p.min(p.min_y, y);
      p.max_y = p.max(p.max_y, y);
  
      altitud1 = p.columnas[f].getNum('elevation');
      min_alt1 = p.min(min_alt1, altitud1);
      max_alt1 = p.max(max_alt1, altitud1);
  
    }
    p.print('minimo de x = ' + p.min_x + ', maximo de x = ' + p.max_x);
    p.print('minimo de y = ' + p.min_y + ', maximo de y = ' + p.max_y);
    p.print('minimo de altitud = ' + min_alt1 + ', maximo de altitud = ' + max_alt1);
  
  }

  p.cambiarFotoTiempo = function()
  {
    if (p.millis() > p.cambio)
    {
      p.index += 1;
      p.cambio = p.millis() + p.timer;
      if (p.index >= p.fotos.length)
      {
        p.index = 0;
      }
    }
    
    
  }


  p.draw = function()
  {
    //background(360,0,100,0.01);
    p.noStroke();
    p.cambiarFotoTiempo();

    if (p.count  < p.frames) {
      //p.noTint();
      //columnas = tabla_coord.getRows();

      let x = p.columnas[p.count].getNum('x');
      p.cursor.x = p.map(x,p.min_x,p.max_x,p.canvas_x,10);

      let y = p.columnas[p.count].getNum('y');
      p.cursor.y = p.map(y,p.min_y,p.max_y,10,p.canvas_y);
      
      altitud1 = p.columnas[p.count].getNum('elevation');
      //cursor.color = color((map(altitud,min_alt,max_alt,180,360)),100,75);
      p.cursor.color = p.color((p.map(altitud1,min_alt1,max_alt1,180,360)),100,75,0.005);
      
      
      p.fill(p.cursor.color);
      p.circle(p.cursor.x, p.cursor.y, p.cursor.ancho);
      p.image(p.fotos[p.index], p.cursor.x, p.cursor.y,170,170);
      
      

      p.count += 2;

      //print(cursor.x + ' ' + cursor.y);
      //print(cursor.color);
      

    } else {
      //p.background(360,0,100);
      p.count = 0
      //noLoop();
    }

    /* let dx = mouseX - canvas.width / 2 - offset_x;
    let dy = mouseY - canvas.height / 2 - offset_y;
    offset_x += dx * easing;
    offset_y += dy * easing;
    tint(0,0,100,0.5); // Display at half opacity
    //canvas.position(offset_x, offset_y); */
  }
}

var fondo = function(p)
{

  p.canvas_x = 800;
  p.canvas_y = 400;
  
  p.min_x = Infinity;
  p.max_x = -Infinity;
  p.min_y = Infinity;
  p.max_y = -Infinity;

  p.frames = 0;

  p.columnas;

  p.count = 0;
  p.index = 1;

  p.timer = 800;
  p.cambio = p.timer;

  p.fotos = new Array(10);

  p.cursor =
  {
    x: 0,
    y: 0,
    tipo: 0,
    color: p.color(240,100,50),
    ancho: 500,
    halo: false,
    path: false
  }
      
  //cursores.push(cursor)
  p.tabla_coord;


  p.preload = function() {
  
    //cargo tabla
    p.tabla_coord = p.loadTable("https://hipermedial.surwww.com/2021/martin_aran/trayectorias/assets/solaris.csv", "csv", "header");
    p.puntero = p.loadImage('assets/punteros/bici4.png');
    
    //cargo imagenes
    for( var i=1; i < p.fotos.length ; i++ )
    {
      p.fotos[i] = p.loadImage('assets/fotos/buenos-aires/'+i+'.png');
    }
    
  }
  
  p.setup = function ()
  {
    p.colorMode(p.HSB, 360, 100,100,1);
    p.imageMode(p.CENTER);
  
    p.canvas = p.createCanvas(p.canvas_x,p.canvas_y);
    
    p.canvas.id('fondo');
    
    p.frames = p.tabla_coord.getRowCount();
    
    p.columnas = p.tabla_coord.getRows();
    //calculo max y min de los valores de la tabla
    for (let f = 0; f < p.columnas.length; f++) { 
      let x = p.columnas[f].getNum('x');
      p.min_x = p.min(p.min_x, x);
      p.max_x = p.max(p.max_x, x);
  
      let y = p.columnas[f].getNum('y');
      p.min_y = p.min(p.min_y, y);
      p.max_y = p.max(p.max_y, y);
  
      altitud2 = p.columnas[f].getNum('elevation');
      min_alt2 = p.min(min_alt2, altitud2);
      max_alt2 = p.max(max_alt2, altitud2);
      
    }
    // p.nuevoDiv = p.createDiv();
    // p.nuevoDiv.id('info');
    
    p.boton = p.createButton('');
    p.boton.addClass('link-mov');
    p.boton.parent(p.nuevoDiv);
    p.link = p.createA("https://hipermedial.surwww.com/2021/martin_aran/trayectorias/pag2.html","Otra vez...", "_self");
    p.link.parent(p.boton);
    //p.boton.mousePressed(p.link0);

    p.span = p.createSpan('');
    p.span.parent(p.nuevoDiv);

    p.boton1 = p.createButton('');
    p.boton1.addClass('link-mov');
    p.boton1.parent(p.nuevoDiv);
    p.link1 = p.createA("https://hipermedial.surwww.com/2021/martin_aran/trayectorias/pag3.html","Ya no más!", "_self");
    p.link1.parent(p.boton1);
    //p.boton1.mousePressed(p.link1);
  }
  
  
 
  p.cambiarFotoTiempo = function()
  {
    if (p.millis() > p.cambio)
    {
      p.index += 1;
      p.cambio = p.millis() + p.timer;
      if (p.index >= p.fotos.length)
      {
        p.index = 1;
      }
    }
    
    
  }
  
  p.windowResized = function()
  {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  }
 

  p.draw = function()
  {
    p.canvas.color = p.color((p.map(altitud2,min_alt2,max_alt2,260,80)),100,85,0.005);
    //p.background(p.canvas.color,100,80,0.1);
    p.noStroke();

    p.cambiarFotoTiempo();
    
    p.tint(255,0.03);
    p.image(p.puntero,p.mouseX,p.mouseY,64,40);

    if (p.count  < p.frames) 
    {
      //p.noTint();
      //columnas = tabla_coord.getRows();

      let x = p.columnas[p.count].getNum('x');
      p.cursor.x = p.map(x,p.min_x,p.max_x,p.canvas_x,10);

      let y = p.columnas[p.count].getNum('y');
      p.cursor.y = p.map(y,p.min_y,p.max_y,10,p.canvas_y);
      
      //altitud2 = p.columnas[p.count].getNum('elevation');
      //cursor.color = color((map(altitud,min_alt,max_alt,180,360)),100,75);
     // p.cursor.color = p.color((p.map(altitud2,min_alt2,max_alt2,180,360)),100,75,0.005);
      
      
      //p.fill(p.cursor.color);
      //p.circle(p.cursor.x, p.cursor.y, p.cursor.ancho);
      if (p.frameCount % 25 == 0)
      {
        p.erase();
        p.fill(360,0.05);
        p.rect(0,0,p.canvas_x,p.canvas_y);
        p.noFill();
        p.noErase();
        p.tint(255,0.6);
        p.image(p.fotos[p.index], p.cursor.x, p.cursor.y,100,100);
      }

      p.count += 3;

      //print(cursor.x + ' ' + cursor.y);
      //print(cursor.color);
      

    } else {
      //p.background(360,0,100);
      p.count = 0
      //noLoop();
    }
  }
}

var myP51 = new p5(figura);
var myP52 = new p5(fondo);