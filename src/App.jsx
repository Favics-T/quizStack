import { useEffect, useMemo, useState } from "react";
import { Navigate, Route, Routes, useNavigate, useSearchParams } from "react-router-dom";
import Onboarding from "./Onboarding";
import { getStackById } from "./data";
import { fetchQuizFromOpenAI } from "./openaiQuizApi";
import { normalize } from "./hooks";
import Timer from "./components/Timer";
import StreakCounter from "./components/StreakCounter";
import ScoreScreen from "./components/ScoreScreen";
import ResultsReview from "./components/ResultsReview";
import ThemeToggle from "./components/ThemeToggle";
import { useTheme } from "./hooks/useTheme";

function QuizPage({ theme, onToggleTheme }) {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const stackId = params.get("stack") || "";
  const selectedStack = getStackById(stackId);

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshSeed, setRefreshSeed] = useState(0);

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState("");
  const [typed, setTyped] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [streak, setStreak] = useState(0);
  const [screen, setScreen] = useState("quiz");

  useEffect(() => {
    if (!selectedStack) return;
    let live = true;

    async function loadQuiz() {
      setLoading(true);
      setError("");
      setScreen("quiz");

      try {
        const quiz = await fetchQuizFromOpenAI(selectedStack.name, selectedStack.id);
        if (!live) return;

        setQuestions(quiz);
        setIndex(0);
        setSelected("");
        setTyped("");
        setSubmitted(false);
        setScore(0);
        setAnswers([]);
        setStreak(0);
      } catch (err) {
        if (!live) return;
        setQuestions([]);
        setError(err instanceof Error ? err.message : "Failed to fetch quiz questions.");
      } finally {
        if (live) setLoading(false);
      }
    }

    loadQuiz();
    return () => {
      live = false;
    };
  }, [selectedStack, refreshSeed]);

  if (!stackId || !selectedStack) {
    return <Navigate to="/" replace />;
  }

  const total = questions.length;
  const question = questions[index];
  const isLast = total > 0 && index === total - 1;
  const progress = total > 0 ? Math.round((index / total) * 100) : 0;

  const openIsCorrect = (q, input) => {
    const normalizedInput = normalize(input || "");
    const expected = normalize(q.answer || "");
    if (!normalizedInput || !expected) return false;
    return normalizedInput === expected || normalizedInput.includes(expected) || expected.includes(normalizedInput);
  };

  // Shared result writer used by submit and timeout paths.
  const recordAnswer = ({ correct, input, timedOut = false }) => {
    if (!question) return;

    if (correct) {
      setScore((prev) => prev + 1);
      setStreak((prev) => prev + 1);
    } else {
      setStreak(0);
    }

    setAnswers((prev) => {
      const next = [...prev];
      next[index] = {
        correct,
        input,
        timedOut,
        type: question.type,
        level: question.level
      };
      return next;
    });

    if (timedOut) {
      if (isLast) {
        setScreen("score");
        return;
      }
      setIndex((prev) => prev + 1);
      setSelected("");
      setTyped("");
      setSubmitted(false);
      return;
    }

    setSubmitted(true);
  };

  const handleSubmit = () => {
    if (submitted || !question) return;
    if (question.type === "mcq" && !selected) return;
    if (question.type === "open" && !typed.trim()) return;

    const input = question.type === "mcq" ? selected : typed.trim();
    const correct = question.type === "mcq" ? selected === question.answer : openIsCorrect(question, typed);

    recordAnswer({ correct, input });
  };

  const handleTimerExpire = () => {
    if (submitted || !question) return;
    const input = question.type === "mcq" ? selected : typed.trim();
    recordAnswer({ correct: false, input, timedOut: true });
  };

  const handleNext = () => {
    if (!question || !submitted) return;

    if (isLast) {
      setScreen("score");
      return;
    }

    setIndex((prev) => prev + 1);
    setSelected("");
    setTyped("");
    setSubmitted(false);
  };

  const restartQuiz = () => {
    setRefreshSeed((prev) => prev + 1);
  };

  const answeredCount = useMemo(() => answers.filter(Boolean).length, [answers]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-orange-50 via-emerald-50 to-sky-50 p-4 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="mx-auto flex w-full max-w-3xl justify-end">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>
        <section className="mx-auto mt-3 w-full max-w-3xl rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-xl backdrop-blur dark:border-slate-700 dark:bg-slate-900/90">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Generating Quiz</p>
          <h1 className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">{selectedStack.name}</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-300">Fetching 20 questions from OpenAI API for your selected stack.</p>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
            <div className="h-full w-1/3 animate-pulse rounded-full bg-emerald-500" />
          </div>
        </section>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-orange-50 via-emerald-50 to-sky-50 p-4 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="mx-auto flex w-full max-w-3xl justify-end">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>
        <section className="mx-auto mt-3 w-full max-w-3xl rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-xl backdrop-blur dark:border-slate-700 dark:bg-slate-900/90">
          <p className="text-xs uppercase tracking-[0.2em] text-rose-500">Quiz Error</p>
          <h1 className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">Unable to load questions</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-300">{error}</p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button className="rounded-xl border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-100 dark:hover:bg-slate-800" onClick={() => navigate("/")}>
              Change Stack
            </button>
            <button className="rounded-xl bg-slate-900 px-4 py-2 font-semibold text-white transition hover:bg-slate-700 dark:bg-emerald-600 dark:hover:bg-emerald-500" onClick={restartQuiz}>
              Retry Fetch
            </button>
          </div>
        </section>
      </main>
    );
  }

  if (!question && screen === "quiz") {
    return (
      <main className="min-h-screen bg-gradient-to-br from-orange-50 via-emerald-50 to-sky-50 p-4 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="mx-auto flex w-full max-w-3xl justify-end">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>
        <section className="mx-auto mt-3 w-full max-w-3xl rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-xl backdrop-blur dark:border-slate-700 dark:bg-slate-900/90">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">No Quiz Data</p>
          <h1 className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">Questions were not returned.</h1>
          <button className="mt-5 rounded-xl bg-slate-900 px-4 py-2 font-semibold text-white transition hover:bg-slate-700 dark:bg-emerald-600 dark:hover:bg-emerald-500" onClick={restartQuiz}>
            Generate Again
          </button>
        </section>
      </main>
    );
  }

  if (screen === "score") {
    return (
      <main className="min-h-screen bg-gradient-to-br from-orange-50 via-emerald-50 to-sky-50 p-4 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="mx-auto flex w-full max-w-3xl justify-end">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>
        <div className="mt-3">
          <ScoreScreen
            stackName={selectedStack.name}
            score={score}
            total={total}
            answers={answers}
            onChangeStack={() => navigate("/")}
            onRegenerate={restartQuiz}
            onReview={() => setScreen("review")}
          />
        </div>
      </main>
    );
  }

  if (screen === "review") {
    return (
      <main className="min-h-screen bg-gradient-to-br from-orange-50 via-emerald-50 to-sky-50 p-4 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="mx-auto flex w-full max-w-4xl justify-end">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>
        <div className="mt-3">
          <ResultsReview questions={questions} answers={answers} onBack={() => setScreen("score")} />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-emerald-50 to-sky-50 p-4 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="mx-auto flex w-full max-w-3xl justify-end">
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </div>

      <section className="mx-auto mt-3 w-full max-w-3xl rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-xl backdrop-blur dark:border-slate-700 dark:bg-slate-900/90">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">{selectedStack.name}</p>
            <h1 className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">AI Generated Quiz</h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-full border border-slate-300 bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200">
              {question.level}
            </span>
            <StreakCounter streak={streak} />
          </div>
        </header>

        <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
          <span className="block h-full rounded-full bg-gradient-to-r from-orange-500 to-emerald-500" style={{ width: `${progress}%` }} />
        </div>

        <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
          Question {index + 1} of {total} | {question.type === "mcq" ? "Multiple Choice" : "Open Answer"} | Answered: {answeredCount}
        </p>

        <div className="mt-4">
          <Timer duration={15} isRunning={!submitted && screen === "quiz"} resetKey={`${refreshSeed}-${index}`} onExpire={handleTimerExpire} />
        </div>

        <h2 className="mt-5 text-2xl font-semibold leading-tight text-slate-900 dark:text-slate-100">{question.question}</h2>

        {question.type === "mcq" ? (
          <div className="mt-5 grid gap-3">
            {Object.entries(question.options).map(([key, value]) => {
              const active = selected === key;
              return (
                <button
                  key={key}
                  className={`flex items-center gap-3 rounded-xl border p-3 text-left transition ${
                    active
                      ? "border-emerald-400 bg-emerald-50 dark:border-emerald-500/50 dark:bg-emerald-500/10"
                      : "border-slate-200 bg-white hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-slate-600"
                  }`}
                  onClick={() => !submitted && setSelected(key)}
                  disabled={submitted}
                >
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-200 text-sm font-bold text-slate-700 dark:bg-slate-700 dark:text-slate-200">
                    {key}
                  </span>
                  <span className="text-slate-800 dark:text-slate-200">{value}</span>
                </button>
              );
            })}
          </div>
        ) : (
          <textarea
            className="mt-5 min-h-28 w-full rounded-xl border border-slate-300 bg-white p-3 text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-400/30 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
            placeholder="Type your answer..."
            value={typed}
            onChange={(event) => !submitted && setTyped(event.target.value)}
            disabled={submitted}
            rows={4}
          />
        )}

        {submitted && (
          <aside
            className={`mt-4 rounded-xl border p-3 ${
              answers[index]?.correct
                ? "border-emerald-300 bg-emerald-50 dark:border-emerald-500/40 dark:bg-emerald-500/10"
                : "border-rose-300 bg-rose-50 dark:border-rose-500/40 dark:bg-rose-500/10"
            }`}
          >
            <p className="font-semibold text-slate-900 dark:text-slate-100">
              {answers[index]?.correct ? "Correct answer." : "Not quite right."}{" "}
              {question.type === "mcq" ? `Correct option: ${question.answer}.` : `Expected answer: ${question.answer}.`}
            </p>
            <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">{question.explanation}</p>
          </aside>
        )}

        <footer className="mt-6 flex justify-end">
          {!submitted ? (
            <button className="rounded-xl bg-slate-900 px-4 py-2 font-semibold text-white transition hover:bg-slate-700 dark:bg-emerald-600 dark:hover:bg-emerald-500" onClick={handleSubmit}>
              Submit Answer
            </button>
          ) : (
            <button className="rounded-xl bg-slate-900 px-4 py-2 font-semibold text-white transition hover:bg-slate-700 dark:bg-emerald-600 dark:hover:bg-emerald-500" onClick={handleNext}>
              {isLast ? "Finish Quiz" : "Next Question"}
            </button>
          )}
        </footer>
      </section>
    </main>
  );
}

export default function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Routes>
      <Route path="/" element={<Onboarding theme={theme} onToggleTheme={toggleTheme} />} />
      <Route path="/quiz" element={<QuizPage theme={theme} onToggleTheme={toggleTheme} />} />
    </Routes>
  );
}
