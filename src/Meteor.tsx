import { CANVAS_HEIGHT } from "./App";
import img from "./photos/meteors.png";
import { getRandomNumber, isTwoObjectsHit } from "./utils";

const METEOR_WIDTH = 20;
const METEOR_HEIGHT = 20;
const METEOR_FILL_STYLE_HIT_BY_BULLET = "#e1261F";
const METEOR_FILL_STYLE_HIT_BY_PLAYER = "#3145d1";
const METEOR_FILL_STYLE_DEFAULT = "#2Fd11F";

interface Player {
  width: number;
  height: number;
  xPos: number;
  yPos: number;
  increaseScore: () => void;
  deductHealth: () => void;
}

interface Bullet {
  width: number;
  height: number;
  xPos: number;
  yPos: number;
  dead: boolean;
  damage: number;
}

export class Meteor {
  static readonly METEOR_RADIUS: number = 5;
  static readonly METEOR_SPEED_X: number = 0.5;
  static readonly METEOR_SPEED_Y: number = 2;
  static readonly LINE_WIDTH: number = 5;

  width: number = METEOR_WIDTH;
  height: number = METEOR_HEIGHT;
  image = new Image();
  xSpeed: number = Meteor.METEOR_SPEED_X;
  ySpeed: number = Meteor.METEOR_SPEED_Y;
  dead: boolean = false;
  xPos: number;
  yPos: number;
  health: number = 10;
  color: string = METEOR_FILL_STYLE_DEFAULT;
  bulletHitTimeout: NodeJS.Timeout | null = null;
  playerHitTimeout: NodeJS.Timeout | null = null;
  isStunned: boolean = false;

  constructor(xPos: number, yPos: number) {
    this.image.src = img;
    this.xPos = xPos;
    this.yPos = yPos;
  }

  // static factory method for Meteor
  static createMeteor = (canvasWidth: number): Meteor => {
    return new Meteor(
      getRandomNumber(METEOR_WIDTH / 2, canvasWidth - METEOR_WIDTH / 2),
      0
    );
  };

  private hitByBullet = (): void => {
    if (this.bulletHitTimeout) clearTimeout(this.bulletHitTimeout);
    this.color = METEOR_FILL_STYLE_HIT_BY_BULLET;
    this.ySpeed = Meteor.METEOR_SPEED_Y * 0.7;
    this.bulletHitTimeout = setTimeout(() => {
      this.color = METEOR_FILL_STYLE_DEFAULT;
    }, 10);
  };

  private hitByPlayer = (): void => {
    console.log("hit by player");
    this.isStunned = true;
    if (this.bulletHitTimeout) clearTimeout(this.bulletHitTimeout);
    if (this.playerHitTimeout) clearTimeout(this.playerHitTimeout);
    this.color = METEOR_FILL_STYLE_HIT_BY_PLAYER;
    this.bulletHitTimeout = setTimeout(() => {
      this.isStunned = false;
      this.color = METEOR_FILL_STYLE_DEFAULT;
    }, 3000);
  };

  isOutOfScreen = (): boolean | undefined => {
    if (this.yPos > CANVAS_HEIGHT) {
      return true;
    }
  };

  update = (player: Player, bullets: Bullet[]): void => {
    if (this.dead) return;

    this.yPos += this.ySpeed;

    // Check if meteor is out of screen
    if (!this.dead && this.isOutOfScreen()) {
      this.dead = true;
      // sound.play('passing');
    }

    // Check if meteor is hit by bullet
    if (!this.dead) {
      bullets.forEach((bullet) => {
        if (isTwoObjectsHit(bullet, this)) {
          player.increaseScore();
          this.health -= bullet.damage;
          if (!this.isStunned) this.hitByBullet();
          if (this.health <= 0) this.dead = true;
          bullet.dead = true;
        }
      });

      // Check if player is hit
      if (!this.dead && !this.isStunned) {
        if (isTwoObjectsHit(player, this)) {
          this.hitByPlayer();
          // this.dead = true;
          // player.deductHealth();
        }
      }
    }
  };

  draw = (ctx: CanvasRenderingContext2D): void => {
    ctx.beginPath();
    ctx.arc(this.xPos, this.yPos, this.width / 2, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
    // ctx.drawImage(
    //   this.image,
    //   this.xPos - METEOR_WIDTH / 2,
    //   this.yPos - METEOR_HEIGHT / 2,
    //   METEOR_WIDTH,
    //   METEOR_HEIGHT
    // );
  };
}

export default Meteor;
