import "./cronometro.css";
import { useStopwatch } from "react-timer-hook";

function Timer() {
  const formatTime = (time: number) => (time < 10 ? `0${time}` : time);
  const { seconds, minutes, start, pause, reset, isRunning } = useStopwatch({
    autoStart: false,
  });

  return (
    <div id="timer_container">
      <button className="timerbtn" onClick={!isRunning ? start : pause}>
        {!isRunning ? (
          <i className="bi bi-caret-right-fill"></i>
        ) : (
          <i className="bi bi-pause-circle"></i>
        )}
      </button>
      <h1 className="timer">
        {formatTime(minutes)}:{formatTime(seconds)}
      </h1>
      <button
        className="timerbtn reset_turn"
        onClick={() => reset(new Date(), false)}
      >
        <i className="bi bi-arrow-clockwise"></i>
      </button>
    </div>
  );
}

export default Timer;
