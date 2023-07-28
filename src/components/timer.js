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
  <div className="text-center mb-4 border-top border-bottom py-3">
    <div className="d-inline-block">
      <button className="btn btn-primary btn-sm mr-2" onClick={handleDecrementTime}>
        -
      </button>
      <button className="btn btn-primary btn-sm" onClick={handleIncrementTime}>
        +
      </button>
    </div>
    <h3 className="d-inline-block mx-4">{formatTime(countdown)}</h3>
    <div className="d-inline-block">
      <button className="btn btn-success btn-sm mx-2" onClick={handleStart} disabled={isRunning}>
        Start
      </button>
      <button className="btn btn-danger btn-sm mx-2" onClick={handleReset}>
        Reset
      </button>
    </div>
  </div>
</div>


  );
}

export default Timer;
