import Phaser from 'phaser'
import Brick from '../prefabs/Brick'
import Paddle from '../prefabs/Paddle'
import Ball from '../prefabs/Ball'
import Title from '../prefabs/Title'
import WebFont from 'webfontloader'
import globals from './globals/index'
import config from '../config';
import Paddle1 from '../prefabs/Paddle1'

import { clone } from 'lodash'
var hitsound
var over

export default class extends Phaser.State {

  constructor(){
  super()

  this.ballOnPaddle= true

  }
init() {
	this.stage.backgroundColor = '#d3d3d3'
    this.fontsReady = false

 }
 initGlobalVariables(){
    this.game.global = clone(globals)
  }

  preload() {
  this.load.image('loaderBg', './assets/images/loader-bg.png')
    this.load.image('loaderBar', './assets/images/loader-bar.png')
    this.load.image('brick','./assets/images/breakout_pieces.png')
    this.load.image('paddle', './assets/images/paddle.png ')
    this.load.image('ball', './assets/images/balls.png')
    this.load.image('title', './assets/images/breakout.png')
    this.load.audio('intro', './assets/audio/Intro.mp3')
    this.load.audio('phit', './assets/audio/ballhitpaddle.mp3')
    this.load.audio('gamesound', './assets/audio/gameover.mp3')

  }

  create() {
  	this.game.physics.arcade.checkCollision.down=false
  		this.initGlobalVariables()
  	    this.setUpBricks()
  	    this.setUpPaddle()
        this.setHitPaddleSound()
    	this.setUpPaddle1()
    	this.setUpBall()
    	this.game.input.onDown.add(this.releaseBall, this)
    	this.setUpText()
   	    this.refresh()


	}
refresh(){
 window.onbeforeunload = function() {
        return 'If you resubmit this page, progress will be lost.';
    }
   }


setUpText(){
	this.createText(20, 30,'left',`User : `)

    this.scoreText = this.createText(-50, 30,'right',`Score: ${this.game.global.score}`)
    this.livesText = this.createText(-50, 50,'right',`Lives: ${this.game.global.lives}`)
    this.levelText= this.createText(-50, 70,'right',`Level: ${this.game.global.level}`)

}
createText(xOffset, yOffset, align, text){
    return this.game.add.text(
      xOffset,
      yOffset,
       text,
        {
          font: '18px Courier',
          fill:'#000',
          boundsAlignH: align
        }
      ).setTextBounds(0,0,this.game.world.width, 0)
   }

setUpBall(){
	this.ball = new Ball(this.game)
      this.game.add.existing(this.ball)

    this.ball.events.onOutOfBounds.add(this.ballLost, this)
      this.putBallOnPaddle()
}
putBallOnPaddle(){
      this.ballOnPaddle=true
      this.ball.reset(this.paddle.body.x, this.paddle.y- this.paddle.body.height)


    }


 ballLost(){

      --this.game.global.lives

      this.livesText.text = `Lives: ${this.game.global.lives}`

      if(this.game.global.lives == 0){


        this.endGame()
        return

      }
            this.putBallOnPaddle()
     }
  setHitPaddleSound(){

    hitsound = this.game.add.audio('phit')

 }
releaseBall(){

    if(!this.ballOnPaddle){

        return
    }
    this.ballOnPaddle=false


    this.ball.body.velocity.y=-650

    this.ball.body.velocity.x=+100
   }


setUpBricks(){
	this.bricks = this.game.add.group()
    this.generateBricks(this.bricks)
    this.generateBricks1(this.bricks)

}

setUpPaddle(){
this.paddle = new Paddle(
    this.game,
    this.game.world.centerX*1.5,
    this.game.world.height - 200
    )
    this.game.add.existing(this.paddle)
}
setUpPaddle1(){
this.paddle1 = new Paddle1(
    this.game,
    this.game.world.centerX*0.5,
    this.game.world.height - 300
    )
    this.game.add.existing(this.paddle1)

}
generateBricks(bricksGroup){

    let rows = 4
    let columns = 33
    let xOffset = 55
    let yOffset = 45
    let brick
    let brick1
    for (let y = 0; y< 4; y++){

      for (let x=0; x< 12; x++){

        brick = new Brick(
            this.game,
            x * xOffset,
            y * yOffset

          )
        bricksGroup.add(brick)
       }

      for (let x=20; x< columns; x++){

        brick = new Brick(
            this.game,
            x * xOffset,
            y * yOffset

          )
        bricksGroup.add(brick)

        }
    }
     let bricksGroupWidth = ((xOffset * columns)- (xOffset - brick.width))/2

      bricksGroup.position.setTo(
          this.game.world.centerX - bricksGroupWidth,
          this.game.world.centerY - 250

        )
   }
generateBricks1(bricksGroup){

	let rows = 2
    let columns = 33
    let xOffset = 55
    let yOffset = 45
    let brick

    for (let y = 0; y< rows; y++){

      for (let x=0; x< columns; x++){

        brick = new Brick(
            this.game,
            x * xOffset,
            y * yOffset

          )
        bricksGroup.add(brick)
       }
    }


      let bricksGroupWidth = ((xOffset * columns)- (xOffset - brick.width))/2

      bricksGroup.position.setTo(
          this.game.world.centerX - bricksGroupWidth,
          this.game.world.centerY - 300

        )



}
endGame(){
      this.game.state.start('End1')


      return
    }

       ballHitPaddle(ball, paddle){

        let diff = 0


        if (ball.x<paddle.x){

          diff = paddle.x-ball.x
          ball.body.velocity.x = (-6 * diff)
          return
        }

        if (ball.x>paddle.x){

          diff = ball.x-paddle.x
          ball.body.velocity.x = (6 * diff)
          return
        }


       }

   update(){



    if(this.ballOnPaddle){
      this.ball.body.x = this.paddle.x - (this.ball.width/2)

    }

      this.game.physics.arcade.collide(
          this.ball,
          this.paddle,
          this.ballHitPaddle,
          null,
          this
        )
	this.game.physics.arcade.collide(
          this.ball,
          this.paddle1,
          this.ballHitPaddle,
          null,
          this
        )


         this.game.physics.arcade.collide(
        this.ball,
        this.bricks,
        this.ballHitBrick,
        null,
        this

      )

   }
    ballHitBrick(ball, brick){

    brick.kill()
    hitsound.play()
    console.log(this.bricks.countLiving())


    if (brick.position.y ==135){

      this.game.global.score+=1
    this.scoreText.text = `Score: ${this.game.global.score}`

    }

    if (brick.position.y ==90){

      this.game.global.score+=1
    this.scoreText.text = `Score: ${this.game.global.score}`
    }


    if (brick.position.y ==0){

      this.game.global.score+=5
    this.scoreText.text = `Score: ${this.game.global.score}`

    }


    if (brick.position.y ==45){

      this.game.global.score+=5
    this.scoreText.text = `Score: ${this.game.global.score}`
    }


    if (this.bricks.countLiving()==0) {

      this.game.global.level +=1
      console.log(this.game.global.level)
      this.game.state.start('secondSimul')


    }

}



render() {
    if (config.webfonts.length && this.fontsReady) {
      this.state.start('Splash')
    }
    if (!config.webfonts.length) {
      this.state.start('Splash')
    }
  }

 }
