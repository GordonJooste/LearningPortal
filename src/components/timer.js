import React, { useState, useEffect } from 'react';

function Timer() {
  const [time, setTime] = useState(0);
  const [countdown, setCountdown] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }

    if (countdown === 0) {
      clearInterval(intervalId);
      setIsRunning(false);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [countdown, isRunning]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleReset = () => {
    setIsRunning(false);
    setCountdown(time);
  };

  const handleSetTime = (minutes) => {
    const seconds = minutes * 60;
    setTime(seconds);
    setCountdown(seconds);
  };

  const handleIncrementTime = () => {
    setTime((prevTime) => prevTime + 60);
    setCountdown((prevCountdown) => prevCountdown + 60);
  };

  const handleDecrementTime = () => {
    if (time > 0) {
      setTime((prevTime) => prevTime - 60);
      setCountdown((prevCountdown) => prevCountdown - 60);
    }
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;

    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <div className="container">
      <div className="text-center mb-4">
        <h2>Countdown Timer</h2>
      </div>
      <div className="text-center mb-4">
        <h3>{formatTime(countdown)}</h3>
      </div>
      <div className="d-flex justify-content-center mb-4">
        <button className="btn btn-primary mx-2" onClick={handleDecrementTime}>
          -
        </button>
        <button className="btn btn-primary mx-2" onClick={handleIncrementTime}>
          +
        </button>
      </div>
      <div className="d-flex justify-content-center mb-4">
        <button className="btn btn-success mx-2" onClick={handleStart} disabled={isRunning}>
          Start
        </button>
        <button className="btn btn-danger mx-2" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default Timer;
