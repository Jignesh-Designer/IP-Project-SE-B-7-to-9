import React, { useState, useEffect } from 'react';
import questions from './questions';
import './App.css'; // use your existing CSS here

function QuizApp() {
  const [start, setStart] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [timer, setTimer] = useState(15);

  useEffect(() => {
    let timerId;
    if (start && !showResult && timer > 0) {
      timerId = setTimeout(() => setTimer(prev => prev - 1), 1000);
    } else if (timer === 0) {
      setSelected("timeout");
    }
    return () => clearTimeout(timerId);
  }, [timer, start, showResult]);

  const currentQ = questions[questionIndex];

  const handleStart = () => {
    setStart(true);
  };

  const handleOptionClick = (option) => {
    if (selected !== null) return;
    setSelected(option);
    if (option === currentQ.answer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
      setSelected(null);
      setTimer(15);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setScore(0);
    setQuestionIndex(0);
    setSelected(null);
    setTimer(15);
    setShowResult(false);
    setStart(false);
  };

  if (!start) {
    return <div className="start_btn"><button onClick={handleStart}>Start Quiz</button></div>;
  }

  if (showResult) {
    return (
      <div className="result_box activeResult">
        <div className="icon"><i className="fa-solid fa-crown"></i></div>
        <div className="complete_text"> You have completed the quiz!</div>
        <div className="score_text">
          <span>You got <p>{score}</p> out of <p>{questions.length}</p></span>
        </div>
        <div className="buttons">
          <button className="restart" onClick={handleRestart}>Replay</button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz_box activeQuiz">
      <header>
        <div className="title">Quiz Application</div>
        <div className="timer">
          <div className="time_text">Time left</div>
          <div className="timer_sec">{timer}</div>
        </div>
      </header>
      <section>
        <div className="que_text"><span>{currentQ.numb}. {currentQ.question}</span></div>
        <div className="option_list">
          {currentQ.options.map((opt, idx) => (
            <div
              key={idx}
              className={`option ${
                selected === opt
                  ? opt === currentQ.answer
                    ? "correct"
                    : "incorrect"
                  : selected && opt === currentQ.answer
                  ? "correct"
                  : ""
              } ${selected ? "disabled" : ""}`}
              onClick={() => handleOptionClick(opt)}
            >
              <span>{opt}</span>
            </div>
          ))}
        </div>
      </section>
      <footer>
        <div className="total_que">
          <span><p>{questionIndex + 1}</p> of <p>{questions.length}</p> questions</span>
        </div>
        <div className="next_btn" onClick={handleNext}>Next</div>
      </footer>
    </div>
  );
}

export default QuizApp;
