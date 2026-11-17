"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

/* =========================================================
   TYPES
========================================================= */

type Assignment = {
  id: string;
  number: string;
  title: string;
  status:
    | "IN PROGRESS"
    | "NOT STARTED"
    | "COMPLETED";
  due: string;
  chemicals: string[];
  chemicalIds: string[];
  completed: number;
  questions: number;
};

/* =========================================================
   BASE ASSIGNMENTS
========================================================= */

const baseAssignments: Assignment[] = [
  {
    id: "assignment-001",
    number: "Assignment 001",
    title: "",
    status: "NOT STARTED",
    due: "Due in 5 days",

    chemicals: [
      "Acetone",
      "Benzene",
      "Isopropyl Alcohol",
    ],

    chemicalIds: [
      "acetone",
      "benzene",
      "isopropyl-alcohol",
    ],

    completed: 0,
    questions: 15,
  },

  {
    id: "assignment-002",
    number: "Assignment 002",
    title: "",
    status: "NOT STARTED",
    due: "Due in 12 days",

    chemicals: [
      "Industrial Cleaner",
      "Paint Thinner",
      "Solvent Cleaner",
    ],

    chemicalIds: [
      "industrial-cleaner",
      "paint-thinner",
      "solvent-cleaner",
    ],

    completed: 0,
    questions: 15,
  },

  {
    id: "assignment-003",
    number: "Assignment 003",
    title: "",
    status: "NOT STARTED",
    due: "Due in 20 days",

    chemicals: [
      "Primer",
      "Degreaser",
    ],

    chemicalIds: [
      "primer",
      "degreaser",
    ],

    completed: 0,
    questions: 10,
  },
];

/* =========================================================
   STORAGE KEYS
========================================================= */

const STORAGE_KEYS: Record<
  string,
  string
> = {
  "assignment-001":
    "specificAssignment001Progress",

  "assignment-002":
    "specificAssignment002Progress",

  "assignment-003":
    "specificAssignment003Progress",
};

/* =========================================================
   PAGE
========================================================= */

export default function SpecificTrainingPage() {
  const [
    savedProgress,
    setSavedProgress,
  ] = useState<
    Record<string, string[]>
  >({
    "assignment-001": [],
    "assignment-002": [],
    "assignment-003": [],
  });

  /* =======================================================
     LOAD ALL ASSIGNMENT PROGRESS
  ======================================================= */

  useEffect(() => {
    function loadAllProgress() {
      const nextProgress: Record<
        string,
        string[]
      > = {
        "assignment-001": [],
        "assignment-002": [],
        "assignment-003": [],
      };

      Object.entries(
        STORAGE_KEYS
      ).forEach(
        ([
          assignmentId,
          storageKey,
        ]) => {
          const saved =
            localStorage.getItem(
              storageKey
            );

          if (!saved) {
            nextProgress[
              assignmentId
            ] = [];

            return;
          }

          try {
            const parsed =
              JSON.parse(saved);

            nextProgress[
              assignmentId
            ] = Array.isArray(parsed)
              ? parsed
              : [];
          } catch {
            nextProgress[
              assignmentId
            ] = [];
          }
        }
      );

      setSavedProgress(
        nextProgress
      );
    }

    loadAllProgress();

    /*
      Reload progress whenever the page
      becomes active again.
    */

    window.addEventListener(
      "focus",
      loadAllProgress
    );

    /*
      Also reload when returning to this
      page through browser navigation.
    */

    window.addEventListener(
      "pageshow",
      loadAllProgress
    );

    return () => {
      window.removeEventListener(
        "focus",
        loadAllProgress
      );

      window.removeEventListener(
        "pageshow",
        loadAllProgress
      );
    };
  }, []);

  /* =======================================================
     BUILD LIVE ASSIGNMENT DATA
  ======================================================= */

  const assignments =
    baseAssignments.map(
      (assignment) => {
        const completedIds =
          savedProgress[
            assignment.id
          ] ?? [];

        /*
          Only count chemical IDs that
          actually belong to this assignment.
        */

        const completedCount =
          completedIds.filter(
            (id) =>
              assignment.chemicalIds.includes(
                id
              )
          ).length;

        let status: Assignment["status"] =
          "NOT STARTED";

        if (
          completedCount ===
            assignment.chemicalIds
              .length &&
          completedCount > 0
        ) {
          status =
            "COMPLETED";
        } else if (
          completedCount > 0
        ) {
          status =
            "IN PROGRESS";
        }

        return {
          ...assignment,
          completed:
            completedCount,
          status,
        };
      }
    );

  /* =======================================================
     OVERVIEW
  ======================================================= */

  const totalAssignments =
    assignments.length;

  const completedAssignments =
    assignments.filter(
      (item) =>
        item.status ===
        "COMPLETED"
    ).length;

  const inProgressAssignments =
    assignments.filter(
      (item) =>
        item.status ===
        "IN PROGRESS"
    ).length;

  const notStartedAssignments =
    assignments.filter(
      (item) =>
        item.status ===
        "NOT STARTED"
    ).length;

  const attentionCount =
    assignments.filter(
      (item) =>
        item.status !==
        "COMPLETED"
    ).length;

  /* =======================================================
     UI
  ======================================================= */

  return (
    <main className="specific-page">

      {/* HEADER */}

      <header className="specific-page-header">

        <div>

          <Link
            href="/dashboard"
            className="specific-back-button"
          >
            ← Back to Dashboard
          </Link>

          <div className="eyebrow">
            Specific WHMIS Training
          </div>

          <h1>
            SDS Training Assignments
          </h1>

          <p>
            Complete the Safety Data
            Sheet training assigned to
            your workplace role.
          </p>

        </div>

      </header>

      {/* OVERVIEW */}

      <section className="specific-overview">

        <div className="specific-overview-card">

          <span>
            Total Assignments
          </span>

          <strong>
            {totalAssignments}
          </strong>

          <small>
            Assigned to you
          </small>

        </div>

        <div className="specific-overview-card">

          <span>
            In Progress
          </span>

          <strong>
            {inProgressAssignments}
          </strong>

          <small>
            Currently active
          </small>

        </div>

        <div className="specific-overview-card">

          <span>
            Completed
          </span>

          <strong>
            {completedAssignments}
          </strong>

          <small>
            Finished training
          </small>

        </div>

        <div className="specific-overview-card">

          <span>
            Not Started
          </span>

          <strong>
            {notStartedAssignments}
          </strong>

          <small>
            Waiting to begin
          </small>

        </div>

      </section>

      {/* NOTICE */}

      <section className="specific-notice">

        <div className="specific-notice-icon">
          !
        </div>

        <div>

          <strong>
            {attentionCount}{" "}
            assignments still require
            your attention
          </strong>

          <p>
            Complete each SDS review and
            all related questions before
            the assignment deadline.
          </p>

        </div>

      </section>

      {/* SECTION HEADER */}

      <section className="specific-section-header">

        <div>

          <div className="eyebrow">
            Assigned Training
          </div>

          <h2>
            Your SDS Assignments
          </h2>

        </div>

        <span className="specific-assignment-count">
          {totalAssignments} Assignments
        </span>

      </section>

      {/* ASSIGNMENTS */}

      <section className="specific-assignment-list">

        {assignments.map(
          (assignment) => {

            const totalSDS =
              assignment.chemicals
                .length;

            const progress =
              totalSDS === 0
                ? 0
                : Math.round(
                    (assignment.completed /
                      totalSDS) *
                      100
                  );

            const completed =
              assignment.status ===
              "COMPLETED";

            const inProgress =
              assignment.status ===
              "IN PROGRESS";

            const statusClass =
              completed
                ? "complete"
                : inProgress
                ? "progress"
                : "pending";

            return (
              <article
                key={
                  assignment.id
                }
                className={`specific-assignment-card ${
                  completed
                    ? "completed"
                    : ""
                }`}
              >

                <div className="assignment-main">

                  {/* STATUS */}

                  <div className="assignment-status-area">

                    <div
                      className={`assignment-status-icon ${statusClass}`}
                    >
                      {completed
                        ? "✓"
                        : inProgress
                        ? "▶"
                        : "○"}
                    </div>

                  </div>

                  {/* CONTENT */}

                  <div className="assignment-content">

                    {/* HEADING */}

                    <div className="assignment-heading-row">

                      <div>

                        <span
                          className={`assignment-status-badge ${statusClass}`}
                        >
                          {
                            assignment.status
                          }
                        </span>

                        <div
                          style={{
                            marginTop:
                              "11px",

                            color:
                              "#3157c8",

                            fontSize:
                              "10px",

                            fontWeight:
                              900,

                            letterSpacing:
                              ".07em",

                            textTransform:
                              "uppercase",
                          }}
                        >
                          {
                            assignment.number
                          }
                        </div>

                        {assignment.title && (
                          <h3>
                            {
                              assignment.title
                            }
                          </h3>
                        )}

                      </div>

                      <span
                        className={`assignment-due ${
                          completed
                            ? "complete"
                            : ""
                        }`}
                      >
                        {completed
                          ? "Completed"
                          : assignment.due}
                      </span>

                    </div>

                    {/* SDS DOCUMENTS */}

                    <div className="assignment-sds-section">

                      <span className="assignment-mini-title">
                        Assigned SDS Documents
                      </span>

                      <div className="assignment-sds-list">

                        {assignment.chemicals.map(
                          (
                            chemical,
                            index
                          ) => {

                            const chemicalId =
                              assignment
                                .chemicalIds[
                                index
                              ];

                            const chemicalCompleted =
                              (
                                savedProgress[
                                  assignment
                                    .id
                                ] ?? []
                              ).includes(
                                chemicalId
                              );

                            return (
                              <div
                                key={
                                  chemical
                                }
                                className="assignment-list-sds-item"
                              >

                                <div className="assignment-document-icon">
                                  {chemicalCompleted
                                    ? "✓"
                                    : "SDS"}
                                </div>

                                <div>

                                  <strong>
                                    {
                                      chemical
                                    }
                                  </strong>

                                  <span>
                                    {chemicalCompleted
                                      ? "Completed"
                                      : "Safety Data Sheet"}
                                  </span>

                                </div>

                                <div className="assignment-document-number">

                                  {chemicalCompleted
                                    ? "✓"
                                    : String(
                                        index +
                                          1
                                      ).padStart(
                                        2,
                                        "0"
                                      )}

                                </div>

                              </div>
                            );
                          }
                        )}

                      </div>

                    </div>

                    {/* PROGRESS */}

                    <div className="assignment-progress-area">

                      <div className="assignment-progress-heading">

                        <strong>
                          Assignment Progress
                        </strong>

                        <span>
                          {
                            assignment.completed
                          }{" "}
                          of {totalSDS} SDS
                          completed
                        </span>

                      </div>

                      <div className="assignment-progress-track">

                        <span
                          style={{
                            width: `${progress}%`,
                          }}
                        />

                      </div>

                    </div>

                    {/* FOOTER */}

                    <div className="assignment-footer">

                      <div className="assignment-meta">

                        <span>
                          {totalSDS} SDS
                        </span>

                        <span>
                          {
                            assignment.questions
                          }{" "}
                          Questions
                        </span>

                        <span>
                          80% Passing Score
                        </span>

                      </div>

                      <Link
                        href={`/specific-training/assignment/${assignment.id}`}
                        className={`assignment-button ${
                          completed
                            ? "completed"
                            : ""
                        }`}
                      >

                        {completed
                          ? "Review Training →"
                          : inProgress
                          ? "Continue Training →"
                          : "Start Training →"}

                      </Link>

                    </div>

                  </div>

                </div>

              </article>
            );
          }
        )}

      </section>

    </main>
  );
}