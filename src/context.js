import axios from "axios";
import React, { useState, useContext } from "react";

const table = {
  sports: 21,
  history: 23,
  politics: 24,
};

const API_ENDPOINT = "https://opentdb.com/api.php?";

const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [waiting, setWaiting] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [correctAns, setCorrectAns] = useState(0);
  const [error, setError] = useState(false);
  const [isModalOpen, setIsModal] = useState(false);
  const [quiz, setQuiz] = useState({
    amount: 10,
    category: "sports",
    difficulty: "medium",
  });

  const fetchQuestions = async (url) => {
    setIsLoading(true);
    setWaiting(false);

    const response = await axios(url).catch((err) => console.log(err));
    if (response) {
      const data = await response.data.results;

      if (data.length > 0) {
        setQuestions(data);
        setIsLoading(false);
        setWaiting(false);
        setError(false);
      } else {
        setWaiting(true);
        setError(true);
      }
    } else setWaiting(true);
  };
  function shuffleArray(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  const handlePlayAgain = () => {
    setIsModal(false);
    setIndex(0);
    setCorrectAns(0);
    setQuestions([]);
    setIsLoading(true);
    setWaiting(true);
  };

  const handleNextQuestion = () => {
    if (index === questions.length - 1) {
      setIsModal(true);
    } else setIndex((prev) => prev + 1);
  };
  const handleCorrectAns = (e) => {
    e.preventDefault();
    const regAns = e.target.value;

    if (questions[index]["correct_answer"] === regAns)
      setCorrectAns((ans) => ans + 1);

    handleNextQuestion();
  };

  // useEffect(() => {
  //   fetchQuestions(tempURL);
  // }, []);

  const handleFetchQuestions = () => {
    const url = `${API_ENDPOINT}amount=${quiz.amount}&category=${
      table[quiz.category]
    }&difficulty=${quiz.difficulty}&type=multiple`;
    console.log(url);
    //https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple
    fetchQuestions(url);
  };

  const handleChange = (e) => {
    const name = e.target.name;

    const value = e.target.value;
    setQuiz({ ...quiz, [name]: value });
  };

  return (
    <AppContext.Provider
      value={{
        isLoading,
        waiting,
        questions,
        index,
        correctAns,
        error,
        isModalOpen,
        handleNextQuestion,
        handleCorrectAns,
        handlePlayAgain,
        shuffleArray,
        quiz,
        handleFetchQuestions,
        handleChange,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
