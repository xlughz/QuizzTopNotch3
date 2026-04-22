import React from "react";

export default function ProgressBar({ current, total, progress }) {
  return (
    <div style={styles.container}>
      <div style={styles.labels}>
        <span style={styles.label}>Câu {current} / {total}</span>
        <span style={styles.label}>{Math.round(progress)}%</span>
      </div>
      <div style={styles.barContainer}>
        <div style={{ ...styles.barFill, width: `${progress}%` }} />
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    maxWidth: 640,
    marginBottom: 14
  },
  labels: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 5
  },
  label: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 11
  },
  barContainer: {
    height: 6,
    background: "rgba(255,255,255,0.15)",
    borderRadius: 99,
    overflow: "hidden"
  },
  barFill: {
    height: "100%",
    background: "linear-gradient(90deg,#64B5F6,#E3F2FD)",
    borderRadius: 99,
    transition: "width 0.5s cubic-bezier(.4,0,.2,1)"
  }
};