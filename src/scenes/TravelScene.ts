import Phaser from 'phaser';

const WIDTH = 960;
const HEIGHT = 540;
const GROUND_Y = 448;
const PLAYER_X = 60;
const START_SPEED = 260;
const MAX_SPEED = 620;
const JUMP_SPEED = 700;
const PLAYER_SCALE = 0.19;
const HOUSES_HEIGHT = 180;
const HOUSES_SCROLL_FACTOR = 0.2;
const STREET_OBSTACLES = ['dog', 'taxi', 'scooter', 'hen', 'basin'];
type RunState = 'ready' | 'running' | 'over';

export class TravelScene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite;
  private ground!: Phaser.GameObjects.Rectangle;
  private hazards!: Phaser.Physics.Arcade.Group;
  private platforms!: Phaser.Physics.Arcade.Group;
  private decorations!: Phaser.GameObjects.Group;
  private houses!: Phaser.GameObjects.TileSprite;
  private grass!: Phaser.GameObjects.TileSprite;
  private scoreText!: Phaser.GameObjects.Text;
  private messageText!: Phaser.GameObjects.Text;
  private cryDecor!: Phaser.GameObjects.Sprite;
  private hearts: Phaser.GameObjects.Arc[] = [];
  private state: RunState = 'ready';
  private distance = 0;
  private speed = START_SPEED;
  private spawnDistance = 500;
  private lives = 3;
  private invincible = false;

  constructor() { super('Travel'); }

  create(): void {
    this.createEnvironment();
    this.createPlayer();
    this.hazards = this.physics.add.group({ allowGravity: false, immovable: true });
    this.platforms = this.physics.add.group({ allowGravity: false, immovable: true });
    this.decorations = this.add.group();
    this.createInterface();
    this.physics.add.collider(this.player, this.ground);
    this.physics.add.collider(this.player, this.platforms, undefined, this.canLand, this);
    this.physics.add.overlap(this.player, this.hazards, this.hitObstacle, undefined, this);
    this.input.on('pointerdown', this.handleAction, this);
    this.input.keyboard?.on('keydown-SPACE', this.handleAction, this);
    this.input.keyboard?.on('keydown-UP', this.handleAction, this);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => this.input.off('pointerdown', this.handleAction, this));
    this.reset();
  }

  update(_time: number, delta: number): void {
    if (this.state !== 'running') return;
    const seconds = Math.min(delta, 50) / 1000;
    this.speed = Math.min(MAX_SPEED, START_SPEED + this.distance * 0.035);
    this.distance += this.speed * seconds;
    this.spawnDistance -= this.speed * seconds;
    this.houses.tilePositionX += this.speed * seconds * HOUSES_SCROLL_FACTOR;
    this.grass.tilePositionX += this.speed * seconds * 1.1;
    this.moveCourse(this.hazards, seconds);
    this.moveCourse(this.platforms, seconds);
    for (const child of this.decorations.getChildren()) {
      const item = child as Phaser.GameObjects.Image;
      item.x -= this.speed * seconds * 0.85;
      if (item.x < -120) item.destroy();
    }
    if (this.spawnDistance <= 0) this.spawnSequence();
    this.scoreText.setText(`SCORE ${String(Math.floor(this.distance / 10)).padStart(5, '0')}`);
    if (this.isGrounded()) this.playAnimation('original-run');
  }

  private createEnvironment(): void {
    this.add.image(0, 0, 'rova').setOrigin(0).setDisplaySize(WIDTH, HEIGHT).setDepth(-10);
    this.houses = this.add.tileSprite(0, GROUND_Y, WIDTH, HOUSES_HEIGHT, 'houses', 'row')
      .setOrigin(0, 1)
      .setTileScale(HOUSES_HEIGHT / this.textures.getFrame('houses', 'row').height)
      .setDepth(-4);
    this.grass = this.add.tileSprite(0, GROUND_Y - 34, WIDTH, 48, 'grass').setOrigin(0).setDepth(4);
    this.add.rectangle(WIDTH / 2, GROUND_Y + 46, WIDTH, 92, 0x9f4728).setDepth(0);
    this.add.rectangle(WIDTH / 2, GROUND_Y + 5, WIDTH, 10, 0xc96535).setDepth(1);
    this.ground = this.add.rectangle(WIDTH / 2, GROUND_Y + 16, WIDTH, 32, 0x000000, 0);
    this.physics.add.existing(this.ground, true);
  }

  private createPlayer(): void {
    this.player = this.physics.add.sprite(PLAYER_X, GROUND_Y, 'original-idle').setDepth(7).setScale(PLAYER_SCALE);
    this.player.body?.setSize(210, 380).setOffset(151, 110);
    this.player.setCollideWorldBounds(true);
  }

  private createInterface(): void {
    const shadow = { fontFamily: 'monospace', fontStyle: 'bold', stroke: '#2c2418', strokeThickness: 6 };
    this.add.text(28, 22, 'KISOTISOTY', { ...shadow, fontSize: '25px', color: '#fff4c2' }).setDepth(20);
    this.scoreText = this.add.text(28, 60, 'SCORE 00000', { ...shadow, fontSize: '18px', color: '#f2bd55' }).setDepth(20);
    this.messageText = this.add.text(300, 180, '', { ...shadow, fontSize: '25px', color: '#fff4c2', align: 'center', lineSpacing: 10 }).setOrigin(0.5).setDepth(20);
    this.cryDecor = this.add.sprite(WIDTH - 12, HEIGHT - 12, 'alefaso-maika', 0)
      .setOrigin(1)
      .setScale(0.8)
      .setDepth(19);
    for (let i = 0; i < 3; i += 1) {
      this.hearts.push(this.add.circle(WIDTH - 38 - i * 42, 34, 14, 0xe63946).setStrokeStyle(4, 0x4a0f18).setDepth(20));
    }
  }

  private reset(): void {
    this.physics.resume();
    this.state = 'ready';
    this.distance = 0;
    this.houses.tilePositionX = 0;
    this.speed = START_SPEED;
    this.spawnDistance = 500;
    this.lives = 3;
    this.invincible = false;
    this.player.clearTint().setAlpha(1).setVelocity(0).setPosition(PLAYER_X, GROUND_Y - 42);
    this.playAnimation('original-idle');
    this.hazards.clear(true, true);
    this.platforms.clear(true, true);
    this.decorations.clear(true, true);
    this.updateHearts();
    this.scoreText.setText('SCORE 00000');
    this.messageText.setText('PRÊT POUR LE VOYAGE ?\nTOUCHE L’ÉCRAN POUR COMMENCER').setVisible(true);
    this.cryDecor.setVisible(true).play('alefaso-cry');
  }

  private start(): void {
    this.state = 'running';
    this.messageText.setVisible(false);
    this.cryDecor.setVisible(false).stop();
    this.playAnimation('original-run');
    this.spawnSequence();
  }

  private handleAction(): void {
    if (this.state === 'ready') return this.start();
    if (this.state === 'over') { this.reset(); this.start(); return; }
    if (this.isGrounded()) {
      this.player.setVelocityY(-JUMP_SPEED);
      this.playAnimation('original-jump');
    }
  }

  private spawnSequence(): void {
    const x = WIDTH + 100;
    const pattern = Phaser.Math.Between(0, 3);
    if (pattern === 0) { this.addObstacle(x); this.addBush(x + 230); this.spawnDistance = 520; }
    else if (pattern === 1) { this.addObstacle(x); this.addObstacle(x + 250); this.spawnDistance = 650; }
    else if (pattern === 2) { this.addPlatform(x + 80, GROUND_Y - 115); this.addObstacle(x + 370); this.spawnDistance = 720; }
    else { this.addBush(x); this.addObstacle(x + 180); this.addBush(x + 390); this.spawnDistance = 690; }
  }

  private addObstacle(x: number): void {
    const texture = Phaser.Utils.Array.GetRandom(STREET_OBSTACLES);
    const obstacle = this.hazards.create(x, GROUND_Y, texture) as Phaser.Physics.Arcade.Sprite;
    obstacle.setOrigin(0.5, 1).setDepth(6);
    const topInset = texture === 'basin' ? 8 : 10;
    obstacle.body?.setSize(obstacle.width - 12, obstacle.height - topInset).setOffset(6, topInset);
  }

  private addPlatform(x: number, y: number): void {
    const platform = this.platforms.create(x, y, 'platform') as Phaser.Physics.Arcade.Sprite;
    platform.setOrigin(0.5, 0).setDepth(5);
    platform.body?.setSize(170, 18).setOffset(0, 0);
  }

  private addBush(x: number): void {
    this.decorations.add(this.add.image(x, GROUND_Y, 'bush').setOrigin(0.5, 1).setDepth(3));
  }

  private moveCourse(group: Phaser.Physics.Arcade.Group, seconds: number): void {
    for (const child of group.getChildren()) {
      const item = child as Phaser.Physics.Arcade.Sprite;
      item.x -= this.speed * seconds;
      item.body?.updateFromGameObject();
      if (item.x < -200) item.destroy();
    }
  }

  private canLand(playerObject: unknown, platformObject: unknown): boolean {
    const player = playerObject as Phaser.Physics.Arcade.Sprite;
    const platform = platformObject as Phaser.Physics.Arcade.Sprite;
    return player.body!.velocity.y >= 0 && player.body!.bottom <= platform.body!.top + 20;
  }

  private hitObstacle(): void {
    if (this.state !== 'running' || this.invincible) return;
    this.lives -= 1;
    this.updateHearts();
    this.cameras.main.shake(160, 0.008);
    navigator.vibrate?.(80);
    if (this.lives <= 0) {
      this.state = 'over';
      this.physics.pause();
      this.playAnimation('original-idle');
      const score = Math.floor(this.distance / 10);
      const best = Math.max(score, Number(localStorage.getItem('kisotisoty-best') ?? 0));
      localStorage.setItem('kisotisoty-best', String(best));
      this.messageText.setText(`FIN DU VOYAGE\nSCORE ${score}  •  RECORD ${best}\n\nTOUCHE POUR REJOUER`).setVisible(true);
      this.cryDecor.setVisible(true).play('alefaso-cry');
      return;
    }
    this.invincible = true;
    this.tweens.add({ targets: this.player, alpha: 0.2, yoyo: true, repeat: 8, duration: 90 });
    this.time.delayedCall(1600, () => { this.invincible = false; this.player.setAlpha(1); });
  }

  private updateHearts(): void {
    this.hearts.forEach((heart, index) => heart.setFillStyle(index < this.lives ? 0xe63946 : 0x3b2a2e));
  }

  private isGrounded(): boolean {
    return Boolean(this.player.body?.blocked.down || this.player.body?.touching.down);
  }

  private playAnimation(key: string): void {
    if (this.player.anims.currentAnim?.key !== key) this.player.play(key);
  }
}
