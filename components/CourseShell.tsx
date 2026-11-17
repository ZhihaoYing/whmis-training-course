"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { modules } from "../lib/course";
import { getCompletedModules } from "../lib/courseProgress";

export default function CourseShell({
  slug,
  children,
}: {
  slug: string;
  children: React.ReactNode;
}) {
  const idx = modules.findIndex((m) => m.slug === slug);

  const pct =
    idx >= 0
      ? Math.round(((idx + 1) / modules.length) * 100)
      : 100;

  const [completedModules, setCompletedModules] = useState<string[]>([]);

  function refreshProgress() {
    setCompletedModules(getCompletedModules());
  }

  useEffect(() => {
    refreshProgress();

    // 当课程完成状态发生变化时，立即刷新左侧菜单
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
  }, []);

  const allModulesComplete = modules.every((module) =>
    completedModules.includes(module.slug)
  );

  return (
    <div className="page-shell">
      <div className="topbar">
        <div className="brand">
          <span className="brand-mark">W</span>
          <span>WHMIS 2015 & SDS Training</span>
        </div>

        <div className="top-meta">
          <span>
            {idx >= 0
              ? `${idx + 1} / ${modules.length}`
              : "Final Assessment"}
          </span>

          <div className="progress-mini">
            <span
              style={{
                width: `${pct}%`,
              }}
            />
          </div>
        </div>
      </div>

      <div className="layout">
        <aside className="sidebar">
          <div className="side-title">
            Course modules
          </div>

          <nav className="nav-list">
            {modules.map((module, index) => {
              const completed =
                completedModules.includes(module.slug);

              const unlocked =
                index === 0 ||
                completedModules.includes(
                  modules[index - 1].slug
                );

              // 已解锁 Module
              if (unlocked) {
                return (
                  <Link
                    key={module.slug}
                    href={`/course/${module.slug}`}
                    className={`nav-item ${
                      module.slug === slug
                        ? "active"
                        : ""
                    }`}
                  >
                    <span className="nav-dot" />

                    <span>
                      <b>
                        {completed ? "✓ " : ""}
                        {module.label}
                      </b>

                      <br />

                      {module.title}
                    </span>
                  </Link>
                );
              }

              // 未解锁 Module
              return (
                <div
                  key={module.slug}
                  className="nav-item"
                  style={{
                    opacity: 0.42,
                    cursor: "not-allowed",
                    userSelect: "none",
                  }}
                  title="Complete the previous module to unlock this module."
                >
                  <span className="nav-dot" />

                  <span>
                    <b>
                      🔒 {module.label}
                    </b>

                    <br />

                    {module.title}
                  </span>
                </div>
              );
            })}

            {/* Final Assessment */}
            {allModulesComplete ? (
              <Link
                href="/course/final-assessment"
                className={`nav-item ${
                  slug === "final-assessment"
                    ? "active"
                    : ""
                }`}
              >
                <span className="nav-dot" />

                <span>
                  <b>Final</b>
                  <br />
                  Final Assessment
                </span>
              </Link>
            ) : (
              <div
                className="nav-item"
                style={{
                  opacity: 0.42,
                  cursor: "not-allowed",
                  userSelect: "none",
                }}
                title="Complete all modules before taking the final assessment."
              >
                <span className="nav-dot" />

                <span>
                  <b>🔒 Final</b>
                  <br />
                  Final Assessment
                </span>
              </div>
            )}
          </nav>
        </aside>

        <main className="main">{children}</main>
      </div>
    </div>
  );
}