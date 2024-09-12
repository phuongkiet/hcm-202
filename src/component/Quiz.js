import React, { useState, useEffect } from "react";
import questionsData from "../data/questionbank.json"; // Assuming questions.json is used as the question bank.

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [isCorrect, setIsCorrect] = useState(null); // Tracks whether the selected answer is correct
  const [showFeedback, setShowFeedback] = useState(false); // Used to show feedback before moving on

  // Load the questions and pick a random question for each round
  useEffect(() => {
    setQuestions(questionsData);
    pickRandomQuestion();
  }, []);

  const pickRandomQuestion = () => {
    const randomIndex = Math.floor(Math.random() * questionsData.length);
    setCurrentQuestion(questionsData[randomIndex]);
  };

  const handleAnswerClick = (option) => {
    setSelectedAnswer(option);
    setShowFeedback(true); // Trigger feedback animation

    // Check if the selected answer is correct
    const correct = option === currentQuestion.answer;
    setIsCorrect(correct);

    // Delay to show the feedback and then proceed to the next step
    setTimeout(() => {
      if (correct) {
        // Proceed to the next question if the answer is correct
        setScore(score + 1);
        if (round < 8) {
          setRound(round + 1);
          setShowFeedback(false);
          pickRandomQuestion(); // Pick a new question
        } else {
          setGameOver(true); // End the game after 8 rounds
        }
      } else {
        // End the game if the answer is wrong
        setGameOver(true);
      }
    }, 2000); // 2-second delay for animation
  };

  const resetGame = () => {
    setScore(0);
    setRound(1);
    setGameOver(false);
    setSelectedAnswer("");
    setIsCorrect(null);
    setShowFeedback(false);
    pickRandomQuestion();
  };

  const prizeLadder = [
    { round: 1, score: "1" },
    { round: 2, score: "2" },
    { round: 3, score: "3" },
    { round: 4, score: "4" },
    { round: 5, score: "5" },
    { round: 6, score: "6" },
    { round: 7, score: "7" },
    { round: 8, score: "8" },
  ];

  if (gameOver) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white">
        <h1 className="text-4xl font-bold my-10">Game Over</h1>
        <p className="text-xl mb-4">Your Score: {score} </p>
        <button
          onClick={resetGame}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow-md transition-all"
        >
          Play Again
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-row min-h-screen bg-gray-900 text-white">
      {/* Left Sidebar: Prize Ladder */}
      <div className="w-1/4 bg-gray-700 p-4 flex flex-col justify-center items-center text-right">
        <h2 className="text-2xl font-bold mb-6">Score Ladder</h2>
        <ul className="space-y-2">
          {prizeLadder.map((prize, index) => (
            <li
              key={index}
              className={`text-lg p-2 rounded-lg ${
                round === prize.round ? "bg-yellow-500" : "bg-gray-600"
              }`}
            >
              Round {prize.round}: {prize.score}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content: Question & Answers */}
      <div className="flex-grow p-8 flex flex-col justify-center items-center">
        <h1 className="font-bold text-4xl mb-10">AI LÀ TRIỆU PHÚ</h1>
        {/* Question Section */}
        <div className="bg-blue-800 w-full max-w-3xl p-6 text-center rounded-lg shadow-lg mb-8">
          <h2 className="text-3xl font-bold">{currentQuestion?.question}</h2>
        </div>

        {/* Answer Section */}
        <div className="grid grid-cols-2 gap-6 w-full max-w-3xl">
          {currentQuestion?.options?.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerClick(option)}
              disabled={showFeedback} // Disable buttons while feedback is shown
              className={`p-4 rounded-lg shadow-md text-left transition-all ${
                showFeedback && selectedAnswer === option
                  ? isCorrect
                    ? "bg-green-500"
                    : "bg-red-500"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              <span className="font-bold">{String.fromCharCode(65 + index)}:</span> {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
