import React, { useState, useRef } from "react";
import "./App.css";
import { useEffect } from "react";

function App() {
  const intervalRef = useRef(null);
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);
  const [isPause, setIsPause] = useState(false);
  const [start, setStart] = useState(true);
  const [stop, setStop] = useState(false);
  const [restart, setRestart] = useState(false);

  const handleStop = () => {
    if (intervalRef.current && stop) {
      clearInterval(intervalRef.current);
      setIsPause(true);
      setStart(true);
      setStop(false);
    }
  };

  const handleStart = () => {
    if (start) {
      let count = isPause ? sec : 0;
      intervalRef.current = setInterval(() => {
        count += 1;
        if (count > 59) {
          setMin((min) => min + 1);
          count = 0;
        }
        setSec(count);
      }, 1000);
      setIsPause(false);
    }
    setStop(true);
    setRestart(true);
    setStart(false);
  };

  useEffect(() => {
    if (min > 58) {
      clearInterval(intervalRef.current);
      setIsPause(false);
    }
  }, [min]);

  const handleReset = () => {
    if (intervalRef.current && restart) {
      clearInterval(intervalRef.current);
      setSec(0);
      setMin(0);
      setIsPause(false);
      setStart(true);
      setRestart(false);
    }
  };

  return (
    <div className="stopwatch-continer">
      <div className="stopwatch-card">
        <h1 className="stopwatch-title">Stopwatch</h1>
        <h1 className="time">
          {min > 9 ? min : `0${min}`}:{sec > 9 ? sec : `0${sec}`}
        </h1>
        <div className="buttons-container">
          <button className="button start" onClick={handleStart}>
            {isPause ? "Restart" : "Start"}
          </button>
          <button className="button stop" onClick={handleStop}>
            Stop
          </button>
          <button className="button reset" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
