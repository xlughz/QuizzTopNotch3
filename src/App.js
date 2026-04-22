import React, { useState, useEffect } from "react";
import { QUESTIONS, UNIT_META } from "./data/questions";
import QuizHeader from "./components/QuizHeader";
import ProgressBar from "./components/ProgressBar";
import QuestionCard from "./components/QuestionCard";
import ResultScreen from "./components/ResultScreen";
import ProgressDots from "./components/ProgressDots";
import "./App.css";

export default function Quiz() {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [done, setDone] = useState(false);
  const [streak, setStreak] = useState(0);
  const [best, setBest] = useState(0);
  const [slide, setSlide] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  const q = QUESTIONS[idx];
  const meta = UNIT_META[q?.unit] || UNIT_META["Mixed"];
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
    setAnswers([]); setDone(false); setStreak(0);
  };

  const startQuiz = () => {
    setShowWelcome(false);
  };

  // Welcome Screen
  if (showWelcome) {
    return (
      <div className="welcome-screen">
        <div className="welcome-container">
          <div className="welcome-logo">
            <div className="logo-icon">🎮</div>
            <h1 className="welcome-title">Welcome to Lughx Project</h1>
            <h2 className="welcome-subtitle">Thái Nhật Minh</h2>
          </div>
          
          <div className="welcome-stats">
            <div className="stat-item">
              <span className="stat-number">200</span>
              <span className="stat-label">Câu hỏi</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">10</span>
              <span className="stat-label">Units</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">⚡</span>
              <span className="stat-label">Kahoot Style</span>
            </div>
          </div>

          <button className="start-btn" onClick={startQuiz}>
            🚀 BẮT ĐẦU NGAY
          </button>
          
          <div className="welcome-footer">
            <p>✨ Học tiếng Anh cùng Lughx Project ✨</p>
          </div>
        </div>
      </div>
    );
  }

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
    <div className="quiz-container">
      {/* Header với hiệu ứng Kahoot */}
      <div className="kahoot-header">
        <div className="header-left">
          <div className="game-logo">🎮 Lughx Quiz</div>
          <div className="game-badge">Top Notch 3</div>
        </div>
        <div className="header-right">
          <div className="score-board">
            <span className="score-icon">⭐</span>
            <span className="score-value">{score}</span>
          </div>
          {streak >= 3 && (
            <div className="streak-board">
              <span className="streak-icon">🔥</span>
              <span className="streak-value">{streak}</span>
            </div>
          )}
        </div>
      </div>

      {/* Progress với hiệu ứng Kahoot */}
      <div className="kahoot-progress">
        <div className="progress-info">
          <span>Câu {idx + 1} / {total}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      {/* Question Card Kahoot Style */}
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