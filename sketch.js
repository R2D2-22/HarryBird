let imagenFondo
let imagenInicio
let personaje
let pared
let x = 0
let posY = 100
let dY = 3
let estado = 0
let wallX = []
let wallY = []
let puntaje = 0
let puntajeMax = 0
let recordAnterior = 0
let musicaRecord
let musicaJuego
let fuente

function preload() {
  // put preload code here
  imagenFondo = loadImage("./images/hogwarts.png")
  imagenInicio = loadImage("./images/inicio.png")
  personaje = loadImage("./images/harry.gif")
  pared = loadImage("./images/torre.png")
  musicaRecord = loadSound("./sounds/aplauso.wav")
  musicaJuego = loadSound("./sounds/musicafondo.mp3")
  fuente = loadFont("./fonts/mexcellent.otf")
}

function setup() {
  // put setup code here
  createCanvas(1000,512)
  noCursor()
  textFont(fuente)
}

function draw() {
  // put d(rawing code here
  if (estado === 1) {
    imageMode(CORNER)
    background(255)
    image(imagenFondo,x, 0)
    image(imagenFondo, x + imagenFondo.width, 0)
    x = x - 5
    dY = dY + 1
    posY = posY + dY
    if (x <= -imagenFondo.width) {
      x = 0
    }
    //torre
    for (let i=0; i<wallX.length; i++) {
      imageMode(CENTER)
      let espacio = 150 // espacio entre torres
      let torreAncho = 80
      let torreAlto = 300 // altura de la torre
      // Torre superior (rotada)
      push()
      translate(wallX[i], wallY[i] - (torreAlto / 2 + espacio / 2))
      rotate(PI)
      image(pared, 0, 0, torreAncho, torreAlto)
      pop()

      // Torre inferior
      image(pared, wallX[i], wallY[i] + (torreAlto / 2 + espacio / 2), torreAncho, torreAlto)


      if (wallX[i] < 0) {
        wallX[i] = width
        wallY[i] = random(200, 300)
      }

      if (wallX[i] === 100) {
        puntaje = puntaje + 1
        puntajeMax = max(puntajeMax, puntaje)
      }

      wallX[i] = wallX[i] - 5  //Para que se muevan las torres
      if (posY < -60 || posY > height + 60 
               || (abs(wallX[i] - 100) < 60 
               && abs(wallY[i]-posY) > 100)) {
        musicaJuego.stop()
        estado = 0
      }

    }
    
    //Personaje
    image(personaje, 100, posY, 90, 90)
    text("Puntaje: " + puntaje, width/2-60, 30)
  } 
  else if (estado === 0) {
    background(0)
    imageMode(CORNER)
    cursor()
    image(imagenInicio, 0, 0, 350, 500)
    textSize(35)
    fill(255)
    text("Harry Bird", 600, 100)
    textSize(24)
    text("Puntaje Máximo: " + puntajeMax, 600, 200)
    text("Haga clic para comenzar", 600, 300)
    if (puntajeMax > recordAnterior) {
      if (!musicaRecord.isPlaying()) {
        musicaRecord.play()
      }
    }
  }
}

function mousePressed() {
  if (estado === 0) {
    estado = 1
    posY = 100
    x = 0
    dY = 3
    wallX = [500, 800, 1100]
    wallY[0] = random(200, 300)
    wallY[1] = random(200, 300)
    wallY[2] = random(200, 300)
    puntaje = 0
    recordAnterior = puntajeMax
    noCursor()
    if (musicaRecord.isPlaying()) {
      musicaRecord.stop()
    }
    musicaJuego.loop()
  }
  dY = -15
}
