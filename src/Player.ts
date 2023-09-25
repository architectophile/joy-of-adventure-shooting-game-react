import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./App";
import Meteor from "./meteors/Meteor";
import img from "./assets/images/nayoung-head.png";
import { Weapon } from "./weapons/Weapon";

const PLAYER_FILL_STYLE_DEFAULT = "#5F616F";
const PLAYER_WIDTH_RATE = 0.2;
const PLAYER_HEIGHT_RATE = 0.2;
const PLAYER_MAX_HEALTH = 100;

export class Player {
  name: string;
  width: number;
  height: number;
  dead: boolean = false;
  health: number = PLAYER_MAX_HEALTH - 50;
  ammo: number = 100;
  score: number = 0;
  speed: number = 25;
  firebullets: any[] = []; // Specify the correct type for firebullets if possible
  lastFireAt: number = Date.now();
  xPos: number;
  yPos: number;
  image: HTMLImageElement;
  isDragging: boolean = false;
  canvas: HTMLCanvasElement;
  private readonly weapons: Map<string, Weapon>;

  constructor(
    name: string,
    canvas: HTMLCanvasElement,
    weapons: Map<string, Weapon>
  ) {
    this.name = name;
    this.canvas = canvas;
    const { width, height } = canvas;
    this.width = width * PLAYER_WIDTH_RATE;
    this.height = this.width;
    this.xPos = width / 2;
    this.yPos = height - 100;

    this.image = new Image();
    this.image.src = img;

    this.weapons = weapons;
  }

  setWeapon = (weapon: Weapon): void => {
    this.weapons.set(weapon.name, weapon);
  };

  getWeapons = (): Map<string, Weapon> => {
    return this.weapons;
  };

  handleTouchStart(x: number, y: number) {
    console.log(
      `touch start at ${x}, ${y} and the player is at ${this.xPos}, ${this.yPos}`
    );
    if (
      Math.abs(x - this.xPos) <= this.width / 2 &&
      Math.abs(y - this.yPos) <= this.height / 2
    ) {
      this.isDragging = true;
    }
  }

  handleTouchMove(x: number) {
    if (this.isDragging) {
      this.xPos = x; // Center the player image on the touch point
    }
  }

  handleTouchEnd() {
    this.isDragging = false;
  }

  hitByMeteor = (meteor: Meteor): void => {
    console.log("hit by meteor");
  };

  hitMeteorByBullet = (meteor: Meteor): void => {
    this.score += 10;
  };

  killMeteorByBullet = (meteor: Meteor): void => {
    this.score += 10;
  };

  deductHealth = (): void => {
    this.health -= 10;
  };

  increaseHealth = (health: number): void => {
    if (this.health + health > PLAYER_MAX_HEALTH) {
      this.health = PLAYER_MAX_HEALTH;
      return;
    }
    this.health += health;
  };

  yummy = (): void => {
    console.log("yummy");
  };

  update = (): void => {
    document.onkeydown = (e: KeyboardEvent) => {
      if (e.keyCode === 39) {
        this.xPos += this.speed;
      }
      if (e.keyCode === 37) {
        this.xPos -= this.speed;
      }

      document.addEventListener("keypress", (e: KeyboardEvent) => {
        if (e.keyCode === 32) {
          if (Date.now() - this.lastFireAt > 250) {
            // firecb(this.xPos, this.yPos - this.height / 2);
            this.lastFireAt = Date.now();
          }
        }
      });
    };

    if (this.health <= 0) {
      this.dead = true;
      gameOver(this.score);
    }
  };

  draw = (ctx: CanvasRenderingContext2D): void => {
    // ctx.beginPath();
    // ctx.arc(this.xPos, this.yPos, this.width / 2, 0, 2 * Math.PI);
    // ctx.fillStyle = PLAYER_FILL_STYLE_DEFAULT;
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

    ctx.font = "18px ArcadeClassic";
    ctx.fillStyle = "white";
    ctx.textAlign = "left";
    ctx.fillText(
      `Health: ${this.health}`,
      CANVAS_WIDTH - 95,
      CANVAS_HEIGHT - 15
    );

    ctx.font = "18px ArcadeClassic";
    ctx.fillStyle = "lightgreen";
    ctx.textAlign = "left";
    ctx.fillText(`Score: ${this.score}`, 8, 25);
  };
}

function gameOver(score: number): void {
  document.body.innerHTML = `
  <center>
  <br/>
  <h2>Game Over!</h2>
  <p>Your Score: ${score}</p>
  <button class="btn btn-danger mt-2" onClick="location.reload()">Again</button>
  </center>
  `;
}

export default Player;
