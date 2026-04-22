import React from "react";

export default function OptionButton({ opt, index, letter, selected, isCorrect, isChosen, meta, onPick }) {
  let className = "option-btn";
  
  if (selected !== null) {
    if (isCorrect) {
      className += " correct";
    } else if (isChosen && !isCorrect) {
      className += " wrong";
    } else if (!isCorrect && selected !== null) {
      // Các đáp án sai khác (không được chọn) vẫn hiển thị bình thường
      className += " disabled";
    }
  }

  const colors = ["#E53935", "#1565C0", "#2E7D32", "#FF9800"];

  return (
    <button
      className={className}
      onClick={() => onPick(index)}
      disabled={selected !== null}
      style={{
        borderLeftColor: colors[index],
        background: (() => {
          if (selected !== null) {
            if (isCorrect) return "#4CAF50";
            if (isChosen && !isCorrect) return "#f44336";
            return "#f0f0f0";
          }
          return "white";
        })(),
        color: (() => {
          if (selected !== null && (isCorrect || (isChosen && !isCorrect))) return "white";
          if (selected !== null && !isCorrect && !isChosen) return "#999";
          return "#333";
        })()
      }}
    >
      <span className="option-letter" style={{ background: colors[index] }}>
        {letter}
      </span>
      <span className="option-text">{opt}</span>
      {selected !== null && isCorrect && <span className="option-icon">✓</span>}
      {selected !== null && isChosen && !isCorrect && <span className="option-icon">✗</span>}
    </button>
  );
}
