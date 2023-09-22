import Player from "../Player";

export default abstract class Bullet {
  static readonly BULLET_RADIUS: number = 30;
  static readonly BULLET_SPEED: number = 10;
  static readonly FILL_STYLE: string = "#1F51FF";
  static readonly LINE_WIDTH: number = 5;

  width: number;
  height: number;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  xPos: number;
  yPos: number;
  speed: number;
  damage: number;
  dead: boolean = false;

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
