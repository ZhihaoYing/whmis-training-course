"use client";

import { useState } from "react";

export type SDSQuestion = {
  question: string;
  options: string[];
  correctIndex: number;
};

type Props = {
  chemicalName: string;
  questions: SDSQuestion[];
  onPassed: () => void;
};

export default function SDSKnowledgeCheck({
  chemicalName,
  questions,
  onPassed,
}: Props) {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [answers, setAnswers] = useState<(number | null)[]>(
    () => questions.map(() => null)
  );

  const [result, setResult] = useState<{
    score: number;
    percentage: number;
    passed: boolean;
  } | null>(null);

  const question = questions[currentQuestion];

  const selectedAnswer =
    answers[currentQuestion] ?? null;

  /* ======================================================
     SELECT ANSWER
  ====================================================== */

  function selectAnswer(index: number) {
    setAnswers((current) => {
      const updated = [...current];

      updated[currentQuestion] = index;

      return updated;
    });
  }

  /* ======================================================
     PREVIOUS QUESTION
  ====================================================== */

  function goToPreviousQuestion() {
    if (currentQuestion === 0) return;

    setCurrentQuestion(
      (current) => current - 1
    );
  }

  /* ======================================================
     NEXT QUESTION
  ====================================================== */

  function goToNextQuestion() {
    if (selectedAnswer === null) return;

    if (
      currentQuestion <
      questions.length - 1
    ) {
      setCurrentQuestion(
        (current) => current + 1
      );
    }
  }

  /* ======================================================
     FINISH TRAINING
  ====================================================== */

  function finishTraining() {
    const allAnswered =
      answers.every(
        (answer) => answer !== null
      );

    if (!allAnswered) {
      return;
    }

    const score = answers.reduce(
      (total, answer, index) => {
        const correct =
          answer ===
          questions[index].correctIndex;

        return total + (correct ? 1 : 0);
      },
      0
    );

    const percentage = Math.round(
      (score / questions.length) * 100
    );

    const passed =
      percentage >= 80;

    setResult({
      score,
      percentage,
      passed,
    });

    if (passed) {
      onPassed();
    }
  }

  /* ======================================================
     RETRY
  ====================================================== */

  function retryQuiz() {
    setCurrentQuestion(0);

    setAnswers(
      questions.map(() => null)
    );

    setResult(null);
  }

  /* ======================================================
     RESULT SCREEN
  ====================================================== */

  if (result) {
    return (
      <div className="sds-quiz-result">

        <div
          className={`sds-result-circle ${
            result.passed
              ? "passed"
              : "failed"
          }`}
        >
          {result.passed ? "✓" : "!"}
        </div>

        <div className="eyebrow">
          {chemicalName} Training Result
        </div>

        <h2>
          {result.passed
            ? "Training Passed"
            : "Training Not Passed"}
        </h2>

        <div className="sds-result-score">
          {result.score} / {questions.length}
        </div>

        <div className="sds-result-percent">
          {result.percentage}%
        </div>

        <p>
          A minimum score of 80% is required
          for each SDS.
        </p>

        {result.passed ? (
          <div className="sds-passed-message">
            ✓ {chemicalName} training completed.
          </div>
        ) : (
          <button
            type="button"
            className="sds-primary-button"
            onClick={retryQuiz}
          >
            Retry {chemicalName} Training
          </button>
        )}

      </div>
    );
  }

  /* ======================================================
     QUIZ SCREEN
  ====================================================== */

  return (
    <div className="sds-knowledge-check">

      {/* HEADER */}

      <div className="sds-quiz-header">

        <div>

          <div className="eyebrow">
            Product-Specific Knowledge Check
          </div>

          <h2>
            {chemicalName}
          </h2>

        </div>

        <strong>
          Question {currentQuestion + 1} /{" "}
          {questions.length}
        </strong>

      </div>

      {/* PROGRESS BAR */}

      <div className="sds-question-progress">

        <span
          style={{
            width: `${
              ((currentQuestion + 1) /
                questions.length) *
              100
            }%`,
          }}
        />

      </div>

      {/* QUESTION */}

      <div className="sds-question-box">

        <div className="sds-question-number">
          {String(
            currentQuestion + 1
          ).padStart(2, "0")}
        </div>

        <div className="sds-question-content">

          <h3>
            {question.question}
          </h3>

          {/* ANSWERS */}

          <div className="sds-answer-options">

            {question.options.map(
              (option, index) => {

                const selected =
                  selectedAnswer === index;

                return (
                  <button
                    key={`${currentQuestion}-${index}`}
                    type="button"
                    className={`sds-answer ${
                      selected
                        ? "selected"
                        : ""
                    }`}
                    onClick={() =>
                      selectAnswer(index)
                    }
                  >

                    <span className="sds-answer-letter">
                      {String.fromCharCode(
                        65 + index
                      )}
                    </span>

                    <span>
                      {option}
                    </span>

                  </button>
                );
              }
            )}

          </div>

        </div>

      </div>

      {/* NAVIGATION */}

      <div
        style={{
          marginTop: "26px",
          paddingTop: "20px",
          borderTop: "1px solid #e5e7eb",

          display: "grid",
          gridTemplateColumns:
            "1fr auto 1fr",

          alignItems: "center",
          gap: "16px",
        }}
      >

        {/* PREVIOUS */}

        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <button
            type="button"
            disabled={currentQuestion === 0}
            onClick={goToPreviousQuestion}
            style={{
              minHeight: "44px",
              padding: "11px 18px",

              border:
                "1px solid #d1d5db",

              borderRadius: "9px",

              background:
                currentQuestion === 0
                  ? "#f1f5f9"
                  : "#ffffff",

              color:
                currentQuestion === 0
                  ? "#94a3b8"
                  : "#3157c8",

              fontWeight: 800,

              cursor:
                currentQuestion === 0
                  ? "not-allowed"
                  : "pointer",

              opacity:
                currentQuestion === 0
                  ? 0.6
                  : 1,
            }}
          >
            ← Previous Question
          </button>
        </div>

        {/* PASSING SCORE */}

        <span
          style={{
            color: "#64748b",
            fontSize: "12px",
            textAlign: "center",
            whiteSpace: "nowrap",
          }}
        >
          Passing score: 80%
        </span>

        {/* NEXT / FINISH */}

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >

          {currentQuestion ===
          questions.length - 1 ? (

            <button
              type="button"
              disabled={selectedAnswer === null}
              onClick={finishTraining}
              style={{
                minHeight: "44px",
                padding: "11px 18px",

                border: "none",
                borderRadius: "9px",

                background:
                  selectedAnswer === null
                    ? "#cbd5e1"
                    : "#3157c8",

                color:
                  selectedAnswer === null
                    ? "#64748b"
                    : "#ffffff",

                fontWeight: 800,

                cursor:
                  selectedAnswer === null
                    ? "not-allowed"
                    : "pointer",
              }}
            >
              Finish Training →
            </button>

          ) : (

            <button
              type="button"
              disabled={selectedAnswer === null}
              onClick={goToNextQuestion}
              style={{
                minHeight: "44px",
                padding: "11px 18px",

                border: "none",
                borderRadius: "9px",

                background:
                  selectedAnswer === null
                    ? "#cbd5e1"
                    : "#3157c8",

                color:
                  selectedAnswer === null
                    ? "#64748b"
                    : "#ffffff",

                fontWeight: 800,

                cursor:
                  selectedAnswer === null
                    ? "not-allowed"
                    : "pointer",
              }}
            >
              Next Question →
            </button>

          )}

        </div>

      </div>

    </div>
  );
}