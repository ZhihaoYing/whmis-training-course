"use client";

import { useState } from "react";

type WorkerRight = {
  id: string;
  number: string;
  title: string;
  short: string;
  detail: string;
  examples: string[];
};

const workerRights: WorkerRight[] = [
  {
    id: "know",
    number: "01",
    title: "Right to Know",
    short: "Understand workplace hazards.",
    detail:
      "Workers have the right to receive information and training about hazardous products and other workplace hazards that may affect their health and safety.",
    examples: [
      "Receive WHMIS education and training",
      "Access labels and Safety Data Sheets",
      "Understand hazards before beginning work",
    ],
  },
  {
    id: "participate",
    number: "02",
    title: "Right to Participate",
    short: "Take part in workplace safety.",
    detail:
      "Workers have the right to participate in activities that help improve workplace health and safety.",
    examples: [
      "Report hazards and unsafe conditions",
      "Ask questions about workplace safety",
      "Participate in health and safety activities",
    ],
  },
  {
    id: "refuse",
    number: "03",
    title: "Right to Refuse Unsafe Work",
    short: "Stop when work appears unsafe.",
    detail:
      "Workers may have the right to refuse work when they believe the work could endanger themselves or another person. Workplace procedures and applicable health and safety requirements must be followed.",
    examples: [
      "Stop and report the concern",
      "Notify the appropriate supervisor",
      "Follow the workplace refusal procedure",
    ],
  },
];

export default function WorkerRightsOverview() {
  const [activeId, setActiveId] = useState("know");

  const active =
    workerRights.find((item) => item.id === activeId) ??
    workerRights[0];

  return (
    <div className="worker-rights-overview">

      <div className="worker-rights-grid">

        {workerRights.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`worker-right-card ${
              activeId === item.id ? "active" : ""
            }`}
            onClick={() => setActiveId(item.id)}
          >
            <div className="worker-right-number">
              {item.number}
            </div>

            <h3>{item.title}</h3>

            <p>{item.short}</p>

            <span className="worker-right-hint">
              Click to learn more
            </span>
          </button>
        ))}

      </div>


      <div className="worker-right-detail">

        <div className="eyebrow">
          Worker Right
        </div>

        <h3>{active.title}</h3>

        <p className="worker-right-description">
          {active.detail}
        </p>

        <div className="worker-right-examples">

          {active.examples.map((example) => (
            <div
              key={example}
              className="worker-right-example"
            >
              <span className="worker-right-check">
                ✓
              </span>

              <span>{example}</span>
            </div>
          ))}

        </div>

        <div className="worker-right-reminder">
          If you are unsure about a workplace hazard, ask questions and
          follow your workplace health and safety procedures.
        </div>

      </div>

    </div>
  );
}