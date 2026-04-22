import React from "react";

export default function ExplanationPanel({ isCorrect, exp, detail }) {
  return (
    <div
      style={{
        marginTop: 16,
        borderRadius: 14,
        overflow: "hidden",
        border: `1px solid ${isCorrect ? "#A5D6A7" : "#FFAB91"}`,
        animation: "slideUp 0.35s ease",
      }}
    >
      <div
        style={{
          padding: "12px 16px",
          background: isCorrect ? "#E8F5E9" : "#FFF3E0",
          borderBottom: `1px solid ${isCorrect ? "#C8E6C9" : "#FFE0B2"}`,
        }}
      >
        <div
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: isCorrect ? "#1B5E20" : "#BF360C",
            marginBottom: 4,
          }}
        >
          {isCorrect ? "✅ Chính xác!" : "❌ Chưa đúng"}
        </div>
        <div style={{ fontSize: 13.5, color: "#444", lineHeight: 1.6 }}>
          {exp}
        </div>
      </div>
      <div style={{ padding: "12px 16px", background: "#F8F9FF" }}>
        <div
          style={{
            fontSize: 11.5,
            color: "#888",
            fontWeight: 700,
            letterSpacing: 1,
            marginBottom: 5,
            textTransform: "uppercase",
          }}
        >
          📖 Giải thích chi tiết
        </div>
        <div style={{ fontSize: 13, color: "#555", lineHeight: 1.7 }}>
          {detail}
        </div>
      </div>
    </div>
  );
}