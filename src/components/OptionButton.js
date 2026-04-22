import React from "react";

export default function OptionButton({ opt, index, letter, selected, isCorrect, isChosen, meta, onPick }) {
  let className = "option-btn";
  
  if (selected !== null) {
    if (isCorrect) className += " correct";
    else if (isChosen && !isCorrect) className += " wrong";
    else className += " disabled";
  }

  const colors = ["#E53935", "#1565C0", "#2E7D32", "#FF9800"];

  return (
    <button
      className={className}
      onClick={() => onPick(index)}
      disabled={selected !== null}
      style={{
        borderLeftColor: colors[index],
        background: selected !== null && !isCorrect && !isChosen ? "#f0f0f0" : "white"
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