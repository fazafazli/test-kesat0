"use client";

import { memo, useCallback, useId, useState, type ReactNode } from "react";

type Q = {
  id?: string | number;
  question: string;
  answer: ReactNode;
};

const faqData: Q[] = [
  { id: 1, question: "Question 1", answer: "Answer 1" },
  { id: 2, question: "Question 2", answer: "Answer 2" },
];

const FaqItem = memo(function FaqItem({
  index,
  item,
  isOpen,
  onToggle,
}: {
  index: number;
  item: Q;
  isOpen: boolean;
  onToggle: (idx: number) => void;
}) {
  const panelId = useId();

  const handleClick = useCallback(() => {
    onToggle(index);
  }, [onToggle, index]);

  return (
    <div className={`faq-item${isOpen ? " is-open" : ""}`}>
      <button
        id={`faq-trigger-${panelId}`}
        type="button"
        className="faq-trigger"
        aria-expanded={isOpen}
        aria-controls={`faq-panel-${panelId}`}
        onClick={handleClick}
      >
        <span className="faq-question">{item.question}</span>
        <span className="faq-chevron" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M2 5L7 10L12 5"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      <div
        id={`faq-panel-${panelId}`}
        className="faq-panel"
        role="region"
        aria-labelledby={`faq-trigger-${panelId}`}
      >
        <div className="faq-panel-inner">
          <div className="faq-answer">{item.answer}</div>
        </div>
      </div>
    </div>
  );
});

export default function FaqSection({
  data = faqData,
  allowMultiple = true,
  defaultOpenIndex,
}: {
  data?: Q[];
  allowMultiple?: boolean;
  defaultOpenIndex?: number;
}) {
  const [openIndexes, setOpenIndexes] = useState<Set<number>>(
    () => new Set(defaultOpenIndex !== undefined ? [defaultOpenIndex] : [])
  );

  const toggle = useCallback(
    (idx: number) => {
      setOpenIndexes((prev) => {
        const next = new Set(allowMultiple ? prev : []);
        if (prev.has(idx)) {
          next.delete(idx);
        } else {
          next.add(idx);
        }
        return next;
      });
    },
    [allowMultiple]
  );

  return (
    <div className="faq-list">
      {(data || []).map((item, idx) => (
        <FaqItem
          key={item.id ?? idx}
          index={idx}
          item={item}
          isOpen={openIndexes.has(idx)}
          onToggle={toggle}
        />
      ))}
    </div>
  );
}