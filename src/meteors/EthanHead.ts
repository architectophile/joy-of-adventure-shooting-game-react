import Player from "../Player";
import { getRandomNumber } from "../utils";
import Meteor, { MeteorFactory } from "./Meteor";
import img from "./photos/meteors.png";

const METEOR_ETHAN_HEAD_NAME = "ethan-head";
const METEOR_ETHAN_HEAD_WIDTH_RATE = 0.2;
const METEOR_ETHAN_HEAD_HEIGTH_RATE = 0.2;
const METEOR_ETHAN_HEAD_X_SPEED_DEFAULT = 0.5;
const METEOR_ETHAN_HEAD_Y_SPEED_DEFAULT = 2;
const METEOR_ETHAN_HEAD_HEALTH = 10;
const METEOR_ETHAN_HEAD_FILL_STYLE_DEFAULT = "#2Fd11F";
const METEOR_ETHAN_HEAD_FILL_STYLE_HIT_BY_BULLET = "#e1261F";
const METEOR_ETHAN_HEAD_FILL_STYLE_HIT_BY_PLAYER = "#3145d1";

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
      METEOR_ETHAN_HEAD_HEALTH
    );
    this.image = new Image();
    this.image.src = "assets/images/ethan-head.png";
  }

  move = () => {
    this.yPos += this.ySpeed;
  };

  hitByBullet = (): void => {
    if (this.bulletHitTimeout) clearTimeout(this.bulletHitTimeout);
    this.color = METEOR_ETHAN_HEAD_FILL_STYLE_HIT_BY_BULLET;
    this.ySpeed = METEOR_ETHAN_HEAD_Y_SPEED_DEFAULT * 0.2;
    this.bulletHitTimeout = setTimeout(async () => {
      this.color = METEOR_ETHAN_HEAD_FILL_STYLE_DEFAULT;
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
