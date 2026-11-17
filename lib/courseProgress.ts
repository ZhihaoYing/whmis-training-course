export function getCompletedModules(): string[] {
  if (typeof window === "undefined") return [];

  const saved = localStorage.getItem("whmisCompletedModules");

  if (!saved) return [];

  try {
    return JSON.parse(saved);
  } catch {
    return [];
  }
}

export function isModuleComplete(slug: string): boolean {
  return getCompletedModules().includes(slug);
}

export function markModuleComplete(slug: string) {
  if (typeof window === "undefined") return;

  const completed = getCompletedModules();

  if (!completed.includes(slug)) {
    const updated = [...completed, slug];

    localStorage.setItem(
      "whmisCompletedModules",
      JSON.stringify(updated)
    );

    // 通知 CourseShell：
    // progress 已经发生变化
    window.dispatchEvent(
      new Event("whmis-progress-updated")
    );
  }
}

export function resetCourseProgress() {
  if (typeof window === "undefined") return;

  localStorage.removeItem("whmisCompletedModules");
}