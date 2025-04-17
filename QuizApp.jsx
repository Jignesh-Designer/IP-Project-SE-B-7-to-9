import React, { useState, useEffect } from "react";
import questions from "./questions.js";
import "./App.css";

const QuizApp = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [start, setStart] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [timer, setTimer] = useState(15);

  const handleAnswerClick = (option) => {
    if (selected) return;
    setSelected(option);
    if (option === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelected(null);
      setTimer(15);
    } else {
      setShowResult(true);
    }
  };

  useEffect(() => {
    let timerId;
    if (start && !showResult && timer > 0) {
      timerId = setTimeout(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0 && selected === null) {
      setSelected("timeout");
      timerId = setTimeout(() => {
        handleNext();
      }, 2000);
    }
    return () => clearTimeout(timerId);
  }, [timer, start, showResult, selected]);

  const getOptionClass = (option) => {
    if (selected === null) return "option";
    if (selected === "timeout") return "option disabled";
    if (option === questions[currentQuestion].answer) return "option correct";
    if (option === selected) return "option wrong";
    return "option disabled";
  };

  return (
    <div className="app-wrapper">
      <div className="container">
        {!start ? (
          <div className="start-screen">
            <h1>Quiz Application</h1>
            <button onClick={() => setStart(true)}>Start Quiz</button>
          </div>
        ) : showResult ? (
          <div className="result-screen">
            <h2>Quiz Completed!</h2>
            <p>Your Score: {score} / {questions.length}</p>
          </div>
        ) : (
          <div className="quiz-screen">
            <div className="header">
              <h2>Quiz Application</h2>
              <div className="timer">Time left <span>{timer}</span></div>
            </div>
            <h3>{currentQuestion + 1}. {questions[currentQuestion].question}</h3>
            <div className="options">
              {questions[currentQuestion].options.map((option, idx) => (
                <div
                  key={idx}
                  className={getOptionClass(option)}
                  onClick={() => handleAnswerClick(option)}
                >
                  {option}
                </div>
              ))}
            </div>
            <div className="footer">
              <p>{currentQuestion + 1} of {questions.length} questions</p>
              {selected !== null && (
                <button className="next-btn" onClick={handleNext}>Next</button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizApp;

