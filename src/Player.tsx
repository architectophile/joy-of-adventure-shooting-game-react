import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./App";
import Bullet from "./Bullet";
import img from "./photos/player.png";

const PLAYER_FILL_STYLE_DEFAULT = "#5F616F";

export class Player {
  width: number = 80;
  height: number = 80;
  dead: boolean = false;
  health: number = 100;
  ammo: number = 100;
  score: number = 0;
  speed: number = 25;
  firebullets: any[] = []; // Specify the correct type for firebullets if possible
  lastFireAt: number = Date.now();
  xPos: number;
  yPos: number;
  image: HTMLImageElement;
  isDragging: boolean = false;

  constructor(xPos: number, yPos: number) {
    console.log(`xPos: ${xPos}, yPos: ${yPos}`);
    this.xPos = xPos;
    this.yPos = yPos;

    this.image = new Image();
    this.image.src = img;
  }

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

  deductHealth = (): void => {
    this.health -= 10;
  };

  increaseScore = (): void => {
    this.score += 10;
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

  getBullet = (): Bullet => {
    return new Bullet(this.xPos, this.yPos - this.height / 2);
  };

  draw = (ctx: CanvasRenderingContext2D): void => {
    ctx.beginPath();
    ctx.arc(this.xPos, this.yPos, this.width / 2, 0, 2 * Math.PI);
    ctx.fillStyle = PLAYER_FILL_STYLE_DEFAULT;
    ctx.fill();
    // if (this.image.complete) {
    //   ctx.drawImage(
    //     this.image,
    //     this.xPos - this.width / 2,
    //     this.yPos - this.height / 2,
    //     this.width,
    //     this.height
    //   );
    // }

    ctx.font = "16px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "left";
    ctx.fillText(
      `Health: ${this.health}`,
      CANVAS_WIDTH - 95,
      CANVAS_HEIGHT - 15
    );

    ctx.font = "16px Arial";
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
