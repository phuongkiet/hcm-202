import React, { useState, useEffect } from "react";
import questionsData from "../data/questionbank.json"; // Assuming questionsData is the question bank.

export default function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [gameFinished, setGameFinished] = useState(false);

  // Load and shuffle questions at the start or when restarting the game
  useEffect(() => {
    shuffleAndPickQuestions();
  }, []);

  const shuffleAndPickQuestions = () => {
    const shuffledQuestions = [...questionsData].sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffledQuestions.slice(0, 10); // Pick the first 10 questions from the shuffled array
    setCurrentQuestions(selectedQuestions);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setGameFinished(false);
  };

  const handleAnswerClick = (option) => {
    const correct = option === currentQuestions[currentQuestionIndex].answer;
    setAnswers([...answers, { ...currentQuestions[currentQuestionIndex], selectedAnswer: option, correct }]);

    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setGameFinished(true);
    }
  };

  const restartGame = () => {
    shuffleAndPickQuestions(); // Reshuffle and pick new questions
  };

  if (gameFinished) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white">
        <h1 className="text-4xl font-bold my-10">Xem lại kết quả</h1>
        {answers.map((item, index) => (
          <div key={index} className="w-full max-w-3xl p-6 text-center rounded-lg shadow-lg mb-4 bg-gray-500">
            <h2 className="text-3xl font-bold">{item.question}</h2>
            {item.options.map((option, i) => (
              <div key={i} className={`mt-5 p-4 rounded-lg text-left ${item.answer === option ? 'bg-green-500' : item.selectedAnswer === option ? 'bg-red-500' : 'bg-gray-500'}`}>
                {String.fromCharCode(65 + i)}: {option}
              </div>
            ))}
          </div>
        ))}
        <button
          onClick={restartGame}
          className="my-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow-md transition-all"
        >
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white justify-center items-center p-8">
      <h1 className="font-bold text-4xl mb-10">Quiz Ôn Tập</h1>
      <div className="bg-blue-800 w-full max-w-3xl p-6 text-center rounded-lg shadow-lg mb-8 break-words">
        <h2 className="text-3xl font-bold break-words">{currentQuestions[currentQuestionIndex]?.question}</h2>
      </div>
      <div className="grid grid-cols-2 gap-6 w-full max-w-3xl">
        {currentQuestions[currentQuestionIndex]?.options?.map((option, index, array) => (
          <button
            key={index}
            onClick={() => handleAnswerClick(option)}
            className={`p-4 rounded-lg shadow-md text-left break-words 
              ${array.length === 3 && index === 2 ? 'col-span-2 bg-blue-700' : 'bg-blue-600'}`}
          >
            <span className="font-bold">{String.fromCharCode(65 + index)}:</span> {option}
          </button>
        ))}
      </div>
    </div>
  );  
}
