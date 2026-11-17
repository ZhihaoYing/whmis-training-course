"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { isModuleComplete } from "../lib/courseProgress";

type Props = {
  slug: string;
  prev?: string;
  next?: string;
};

export default function ModuleProgressGate({
  slug,
  prev,
  next,
}: Props) {
  const [completed, setCompleted] = useState(false);

  function refreshProgress() {
    setCompleted(isModuleComplete(slug));
  }

  useEffect(() => {
    refreshProgress();

    window.addEventListener(
      "whmis-progress-updated",
      refreshProgress
    );

    return () => {
      window.removeEventListener(
        "whmis-progress-updated",
        refreshProgress
      );
    };
  }, [slug]);

  const nextHref =
    next === "final-assessment"
      ? "/course/final-assessment"
      : next
      ? `/course/${next}`
      : "";

  return (
    <div className="module-navigation">
      {/* STATUS */}
      {!completed && (
        <div className="locked-message">
          🔒 Complete all required materials and activities
          before continuing.
        </div>
      )}

      {completed && (
        <div className="completed-message">
          ✓ Module completed — the next module is now unlocked.
        </div>
      )}

      {/* NAVIGATION */}
      <div className="bottom-nav">
        {prev ? (
          <Link
            className="nav-btn"
            href={`/course/${prev}`}
          >
            ← Previous
          </Link>
        ) : (
          <span />
        )}

        {next ? (
          completed ? (
            <Link
              className="nav-btn primary"
              href={nextHref}
            >
              Next Module →
            </Link>
          ) : (
            <button
              type="button"
              className="nav-btn locked"
              disabled
            >
              🔒 Next Module
            </button>
          )
        ) : (
          <span />
        )}
      </div>

      <style jsx>{`
        .module-navigation {
          margin-top: 28px;
        }

        .locked-message,
        .completed-message {
          padding: 16px 18px;
          margin-bottom: 20px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 600;
        }

        .locked-message {
          background: #f8fafc;
          border: 1px solid #e5e7eb;
          color: #6b7280;
        }

        .completed-message {
          background: #ecfdf3;
          border: 1px solid #a7f3d0;
          color: #166534;
        }

        .bottom-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
        }

        .nav-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 44px;
          padding: 11px 20px;

          border: 1px solid #d1d5db;
          border-radius: 9px;

          background: white;
          color: #111827;

          text-decoration: none;
          font-weight: 700;

          transition:
            transform 0.18s ease,
            box-shadow 0.18s ease,
            background 0.18s ease;
        }

        .nav-btn:hover {
          transform: translateY(-2px);
        }

        .nav-btn.primary {
          background: #3157c8;
          border-color: #3157c8;
          color: white;
        }

        .nav-btn.primary:hover {
          box-shadow: 0 6px 16px
            rgba(49, 87, 200, 0.25);
        }

        .nav-btn.locked {
          border: none;
          background: #d1d5db;
          color: #6b7280;
          cursor: not-allowed;
          transform: none;
        }

        @media (max-width: 700px) {
          .bottom-nav {
            flex-direction: column;
            align-items: stretch;
          }
        }
      `}</style>
    </div>
  );
}