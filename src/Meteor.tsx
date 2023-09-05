import img from "./photos/meteors.png";

const METEOR_WIDTH = 75;
const METEOR_HEIGHT = 100;

interface Player {
  increaseScore: () => void;
  deductHealth: () => void;
  xPos: number;
  yPos: number;
}

interface Bullet {
  xPos: number;
  yPos: number;
  dead: boolean;
}

export class Meteor {
  static readonly METEOR_RADIUS: number = 5;
  static readonly METEOR_SPEED: number = 2;
  static readonly FILL_STYLE: string = "#1F51FF";
  static readonly LINE_WIDTH: number = 5;

  image = new Image();
  speed: number = Meteor.METEOR_SPEED;
  dead: boolean = false;
  xPos: number;
  yPos: number;

  constructor(xPos: number, yPos: number) {
    this.image.src = img;
    this.xPos = xPos;
    this.yPos = yPos;
  }

  isOutOfScreen = (): boolean | undefined => {
    if (this.yPos > 550) {
      return true;
    }
  };

  update = (player: Player, bullets: Bullet[]): void => {
    if (this.dead) return;

    this.yPos += this.speed;

    if (!this.dead && this.isOutOfScreen()) {
      this.dead = true;
    }

    if (!this.dead) {
      bullets.forEach((bullet) => {
        if (
          Math.abs(bullet.xPos - this.xPos) < 75 &&
          Math.abs(bullet.yPos - this.yPos) < 100
        ) {
          player.increaseScore();
          this.dead = true;
          bullet.dead = true;
        }
      });

      if (!this.dead) {
        if (
          Math.abs(player.xPos - this.xPos) < 65 &&
          Math.abs(player.yPos - this.yPos) < 90
        ) {
          this.dead = true;
          player.deductHealth();
        }
      }
    }
  };

  draw = (ctx: CanvasRenderingContext2D): void => {
    ctx.beginPath();
    ctx.arc(
      this.xPos + METEOR_WIDTH / 2,
      this.yPos + METEOR_HEIGHT / 2,
      20,
      0,
      2 * Math.PI
    );
    ctx.fill();
    // if (this.image.complete) {
    //   ctx.drawImage(
    //     this.image,
    //     this.xPos,
    //     this.yPos,
    //     METEOR_WIDTH,
    //     METEOR_HEIGHT
    //   );
    // }
  };
}

export default Meteor;
