"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import SDSKnowledgeCheck, {
  SDSQuestion,
} from "../../../../components/SDSKnowledgeCheck";

/* =========================================================
   TYPES
========================================================= */

type Chemical = {
  id: string;
  name: string;
  pictograms: string[];
  hazards: string[];
  ppe: string[];
  handling: string[];
  emergency: string[];
  questions: SDSQuestion[];
};

type Assignment = {
  id: string;
  number: string;
  chemicalIds: string[];
};

/* =========================================================
   ASSIGNMENTS
========================================================= */

const assignments: Record<string, Assignment> = {
  "assignment-001": {
    id: "assignment-001",
    number: "Assignment 001",
    chemicalIds: [
      "acetone",
      "benzene",
      "isopropyl-alcohol",
    ],
  },

  "assignment-002": {
    id: "assignment-002",
    number: "Assignment 002",
    chemicalIds: [
      "industrial-cleaner",
      "paint-thinner",
      "solvent-cleaner",
    ],
  },

  "assignment-003": {
    id: "assignment-003",
    number: "Assignment 003",
    chemicalIds: [
      "primer",
      "degreaser",
    ],
  },
};

/* =========================================================
   CHEMICAL DATA
========================================================= */

const chemicalBank: Record<string, Chemical> = {
  /* ===================== ACETONE ===================== */

  acetone: {
    id: "acetone",
    name: "Acetone",

    pictograms: [
      "Flame",
      "Exclamation Mark",
    ],

    hazards: [
      "Highly flammable liquid and vapour",
      "Causes serious eye irritation",
      "Vapour may cause drowsiness or dizziness",
    ],

    ppe: [
      "Splash-proof chemical goggles",
      "Chemical-resistant gloves",
      "Chemical-resistant apron",
      "Closed-toe safety shoes",
    ],

    handling: [
      "Keep away from sparks, flames, and hot surfaces",
      "Use appropriate ventilation",
      "Bond and ground containers during transfer",
      "Wash hands after use",
    ],

    emergency: [
      "Move exposed worker to fresh air",
      "Remove contaminated clothing",
      "Flush eyes with water for at least 15 minutes",
      "Follow workplace emergency procedures",
    ],

    questions: [
      {
        question:
          "Which WHMIS pictograms are associated with Acetone?",
        options: [
          "Flame and Exclamation Mark",
          "Corrosion and Skull",
          "Biohazard only",
          "Gas Cylinder only",
        ],
        correctIndex: 0,
      },
      {
        question:
          "What is an important hazard associated with Acetone?",
        options: [
          "It is non-flammable",
          "It is highly flammable",
          "It has no eye hazard",
          "It is safe to inhale",
        ],
        correctIndex: 1,
      },
      {
        question:
          "What eye protection should be used?",
        options: [
          "No protection",
          "Sunglasses",
          "Splash-proof chemical goggles",
          "Contact lenses only",
        ],
        correctIndex: 2,
      },
      {
        question:
          "What should be eliminated when handling Acetone?",
        options: [
          "Labels",
          "Ventilation",
          "Sparks, flames, and hot surfaces",
          "PPE",
        ],
        correctIndex: 2,
      },
      {
        question:
          "What should you do if Acetone enters the eyes?",
        options: [
          "Wait for symptoms",
          "Flush eyes for at least 15 minutes",
          "Cover the eyes",
          "Continue working",
        ],
        correctIndex: 1,
      },
    ],
  },

  /* ===================== BENZENE ===================== */

  benzene: {
    id: "benzene",
    name: "Benzene",

    pictograms: [
      "Flame",
      "Health Hazard",
      "Exclamation Mark",
    ],

    hazards: [
      "Highly flammable liquid",
      "Known carcinogenic hazard",
      "May cause serious long-term health effects",
      "Harmful exposure may occur by inhalation",
    ],

    ppe: [
      "Chemical-resistant gloves",
      "Chemical goggles",
      "Protective clothing",
      "Respiratory protection when required",
    ],

    handling: [
      "Use appropriate ventilation",
      "Keep away from ignition sources",
      "Use designated handling areas",
      "Follow strict hygiene procedures",
    ],

    emergency: [
      "Move worker to fresh air after inhalation exposure",
      "Remove contaminated clothing",
      "Flush exposed skin with water",
      "Seek medical attention when required",
    ],

    questions: [
      {
        question:
          "Which pictograms are associated with Benzene?",
        options: [
          "Flame only",
          "Flame, Health Hazard, and Exclamation Mark",
          "Environment only",
          "Gas Cylinder only",
        ],
        correctIndex: 1,
      },
      {
        question:
          "What is a major long-term hazard associated with Benzene?",
        options: [
          "Minor dryness only",
          "Temporary headache only",
          "Cancer",
          "No long-term hazard",
        ],
        correctIndex: 2,
      },
      {
        question:
          "What distinguishes Benzene from Acetone in this training?",
        options: [
          "Acetone has the greater chronic cancer hazard",
          "Benzene presents a serious chronic health hazard",
          "Benzene is not flammable",
          "They have identical hazards",
        ],
        correctIndex: 1,
      },
      {
        question:
          "Where should Benzene be handled?",
        options: [
          "Anywhere",
          "In an appropriately ventilated designated area",
          "Beside ignition sources",
          "In a lunch room",
        ],
        correctIndex: 1,
      },
      {
        question:
          "What should you do after skin contact with Benzene?",
        options: [
          "Leave it on the skin",
          "Remove contaminated clothing and flush the skin",
          "Add another chemical",
          "Continue working",
        ],
        correctIndex: 1,
      },
    ],
  },

  /* ================= ISOPROPYL ALCOHOL ================= */

  "isopropyl-alcohol": {
    id: "isopropyl-alcohol",
    name: "Isopropyl Alcohol",

    pictograms: [
      "Flame",
      "Exclamation Mark",
    ],

    hazards: [
      "Flammable liquid and vapour",
      "May irritate the eyes",
      "Vapours may cause dizziness",
    ],

    ppe: [
      "Protective gloves",
      "Safety goggles",
      "Workplace-required protective clothing",
    ],

    handling: [
      "Keep away from ignition sources",
      "Use adequate ventilation",
      "Keep containers closed when not in use",
    ],

    emergency: [
      "Follow SDS first-aid instructions",
      "Report spills",
      "Follow workplace emergency procedures",
    ],

    questions: [
      {
        question:
          "What should be reviewed before using Isopropyl Alcohol?",
        options: [
          "Payroll records",
          "Product label, SDS, and workplace procedures",
          "Employee schedule",
          "Customer records",
        ],
        correctIndex: 1,
      },
      {
        question:
          "What should determine required PPE?",
        options: [
          "The SDS and workplace procedures",
          "Employee preference",
          "Product colour",
          "Container size",
        ],
        correctIndex: 0,
      },
      {
        question:
          "Where should storage requirements be checked?",
        options: [
          "SDS handling and storage information",
          "Payroll system",
          "Employee calendar",
          "Building directory",
        ],
        correctIndex: 0,
      },
      {
        question:
          "What should a worker do after a chemical spill?",
        options: [
          "Ignore it",
          "Follow workplace spill procedures and SDS instructions",
          "Add another chemical",
          "Leave without reporting",
        ],
        correctIndex: 1,
      },
      {
        question:
          "Where should first-aid information be obtained?",
        options: [
          "SDS and workplace emergency procedures",
          "Social media",
          "Advertising",
          "Sales records",
        ],
        correctIndex: 0,
      },
    ],
  },

  /* ================= INDUSTRIAL CLEANER ================= */

  "industrial-cleaner": {
    id: "industrial-cleaner",
    name: "Industrial Cleaner",

    pictograms: [
      "Corrosion",
      "Exclamation Mark",
    ],

    hazards: [
      "May cause skin irritation",
      "May cause serious eye damage",
      "Avoid breathing mist or spray",
    ],

    ppe: [
      "Chemical-resistant gloves",
      "Safety goggles",
      "Protective clothing",
    ],

    handling: [
      "Avoid direct skin contact",
      "Use only as directed",
      "Maintain suitable ventilation",
    ],

    emergency: [
      "Flush exposed areas with water",
      "Remove contaminated clothing",
      "Report spills immediately",
    ],

    questions: [
      {
        question:
          "What is an important concern when handling Industrial Cleaner?",
        options: [
          "Skin and eye exposure",
          "Computer damage",
          "Noise exposure",
          "Vehicle traffic",
        ],
        correctIndex: 0,
      },
      {
        question:
          "Which PPE helps protect the hands?",
        options: [
          "Ear plugs",
          "Chemical-resistant gloves",
          "Safety boots only",
          "Hard hat only",
        ],
        correctIndex: 1,
      },
      {
        question:
          "What should you avoid breathing?",
        options: [
          "Fresh air",
          "Mist or spray",
          "Water vapour",
          "Normal room air",
        ],
        correctIndex: 1,
      },
      {
        question:
          "What should you do with contaminated clothing?",
        options: [
          "Continue wearing it",
          "Remove it",
          "Share it with another worker",
          "Store it with food",
        ],
        correctIndex: 1,
      },
      {
        question:
          "Where should product-specific emergency instructions be checked?",
        options: [
          "The SDS",
          "Payroll records",
          "Parking signs",
          "Employee ID",
        ],
        correctIndex: 0,
      },
    ],
  },

  /* ================= PAINT THINNER ================= */

  "paint-thinner": {
    id: "paint-thinner",
    name: "Paint Thinner",

    pictograms: [
      "Flame",
      "Health Hazard",
    ],

    hazards: [
      "Flammable liquid and vapour",
      "Vapours may be harmful",
      "May affect the nervous system",
    ],

    ppe: [
      "Safety goggles",
      "Chemical-resistant gloves",
      "Protective clothing",
    ],

    handling: [
      "Keep away from ignition sources",
      "Use appropriate ventilation",
      "Avoid prolonged vapour exposure",
    ],

    emergency: [
      "Move affected worker to fresh air",
      "Flush exposed skin",
      "Follow spill-response procedures",
    ],

    questions: [
      {
        question:
          "Why should Paint Thinner be kept away from ignition sources?",
        options: [
          "It may be flammable",
          "It becomes frozen",
          "It loses colour",
          "It becomes water",
        ],
        correctIndex: 0,
      },
      {
        question:
          "Why is ventilation important?",
        options: [
          "To reduce vapour exposure",
          "To increase vapour concentration",
          "To increase temperature",
          "To remove labels",
        ],
        correctIndex: 0,
      },
      {
        question:
          "What should protect the eyes?",
        options: [
          "Safety goggles",
          "Baseball cap",
          "Ear plugs",
          "Regular glasses only",
        ],
        correctIndex: 0,
      },
      {
        question:
          "What should be done after significant inhalation exposure?",
        options: [
          "Move to fresh air",
          "Continue working",
          "Enter a smaller room",
          "Create more vapour",
        ],
        correctIndex: 0,
      },
      {
        question:
          "Where should safe handling requirements be confirmed?",
        options: [
          "SDS and workplace procedures",
          "Lunch menu",
          "Payroll records",
          "Parking permit",
        ],
        correctIndex: 0,
      },
    ],
  },

  /* ================= SOLVENT CLEANER ================= */

  "solvent-cleaner": {
    id: "solvent-cleaner",
    name: "Solvent Cleaner",

    pictograms: [
      "Flame",
      "Exclamation Mark",
    ],

    hazards: [
      "May be flammable",
      "May irritate skin and eyes",
      "Vapour exposure should be minimized",
    ],

    ppe: [
      "Protective gloves",
      "Eye protection",
      "Workplace-required PPE",
    ],

    handling: [
      "Use with adequate ventilation",
      "Keep container closed",
      "Avoid ignition sources",
    ],

    emergency: [
      "Report spills",
      "Move exposed worker to fresh air",
      "Flush affected areas with water",
    ],

    questions: [
      {
        question:
          "What should be minimized when using Solvent Cleaner?",
        options: [
          "Vapour exposure",
          "Safety training",
          "Labels",
          "Ventilation",
        ],
        correctIndex: 0,
      },
      {
        question:
          "What should happen when the product is not being used?",
        options: [
          "Leave the container open",
          "Keep the container closed",
          "Remove the label",
          "Mix it with another product",
        ],
        correctIndex: 1,
      },
      {
        question:
          "What should be kept away from the product?",
        options: [
          "Ignition sources",
          "Safety goggles",
          "SDS documents",
          "Workers wearing PPE",
        ],
        correctIndex: 0,
      },
      {
        question:
          "What is an appropriate response to a spill?",
        options: [
          "Report it and follow spill procedures",
          "Ignore it",
          "Walk through it",
          "Cover it with paper",
        ],
        correctIndex: 0,
      },
      {
        question:
          "What helps reduce inhalation exposure?",
        options: [
          "Adequate ventilation",
          "Closed doors only",
          "Removing PPE",
          "Increasing vapour",
        ],
        correctIndex: 0,
      },
    ],
  },

  /* ================= PRIMER ================= */

  primer: {
    id: "primer",
    name: "Primer",

    pictograms: [
      "Flame",
      "Exclamation Mark",
    ],

    hazards: [
      "May contain flammable solvents",
      "May irritate skin and eyes",
      "Vapour exposure should be controlled",
    ],

    ppe: [
      "Safety goggles",
      "Protective gloves",
      "Protective clothing",
    ],

    handling: [
      "Use in ventilated areas",
      "Keep away from ignition sources",
      "Close container after use",
    ],

    emergency: [
      "Move worker to fresh air if needed",
      "Flush skin or eyes with water",
      "Follow workplace spill procedures",
    ],

    questions: [
      {
        question:
          "Why should Primer be used in a ventilated area?",
        options: [
          "To control vapour exposure",
          "To remove the label",
          "To increase vapours",
          "To make the container heavier",
        ],
        correctIndex: 0,
      },
      {
        question:
          "What should be kept away from Primer?",
        options: [
          "Ignition sources",
          "Safety equipment",
          "SDS documents",
          "Ventilation systems",
        ],
        correctIndex: 0,
      },
      {
        question:
          "What PPE protects the eyes?",
        options: [
          "Safety goggles",
          "Gloves",
          "Ear protection",
          "Safety shoes",
        ],
        correctIndex: 0,
      },
      {
        question:
          "What should happen to the container after use?",
        options: [
          "Leave it open",
          "Close it",
          "Remove the label",
          "Put food inside",
        ],
        correctIndex: 1,
      },
      {
        question:
          "What should be done after eye exposure?",
        options: [
          "Flush with water and follow SDS instructions",
          "Continue working",
          "Cover the eye with chemical",
          "Ignore symptoms",
        ],
        correctIndex: 0,
      },
    ],
  },

  /* ================= DEGREASER ================= */

  degreaser: {
    id: "degreaser",
    name: "Degreaser",

    pictograms: [
      "Exclamation Mark",
      "Corrosion",
    ],

    hazards: [
      "May irritate or damage skin",
      "May cause eye injury",
      "Mist should not be inhaled",
    ],

    ppe: [
      "Chemical-resistant gloves",
      "Safety goggles",
      "Protective clothing",
    ],

    handling: [
      "Avoid skin and eye contact",
      "Use adequate ventilation",
      "Wash hands after handling",
    ],

    emergency: [
      "Flush exposed skin or eyes",
      "Remove contaminated clothing",
      "Report spills or exposures",
    ],

    questions: [
      {
        question:
          "What contact should be avoided when using Degreaser?",
        options: [
          "Skin and eye contact",
          "Contact with SDS documents",
          "Contact with PPE",
          "Contact with ventilation",
        ],
        correctIndex: 0,
      },
      {
        question:
          "What should be worn on the hands?",
        options: [
          "Chemical-resistant gloves",
          "Safety goggles",
          "Ear plugs",
          "Nothing",
        ],
        correctIndex: 0,
      },
      {
        question:
          "What should you do after handling Degreaser?",
        options: [
          "Wash your hands",
          "Eat immediately without washing",
          "Remove the product label",
          "Leave the container open",
        ],
        correctIndex: 0,
      },
      {
        question:
          "What helps reduce exposure to mist?",
        options: [
          "Adequate ventilation",
          "Closing emergency exits",
          "Removing PPE",
          "Increasing spray",
        ],
        correctIndex: 0,
      },
      {
        question:
          "What should be done with contaminated clothing?",
        options: [
          "Remove it",
          "Continue wearing it",
          "Share it",
          "Store it with food",
        ],
        correctIndex: 0,
      },
    ],
  },
};

/* =========================================================
   PAGE
========================================================= */

export default function AssignmentPage() {
  const params = useParams();

  const assignmentId =
    params.assignmentId as string;

  const assignment =
    assignments[assignmentId] ??
    assignments["assignment-001"];

  const chemicals =
    assignment.chemicalIds.map(
      (id) => chemicalBank[id]
    );

  const storageKey =
    assignment.id === "assignment-001"
      ? "specificAssignment001Progress"
      : assignment.id === "assignment-002"
      ? "specificAssignment002Progress"
      : "specificAssignment003Progress";

  const [selectedChemical, setSelectedChemical] =
    useState(chemicals[0].id);

  const [
    completedChemicals,
    setCompletedChemicals,
  ] = useState<string[]>([]);

  const [progressLoaded, setProgressLoaded] =
    useState(false);

  /* =======================================================
     RESET SELECTED SDS WHEN ASSIGNMENT CHANGES
  ======================================================= */

  useEffect(() => {
    setSelectedChemical(
      chemicals[0].id
    );
  }, [assignment.id]);

  /* =======================================================
     LOAD PROGRESS
  ======================================================= */

  useEffect(() => {
    setProgressLoaded(false);

    const saved =
      localStorage.getItem(storageKey);

    if (saved) {
      try {
        const parsed =
          JSON.parse(saved);

        if (Array.isArray(parsed)) {
          setCompletedChemicals(
            parsed
          );
        } else {
          setCompletedChemicals([]);
        }
      } catch {
        setCompletedChemicals([]);
      }
    } else {
      setCompletedChemicals([]);
    }

    setProgressLoaded(true);
  }, [storageKey]);

  /* =======================================================
     SAVE PROGRESS
  ======================================================= */

  useEffect(() => {
    if (!progressLoaded) return;

    localStorage.setItem(
      storageKey,
      JSON.stringify(
        completedChemicals
      )
    );
  }, [
    completedChemicals,
    progressLoaded,
    storageKey,
  ]);

  /* =======================================================
     CURRENT CHEMICAL
  ======================================================= */

  const chemical =
    chemicals.find(
      (item) =>
        item.id === selectedChemical
    ) ?? chemicals[0];

  const completedCount =
    completedChemicals.filter(
      (id) =>
        assignment.chemicalIds.includes(
          id
        )
    ).length;

  const assignmentComplete =
    completedCount ===
    chemicals.length;

  const progress =
    Math.round(
      (completedCount /
        chemicals.length) *
        100
    );

  /* =======================================================
     PASS
  ======================================================= */

  function handleChemicalPassed(
    id: string
  ) {
    setCompletedChemicals(
      (current) => {
        if (current.includes(id)) {
          return current;
        }

        return [
          ...current,
          id,
        ];
      }
    );
  }

  return (
    <div className="specific-assignment-page">

      {/* HEADER */}

      <header className="specific-assignment-header">

        <div>

          <Link
            href="/specific-training"
            className="assignment-back-link"
          >
            ← Back to SDS Assignments
          </Link>

          <div className="eyebrow">
            Specific WHMIS Training
          </div>

          <h1>
            {assignment.number}
          </h1>

          <p>
            Complete the required SDS
            training assigned to you.
          </p>

        </div>

        <div className="assignment-progress-summary">

          <strong>
            {progress}%
          </strong>

          <span>
            {completedCount} of{" "}
            {chemicals.length} SDS completed
          </span>

        </div>

      </header>

      {/* PROGRESS */}

      <div className="assignment-progress-bar">
        <span
          style={{
            width: `${progress}%`,
          }}
        />
      </div>

      {/* LAYOUT */}

      <div className="specific-assignment-layout">

        {/* SIDEBAR */}

        <aside className="assignment-sds-sidebar">

          <div className="assignment-sidebar-title">
            Assigned SDS
          </div>

          {chemicals.map(
            (item, index) => {

              const completed =
                completedChemicals.includes(
                  item.id
                );

              const active =
                item.id ===
                selectedChemical;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    setSelectedChemical(
                      item.id
                    )
                  }
                  className={`assignment-sds-item ${
                    active
                      ? "active"
                      : ""
                  }`}
                >

                  <div
                    className={`assignment-sds-status ${
                      completed
                        ? "completed"
                        : ""
                    }`}
                  >
                    {completed
                      ? "✓"
                      : index + 1}
                  </div>

                  <div>
                    <strong>
                      {item.name}
                    </strong>

                    <span>
                      {completed
                        ? "Completed"
                        : "5 Questions"}
                    </span>
                  </div>

                </button>
              );
            }
          )}

          <div className="assignment-sidebar-summary">
            <span>
              Assignment Progress
            </span>

            <strong>
              {completedCount} /{" "}
              {chemicals.length}
            </strong>
          </div>

        </aside>

        {/* CONTENT */}

        <main className="assignment-main-content">

          {/* SDS HEADER */}

          <section className="assignment-chemical-header">

            <div>

              <div className="eyebrow">
                Current SDS
              </div>

              <h2>
                {chemical.name}
              </h2>

              <p>
                Review the safety information
                before completing the knowledge
                check.
              </p>

            </div>

            {completedChemicals.includes(
              chemical.id
            ) && (
              <div className="chemical-completed-badge">
                ✓ Completed
              </div>
            )}

          </section>

          {/* PICTOGRAMS */}

          <section className="assignment-content-card">

            <div className="eyebrow">
              WHMIS Classification
            </div>

            <h3>
              Pictograms
            </h3>

            <div className="assignment-tag-list">

              {chemical.pictograms.map(
                (item) => (
                  <span key={item}>
                    {item}
                  </span>
                )
              )}

            </div>

          </section>

          {/* INFORMATION */}

          <div className="assignment-info-grid">

            <section className="assignment-info-card">

              <div className="assignment-info-icon">
                ⚠
              </div>

              <h3>
                Key Hazards
              </h3>

              <ul>
                {chemical.hazards.map(
                  (item) => (
                    <li key={item}>
                      {item}
                    </li>
                  )
                )}
              </ul>

            </section>

            <section className="assignment-info-card">

              <div className="assignment-info-icon">
                ◉
              </div>

              <h3>
                Required PPE
              </h3>

              <ul>
                {chemical.ppe.map(
                  (item) => (
                    <li key={item}>
                      {item}
                    </li>
                  )
                )}
              </ul>

            </section>

            <section className="assignment-info-card">

              <div className="assignment-info-icon">
                ✓
              </div>

              <h3>
                Safe Handling
              </h3>

              <ul>
                {chemical.handling.map(
                  (item) => (
                    <li key={item}>
                      {item}
                    </li>
                  )
                )}
              </ul>

            </section>

            <section className="assignment-info-card">

              <div className="assignment-info-icon">
                +
              </div>

              <h3>
                Emergency Response
              </h3>

              <ul>
                {chemical.emergency.map(
                  (item) => (
                    <li key={item}>
                      {item}
                    </li>
                  )
                )}
              </ul>

            </section>

          </div>

          {/* SDS DOCUMENT */}

          <section className="assignment-content-card">

            <div className="assignment-document-row">

              <div>

                <div className="eyebrow">
                  Safety Data Sheet
                </div>

                <h3>
                  {chemical.name} SDS
                </h3>

                <p>
                  Review the full Safety Data
                  Sheet before completing this
                  training.
                </p>

              </div>

              <button
                type="button"
                className="sds-secondary-button"
              >
                View SDS Document
              </button>

            </div>

          </section>

          {/* QUIZ */}

          <section className="assignment-content-card">

            <SDSKnowledgeCheck
              key={`${assignment.id}-${chemical.id}`}
              chemicalName={
                chemical.name
              }
              questions={
                chemical.questions
              }
              onPassed={() =>
                handleChemicalPassed(
                  chemical.id
                )
              }
            />

          </section>

          {/* COMPLETE */}

          {assignmentComplete && (

            <section className="assignment-complete-card">

              <div className="assignment-complete-icon">
                ✓
              </div>

              <div>

                <div className="eyebrow">
                  Assignment Complete
                </div>

                <h2>
                  {assignment.number}
                </h2>

                <p>
                  You successfully completed
                  all assigned SDS training.
                </p>

              </div>

            </section>

          )}

        </main>

      </div>

    </div>
  );
}