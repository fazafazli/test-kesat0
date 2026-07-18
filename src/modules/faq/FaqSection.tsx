"use client";

import { memo, type CSSProperties, type ReactNode } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";

export type FaqItem = {
  id?: string | number;
  question: string;
  answer: ReactNode;
};

interface FaqSectionProps {
  data: FaqItem[];
  allowMultiple?: boolean;
  defaultOpenIndex?: number;
}

function FaqSection({
  data,
  allowMultiple = true,
  defaultOpenIndex,
}: FaqSectionProps) {
  const defaultValue =
    defaultOpenIndex !== undefined
      ? `faq-${defaultOpenIndex}`
      : undefined;

  const itemStyle = (idx: number): CSSProperties =>
    ({ "--faq-i": idx } as CSSProperties);

  if (allowMultiple) {
    return (
      <Accordion
        type="multiple"
        defaultValue={defaultValue ? [defaultValue] : undefined}
        className="faq-list"
      >
        {data.map((item, idx) => (
          <AccordionItem
            key={item.id ?? idx}
            value={`faq-${idx}`}
            style={itemStyle(idx)}
          >
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    );
  }

  return (
    <Accordion
      type="single"
      collapsible
      defaultValue={defaultValue}
      className="faq-list"
    >
      {data.map((item, idx) => (
        <AccordionItem
          key={item.id ?? idx}
          value={`faq-${idx}`}
          style={itemStyle(idx)}
        >
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export default memo(FaqSection);