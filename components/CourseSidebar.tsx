"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  isModuleComplete,
} from "../lib/courseProgress";

type ModuleItem = {
  slug: string;
  label: string;
  title: string;
};

type Props = {
  modules: ModuleItem[];
  currentSlug: string;
};

export default function CourseSidebar({
  modules,
  currentSlug,
}: Props) {
  const [completedModules, setCompletedModules] =
    useState<string[]>([]);

  function refreshProgress() {
    const completed = modules
      .filter((item) =>
        isModuleComplete(item.slug)
      )
      .map((item) => item.slug);

    setCompletedModules(completed);
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
  }, [modules]);

  function isUnlocked(index: number) {
    // Module 1 always unlocked
    if (index === 0) {
      return true;
    }

    // Previous module must be complete
    const previousModule =
      modules[index - 1];

    return completedModules.includes(
      previousModule.slug
    );
  }

  return (
    <aside className="sidebar">

      <div className="side-title">
        Course Modules
      </div>

      <nav className="nav-list">

        {modules.map((item, index) => {
          const active =
            item.slug === currentSlug;

          const completed =
            completedModules.includes(
              item.slug
            );

          const unlocked =
            isUnlocked(index);

          if (!unlocked) {
            return (
              <div
                key={item.slug}
                className="nav-item locked"
                title="Complete the previous module first"
              >
                <span className="nav-dot" />

                <span>
                  <small>
                    {item.label}
                  </small>

                  <strong>
                    {item.title}
                  </strong>
                </span>

                <span className="nav-lock">
                  🔒
                </span>
              </div>
            );
          }

          return (
            <Link
              key={item.slug}
              href={`/course/${item.slug}`}
              className={`nav-item ${
                active ? "active" : ""
              } ${
                completed
                  ? "completed"
                  : ""
              }`}
            >
              <span className="nav-dot" />

              <span>
                <small>
                  {item.label}
                </small>

                <strong>
                  {item.title}
                </strong>
              </span>

              {completed && (
                <span className="nav-complete">
                  ✓
                </span>
              )}
            </Link>
          );
        })}

      </nav>

      <div className="sidebar-final">

        {completedModules.length ===
        modules.length ? (
          <Link
            href="/course/final-assessment"
            className="nav-item final-link"
          >
            <span className="nav-dot" />

            <span>
              <small>
                Assessment
              </small>

              <strong>
                Final Assessment
              </strong>
            </span>
          </Link>
        ) : (
          <div
            className="nav-item final-link locked"
            title="Complete all modules first"
          >
            <span className="nav-dot" />

            <span>
              <small>
                Assessment
              </small>

              <strong>
                Final Assessment
              </strong>
            </span>

            <span className="nav-lock">
              🔒
            </span>
          </div>
        )}

      </div>

    </aside>
  );
}