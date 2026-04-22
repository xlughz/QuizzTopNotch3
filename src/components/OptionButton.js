import React from "react";

export default function OptionButton({ opt, index, letter, selected, isCorrect, isChosen, meta, onPick }) {
  let bg = "#fff";
  let border = "2px solid #E8EAF6";
  let txt = "#333";
  let fw = 400;
  let shadow = "none";

  if (selected !== null) {
    if (isCorrect) {
      bg = "#E8F5E9";
      border = "2px solid #2E7D32";
      txt = "#1B5E20";
      fw = 700;
      shadow = "0 0 0 4px rgba(46,125,50,0.1)";
    } else if (isChosen && !isCorrect) {
      bg = "#FFEBEE";
      border = "2px solid #C62828";
      txt = "#B71C1C";
      shadow = "0 0 0 4px rgba(198,40,40,0.1)";
    } else {
      bg = "#FAFAFA";
      border = "2px solid #F0F0F0";
      txt = "#BBB";
    }
  }

  return (
    <button
      onClick={() => onPick(index)}
      style={{
        background: bg,
        border,
        borderRadius: 13,
        padding: "13px 16px",
        textAlign: "left",
        fontSize: 14.5,
        color: txt,
        fontWeight: fw,
        cursor: selected !== null ? "default" : "pointer",
        fontFamily: "inherit",
        display: "flex",
        alignItems: "center",
        gap: 13,
        transition: "all 0.2s ease",
        boxShadow: shadow,
        outline: "none",
      }}
    >
      <span
        style={{
          width: 30,
          height: 30,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          fontSize: 12,
          fontWeight: 700,
          background: selected !== null && isCorrect
            ? "#2E7D32"
            : selected !== null && isChosen && !isCorrect
            ? "#C62828"
            : meta.light,
          color:
            selected !== null && (isCorrect || (isChosen && !isCorrect))
              ? "#fff"
              : meta.color,
          transition: "all 0.2s",
        }}
      >
        {selected !== null && isCorrect
          ? "✓"
          : selected !== null && isChosen && !isCorrect
          ? "✗"
          : letter}
      </span>
      {opt}
    </button>
  );
}