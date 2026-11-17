import CourseSidebar from "../../../components/CourseSidebar";
import ModuleCompletionController from "../../../components/ModuleCompletionController";
import ModuleProgressGate from "../../../components/ModuleProgressGate";
import KnowledgeCheck from "../../../components/KnowledgeCheck";
import WorkerRightsOverview from "../../../components/WorkerRightsOverview";
import EmergencyOverview from "../../../components/EmergencyOverview";
import SpillResponseOverview from "../../../components/SpillResponseOverview";
import StorageOverview from "../../../components/StorageOverview";
import SafeHandlingOverview from "../../../components/SafeHandlingOverview";
import PPEOverview from "../../../components/PPEOverview";
import LabelAnatomy from "../../../components/LabelAnatomy";
import FlipCardGrid from "../../../components/FlipCardGrid";
import Link from "next/link";
import { notFound } from "next/navigation";

import { modules } from "../../../lib/course";
import ModuleInteraction from "../../../components/ModuleInteraction";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  const m = modules.find((item) => item.slug === slug);

  if (!m) {
    notFound();
  }

  const currentIndex = modules.findIndex((item) => item.slug === slug);
  const progressPercent =
    modules.length > 0
      ? Math.round(((currentIndex + 1) / modules.length) * 100)
      : 0;

  return (
    <div className="page-shell">
      <header className="topbar">
        <Link href="/" className="brand">
          <div className="brand-mark">S</div>
          <span>WHMIS 2015 & SDS Training</span>
        </Link>

        <div className="top-meta">
          <span>
            {currentIndex + 1} / {modules.length}
          </span>

          <div className="progress-mini" aria-label="Course progress">
            <span style={{ width: `${progressPercent}%` }} />
          </div>
        </div>
      </header>

      <div className="layout">
        <CourseSidebar
      modules={modules}
      currentSlug={slug}
    />

        <main className="main">
          <section className="hero">
            <div className="hero-card">
              <div className="eyebrow">{m.label}</div>

              <h1>{m.title}</h1>

              <p className="lead">{m.subtitle}</p>

              <p className="hero-intro">{m.intro}</p>
            </div>

            <div className="hero-visual">
              <div className="module-number">
                {m.label.replace("Module ", "")}
              </div>

              <strong>{m.title}</strong>
            </div>
          </section>

          {m.blocks?.map((block, index) => {
            switch (block.type) {
             case "text":
              // Special design for Module 10 "Important" section
              if (
                m.slug === "module-10" &&
                block.title === "Important"
              ) {
                return (
                  <section key={index} className="bullet-section">
                    <div className="spill-important-card">

                      <div className="spill-important-header">
                        <div>
                          <div className="eyebrow">
                            Safety Warning
                          </div>

                          <h2>
                            {block.title}
                          </h2>
                        </div>

                        <div className="spill-important-icon">
                          !
                        </div>
                      </div>

                      <p className="spill-important-text">
                        {block.text}
                      </p>

                      <div className="spill-important-actions">

                        <div className="spill-important-action">
                          <span>1</span>

                          <div>
                            <strong>Stop work</strong>
                            <p>Do not approach the spill unnecessarily.</p>
                          </div>
                        </div>

                        <div className="spill-important-action">
                          <span>2</span>

                          <div>
                            <strong>Warn others</strong>
                            <p>Keep nearby workers away from the area.</p>
                          </div>
                        </div>

                        <div className="spill-important-action">
                          <span>3</span>

                          <div>
                            <strong>Report immediately</strong>
                            <p>Notify your supervisor and follow procedures.</p>
                          </div>
                        </div>

                      </div>

                    </div>
                  </section>
                );
              }

              // Normal text blocks for every other module
              return (
                <section
                  key={index}
                  className="content-section"
                  style={
                    (
                      (m.slug === "module-6" &&
                        block.title === "Know where to find the SDS") ||
                      (m.slug === "knowledge-check" &&
                        block.title === "Practice before the final assessment")
                    )
                      ? {
                          backgroundColor: "#f7f9fc",
                          border: "1px solid #e5eaf2",
                          borderRadius: "18px",
                          padding: "24px",
                        }
                      : undefined
                  }
                >

                  <div className="eyebrow">
                    Overview
                  </div>

                  <h2>{block.title}</h2>

                  <p className="section-copy">
                    {block.text}
                  </p>
                </section>
              );
             case "bullets":
              // Module 8 and 9 already use custom visuals
              if (m.slug === "module-6" ||
                m.slug === "module-8" ||
                m.slug === "module-9"
              ) {
                return null;
              }

              // MODULE 6 — 16 SDS SECTIONS
              if (
                m.slug === "module-6" &&
                block.items.length === 16
              ) {
                return (
                  <section
                    key={index}
                    className="content-section"
                  >
                    <h2>{block.title}</h2>

                    <div className="sds-section-grid">
                      {block.items.map((item, i) => (
                        <div
                          key={i}
                          className="sds-section-card"
                        >
                          <div className="sds-section-number">
                            {String(i + 1).padStart(2, "0")}
                          </div>

                          <div className="sds-section-name">
                            {item.replace(
                              /^\d+\s*[—-]\s*/,
                              ""
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                );
              }

              // NORMAL BULLET BLOCKS
              // No outer content-section frame
              return (
                <div
                  key={index}
                  className="bullet-section"
                >
                  <div className="list-frame decorated-frame">
                    <div className="list-frame-header">
                      {block.title}
                    </div>

                    <ul className="bullets framed-bullets">
                      {block.items.map((item, i) => (
                        <li key={i}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );

              case "cards":
                // Module 7 already shows PPE cards inside PPEOverview.
                if (  m.slug === "module-1" ||
                  m.slug === "module-7" ||
                   m.slug === "module-12"
                ) {
                  return null;
                }

                return (
                  <section
                    key={index}
                    className="content-section cards-section-blue"
                    style={{
                      backgroundColor: "#f7f9fc",
                      border: "1px solid #e5eaf2",
                      borderRadius: "18px",
                      padding: "20px",
                    }}
                  >
                    {block.title && <h2>{block.title}</h2>}

                    {m.slug === "module-4" ? (
                      <FlipCardGrid cards={block.cards} />
                    ) : (
                      <div className="cards-grid">
                        {block.cards.map((card, i) => (
                          <div key={i} className="content-card">
                            {card.icon && (
                              <div className="card-icon">
                                {card.icon}
                              </div>
                            )}

                            <h3>{card.title}</h3>
                            <p>{card.text}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </section>
                );

              case "split":
                return (
                  <section
                  key={index}
                  className="content-section split-section-blue"
                >
                    <h2>{block.title}</h2>

                    <div className="split-grid">
                      <div className="split-card physical-card">
                        <h3>{block.left.title}</h3>

                        {block.left.subtitle && (
                          <span className="split-subtitle">
                            {block.left.subtitle}
                          </span>
                        )}

                        <ul>
                          {block.left.items.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="split-card health-card">
                        <h3>{block.right.title}</h3>

                        {block.right.subtitle && (
                          <span className="split-subtitle">
                            {block.right.subtitle}
                          </span>
                        )}

                        <ul>
                          {block.right.items.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </section>
                );

              case "steps":
                // Module 10 already uses the interactive SpillResponseOverview.
                // Hide the old duplicate steps list.
                if (m.slug === "module-10") {
                  return null;
                }

                return (
                  <section
                  key={index}
                  className="content-section steps-section-blue"
                >
                    <h2>{block.title}</h2>

                    <div className="steps-list">
                      {block.steps.map((step) => (
                        <div key={step.number} className="step-item">
                          <div className="step-number">
                            {step.number}
                          </div>

                          <div>
                            <h3>{step.title}</h3>

                            {step.text && (
                              <p>{step.text}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                );

           case "visual":
            return (
              <section
                key={index}
                className="content-section visual-section"
              >
                <div className="eyebrow">
                  Visual Overview
                </div>

                <h2>{block.title}</h2>

                <p className="section-copy">
                  {block.description}
                </p>


                {/* =========================================
                    MODULE 1 — WHMIS OVERVIEW
                ========================================== */}

                {block.visualType === "whmis-overview" && (
                  <div className="whmis-overview-visual">

                    <div className="whmis-center">
                      WHMIS
                    </div>

                    <div className="whmis-overview-line" />

                    <div className="whmis-overview-grid">

                      <div className="whmis-overview-card">
                        <div className="whmis-overview-icon">
                          L
                        </div>

                        <h3>Labels</h3>

                        <p>
                          Identify hazardous products and communicate
                          important hazard information.
                        </p>
                      </div>


                      <div className="whmis-overview-card">
                        <div className="whmis-overview-icon">
                          S
                        </div>

                        <h3>Safety Data Sheets</h3>

                        <p>
                          Provide detailed information about hazards,
                          handling, storage, first aid, and emergencies.
                        </p>
                      </div>


                      <div className="whmis-overview-card">
                        <div className="whmis-overview-icon">
                          T
                        </div>

                        <h3>Education & Training</h3>

                        <p>
                          Help workers understand WHMIS and use hazardous
                          products safely.
                        </p>
                      </div>

                    </div>
                  </div>
                )}


                {/* =========================================
                    MODULE 3 — HAZARD GROUPS
                ========================================== */}

                {block.visualType === "hazard-groups" && (
                  <div className="hazard-visual">

                    <div className="hazard-title">
                      WHMIS HAZARDS
                    </div>

                    <div className="hazard-line" />

                    <div className="hazard-branches">

                      <div className="hazard-box">
                        <div className="hazard-icon">
                          P
                        </div>

                        <h3>Physical Hazards</h3>
                        <p>19 Classes</p>
                      </div>

                      <div className="hazard-box">
                        <div className="hazard-icon">
                          H
                        </div>

                        <h3>Health Hazards</h3>
                        <p>12 Classes</p>
                      </div>

                    </div>
                  </div>
                )}


                {/* MODULE 5 — LABELS */}

                {block.visualType === "label-anatomy" && (
                  <LabelAnatomy />
                )}
                {/* MODULE 6 — SDS 16 SECTIONS */}
                {block.visualType === "sds-sections" && (
                  <div className="sds-visual-combined">

                    <div className="sds-visual-top">
                      <div className="sds-visual-badge">
                        WHMIS
                      </div>

                      <h3>The 16-section SDS structure</h3>

                      <p>
                        Safety Data Sheets organize hazard information into
                        16 standardized sections.
                      </p>
                    </div>

                    <div className="sds-section-grid">

                      {[
                        "Identification",
                        "Hazard Identification",
                        "Composition",
                        "First Aid",
                        "Fire Fighting",
                        "Accidental Release",
                        "Handling and Storage",
                        "Exposure Controls / PPE",
                        "Physical Properties",
                        "Stability and Reactivity",
                        "Toxicological Information",
                        "Ecological Information",
                        "Disposal Considerations",
                        "Transport Information",
                        "Regulatory Information",
                        "Other Information",
                      ].map((item, i) => (
                        <div
                          key={item}
                          className="sds-section-card"
                        >
                          <div className="sds-section-number">
                            {String(i + 1).padStart(2, "0")}
                          </div>

                          <div className="sds-section-name">
                            {item}
                          </div>
                        </div>
                      ))}

                    </div>

                  </div>
                )}


                {/* MODULE 7 — PPE */}

                {block.visualType === "ppe-overview" && (
                  <PPEOverview />
                )}


                {/* MODULE 8 — SAFE HANDLING */}

                {block.visualType === "handling-checklist" && (
                  <SafeHandlingOverview />
                )}


                {/* MODULE 9 — STORAGE */}

                {block.visualType === "storage-example" && (
                  <StorageOverview />
                )}


                {/* MODULE 10 — SPILL RESPONSE */}

                {block.visualType === "spill-flow" && (
                  <SpillResponseOverview />
                )}


                {/* MODULE 11 — EMERGENCY PROCEDURES */}

                {block.visualType === "emergency-equipment" && (
                  <EmergencyOverview />
                )}


                {/* MODULE 12 — WORKER RIGHTS */}

                {block.visualType === "worker-rights" && (
                  <WorkerRightsOverview />
                )}


                {/* =========================================
                    GENERIC PLACEHOLDER
                ========================================== */}

                {![
                  "whmis-overview",
                  "hazard-groups",
                  "label-anatomy",
                  "ppe-overview",
                  "handling-checklist",
                  "storage-example",
                  "spill-flow",
                  "emergency-equipment",
                  "worker-rights",
                  "sds-sections",
                ].includes(block.visualType as string) && (
                  <div className="generic-visual">

                    <div className="generic-visual-badge">
                      WHMIS
                    </div>

                    <strong>
                      {block.title}
                    </strong>

                  </div>
                )}

              </section>
            );
          
         default:
            return null;
        }
      })}


     {/* KNOWLEDGE CHECK / MODULE INTERACTION */}
    {m.slug === "knowledge-check" ? (
      <section className="interaction-section">
        <KnowledgeCheck />
      </section>
    ) : (
      <section className="interaction-section">
        <div className="section-head">
          <div>
            <div className="eyebrow">
              Interactive Knowledge Check
            </div>

            <h2>
              Check your understanding
            </h2>
          </div>
        </div>

        <ModuleInteraction slug={m.slug} />
      </section>
    )}

    {/* MODULE COMPLETION STATUS */}
    <ModuleCompletionController
      slug={m.slug}
      requiresActivity={m.slug !== "knowledge-check"}
    />

    {/* LOCKED / UNLOCKED NAVIGATION */}
    <ModuleProgressGate
      slug={m.slug}
      prev={m.prev}
      next={m.next}
    />

    </main>
    </div>
    </div>
    );
    }
    