/* globals __DEV__ */
import Phaser from 'phaser'

import Character from '../sprites/Character'

var mouseInput 
var firstY = 0
var firstX = 0
var tim = 0
var text;
var textTime
var timedEvent
var bear
var monkey
var crocodile
var alienLife = 3
 class GameScene extends Phaser.Scene {
  constructor () {
    super({ key: 'GameScene' })
  }
  init () {}
  preload () {}

  create () {
  
  //el fondo
    mouseInput = this.input
    this.add.image(400,300,'background')
    text = this.add.text(250, 400, 'Arrastra el oso hacia delante!!', {
      font: '30px Bangers',
      fill: '#7744ff'
    })
    //el enemigo 
    var alien = this.alien
    alien = new Character({
      scene: this,
      x: 400,
      y: 200,
      asset: 'alien'
    })
    

   var dog = this.dog
   dog = new Character({
      scene: this,
      x: 300,
      y: 690,
      asset: 'dog'
    })
    var frog = this.frog
    frog = new Character({
      scene: this,
      x: 500,
      y: 700,
      asset: 'frog'
    })
    var gorilla = this.gorilla
    gorilla = new Character({
      scene: this,
      x: 700,
      y: 700,
      asset: 'gorilla'
    })
    
    bear = this.physics.add.sprite(80,700,'bear')
    //bear.setGravityY(-1)
    //con esto eliminamos la gravedad del oso pero aun asi sigue teniendo fisica para poder atacar
    bear.body.setAllowGravity(false)
    crocodile = this.physics.add.sprite(180,500,'crocodile')
    crocodile.body.setAllowGravity(false)
    monkey = this.physics.add.sprite(640,500,'monkey')
    monkey.body.setAllowGravity(false)
    this.physics.add.collider(bear,alien)
    this.physics.add.collider(bear,alien,crocodile,monkey)
    //Las cartas para arrastrar
    firstY = bear.y
    firstX = bear.x 
    console.log(firstX,firstY)
    dragBear(bear)
  
 textTime = this.add.text(32,32,'', {
  font: '30px Bangers',
  fill: '#7744ff'
});
 timedEvent = this.time.addEvent({
   delay: 5000,
   callback: startBattle,
   callbackScope: this
 })
 textTime.setText('La batalla comienza en 5 segundos!')

   this.add.existing(bear)
   this.add.existing(alien)
   this.add.existing(dog)
   this.add.existing(frog)
   this.add.existing(gorilla)
   this.add.existing(crocodile)
   this.add.existing(monkey)
   
   //Hago esto para poder usarlos bien en las funciones de momento
   this.dog = dog
   this.bear = bear
   this.gorilla = gorilla
   this.frog = frog
   this.crocodile = crocodile
   this.monkey = monkey
  /* group.add(bear)
   group.add(monkey)
   group.add(crocodile)*/
 //this.input.on('pointerdown',this.jump, this)
  }
  update(){
    //textTime.setText('Tiempo transcurrido:  '+timedEvent.getProgress().toString().substr(0,4))
  }
}


// Aqui controlamos que el oso este en sus dos posibles casillas
function dragBear(bear){
  bear.setInteractive({ draggable:  true})
  bear.on('drag',function(pointer, gameObject, dragX, dragY){
    console.log('me has intentado arrastrar')
    bear.x = mouseInput.x
    bear.y = mouseInput.y
   
   //controlo que no se salga sus dos posibles casillas
    if(bear.y<650 || bear.x > 150 ){
      bear.y = 500
      bear.x = 400
      console.log('estoy aqui')
      return

    }else{
      bear.x = 80
      bear.y = 700
    }
    
    console.log('la x: '+bear.x+' la y: '+bear.y)
  })
}

function startBattle(){
  //console.log('termino el time')
  text.setText('La batalla ha comenzado!!')
  textTime.setText('')
  //No se porque se sigue pudiendo arrastrar si lo he puesto en false
 // this.bear.setInteractive({ draggable:  false})
  this.dog.visible = false
  this.frog.visible = false
  this.gorilla.visible = false
  //El ataque del oso
  this.tweens.add({
    targets: this.bear,
    y: 200,
    duration: 500,
    ease: function (t){
      return Math.pow(Math.sin( t*3),3);
    },
    delay: 500,
    repeat : 2
  })

 
 

}
function killAlien(){
  alienLife--
  if(alienLife<0){
    this.bear.visible = false
    this.crocodile.visible = false
    this.monkey.visible = false
    text.setText('Victoria!!')
  }
}



export default GameScene;


