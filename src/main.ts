import Phaser from 'phaser';
import './style.css';
import { BootScene } from './scenes/BootScene';
import { TravelScene } from './scenes/TravelScene';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'game',
  width: 960,
  height: 540,
  backgroundColor: '#101b26',
  scene: [BootScene, TravelScene],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 1650 },
      debug: import.meta.env.DEV && new URLSearchParams(location.search).has('debug'),
    },
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    min: { width: 568, height: 320 },
    max: { width: 1280, height: 720 },
  },
  input: {
    activePointers: 3,
    touch: { capture: true },
  },
  render: {
    antialias: true,
    roundPixels: true,
  },
};

new Phaser.Game(config);
