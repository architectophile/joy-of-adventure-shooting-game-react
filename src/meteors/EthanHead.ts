import { getRandomNumber } from "../utils";
import Meteor, { MeteorFactory } from "./Meteor";
import ImageDefault from "../assets/images/ethan-head.png";
import ImageHit from "../assets/images/ethan-head-hit.png";

const METEOR_ETHAN_HEAD_NAME = "ethan-head";
const METEOR_ETHAN_HEAD_WIDTH_RATE = 0.3;
const METEOR_ETHAN_HEAD_HEIGTH_RATE = 0.3;
const METEOR_ETHAN_HEAD_X_SPEED_DEFAULT = 0.5;
const METEOR_ETHAN_HEAD_Y_SPEED_DEFAULT = 1.5;
const METEOR_ETHAN_HEAD_HEALTH = 5;
const METEOR_ETHAN_HEAD_FILL_STYLE_DEFAULT = "#2Fd11F";
const METEOR_ETHAN_HEAD_FILL_STYLE_HIT_BY_PLAYER = "#3145d1";
const METEOR_ETHAN_HEAD_DAMAGE = 10;

export default class EthanHead extends Meteor {
  image = new Image();
  private xSpeed: number = METEOR_ETHAN_HEAD_X_SPEED_DEFAULT;
  private ySpeed: number = METEOR_ETHAN_HEAD_Y_SPEED_DEFAULT;
  color: string = METEOR_ETHAN_HEAD_FILL_STYLE_DEFAULT;

  constructor(
    canvas: HTMLCanvasElement,
    width: number,
    height: number,
    xPos: number,
    yPos: number
  ) {
    super(
      METEOR_ETHAN_HEAD_NAME,
      width,
      height,
      canvas,
      xPos,
      yPos,
      METEOR_ETHAN_HEAD_HEALTH,
      METEOR_ETHAN_HEAD_DAMAGE
    );
    this.image = new Image();
    this.image.src = ImageDefault;
  }

  move = () => {
    this.yPos += this.ySpeed;
  };

  hitByBullet = (): void => {
    if (this.bulletHitTimeout) clearTimeout(this.bulletHitTimeout);
    this.image.src = ImageHit;
    this.ySpeed = METEOR_ETHAN_HEAD_Y_SPEED_DEFAULT * 0.2;
    this.bulletHitTimeout = setTimeout(async () => {
      this.image.src = ImageDefault;
      await new Promise((r) => setTimeout(r, 30));
      this.ySpeed = METEOR_ETHAN_HEAD_Y_SPEED_DEFAULT;
    }, 10);
  };

  hitByPlayer = (): void => {
    console.log("hit by player");
    this.isStunned = true;
    if (this.bulletHitTimeout) clearTimeout(this.bulletHitTimeout);
    if (this.playerHitTimeout) clearTimeout(this.playerHitTimeout);
    this.color = METEOR_ETHAN_HEAD_FILL_STYLE_HIT_BY_PLAYER;
    this.bulletHitTimeout = setTimeout(() => {
      this.isStunned = false;
      this.color = METEOR_ETHAN_HEAD_FILL_STYLE_DEFAULT;
    }, 3000);
  };

  draw = (ctx: CanvasRenderingContext2D) => {
    // ctx.beginPath();
    // ctx.arc(this.xPos, this.yPos, this.width / 2, 0, 2 * Math.PI);
    // ctx.fillStyle = this.color;
    // ctx.fill();
    if (this.image.complete) {
      ctx.drawImage(
        this.image,
        this.xPos - this.width / 2,
        this.yPos - this.height / 2,
        this.width,
        this.height
      );
    }
  };
}

export class EthanHeadFactory extends MeteorFactory {
  static getName = (): string => {
    return METEOR_ETHAN_HEAD_NAME;
  };

  createMeteor = (canvas: HTMLCanvasElement): Meteor => {
    const width = canvas.width * METEOR_ETHAN_HEAD_WIDTH_RATE;
    const height = canvas.width * METEOR_ETHAN_HEAD_HEIGTH_RATE;
    return new EthanHead(
      canvas,
      width,
      height,
      getRandomNumber(width / 2, canvas.width - width / 2),
      0
    );
  };

  playMeteorSound = (): void => {
    // sound.play('meteor');
  };
}
