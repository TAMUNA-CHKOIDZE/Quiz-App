import React, { useRef, useState } from "react";
import "./Quiz.css";
import { quizData } from "../constants/quizData";
import Confetti from "react-confetti";

function Quiz() {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(quizData[index]);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  let option1 = useRef(null);
  let option2 = useRef(null);
  let option3 = useRef(null);
  let option4 = useRef(null);

  const optionsArray = [option1, option2, option3, option4];

  // checkAnswer funqction
  const checkAnswer = (e, selectedOption) => {
    if (!lock) {
      if (selectedOption === question.answer) {
        e.target.classList.add("correct");
        setLock(true);
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add("wrong");
        setLock(true);
        optionsArray[question.answer - 1].current.classList.add("correct");
      }
    }
  };

  //  next funqction
  const next = () => {
    let newIndex = index + 1;
    if (newIndex < quizData.length) {
      if (lock === true) {
        setIndex(newIndex);
        setQuestion(quizData[newIndex]);
        setLock(false);
      }
    } else {
      setFinished(true);
    }

    optionsArray.map((option) => {
      option.current.classList.remove("correct");
      option.current.classList.remove("wrong");
    });
  };

  // reset function
  const reset = () => {
    setIndex(0);
    setScore(0);
    setFinished(false);
    setLock(false);
    setQuestion(quizData[0]);
    optionsArray.forEach((option) => {
      option.current.classList.remove("correct");
      option.current.classList.remove("wrong");
    });
  };

  return (
    <div className="quiz-container">
      <h1>Quiz App</h1>
      <hr />
      {finished ? (
        <div className="quiz-finished">
          {score === quizData.length && (
            <>
              <Confetti width={window.innerWidth} height={window.innerHeight} />
              <h2 className="congrats">Congratulations! 🎉</h2>
            </>
          )}
          {score !== quizData.length && <h2>Quiz Completed!</h2>}
          <p>
            Your Score: <span>{score}</span>/{quizData.length}
          </p>
          <button onClick={reset}>Take New Quiz</button>
        </div>
      ) : (
        <div>
          <h2>
            {index + 1}. {question.question}
          </h2>
          <ul>
            <li ref={option1} onClick={(e) => checkAnswer(e, 1)}>
              {question.option1}
            </li>
            <li ref={option2} onClick={(e) => checkAnswer(e, 2)}>
              {question.option2}
            </li>
            <li ref={option3} onClick={(e) => checkAnswer(e, 3)}>
              {question.option3}
            </li>
            <li ref={option4} onClick={(e) => checkAnswer(e, 4)}>
              {question.option4}
            </li>
          </ul>
          <button onClick={next}>Next</button>
          <div className="index">
            {index + 1} of {quizData.length} questions
          </div>
        </div>
      )}
    </div>
  );
}

export default Quiz;
