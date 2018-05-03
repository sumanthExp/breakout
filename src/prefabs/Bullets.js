import Phaser from 'phaser'

class Bullets extends Phaser.Sprite {

	constructor (game, x, y){
		super(game, x, y, 'bullets')

		this.game.physics.arcade.enableBody(this)

		this.anchor.setTo(0.5,0.5)

		this.checkWorldBounds = true

		this.body.collideWorldBounds = true

		this.body.bounce.set(1)


		
	}



}


export default Bullets