
"use client";

import { useState } from "react";

type Card = {
  title: string;
  text: string;
  icon?: string;
};

export default function FlipCardGrid({
  cards,
}: {
  cards: Card[];
}) {
  const [currentPage, setCurrentPage] = useState(0);
  const [flipped, setFlipped] = useState<Set<number>>(
    new Set()
  );

  // Each page displays up to 3, 3, 3, and 1 cards.
  // For other modules or different card counts,
  // additional pages are generated automatically.
  const pageSizes: number[] = [];
  let remaining = cards.length;

  for (const preferredSize of [3, 3, 3, 1]) {
    if (remaining <= 0) break;
    const size = Math.min(preferredSize, remaining);
    pageSizes.push(size);
    remaining -= size;
  }

  while (remaining > 0) {
    const size = Math.min(3, remaining);
    pageSizes.push(size);
    remaining -= size;
  }

  const totalPages = pageSizes.length;
  const page = Math.min(
    currentPage,
    Math.max(totalPages - 1, 0)
  );

  const startIndex = pageSizes
    .slice(0, page)
    .reduce((sum, size) => sum + size, 0);

  const visibleCards = cards.slice(
    startIndex,
    startIndex + (pageSizes[page] ?? 0)
  );

  function toggleCard(index: number) {
    setFlipped((current) => {
      const next = new Set(current);

      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }

      return next;
    });
  }

  function changePage(nextPage: number) {
    if (nextPage < 0 || nextPage >= totalPages) return;

    setCurrentPage(nextPage);
    setFlipped(new Set());
  }

  if (cards.length === 0) return null;

  return (
    <div className="flip-carousel">
      <div
        className="flip-grid flip-carousel-grid"
        key={page}
      >
        {visibleCards.map((card, index) => {
          const actualIndex = startIndex + index;
          const isFlipped = flipped.has(actualIndex);

          return (
            <button
              key={actualIndex}
              type="button"
              className={`flip-card ${
                isFlipped ? "is-flipped" : ""
              }`}
              onClick={() => toggleCard(actualIndex)}
              aria-label={`${
                card.title
              }. Click to ${
                isFlipped ? "return" : "reveal"
              }`}
              aria-pressed={isFlipped}
            >
              <div className="flip-card-inner">

                {/* FRONT */}
                <div className="flip-card-face flip-card-front">
                  {card.icon && (
                    <div className="flip-card-icon">
                      {card.icon}
                    </div>
                  )}

                  <h3>{card.title}</h3>

                  <span className="flip-hint">
                    Click to reveal
                  </span>
                </div>

                {/* BACK */}
                <div className="flip-card-face flip-card-back">
                  <h3>{card.title}</h3>

                  <p>{card.text}</p>

                  <span className="flip-hint">
                    Click to return
                  </span>
                </div>

              </div>
            </button>
          );
        })}
      </div>

      {totalPages > 1 && (
        <div className="flip-carousel-controls">
          <button
            type="button"
            className="flip-nav-button"
            onClick={() => changePage(page - 1)}
            disabled={page === 0}
          >
            ← Previous
          </button>

          <div className="flip-page-indicator">
            <span>
              {page + 1} / {totalPages}
            </span>

            <div className="flip-page-dots">
              {pageSizes.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  className={`flip-page-dot ${
                    page === index ? "active" : ""
                  }`}
                  onClick={() => changePage(index)}
                  aria-label={`Go to page ${index + 1}`}
                  aria-current={
                    page === index ? "page" : undefined
                  }
                />
              ))}
            </div>
          </div>

          <button
            type="button"
            className="flip-nav-button flip-nav-next"
            onClick={() => changePage(page + 1)}
            disabled={page === totalPages - 1}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
