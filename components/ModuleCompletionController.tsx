"use client";

import { useEffect, useRef, useState } from "react";
import {
  isModuleComplete,
  markModuleComplete,
} from "../lib/courseProgress";

type Props = {
  slug: string;
  requiresActivity: boolean;
};

export default function ModuleCompletionController({
  slug,
  requiresActivity,
}: Props) {
  const [readingComplete, setReadingComplete] = useState(false);

  const [activityComplete, setActivityComplete] = useState(
    !requiresActivity
  );

  const [moduleComplete, setModuleComplete] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Check whether this module was already completed before
  useEffect(() => {
    if (isModuleComplete(slug)) {
      setReadingComplete(true);
      setActivityComplete(true);
      setModuleComplete(true);
    }
  }, [slug]);

  // Detect when learner reaches the bottom of the module
  useEffect(() => {
    const element = bottomRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setReadingComplete(true);
        }
      },
      {
        threshold: 0.6,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  // Listen for quiz/activity completion
  useEffect(() => {
    function handleActivityComplete(event: Event) {
      const customEvent = event as CustomEvent<{
        slug: string;
      }>;

      if (customEvent.detail?.slug === slug) {
        setActivityComplete(true);
      }
    }

    window.addEventListener(
      "whmis-activity-complete",
      handleActivityComplete
    );

    return () => {
      window.removeEventListener(
        "whmis-activity-complete",
        handleActivityComplete
      );
    };
  }, [slug]);

  // Automatically complete the module
  useEffect(() => {
    if (
      readingComplete &&
      activityComplete &&
      !moduleComplete
    ) {
      markModuleComplete(slug);
      setModuleComplete(true);
    }
  }, [
    readingComplete,
    activityComplete,
    moduleComplete,
    slug,
  ]);

  return (
    <div ref={bottomRef} className="module-status">
      <div className="status-title">
        Module progress
      </div>

      <div className="status-row">
        <span>
          {readingComplete ? "✓" : "○"}
        </span>

        <span>
          Course material reviewed
        </span>
      </div>

      {requiresActivity && (
        <div className="status-row">
          <span>
            {activityComplete ? "✓" : "○"}
          </span>

          <span>
            Required activity completed
          </span>
        </div>
      )}

      {moduleComplete ? (
        <div className="success-message">
          ✓ Module completed — Next Module is now
          unlocked.
        </div>
      ) : (
        <div className="locked-message">
          🔒 Complete all requirements to continue.
        </div>
      )}

      <style jsx>{`
        .module-status {
          margin-top: 32px;
          padding: 22px;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 14px;
        }

        .status-title {
          margin-bottom: 14px;
          color: #111827;
          font-size: 16px;
          font-weight: 700;
        }

        .status-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 8px;
          color: #4b5563;
        }

        .success-message {
          margin-top: 18px;
          padding: 14px 16px;
          background: #ecfdf3;
          border: 1px solid #a7f3d0;
          border-radius: 10px;
          color: #166534;
          font-weight: 700;
        }

        .locked-message {
          margin-top: 18px;
          padding: 14px 16px;
          background: #f8fafc;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          color: #6b7280;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}