import React, { useRef } from "react";
import OptionButton from "./OptionButton";
import ExplanationPanel from "./ExplanationPanel";

export default function QuestionCard({ q, meta, selected, slide, onPick, onNext, isLast }) {
  const cardRef = useRef(null);
  const optLetters = ["A", "B", "C", "D"];

  return (
    <div
      ref={cardRef}
      style={{
        ...styles.card,
        background: meta.bg,
        transform: slide ? "translateY(16px) scale(0.98)" : "translateY(0) scale(1)",
        opacity: slide ? 0 : 1,
      }}
    >
      {/* Header */}
      <div style={{ ...styles.cardHeader, background: meta.color }}>
        <div>
          <span style={styles.unit}>{q.unit}</span>
          <span style={styles.separator}>·</span>
          <span style={styles.topic}>{q.topic}</span>
        </div>
        <span style={styles.id}>#{q.id}</span>
      </div>

      <div style={styles.cardBody}>
        {/* Question */}
        <div style={styles.question}>{q.q}</div>

        {/* Options */}
        <div style={styles.optionsContainer}>
          {q.opts.map((opt, i) => (
            <OptionButton
              key={i}
              opt={opt}
              index={i}
              letter={optLetters[i]}
              selected={selected}
              isCorrect={i === q.ans}
              isChosen={i === selected}
              meta={meta}
              onPick={onPick}
            />
          ))}
        </div>

        {/* Explanation */}
        {selected !== null && (
          <ExplanationPanel
            isCorrect={selected === q.ans}
            exp={q.exp}
            detail={q.detail}
          />
        )}
      </div>

      {/* Next button */}
      {selected !== null && (
        <div style={styles.nextButtonContainer}>
          <button
            onClick={onNext}
            style={{
              ...styles.nextButton,
              background: `linear-gradient(135deg, ${meta.color}, #0D1B2A)`
            }}
          >
            {isLast ? "🎯 Xem kết quả" : "Câu tiếp theo →"}
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  card: {
    width: "100%",
    maxWidth: 640,
    borderRadius: 24,
    overflow: "hidden",
    boxShadow: "0 24px 80px rgba(0,0,0,0.5)",
    transition: "all 0.3s cubic-bezier(.4,0,.2,1)"
  },
  cardHeader: {
    padding: "12px 22px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  unit: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 11,
    letterSpacing: 1.5,
    textTransform: "uppercase"
  },
  separator: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 11,
    margin: "0 6px"
  },
  topic: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 11
  },
  id: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 12
  },
  cardBody: {
    padding: "24px 24px 16px"
  },
  question: {
    fontSize: 17,
    fontWeight: 600,
    color: "#1a1a2e",
    lineHeight: 1.6,
    marginBottom: 20,
    minHeight: 50
  },
  optionsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 9
  },
  nextButtonContainer: {
    padding: "0 24px 22px"
  },
  nextButton: {
    width: "100%",
    color: "#fff",
    border: "none",
    borderRadius: 13,
    padding: "14px",
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "inherit",
    letterSpacing: 0.5,
    transition: "opacity 0.2s"
  }
};