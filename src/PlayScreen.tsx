import React, { useEffect, useRef } from "react";
import { GameStatus } from "./App";
import bg from "./assets/images/space.jpg";
import Player from "./Player";
import Meteor, { MeteorFactory } from "./meteors/Meteor";
import Bullet, { BulletFactory } from "./bullet/Bullet";

import { Prompter } from "./Prompter";
import { Gun } from "./weapons/Gun";
import { Weapon } from "./weapons/Weapon";
import { Browning1919MachineGunBulletFactory } from "./bullet/Browning1919MachineGunBullet";
import Enemy from "./Enemy";
import { EthanHeadFactory } from "./meteors/EthanHead";
import { EnemyWeapon } from "./weapons/EnemyWeapon";
import { MeteorGun } from "./weapons/MeteorGun";
import God from "./God";
import { HeavenGate } from "./gates/HeavenGate";
import { KimchiGate } from "./gates/KimchiGate";
import Angel from "./angels/Angel";
import { KimchiFactory } from "./angels/Kimchi";
import { BaskinRobbinsCupFactory } from "./angels/BaskinRobbinsCup";
import { JinjerHeadBulletFactory } from "./bullet/JinjerHeadBullet";
import { JinjerGun } from "./weapons/JinjerGun";

interface PlayScreenProps {
  gameStatus: GameStatus;
  setGameStatus: React.Dispatch<React.SetStateAction<GameStatus>>;
  endGame: () => void;
}

const PlayScreen: React.FC<PlayScreenProps> = ({
  gameStatus,
  setGameStatus,
  endGame,
}: PlayScreenProps): JSX.Element => {
  console.log(
    "PlayScreen width and height: ",
    window.innerWidth,
    window.innerHeight
  );
  let meteors: Meteor[] = [];
  let bullets: Bullet[] = [];
  let angels: Angel[] = [];
  const prompter = new Prompter();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const godRef = useRef<God | null>(null);
  const enemyRef = useRef<Enemy | null>(null);
  const playerRef = useRef<Player | null>(null);

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

      if (!godRef.current) {
        const kimchiFactory: KimchiFactory = new KimchiFactory();

        const kimchiGate: KimchiGate = new KimchiGate(
          "kimchi-gate",
          "angel-tunnel",
          23000,
          kimchiFactory
        );

        const baskinRobbinsCupFactory: BaskinRobbinsCupFactory =
          new BaskinRobbinsCupFactory();

        const kimchiGate2: KimchiGate = new KimchiGate(
          "br-cup-gate",
          "angel-tunnel",
          11000,
          baskinRobbinsCupFactory
        );

        const gates: Map<string, HeavenGate> = new Map();
        gates.set(kimchiGate.name, kimchiGate);
        gates.set(kimchiGate2.name, kimchiGate2);

        godRef.current = new God("Jason", canvas, gates);
      }

      if (!enemyRef.current) {
        const ethanHeadFactory: MeteorFactory = new EthanHeadFactory();

        const meteorGun: EnemyWeapon = new MeteorGun(
          "meteor-gun",
          "meteor",
          2000,
          ethanHeadFactory
        );
        const weapons: Map<string, EnemyWeapon> = new Map();
        weapons.set(meteorGun.name, meteorGun);

        enemyRef.current = new Enemy("Ethan", canvas, weapons);
      }

      if (!playerRef.current) {
        const width = window.innerWidth;
        const height = window.innerHeight;
        setCanvasSize(width, height);

        const browning1919BulletFactory: BulletFactory =
          new Browning1919MachineGunBulletFactory();

        const gun: Gun = new Gun(
          "machine-gun",
          "gun",
          500,
          browning1919BulletFactory
        );

        const jinjerHeadBulletFactory: BulletFactory =
          new JinjerHeadBulletFactory();

        const jinjergun: JinjerGun = new JinjerGun(
          "jinjer-gun",
          "gun",
          4800,
          jinjerHeadBulletFactory
        );

        const weapons: Map<string, Weapon> = new Map();
        weapons.set(gun.name, gun);
        weapons.set(jinjergun.name, jinjergun);

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

      const god: God | null = godRef.current;
      if (!god) return;

      const enemy: Enemy | null = enemyRef.current;
      if (!enemy) return;

      const player: Player | null = playerRef.current;
      if (!player) return;

      const timeoutMap: Map<string, NodeJS.Timeout> = new Map();

      let animationFrameId: number;

      let meteorIntervalId: NodeJS.Timeout | undefined = undefined;

      const createMeteors = () => {
        enemy.getWeapons().forEach((weapon) => {
          const recursiveCreateMeteor = () => {
            meteors.push(weapon.createMeteor(enemy));
            console.log("meteor is created ", new Date().getTime());
            weapon.playMeteorSound();
            setTimeout(() => {
              recursiveCreateMeteor();
            }, weapon.fireRate);
          };

          timeoutMap.set(
            weapon.name,
            setTimeout(() => {
              recursiveCreateMeteor();
            }, weapon.fireRate)
          );
        });
      };

      const increaseMeteorRate = () => {
        enemy.getWeapons().forEach((weapon) => {
          const recursiveIncreaseMeteorSpeed = () => {
            if (weapon.fireRate >= 300) {
              weapon.fireRate = weapon.fireRate - 90;
              setTimeout(() => {
                recursiveIncreaseMeteorSpeed();
              }, 5000);
            }
          };

          timeoutMap.set(
            weapon.name,
            setTimeout(() => {
              recursiveIncreaseMeteorSpeed();
            }, 5000)
          );
        });
      };

      const createBullets = (): void => {
        player.getWeapons().forEach((weapon) => {
          const recursiveCreateBullet = () => {
            bullets.push(weapon.createBullet(player));
            weapon.playBulletSound();
            setTimeout(() => {
              recursiveCreateBullet();
            }, weapon.fireRate);
          };

          timeoutMap.set(
            weapon.name,
            setTimeout(() => {
              recursiveCreateBullet();
            }, weapon.fireRate)
          );
        });
      };

      const createAngels = (): void => {
        god.getGates().forEach((gate) => {
          const recursiveCreateAngel = () => {
            angels.push(gate.createAngel(god));
            gate.playAngelSound();
            setTimeout(() => {
              recursiveCreateAngel();
            }, gate.fireRate);
          };

          timeoutMap.set(
            gate.name,
            setTimeout(() => {
              recursiveCreateAngel();
            }, gate.fireRate)
          );
        });
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

        createMeteors();
        increaseMeteorRate();
        createBullets();
        createAngels();
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

        if (player.dead) {
          endGame();
        }

        meteors = meteors.filter((meteor) => !meteor.dead);
        meteors.forEach((meteor) => {
          meteor.update(player, bullets);
          meteor.draw(ctx);
        });

        bullets = bullets.filter((bullet) => !bullet.dead);
        bullets.forEach((bullet) => {
          bullet.update();
          bullet.draw(ctx);
        });

        angels = angels.filter((angel) => !angel.dead);
        angels.forEach((angel) => {
          angel.update(player);
          angel.draw(ctx);
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
      {/* <button
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
      </button> */}
    </div>
  );
};

export default PlayScreen;
