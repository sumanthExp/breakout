import Phaser from 'phaser'
import Brick from '../prefabs/Brick'
import Paddle from '../prefabs/Paddle'
import Ball from '../prefabs/Ball'
import Title from '../prefabs/Title'
import WebFont from 'webfontloader'
import config from '../config'
import Paddle1 from '../prefabs/Paddle1'
import Brick1 from '../prefabs/Brick1'
var flag;
import { clone } from 'lodash'
var bullets;
var over;
var fire;
var fires;
var fireTime=0;
var flame;
var bullet;
var bulletTime = 0;
var second;
var current;

export default class extends Phaser.State {

  constructor(){
  super()

  this.ballOnPaddle= true

  }
init() {
	this.stage.backgroundColor = '#d3d3d3'
    this.fontsReady = false;
 }


  preload() {
  this.load.image('loaderBg', './assets/images/loader-bg.png')
    this.load.image('loaderBar', './assets/images/loader-bar.png')
    this.load.image('brick','./assets/images/breakout_pieces.png')
    this.load.image('paddle', './assets/images/paddle.png ')
    this.load.image('ball', './assets/images/balls.png')
    this.load.image('title', './assets/images/breakout.png')
    this.load.audio('intro', './assets/audio/Intro.mp3')
    this.load.audio('gamesound', './assets/audio/gameover.mp3')
    this.load.image('fire','./assets/images/fire.png')
    this.load.audio('flame', './assets/audio/flame.mp3')
    this.load.image('brick1','./assets/images/splBrick.png')
    this.load.image('bullet','./assets/images/bullet0.png')
    this.load.audio('second','./assets/audio/second.mp3')
  }

  create() {
  	this.game.physics.arcade.checkCollision.down=false

  	  this.setUpBricks()
  	  this.setUpPaddle()

      this.setUpFlameSound()
    	this.setUpPaddle1()
    	this.setUpBall()
    	this.game.input.onDown.add(this.releaseBall, this)
    	this.setUpText()
   	  this.refresh()
      this.setUpBrick1()
      this.setUpBackgrund()


        fires = game.add.group();
      fires.enableBody = true;
      fires.physicsBodyType = Phaser.Physics.ARCADE;

      for (var i = 0; i < 20; i++)
      {
          var b = fires.create(0, 0, 'fire');
          b.name = 'fire' + i;
          b.exists = false;

          b.visible = false;
          b.checkWorldBounds = true;
          b.events.onOutOfBounds.add(this.resetfire, this);
      }

      bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;

    for (var i = 0; i < 20; i++)
    {
        var c = bullets.create(0, 0, 'bullet');
        c.name = 'bullet' + i;
        c.exists = false;
        c.visible = false;
        c.checkWorldBounds = true;
        c.events.onOutOfBounds.add(this.resetBullet, this);
    }

	}
  setUpBrick1(){

		this.brick1 = this.game.add.group()
		this.generateBrick2(this.brick1)
		}
	generateBrick2(bricksGroup1){
		let rows =4
		let columns = 33
		let xOffset = 55
		let yOffset = 45
		let brick1
		for (let y = 0; y<rows; y++){
			for( let x =0;x<columns;x++){
				brick1 = new Brick1(
					this.game,
					x*xOffset,
					y* yOffset
				)
				bricksGroup1.add(brick1)
			}

		}
		let bricksGroup1Width = ((xOffset* columns)- (xOffset -  brick1.width))/2
		bricksGroup1.position.setTo(
		this.game.world.centerX - bricksGroup1Width,
		this.game.world.centerY - 300

			)

	}
  fireBullet () {

      if (this.game.time.now > bulletTime)
      {
          bullet = bullets.getFirstExists(false);

          if (bullet)
          {
              if(flag==0){
                bullet.reset(this.paddle.x + 6, this.paddle.y - 8);
                bullet.body.velocity.y = -200;
                bulletTime = game.time.now + 150;

              }
              if(flag==1){
                bullet.reset(this.paddle1.x + 6, this.paddle1.y - 8);
                bullet.body.velocity.y = -200;
                bulletTime = game.time.now + 150;
              }

          }
      }

  }

  resetBullet (bullet) {
      bullet.kill();
  }
  resetfire (fire) {

      fire.kill();


  }
  startFire(){

	    if (this.game.time.now > fireTime)
	    {
	        fire = fires.getFirstExists(false);

	        if (fire)
	        {
          flame.play()
	        fire.reset(this.game.world.centerX * game.rnd.realInRange(0,2), 0);

	        fire.body.velocity.y = game.rnd.integerInRange(100,350);
	        fireTime = game.time.now + 150;
	        }
	    }

	}
refresh(){
 window.onbeforeunload = function() {
        return 'If you resubmit this page, progress will be lost.';
    }
   }



setUpText(){
  console.log("Next State")
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

 setUpFlameSound(){
   flame = this.game.add.audio('flame');
 }
 setUpBackgrund(){
   second = this.game.add.audio('second')
   second.loopFull(0.6)
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
    fireHitPaddle(fires, paddle){

      fire.kill()
      this.camera.shake(0.4, 100, true, Phaser.Camera.SHAKE_BOTH, true);

      this.ball.kill()

      this.ballLost()

      }
      bulletHitBrick(bullet, brick){
      	bullet.kill()
      	brick.kill()
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
          second.stop()
      		this.game.state.start('End1')

      }

      }
      ballHitRed(ball, brick1){
      	brick1.kill()
        current = `${this.game.global.lives}`
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
          this.ballHitPaddle1,
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
      this.game.physics.arcade.collide(
        fires,
        this.paddle,
        this.fireHitPaddle,
        null,
        this
      )
      this.game.physics.arcade.collide(
        fires,
        this.paddle1,
        this.fireHitPaddle,
        null,
        this
      )
      game.physics.arcade.overlap(
				  bullets,
	        this.bricks,
	        this.bulletHitBrick,
	        null,
	        this

	      )
      game.physics.arcade.collide(
        this.ball,
        this.brick1,
        this.ballHitRed,
        null,
        this
      )
      if(this.brick1.countLiving()==0){
				this.fireBullet()
			}



   }
   ballHitPaddle(ball, paddle){

    let diff = 0
    console.log(flag)
    flag = 0
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
   ballHitPaddle1(ball, paddle1){
    let diff = 0
    flag = 1
    if (ball.x<paddle1.x){

      diff = paddle1.x-ball.x
      ball.body.velocity.x = (-6 * diff)
      return
    }

    if (ball.x>paddle1.x){

      diff = ball.x-paddle1.x
      ball.body.velocity.x = (6 * diff)
      return
    }


   }
    ballHitBrick(ball, brick){
    this.startFire()

    brick.kill()
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
    if (this.bricks.countLiving()==0 && current == `${this.game.global.lives}`) {
    this.game.state.start('End1')
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
