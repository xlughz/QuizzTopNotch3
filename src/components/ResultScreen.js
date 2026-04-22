import React, { useState } from "react";
import { UNIT_META } from "../data/questions";
import UnitStats from "./UnitStats";
import WrongAnswersList from "./WrongAnswersList";

export default function ResultScreen({ score, total, answers, best, onRestart }) {
  const [tab, setTab] = useState("unit");
  const pct = Math.round((score / total) * 100);
  const emoji = pct >= 90 ? "🏆" : pct >= 75 ? "🌟" : pct >= 60 ? "👍" : "📚";
  const msg = pct >= 90 ? "Xuất sắc!" : pct >= 75 ? "Giỏi lắm!" : pct >= 60 ? "Khá!" : "Cần ôn thêm!";
  const wrong = answers.filter(a => !a.correct);

  const byUnit = {};
  answers.forEach(a => {
    if (!byUnit[a.unit]) byUnit[a.unit] = { correct: 0, wrong: 0 };
    a.correct ? byUnit[a.unit].correct++ : byUnit[a.unit].wrong++;
  });

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.emoji}>{emoji}</div>
          <h2 style={styles.title}>{msg}</h2>
          <p style={styles.subtitle}>TOP NOTCH 3 · 200 câu hỏi</p>
        </div>

        <div style={styles.statsGrid}>
          {[
            { label: "Điểm số", value: `${score}/${total}` },
            { label: "Tỉ lệ đúng", value: `${pct}%` },
            { label: "Chuỗi 🔥", value: best },
            { label: "Sai", value: total - score }
          ].map((stat, i) => (
            <div key={i} style={styles.statCard}>
              <div style={styles.statValue}>{stat.value}</div>
              <div style={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>

        <div style={styles.tabContainer}>
          {["Theo Unit", "Câu sai"].map(t => (
            <button
              key={t}
              onClick={() => setTab(t === "Theo Unit" ? "unit" : "wrong")}
              style={{
                ...styles.tabButton,
                ...(tab === (t === "Theo Unit" ? "unit" : "wrong")
                  ? styles.tabActive
                  : styles.tabInactive)
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === "unit" ? (
          <UnitStats byUnit={byUnit} />
        ) : (
          <WrongAnswersList wrong={wrong} />
        )}

        <button onClick={onRestart} style={styles.restartButton}>
          🔄 Làm lại từ đầu
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg,#0D1B2A 0%,#1a237e 60%,#1565C0 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    fontFamily: "'Palatino Linotype', Georgia, serif"
  },
  card: {
    background: "#fff",
    borderRadius: 28,
    padding: "36px 32px",
    maxWidth: 620,
    width: "100%",
    boxShadow: "0 32px 100px rgba(0,0,0,0.4)"
  },
  header: {
    textAlign: "center",
    marginBottom: 28
  },
  emoji: {
    fontSize: 64,
    marginBottom: 6
  },
  title: {
    fontSize: 30,
    fontWeight: 700,
    color: "#1a237e",
    margin: "0 0 4px"
  },
  subtitle: {
    color: "#888",
    fontSize: 14,
    margin: 0
  },
  statsGrid: {
    display: "flex",
    gap: 12,
    marginBottom: 24,
    flexWrap: "wrap"
  },
  statCard: {
    flex: 1,
    minWidth: 80,
    background: "#F0F4FF",
    borderRadius: 14,
    padding: "12px 10px",
    textAlign: "center"
  },
  statValue: {
    fontSize: 22,
    fontWeight: 700,
    color: "#1a237e"
  },
  statLabel: {
    fontSize: 11,
    color: "#888",
    marginTop: 2
  },
  tabContainer: {
    display: "flex",
    gap: 8,
    marginBottom: 16
  },
  tabButton: {
    flex: 1,
    padding: "9px",
    borderRadius: 10,
    border: "2px solid",
    fontWeight: 600,
    cursor: "pointer",
    fontSize: 13,
    fontFamily: "inherit"
  },
  tabActive: {
    borderColor: "#1a237e",
    background: "#1a237e",
    color: "#fff"
  },
  tabInactive: {
    borderColor: "#E0E0E0",
    background: "#fff",
    color: "#555"
  },
  restartButton: {
    marginTop: 20,
    width: "100%",
    background: "linear-gradient(135deg,#1a237e,#1565C0)",
    color: "#fff",
    border: "none",
    borderRadius: 14,
    padding: "15px",
    fontSize: 16,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "inherit",
    letterSpacing: 0.5
  }
};