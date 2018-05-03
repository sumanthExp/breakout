import Phaser from 'phaser'

class Paddle extends Phaser.Sprite {

	constructor (game, x, y){
		super(game, x, y, 'paddle')

		this.game.physics.arcade.enableBody(this)

		this.anchor.setTo(0.5,0.5)

		this.body.immovable = true

		
	}



	update(){
	
	if(this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
		this.x -=6;
	}
	if(this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
		this.x +=6;
	}



	}
}


export default Paddle