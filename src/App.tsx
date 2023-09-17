import React, { useEffect, useRef, useState } from "react";
import PlayScreen from "./PlayScreen";

export type GameStatus = "intro" | "start" | "end" | "pause";

export const CANVAS_WIDTH = window.innerWidth;
export const CANVAS_HEIGHT = window.innerHeight;

const App: React.FC = (): JSX.Element => {
  console.log(
    "App.tsx width and height: ",
    window.innerWidth,
    window.innerHeight
  );
  const [gameStatus, setGameStatus] = useState<GameStatus>("intro");

  const endGame = () => {
    setGameStatus("end");
  };

  const startGame = () => {
    setGameStatus("start");
  };

  if (gameStatus === "intro") {
    return (
      <div
        style={{
          backgroundColor: "black",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
          height: "100vh",
          flexDirection: "row",
          fontFamily: "ArcadeClassic, fallback, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "Invasion2000, fallback, sans-serif",
          }}
        >
          <span style={{ color: "white", fontSize: 32 }}>Joy of Adventure</span>
          <button
            style={{
              marginTop: 32,
              padding: 10,
              fontSize: 32,
              fontFamily: "ArcadeClassic, fallback, sans-serif",
            }}
            onClick={startGame}
          >
            Start
          </button>
        </div>
      </div>
    );
  } else if (gameStatus === "end") {
    return (
      <div
        style={{
          backgroundColor: "black",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
          height: "100vh",
          flexDirection: "row",
          fontFamily: "ArcadeClassic, fallback, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "Invasion2000, fallback, sans-serif",
          }}
        >
          <span style={{ color: "white", fontSize: 42 }}>Game Over</span>
          <button
            style={{
              marginTop: 32,
              padding: 10,
              fontSize: 32,
              fontFamily: "ArcadeClassic, fallback, sans-serif",
            }}
            onClick={startGame}
          >
            Restart
          </button>
        </div>
      </div>
    );
  }

  return <PlayScreen gameStatus={gameStatus} setGameStatus={setGameStatus} />;
};

export default App;
