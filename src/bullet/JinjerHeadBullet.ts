import Player from "../Player";
import Bullet, { BulletFactory } from "./Bullet";
import bulletImage from "../assets/images/jinjer-head.png";

const BROWNING_1919_MACHINE_GUN_BULLET_WIDTH_RATE = 1.5;
const BROWNING_1919_MACHINE_GUN_BULLET_HEIGHT_RATE = 1.5;
const BROWNING_1919_MACHINE_GUN_BULLET_SPEED = 7;
const BROWNING_1919_MACHINE_GUN_BULLET_DAMAGE = 10;
const JINJER_HEAD_BULLET_HEALTH = 30;
const BROWNING_1919_MACHINE_GUN_BULLET_FILL_STYLE = "#4241AF";
const BROWNING_1919_MACHINE_GUN_BULLET_LINE_WIDTH = 1;

export default class JinjerHeadBullet extends Bullet {
  constructor(player: Player, xPos: number, yPos: number) {
    const width = player.width * BROWNING_1919_MACHINE_GUN_BULLET_WIDTH_RATE;
    const height = player.width * BROWNING_1919_MACHINE_GUN_BULLET_HEIGHT_RATE;
    const image = new Image();
    image.src = bulletImage;
    super(
      width,
      height,
      xPos,
      yPos - height / 2,
      BROWNING_1919_MACHINE_GUN_BULLET_SPEED,
      BROWNING_1919_MACHINE_GUN_BULLET_DAMAGE,
      JINJER_HEAD_BULLET_HEALTH,
      image
    );

    if (this.ctx) {
      this.canvas.width = this.width;
      this.canvas.height = this.width;
      this.ctx.beginPath();
      this.ctx.arc(
        this.width / 2,
        this.width / 2,
        this.width / 2,
        0,
        2 * Math.PI
      );
      this.ctx.fillStyle = BROWNING_1919_MACHINE_GUN_BULLET_FILL_STYLE;
      this.ctx.fill();
      this.ctx.lineWidth = BROWNING_1919_MACHINE_GUN_BULLET_LINE_WIDTH;
      this.ctx.stroke();
    }
  }

  draw = (ctx: CanvasRenderingContext2D): void => {
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

export class JinjerHeadBulletFactory extends BulletFactory {
  playBulletSound = (): void => {
    // console.log("JinjerHeadBulletFactory.playBulletSound");
  };
  createBullet = (player: Player, xPos: number, yPos: number): Bullet => {
    return new JinjerHeadBullet(player, xPos, yPos);
  };
}
