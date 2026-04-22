import React from "react";
import OptionButton from "./OptionButton";
import ExplanationPanel from "./ExplanationPanel";

export default function QuestionCard({ q, meta, selected, slide, onPick, onNext, isLast, currentIndex }) {
  const optLetters = ["🟥 A", "🟦 B", "🟩 C", "🟨 D"];

  // Lấy đáp án đúng và đáp án đã chọn
  const correctAnswer = selected !== null ? q.opts[q.ans] : null;
  const selectedAnswer = selected !== null ? q.opts[selected] : null;

  return (
    <div className={`question-card ${slide ? 'slide-out' : 'slide-in'}`}>
      <div className="question-box" style={{ background: meta.color }}>
        <div className="question-topic">
          <span className="topic-badge">{q.unit}</span>
          <span className="topic-name">{q.topic}</span>
        </div>
        <div className="question-text">
          <span className="question-number">Q{currentIndex + 1}</span>
          {q.q}
        </div>
      </div>

      <div className="options-grid">
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

      {selected !== null && (
        <ExplanationPanel
          isCorrect={selected === q.ans}
          exp={q.exp}
          detail={q.detail}
          correctAnswer={correctAnswer}
          selectedAnswer={selectedAnswer}
        />
      )}

      {selected !== null && (
        <button className="next-btn" onClick={onNext}>
          {isLast ? "🏆 XEM KẾT QUẢ" : "➡ CÂU TIẾP THEO"}
        </button>
      )}
    </div>
  );
}
