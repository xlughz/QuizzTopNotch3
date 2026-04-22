import React, { useState, useEffect, useRef } from "react";
import { QUESTIONS, UNIT_META } from "./data/questions";
import QuizHeader from "./components/QuizHeader";
import ProgressBar from "./components/ProgressBar";
import QuestionCard from "./components/QuestionCard";
import ResultScreen from "./components/ResultScreen";
import ProgressDots from "./components/ProgressDots";

export default function Quiz() {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [done, setDone] = useState(false);
  const [streak, setStreak] = useState(0);
  const [best, setBest] = useState(0);
  const [slide, setSlide] = useState(false);
  const [tab, setTab] = useState("quiz");

  const q = QUESTIONS[idx];
  const meta = UNIT_META[q.unit] || UNIT_META["Mixed"];
  const total = QUESTIONS.length;
  const progress = (idx / total) * 100;

  useEffect(() => {
    setSlide(true);
    const t = setTimeout(() => setSlide(false), 320);
    return () => clearTimeout(t);
  }, [idx]);

  const pick = (i) => {
    if (selected !== null) return;
    setSelected(i);
    const ok = i === q.ans;
    if (ok) setScore(s => s + 1);
    const ns = ok ? streak + 1 : 0;
    setStreak(ns);
    if (ns > best) setBest(ns);
    setAnswers(a => [...a, {
      q: q.q, unit: q.unit, topic: q.topic,
      correct: ok, chosen: q.opts[i], right: q.opts[q.ans],
      exp: q.exp, detail: q.detail
    }]);
  };

  const next = () => {
    if (idx + 1 >= total) { setDone(true); return; }
    setSelected(null);
    setIdx(i => i + 1);
  };

  const restart = () => {
    setIdx(0); setSelected(null); setScore(0);
    setAnswers([]); setDone(false); setStreak(0); setTab("quiz");
  };

  if (done) {
    return <ResultScreen 
      score={score} 
      total={total} 
      answers={answers} 
      best={best}
      onRestart={restart} 
    />;
  }

  return (
    <div style={styles.container}>
      <QuizHeader score={score} streak={streak} />
      <ProgressBar current={idx + 1} total={total} progress={progress} />
      <QuestionCard
        q={q}
        meta={meta}
        selected={selected}
        slide={slide}
        onPick={pick}
        onNext={next}
        isLast={idx + 1 >= total}
      />
      <ProgressDots current={idx} total={total} />
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(160deg,#0D1B2A 0%,#1a237e 55%,#0097A7 100%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "16px 12px",
    fontFamily: "'Palatino Linotype', Georgia, serif"
  }
};