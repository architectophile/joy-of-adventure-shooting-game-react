import Player from "../Player";
import { getRandomNumber } from "../utils";
import Angel, { AngelFactory } from "./Angel";
import ImageBRCup from "../assets/images/br-cup.png";

export const ANGEL_BR_CUP_NAME = "br-cup";
const ANGEL_BR_CUP_WIDTH_RATE = 0.192;
const ANGEL_BR_CUP_HEIGTH_RATE = 0.23;
const ANGEL_BR_CUP_X_SPEED_DEFAULT = 0;
const ANGEL_BR_CUP_Y_SPEED_DEFAULT = 4;

export default class BaskinRobbinsCup extends Angel {
  private image = new Image();
  private xSpeed: number = ANGEL_BR_CUP_X_SPEED_DEFAULT;
  private ySpeed: number = ANGEL_BR_CUP_Y_SPEED_DEFAULT;

  constructor(
    canvas: HTMLCanvasElement,
    width: number,
    height: number,
    xPos: number,
    yPos: number
  ) {
    super(ANGEL_BR_CUP_NAME, width, height, canvas, xPos, yPos, "item");
    this.image = new Image();
    this.image.src = ImageBRCup;
  }

  move = () => {
    this.yPos += this.ySpeed;
  };

  hitByPlayer = (player: Player): void => {
    console.log("kimchi hit by player");
    player.upgradeWeapon(this);
    player.yummy();
  };

  draw = (ctx: CanvasRenderingContext2D) => {
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

export class BaskinRobbinsCupFactory extends AngelFactory {
  static getName = (): string => {
    return ANGEL_BR_CUP_NAME;
  };

  createAngel = (canvas: HTMLCanvasElement): Angel => {
    const width = canvas.width * ANGEL_BR_CUP_WIDTH_RATE;
    const height = canvas.width * ANGEL_BR_CUP_HEIGTH_RATE;
    return new BaskinRobbinsCup(
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
