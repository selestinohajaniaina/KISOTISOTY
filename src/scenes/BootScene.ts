import Phaser from 'phaser';

export class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  create(): void {
    this.createTextures();
    this.scene.start('Travel');
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

    graphics.fillStyle(0x543e35).fillTriangle(2, 54, 25, 8, 45, 54).fillTriangle(24, 54, 48, 2, 70, 54);
    graphics.fillStyle(0xb19a80).fillTriangle(10, 48, 25, 14, 36, 48);
    graphics.fillStyle(0x8f7868).fillTriangle(35, 47, 49, 9, 61, 47);
    graphics.generateTexture('rock', 72, 56);
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

    graphics.fillStyle(0x3d713f).fillCircle(44, 78, 42).fillCircle(98, 57, 55).fillCircle(156, 80, 45);
    graphics.fillStyle(0x57904b).fillCircle(70, 55, 29).fillCircle(130, 50, 32);
    graphics.generateTexture('plants', 200, 120);
    graphics.destroy();
  }
}
