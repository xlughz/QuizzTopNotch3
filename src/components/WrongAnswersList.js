import React from "react";

export default function WrongAnswersList({ wrong }) {
  if (wrong.length === 0) {
    return (
      <div style={styles.emptyState}>
        🎉 Không có câu sai!
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {wrong.map((answer, i) => (
        <div key={i} style={styles.wrongItem}>
          <div style={styles.wrongHeader}>
            {answer.unit} · {answer.topic}
          </div>
          <div style={styles.question}>{answer.q}</div>
          <div style={styles.answerDetails}>
            Bạn chọn: <span style={styles.wrongAnswer}>{answer.chosen}</span>
            {" → "}
            Đúng: <span style={styles.rightAnswer}>{answer.right}</span>
          </div>
          <div style={styles.explanation}>{answer.exp}</div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    maxHeight: 300,
    overflowY: "auto",
    paddingRight: 4
  },
  emptyState: {
    textAlign: "center",
    color: "#2E7D32",
    fontWeight: 600,
    padding: 20
  },
  wrongItem: {
    marginBottom: 10,
    padding: "10px 12px",
    borderRadius: 12,
    background: "#FFEBEE",
    borderLeft: "4px solid #E53935"
  },
  wrongHeader: {
    fontSize: 12,
    color: "#E53935",
    fontWeight: 700,
    marginBottom: 3
  },
  question: {
    fontSize: 13,
    color: "#333",
    marginBottom: 4
  },
  answerDetails: {
    fontSize: 12,
    color: "#888"
  },
  wrongAnswer: {
    color: "#C62828",
    fontWeight: 700
  },
  rightAnswer: {
    color: "#2E7D32",
    fontWeight: 700
  },
  explanation: {
    fontSize: 12,
    color: "#555",
    marginTop: 4,
    fontStyle: "italic"
  }
};