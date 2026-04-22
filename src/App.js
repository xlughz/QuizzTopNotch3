import React, { useState, useEffect } from "react";
import { QUESTIONS, UNIT_META } from "./data/questions";
import QuestionCard from "./components/QuestionCard";
import ResultScreen from "./components/ResultScreen";
import ProgressDots from "./components/ProgressDots";
import "./App.css";

// Hàm xáo trộn mảng (Fisher-Yates shuffle)
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function Quiz() {
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [done, setDone] = useState(false);
  const [streak, setStreak] = useState(0);
  const [best, setBest] = useState(0);
  const [slide, setSlide] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [shuffleSeed, setShuffleSeed] = useState(0); // Dùng để random lại

  // Xáo trộn câu hỏi khi component mount hoặc khi muốn random lại
  useEffect(() => {
    if (QUESTIONS.length > 0) {
      const shuffled = shuffleArray(QUESTIONS);
      setShuffledQuestions(shuffled);
    }
  }, [shuffleSeed]);

  const q = shuffledQuestions[idx];
  const meta = UNIT_META[q?.unit] || UNIT_META["Mixed"];
  const total = shuffledQuestions.length;
  const progress = total > 0 ? (idx / total) * 100 : 0;

  useEffect(() => {
    setSlide(true);
    const t = setTimeout(() => setSlide(false), 320);
    return () => clearTimeout(t);
  }, [idx]);

  const pick = (i) => {
    if (selected !== null || !q) return;
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
    // Xáo trộn lại câu hỏi khi chơi lại
    setShuffleSeed(prev => prev + 1);
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
              <span className="stat-number">{total}</span>
              <span className="stat-label">Câu hỏi</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">10</span>
              <span className="stat-label">Units</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">🎲</span>
              <span className="stat-label">Random Mode</span>
            </div>
          </div>
          <button className="start-btn" onClick={startQuiz}>
            🚀 BẮT ĐẦU NGAY
          </button>
          <div className="welcome-footer">
            <p>✨ Câu hỏi được xáo trộn ngẫu nhiên mỗi lần chơi ✨</p>
          </div>
        </div>
      </div>
    );
  }

  if (done || !q) {
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
      <div className="kahoot-header">
        <div className="header-left">
          <div className="game-logo">🎮 Lughx Quiz</div>
          <div className="game-badge">Random Mode</div>
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

      <div className="kahoot-progress">
        <div className="progress-info">
          <span>Câu {idx + 1} / {total}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <QuestionCard
        q={q}
        meta={meta}
        selected={selected}
        slide={slide}
        onPick={pick}
        onNext={next}
        isLast={idx + 1 >= total}
        currentIndex={idx}
      />

      <ProgressDots current={idx} total={total} />
    </div>
  );
}
