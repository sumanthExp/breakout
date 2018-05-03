import Phaser from 'phaser'
import Brick from '../prefabs/Brick'
import Paddle from '../prefabs/Paddle'
import Ball from '../prefabs/Ball'
import Title from '../prefabs/Title'
import Brick1 from '../prefabs/Brick1'
var bullets;
var cursors;
var bulletTime = 0;
var bullet;
var timer = 1000;
var current;
var single;
export default class extends Phaser.State {
	constructor(){
		super()
  		this.ballOnPaddle= true
	}
	init() { }
  	preload() {
  		this.load.image('bullet','./assets/images/bullet0.png')
			this.load.image('splBrick','./assests/images/splBrick.png')
			this.load.audio('single','/assets/audio/single.mp3')

  	 }
  	 create() {
  	 	this.game.physics.arcade.checkCollision.down=false
 	    this.setUpBricks()
 	    this.setUpPaddle()
 	    this.setUpBall()
 	    this.setUpText()
			this.setUpBrick1()
			this.setUpSingleaudio()
 	    this.game.input.onDown.add(this.releaseBall, this)

			bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;

    for (var i = 0; i < 20; i++)
    {
        var b = bullets.create(0, 0, 'bullet');
        b.name = 'bullet' + i;
        b.exists = false;
        b.visible = false;
        b.checkWorldBounds = true;
        b.events.onOutOfBounds.add(this.resetBullet, this);
    }

	}
	setUpSingleaudio(){
		single = this.game.add.audio('single');
		single.loopFull(0.6)


	}


	releaseBall(){

    if(!this.ballOnPaddle){

        return
    }
    this.ballOnPaddle=false


    this.ball.body.velocity.y=-600

    this.ball.body.velocity.x=+200
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
	ballLost(){

      --this.game.global.lives

      this.livesText.text = `Lives: ${this.game.global.lives}`

      if(this.game.global.lives == 0){
						single.stop()


        this.endGame()
        return

      }

      this.camera.shake(0.4, 100, true, Phaser.Camera.SHAKE_BOTH, true);
      this.putBallOnPaddle()
    }
		endGame(){

      this.game.state.start('End')


      return
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
	setUpPaddle(){
		this.paddle = new Paddle(
    	this.game,
    	this.game.world.centerX,
    	this.game.world.height - 200
    	)
    	this.game.add.existing(this.paddle)
	}

	setUpBricks(){
		this.bricks = this.game.add.group()
    	this.generateBricks(this.bricks)
			this.generateBricks1(this.bricks)
	}
	setUpBrick1(){

		this.brick1 = this.game.add.group()
		this.generateBtick2(this.brick1)
		}
	generateBtick2(bricksGroup1){
		let rows =1
		let columns = 1
		let xOffset = 55
		let yOffset = 45
		let brick1
		for (let y = 0; y<1; y++){
			for( let x =0;x<1;x++){
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



	generateBricks(bricksGroup){

    let rows = 4
    let columns = 33
    let xOffset = 55
    let yOffset = 40
    let brick
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
   ballHitBrick(ball, brick){


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
			single.stop()
			this.game.state.start('End')
}

	}
	fireBullet () {

	    if (this.game.time.now > bulletTime)
	    {
	        bullet = bullets.getFirstExists(false);

	        if (bullet)
	        {
	            bullet.reset(this.paddle.x + 6, this.paddle.y - 8);
	            bullet.body.velocity.y = -200;
	            bulletTime = game.time.now + 150;
	        }
	    }

	}


resetBullet (bullet) {

    bullet.kill();


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
ballHitRed(ball, brick1){
	brick1.kill()
	current = `${this.game.global.lives}`

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
		single.stop()
		this.game.state.start('End')
}

}


   update(){


	//	 if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
// {
	//	 this.fireBullet()


 //}

    if(this.ballOnPaddle){
      this.ball.body.x = this.paddle.x - (this.ball.width/2)
    }

    this.game.physics.arcade.collide(

        this.ball,
        this.bricks,
        this.ballHitBrick,
        null,
        this

      )
			this.game.physics.arcade.collide(
				this.ball,
				this.paddle,
				this.ballHitPaddle,
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
			if(this.brick1.countLiving()==0 && current == `${this.game.global.lives}`){
				this.fireBullet()
			}


}

}
