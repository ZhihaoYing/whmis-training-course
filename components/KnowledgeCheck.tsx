
"use client";

import { useState } from "react";

type Question = {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

const questions: Question[] = [
  {
    question: "What is the main purpose of WHMIS?",
    options: [
      "To track employee attendance",
      "To communicate information about hazardous workplace products",
      "To replace workplace safety procedures",
      "To classify employee job roles",
    ],
    correctIndex: 1,
    explanation:
      "WHMIS communicates hazard information so workers can understand hazards and work safely with hazardous products.",
  },
  {
    question:
      "Which three elements are central to WHMIS hazard communication?",
    options: [
      "Labels, SDSs, and worker education/training",
      "Payroll, scheduling, and supervision",
      "PPE, first aid, and transportation only",
      "Labels, inventory, and employee records",
    ],
    correctIndex: 0,
    explanation:
      "WHMIS uses labels, Safety Data Sheets, and worker education and training to communicate hazard information.",
  },
  {
    question:
      "What should a worker do before using an unfamiliar hazardous product?",
    options: [
      "Use it immediately if the container looks safe",
      "Read the label and review the SDS and workplace procedures",
      "Ask another worker to test it",
      "Remove the product label",
    ],
    correctIndex: 1,
    explanation:
      "Workers should review the product label, SDS information, and applicable workplace procedures before use.",
  },
  {
    question:
      "Who is responsible for providing compliant supplier labels and SDSs?",
    options: [
      "Workers",
      "Customers",
      "Suppliers",
      "Visitors",
    ],
    correctIndex: 2,
    explanation:
      "Suppliers classify hazardous products and provide compliant labels and Safety Data Sheets.",
  },
  {
    question:
      "What should a worker do if a label is damaged or missing?",
    options: [
      "Ignore it",
      "Use the product normally",
      "Report the problem and follow workplace procedures",
      "Guess the product hazards",
    ],
    correctIndex: 2,
    explanation:
      "Damaged or missing labels should be reported so the product can be properly identified before use.",
  },
];

export default function KnowledgeCheck() {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  // Save one answer per question.
  const [answers, setAnswers] = useState<(number | null)[]>(
    () => questions.map(() => null)
  );

  const [finished, setFinished] = useState(false);

  const question = questions[currentQuestion];
  const selectedAnswer = answers[currentQuestion];

  const answered = selectedAnswer !== null;
  const isCorrect =
    answered && selectedAnswer === question.correctIndex;

  // Prevent double-counting when navigating between questions.
  const score = questions.reduce((total, item, index) => {
    return total + (answers[index] === item.correctIndex ? 1 : 0);
  }, 0);

  // Immediately show feedback when an option is selected.
  function selectAnswer(index: number) {
    if (answered) {
      return;
    }

    setAnswers((previous) =>
      previous.map((answer, questionIndex) =>
        questionIndex === currentQuestion ? index : answer
      )
    );
  }

  // Clear only the current question's answer.
  function tryAgain() {
    if (!answered || isCorrect) {
      return;
    }

    setAnswers((previous) =>
      previous.map((answer, questionIndex) =>
        questionIndex === currentQuestion ? null : answer
      )
    );
  }

  function previousQuestion() {
    if (currentQuestion > 0) {
      setCurrentQuestion((current) => current - 1);
    }
  }

 
function nextQuestion() {
  if (!answered) {
    return;
  }

  if (currentQuestion === questions.length - 1) {
    // All five questions have been answered.
    setFinished(true);

    // Notify the existing module completion controller.
    window.dispatchEvent(
      new CustomEvent("whmis-activity-complete", {
        detail: {
          slug: "knowledge-check",
        },
      })
    );

    return;
  }

  setCurrentQuestion((current) => current + 1);
}


  function reviewAnswers() {
    setFinished(false);
    setCurrentQuestion(0);
  }

  function retryQuiz() {
    setCurrentQuestion(0);
    setAnswers(questions.map(() => null));
    setFinished(false);
  }

  if (finished) {
    const percentage = Math.round(
      (score / questions.length) * 100
    );

    return (
      <div className="knowledge-result">
        <div className="eyebrow">
          Knowledge Check Result
        </div>

        <h2>
          {score} / {questions.length}
        </h2>

        <p>
          You scored {percentage}%. Review any topics
          you were unsure about before continuing to
          the final assessment.
        </p>

        <div className="knowledge-score-bar">
          <div
            className="knowledge-score-fill"
            style={{ width: `${percentage}%` }}
          />
        </div>

        <div
          className="knowledge-actions"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "16px",
            width: "100%",
            flexWrap: "wrap",
          }}
        >
          <button
            type="button"
            className="knowledge-primary-button"
            onClick={reviewAnswers}
            style={{ marginRight: "auto" }}
          >
            ← Review Answers
          </button>

          <button
            type="button"
            className="knowledge-primary-button"
            onClick={retryQuiz}
            style={{ marginLeft: "auto" }}
          >
            Retry Knowledge Check
          </button>
        </div>
      </div>
    );
  }

  const progress =
    ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="knowledge-check">
      <div className="knowledge-header">
        <div>
          <div className="eyebrow">
            General WHMIS Review
          </div>

          <h2>Knowledge Check</h2>

          <p>
            Review the key concepts from General
            WHMIS Training.
          </p>
        </div>

        <div className="knowledge-progress-text">
          Question {currentQuestion + 1} of{" "}
          {questions.length}
        </div>
      </div>

      <div className="knowledge-progress">
        <div
          className="knowledge-progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="knowledge-question-card">
        <h3>{question.question}</h3>

        <div className="knowledge-options">
          {question.options.map((option, index) => {
            let stateClass = "";

            if (answered) {
              if (index === question.correctIndex) {
                stateClass = "correct";
              } else if (index === selectedAnswer) {
                stateClass = "incorrect";
              }
            }

            return (
              <button
                key={index}
                type="button"
                disabled={answered}
                aria-pressed={selectedAnswer === index}
                className={`knowledge-option ${stateClass}`}
                onClick={() => selectAnswer(index)}
              >
                <span className="knowledge-option-letter">
                  {String.fromCharCode(65 + index)}
                </span>

                <span>{option}</span>
              </button>
            );
          })}
        </div>

        {/* Immediate feedback and Try Again */}
        {answered && (
          <div
            className={`knowledge-feedback ${
              isCorrect ? "correct" : "incorrect"
            }`}
            role="status"
            aria-live="polite"
          >
            <strong>
              {isCorrect ? "Correct!" : "Not quite"}
            </strong>

            <p>{question.explanation}</p>

            {!isCorrect && (
              <button
                type="button"
                onClick={tryAgain}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "14px",
                  padding: "10px 18px",
                  borderRadius: "10px",
                  border: "1px solid #dc2626",
                  backgroundColor: "#ffffff",
                  color: "#b91c1c",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                ↻ Try Again
              </button>
            )}
          </div>
        )}

        {/* Previous on left, Next on right */}
        <div
          className="knowledge-actions"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "16px",
            width: "100%",
            flexWrap: "wrap",
          }}
        >
          {currentQuestion > 0 && (
            <button
              type="button"
              className="knowledge-primary-button"
              onClick={previousQuestion}
              style={{ marginRight: "auto" }}
            >
              ← Previous Question
            </button>
          )}

          <button
            type="button"
            className="knowledge-primary-button"
            onClick={nextQuestion}
            disabled={!answered}
            style={{ marginLeft: "auto" }}
          >
            {currentQuestion === questions.length - 1
              ? "View Result →"
              : "Next Question →"}
          </button>
        </div>
      </div>
    </div>
  );
}
