import React from "react";

export default function ExplanationPanel({ isCorrect, exp, detail, correctAnswer, selectedAnswer }) {
  return (
    <div
      style={{
        marginTop: 20,
        borderRadius: 16,
        overflow: "hidden",
        border: `2px solid ${isCorrect ? "#4CAF50" : "#f44336"}`,
        animation: "slideUp 0.35s ease",
      }}
    >
      <div
        style={{
          padding: "15px 20px",
          background: isCorrect ? "#e8f5e9" : "#ffebee",
          borderBottom: `1px solid ${isCorrect ? "#c8e6c9" : "#ffcdd2"}`,
        }}
      >
        <div
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: isCorrect ? "#2e7d32" : "#c62828",
            marginBottom: 8,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          {isCorrect ? "✅ CHÍNH XÁC!" : "❌ CHƯA ĐÚNG"}
        </div>
        
        {/* Hiển thị đáp án đã chọn */}
        {!isCorrect && selectedAnswer && (
          <div style={{ 
            fontSize: 14, 
            color: "#d32f2f", 
            marginBottom: 8,
            background: "#ffcdd2",
            padding: "8px 12px",
            borderRadius: 8,
          }}>
            🚫 Bạn chọn: <strong>{selectedAnswer}</strong>
          </div>
        )}
        
        {/* Hiển thị đáp án đúng */}
        {correctAnswer && (
          <div style={{ 
            fontSize: 14, 
            color: "#2e7d32", 
            marginBottom: 8,
            background: "#c8e6c9",
            padding: "8px 12px",
            borderRadius: 8,
          }}>
            ✅ Đáp án đúng: <strong>{correctAnswer}</strong>
          </div>
        )}
        
        <div style={{ fontSize: 14, color: "#444", lineHeight: 1.5, marginTop: 8 }}>
          {exp}
        </div>
      </div>
      
      <div style={{ padding: "12px 20px", background: "#f8f9ff" }}>
        <div
          style={{
            fontSize: 12,
            color: "#888",
            fontWeight: 700,
            letterSpacing: 1,
            marginBottom: 6,
            textTransform: "uppercase",
          }}
        >
          📖 GIẢI THÍCH CHI TIẾT
        </div>
        <div style={{ fontSize: 13, color: "#555", lineHeight: 1.6 }}>{detail}</div>
      </div>
    </div>
  );
}
