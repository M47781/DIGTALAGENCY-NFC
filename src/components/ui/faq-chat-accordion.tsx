"use client";

import * as React from "react";
import { motion } from "framer-motion";
import * as Accordion from "@radix-ui/react-accordion";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
  icon?: string;
  iconPosition?: "left" | "right";
}

export interface FaqAccordionProps {
  data: FAQItem[];
  className?: string;
  timestamp?: string;
  questionClassName?: string;
  answerClassName?: string;
  autoLoop?: boolean;
  loopInterval?: number;
}

export function FaqAccordion({
  data,
  className,
  timestamp = "الأسئلة الشائعة • تتبدل الإجابات تلقائياً",
  questionClassName,
  answerClassName,
  autoLoop = true,
  loopInterval = 4000,
}: FaqAccordionProps) {
  const [openItem, setOpenItem] = React.useState<string | null>("1");
  const [isPaused, setIsPaused] = React.useState(false);

  // Auto-loop animation: automatically cycles through questions sequentially
  React.useEffect(() => {
    if (!autoLoop || isPaused || data.length === 0) return;

    const interval = setInterval(() => {
      setOpenItem((prev) => {
        if (!prev) return data[0].id.toString();
        const currentIndex = data.findIndex((item) => item.id.toString() === prev);
        const nextIndex = (currentIndex + 1) % data.length;
        return data[nextIndex].id.toString();
      });
    }, loopInterval);

    return () => clearInterval(interval);
  }, [autoLoop, isPaused, data, loopInterval]);

  return (
    <div
      className={cn("faq-chat-accordion-container", className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => {
        setTimeout(() => setIsPaused(false), 5000);
      }}
    >
      {timestamp && (
        <div className="faq-chat-timestamp-bar">
          <div className="faq-chat-timestamp">
            <span className="faq-chat-timestamp-dot" />
            <span>{timestamp}</span>
            {autoLoop && (
              <span className="faq-chat-loop-badge">
                {isPaused ? "موقوف مؤقتاً للقراءة" : "عرض تلقائي مستمر ↺"}
              </span>
            )}
          </div>
        </div>
      )}

      <Accordion.Root
        type="single"
        collapsible
        value={openItem || ""}
        onValueChange={(value) => setOpenItem(value)}
        className="faq-chat-list"
      >
        {data.map((item) => {
          const isOpen = openItem === item.id.toString();

          return (
            <Accordion.Item
              value={item.id.toString()}
              key={item.id}
              className="faq-chat-item"
            >
              <Accordion.Header className="faq-chat-header">
                <Accordion.Trigger className="faq-chat-trigger">
                  {/* The User Question Bubble (Clean & without icons) */}
                  <div
                    className={cn(
                      "faq-chat-question-bubble",
                      isOpen ? "is-open" : "is-closed",
                      questionClassName
                    )}
                  >
                    <span className="faq-chat-question-text">{item.question}</span>
                  </div>

                  {/* Toggle button right next to the question bubble */}
                  <span
                    className={cn(
                      "faq-chat-toggle-btn",
                      isOpen ? "is-active" : ""
                    )}
                    aria-hidden="true"
                  >
                    {isOpen ? (
                      <Minus className="toggle-icon" size={15} strokeWidth={2.5} />
                    ) : (
                      <Plus className="toggle-icon" size={15} strokeWidth={2.5} />
                    )}
                  </span>
                </Accordion.Trigger>
              </Accordion.Header>

              {/* The System Answer Bubble */}
              <Accordion.Content asChild forceMount>
                <motion.div
                  initial="collapsed"
                  animate={isOpen ? "open" : "collapsed"}
                  variants={{
                    open: { opacity: 1, height: "auto" },
                    collapsed: { opacity: 0, height: 0 },
                  }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="faq-chat-content-motion"
                >
                  <div className="faq-chat-answer-row">
                    <div
                      className={cn(
                        "faq-chat-answer-bubble",
                        answerClassName
                      )}
                    >
                      <p>{item.answer}</p>
                    </div>
                  </div>
                </motion.div>
              </Accordion.Content>
            </Accordion.Item>
          );
        })}
      </Accordion.Root>
    </div>
  );
}
