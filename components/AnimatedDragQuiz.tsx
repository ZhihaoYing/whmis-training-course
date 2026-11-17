"use client";

import { useState } from "react";

type DragItem = {
  id: string;
  text: string;
  category: string;
};

type Category = {
  id: string;
  title: string;
};

type AnimatedDragQuizProps = {
  question: string;
  items: DragItem[];
  categories: Category[];
  explanation?: string;
  onComplete?: () => void;
};

export default function AnimatedDragQuiz({
  question,
  items,
  categories,
  explanation = "Correct. All items are in the right category.",
  onComplete,
}: AnimatedDragQuizProps) {
  const [placements, setPlacements] = useState<Record<string, string>>({});
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [shake, setShake] = useState(false);

  function handleDragStart(id: string) {
    setDraggingId(id);
    setSubmitted(false);
  }

  function handleDrop(categoryId: string) {
    if (!draggingId) return;

    setPlacements((current) => ({
      ...current,
      [draggingId]: categoryId,
    }));

    setDraggingId(null);
  }

  function handleSubmit() {
    const allPlaced = items.every((item) => placements[item.id]);

    if (!allPlaced) return;

    const correct = items.every(
      (item) => placements[item.id] === item.category
    );

    setSubmitted(true);
    setIsCorrect(correct);

    if (correct) {
      onComplete?.();
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 400);
    }
  }

  function handleRetry() {
    setPlacements({});
    setSubmitted(false);
    setIsCorrect(false);
  }

  const unplacedItems = items.filter((item) => !placements[item.id]);

  return (
    <div
      className={`drag-card ${shake ? "shake" : ""} ${
        submitted && isCorrect ? "success" : ""
      }`}
    >
      <div className="label">KNOWLEDGE CHECK</div>

      <h2>{question}</h2>

      <p className="instruction">
        Drag each item into the correct category.
      </p>

      <div className="item-bank">
        {unplacedItems.map((item) => (
          <div
            key={item.id}
            draggable
            onDragStart={() => handleDragStart(item.id)}
            className="drag-item"
          >
            {item.text}
          </div>
        ))}
      </div>

      <div className="categories">
        {categories.map((category) => {
          const categoryItems = items.filter(
            (item) => placements[item.id] === category.id
          );

          return (
            <div
              key={category.id}
              className="drop-zone"
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(category.id)}
            >
              <h3>{category.title}</h3>

              <div className="drop-content">
                {categoryItems.length === 0 && (
                  <span className="placeholder">Drop item here</span>
                )}

                {categoryItems.map((item) => (
                  <div
                    key={item.id}
                    draggable
                    onDragStart={() => handleDragStart(item.id)}
                    className="placed-item"
                  >
                    {item.text}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {!submitted && (
        <button
          type="button"
          className="submit-button"
          onClick={handleSubmit}
          disabled={Object.keys(placements).length !== items.length}
        >
          Check Answers
        </button>
      )}

      {submitted && isCorrect && (
        <div className="feedback correct">
          <div className="feedback-icon">✓</div>

          <div>
            <strong>Correct</strong>
            <p>{explanation}</p>
          </div>
        </div>
      )}

      {submitted && !isCorrect && (
        <div className="feedback incorrect">
          <div className="feedback-icon">×</div>

          <div>
            <strong>Not quite</strong>
            <p>Some items are in the wrong category. Try again.</p>

            <button
              type="button"
              className="retry-button"
              onClick={handleRetry}
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .drag-card {
          max-width: 900px;
          margin: 40px auto;
          padding: 32px;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 16px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
        }

        .label {
          color: #3157c8;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1.2px;
          margin-bottom: 12px;
        }

        h2 {
          margin: 0 0 8px;
          color: #111827;
          font-size: 23px;
        }

        .instruction {
          color: #6b7280;
          margin-bottom: 24px;
        }

        .item-bank {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          min-height: 64px;
          padding: 16px;
          margin-bottom: 24px;
          border-radius: 12px;
          background: #f8fafc;
          border: 1px dashed #cbd5e1;
        }

        .drag-item,
        .placed-item {
          padding: 12px 16px;
          border-radius: 10px;
          background: white;
          border: 2px solid #dbe3f8;
          color: #111827;
          cursor: grab;
          font-weight: 600;
          transition:
            transform 0.18s ease,
            box-shadow 0.18s ease,
            border-color 0.18s ease;
        }

        .drag-item:hover,
        .placed-item:hover {
          transform: translateY(-2px);
          border-color: #3157c8;
          box-shadow: 0 6px 16px rgba(49, 87, 200, 0.12);
        }

        .drag-item:active,
        .placed-item:active {
          cursor: grabbing;
          transform: scale(0.98);
        }

        .categories {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 16px;
          margin-bottom: 24px;
        }

        .drop-zone {
          min-height: 170px;
          padding: 18px;
          border: 2px dashed #cbd5e1;
          border-radius: 14px;
          background: #fbfdff;
          transition:
            border-color 0.18s ease,
            background 0.18s ease,
            transform 0.18s ease;
        }

        .drop-zone:hover {
          border-color: #3157c8;
          background: #f3f7ff;
          transform: translateY(-2px);
        }

        .drop-zone h3 {
          margin: 0 0 14px;
          color: #2445a5;
          font-size: 17px;
        }

        .drop-content {
          display: grid;
          gap: 10px;
        }

        .placeholder {
          color: #94a3b8;
          font-size: 14px;
        }

        .submit-button {
          padding: 12px 28px;
          border: none;
          border-radius: 9px;
          background: #3157c8;
          color: white;
          font-weight: 700;
          cursor: pointer;
          transition:
            transform 0.18s ease,
            box-shadow 0.18s ease,
            opacity 0.18s ease;
        }

        .submit-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(49, 87, 200, 0.25);
        }

        .submit-button:disabled {
          opacity: 0.45;
          cursor: not-allowed;
        }

        .feedback {
          display: flex;
          gap: 14px;
          margin-top: 22px;
          padding: 18px;
          border-radius: 12px;
          animation: feedbackIn 0.35s ease;
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
          min-width: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          font-weight: 700;
          font-size: 18px;
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
          padding: 9px 16px;
          border: 1px solid #fdba74;
          border-radius: 8px;
          background: white;
          color: #9a3412;
          font-weight: 700;
          cursor: pointer;
        }

        .shake {
          animation: shake 0.4s ease;
        }

        .success {
          animation: successPulse 0.45s ease;
          box-shadow: 0 10px 30px rgba(34, 197, 94, 0.15);
        }

        @keyframes feedbackIn {
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

        @keyframes successPulse {
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