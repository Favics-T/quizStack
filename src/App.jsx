import { useEffect, useMemo, useState } from "react";
import { Navigate, Route, Routes, useNavigate, useSearchParams } from "react-router-dom";
import Onboarding from "./Onboarding";
import { getStackById } from "./data";
import { fetchQuizFromOpenAI } from "./openaiQuizApi";
import "./App.css";
import { normalize } from "./hooks";


function QuizPage() {
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

  useEffect(() => {
    if (!selectedStack) return;
    let live = true;

    async function loadQuiz() {
      setLoading(true);
      setError("");
      try {
        const quiz = await fetchQuizFromOpenAI(selectedStack.name);
        if (!live) return;
        setQuestions(quiz);
        setIndex(0);
        setSelected("");
        setTyped("");
        setSubmitted(false);
        setScore(0);
        setAnswers([]);
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
  const progress = total > 0 ? Math.round(((index + (submitted ? 1 : 0)) / total) * 100) : 0;

  const levelStats = useMemo(() => {
    const stats = { Beginner: { total: 0, correct: 0 }, Intermediate: { total: 0, correct: 0 }, Advanced: { total: 0, correct: 0 } };

    questions.forEach((q, i) => {
      stats[q.level].total += 1;
      if (answers[i]?.correct) stats[q.level].correct += 1;
    });

    return stats;
  }, [answers, questions]);

  const openIsCorrect = (q, input) => {
    const normalizedInput = normalize(input || "");
    const expected = normalize(q.answer || "");
    if (!normalizedInput || !expected) return false;
    return normalizedInput === expected || normalizedInput.includes(expected) || expected.includes(normalizedInput);
  };

  const handleSubmit = () => {
    if (submitted || !question) return;
    if (question.type === "mcq" && !selected) return;
    if (question.type === "open" && !typed.trim()) return;

    const correct = question.type === "mcq" ? selected === question.answer : openIsCorrect(question, typed);
    if (correct) setScore((prev) => prev + 1);

    setAnswers((prev) => {
      const next = [...prev];
      next[index] = {
        correct,
        input: question.type === "mcq" ? selected : typed.trim()
      };
      return next;
    });

    setSubmitted(true);
  };

  const handleNext = () => {
    if (!question) return;
    if (isLast) return;
    setIndex((prev) => prev + 1);
    setSelected("");
    setTyped("");
    setSubmitted(false);
  };

  const restartQuiz = () => {
    setRefreshSeed((prev) => prev + 1);
  };

  if (loading) {
    return (
      <main className="quiz-shell">
        <section className="quiz-card">
          <p className="eyebrow">Generating Quiz</p>
          <h1>{selectedStack.name}</h1>
          <p className="onboard-copy">Fetching 20 questions from OpenAI API for your selected stack.</p>
          <div className="loading-bar" />
        </section>
      </main>
    );
  }

  if (error) {
    return (
      <main className="quiz-shell">
        <section className="result-card">
          <p className="eyebrow">Quiz Error</p>
          <h1>Unable to load questions</h1>
          <p className="onboard-copy">{error}</p>
          <div className="quiz-actions error-actions">
            <button className="ghost-btn" onClick={() => navigate("/")}>
              Change Stack
            </button>
            <button className="primary-btn" onClick={restartQuiz}>
              Retry Fetch
            </button>
          </div>
        </section>
      </main>
    );
  }

  if (!question) {
    return (
      <main className="quiz-shell">
        <section className="result-card">
          <p className="eyebrow">No Quiz Data</p>
          <h1>Questions were not returned.</h1>
          <button className="primary-btn" onClick={restartQuiz}>
            Generate Again
          </button>
        </section>
      </main>
    );
  }

  if (isLast && submitted) {
    return (
      <main className="quiz-shell">
        <section className="result-card">
          <p className="eyebrow">{selectedStack.name}</p>
          <h1>Session Complete</h1>
          <p className="scoreline">
            You scored <strong>{score}</strong> out of <strong>{total}</strong>.
          </p>

          <div className="stat-grid">
            {Object.entries(levelStats).map(([level, stat]) => (
              <article key={level} className="stat-box">
                <h3>{level}</h3>
                <p>
                  {stat.correct}/{stat.total}
                </p>
              </article>
            ))}
          </div>

          <div className="quiz-actions error-actions">
            <button className="ghost-btn" onClick={() => navigate("/")}>
              New Stack
            </button>
            <button className="primary-btn" onClick={restartQuiz}>
              Regenerate Quiz
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="quiz-shell">
      <section className="quiz-card">
        <header className="quiz-top">
          <div>
            <p className="eyebrow">{selectedStack.name}</p>
            <h1>AI Generated Quiz</h1>
          </div>
          <div className="chip">{question.level}</div>
        </header>

        <div className="progress-track" aria-label="Quiz Progress">
          <span style={{ width: `${progress}%` }} />
        </div>

        <p className="q-meta">
          Question {index + 1} of {total} | {question.type === "mcq" ? "Multiple Choice" : "Open Answer"}
        </p>

        <h2 className="question-text">{question.question}</h2>

        {question.type === "mcq" ? (
          <div className="options-grid">
            {Object.entries(question.options).map(([key, value]) => {
              const active = selected === key;
              return (
                <button
                  key={key}
                  className={`option-btn ${active ? "active" : ""}`}
                  onClick={() => !submitted && setSelected(key)}
                  disabled={submitted}
                >
                  <span className="option-key">{key}</span>
                  <span>{value}</span>
                </button>
              );
            })}
          </div>
        ) : (
          <textarea
            className="open-input"
            placeholder="Type your answer..."
            value={typed}
            onChange={(event) => !submitted && setTyped(event.target.value)}
            disabled={submitted}
            rows={4}
          />
        )}

        {submitted && (
          <aside className={`feedback ${answers[index]?.correct ? "ok" : "bad"}`}>
            <p>
              {answers[index]?.correct ? "Correct answer." : "Not quite right."}{" "}
              {question.type === "mcq" ? `Correct option: ${question.answer}.` : `Expected answer: ${question.answer}`}
            </p>
            <p>{question.explanation}</p>
          </aside>
        )}

        <footer className="quiz-actions">
          {!submitted ? (
            <button className="primary-btn" onClick={handleSubmit}>
              Submit Answer
            </button>
          ) : (
            <button className="primary-btn" onClick={handleNext}>
              {isLast ? "Finish Quiz" : "Next Question"}
            </button>
          )}
        </footer>
      </section>
    </main>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Onboarding />} />
      <Route path="/quiz" element={<QuizPage />} />
    </Routes>
  );
}
