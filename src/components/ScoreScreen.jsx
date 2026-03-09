import { useEffect, useMemo, useState } from "react";

function ConfettiCanvas({ active }) {
  useEffect(() => {
    if (!active) return;

    const canvas = document.getElementById("confetti-canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frameId;
    let running = true;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 120 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height,
      r: Math.random() * 4 + 2,
      d: Math.random() * 120 + 40,
      color: ["#f97316", "#22c55e", "#3b82f6", "#eab308", "#ec4899"][Math.floor(Math.random() * 5)],
      tilt: Math.random() * 10 - 10,
      tiltAngleIncrement: Math.random() * 0.08 + 0.04,
      tiltAngle: 0
    }));

    const draw = () => {
      if (!running) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.tiltAngle += p.tiltAngleIncrement;
        p.y += (Math.cos(p.d) + 2 + p.r / 2) * 0.8;
        p.x += Math.sin(p.d) * 0.8;
        p.tilt = Math.sin(p.tiltAngle) * 12;

        if (p.y > canvas.height) {
          p.y = -10;
          p.x = Math.random() * canvas.width;
        }

        ctx.beginPath();
        ctx.lineWidth = p.r;
        ctx.strokeStyle = p.color;
        ctx.moveTo(p.x + p.tilt + p.r / 2, p.y);
        ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2);
        ctx.stroke();
      });

      frameId = requestAnimationFrame(draw);
    };

    draw();

    const stopTimer = setTimeout(() => {
      running = false;
      cancelAnimationFrame(frameId);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, 2800);

    return () => {
      running = false;
      clearTimeout(stopTimer);
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [active]);

  return <canvas id="confetti-canvas" className="pointer-events-none fixed inset-0 z-40" aria-hidden="true" />;
}

function inferTopic(questionText = "", explanationText = "") {
  const source = `${questionText} ${explanationText}`.toLowerCase();
  const topicMatchers = [
    { topic: "React fundamentals", words: ["react", "jsx", "props", "state", "hook", "useeffect", "usestate", "useref"] },
    { topic: "Frontend performance", words: ["memo", "reconciliation", "lazy", "suspense", "transition", "render"] },
    { topic: "Backend API design", words: ["rest", "http", "api", "status code", "idempotent", "middleware"] },
    { topic: "Databases and scaling", words: ["sql", "index", "normalization", "sharding", "isolation", "cap theorem", "cqrs", "cache"] },
    { topic: "Analytics and SQL", words: ["kpi", "etl", "cohort", "funnel", "dashboard", "join", "count", "window"] },
    { topic: "Machine learning fundamentals", words: ["model", "overfitting", "supervised", "cross-validation", "regularization", "gradient"] },
    { topic: "UX and accessibility", words: ["ux", "ui", "wcag", "accessibility", "hierarchy", "affordance", "wireframe"] },
    { topic: "Product thinking", words: ["roadmap", "mvp", "okr", "north star", "discovery", "outcome", "churn", "kano"] }
  ];

  const match = topicMatchers.find(({ words }) => words.some((word) => source.includes(word)));
  return match?.topic || "Core concepts";
}

function getStudyPlan(topic) {
  const plans = {
    "React fundamentals": "Revise component architecture, hooks, JSX, and state/props flow. Build one small app without tutorials.",
    "Frontend performance": "Practice memoization, lazy loading, reconciliation behavior, and render profiling in DevTools.",
    "Backend API design": "Review REST conventions, status codes, idempotency, middleware chains, and secure auth patterns.",
    "Databases and scaling": "Study indexing, normalization, transaction isolation, caching strategies, and horizontal partitioning.",
    "Analytics and SQL": "Practice SQL joins, aggregations, cohort/funnel analysis, and building KPI-driven dashboards.",
    "Machine learning fundamentals": "Focus on bias-variance, validation strategy, model metrics, and feature engineering workflows.",
    "UX and accessibility": "Study WCAG, hierarchy, affordance, usability testing, and redesign a flow for accessibility.",
    "Product thinking": "Practice turning outcomes into roadmaps, prioritize with RICE/OKRs, and run discovery interviews."
  };

  return plans[topic] || "Revisit fundamentals, solve more timed questions, and explain concepts out loud until clear.";
}

export default function ScoreScreen({ stackName, score, total, questions, answers, onRegenerate, onChangeStack, onReview }) {
  const [displayScore, setDisplayScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    let start;
    const duration = 900;

    const tick = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setDisplayScore(Math.round(progress * score));
      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  }, [score]);

  useEffect(() => {
    const timeoutId = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timeoutId);
  }, []);

  const levelStats = useMemo(() => {
    const stats = {
      Beginner: { total: 0, correct: 0 },
      Intermediate: { total: 0, correct: 0 },
      Advanced: { total: 0, correct: 0 }
    };

    answers.forEach((entry) => {
      if (!entry?.level || !stats[entry.level]) return;
      stats[entry.level].total += 1;
      if (entry.correct) stats[entry.level].correct += 1;
    });

    return stats;
  }, [answers]);

  const interviewInsights = useMemo(() => {
    const incorrect = [];
    const gaps = {};

    answers.forEach((entry, idx) => {
      if (!entry || entry.correct) return;
      const question = questions[idx];
      if (!question) return;

      const topic = question.topic || inferTopic(question.question, question.explanation);
      gaps[topic] = (gaps[topic] || 0) + 1;

      incorrect.push({
        number: idx + 1,
        question: question.question,
        timedOut: !!entry.timedOut,
        level: entry.level,
        topic
      });
    });

    const topGaps = Object.entries(gaps)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([topic, misses]) => ({
        topic,
        misses,
        plan: getStudyPlan(topic)
      }));

    const timedOutCount = incorrect.filter((item) => item.timedOut).length;
    return { incorrect, topGaps, timedOutCount };
  }, [answers, questions]);

  return (
    <>
      <ConfettiCanvas active={showConfetti} />
      <section className="mx-auto w-full max-w-3xl rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-xl backdrop-blur dark:border-slate-700 dark:bg-slate-900/90">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">{stackName}</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-slate-100">Interview Session Complete</h1>
        <p className="mt-3 text-lg text-slate-700 dark:text-slate-300">
          Score: <span className="text-4xl font-extrabold text-emerald-600 dark:text-emerald-400">{displayScore}</span>
          <span className="ml-1 text-slate-500 dark:text-slate-400">/ {total}</span>
        </p>

        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {Object.entries(levelStats).map(([level, stat]) => (
            <article key={level} className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800">
              <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">{level}</h3>
              <p className="mt-1 text-lg font-bold text-slate-900 dark:text-slate-100">
                {stat.correct}/{stat.total}
              </p>
            </article>
          ))}
        </div>

        <section className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
          <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">Learning Gap Analysis</h2>
          {interviewInsights.incorrect.length === 0 ? (
            <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
              Strong round. No major gaps detected from this interview session.
            </p>
          ) : (
            <>
              <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                You missed {interviewInsights.incorrect.length} question(s). {interviewInsights.timedOutCount} were timed out responses.
              </p>

              <div className="mt-3 space-y-2">
                {interviewInsights.topGaps.map((gap) => (
                  <article key={gap.topic} className="rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-600 dark:bg-slate-900">
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      Gap: {gap.topic} ({gap.misses} miss{gap.misses > 1 ? "es" : ""})
                    </p>
                    <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">Study focus: {gap.plan}</p>
                  </article>
                ))}
              </div>

              <div className="mt-3">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Where you flopped</h3>
                <ul className="mt-2 space-y-1 text-sm text-slate-700 dark:text-slate-300">
                  {interviewInsights.incorrect.slice(0, 6).map((item) => (
                    <li key={`${item.number}-${item.question}`}>
                      Q{item.number} [{item.level}] - {item.topic}
                      {item.timedOut ? " (timed out)" : ""}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </section>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button className="rounded-xl border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-100 dark:hover:bg-slate-800" onClick={onChangeStack}>
            New Stack
          </button>
          <button className="rounded-xl border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-100 dark:hover:bg-slate-800" onClick={onReview}>
            Review Interview
          </button>
          <button className="rounded-xl bg-slate-900 px-4 py-2 font-semibold text-white transition hover:bg-slate-700 dark:bg-emerald-600 dark:hover:bg-emerald-500" onClick={onRegenerate}>
            Start New Interview
          </button>
        </div>
      </section>
    </>
  );
}
