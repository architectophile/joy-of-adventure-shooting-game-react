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

  useEffect(() => {
    if (window.innerWidth <= 768) {
      // Check if the device width is less than or equal to 768px
      goFullScreen();
    }
  }, []);

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

function goFullScreen() {
  const elem = document.documentElement as any;

  // if (elem.requestFullscreen) {
  //   elem.requestFullscreen();
  // } else if (elem.mozRequestFullScreen) {
  //   /* Firefox */
  //   elem.mozRequestFullScreen();
  // } else if (elem.webkitRequestFullscreen) {
  //   /* Chrome, Safari & Opera */
  //   elem.webkitRequestFullscreen();
  // } else if (elem.msRequestFullscreen) {
  //   /* IE/Edge */
  //   elem.msRequestFullscreen();
  // }
}

function exitFullScreen() {
  const elem = document.documentElement as any;

  if (elem.exitFullscreen) {
    elem.exitFullscreen();
  } else if (elem.mozCancelFullScreen) {
    /* Firefox */
    elem.mozCancelFullScreen();
  } else if (elem.webkitExitFullscreen) {
    /* Chrome, Safari & Opera */
    elem.webkitExitFullscreen();
  } else if (elem.msExitFullscreen) {
    /* IE/Edge */
    elem.msExitFullscreen();
  }
}

export default App;
