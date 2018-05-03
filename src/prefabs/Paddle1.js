import Phaser from 'phaser'

class Paddle1 extends Phaser.Sprite {

	constructor (game, x, y){
		super(game, x, y, 'paddle')

		this.game.physics.arcade.enableBody(this)

		this.anchor.setTo(0.5,0.5)

		this.body.immovable = true

		
	}



	update(){
		

	if(this.game.input.keyboard.isDown(Phaser.Keyboard.A)){
		this.x -=6;
	}
	if(this.game.input.keyboard.isDown(Phaser.Keyboard.D)){
		this.x +=6;
	}



	}
}


export default Paddle1