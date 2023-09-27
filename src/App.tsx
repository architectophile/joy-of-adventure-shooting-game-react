import React, { useEffect, useState } from "react";
import useSound from "use-sound";
import PlayScreen from "./PlayScreen";
import introBgm from "./sound/intro.mp3";
import mainBgm from "./sound/main.mp3";
import introJoyImage from "./assets/images/intro-joy.png";
import introEthanImage from "./assets/images/intro-ethan.png";
import introJinjerImage from "./assets/images/intro-jinjer.png";

export type GameStatus = "splash" | "intro" | "start" | "end" | "pause";

export const CANVAS_WIDTH = window.innerWidth;
export const CANVAS_HEIGHT = window.innerHeight;

const defaultImage = new Image();
defaultImage.src = introJoyImage;

const introImageSrcs = [introJoyImage, introEthanImage, introJinjerImage];

let index = 0;

const App: React.FC = (): JSX.Element => {
  const [gameStatus, setGameStatus] = useState<GameStatus>("splash");
  const [playIntro, { stop: stopIntro }] = useSound(introBgm);
  const [playMain, { stop: stopMain }] = useSound(mainBgm);
  const [introImage, setIntroImage] = useState<HTMLImageElement>(new Image());

  useEffect(() => {
    if (window.innerWidth <= 768) {
      // Check if the device width is less than or equal to 768px
      goFullScreen();
    }
    introImage.src = introImageSrcs[index];
  }, []);

  useEffect(() => {
    if (gameStatus === "intro") {
      setInterval(() => {
        index = index + 1;
        if (index >= introImageSrcs.length) {
          index = 0;
        }
        const newImage = new Image();
        newImage.src = introImageSrcs[index];
        setIntroImage(newImage);
      }, 5000);
    }
  }, [gameStatus]);

  const endGame = () => {
    setGameStatus("end");
    stopMain();
  };

  const startGame = () => {
    setGameStatus("start");
    stopIntro();
    playMain();
  };

  if (gameStatus === "splash") {
    return (
      <div
        style={{
          backgroundColor: "black",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
          height: "100vh",
          fontFamily: "Invasion2000, fallback, sans-serif",
        }}
        onClick={() => {
          setGameStatus("intro");
          playIntro();
        }}
      >
        <span style={{ color: "white", fontSize: 32 }}>Click to Start</span>
      </div>
    );
  } else if (gameStatus === "intro") {
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
          <img
            src={introImage.src}
            alt="Intro Character"
            style={{
              marginBottom: "20px",
              width: "84%",
              height: "84%",
              objectFit: "contain",
            }}
          />

          <span style={{ color: "white", fontSize: 30 }}>Joy of Adventure</span>
          <button
            style={{
              marginTop: 32,
              paddingLeft: 30,
              paddingRight: 30,
              paddingTop: 10,
              paddingBottom: 10,
              fontSize: 32,
              fontFamily: "ArcadeClassic, fallback, sans-serif",
            }}
            onClick={startGame}
          >
            Play
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
          {/* <button
            style={{
              marginTop: 32,
              padding: 10,
              fontSize: 32,
              fontFamily: "ArcadeClassic, fallback, sans-serif",
            }}
            onClick={startGame}
          >
            Restart
          </button> */}
        </div>
      </div>
    );
  }

  return (
    <PlayScreen
      gameStatus={gameStatus}
      setGameStatus={setGameStatus}
      endGame={endGame}
    />
  );
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

// function exitFullScreen() {
//   const elem = document.documentElement as any;

//   if (elem.exitFullscreen) {
//     elem.exitFullscreen();
//   } else if (elem.mozCancelFullScreen) {
//     /* Firefox */
//     elem.mozCancelFullScreen();
//   } else if (elem.webkitExitFullscreen) {
//     /* Chrome, Safari & Opera */
//     elem.webkitExitFullscreen();
//   } else if (elem.msExitFullscreen) {
//     /* IE/Edge */
//     elem.msExitFullscreen();
//   }
// }

export default App;
