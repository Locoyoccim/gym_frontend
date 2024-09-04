import { useState } from "react";
import "./cronometro.css";
import { useStopwatch } from "react-timer-hook";

function Timer() {
  const [btnStopWatch, setBtnStopWatch] = useState<string>("up");
  const formatTime = (time: number) => (time < 10 ? `0${time}` : time);
  const { seconds, minutes, start, pause, reset, isRunning } = useStopwatch({
    autoStart: false,
  });

  return (
    <div id="timer_container">
      <h1
        className="timer"
        onClick={() => setBtnStopWatch(btnStopWatch === "" ? "up" : "")}
      >
        {formatTime(minutes)}:{formatTime(seconds)}
      </h1>
      <section id="timerBtn_container" className={btnStopWatch}>
        <button className="timerbtn" onClick={!isRunning ? start : pause}>
          {!isRunning ? (
            <i className="bi bi-caret-right-fill"></i>
          ) : (
            <i className="bi bi-pause-circle"></i>
          )}
        </button>
        <button className="timerbtn reset_turn" onClick={() => reset(new Date(), false)}>
          <i className="bi bi-arrow-clockwise"></i>
        </button>
      </section>
    </div>
  );
}

export default Timer;
