function renderAnswer(entry, question) {
  if (!entry) return "No answer";
  if (entry.type === "mcq") {
    if (!entry.input) return entry.timedOut ? "No answer (timed out)" : "No answer";
    const optionText = question.options?.[entry.input] || "";
    return optionText ? `${entry.input}: ${optionText}` : entry.input;
  }
  return entry.input || (entry.timedOut ? "No answer (timed out)" : "No answer");
}

function renderCorrect(question) {
  if (question.type === "mcq") {
    const optionText = question.options?.[question.answer] || "";
    return optionText ? `${question.answer}: ${optionText}` : question.answer;
  }
  return question.answer;
}

export default function ResultsReview({ questions, answers, onBack }) {
  return (
    <section className="mx-auto w-full max-w-4xl rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-xl backdrop-blur dark:border-slate-700 dark:bg-slate-900/90">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Interview Review</p>
      <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-slate-100">Per-question breakdown</h1>

      <div className="mt-6 space-y-4">
        {questions.map((question, idx) => {
          const entry = answers[idx];
          const correct = !!entry?.correct;

          return (
            <article
              key={`${question.question}-${idx}`}
              className={`rounded-xl border p-4 ${correct ? "border-emerald-300 bg-emerald-50/80 dark:border-emerald-500/40 dark:bg-emerald-500/10" : "border-rose-300 bg-rose-50/80 dark:border-rose-500/40 dark:bg-rose-500/10"}`}
            >
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">Question {idx + 1}</h2>
                <span className={`rounded-full px-2 py-1 text-xs font-bold ${correct ? "bg-emerald-200 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300" : "bg-rose-200 text-rose-800 dark:bg-rose-500/20 dark:text-rose-300"}`}>
                  {correct ? "Correct" : "Incorrect"}
                </span>
              </div>

              <p className="mt-2 font-medium text-slate-800 dark:text-slate-200">{question.question}</p>
              <p className="mt-3 text-sm text-slate-700 dark:text-slate-300">
                <span className="font-semibold">Your answer:</span> {renderAnswer(entry, question)}
              </p>
              <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">
                <span className="font-semibold">Correct answer:</span> {renderCorrect(question)}
              </p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{question.explanation}</p>
            </article>
          );
        })}
      </div>

      <div className="mt-6 flex justify-end">
        <button className="rounded-xl bg-slate-900 px-4 py-2 font-semibold text-white transition hover:bg-slate-700 dark:bg-emerald-600 dark:hover:bg-emerald-500" onClick={onBack}>
          Back to Interview Summary
        </button>
      </div>
    </section>
  );
}
