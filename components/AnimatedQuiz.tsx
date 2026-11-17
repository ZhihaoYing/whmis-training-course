"use client";

import { useState } from "react";

type QuizOption = {
  id: string;
  text: string;
  correct: boolean;
};

type AnimatedQuizProps = {
  question: string;
  options: QuizOption[];
  mode?: "single" | "multiple";
  explanation?: string;
  onComplete?: () => void;
};

export default function AnimatedQuiz({
  question,
  options,
  mode = "single",
  explanation = "Correct. You can continue to the next section.",
  onComplete,
}: AnimatedQuizProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [shake, setShake] = useState(false);

  function selectOption(id: string) {
    if (submitted && correct) return;

    if (mode === "single") {
      setSelected([id]);
    } else {
      setSelected((current) =>
        current.includes(id)
          ? current.filter((item) => item !== id)
          : [...current, id]
      );
    }

    setSubmitted(false);
  }

  function checkAnswer() {
    if (selected.length === 0) return;

    const correctIds = options
      .filter((option) => option.correct)
      .map((option) => option.id)
      .sort();

    const selectedIds = [...selected].sort();

    const isCorrect =
      correctIds.length === selectedIds.length &&
      correctIds.every((id, index) => id === selectedIds[index]);

    setSubmitted(true);
    setCorrect(isCorrect);

    if (isCorrect) {
      onComplete?.();
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 450);
    }
  }

  function tryAgain() {
    setSelected([]);
    setSubmitted(false);
    setCorrect(false);
  }

  return (
    <div
      className={`animated-quiz ${shake ? "quiz-shake" : ""} ${
        submitted && correct ? "quiz-success" : ""
      }`}
    >
      <div className="quiz-label">KNOWLEDGE CHECK</div>

      <h3 className="quiz-question">{question}</h3>

      {mode === "multiple" && (
        <p className="quiz-instruction">
          Select all answers that apply.
        </p>
      )}

      <div className="quiz-options">
        {options.map((option) => {
          const isSelected = selected.includes(option.id);

          return (
            <button
              key={option.id}
              type="button"
              className={`quiz-option ${
                isSelected ? "quiz-option-selected" : ""
              }`}
              onClick={() => selectOption(option.id)}
            >
              <span
                className={
                  mode === "single"
                    ? "quiz-radio"
                    : "quiz-checkbox"
                }
              >
                {isSelected ? "✓" : ""}
              </span>

              <span>{option.text}</span>
            </button>
          );
        })}
      </div>

      {!submitted && (
        <button
          type="button"
          className="quiz-submit"
          onClick={checkAnswer}
          disabled={selected.length === 0}
        >
          Submit
        </button>
      )}

      {submitted && correct && (
        <div className="quiz-feedback quiz-feedback-correct">
          <div className="feedback-icon">✓</div>

          <div>
            <strong>Correct</strong>
            <p>{explanation}</p>
          </div>
        </div>
      )}

      {submitted && !correct && (
        <div className="quiz-feedback quiz-feedback-wrong">
          <div className="feedback-icon">×</div>

          <div>
            <strong>Not quite</strong>
            <p>Review your answer and try again.</p>

            <button
              type="button"
              className="quiz-try-again"
              onClick={tryAgain}
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .animated-quiz {
          max-width: 760px;
          margin: 28px auto;
          padding: 30px;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 16px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease;
        }

        .quiz-label {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1.2px;
          color: #3157c8;
          margin-bottom: 12px;
        }

        .quiz-question {
          margin: 0 0 8px;
          font-size: 22px;
          line-height: 1.4;
          color: #111827;
        }

        .quiz-instruction {
          margin: 0 0 20px;
          color: #6b7280;
          font-size: 14px;
        }

        .quiz-options {
          display: grid;
          gap: 12px;
          margin-top: 22px;
          margin-bottom: 22px;
        }

        .quiz-option {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px 18px;
          background: #ffffff;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          cursor: pointer;
          text-align: left;
          color: #111827;
          font-size: 16px;
          transition:
            border-color 0.18s ease,
            background 0.18s ease,
            transform 0.18s ease,
            box-shadow 0.18s ease;
        }

        .quiz-option:hover {
          border-color: #9eb2ef;
          background: #f8faff;
          transform: translateY(-2px);
          box-shadow: 0 5px 14px rgba(49, 87, 200, 0.08);
        }

        .quiz-option-selected {
          border-color: #3157c8;
          background: #eef4ff;
          transform: scale(1.01);
        }

        .quiz-radio,
        .quiz-checkbox {
          width: 24px;
          height: 24px;
          min-width: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #9ca3af;
          font-size: 14px;
          font-weight: 700;
          transition: all 0.18s ease;
        }

        .quiz-radio {
          border-radius: 50%;
        }

        .quiz-checkbox {
          border-radius: 5px;
        }

        .quiz-option-selected .quiz-radio,
        .quiz-option-selected .quiz-checkbox {
          color: white;
          background: #3157c8;
          border-color: #3157c8;
          transform: scale(1.08);
        }

        .quiz-submit,
        .quiz-try-again {
          border: none;
          border-radius: 9px;
          cursor: pointer;
          font-weight: 700;
          transition:
            transform 0.18s ease,
            opacity 0.18s ease,
            box-shadow 0.18s ease;
        }

        .quiz-submit {
          padding: 12px 26px;
          color: white;
          background: #3157c8;
        }

        .quiz-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(49, 87, 200, 0.25);
        }

        .quiz-submit:disabled {
          opacity: 0.45;
          cursor: not-allowed;
        }

        .quiz-feedback {
          display: flex;
          gap: 14px;
          margin-top: 20px;
          padding: 18px;
          border-radius: 12px;
          animation: feedback-in 0.35s ease;
        }

        .quiz-feedback p {
          margin: 5px 0 0;
        }

        .quiz-feedback-correct {
          background: #ecfdf3;
          border: 1px solid #a7f3d0;
          color: #166534;
        }

        .quiz-feedback-wrong {
          background: #fff7ed;
          border: 1px solid #fed7aa;
          color: #9a3412;
        }

        .feedback-icon {
          width: 28px;
          height: 28px;
          min-width: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          font-weight: 700;
        }

        .quiz-feedback-correct .feedback-icon {
          background: #22c55e;
          color: white;
        }

        .quiz-feedback-wrong .feedback-icon {
          background: #f97316;
          color: white;
        }

        .quiz-try-again {
          margin-top: 12px;
          padding: 9px 16px;
          background: white;
          border: 1px solid #fdba74;
          color: #9a3412;
        }

        .quiz-try-again:hover {
          transform: translateY(-1px);
        }

        .quiz-success {
          box-shadow: 0 10px 30px rgba(34, 197, 94, 0.15);
          animation: success-pulse 0.45s ease;
        }

        .quiz-shake {
          animation: shake 0.4s ease;
        }

        @keyframes feedback-in {
          from {
            opacity: 0;
            transform: translateY(12px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
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

        @keyframes success-pulse {
          0% {
            transform: scale(1);
          }

          50% {
            transform: scale(1.015);
          }

          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}