import React, { useEffect, useRef, useState } from "react";
import { Player } from "./Player";
import bg from "./photos/space.jpg";
import { Meteor } from "./Meteor";
import { Bullet } from "./Bullet";

const randomNumber = (min: number, max: number): number =>
  Math.random() * max + min;

const width = window.innerWidth;
const height = window.innerHeight;
const player: Player = new Player(width / 2, height - 100, 75, 100);

const App: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  let maxMeteorCount: number = 10;
  let lastMeteorSpawnAt: number = Date.now();

  const [meteors, setMeteors] = useState<Meteor[]>([]);
  const [bullets, setBullets] = useState<Bullet[]>([]);

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

    const localMeteors = [...meteors];
    const localBullets = [...bullets];

    const gameLoop = () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!ctx) return;

      ctx.clearRect(0, 0, width, height);

      player.update();
      player.draw(ctx);

      const random = randomNumber(0, width);
      if (
        localMeteors.length < maxMeteorCount &&
        Date.now() - lastMeteorSpawnAt > 1500
      ) {
        localMeteors.push(new Meteor(random, 0));
        lastMeteorSpawnAt = Date.now();
      }

      localMeteors.forEach((meteor, index) => {
        meteor.update(player, localBullets);
        meteor.draw(ctx);
        if (meteor.dead) {
          localMeteors.splice(index, 1);
        }
      });

      localBullets.forEach((bullet, index) => {
        bullet.update();
        bullet.draw(ctx);
        if (bullet.dead) {
          localBullets.splice(index, 1);
        }
      });

      setMeteors([...localMeteors]);
      setBullets([...localBullets]);

      animationFrameId = requestAnimationFrame(gameLoop);
    };

    gameLoop();

    return () => {
      cancelAnimationFrame(animationFrameId);
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
