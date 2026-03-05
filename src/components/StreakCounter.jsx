export default function StreakCounter({ streak }) {
  return (
    <div className="inline-flex items-center rounded-full border border-amber-300 bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-800 dark:border-amber-600/60 dark:bg-amber-500/15 dark:text-amber-300">
      Streak: {streak}
    </div>
  );
}
