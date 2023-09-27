import Player from "../Player";
import Bullet, { BulletFactory } from "./Bullet";

const BROWNING_1919_MACHINE_GUN_BULLET_WIDTH_RATE = 0.474;
const BROWNING_1919_MACHINE_GUN_BULLET_HEIGHT_RATE = 0.426;
const BROWNING_1919_MACHINE_GUN_BULLET_SPEED = 12;
const BROWNING_1919_MACHINE_GUN_BULLET_DAMAGE = 1;
const BROWNING_1919_MACHINE_GUN_BULLET_FILL_STYLE = "#4241AF";
const BROWNING_1919_MACHINE_GUN_BULLET_LINE_WIDTH = 1;

export default class Browning1919MachineGunBullet extends Bullet {
  constructor(player: Player, xPos: number, yPos: number) {
    const width = player.width * BROWNING_1919_MACHINE_GUN_BULLET_WIDTH_RATE;
    const height = player.width * BROWNING_1919_MACHINE_GUN_BULLET_HEIGHT_RATE;
    super(
      width,
      height,
      xPos,
      yPos - height / 2,
      BROWNING_1919_MACHINE_GUN_BULLET_SPEED,
      BROWNING_1919_MACHINE_GUN_BULLET_DAMAGE
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

export class Browning1919MachineGunBulletFactory extends BulletFactory {
  playBulletSound = (): void => {
    console.log("Browning1919MachineGunBulletFactory.playBulletSound");
  };
  createBullet = (player: Player, xPos: number, yPos: number): Bullet => {
    return new Browning1919MachineGunBullet(player, xPos, yPos);
  };
}
