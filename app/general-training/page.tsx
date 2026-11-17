import Link from "next/link";
import { modules } from "../../lib/course";

export default function GeneralTrainingPage() {
  return (
    <main className="general-overview-page">

      {/* HEADER */}
      <header className="general-overview-header">

        <div>
          <Link
            href="/dashboard"
            className="general-back-link"
          >
            ← Back to Dashboard
          </Link>

          <div className="eyebrow">
            General WHMIS Training
          </div>

          <h1>
            WHMIS 2015 Training
          </h1>

          <p>
            Complete all learning modules, the Knowledge Check,
            and the Final Assessment to finish your general WHMIS training.
          </p>
        </div>


        <div className="general-overview-status">

          <span>
            Overall Progress
          </span>

          <strong>
            0%
          </strong>

          <small>
            0 of 12 modules completed
          </small>

        </div>

      </header>


      {/* COURSE PROGRESS */}
      <section className="general-progress-card">

        <div className="general-progress-top">

          <div>
            <span>
              Course Progress
            </span>

            <strong>
              0 / 12 Modules
            </strong>
          </div>


          <div>
            <span>
              Final Requirement
            </span>

            <strong>
              80% to Pass
            </strong>
          </div>


          <div>
            <span>
              Estimated Duration
            </span>

            <strong>
              ~45 Minutes
            </strong>
          </div>

        </div>


        <div className="general-progress-track">
          <span style={{ width: "0%" }} />
        </div>

      </section>


      {/* LEARNING PATH */}
      <section className="general-learning-section">

        <div className="general-section-heading">

          <div>
            <div className="eyebrow">
              Course Structure
            </div>

            <h2>
              Learning Path
            </h2>
          </div>


          <Link
            href="/course/module-1"
            className="general-continue-button"
          >
            Start Training →
          </Link>

        </div>


        <div className="general-module-list">

          {modules.map((module, index) => {

            const completed = false;
            const current = index === 0;

            return (
              <Link
                key={module.slug}
                href={`/course/${module.slug}`}
                className={`general-module-row ${
                  completed
                    ? "completed"
                    : current
                    ? "current"
                    : ""
                }`}
              >

                <div
                  className={`general-module-status ${
                    completed
                      ? "completed"
                      : current
                      ? "current"
                      : ""
                  }`}
                >
                  {completed
                    ? "✓"
                    : String(index + 1).padStart(2, "0")}
                </div>


                <div className="general-module-copy">

                  <small>
                    {module.label}
                  </small>

                  <strong>
                    {module.title}
                  </strong>

                </div>


                <div className="general-module-state">

                  {completed ? (
                    <span className="general-state-complete">
                      Completed
                    </span>
                  ) : current ? (
                    <span className="general-state-progress">
                      Start
                    </span>
                  ) : (
                    <span className="general-state-pending">
                      Not Started
                    </span>
                  )}

                  <span className="general-module-arrow">
                    ›
                  </span>

                </div>

              </Link>
            );
          })}

        </div>

      </section>


      {/* FINAL STEPS */}
      <section className="general-final-section">

        <div className="general-section-heading">

          <div>
            <div className="eyebrow">
              Final Steps
            </div>

            <h2>
              Complete Your Training
            </h2>
          </div>

        </div>


        <div className="general-final-grid">

          {/* KNOWLEDGE CHECK */}
          <Link
            href="/course/knowledge-check"
            className="general-final-card"
          >

            <div className="general-final-number">
              13
            </div>

            <div>
              <span>
                Practice
              </span>

              <h3>
                Knowledge Check
              </h3>

              <p>
                Complete 5 practice questions before moving
                to the Final Assessment.
              </p>
            </div>

            <div className="general-final-arrow">
              ›
            </div>

          </Link>


          {/* FINAL ASSESSMENT */}
          <Link
            href="/course/final-assessment"
            className="general-final-card assessment"
          >

            <div className="general-final-number">
              ✓
            </div>

            <div>
              <span>
                Assessment
              </span>

              <h3>
                Final Assessment
              </h3>

              <p>
                Complete the final assessment and achieve
                at least 80% to pass.
              </p>
            </div>

            <div className="general-final-arrow">
              ›
            </div>

          </Link>

        </div>

      </section>

    </main>
  );
}