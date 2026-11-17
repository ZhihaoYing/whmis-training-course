"use client";

import { useState } from "react";

type PPEItem = {
  id: string;
  title: string;
  short: string;
  description: string;
  examples: string[];
};

const ppeItems: PPEItem[] = [
  {
    id: "eye",
    title: "Eye & Face",
    short: "Safety glasses and face shields",
    description:
      "Eye and face protection helps reduce exposure to splashes, particles, and other hazards that may injure the eyes or face.",
    examples: [
      "Safety glasses",
      "Chemical splash goggles",
      "Face shields",
    ],
  },
  {
    id: "hands",
    title: "Hands",
    short: "Chemical-resistant gloves",
    description:
      "Gloves help protect the hands from chemical contact. The correct glove material depends on the hazardous product and the task.",
    examples: [
      "Chemical-resistant gloves",
      "Disposable gloves where appropriate",
      "Task-specific hand protection",
    ],
  },
  {
    id: "respiratory",
    title: "Respiratory",
    short: "Respirators when required",
    description:
      "Respiratory protection may be required when workers could inhale hazardous gases, vapours, dusts, mists, or other airborne contaminants.",
    examples: [
      "Approved respirators",
      "Correct cartridge or filter",
      "Fit-tested equipment where required",
    ],
  },
  {
    id: "body",
    title: "Body",
    short: "Chemical-resistant clothing",
    description:
      "Protective clothing helps reduce skin and body exposure when working with hazardous products.",
    examples: [
      "Chemical-resistant aprons",
      "Coveralls",
      "Protective sleeves or suits",
    ],
  },
  {
    id: "feet",
    title: "Feet",
    short: "Protective footwear",
    description:
      "Protective footwear helps reduce risks from spills, dropped objects, and other workplace hazards.",
    examples: [
      "Steel-toe footwear",
      "Chemical-resistant boots",
      "Slip-resistant footwear where required",
    ],
  },
];


/* =========================================================
   PPE ICONS
========================================================= */

function PPEIcon({ type }: { type: string }) {
  if (type === "eye") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    );
  }

  if (type === "hands") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M8 11V5.5a1.5 1.5 0 0 1 3 0V10" />
        <path d="M11 10V4.5a1.5 1.5 0 0 1 3 0V10" />
        <path d="M14 10V6a1.5 1.5 0 0 1 3 0v6" />
        <path d="M8 9.5 6.5 8a1.6 1.6 0 0 0-2.2 2.3l4.6 6.2A5 5 0 0 0 13 19h1a5 5 0 0 0 5-5v-3" />
      </svg>
    );
  }

  if (type === "respiratory") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 9c2-2 4-3 6-3s4 1 6 3v6c-2 2-4 3-6 3s-4-1-6-3V9Z" />
        <path d="M6 11 3 9" />
        <path d="M18 11 21 9" />
        <path d="M9 12h6" />
        <path d="M9 15h6" />
      </svg>
    );
  }

  if (type === "body") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M8 4 4 7l2 4 2-1v10h8V10l2 1 2-4-4-3" />
        <path d="M9 4c.5 1.2 1.5 2 3 2s2.5-.8 3-2" />
        <path d="M12 7v13" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 5v9c0 2 1 3 3 3h3l2 2h6v-4l-7-2V5H5Z" />
      <path d="M5 11h7" />
    </svg>
  );
}


/* =========================================================
   COMPONENT
========================================================= */

export default function PPEOverview() {
  const [activeId, setActiveId] = useState("eye");

  const active =
    ppeItems.find((item) => item.id === activeId) ?? ppeItems[0];

  return (
    <div className="ppe-overview">

      {/* LEFT PPE CARDS */}

      <div className="ppe-card-grid">

        {ppeItems.map((item) => (

          <button
            key={item.id}
            type="button"
            className={`ppe-card ${
              activeId === item.id ? "active" : ""
            }`}
            onClick={() => setActiveId(item.id)}
          >

            <div className="ppe-card-icon">
              <PPEIcon type={item.id} />
            </div>

            <h3>{item.title}</h3>

            <p>{item.short}</p>

            <span className="ppe-card-hint">
              Click to learn more
            </span>

          </button>

        ))}

      </div>


      {/* RIGHT DETAIL PANEL */}

      <div className="ppe-detail-panel">

        <div className="eyebrow">
          PPE Category
        </div>

        <div className="ppe-detail-heading">

          <div className="ppe-detail-icon">
            <PPEIcon type={active.id} />
          </div>

          <h3>{active.title}</h3>

        </div>

        <p className="ppe-detail-description">
          {active.description}
        </p>


        <div className="ppe-detail-list">

          {active.examples.map((example) => (

            <div
              key={example}
              className="ppe-detail-item"
            >

              <span className="ppe-detail-dot" />

              <span>
                {example}
              </span>

            </div>

          ))}

        </div>


        <div className="ppe-reminder">
          Select PPE based on the hazard, task, SDS information,
          and workplace procedures.
        </div>

      </div>

    </div>
  );
}