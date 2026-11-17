"use client";

import { useEffect, useState } from "react";
import AnimatedQuizClient from "../../components/AnimatedQuizClient";

import {
  markModuleComplete,
  isModuleComplete,
} from "../../lib/courseProgress";

type Placement = {
  [key: string]: string;
};

type DragQuizProps = {
  onComplete: () => void;
};

function DragQuizTest({ onComplete }: DragQuizProps) {
  const items = [
    {
      id: "gasoline",
      text: "Gasoline",
      correct: "physical",
    },
    {
      id: "propane",
      text: "Propane",
      correct: "physical",
    },
    {
      id: "bleach",
      text: "Bleach",
      correct: "health",
    },
    {
      id: "gloves",
      text: "Protective Gloves",
      correct: "ppe",
    },
  ];

  const categories = [
    {
      id: "physical",
      title: "Physical Hazard",
    },
    {
      id: "health",
      title: "Health Hazard",
    },
    {
      id: "ppe",
      title: "PPE",
    },
  ];

  const [placements, setPlacements] = useState<Placement>({});
  const [dragging, setDragging] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [shake, setShake] = useState(false);

  function startDrag(id: string) {
    setDragging(id);
    setSubmitted(false);
  }

  function dropItem(category: string) {
    if (!dragging) return;

    setPlacements((current) => ({
      ...current,
      [dragging]: category,
    }));

    setDragging(null);
  }

  function checkAnswers() {
    if (Object.keys(placements).length !== items.length) {
      return;
    }

    const result = items.every(
      (item) => placements[item.id] === item.correct
    );

    setSubmitted(true);
    setCorrect(result);

    if (result) {
      onComplete();
    } else {
      setShake(true);

      setTimeout(() => {
        setShake(false);
      }, 400);
    }
  }

  function retry() {
    setPlacements({});
    setSubmitted(false);
    setCorrect(false);
  }

  const availableItems = items.filter(
    (item) => !placements[item.id]
  );

  return (
    <div
      className={`drag-card ${shake ? "shake" : ""} ${
        submitted && correct ? "success" : ""
      }`}
    >
      <div className="label">KNOWLEDGE CHECK</div>

      <h2>
        Drag each item into the correct WHMIS category.
      </h2>

      <p className="instruction">
        Drag each card into the category that best matches it.
      </p>

      <div className="item-bank">
        {availableItems.map((item) => (
          <div
            key={item.id}
            draggable
            onDragStart={() => startDrag(item.id)}
            className="drag-item"
          >
            {item.text}
          </div>
        ))}

        {availableItems.length === 0 && (
          <span className="bank-empty">
            All items have been placed.
          </span>
        )}
      </div>

      <div className="categories">
        {categories.map((category) => {
          const placedItems = items.filter(
            (item) =>
              placements[item.id] === category.id
          );

          return (
            <div
              key={category.id}
              className="drop-zone"
              onDragOver={(event) =>
                event.preventDefault()
              }
              onDrop={() => dropItem(category.id)}
            >
              <h3>{category.title}</h3>

              <div className="drop-area">
                {placedItems.length === 0 && (
                  <span className="placeholder">
                    Drop item here
                  </span>
                )}

                {placedItems.map((item) => (
                  <div
                    key={item.id}
                    draggable
                    onDragStart={() =>
                      startDrag(item.id)
                    }
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
          className="check-button"
          onClick={checkAnswers}
          disabled={
            Object.keys(placements).length !==
            items.length
          }
        >
          Check Answers
        </button>
      )}

      {submitted && correct && (
        <div className="feedback correct">
          <span className="feedback-icon">
            ✓
          </span>

          <div>
            <strong>Correct</strong>

            <p>
              Great job. You correctly classified all
              of the items.
            </p>
          </div>
        </div>
      )}

      {submitted && !correct && (
        <div className="feedback incorrect">
          <span className="feedback-icon">
            ×
          </span>

          <div>
            <strong>Not quite</strong>

            <p>
              Some items are in the wrong category.
              Try again.
            </p>

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
        .drag-card {
          max-width: 860px;
          margin: 40px auto;
          padding: 32px;
          background: white;
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
          margin: 0;
          color: #111827;
          font-size: 23px;
        }

        .instruction {
          color: #6b7280;
          margin: 8px 0 24px;
        }

        .item-bank {
          min-height: 70px;
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          padding: 16px;
          margin-bottom: 24px;
          background: #f8fafc;
          border: 2px dashed #cbd5e1;
          border-radius: 12px;
        }

        .drag-item,
        .placed-item {
          padding: 12px 17px;
          background: white;
          border: 2px solid #dbe3f8;
          border-radius: 10px;
          cursor: grab;
          font-weight: 600;
          color: #111827;
          transition:
            transform 0.18s ease,
            border-color 0.18s ease,
            box-shadow 0.18s ease;
        }

        .drag-item:hover,
        .placed-item:hover {
          transform: translateY(-3px);
          border-color: #3157c8;
          box-shadow: 0 6px 16px
            rgba(49, 87, 200, 0.14);
        }

        .drag-item:active,
        .placed-item:active {
          cursor: grabbing;
          transform: scale(0.96);
        }

        .bank-empty {
          color: #94a3b8;
          margin: auto 0;
        }

        .categories {
          display: grid;
          grid-template-columns:
            repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 24px;
        }

        .drop-zone {
          min-height: 180px;
          padding: 18px;
          background: #fbfdff;
          border: 2px dashed #cbd5e1;
          border-radius: 14px;
          transition:
            background 0.18s ease,
            border-color 0.18s ease,
            transform 0.18s ease;
        }

        .drop-zone:hover {
          background: #eef4ff;
          border-color: #3157c8;
          transform: translateY(-2px);
        }

        .drop-zone h3 {
          margin: 0 0 14px;
          color: #2445a5;
          font-size: 17px;
        }

        .drop-area {
          display: grid;
          gap: 10px;
        }

        .placeholder {
          color: #94a3b8;
          font-size: 14px;
        }

        .check-button {
          padding: 12px 26px;
          background: #3157c8;
          border: none;
          border-radius: 9px;
          color: white;
          font-weight: 700;
          cursor: pointer;
        }

        .check-button:disabled {
          opacity: 0.4;
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
          color: #166534;
          background: #ecfdf3;
          border: 1px solid #a7f3d0;
        }

        .feedback.incorrect {
          color: #9a3412;
          background: #fff7ed;
          border: 1px solid #fed7aa;
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
          background: white;
          border: 1px solid #fdba74;
          border-radius: 8px;
          color: #9a3412;
          font-weight: 700;
          cursor: pointer;
        }

        .shake {
          animation: shake 0.4s ease;
        }

        .success {
          animation: successPulse 0.45s ease;
          box-shadow: 0 10px 30px
            rgba(34, 197, 94, 0.15);
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

        @media (max-width: 760px) {
          .categories {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

export default function QuizTestPage() {
  const [quizComplete, setQuizComplete] =
    useState(false);

  const [dragComplete, setDragComplete] =
    useState(false);

  const [canContinue, setCanContinue] =
    useState(false);

  useEffect(() => {
    const completed =
      isModuleComplete("quiz-test");

    if (completed) {
      setQuizComplete(true);
      setDragComplete(true);
      setCanContinue(true);
    }
  }, []);

  useEffect(() => {
    if (quizComplete && dragComplete) {
      markModuleComplete("quiz-test");
      setCanContinue(true);
    }
  }, [quizComplete, dragComplete]);

  return (
    <main
      style={{
        padding: "40px",
        background: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      <AnimatedQuizClient
        question="What is the main purpose of WHMIS?"
        mode="single"
        options={[
          {
            id: "a",
            text: "To provide information about hazardous workplace products",
            correct: true,
          },
          {
            id: "b",
            text: "To track employee attendance",
            correct: false,
          },
          {
            id: "c",
            text: "To manage payroll",
            correct: false,
          },
          {
            id: "d",
            text: "To schedule workplace shifts",
            correct: false,
          },
        ]}
        explanation="WHMIS provides workers with information about hazardous products so they can work safely."
        onComplete={() => {
          setQuizComplete(true);
        }}
      />

      <DragQuizTest
        onComplete={() => {
          setDragComplete(true);
        }}
      />

      <div
        style={{
          maxWidth: "860px",
          margin: "32px auto 60px",
          padding: "24px",
          background: "#ffffff",
          border: "1px solid #e5e7eb",
          borderRadius: "14px",
        }}
      >
        <div
          style={{
            marginBottom: "18px",
            color: "#6b7280",
            fontSize: "14px",
          }}
        >
          <div>
            {quizComplete ? "✓" : "○"} Quiz completed
          </div>

          <div style={{ marginTop: "6px" }}>
            {dragComplete ? "✓" : "○"} Drag activity completed
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <button
            type="button"
            disabled={!canContinue}
            style={{
              padding: "14px 24px",
              border: "none",
              borderRadius: "9px",
              fontWeight: 700,
              fontSize: "15px",

              background: canContinue
                ? "#3157c8"
                : "#d1d5db",

              color: canContinue
                ? "#ffffff"
                : "#6b7280",

              cursor: canContinue
                ? "pointer"
                : "not-allowed",

              transition: "all 0.25s ease",
            }}
          >
            {canContinue
              ? "Next Module →"
              : "🔒 Complete all activities to continue"}
          </button>
        </div>
      </div>
    </main>
  );
}