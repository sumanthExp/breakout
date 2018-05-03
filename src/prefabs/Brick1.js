import Phaser from 'phaser'

class Brick1 extends Phaser.Sprite {

	constructor (game, x, y){
		super(game, x, y, 'brick1')

		this.game.physics.arcade.enableBody(this)

		this.body.immovable = true
	}
}


export default Brick1
