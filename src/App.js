import React, { useState } from "react";
import "./index.css"; // Import the CSS file

export default function App() {
  return <PomodoroTimer />;
}

function PomodoroTimer() {
  const [timer, setTimer] = useState({ minutes: 25, seconds: 0 });
  const [intervalId, setIntervalId] = useState(null);
  const [isBreak, setIsBreak] = useState(false);

  function updateTimer() {
    setTimer((prevTimer) => {
      let { minutes, seconds } = prevTimer;
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(intervalId);
          if (isBreak) {
            alert("Break over! Time to get back to work.");
            setTimer({ minutes: 25, seconds: 0 });
            setIsBreak(false);
          } else {
            alert("Time's up! Take a 5-minute break.");
            setTimer({ minutes: 5, seconds: 0 });
            setIsBreak(true);
          }
          return prevTimer;
        }
        minutes -= 1;
        seconds = 59;
      } else {
        seconds -= 1;
      }
      return { minutes, seconds };
    });
  }

  function onStart() {
    if (intervalId !== null) return;
    const id = setInterval(updateTimer, 1000);
    setIntervalId(id);
  }

  function onPause() {
    if (intervalId !== null) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  }

  function onReset() {
    clearInterval(intervalId);
    setIntervalId(null);
    setTimer({ minutes: 25, seconds: 0 });
    setIsBreak(false);
  }

  const title = isBreak
    ? `Break: ${timer.minutes.toString().padStart(2, "0")}:${timer.seconds
        .toString()
        .padStart(2, "0")} - Pomodoro Timer`
    : `Work: ${timer.minutes.toString().padStart(2, "0")}:${timer.seconds
        .toString()
        .padStart(2, "0")} - Pomodoro Timer`;
  document.title = title;

  return (
    <div className="container">
      <h1 className="timer">{`${timer.minutes
        .toString()
        .padStart(2, "0")}:${timer.seconds.toString().padStart(2, "0")}`}</h1>
      <div className="buttonContainer">
        <Button onClick={onStart}>Start</Button>
        <Button onClick={onPause}>Pause</Button>
        <Button onClick={onReset}>Reset</Button>
      </div>
    </div>
  );
}

function Button({ children, onClick }) {
  return (
    <div>
      <button onClick={onClick}>{children}</button>
    </div>
  );
}
