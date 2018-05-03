/* globals __DEV__ */
import Phaser from 'phaser'
import Brick from '../prefabs/Brick'
import Paddle from '../prefabs/Paddle'
import Ball from '../prefabs/Ball'
import Title from '../prefabs/Title'

var music
var hitsound
var over

export default class extends Phaser.State {

  constructor(){
  super()

  this.ballOnPaddle= true

  }
  init() { }
  preload() { }

  create() {

    this.game.physics.arcade.checkCollision.down=false

    this.setUpAudio()
    this.setUpText()

    this.setUpBricks()

    this.setUpPaddle()
    this.setUpBall()
    this.setupTitle()
    this.setHitPaddleSound()
    this.setGameOverSound()

    this.game.input.onDown.add(this.releaseBall, this)

    this.refresh()


   }




   refresh(){
 window.onbeforeunload = function() {
        return 'If you resubmit this page, progress will be lost.';

    };



   }

   setUpAudio(){

    music = this.game.add.audio('intro')
    music.loopFull(0.6);
 }
 setGameOverSound(){

    over = this.game.add.audio('gamesound')
 }
   setHitPaddleSound(){

    hitsound = this.game.add.audio('phit')

 }
   setupTitle(){
     this.title = new Title(this.game,this.game.world.centerX-200, this.game.world.height-920)
     this.game.add.existing(this.title)

   }

   releaseBall(){

    if(!this.ballOnPaddle){

        return
    }
    this.ballOnPaddle=false


    this.ball.body.velocity.y=-400

    this.ball.body.velocity.x=+100
   }

   setUpBricks(){
    this.bricks = this.game.add.group()
    this.generateBricks(this.bricks)


   }


    ballLost(){

      --this.game.global.lives

      this.livesText.text = `Lives: ${this.game.global.lives}`

      if(this.game.global.lives == 0){


        this.endGame()
        return

      }

      this.camera.shake(0.4, 100, true, Phaser.Camera.SHAKE_BOTH, true);
      this.putBallOnPaddle()
    }
    putBallOnPaddle(){
      this.ballOnPaddle=true
      this.ball.reset(this.paddle.body.x, this.paddle.y- this.paddle.body.height)


    }

    setUpBall(){

      this.ball = new Ball(this.game)
      this.game.add.existing(this.ball)




      this.ball.events.onOutOfBounds.add(this.ballLost, this)
      this.putBallOnPaddle()
    }
    endGame(){
      over.play()
      this.game.state.start('End')


      return
    }




   setUpPaddle(){
    this.paddle = new Paddle(
    this.game,
    this.game.world.centerX,
    this.game.world.height - 200
    )
    this.game.add.existing(this.paddle)
   }



   generateBricks(bricksGroup){

    let rows = 4
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
          this.game.world.centerY - 250

        )
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
        this.bricks,
        this.ballHitBrick,
        null,
        this

      )




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

   ballHitBrick(ball, brick){

    brick.kill()

    hitsound.play()

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

      music.stop()
            this.game.global.level +=1



      this.game.state.start('singlesecond')

    }




   }

  render() {

  }
}
