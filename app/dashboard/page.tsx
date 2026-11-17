import Link from "next/link";

const CheckIcon = () => (
  <span className="dash-check">✓</span>
);

export default function DashboardPage() {
  return (
    <main className="employee-dashboard">

      {/* HEADER */}
      <header className="employee-dashboard-header">
        <div>
          <div className="eyebrow">
            Employee Training
          </div>

          <h1>
            Your Training
          </h1>

          <p>
            Complete your general WHMIS training and any
            company-specific SDS assignments.
          </p>
        </div>

        <div className="employee-pill">
          Employee
        </div>
      </header>


      <div className="dashboard-training-grid">

        {/* =====================================================
            GENERAL WHMIS TRAINING
        ====================================================== */}

        <section className="dashboard-training-card general-training-card">

          <div className="training-card-top">

            <div className="training-card-heading">

              <div className="dashboard-number">
                01
              </div>

              <div>
                <div className="dashboard-card-label">
                  General Training
                </div>

                <h2>
                  WHMIS 2015 Training
                </h2>
              </div>

            </div>


            <div className="general-training-visual">

              <div className="hazard-diamond">
                !
              </div>

              <div className="whmis-book">
                <span>WHMIS</span>
                <strong>2015</strong>
              </div>

            </div>

          </div>


          <p className="dashboard-card-description">
            Learn WHMIS fundamentals including hazard classes,
            pictograms, labels, Safety Data Sheets, PPE,
            safe handling, emergency response, and worker rights.
          </p>


          {/* STATUS */}

          <div className="general-status-panel">

            <div className="general-status-block">

              <span className="dashboard-mini-label">
                Training Status
              </span>

              <strong className="status-in-progress">
                <span className="status-circle" />
                In Progress
              </strong>

              <p>
                Continue your training to complete WHMIS 2015.
              </p>

            </div>


            <div className="general-completion-block">

              <span className="dashboard-mini-label">
                Completion
              </span>

              <strong className="completion-number">
                60%
              </strong>

              <div className="dashboard-progress-track">
                <span style={{ width: "60%" }} />
              </div>

            </div>

          </div>


          {/* WHAT YOU'LL LEARN */}

          <div className="dashboard-section">

            <h3>
              What You’ll Learn
            </h3>

            <div className="learning-list">

              <div>
                <CheckIcon />
                <span>
                  Understand WHMIS 2015 and your responsibilities
                </span>
              </div>

              <div>
                <CheckIcon />
                <span>
                  Use appropriate PPE and safe handling practices
                </span>
              </div>

              <div>
                <CheckIcon />
                <span>
                  Recognize hazards using pictograms and labels
                </span>
              </div>

              <div>
                <CheckIcon />
                <span>
                  Know what to do in an emergency
                </span>
              </div>

              <div>
                <CheckIcon />
                <span>
                  Read and use Safety Data Sheets safely
                </span>
              </div>

              <div>
                <CheckIcon />
                <span>
                  Understand your worker rights and protections
                </span>
              </div>

            </div>

          </div>


          {/* TRAINING DETAILS */}

          <div className="dashboard-section">

            <h3>
              Training Details
            </h3>

            <div className="training-detail-grid">

              <div className="training-detail-card">
                <div className="detail-icon">◷</div>

                <span>
                  Estimated Duration
                </span>

                <strong>
                  ~45 minutes
                </strong>
              </div>


              <div className="training-detail-card">
                <div className="detail-icon">▱</div>

                <span>
                  Modules
                </span>

                <strong>
                  12 modules
                </strong>
              </div>


              <div className="training-detail-card">
                <div className="detail-icon">✓</div>

                <span>
                  Knowledge Check
                </span>

                <strong>
                  5 questions
                </strong>
              </div>


              <div className="training-detail-card">
                <div className="detail-icon">★</div>

                <span>
                  Final Assessment
                </span>

                <strong>
                  80% to pass
                </strong>
              </div>

            </div>

          </div>


          {/* MODULE PROGRESS */}

          <div className="module-progress-section">

            <div className="module-progress-header">

              <strong>
                Module Progress
              </strong>

              <span>
                7 of 12 modules completed
              </span>

            </div>

            <div className="dashboard-progress-track large">
              <span style={{ width: "58%" }} />
            </div>

          </div>


          {/* GENERAL BUTTON */}

          <Link
            href="/general-training"
            className="dashboard-primary-button"
          >
            View General Training →
          </Link>

        </section>


        {/* =====================================================
            SPECIFIC SDS TRAINING
        ====================================================== */}

        <section className="dashboard-training-card specific-training-card">

          <div className="training-card-top">

            <div className="training-card-heading">

              <div className="dashboard-number">
                02
              </div>

              <div>
                <div className="dashboard-card-label">
                  Company-Specific
                </div>

                <h2>
                  Specific SDS Training
                </h2>
              </div>

            </div>


            <div className="specific-training-visual">

              <div className="sds-paper">
                <strong>SDS</strong>

                <span />
                <span />
                <span />

                <div className="sds-check">
                  ✓
                </div>
              </div>


              <div className="chemical-bottle">
                !
              </div>

            </div>

          </div>


          <p className="dashboard-card-description">
            Review Safety Data Sheets assigned by your employer
            and complete product-specific training questions.
          </p>


          {/* SDS STATS */}

          <div className="sds-stat-panel">

            <div className="sds-stat-item">

              <div className="sds-stat-icon">
                ▤
              </div>

              <div>
                <span>
                  Assigned SDS
                </span>

                <strong>
                  8
                </strong>

                <small>
                  Safety Data Sheets
                </small>
              </div>

            </div>


            <div className="sds-stat-item">

              <div className="sds-stat-icon">
                ◫
              </div>

              <div>
                <span>
                  Assignments
                </span>

                <strong>
                  8
                </strong>

                <small>
                  Training assignments
                </small>
              </div>

            </div>


            <div className="sds-stat-item">

              <div className="sds-stat-icon">
                ✓
              </div>

              <div>
                <span>
                  Completion
                </span>

                <strong>
                  5 of 8
                </strong>

                <small>
                  63% complete
                </small>
              </div>

            </div>

          </div>


          {/* DUE SOON */}

          <div className="due-soon-card">

            <div className="due-calendar">
              □
            </div>

            <div className="due-copy">

              <div>
                <span className="due-badge">
                  Due Soon
                </span>

                <strong>
                  3 assignments due in 5 days
                </strong>
              </div>

              <p>
                Complete your assigned SDS training before the deadline.
              </p>

            </div>

            <span className="due-arrow">
              ›
            </span>

          </div>


          {/* TRAINING INCLUDES */}

          <div className="dashboard-section">

            <h3>
              Training Includes
            </h3>

            <div className="specific-feature-grid">

              <div className="specific-feature-card">

                <div className="feature-icon">
                  ▤
                </div>

                <div>
                  <strong>
                    Assigned SDS Documents
                  </strong>

                  <span>
                    Review the SDSs for your work area
                  </span>
                </div>

              </div>


              <div className="specific-feature-card">

                <div className="feature-icon">
                  ?
                </div>

                <div>
                  <strong>
                    Product-Specific Questions
                  </strong>

                  <span>
                    Confirm your understanding of key risks
                  </span>
                </div>

              </div>


              <div className="specific-feature-card">

                <div className="feature-icon">
                  ▥
                </div>

                <div>
                  <strong>
                    Completion Tracking
                  </strong>

                  <span>
                    See your progress for each assignment
                  </span>
                </div>

              </div>


              <div className="specific-feature-card">

                <div className="feature-icon">
                  ★
                </div>

                <div>
                  <strong>
                    Score History
                  </strong>

                  <span>
                    View past results and attempts
                  </span>
                </div>

              </div>

            </div>

          </div>


          {/* RECENT ACTIVITY */}

          <div className="dashboard-section recent-section">

            <div className="recent-heading">

              <h3>
                Recent Activity
              </h3>

              <Link href="/specific-training">
                View All Activity →
              </Link>

            </div>


            <div className="recent-activity-list">

              <div className="recent-activity-item">

                <div className="activity-status completed">
                  ✓
                </div>

                <div className="activity-copy">

                  <strong>
                    Acetone (SDS)
                  </strong>

                  <span>
                    Completed
                  </span>

                </div>

                <span className="activity-score">
                  100%
                </span>

              </div>


              <div className="recent-activity-item">

                <div className="activity-status progress">
                  ▶
                </div>

                <div className="activity-copy">

                  <strong>
                    Isopropyl Alcohol (SDS)
                  </strong>

                  <span>
                    In Progress • 60% complete
                  </span>

                </div>

                <Link
                  href="/specific-training"
                  className="continue-link"
                >
                  Continue ›
                </Link>

              </div>

            </div>

          </div>


          {/* SPECIFIC BUTTON */}

          <Link
            href="/specific-training"
            className="dashboard-secondary-button"
          >
            View SDS Assignments →
          </Link>

        </section>

      </div>

    </main>
  );
}