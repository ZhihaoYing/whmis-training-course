"use client";

import { useState } from "react";

type LabelPart = {
  id: string;
  title: string;
  text: string;
};

const labelParts: LabelPart[] = [
  {
    id: "product",
    title: "Product Name",
    text: "Identifies the hazardous product.",
  },
  {
    id: "pictograms",
    title: "Pictograms",
    text: "Show the main types of hazards associated with the product.",
  },
  {
    id: "signal",
    title: "Signal Word",
    text: "Danger is used for more severe hazards. Warning is used for less severe hazards.",
  },
  {
    id: "hazard",
    title: "Hazard Statements",
    text: "Describe the nature of the product's hazards.",
  },
  {
    id: "precaution",
    title: "Precautionary Statements",
    text: "Explain recommended measures for prevention, response, storage, and disposal.",
  },
  {
    id: "supplier",
    title: "Supplier Information",
    text: "Identifies the supplier responsible for the hazardous product.",
  },
];

export default function LabelAnatomy() {
  const [active, setActive] = useState<LabelPart>(labelParts[0]);

  function selectPart(id: string) {
    const part = labelParts.find((item) => item.id === id);

    if (part) {
      setActive(part);
    }
  }

  return (
    <div className="label-anatomy">
      <div className="label-demo real-whmis-label">
        <div className="real-label-header">
          <button
            type="button"
            className={`real-label-product ${
              active.id === "product" ? "active" : ""
            }`}
            onClick={() => selectPart("product")}
          >
            ACME INDUSTRIAL CLEANER
          </button>

          <button
            type="button"
            className={`real-label-supplier ${
              active.id === "supplier" ? "active" : ""
            }`}
            onClick={() => selectPart("supplier")}
          >
            <strong>ACME Chemical Co.</strong>
            <span>Toronto, ON</span>
            <span>1-800-555-0123</span>
          </button>
        </div>

        <button
          type="button"
          className={`real-pictogram-area ${
            active.id === "pictograms" ? "active" : ""
          }`}
          onClick={() => selectPart("pictograms")}
        >
          <div className="whmis-diamond">
            <div className="pictogram-symbol">🔥</div>
          </div>

          <div className="whmis-diamond">
            <div className="pictogram-symbol">☠</div>
          </div>
        </button>

        <button
          type="button"
          className={`real-signal-word ${
            active.id === "signal" ? "active" : ""
          }`}
          onClick={() => selectPart("signal")}
        >
          DANGER
        </button>

        <button
          type="button"
          className={`real-label-section ${
            active.id === "hazard" ? "active" : ""
          }`}
          onClick={() => selectPart("hazard")}
        >
          <strong>Hazard Statements</strong>
          <p>Highly flammable liquid and vapour.</p>
          <p>Causes severe skin burns and eye damage.</p>
        </button>

        <button
          type="button"
          className={`real-label-section ${
            active.id === "precaution" ? "active" : ""
          }`}
          onClick={() => selectPart("precaution")}
        >
          <strong>Precautionary Statements</strong>
          <p>Keep away from heat, sparks and open flames.</p>
          <p>Wear protective gloves and eye protection.</p>
          <p>
            IF ON SKIN: Remove contaminated clothing and rinse skin with water.
          </p>
        </button>

        <div className="label-click-note">
          Click any section to learn more
        </div>
      </div>

      <div className="label-explanation">
        <div className="eyebrow">Label Element</div>

        <h3>{active.title}</h3>

        <p>{active.text}</p>

        <div className="label-element-list">
          {labelParts.map((part) => (
            <button
              key={part.id}
              type="button"
              className={
                active.id === part.id
                  ? "label-element-button active"
                  : "label-element-button"
              }
              onClick={() => setActive(part)}
            >
              {part.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
