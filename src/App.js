import React from "react";
import { useGlobalContext } from "./context";

import SetupForm from "./SetupForm";
import Loading from "./Loading";
import Modal from "./Modal";
function App() {
  const {
    isLoading,
    waiting,
    questions,
    index,
    correctAns,
    handleNextQuestion,
    isModalOpen,
    handleCorrectAns,
    shuffleArray,
  } = useGlobalContext();

  if (waiting) {
    return <SetupForm></SetupForm>;
  }

  if (isLoading) {
    return <Loading></Loading>;
  }

  const { question, correct_answer, incorrect_answers } = questions[index];

  const ans = shuffleArray([...incorrect_answers, correct_answer]);

  return (
    <main>
      {isModalOpen && <Modal></Modal>}
      <section className="quiz">
        <p className="correct-answers">
          correct answers : {correctAns}/{index + 1}
        </p>
        <article className="container">
          <h2 dangerouslySetInnerHTML={{ __html: question }} />
          <div className="btn-container">
            {ans.map((a, i) => {
              return (
                <button
                  className="answer-btn"
                  key={i}
                  type="submit"
                  value={a}
                  onClick={(e) => {
                    handleCorrectAns(e);
                  }}
                >
                  {a}
                </button>
              );
            })}
          </div>
        </article>
        <button className="next-question" onClick={handleNextQuestion}>
          next question
        </button>
      </section>
    </main>
  );
}

export default App;
