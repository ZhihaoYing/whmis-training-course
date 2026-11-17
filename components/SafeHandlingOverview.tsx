
"use client";

import { useState } from "react";

type HandlingItem = {
  id: string;
  title: string;
  short: string;
  detail: string;
  group: "before" | "never";
};

const handlingItems: HandlingItem[] = [
  {
    id: "label",
    title: "Read the Label",
    short: "Check product hazards and precautions.",
    detail:
      "Before using a hazardous product, read the supplier or workplace label so you understand the hazards, required precautions, and basic safe-use information.",
    group: "before",
  },
  {
    id: "sds",
    title: "Review the SDS",
    short: "Know the hazards and controls.",
    detail:
      "Review the Safety Data Sheet when you need more detailed information about hazards, PPE, handling, storage, first aid, or emergency procedures.",
    group: "before",
  },
  {
    id: "container",
    title: "Inspect the Container",
    short: "Check for leaks or damage.",
    detail:
      "Do not use containers that are leaking, damaged, or in poor condition. Report problems and follow workplace procedures.",
    group: "before",
  },
  {
    id: "ppe",
    title: "Check Your PPE",
    short: "Use the protection required for the task.",
    detail:
      "Make sure the required PPE is available, in good condition, and suitable for the hazardous product and task before work begins.",
    group: "before",
  },
  {
    id: "ventilation",
    title: "Confirm Ventilation",
    short: "Use required engineering controls.",
    detail:
      "Some hazardous products require local exhaust ventilation or other controls. Follow the SDS and workplace procedures before beginning the task.",
    group: "before",
  },
  {
    id: "mix",
    title: "Do Not Mix Chemicals",
    short: "Unless specifically instructed.",
    detail:
      "Never mix hazardous products unless an approved procedure specifically requires it. Mixing incompatible chemicals can cause toxic gases, fires, or other dangerous reactions.",
    group: "never",
  },
  {
    id: "food",
    title: "Do Not Eat or Drink",
    short: "Keep food away from chemical work.",
    detail:
      "Eating, drinking, or storing food in chemical work areas can increase the risk of accidental ingestion or contamination.",
    group: "never",
  },
  {
    id: "labels",
    title: "Do Not Remove Labels",
    short: "Labels must remain readable.",
    detail:
      "Do not remove, cover, or damage labels. If a label is missing or unreadable, report it and ensure the container is properly labelled before use.",
    group: "never",
  },
  {
    id: "damaged",
    title: "Do Not Use Damaged Containers",
    short: "Stop and report the problem.",
    detail:
      "A damaged or leaking container may expose workers to hazardous products. Isolate it if safe to do so and follow workplace reporting procedures.",
    group: "never",
  },
];

export default function SafeHandlingOverview() {
  const [activeId, setActiveId] = useState("label");

  const active =
    handlingItems.find((item) => item.id === activeId) ??
    handlingItems[0];

  const beforeItems = handlingItems.filter(
    (item) => item.group === "before"
  );

  const neverItems = handlingItems.filter(
    (item) => item.group === "never"
  );

  return (
    <div className="safe-handling-overview handling-side-layout">

      {/* LEFT: Clickable options */}
      <div className="handling-options">

        {/* BEFORE YOU HANDLE */}
        <div className="handling-group">
          <div className="handling-group-header">
            <span className="handling-group-badge">
              Before You Handle
            </span>
            <h3>Prepare Before You Start</h3>
          </div>

          <div className="handling-list">
            {beforeItems.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className={`handling-item ${
                  activeId === item.id ? "active" : ""
                }`}
                onClick={() => setActiveId(item.id)}
                aria-pressed={activeId === item.id}
              >
                <span className="handling-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="handling-item-copy">
                  <strong>{item.title}</strong>
                  <span>{item.short}</span>
                </span>

                <span className="handling-arrow">→</span>
              </button>
            ))}
          </div>
        </div>

        {/* NEVER DO THIS */}
        <div className="handling-group">
          <div className="handling-group-header">
            <span className="handling-group-badge danger">
              Never Do This
            </span>
            <h3>Avoid Unsafe Actions</h3>
          </div>

          <div className="handling-list">
            {neverItems.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className={`handling-item handling-item-danger ${
                  activeId === item.id ? "active" : ""
                }`}
                onClick={() => setActiveId(item.id)}
                aria-pressed={activeId === item.id}
              >
                <span className="handling-number danger">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="handling-item-copy">
                  <strong>{item.title}</strong>
                  <span>{item.short}</span>
                </span>

                <span className="handling-arrow">→</span>
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* RIGHT: Dynamic detail panel */}
      <div className="handling-detail-column">
        <div
          className={`handling-detail-panel ${
            active.group === "never" ? "danger" : ""
          }`}
          role="region"
          aria-label="Selected safe handling information"
          aria-live="polite"
        >
          <div className="eyebrow">
            {active.group === "before"
              ? "Safe Handling Step"
              : "Unsafe Practice"}
          </div>

          <h3>{active.title}</h3>

          <p>{active.detail}</p>

          <div className="handling-detail-tag">
            {active.group === "before"
              ? "Prepare first, then begin the task."
              : "Stop and follow workplace procedures."}
          </div>
        </div>
      </div>

    </div>
  );
}
