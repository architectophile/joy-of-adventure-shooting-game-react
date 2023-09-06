export class Prompter {
  message?: string | null;

  setMessage = (message: string | null): void => {
    this.message = message;
  };

  draw = (ctx: CanvasRenderingContext2D): void => {
    if (!this.message) return;
    ctx.font = "32px Invasion2000";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(this.message, 200, 300);
  };
}
