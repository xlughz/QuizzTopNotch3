import React from "react";

export default function QuizHeader({ score, streak }) {
  return (
    <div style={styles.header}>
      <div style={styles.titleSection}>
        <span style={styles.title}>TOP NOTCH 3</span>
        <span style={styles.subtitle}>Grammar Quiz · 200 câu</span>
      </div>
      <div style={styles.statsSection}>
        {streak >= 3 && (
          <div style={styles.streakBadge}>
            🔥 {streak}
          </div>
        )}
        <div style={styles.scoreBadge}>
          ⭐ {score}
        </div>
      </div>
    </div>
  );
}

const styles = {
  header: {
    width: "100%",
    maxWidth: 640,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10
  },
  titleSection: {
    display: "flex",
    flexDirection: "column"
  },
  title: {
    color: "rgba(255,255,255,0.95)",
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: 1.5
  },
  subtitle: {
    color: "rgba(255,255,255,0.55)",
    fontSize: 11
  },
  statsSection: {
    display: "flex",
    gap: 10,
    alignItems: "center"
  },
  streakBadge: {
    background: "rgba(255,193,7,0.2)",
    border: "1px solid rgba(255,193,7,0.5)",
    borderRadius: 20,
    padding: "4px 12px",
    color: "#FFD54F",
    fontSize: 13,
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    gap: 4
  },
  scoreBadge: {
    background: "rgba(255,255,255,0.12)",
    borderRadius: 20,
    padding: "4px 12px",
    color: "#fff",
    fontSize: 13,
    fontWeight: 600
  }
};