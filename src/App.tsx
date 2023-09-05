import React, { useEffect, useRef } from "react";
import { Player } from "./Player";
import bg from "./photos/space.jpg";
import { Meteor } from "./Meteor";
import { Bullet } from "./Bullet";

const App: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const width = window.innerWidth;
  const height = window.innerHeight;

  let meteors: Meteor[] = [];
  let bullets: Bullet[] = [];

  let lastMeteorSpawnAt: number = Date.now();
  const player: Player = new Player(width / 2, height - 100, 75, 100);

  const randomNumber = (min: number, max: number): number =>
    Math.random() * max + min;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const setCanvasSize = () => {
      canvas.width = width;
      canvas.height = height; // Adjust based on your needs
    };

    setCanvasSize();

    // Handle window resize
    window.addEventListener("resize", setCanvasSize);

    return () => {
      window.removeEventListener("resize", setCanvasSize);
    };
  }, []);

  useEffect(() => {
    let animationFrameId: number;

    const createBullet = () => {
      const newBullet = player.getBullet();
      bullets.push(newBullet);
      // You can also use setBullets for more React-style state management
      // setBullets(prevBullets => [...prevBullets, newBullet]);
    };
    const bulletIntervalId = setInterval(createBullet, 50);

    const createMeteor = () => {
      const random: number = randomNumber(0, width);
      meteors.push(new Meteor(random, 0));
      lastMeteorSpawnAt = Date.now();
      console.log("meteor added.");
    };
    const meteorIntervalId = setInterval(createMeteor, 500);

    const gameLoop = () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");

      if (!ctx) {
        return;
      }
      const { width, height } = canvas as HTMLCanvasElement;
      ctx.clearRect(0, 0, width, height);

      player.update();
      player.draw(ctx);

      meteors = meteors.filter((enemy) => !enemy.dead);
      meteors.forEach((meteor) => {
        meteor.update(player, bullets);
        meteor.draw(ctx);
      });

      bullets = bullets.filter((bullet) => !bullet.dead);
      bullets.forEach((bullet) => {
        bullet.update();
        bullet.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(gameLoop);
    };

    gameLoop();

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(bulletIntervalId);
      clearInterval(meteorIntervalId);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      player.handleTouchStart(touch.clientX, touch.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      player.handleTouchMove(touch.clientX, touch.clientY);
    };

    const handleTouchEnd = (e: TouchEvent) => {
      player.handleTouchEnd();
    };

    canvas.addEventListener("touchstart", handleTouchStart);
    canvas.addEventListener("touchmove", handleTouchMove);
    canvas.addEventListener("touchend", handleTouchEnd);

    return () => {
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        flexDirection: "row",
      }}
    >
      <canvas
        ref={canvasRef}
        id="myCanvas"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          border: "2px solid #000000",
        }}
      />
    </div>
  );
};

export default App;
