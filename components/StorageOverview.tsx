
"use client";

import { useState } from "react";

type StorageItem = {
  id: string;
  title: string;
  subtitle: string;
  detail: string;
  type: "safe" | "danger";
};

const storageItems: StorageItem[] = [
  {
    id: "original",
    title: "Use the Original Container",
    subtitle: "Keep hazardous products in approved containers.",
    detail:
      "Store hazardous products in their original or properly approved containers whenever possible. Never use food or drink containers for chemical storage.",
    type: "safe",
  },
  {
    id: "labels",
    title: "Keep Labels Visible",
    subtitle: "Labels must stay readable.",
    detail:
      "Containers must remain properly labelled so workers can identify the product, hazards, and required precautions.",
    type: "safe",
  },
  {
    id: "ventilation",
    title: "Use Proper Ventilation",
    subtitle: "Follow workplace storage requirements.",
    detail:
      "Some hazardous products require well-ventilated storage areas to prevent the buildup of dangerous vapours.",
    type: "safe",
  },
  {
    id: "sds",
    title: "Check the SDS",
    subtitle: "Review storage and incompatibility information.",
    detail:
      "The SDS provides important information about storage conditions, temperature limits, and incompatible materials.",
    type: "safe",
  },
  {
    id: "acid-base",
    title: "Acids + Bases",
    subtitle: "Keep incompatible chemicals separated.",
    detail:
      "Acids and bases can react strongly when mixed, producing heat, splashing, or other hazardous reactions.",
    type: "danger",
  },
  {
    id: "oxidizer-flammable",
    title: "Oxidizers + Flammables",
    subtitle: "Do not store them together.",
    detail:
      "Oxidizers can greatly increase the risk of fire when stored near flammable or combustible materials.",
    type: "danger",
  },
  {
    id: "bleach-ammonia",
    title: "Bleach + Ammonia",
    subtitle: "Never mix or store carelessly together.",
    detail:
      "Bleach and ammonia can react and release dangerous toxic gases. Keep them separated and follow workplace procedures.",
    type: "danger",
  },
];

export default function StorageOverview() {
  const [activeId, setActiveId] = useState("original");

  const active =
    storageItems.find((item) => item.id === activeId) ??
    storageItems[0];

  const safeItems = storageItems.filter(
    (item) => item.type === "safe"
  );

  const dangerItems = storageItems.filter(
    (item) => item.type === "danger"
  );

  return (
    <div className="storage-overview storage-side-layout">

      {/* LEFT SIDE: Clickable storage items */}
      <div className="storage-options">

        {/* SAFE STORAGE */}
        <div className="storage-panel">
          <div className="storage-panel-header">
            <span className="storage-badge">
              Safe Storage
            </span>

            <h3>Store Hazardous Products Safely</h3>
          </div>

          <div className="storage-list">
            {safeItems.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className={`storage-item ${
                  activeId === item.id ? "active" : ""
                }`}
                onClick={() => setActiveId(item.id)}
                aria-pressed={activeId === item.id}
              >
                <div className="storage-item-icon">
                  {index + 1}
                </div>

                <div className="storage-item-copy">
                  <strong>{item.title}</strong>
                  <span>{item.subtitle}</span>
                </div>

                <span className="storage-arrow">
                  →
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* INCOMPATIBLE CHEMICALS */}
        <div className="storage-panel storage-danger-panel">
          <div className="storage-panel-header">
            <span className="storage-badge danger">
              Keep Separate
            </span>

            <h3>Incompatible Chemicals</h3>
          </div>

          <div className="storage-list">
            {dangerItems.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`storage-item storage-danger-item ${
                  activeId === item.id ? "active" : ""
                }`}
                onClick={() => setActiveId(item.id)}
                aria-pressed={activeId === item.id}
              >
                <div className="storage-danger-symbol">
                  !
                </div>

                <div className="storage-item-copy">
                  <strong>{item.title}</strong>
                  <span>{item.subtitle}</span>
                </div>

                <span className="storage-arrow">
                  →
                </span>
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* RIGHT SIDE: Dynamic detail panel */}
      <div className="storage-detail-column">
        <div
          className={`storage-detail ${
            active.type === "danger" ? "danger" : ""
          }`}
          role="region"
          aria-label="Selected storage information"
          aria-live="polite"
        >
          <div className="eyebrow">
            {active.type === "safe"
              ? "Storage Practice"
              : "Incompatible Materials"}
          </div>

          <h3>{active.title}</h3>

          <p>{active.detail}</p>

          <div className="storage-reminder">
            {active.type === "safe"
              ? "Always follow the SDS and workplace storage procedures."
              : "Keep incompatible hazardous products separated."}
          </div>
        </div>
      </div>

    </div>
  );
}
