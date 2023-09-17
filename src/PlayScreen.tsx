import React, { useEffect, useRef, useState } from "react";
import { GameStatus } from "./App";
import bg from "./photos/space.jpg";
import Player from "./Player";
import Meteor from "./Meteor";
import Bullet, { BulletFactory } from "./bullet/Bullet";
import useSound from "use-sound";
import bgm from "./sound/bgm.mp3";

import bulletSfx from "./sound/bullet-sound.mp3";
import { Prompter } from "./Prompter";
import { Gun } from "./weapons/Gun";
import { Weapon } from "./weapons/Weapon";
import { Browning1919MachineGunBulletFactory } from "./bullet/Browning1919MachineGunBullet";

const bgmAudio = new Audio(bgm);

interface PlayScreenProps {
  gameStatus: GameStatus;
  setGameStatus: React.Dispatch<React.SetStateAction<GameStatus>>;
}

const PlayScreen: React.FC<PlayScreenProps> = ({
  gameStatus,
  setGameStatus,
}: PlayScreenProps): JSX.Element => {
  console.log(
    "PlayScreen width and height: ",
    window.innerWidth,
    window.innerHeight
  );
  let meteors: Meteor[] = [];
  let bullets: Bullet[] = [];
  const prompter = new Prompter();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const playerRef = useRef<Player | null>(null);
  const [playBulletSound] = useSound(bulletSfx);

  useEffect(() => {
    if (gameStatus === "start") {
      const canvas = canvasRef.current;
      if (!canvas) return;

      console.log("canvas width and height[0]: ", canvas.width, canvas.height);

      const setCanvasSize = (width: number, height: number): void => {
        console.log(
          "setCanvasSize width and height: ",
          window.innerWidth,
          window.innerHeight
        );
        canvas.width = width;
        canvas.height = height;
      };

      if (!playerRef.current) {
        const width = window.innerWidth;
        const height = window.innerHeight;
        setCanvasSize(width, height);

        const browning1919BulletFactory: BulletFactory =
          new Browning1919MachineGunBulletFactory();

        const gun: Gun = new Gun(
          "machine-gun",
          "gun",
          60,
          browning1919BulletFactory
        );
        const weapons: Map<string, Weapon> = new Map();
        weapons.set(gun.name, gun);

        playerRef.current = new Player("Joy", canvas, weapons);
      }

      window.addEventListener("resize", () => {
        setCanvasSize(window.innerWidth, window.innerHeight);
      });

      return () => {
        window.removeEventListener("resize", () => {
          setCanvasSize(window.innerWidth, window.innerHeight);
        });
      };
    }
  }, [gameStatus]);

  useEffect(() => {
    if (gameStatus === "start") {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const player: Player | null = playerRef.current;
      if (!player) return;

      const timeoutMap: Map<string, NodeJS.Timeout> = new Map();

      let animationFrameId: number;

      let meteorIntervalId: NodeJS.Timeout | undefined = undefined;

      const createBullets = (): void => {
        const weapons = player.getWeapons();

        // startFiring for all weapons
        weapons.forEach((weapon) => {
          timeoutMap.set(
            weapon.name,
            setInterval(() => {
              bullets.push(weapon.getBullet(player));
            }, weapon.fireRate)
          );
        });

        // const newBullet = player.getBullet();
        // bullets.push(newBullet);
        // playBulletSound();
      };

      const createMeteor = () => {
        meteors.push(Meteor.createMeteor(canvas.width));
        console.log("meteor is created");
      };

      setTimeout(async () => {
        // bgmAudio.play();
        await new Promise((r) => setTimeout(r, 1000));
        prompter.setMessage("3");

        await new Promise((r) => setTimeout(r, 1000));
        prompter.setMessage("2");

        await new Promise((r) => setTimeout(r, 1000));
        prompter.setMessage("1");

        await new Promise((r) => setTimeout(r, 1000));
        prompter.setMessage("Start!");

        await new Promise((r) => setTimeout(r, 1000));
        prompter.setMessage(null);

        // bulletSoundIntervalId = setInterval(playBulletSound, 1000);
        createBullets();
        meteorIntervalId = setInterval(createMeteor, 1000);
      }, 0);

      const gameLoop = () => {
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          return;
        }
        const { width, height } = canvas as HTMLCanvasElement;
        ctx.clearRect(0, 0, width, height);

        prompter.draw(ctx);
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
      console.log("gameLoop started");

      return () => {
        cancelAnimationFrame(animationFrameId);
        timeoutMap.forEach((timeout) => {
          clearTimeout(timeout);
        });
        clearInterval(meteorIntervalId);
      };
    }
  }, [gameStatus]);

  useEffect(() => {
    if (gameStatus === "start") {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const player: Player | null = playerRef.current;
      if (!player) return;

      const handleTouchStart = (e: TouchEvent) => {
        const touch = e.touches[0];
        player.handleTouchStart(touch.clientX, touch.clientY);
      };

      const handleTouchMove = (e: TouchEvent) => {
        e.preventDefault();
        const touch = e.touches[0];
        if (touch.clientX > 0 && touch.clientX < canvas.width) {
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
  }, [gameStatus]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
        flexDirection: "row",
        position: "relative",
      }}
    >
      <canvas
        ref={canvasRef}
        id="PlayGameCanvas"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
        }}
      />
      <button
        onClick={() =>
          setGameStatus(gameStatus === "pause" ? "start" : "pause")
        }
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          zIndex: 1000,
        }}
      >
        {gameStatus === "pause" ? "Resume" : "Pause"}
      </button>
    </div>
  );
};

export default PlayScreen;
