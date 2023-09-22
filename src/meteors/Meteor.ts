import Player from "../Player";
import Bullet from "../bullet/Bullet";
import { isTwoObjectsHit } from "../utils";

export default abstract class Meteor {
  name: string;
  width: number;
  height: number;
  canvas: HTMLCanvasElement;
  xPos: number;
  yPos: number;
  health: number;
  dead: boolean = false;
  bulletHitTimeout: NodeJS.Timeout | null = null;
  playerHitTimeout: NodeJS.Timeout | null = null;
  isStunned: boolean = false;

  constructor(
    name: string,
    width: number,
    height: number,
    canvas: HTMLCanvasElement,
    xPos: number,
    yPos: number,
    health: number
  ) {
    this.name = name;
    this.width = width;
    this.height = height;
    this.canvas = canvas;
    this.xPos = xPos;
    this.yPos = yPos;
    this.health = health;
  }

  abstract hitByBullet: () => void;
  abstract hitByPlayer: () => void;
  abstract move: () => void;
  abstract draw: (ctx: CanvasRenderingContext2D) => void;

  isOutOfScreen = () => {
    if (this.yPos > this.canvas.height) {
      return true;
    }
  };

  update = (player: Player, bullets: Bullet[]): void => {
    if (this.dead) return;

    this.move();

    // Check if meteor is out of screen
    if (!this.dead && this.isOutOfScreen()) {
      this.dead = true;
      // sound.play('passing');
    }

    if (!this.dead) {
      // Check if meteor is hit by bullet
      bullets.forEach((bullet) => {
        if (isTwoObjectsHit(bullet, this)) {
          player.hitMeteorByBullet(this);
          this.health -= bullet.damage;
          if (!this.isStunned) {
            this.hitByBullet();
          }
          if (this.health <= 0) {
            this.dead = true;
            player.killMeteorByBullet(this);
          }
          bullet.dead = true;
        }
      });

      // Check if player is hit
      if (!this.dead && !this.isStunned) {
        if (isTwoObjectsHit(player, this)) {
          this.hitByPlayer();
          player.hitByMeteor(this);
        }
      }
    }
  };
}

export abstract class MeteorFactory {
  abstract createMeteor: (canvas: HTMLCanvasElement) => Meteor;
  abstract playMeteorSound: () => void;
}
