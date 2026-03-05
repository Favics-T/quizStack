import { useEffect, useRef, useState } from "react";

const DEFAULT_DURATION = 15;

export default function Timer({ duration = DEFAULT_DURATION, isRunning, resetKey, onExpire }) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const expiredRef = useRef(false);

  // Reset timer every time question changes.
  useEffect(() => {
    setTimeLeft(duration);
    expiredRef.current = false;
  }, [duration, resetKey]);

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    const intervalId = setInterval(() => {
      setTimeLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isRunning, timeLeft]);

  useEffect(() => {
    if (timeLeft !== 0 || expiredRef.current) return;
    expiredRef.current = true;
    onExpire();
  }, [timeLeft, onExpire]);

  const progress = (timeLeft / duration) * 100;
  const danger = timeLeft <= 5;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-slate-600 dark:text-slate-300">Time left</span>
        <span className={`font-bold ${danger ? "text-rose-600 dark:text-rose-400" : "text-slate-900 dark:text-slate-100"}`}>
          {timeLeft}s
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
        <div
          className={`h-full rounded-full transition-all duration-1000 ${danger ? "bg-rose-500" : "bg-emerald-500"}`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
