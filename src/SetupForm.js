import React from "react";
import { useGlobalContext } from "./context";

const SetupForm = () => {
  const { quiz, error, handleChange, handleFetchQuestions } =
    useGlobalContext();
  return (
    <>
      <section className="quiz quiz-small">
        <form className="setup-form">
          <h2>setup quiz</h2>
          <div className="form-control">
            <label htmlFor="amount">number of questions</label>
            <input
              type="number"
              name="amount"
              id="amount"
              className="form-input"
              min="1"
              max="50"
              value={quiz.amount}
              onChange={handleChange}
            ></input>
          </div>
          <div className="form-control">
            <label htmlFor="category">category</label>
            <select
              name="category"
              id="category"
              className="form-input"
              onChange={handleChange}
              value={quiz.category}
            >
              <option value="sports">sports</option>
              <option value="history">history</option>
              <option value="politics">politics</option>
            </select>
          </div>
          <div className="form-control">
            <label htmlFor="difficulty">select difficulty</label>
            <select
              name="difficulty"
              id="difficulty"
              className="form-input"
              onChange={handleChange}
              value={quiz.difficulty}
            >
              <option value="easy">easy</option>
              <option value="medium">medium</option>
              <option value="hard">hard</option>
            </select>
          </div>
          <button
            type="submit"
            className="submit-btn"
            onClick={handleFetchQuestions}
          >
            start
          </button>
          {error && (
            <p className="error">
              Cant load questions , please try again in some time.
            </p>
          )}
        </form>
      </section>
    </>
  );
};

export default SetupForm;
