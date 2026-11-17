"use client";

import { useEffect, useState } from "react";

type Question = {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
};

const questions: Question[] = [
  {
    question: "What are the three main parts of WHMIS?",
    options: [
      "Labels, SDS, and worker education/training",
      "PPE, fire extinguishers, and first aid",
      "Storage, transportation, and disposal",
      "Inspection, maintenance, and reporting",
    ],
    correct: 0,
    explanation:
      "WHMIS is built around labels, Safety Data Sheets, and worker education and training.",
  },
  {
    question: "Who is responsible for providing WHMIS training to workers?",
    options: [
      "The supplier",
      "The employer",
      "The worker",
      "The equipment manufacturer",
    ],
    correct: 1,
    explanation:
      "Employers are responsible for training workers and ensuring workplace WHMIS requirements are followed.",
  },
  {
    question: "What should you do before using a hazardous product?",
    options: [
      "Use it immediately if the container looks safe",
      "Read the label and review the SDS when needed",
      "Remove the label",
      "Mix it with another product first",
    ],
    correct: 1,
    explanation:
      "Workers should read the label and review the SDS when more detailed information is needed.",
  },
  {
    question: "What should you do if a hazardous product spills?",
    options: [
      "Clean it immediately even if you are not trained",
      "Ignore it if the spill is small",
      "Stop work, warn others, and follow workplace procedures",
      "Wash it into a drain",
    ],
    correct: 2,
    explanation:
      "A spill should be reported and handled according to workplace procedures. Cleanup should only be performed by trained and authorized workers.",
  },
  {
    question: "Which is one of the three main worker rights?",
    options: [
      "Right to remove safety labels",
      "Right to refuse unsafe work",
      "Right to ignore workplace procedures",
      "Right to use any chemical without training",
    ],
    correct: 1,
    explanation:
      "Workers have the right to know, participate, and refuse unsafe work where applicable.",
  },
];

export default function KnowledgeCheck() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [finished, setFinished] = useState(false);

  const question = questions[current];
  const isCorrect = selected === question.correct;

  useEffect(() => {
  if (finished) {
    localStorage.setItem(
      "whmis-knowledge-check-complete",
      "true"
    );

    window.dispatchEvent(
      new Event("whmis-progress-updated")
    );
  }
}, [finished]);

  function selectAnswer(index: number) {
    if (answered) return;

    setSelected(index);
    setAnswered(true);

    if (index === question.correct) {
      setScore((prev) => prev + 1);
    }
  }

  function nextQuestion() {
    if (current === questions.length - 1) {
      setFinished(true);
      return;
    }

    setCurrent((prev) => prev + 1);
    setSelected(null);
    setAnswered(false);
  }

  function restart() {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setAnswered(false);
    setFinished(false);
  }

  if (finished) {
    return (
      <div className="knowledge-check">
        <div className="knowledge-result">
          <div className="eyebrow">Knowledge Check Complete</div>

          <h2>
            {score} / {questions.length}
          </h2>

          <p>
            {score === questions.length
              ? "Excellent — you answered every question correctly."
              : score >= 4
              ? "Great job — you have a strong understanding of the key WHMIS concepts."
              : "Review the modules again before moving on to the Final Assessment."}
          </p>

          <div className="knowledge-score-bar">
            <div
              className="knowledge-score-fill"
              style={{
                width: `${(score / questions.length) * 100}%`,
              }}
            />
          </div>

          <button
            type="button"
            className="knowledge-primary-button"
            onClick={restart}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="knowledge-check">

      <div className="knowledge-header">
        <div>
          <div className="eyebrow">
            Knowledge Check
          </div>

          <h2>
            Check Your Understanding
          </h2>

          <p>
            Answer each question before continuing.
          </p>
        </div>

        <div className="knowledge-progress-text">
          Question {current + 1} of {questions.length}
        </div>
      </div>


      <div className="knowledge-progress">
        <div
          className="knowledge-progress-fill"
          style={{
            width: `${((current + 1) / questions.length) * 100}%`,
          }}
        />
      </div>


      <div className="knowledge-question-card">

        <h3>
          {question.question}
        </h3>

        <div className="knowledge-options">

          {question.options.map((option, index) => {
            let className = "knowledge-option";

            if (answered) {
              if (index === question.correct) {
                className += " correct";
              } else if (
                index === selected &&
                index !== question.correct
              ) {
                className += " incorrect";
              }
            } else if (selected === index) {
              className += " selected";
            }

            return (
              <button
                key={option}
                type="button"
                className={className}
                onClick={() => selectAnswer(index)}
              >
                <span className="knowledge-option-letter">
                  {String.fromCharCode(65 + index)}
                </span>

                <span>
                  {option}
                </span>
              </button>
            );
          })}

        </div>


        {answered && (
          <div
            className={`knowledge-feedback ${
              isCorrect ? "correct" : "incorrect"
            }`}
          >
            <strong>
              {isCorrect ? "Correct" : "Not quite"}
            </strong>

            <p>
              {question.explanation}
            </p>
          </div>
        )}


        {answered && (
          <div className="knowledge-actions">

            <button
              type="button"
              className="knowledge-primary-button"
              onClick={nextQuestion}
            >
              {current === questions.length - 1
                ? "View Results"
                : "Next Question"}
            </button>

          </div>
        )}

      </div>

    </div>
  );
}