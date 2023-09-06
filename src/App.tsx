import React, { useEffect, useRef, useState } from "react";
import { Player } from "./Player";
import bg from "./photos/space.jpg";
import { Meteor } from "./Meteor";
import { Bullet } from "./Bullet";

export const CANVAS_WIDTH = window.innerWidth;
export const CANVAS_HEIGHT = window.innerHeight;

const App: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const width = CANVAS_WIDTH;
  const height = CANVAS_HEIGHT;
  const [gameStarted, setGameStarted] = useState(false);

  let meteors: Meteor[] = [];
  let bullets: Bullet[] = [];

  const player: Player = new Player(width / 2, height - 80);

  const startGame = () => {
    setGameStarted(true);
  };

  useEffect(() => {
    if (gameStarted) {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const setCanvasSize = () => {
        canvas.width = CANVAS_WIDTH;
        canvas.height = CANVAS_HEIGHT; // Adjust based on your needs
      };

      setCanvasSize();

      // Handle window resize
      window.addEventListener("resize", setCanvasSize);

      return () => {
        window.removeEventListener("resize", setCanvasSize);
      };
    }
  }, [gameStarted]);

  useEffect(() => {
    if (gameStarted) {
      let animationFrameId: number;

      const createBullet = () => {
        const newBullet = player.getBullet();
        bullets.push(newBullet);
        // You can also use setBullets for more React-style state management
        // setBullets(prevBullets => [...prevBullets, newBullet]);
      };
      const bulletIntervalId = setInterval(createBullet, 50);

      const createMeteor = () => {
        meteors.push(Meteor.createMeteor(CANVAS_WIDTH));
        console.log("meteor is created");
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
    }
  }, [gameStarted]);

  useEffect(() => {
    if (gameStarted) {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const handleTouchStart = (e: TouchEvent) => {
        const touch = e.touches[0];
        player.handleTouchStart(touch.clientX, touch.clientY);
      };

      const handleTouchMove = (e: TouchEvent) => {
        e.preventDefault();
        const touch = e.touches[0];
        if (touch.clientX > 0 && touch.clientX < CANVAS_WIDTH) {
          player.handleTouchMove(touch.clientX);
        }
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
    }
  }, [gameStarted]);

  if (!gameStarted) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
          height: "100vh",
          flexDirection: "row",
        }}
      >
        <button onClick={startGame}>Start</button>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
        flexDirection: "row",
      }}
    >
      <canvas
        ref={canvasRef}
        id="myCanvas"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
        }}
      />
    </div>
  );
};

export default App;
