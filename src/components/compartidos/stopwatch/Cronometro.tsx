import { useState, useEffect } from "react";
import './cronometro.css'

interface CronometroProps {
    isRunning: boolean;

  }

function Cronometro({ isRunning }: CronometroProps) {
  const [diff, setDiff] = useState<number>(0);
  const [initial, setInitial] = useState<number | null>(null);

  const tick = () => {
    if (initial !== null && isRunning) {
      setDiff(new Date().getTime() - initial);
    }
  };



  useEffect(() => {
    if (isRunning) {
      setInitial(new Date().getTime());
    }
  }, [isRunning]);

  useEffect(() => {
    if (initial !== null && isRunning) {
      const animationFrameId = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(animationFrameId);
    }
  }, [initial, isRunning, diff]);

  return (
    <>
      <p className="timer">{timeFormat(diff)}</p>
    </>
  );
}

const timeFormat = (milliseconds: number): string => {
  if (!milliseconds) return "00:00:00";
  const date = new Date(milliseconds);
  const mm = date.getUTCMinutes().toString().padStart(2, "0");
  const ss = date.getSeconds().toString().padStart(2, "0");

  return `${mm}:${ss}`;
};

export default Cronometro;
