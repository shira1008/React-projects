import React from "react";
import { useGlobalContext } from "./context";

import SetupForm from "./SetupForm";
import Loading from "./Loading";
import Modal from "./Modal";
function App() {
  const {
    waiting,
    loading,
    questions,
    index,
    correct,
    nextQuestion,
    checkAnswer,
  } = useGlobalContext();
  if (waiting) {
    return <SetupForm />;
  }

  if (loading) {
    return <Loading />;
  }

  //שאלות משתנות כי האינדקס משתנה

  const { question, incorrect_answers, correct_answer } = questions[index];
  //the last option is always the right answer:
  // const answers = [...incorrect_answers, correct_answer];

  //random answers - 0-3 cause i dont want the last one ONLY be the right one :
  let answers = [...incorrect_answers];
  const tempIndex = Math.floor(Math.random() * 4);
  // console.log(tempIndex);

  if (tempIndex === 3) {
    answers.push(correct_answer);
  } else {
    answers.push(answers[tempIndex]);
    // console.log(answers);
    answers[tempIndex] = correct_answer;
    // console.log(answers);
  }

  return (
    <main>
      <Modal />
      <section className="quiz">
        <p className="correct-answers">
          correct answers: {correct}/{index}
        </p>
        <article className="container">
          {/* convert qus from html to str */}
          <h2 dangerouslySetInnerHTML={{ __html: question }} />
          <div className="btn-container">
            {answers.map((answer, index) => {
              return (
                <button
                  key={index}
                  onClick={(e) => {
                    // if (correct_answer === answer) {
                    //   e.target.style.backgroundColor = "#6be675";
                    //   if (checkAnswer) {
                    //     e.target.style.backgroundColor = "#8bcbf9";
                    //   }
                    // }

                    checkAnswer(correct_answer === answer);
                  }}
                  className="answer-btn"
                  dangerouslySetInnerHTML={{ __html: answer }}
                />
              );
            })}
          </div>
        </article>
        <button className="next-question" onClick={nextQuestion}>
          next-question
        </button>
      </section>
    </main>
  );
}

export default App;
