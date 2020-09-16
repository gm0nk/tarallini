import React, { useState, useRef } from "react";
import "./App.css";

const padTime = (time) => time.toString().padStart(2, "0");

export default function App() {
  const [timeLeft, setTimeLeft] = useState(5);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  let minutes = padTime(Math.floor(timeLeft / 60));
  let seconds = padTime(timeLeft % 60);

  const startTimer = () => {
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTimeLeft((timeLeft) => {
        if (timeLeft) {
          return timeLeft - 1;
        } else {
          stopTimer();
          return 0;
        }
      });
    }, 1000);
  };
  const stopTimer = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };
  const resetTimer = () => setTimeLeft(25 * 60);

  return (
    <div className="app">
      {!isRunning && !timeLeft && <h2>Ready to go another round?</h2>}
      {!isRunning && !!timeLeft && <h2>Ready to procede?</h2>}
      {isRunning && <h2>Keep it up!</h2>}

      <div className="timer">
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>

      <div className="buttons">
        {!isRunning ? (
          <button onClick={startTimer}>Start</button>
        ) : (
          <button onClick={stopTimer}>Stop</button>
        )}
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
}
