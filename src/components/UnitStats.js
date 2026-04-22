import React from "react";
import { UNIT_META } from "../data/questions";

export default function UnitStats({ byUnit }) {
  return (
    <div style={styles.container}>
      {Object.entries(byUnit).map(([unit, data]) => {
        const m = UNIT_META[unit] || UNIT_META["Mixed"];
        const tot = data.correct + data.wrong;
        const p = Math.round((data.correct / tot) * 100);
        return (
          <div key={unit} style={styles.unitItem}>
            <div style={styles.unitHeader}>
              <span style={{ ...styles.unitName, color: m.color }}>{unit}</span>
              <span style={styles.unitScore}>
                {data.correct}/{tot} ({p}%)
              </span>
            </div>
            <div style={styles.progressBar}>
              <div
                style={{
                  ...styles.progressFill,
                  width: `${p}%`,
                  background: m.color
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

const styles = {
  container: {
    maxHeight: 300,
    overflowY: "auto",
    paddingRight: 4
  },
  unitItem: {
    marginBottom: 10
  },
  unitHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 4,
    fontSize: 13
  },
  unitName: {
    fontWeight: 600
  },
  unitScore: {
    color: "#666"
  },
  progressBar: {
    height: 7,
    background: "#EEE",
    borderRadius: 99,
    overflow: "hidden"
  },
  progressFill: {
    height: "100%",
    borderRadius: 99,
    transition: "width 1s ease"
  }
};