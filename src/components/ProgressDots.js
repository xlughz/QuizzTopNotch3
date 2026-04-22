import React from "react";

export default function ProgressDots({ current, total }) {
  const dotCount = Math.ceil(total / 10);
  
  return (
    <div style={styles.container}>
      {Array.from({ length: dotCount }).map((_, i) => {
        const start = i * 10;
        const isActive = current >= start && current < start + 10;
        const isDone = current >= start + 10;
        return (
          <div
            key={i}
            style={{
              width: 22,
              height: 6,
              borderRadius: 99,
              background: isDone
                ? "rgba(255,255,255,0.7)"
                : isActive
                ? "#64B5F6"
                : "rgba(255,255,255,0.2)",
              transition: "all 0.3s",
            }}
          />
        );
      })}
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    gap: 5,
    marginTop: 16,
    flexWrap: "wrap",
    justifyContent: "center",
    maxWidth: 640
  }
};