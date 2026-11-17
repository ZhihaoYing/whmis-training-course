"use client";

import { useState } from "react";

type SpillStep = {
  id: string;
  number: number;
  title: string;
  short: string;
  detail: string;
};

const spillSteps: SpillStep[] = [
  {
    id: "stop",
    number: 1,
    title: "Stop Work",
    short: "Do not continue the task.",
    detail:
      "Stop the task immediately. Do not continue working around a spill until the area has been assessed and the proper response procedure is followed.",
  },
  {
    id: "warn",
    number: 2,
    title: "Warn Others",
    short: "Alert people nearby.",
    detail:
      "Warn nearby workers so they do not enter the affected area or accidentally come into contact with the hazardous product.",
  },
  {
    id: "isolate",
    number: 3,
    title: "Isolate the Area",
    short: "Keep people away from the spill.",
    detail:
      "Restrict access to the affected area when it is safe to do so. Prevent unnecessary exposure until trained personnel respond.",
  },
  {
    id: "notify",
    number: 4,
    title: "Notify Your Supervisor",
    short: "Report the spill immediately.",
    detail:
      "Tell your supervisor or designated emergency contact as soon as possible and provide clear information about what happened.",
  },
  {
    id: "procedure",
    number: 5,
    title: "Follow Procedures",
    short: "Use the workplace spill response plan.",
    detail:
      "Follow your workplace emergency and spill response procedures. Check the SDS when more information about the product is required.",
  },
  {
    id: "ppe",
    number: 6,
    title: "Use Required PPE",
    short: "Protect yourself before approaching.",
    detail:
      "Only approach or respond to the spill when you have the correct PPE, training, and authorization required for the product and situation.",
  },
  {
    id: "cleanup",
    number: 7,
    title: "Clean Up Only If Trained",
    short: "Do not take unnecessary risks.",
    detail:
      "Never clean up a hazardous spill unless you are trained, authorized, and equipped to do so. Larger or more dangerous spills may require emergency responders.",
  },
];

export default function SpillResponseOverview() {
  const [activeId, setActiveId] = useState("stop");

  const active =
    spillSteps.find((step) => step.id === activeId) ?? spillSteps[0];

  return (
    <div className="spill-overview">

      <div className="spill-flow">

        {spillSteps.map((step, index) => (
          <div key={step.id} className="spill-flow-row">

            <button
              type="button"
              className={`spill-step ${
                activeId === step.id ? "active" : ""
              }`}
              onClick={() => setActiveId(step.id)}
            >
              <div className="spill-step-number">
                {step.number}
              </div>

              <div className="spill-step-copy">
                <strong>{step.title}</strong>
                <span>{step.short}</span>
              </div>
            </button>

            {index < spillSteps.length - 1 && (
              <div className="spill-connector">
                ↓
              </div>
            )}

          </div>
        ))}

      </div>


      <div className="spill-detail">

        <div className="eyebrow">
          Spill Response Step {active.number}
        </div>

        <h3>
          {active.title}
        </h3>

        <p>
          {active.detail}
        </p>

        <div className="spill-warning">
          Never clean up a hazardous spill unless you are trained and authorized.
        </div>

      </div>

    </div>
  );
}