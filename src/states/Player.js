import Phaser from 'phaser'
import Title from '../prefabs/Title'
import config from '../config';

var bmd;
var innerCircle;
var outerCircle;
var single;

export default class extends Phaser.State {
  init () {
    this.stage.backgroundColor = '#d3d3d3'
    this.fontsReady = false
  }

  preload () {
        this.load.image('title', './assets/images/breakout.png')
        this.load.image('ball', './assets/images/balls.png')
        this.load.image('playerone', './assets/images/single.png')
        this.load.image('twoplayer', './assets/images/double.png')
  }

  create () {
      this.game.physics.arcade.checkCollision.down=true
      this.setupTitle()
      this.setUpsingle()
      this.setUpdouble()
  }
  setupTitle(){
     this.title = new Title(this.game,this.game.world.centerX-200, this.game.world.height-920)
     this.game.add.existing(this.title)
   }
   setUpsingle(){
     single = game.add.button(game.world.centerX*0.6, this.game.height*0.40, 'playerone', this.actionOnClick, this, 2, 1, 0);
  }
    setUpdouble(){
      var double
      double = game.add.button(this.game.world.centerX*1.2, this.game.height*0.40, 'twoplayer', this.actiondouble ,this, 2, 1, 0);
    }
  actionOnClick(){
      this.game.state.start('Boot')

  }

  actiondouble(){

      this.game.state.start('Simultaneous')
  }


  render() {
    if (config.webfonts.length && this.fontsReady) {
      this.state.start('Splash')
    }
    if (!config.webfonts.length) {
      this.state.start('Splash')
    }
  }

  fontsLoaded() {
    this.fontsReady = true
  }


  update(){


  }

}
