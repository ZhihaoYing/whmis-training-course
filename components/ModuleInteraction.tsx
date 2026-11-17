"use client";

import { useState } from "react";
import AnimatedQuizClient from "./AnimatedQuizClient";
import { markModuleComplete } from "../lib/courseProgress";

type Props = {
  slug: string;
};

type DragItem = {
  id: string;
  text: string;
  correct: string;
};

type DragCategory = {
  id: string;
  title: string;
};

/* =========================================================
   NORMAL + MULTIPLE QUIZZES
========================================================= */

const quizData: Record<
  string,
  {
    question: string;
    mode?: "single" | "multiple";
    options: {
      id: string;
      text: string;
      correct: boolean;
    }[];
    explanation: string;
  }
> = {
  /* ================= MODULE 1 ================= */

  "module-1": {
    question: "What are the three main parts of WHMIS?",
    options: [
      {
        id: "a",
        text: "Labels, Safety Data Sheets, and Worker Education & Training",
        correct: true,
      },
      {
        id: "b",
        text: "PPE, Fire Extinguishers, and Emergency Exits",
        correct: false,
      },
      {
        id: "c",
        text: "Labels, Invoices, and Inspection Reports",
        correct: false,
      },
      {
        id: "d",
        text: "Chemicals, Machines, and Workplace Rules",
        correct: false,
      },
    ],
    explanation:
      "WHMIS communicates hazardous product information through labels, Safety Data Sheets, and worker education and training.",
  },

  /* ================= MODULE 5 ================= */

  "module-5": {
    question:
      "Which information should appear on a WHMIS supplier label?",
    mode: "multiple",
    options: [
      {
        id: "a",
        text: "Product name",
        correct: true,
      },
      {
        id: "b",
        text: "Hazard pictograms",
        correct: true,
      },
      {
        id: "c",
        text: "Hazard and precautionary statements",
        correct: true,
      },
      {
        id: "d",
        text: "Employee work schedule",
        correct: false,
      },
    ],
    explanation:
      "Supplier labels include the product name, pictograms, signal word, hazard statements, precautionary statements, and supplier information.",
  },

  /* ================= MODULE 7 ================= */

  "module-7": {
    question:
      "Which practices help workers use PPE safely?",
    mode: "multiple",
    options: [
      {
        id: "a",
        text: "Inspect PPE before use",
        correct: true,
      },
      {
        id: "b",
        text: "Replace damaged PPE",
        correct: true,
      },
      {
        id: "c",
        text: "Use PPE appropriate for the hazard",
        correct: true,
      },
      {
        id: "d",
        text: "Use damaged PPE if the task is short",
        correct: false,
      },
    ],
    explanation:
      "Workers should inspect PPE before use, replace damaged PPE, and use the correct PPE for the hazard.",
  },

  /* ================= MODULE 11 ================= */

  "module-11": {
    question:
      "Which situation should be reported immediately?",
    options: [
      {
        id: "a",
        text: "A chemical exposure, fire, explosion, spill, or missing label",
        correct: true,
      },
      {
        id: "b",
        text: "Only a fire",
        correct: false,
      },
      {
        id: "c",
        text: "Only an injury requiring hospitalization",
        correct: false,
      },
      {
        id: "d",
        text: "Nothing unless the supervisor notices first",
        correct: false,
      },
    ],
    explanation:
      "Chemical exposure, fires, explosions, spills, and missing labels should be reported immediately.",
  },

  /* ================= MODULE 12 ================= */

  "module-12": {
    question:
      "Which rights are identified for workers in the WHMIS training?",
    mode: "multiple",
    options: [
      {
        id: "a",
        text: "The right to know about workplace hazards",
        correct: true,
      },
      {
        id: "b",
        text: "The right to participate in health and safety programs",
        correct: true,
      },
      {
        id: "c",
        text: "The right to refuse unsafe work according to applicable legislation",
        correct: true,
      },
      {
        id: "d",
        text: "The right to ignore workplace safety procedures",
        correct: false,
      },
    ],
    explanation:
      "Workers have the right to know about hazards, participate in health and safety programs, and refuse unsafe work according to applicable occupational health and safety legislation.",
  },

  /* ================= KNOWLEDGE CHECK ================= */

  "knowledge-check": {
    question:
      "Who is responsible for supporting workplace safety under WHMIS?",
    options: [
      {
        id: "a",
        text: "Only the employer",
        correct: false,
      },
      {
        id: "b",
        text: "Only the worker",
        correct: false,
      },
      {
        id: "c",
        text: "Only the supplier",
        correct: false,
      },
      {
        id: "d",
        text: "Suppliers, employers, and workers",
        correct: true,
      },
    ],
    explanation:
      "Suppliers, employers, and workers each have responsibilities that support workplace safety.",
  },
};

/* =========================================================
   DRAG / MATCHING QUIZZES
========================================================= */

const dragData: Record<
  string,
  {
    question: string;
    instruction: string;
    items: DragItem[];
    categories: DragCategory[];
    explanation: string;
  }
> = {
  /* ================= MODULE 2 ================= */

  "module-2": {
    question:
      "Match each WHMIS responsibility with the correct role.",
    instruction:
      "Drag each responsibility into the correct category.",
    items: [
      {
        id: "supplier-label",
        text: "Provide compliant labels and SDSs",
        correct: "supplier",
      },
      {
        id: "employer-training",
        text: "Train workers and maintain SDSs",
        correct: "employer",
      },
      {
        id: "worker-ppe",
        text: "Wear required PPE",
        correct: "worker",
      },
      {
        id: "worker-report",
        text: "Report damaged labels or spills",
        correct: "worker",
      },
    ],
    categories: [
      {
        id: "supplier",
        title: "Supplier",
      },
      {
        id: "employer",
        title: "Employer",
      },
      {
        id: "worker",
        title: "Worker",
      },
    ],
    explanation:
      "Suppliers provide hazard information, employers provide workplace training and controls, and workers follow safe-work requirements and report hazards.",
  },

  /* ================= MODULE 3 ================= */

  "module-3": {
    question:
      "Classify each example as a physical hazard or health hazard.",
    instruction:
      "Drag each hazard into the correct group.",
    items: [
      {
        id: "flammable",
        text: "Flammable Liquid",
        correct: "physical",
      },
      {
        id: "gas",
        text: "Gas Under Pressure",
        correct: "physical",
      },
      {
        id: "toxicity",
        text: "Acute Toxicity",
        correct: "health",
      },
      {
        id: "carcinogenicity",
        text: "Carcinogenicity",
        correct: "health",
      },
    ],
    categories: [
      {
        id: "physical",
        title: "Physical Hazard",
      },
      {
        id: "health",
        title: "Health Hazard",
      },
    ],
    explanation:
      "WHMIS hazards are grouped into physical hazards and health hazards.",
  },

  /* ================= MODULE 4 ================= */

  "module-4": {
    question:
      "Match each hazard description with the correct WHMIS pictogram.",
    instruction:
      "Drag each hazard into the matching pictogram category.",
    items: [
      {
        id: "flammable",
        text: "Flammable liquids or gases",
        correct: "flame",
      },
      {
        id: "acute",
        text: "Serious acute toxicity",
        correct: "skull",
      },
      {
        id: "corrosive",
        text: "Skin burns or corrosive to metals",
        correct: "corrosion",
      },
      {
        id: "pressure",
        text: "Compressed gas",
        correct: "gas-cylinder",
      },
    ],
    categories: [
      {
        id: "flame",
        title: "Flame",
      },
      {
        id: "skull",
        title: "Skull and Crossbones",
      },
      {
        id: "corrosion",
        title: "Corrosion",
      },
      {
        id: "gas-cylinder",
        title: "Gas Cylinder",
      },
    ],
    explanation:
      "WHMIS pictograms provide quick visual information about the type of hazard associated with a product.",
  },

  /* ================= MODULE 6 ================= */

  "module-6": {
    question:
      "Match each workplace question with the correct SDS section.",
    instruction:
      "Drag each type of information to the correct SDS section.",
    items: [
      {
        id: "hazard",
        text: "What are the product hazards?",
        correct: "section-2",
      },
      {
        id: "first-aid",
        text: "What first aid is required?",
        correct: "section-4",
      },
      {
        id: "spill",
        text: "How should an accidental release be handled?",
        correct: "section-6",
      },
      {
        id: "ppe",
        text: "What exposure controls or PPE are required?",
        correct: "section-8",
      },
    ],
    categories: [
      {
        id: "section-2",
        title: "Section 2 — Hazard Identification",
      },
      {
        id: "section-4",
        title: "Section 4 — First Aid",
      },
      {
        id: "section-6",
        title: "Section 6 — Accidental Release",
      },
      {
        id: "section-8",
        title: "Section 8 — Exposure Controls / PPE",
      },
    ],
    explanation:
      "SDSs follow a standardized 16-section structure so workers can find important safety information quickly.",
  },

  /* ================= MODULE 8 ================= */

  "module-8": {
    question:
      "Decide whether each handling practice is safe or unsafe.",
    instruction:
      "Drag each action into the correct category.",
    items: [
      {
        id: "read",
        text: "Read the label and SDS before use",
        correct: "safe",
      },
      {
        id: "inspect",
        text: "Inspect the container and PPE",
        correct: "safe",
      },
      {
        id: "mix",
        text: "Mix chemicals without instructions",
        correct: "unsafe",
      },
      {
        id: "damaged",
        text: "Use a damaged container",
        correct: "unsafe",
      },
    ],
    categories: [
      {
        id: "safe",
        title: "Safe Practice",
      },
      {
        id: "unsafe",
        title: "Unsafe Practice",
      },
    ],
    explanation:
      "Workers should read safety information and inspect equipment before use, and should never mix chemicals without instruction or use damaged containers.",
  },

  /* ================= MODULE 9 ================= */

  "module-9": {
    question:
      "Decide whether each storage practice is safe or unsafe.",
    instruction:
      "Drag each storage practice into the correct category.",
    items: [
      {
        id: "original",
        text: "Store products in original containers when possible",
        correct: "safe",
      },
      {
        id: "visible",
        text: "Keep labels visible",
        correct: "safe",
      },
      {
        id: "oxidizer",
        text: "Store oxidizers with flammables",
        correct: "unsafe",
      },
      {
        id: "bleach",
        text: "Store bleach with ammonia",
        correct: "unsafe",
      },
    ],
    categories: [
      {
        id: "safe",
        title: "Safe Storage",
      },
      {
        id: "unsafe",
        title: "Unsafe Storage",
      },
    ],
    explanation:
      "Hazardous products should be stored according to SDS recommendations and separated from incompatible materials.",
  },

  /* ================= MODULE 10 ================= */

  "module-10": {
    question:
      "Classify each spill-response action.",
    instruction:
      "Drag each action into the correct category.",
    items: [
      {
        id: "warn",
        text: "Warn others and isolate the area",
        correct: "correct",
      },
      {
        id: "supervisor",
        text: "Notify your supervisor",
        correct: "correct",
      },
      {
        id: "trained",
        text: "Clean up only if trained and authorized",
        correct: "correct",
      },
      {
        id: "rush",
        text: "Immediately clean the spill without checking procedures",
        correct: "incorrect",
      },
    ],
    categories: [
      {
        id: "correct",
        title: "Correct Spill Response",
      },
      {
        id: "incorrect",
        title: "Incorrect Spill Response",
      },
    ],
    explanation:
      "Workers should stop work, warn others, isolate the area, notify a supervisor, follow procedures, use appropriate PPE, and clean up only when trained.",
  },
};

/* =========================================================
   DRAG COMPONENT
========================================================= */

function DragInteraction({ slug }: { slug: string }) {
  const data = dragData[slug];

  const [placements, setPlacements] =
    useState<Record<string, string>>({});

  const [dragging, setDragging] =
    useState<string | null>(null);

  const [submitted, setSubmitted] =
    useState(false);

  const [correct, setCorrect] =
    useState(false);

  const [shake, setShake] =
    useState(false);

  if (!data) return null;

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
    if (
      Object.keys(placements).length !==
      data.items.length
    ) {
      return;
    }

    const result = data.items.every(
      (item) =>
        placements[item.id] === item.correct
    );

    setSubmitted(true);
    setCorrect(result);

    if (result) {
      markModuleComplete(slug);
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

  const availableItems =
    data.items.filter(
      (item) => !placements[item.id]
    );

  return (
    <div
      className={`drag-card ${
        shake ? "shake" : ""
      } ${
        submitted && correct
          ? "success"
          : ""
      }`}
    >
      <div className="label">
        INTERACTIVE KNOWLEDGE CHECK
      </div>

      <h2>{data.question}</h2>

      <p className="instruction">
        {data.instruction}
      </p>

      <div className="item-bank">
        {availableItems.map((item) => (
          <div
            key={item.id}
            draggable
            onDragStart={() =>
              startDrag(item.id)
            }
            className="drag-item"
          >
            {item.text}
          </div>
        ))}

        {availableItems.length === 0 && (
          <span className="empty">
            All items have been placed.
          </span>
        )}
      </div>

      <div className="categories">
        {data.categories.map(
          (category) => {
            const placed =
              data.items.filter(
                (item) =>
                  placements[item.id] ===
                  category.id
              );

            return (
              <div
                key={category.id}
                className="drop-zone"
                onDragOver={(e) =>
                  e.preventDefault()
                }
                onDrop={() =>
                  dropItem(category.id)
                }
              >
                <h3>
                  {category.title}
                </h3>

                <div className="drop-area">
                  {placed.length === 0 && (
                    <span className="placeholder">
                      Drop item here
                    </span>
                  )}

                  {placed.map((item) => (
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
          }
        )}
      </div>

      {!submitted && (
        <button
          className="check-button"
          onClick={checkAnswers}
          disabled={
            Object.keys(placements)
              .length !==
            data.items.length
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
            <p>{data.explanation}</p>
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
              Some items are in the wrong
              category. Try again.
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
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 16px;
          box-shadow: 0 8px 24px
            rgba(0, 0, 0, 0.06);
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
          transition: 0.18s ease;
        }

        .drag-item:hover,
        .placed-item:hover {
          transform: translateY(-3px);
          border-color: #3157c8;
          box-shadow: 0 6px 16px
            rgba(49, 87, 200, 0.14);
        }

        .categories {
          display: grid;
          grid-template-columns:
            repeat(
              auto-fit,
              minmax(190px, 1fr)
            );
          gap: 16px;
          margin-bottom: 24px;
        }

        .drop-zone {
          min-height: 170px;
          padding: 18px;
          background: #fbfdff;
          border: 2px dashed #cbd5e1;
          border-radius: 14px;
          transition: 0.18s ease;
        }

        .drop-zone:hover {
          background: #eef4ff;
          border-color: #3157c8;
          transform: translateY(-2px);
        }

        .drop-zone h3 {
          margin: 0 0 14px;
          color: #2445a5;
          font-size: 16px;
        }

        .drop-area {
          display: grid;
          gap: 10px;
        }

        .placeholder,
        .empty {
          color: #94a3b8;
          font-size: 14px;
        }

        .check-button {
          padding: 12px 26px;
          border: none;
          border-radius: 9px;
          background: #3157c8;
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
          animation: success 0.45s ease;
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

        @keyframes success {
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

/* =========================================================
   MAIN
========================================================= */

export default function ModuleInteraction({
  slug,
}: Props) {
  if (dragData[slug]) {
    return (
      <DragInteraction slug={slug} />
    );
  }

  const quiz = quizData[slug];

  if (!quiz) {
    return null;
  }

  return (
    <AnimatedQuizClient
      question={quiz.question}
      mode={quiz.mode || "single"}
      options={quiz.options}
      explanation={quiz.explanation}
      onComplete={() => {
        markModuleComplete(slug);
      }}
    />
  );
}