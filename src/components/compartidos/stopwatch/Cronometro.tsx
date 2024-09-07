import "./cronometro.css";
import { useStopwatch } from "react-timer-hook";

function Cronometro() {
  const { hours, minutes, seconds } = useStopwatch({autoStart: true});

  const formatTime = (time: number) => (time < 10 ? `0${time}` : time);
  return (
    <>
      <p className="general_timer">
        {formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}
      </p>
    </>
  );
}
export default Cronometro;
