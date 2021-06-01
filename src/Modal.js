import React from "react";
import { useGlobalContext } from "./context";

const Modal = () => {
  const { correctAns, index, handlePlayAgain } = useGlobalContext();

  const percentage = (+correctAns / +(index + 1)) * 100;
  return (
    <>
      <div className="modal-container isOpen">
        <div className="modal-content">
          <h2>congrats!</h2>
          <p>You answered {Math.ceil(percentage)}% of questions correctly</p>
          <button className="close-btn" onClick={handlePlayAgain}>
            play again
          </button>
        </div>
      </div>
    </>
  );
};

export default Modal;
