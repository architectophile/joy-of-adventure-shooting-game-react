import Player from "../Player";
import { isTwoObjectsHit } from "../utils";

export type AngelType = "medicine" | "item";

export default abstract class Angel {
  name: string;
  width: number;
  height: number;
  canvas: HTMLCanvasElement;
  xPos: number;
  yPos: number;
  type: AngelType;
  dead: boolean = false;

  constructor(
    name: string,
    width: number,
    height: number,
    canvas: HTMLCanvasElement,
    xPos: number,
    yPos: number,
    type: AngelType
  ) {
    this.name = name;
    this.width = width;
    this.height = height;
    this.canvas = canvas;
    this.xPos = xPos;
    this.yPos = yPos;
    this.type = type;
  }

  abstract hitByPlayer: (player: Player) => void;
  abstract move: () => void;
  abstract draw: (ctx: CanvasRenderingContext2D) => void;

  isOutOfScreen = () => {
    if (this.yPos > this.canvas.height) {
      return true;
    }
  };

  update = (player: Player): void => {
    if (this.dead) return;

    this.move();

    // Check if meteor is out of screen
    if (!this.dead && this.isOutOfScreen()) {
      this.dead = true;
      // sound.play('angel sound');
    }

    // Check if player is hit
    if (!this.dead) {
      if (isTwoObjectsHit(player, this)) {
        this.hitByPlayer(player);
        this.dead = true;
      }
    }
  };
}

export abstract class AngelFactory {
  abstract createAngel: (canvas: HTMLCanvasElement) => Angel;
  abstract playAngelSound: () => void;
}
