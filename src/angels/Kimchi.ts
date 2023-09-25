import Player from "../Player";
import { getRandomNumber } from "../utils";
import Angel, { AngelFactory } from "./Angel";
import ImageKimchi from "../assets/images/kimchi.png";

const ANGEL_KIMCHI_NAME = "kimchi";
const ANGEL_KIMCHI_WIDTH_RATE = 0.221;
const ANGEL_KIMCHI_HEIGTH_RATE = 0.144;
const ANGEL_KIMCHI_X_SPEED_DEFAULT = 0;
const ANGEL_KIMCHI_Y_SPEED_DEFAULT = 4;
const ANGEL_KIMCHI_HEALTH = 10;

export default class Kimchi extends Angel {
  private image = new Image();
  private xSpeed: number = ANGEL_KIMCHI_X_SPEED_DEFAULT;
  private ySpeed: number = ANGEL_KIMCHI_Y_SPEED_DEFAULT;
  private health = ANGEL_KIMCHI_HEALTH;

  constructor(
    canvas: HTMLCanvasElement,
    width: number,
    height: number,
    xPos: number,
    yPos: number
  ) {
    super(ANGEL_KIMCHI_NAME, width, height, canvas, xPos, yPos, "medicine");
    this.image = new Image();
    this.image.src = ImageKimchi;
  }

  move = () => {
    this.yPos += this.ySpeed;
  };

  hitByPlayer = (player: Player): void => {
    console.log("kimchi hit by player");
    player.increaseHealth(this.health);
    player.yummy();
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

export class KimchiFactory extends AngelFactory {
  static getName = (): string => {
    return ANGEL_KIMCHI_NAME;
  };

  createAngel = (canvas: HTMLCanvasElement): Angel => {
    const width = canvas.width * ANGEL_KIMCHI_WIDTH_RATE;
    const height = canvas.width * ANGEL_KIMCHI_HEIGTH_RATE;
    return new Kimchi(
      canvas,
      width,
      height,
      getRandomNumber(width / 2, canvas.width - width / 2),
      0
    );
  };

  playAngelSound = (): void => {
    // sound.play('kimchi');
  };
}
