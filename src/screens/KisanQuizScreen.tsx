// src/screens/KisanQuizScreen.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./KisanQuizScreen.css";

// Define the type for a quiz question
interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: string;
}

// Placeholder questions related to agriculture and policies
const quizQuestions: Question[] = [
  {
    id: 1,
    text: "What is the main objective of the Pradhan Mantri Fasal Bima Yojana (PMFBY)?",
    options: [
      "Provide loans to farmers",
      "Provide insurance coverage for crop loss",
      "Set Minimum Support Prices (MSP)",
      "Promote organic farming",
    ],
    correctAnswer: "Provide insurance coverage for crop loss",
  },
  {
    id: 2,
    text: "Which soil type is generally considered best for growing cotton in India?",
    options: [
      "Alluvial Soil",
      "Red Soil",
      "Laterite Soil",
      "Black Soil (Regur)",
    ],
    correctAnswer: "Black Soil (Regur)",
  },
  {
    id: 3,
    text: "What does MSP stand for in the context of Indian agriculture?",
    options: [
      "Maximum Sale Price",
      "Minimum Support Price",
      "Market Supply Price",
      "Major Subsidy Program",
    ],
    correctAnswer: "Minimum Support Price",
  },
  {
    id: 4,
    text: "Which of these is a Kharif crop?",
    options: ["Wheat", "Mustard", "Paddy (Rice)", "Barley"],
    correctAnswer: "Paddy (Rice)",
  },
  {
    id: 5,
    text: 'The "Kisan Credit Card" (KCC) scheme provides farmers with access to:',
    options: [
      "Free seeds",
      "Only crop insurance",
      "Timely credit/loans",
      "Free tractors",
    ],
    correctAnswer: "Timely credit/loans",
  },
];

const KisanQuizScreen: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const handleAnswerOptionClick = (option: string) => {
    if (selectedAnswer !== null) return; // Prevent changing answer after selection

    setSelectedAnswer(option);
    const correct =
      option === quizQuestions[currentQuestionIndex].correctAnswer;

    if (correct) {
      setScore(score + 1);
    }

    // Move to next question or show score after a short delay
    setTimeout(() => {
      const nextQuestion = currentQuestionIndex + 1;
      if (nextQuestion < quizQuestions.length) {
        setCurrentQuestionIndex(nextQuestion);
        setSelectedAnswer(null); // Reset selection for next question
      } else {
        setShowScore(true);
      }
    }, 1500); // Delay to show feedback
  };

  // Function to determine button class based on selection and correctness
  const getButtonClass = (option: string): string => {
    if (selectedAnswer === null) {
      return ""; // Default state
    }
    if (option === quizQuestions[currentQuestionIndex].correctAnswer) {
      return "correct"; // Correct answer always green after selection
    }
    if (option === selectedAnswer) {
      return "incorrect"; // Selected wrong answer red
    }
    return "disabled"; // Other options disabled/greyed out
  };

  return (
    <div className="kisan-quiz-screen">
      <Link to="/games" className="back-button">
        ← Back to Games
      </Link>
      <h1>Kisan Quiz</h1>

      <div className="quiz-info-box">
        💡 Play this quiz for 100 Tokens and stand a chance to win SMS Balance!
        💰
      </div>

      {showScore ? (
        <div className="score-section">
          <h2>Quiz Finished!</h2>
          <p>
            You scored {score} out of {quizQuestions.length}
          </p>
          {/* Add call to action or reward logic here */}
          <button
            onClick={() => window.location.reload()}
            className="play-again-button"
          >
            Play Again (100 Tokens)
          </button>
        </div>
      ) : (
        <div className="quiz-container">
          <div className="question-section">
            <div className="question-count">
              <span>Question {currentQuestionIndex + 1}</span>/
              {quizQuestions.length}
            </div>
            <div className="question-text">
              {quizQuestions[currentQuestionIndex].text}
            </div>
          </div>
          <div className="answer-section">
            {quizQuestions[currentQuestionIndex].options.map(
              (option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerOptionClick(option)}
                  className={`answer-button ${getButtonClass(option)}`}
                  disabled={selectedAnswer !== null}
                >
                  {option}
                </button>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default KisanQuizScreen;
