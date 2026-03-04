import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { techStacks } from "./data";

export default function Onboarding() {
  const [selected, setSelected] = useState(techStacks[0]?.id || "");
  const navigate = useNavigate();

  const startQuiz = () => {
    if (!selected) return;
    navigate(`/quiz?stack=${encodeURIComponent(selected)}`);
  };

  return (
    <main className="onboard-shell">
      <section className="onboard-card">
        <p className="eyebrow">QuizStack</p>
        <h1>Pick Your Tech Stack</h1>
        <p className="onboard-copy">
          Choose one learning track. Your quiz will be generated only from the selected stack using OpenAI.
        </p>

        <div className="stack-grid">
          {techStacks.map((stack) => {
            const Icon = stack.icon;
            const active = selected === stack.id;

            return (
              <button
                key={stack.id}
                className={`stack-card ${active ? "active" : ""}`}
                style={{ "--stack-accent": stack.accent }}
                onClick={() => setSelected(stack.id)}
              >
                <span className="stack-icon">
                  <Icon />
                </span>
                <span className="stack-title">{stack.name}</span>
                <span className="stack-desc">{stack.description}</span>
              </button>
            );
          })}
        </div>

        <footer className="onboard-actions">
          <button className="primary-btn" onClick={startQuiz} disabled={!selected}>
            Continue to Quiz
          </button>
        </footer>
      </section>
    </main>
  );
}
