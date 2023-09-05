export class Bullet {
  static readonly BULLET_RADIUS: number = 5;
  static readonly BULLET_SPEED: number = 10;
  static readonly FILL_STYLE: string = "#1F51FF";
  static readonly LINE_WIDTH: number = 5;

  static readonly bulletCanvas: HTMLCanvasElement =
    document.createElement("canvas");
  static readonly bulletCtx: CanvasRenderingContext2D | null =
    Bullet.bulletCanvas.getContext("2d");

  dead: boolean = false;
  speed: number = Bullet.BULLET_SPEED;
  xPos: number;
  yPos: number;

  constructor(xPos: number, yPos: number) {
    this.xPos = xPos;
    this.yPos = yPos;

    if (Bullet.bulletCtx) {
      Bullet.bulletCanvas.width = Bullet.BULLET_RADIUS * 2;
      Bullet.bulletCanvas.height = Bullet.BULLET_RADIUS * 2;
      Bullet.bulletCtx.beginPath();
      Bullet.bulletCtx.arc(
        Bullet.BULLET_RADIUS,
        Bullet.BULLET_RADIUS,
        Bullet.BULLET_RADIUS,
        0,
        2 * Math.PI
      );
      Bullet.bulletCtx.fillStyle = Bullet.FILL_STYLE;
      Bullet.bulletCtx.fill();
      Bullet.bulletCtx.lineWidth = Bullet.LINE_WIDTH;
      Bullet.bulletCtx.stroke();
    }
  }

  update = (): void => {
    this.yPos -= this.speed;

    if (this.yPos < 0) {
      this.dead = true;
    }
  };

  draw = (ctx: CanvasRenderingContext2D): void => {
    if (Bullet.bulletCanvas) {
      ctx.drawImage(
        Bullet.bulletCanvas,
        this.xPos - Bullet.BULLET_RADIUS,
        this.yPos - Bullet.BULLET_RADIUS,
        Bullet.BULLET_RADIUS * 2,
        Bullet.BULLET_RADIUS * 2
      );
    }
  };
}

export default Bullet;
