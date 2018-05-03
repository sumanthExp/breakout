import Phaser from 'phaser'
import WebFont from 'webfontloader'
import config from '../config';
import globals from './globals/index'
import { clone } from 'lodash'

export default class extends Phaser.State {
  init() {
    this.stage.backgroundColor = '#d3d3d3'
    this.fontsReady = false
    this.fontsLoaded = this.fontsLoaded.bind(this)
  }
  create(){
    this.initGlobalVariables()

  }

  initGlobalVariables(){
    this.game.global = clone(globals)
  }

  preload() {
    if (config.webfonts.length) {
      WebFont.load({
        google: {
          families: config.webfonts
        },
        active: this.fontsLoaded
      })
    }

    let text = this.add.text(this.world.centerX, this.world.centerY, 'loading fonts', { font: '16px Arial', fill: '#dddddd', align: 'center' })
    text.anchor.setTo(0.5, 0.5)

    this.load.image('loaderBg', './assets/images/loader-bg.png')
    this.load.image('loaderBar', './assets/images/loader-bar.png')
    this.load.image('brick','./assets/images/breakout_pieces.png')
    this.load.image('paddle', './assets/images/paddle.png ')
    this.load.image('ball', './assets/images/balls.png')
    this.load.image('title', './assets/images/breakout.png')
    this.load.audio('intro', './assets/audio/Intro.mp3')
    this.load.audio('phit', './assets/audio/ballhitpaddle.mp3')
    this.load.audio('gamesound', './assets/audio/gameover.mp3')
    this.load.image('brick1','./assets/images/splBrick.png')

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
}
