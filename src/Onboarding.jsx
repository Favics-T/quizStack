import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { techStacks } from "./data";
import ThemeToggle from "./components/ThemeToggle";

export default function Onboarding({ theme, onToggleTheme }) {
  const [selected, setSelected] = useState(techStacks[0]?.id || "");
  const navigate = useNavigate();

  const startInterview = () => {
    if (!selected) return;
    navigate(`/quiz?stack=${encodeURIComponent(selected)}`);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-emerald-50 to-sky-50 p-4 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="mx-auto flex w-full max-w-5xl justify-end">
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </div>

      <section className="mx-auto mt-3 w-full max-w-5xl rounded-3xl border border-slate-200 bg-white/85 p-6 shadow-xl backdrop-blur dark:border-slate-700 dark:bg-slate-900/85">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">InterviewStack</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-slate-100">Choose Interview Track</h1>
        <p className="mt-3 max-w-3xl text-slate-700 dark:text-slate-300">
          Pick one role-focused track. You will run through a timed interview session and receive clear learning-gap feedback at the end.
        </p>

        <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {techStacks.map((stack) => {
            const Icon = stack.icon;
            const active = selected === stack.id;

            return (
              <button
                key={stack.id}
                className={`rounded-2xl border p-4 text-left transition ${
                  active
                    ? "border-emerald-400 bg-emerald-50 shadow-sm dark:border-emerald-500/50 dark:bg-emerald-500/10"
                    : "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-slate-600"
                }`}
                onClick={() => setSelected(stack.id)}
              >
                <span className="text-lg" style={{ color: stack.accent }}>
                  <Icon />
                </span>
                <p className="mt-2 text-base font-semibold text-slate-900 dark:text-slate-100">{stack.name}</p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{stack.description}</p>
              </button>
            );
          })}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            className="rounded-xl bg-slate-900 px-5 py-2.5 font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-emerald-600 dark:hover:bg-emerald-500"
            onClick={startInterview}
            disabled={!selected}
          >
            Start Interview
          </button>
        </div>
      </section>
    </main>
  );
}
