import Player from "../Player";
import Bullet, { BulletFactory } from "./Bullet";

const BROWNING_1919_MACHINE_GUN_BULLET_WIDTH_RATE = 1.5;
const BROWNING_1919_MACHINE_GUN_BULLET_HEIGHT_RATE = 1.5;
const BROWNING_1919_MACHINE_GUN_BULLET_SPEED = 10;
const BROWNING_1919_MACHINE_GUN_BULLET_DAMAGE = 2;
const BROWNING_1919_MACHINE_GUN_BULLET_FILL_STYLE = "#1F718F";
const BROWNING_1919_MACHINE_GUN_BULLET_LINE_WIDTH = 1;

export default class Browning1919MachineGunBullet extends Bullet {
  constructor(player: Player, xPos: number, yPos: number) {
    super(
      player.width * BROWNING_1919_MACHINE_GUN_BULLET_WIDTH_RATE,
      (player.height * BROWNING_1919_MACHINE_GUN_BULLET_HEIGHT_RATE) / 2,
      xPos,
      yPos,
      BROWNING_1919_MACHINE_GUN_BULLET_SPEED,
      BROWNING_1919_MACHINE_GUN_BULLET_DAMAGE
    );

    if (this.ctx) {
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      this.ctx.beginPath();
      this.ctx.arc(
        this.width / 2,
        this.width / 2,
        this.width / 2,
        Math.PI,
        2 * Math.PI
      );
      this.ctx.fillStyle = BROWNING_1919_MACHINE_GUN_BULLET_FILL_STYLE;
      this.ctx.fill();
      this.ctx.lineWidth = BROWNING_1919_MACHINE_GUN_BULLET_LINE_WIDTH;
      this.ctx.stroke();
    }
  }

  draw = (ctx: CanvasRenderingContext2D): void => {
    ctx.drawImage(
      this.canvas,
      this.xPos - this.width / 2,
      this.yPos,
      this.width,
      this.height
    );
  };
}

export class Browning1919MachineGunBulletFactory extends BulletFactory {
  getBullet = (player: Player, xPos: number, yPos: number): Bullet => {
    return new Browning1919MachineGunBullet(player, xPos, yPos);
  };
}
