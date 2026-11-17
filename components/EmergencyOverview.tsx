"use client";

import { useState } from "react";

type EmergencyItem = {
  id: string;
  title: string;
  short: string;
  detail: string;
  category: "equipment" | "report";
};

const emergencyItems: EmergencyItem[] = [
  {
    id: "exit",
    title: "Emergency Exits",
    short: "Know how to leave the area safely.",
    detail:
      "Know the location of emergency exits and evacuation routes before an emergency happens.",
    category: "equipment",
  },
  {
    id: "extinguisher",
    title: "Fire Extinguishers",
    short: "Know where emergency fire equipment is located.",
    detail:
      "Know where fire extinguishers are located, but only use one if you are trained and workplace procedures allow it.",
    category: "equipment",
  },
  {
    id: "eyewash",
    title: "Eyewash Stations",
    short: "Use immediately after eye exposure.",
    detail:
      "Know where eyewash stations are located and how to reach them quickly if a hazardous product enters the eyes.",
    category: "equipment",
  },
  {
    id: "shower",
    title: "Emergency Showers",
    short: "Use for significant skin or body exposure.",
    detail:
      "Emergency showers can be used when hazardous products contact large areas of the body or clothing.",
    category: "equipment",
  },
  {
    id: "firstaid",
    title: "First Aid",
    short: "Know where first aid resources are located.",
    detail:
      "Know how to access workplace first aid and who to contact when medical attention is needed.",
    category: "equipment",
  },
  {
    id: "contacts",
    title: "Emergency Contacts",
    short: "Know who to call.",
    detail:
      "Workers should know the correct supervisor, emergency contact, or emergency service to notify.",
    category: "equipment",
  },

  {
    id: "exposure",
    title: "Exposure",
    short: "Report chemical exposure immediately.",
    detail:
      "Immediately report any suspected exposure to a hazardous product and follow workplace first aid and emergency procedures.",
    category: "report",
  },
  {
    id: "fire",
    title: "Fire or Explosion",
    short: "Alert others and follow emergency procedures.",
    detail:
      "Any fire or explosion involving hazardous products must be reported immediately. Evacuate or respond according to workplace procedures.",
    category: "report",
  },
  {
    id: "spill",
    title: "Spill or Leak",
    short: "Report the incident immediately.",
    detail:
      "Hazardous spills or leaks must be reported so the area can be controlled and the proper response procedure can begin.",
    category: "report",
  },
  {
    id: "missing-label",
    title: "Missing or Damaged Label",
    short: "Do not use unidentified hazardous products.",
    detail:
      "If a label is missing, damaged, or unreadable, report it before using the product.",
    category: "report",
  },
];

export default function EmergencyOverview() {
  const [activeId, setActiveId] = useState("exit");

  const active =
    emergencyItems.find((item) => item.id === activeId) ??
    emergencyItems[0];

  const equipmentItems = emergencyItems.filter(
    (item) => item.category === "equipment"
  );

  const reportItems = emergencyItems.filter(
    (item) => item.category === "report"
  );

  return (
    <div className="emergency-overview">

      <div className="emergency-columns">

        {/* KNOW WHERE TO FIND */}

        <div className="emergency-panel">

          <div className="emergency-panel-header">
            <span className="emergency-badge">
              Know Where To Find
            </span>

            <h3>Emergency Equipment</h3>
          </div>

          <div className="emergency-grid">
            {equipmentItems.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className={`emergency-item ${
                  activeId === item.id ? "active" : ""
                }`}
                onClick={() => setActiveId(item.id)}
              >
                <div className="emergency-icon">
                  {index + 1}
                </div>

                <div className="emergency-item-copy">
                  <strong>{item.title}</strong>
                  <span>{item.short}</span>
                </div>
              </button>
            ))}
          </div>

        </div>


        {/* REPORT IMMEDIATELY */}

        <div className="emergency-panel">

          <div className="emergency-panel-header">
            <span className="emergency-badge danger">
              Report Immediately
            </span>

            <h3>Emergency Situations</h3>
          </div>

          <div className="emergency-grid">
            {reportItems.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`emergency-item emergency-danger-item ${
                  activeId === item.id ? "active" : ""
                }`}
                onClick={() => setActiveId(item.id)}
              >
                <div className="emergency-icon danger">
                  !
                </div>

                <div className="emergency-item-copy">
                  <strong>{item.title}</strong>
                  <span>{item.short}</span>
                </div>
              </button>
            ))}
          </div>

        </div>

      </div>


      {/* DETAIL PANEL */}

      <div
        className={`emergency-detail ${
          active.category === "report" ? "danger" : ""
        }`}
      >
        <div className="eyebrow">
          {active.category === "equipment"
            ? "Emergency Preparedness"
            : "Immediate Reporting"}
        </div>

        <h3>{active.title}</h3>

        <p>{active.detail}</p>

        <div className="emergency-reminder">
          {active.category === "equipment"
            ? "Know the location of emergency equipment before an incident occurs."
            : "Report the situation immediately and follow workplace procedures."}
        </div>
      </div>

    </div>
  );
}