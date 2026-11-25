import Phaser from 'phaser';
import idleUrl from '../assets/sprite/datoa/Idle.png';
import jumpUrl from '../assets/sprite/datoa/Jump.png';
import runUrl from '../assets/sprite/datoa/Run.png';
import housesUrl from '../assets/backgrounds/maisons-antananarivo-panoramique.png';
import rovaUrl from '../assets/backgrounds/rova-cartoon-background.png';

export class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload(): void {
    this.load.image('houses', housesUrl);
    this.load.image('rova', rovaUrl);
    this.load.spritesheet('original-idle', idleUrl, { frameWidth: 512, frameHeight: 512 });
    this.load.spritesheet('original-run', runUrl, { frameWidth: 512, frameHeight: 512 });
    this.load.spritesheet('original-jump', jumpUrl, { frameWidth: 512, frameHeight: 512 });
  }

  create(): void {
    // Exclude the transparent margins so each row meets the next at street level.
    this.textures.get('houses').add('row', 0, 17, 180, 2138, 360);
    this.createTextures();
    this.createPlayerAnimations();
    this.scene.start('Travel');
  }

  private createPlayerAnimations(): void {
    this.anims.create({
      key: 'original-idle',
      frames: this.anims.generateFrameNumbers('original-idle', { start: 0, end: 1 }),
      frameRate: 2,
      repeat: -1,
    });
    this.anims.create({
      key: 'original-run',
      frames: this.anims.generateFrameNumbers('original-run', { start: 0, end: 3 }),
      frameRate: 11,
      repeat: -1,
    });
    this.anims.create({
      key: 'original-jump',
      frames: this.anims.generateFrameNumbers('original-jump', { start: 0, end: 10 }),
      frameRate: 14,
      repeat: 0,
    });
  }

  private createTextures(): void {
    const graphics = this.add.graphics();

    graphics.fillStyle(0xffd166).fillRoundedRect(12, 14, 40, 60, 18);
    graphics.fillStyle(0xf45b69).fillCircle(32, 21, 17);
    graphics.fillStyle(0x152b38).fillCircle(26, 18, 3).fillCircle(38, 18, 3);
    graphics.fillStyle(0x152b38).fillRoundedRect(24, 44, 16, 24, 7);
    graphics.lineStyle(8, 0xffd166).lineBetween(17, 68, 7, 82).lineBetween(47, 68, 57, 82);
    graphics.generateTexture('runner', 64, 88);
    graphics.clear();

    graphics.fillStyle(0x815033).fillRoundedRect(13, 20, 38, 20, 8);
    graphics.lineStyle(5, 0x815033).lineBetween(15, 25, 4, 15);
    graphics.fillStyle(0x815033).fillRect(17, 34, 7, 16).fillRect(39, 34, 7, 16);
    graphics.fillStyle(0xbe8050).fillCircle(49, 19, 13).fillEllipse(58, 25, 16, 11);
    graphics.fillStyle(0x543323).fillEllipse(43, 18, 9, 15);
    graphics.fillStyle(0x292329).fillCircle(53, 17, 2).fillCircle(63, 23, 3);
    graphics.generateTexture('dog', 68, 50);
    graphics.clear();

    graphics.fillStyle(0xffc143).fillRoundedRect(1, 24, 94, 22, 7);
    graphics.fillStyle(0xf6a323).fillRoundedRect(21, 8, 57, 25, 8).fillRoundedRect(42, 1, 16, 10, 3);
    graphics.fillStyle(0x416576).fillRoundedRect(25, 12, 22, 14, 3).fillRoundedRect(51, 12, 23, 14, 3);
    graphics.fillStyle(0x3a3030).fillRect(3, 34, 90, 4).fillCircle(23, 43, 10).fillCircle(75, 43, 10);
    graphics.fillStyle(0xded7c9).fillCircle(23, 43, 4).fillCircle(75, 43, 4);
    graphics.fillStyle(0xfff0c0).fillRoundedRect(2, 28, 8, 6, 2);
    graphics.generateTexture('taxi', 96, 53);
    graphics.clear();

    graphics.fillStyle(0x303038).fillCircle(13, 40, 10).fillCircle(60, 40, 10);
    graphics.fillStyle(0xdacfd0).fillCircle(13, 40, 4).fillCircle(60, 40, 4);
    graphics.lineStyle(5, 0x655358).lineBetween(13, 40, 23, 10).lineBetween(23, 10, 31, 10);
    graphics.fillStyle(0x3c9e9e).fillRoundedRect(15, 23, 15, 17, 6).fillRoundedRect(23, 34, 35, 7, 3);
    graphics.fillStyle(0x3c9e9e).fillEllipse(55, 30, 27, 18);
    graphics.fillStyle(0x49353c).fillRoundedRect(42, 19, 22, 7, 3);
    graphics.fillStyle(0xffedba).fillCircle(20, 22, 4);
    graphics.generateTexture('scooter', 72, 50);
    graphics.clear();

    graphics.lineStyle(3, 0xda8528).lineBetween(19, 30, 18, 42).lineBetween(27, 30, 27, 42);
    graphics.fillStyle(0xe9b77d).fillTriangle(14, 28, 3, 13, 22, 20);
    graphics.fillStyle(0xffebc4).fillEllipse(23, 25, 30, 22).fillCircle(32, 14, 9);
    graphics.fillStyle(0xd94737).fillCircle(30, 5, 3).fillCircle(35, 6, 3);
    graphics.fillStyle(0xe89a38).fillTriangle(39, 13, 46, 16, 39, 19);
    graphics.fillStyle(0x382b2a).fillCircle(34, 13, 2);
    graphics.generateTexture('hen', 47, 42);
    graphics.clear();

    graphics.fillStyle(0x337b92).fillRoundedRect(5, 12, 42, 21, 9);
    graphics.fillStyle(0x64b9c0).fillEllipse(26, 13, 51, 17);
    graphics.fillStyle(0x285971).fillEllipse(26, 13, 42, 11);
    graphics.fillStyle(0x8ed1cc).fillEllipse(26, 16, 33, 5);
    graphics.generateTexture('basin', 52, 34);
    graphics.clear();

    graphics.fillStyle(0x6b321f).fillRect(0, 0, 170, 30);
    graphics.fillStyle(0xf1bd55).fillRect(0, 0, 170, 7);
    graphics.fillStyle(0x8e4a25).fillTriangle(5, 8, 85, 29, 165, 8);
    graphics.generateTexture('platform', 170, 30);
    graphics.clear();

    graphics.fillStyle(0x234b2d).fillCircle(20, 36, 20).fillCircle(48, 28, 28).fillCircle(76, 39, 19);
    graphics.fillStyle(0x4f8a3d).fillCircle(28, 27, 14).fillCircle(57, 20, 16);
    graphics.fillStyle(0xf0bd4f).fillCircle(48, 24, 3).fillCircle(68, 36, 3);
    graphics.generateTexture('bush', 96, 58);
    graphics.clear();

    graphics.fillStyle(0x2d6438);
    for (let x = 0; x < 256; x += 32) {
      graphics.fillTriangle(x, 48, x + 11, 5, x + 20, 48);
      graphics.fillTriangle(x + 15, 48, x + 28, 19, x + 35, 48);
    }
    graphics.fillStyle(0x79a34b).fillRect(0, 43, 256, 5);
    graphics.generateTexture('grass', 256, 48);
    graphics.clear();

    graphics.destroy();
  }
}
