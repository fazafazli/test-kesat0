"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "lucide-react";

import { cn } from "@/utils/cn";

function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

function AccordionItem({
  className,
  style,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item> & {
  style?: React.CSSProperties & { "--faq-i"?: number };
}) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("faq-item", className)}
      style={style}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn("faq-trigger group", className)}
        {...props}
      >
        <span className="faq-question">{children}</span>
        <span className="faq-chevron" aria-hidden="true">
          <ChevronDownIcon className="faq-chevron-icon" />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="faq-panel"
      {...props}
    >
      <div className={cn("faq-answer", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };