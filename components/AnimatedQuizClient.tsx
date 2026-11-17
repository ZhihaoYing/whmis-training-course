"use client";

import { useState } from "react";

type QuizOption = {
  id: string;
  text: string;
  correct: boolean;
};

type AnimatedQuizClientProps = {
  question: string;
  options: QuizOption[];
  mode?: "single" | "multiple";
  explanation?: string;
  onComplete?: () => void;
};

export default function AnimatedQuizClient({
  question,
  options,
  mode = "single",
  explanation,
  onComplete,
}: AnimatedQuizClientProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [shake, setShake] = useState(false);

  function handleSelect(id: string) {
    setSubmitted(false);

    if (mode === "single") {
      setSelected([id]);
      return;
    }

    setSelected((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  }

  function handleSubmit() {
    const correctIds = options
      .filter((option) => option.correct)
      .map((option) => option.id)
      .sort();

    const selectedIds = [...selected].sort();

    const correct =
      correctIds.length === selectedIds.length &&
      correctIds.every(
        (id, index) => id === selectedIds[index]
      );

    setSubmitted(true);
    setIsCorrect(correct);

    if (correct) {
      onComplete?.();
    } else {
      setShake(true);

      setTimeout(() => {
        setShake(false);
      }, 400);
    }
  }

  function retry() {
    setSelected([]);
    setSubmitted(false);
    setIsCorrect(false);
  }

  return (
    <div className={`quiz-card ${shake ? "shake" : ""}`}>
      <div className="label">KNOWLEDGE CHECK</div>

      <h2>{question}</h2>

      {mode === "multiple" && (
        <p className="instruction">
          Select all answers that apply.
        </p>
      )}

      <div className="options">
        {options.map((option) => {
          const active = selected.includes(option.id);

          return (
            <button
              key={option.id}
              type="button"
              className={`option ${active ? "selected" : ""}`}
              onClick={() => handleSelect(option.id)}
            >
              <span className="selector">
                {mode === "single" ? (
                  <span className={`radio ${active ? "active" : ""}`}>
                    {active && <span />}
                  </span>
                ) : (
                  <span className={`checkbox ${active ? "active" : ""}`}>
                    {active && "✓"}
                  </span>
                )}
              </span>

              <span>{option.text}</span>
            </button>
          );
        })}
      </div>

      {!submitted && (
        <button
          className="submit-button"
          onClick={handleSubmit}
          disabled={selected.length === 0}
        >
          Check Answer
        </button>
      )}

      {submitted && isCorrect && (
        <div className="feedback correct">
          <div className="feedback-icon">✓</div>

          <div>
            <strong>Correct</strong>
            {explanation && <p>{explanation}</p>}
          </div>
        </div>
      )}

      {submitted && !isCorrect && (
        <div className="feedback incorrect">
          <div className="feedback-icon">×</div>

          <div>
            <strong>Not quite</strong>
            <p>Review your answer and try again.</p>

            <button
              className="retry-button"
              onClick={retry}
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .quiz-card {
          max-width: 860px;
          margin: 40px auto;
          padding: 32px;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 16px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
          transition: 0.2s ease;
        }

        .label {
          color: #3157c8;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1.2px;
          margin-bottom: 12px;
        }

        h2 {
          color: #111827;
          font-size: 23px;
          margin: 0 0 8px;
        }

        .instruction {
          color: #6b7280;
          margin-bottom: 20px;
        }

        .options {
          display: grid;
          gap: 12px;
          margin-top: 24px;
          margin-bottom: 24px;
        }

        .option {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px 18px;
          text-align: left;
          background: #ffffff;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          color: #111827;
          font-size: 15px;
          cursor: pointer;
          transition: 0.18s ease;
        }

        .option:hover {
          border-color: #3157c8;
          transform: translateY(-2px);
          box-shadow: 0 5px 14px rgba(49, 87, 200, 0.1);
        }

        .option.selected {
          background: #eef4ff;
          border-color: #3157c8;
        }

        .selector {
          flex-shrink: 0;
        }

        .radio {
          width: 20px;
          height: 20px;
          border: 2px solid #cbd5e1;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .radio.active {
          border-color: #3157c8;
        }

        .radio.active span {
          width: 10px;
          height: 10px;
          background: #3157c8;
          border-radius: 50%;
        }

        .checkbox {
          width: 20px;
          height: 20px;
          border: 2px solid #cbd5e1;
          border-radius: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-weight: 700;
        }

        .checkbox.active {
          background: #3157c8;
          border-color: #3157c8;
          color: white;
        }

        .submit-button {
          padding: 12px 24px;
          border: none;
          border-radius: 9px;
          background: #3157c8;
          color: white;
          font-weight: 700;
          cursor: pointer;
        }

        .submit-button:hover {
          background: #2445a5;
        }

        .submit-button:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .feedback {
          display: flex;
          gap: 14px;
          margin-top: 22px;
          padding: 18px;
          border-radius: 12px;
          animation: feedbackIn 0.25s ease;
        }

        .feedback p {
          margin: 5px 0 0;
        }

        .feedback.correct {
          background: #ecfdf3;
          border: 1px solid #a7f3d0;
          color: #166534;
        }

        .feedback.incorrect {
          background: #fff7ed;
          border: 1px solid #fed7aa;
          color: #9a3412;
        }

        .feedback-icon {
          width: 30px;
          height: 30px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          font-weight: 700;
        }

        .correct .feedback-icon {
          background: #22c55e;
          color: white;
        }

        .incorrect .feedback-icon {
          background: #f97316;
          color: white;
        }

        .retry-button {
          margin-top: 12px;
          padding: 8px 14px;
          background: white;
          border: 1px solid #fdba74;
          border-radius: 7px;
          color: #9a3412;
          font-weight: 700;
          cursor: pointer;
        }

        .shake {
          animation: shake 0.4s ease;
        }

        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }

          25% {
            transform: translateX(-7px);
          }

          50% {
            transform: translateX(7px);
          }

          75% {
            transform: translateX(-4px);
          }
        }

        @keyframes feedbackIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}