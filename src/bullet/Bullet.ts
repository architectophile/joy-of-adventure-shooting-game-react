import Player from "../Player";
import img from "../assets/images/mom-is-alien.png";

export default abstract class Bullet {
  width: number;
  height: number;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  xPos: number;
  yPos: number;
  speed: number;
  damage: number;
  dead: boolean = false;
  image: HTMLImageElement;

  constructor(
    width: number,
    height: number,
    xPos: number,
    yPos: number,
    speed: number,
    damage: number
  ) {
    this.width = width;
    this.height = height;
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.xPos = xPos;
    this.yPos = yPos;
    this.speed = speed;
    this.damage = damage;

    this.image = new Image();
    this.image.src = img;
  }

  update = (): void => {
    this.yPos -= this.speed;

    if (this.yPos < 0) {
      this.dead = true;
    }
  };

  abstract draw: (ctx: CanvasRenderingContext2D) => void;
}

export abstract class BulletFactory {
  abstract createBullet: (player: Player, xPos: number, yPos: number) => Bullet;
  abstract playBulletSound: () => void;
}
