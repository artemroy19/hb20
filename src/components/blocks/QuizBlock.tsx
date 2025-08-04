import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { unlockDigit, setCurrentBlock } from '../../store/questSlice';
import { QUIZ_QUESTIONS } from '../../data/questData';
import '../../styles/QuizBlock.css';

const QuizBlock: React.FC = () => {
  const dispatch = useDispatch();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showInstructions, setShowInstructions] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;

    const correct = selectedAnswer === QUIZ_QUESTIONS[currentQuestion].correct;
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setTimeout(() => {
        if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setSelectedAnswer(null);
          setShowFeedback(false);
        } else {
          // Блок завершен
          setTimeout(() => {
            dispatch(unlockDigit(0));
            dispatch(setCurrentBlock(null));
          }, 1500);
        }
      }, 2000);
    } else {
      setTimeout(() => {
        setShowFeedback(false);
        setSelectedAnswer(null);
      }, 2000);
    }
  };

  const handleBack = () => {
    dispatch(setCurrentBlock(null));
  };

  const handleStartQuiz = () => {
    setShowInstructions(false);
  };

  if (showInstructions) {
    return (
      <div className="quiz-block">
        <div className="block-header">
          <button className="back-button" onClick={handleBack}>← Назад</button>
          <h2>🧠 Блок: Воспоминания</h2>
          <div className="progress">Инструкция</div>
        </div>

        <div className="quiz-content">
          <div className="instructions">
            <div className="instruction-image">
              <img src='images/bio1.jpg' alt="Знания" />
            </div>
            <div className="instruction-text">
              <h3>Блок "Воспоминания"</h3>
              <p>В этом блоке тебе предстоит ответить на 7 вопросов, связанные с некоторыми яркими, крутыми, хорошими событиями из прошлого.... 
                к счастью, за 20 лет их произошло достаточно много. Котик пыттался что-то вспомнить и завис, а мы справимся без проблем!</p>
              <ul>
                <li>Каждый вопрос имеет 4 варианта ответа</li>
                <li>Выбери правильный ответ из предложенных</li>
                <li>При правильном ответе переходите к следующему вопросу</li>
                <li>При неправильном ответе попробуйте ещё раз</li>
                <li>После прохождения всех вопросов откроется первая цифра кода</li>
              </ul>
              <button className="start-button" onClick={handleStartQuiz}>
                Поехали!
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-block">
      <div className="block-header">
        <button className="back-button" onClick={handleBack}>← Назад</button>
        <h2>🧠 Блок: Воспоминания</h2>
        <div className="progress">
          Вопрос {currentQuestion + 1} из {QUIZ_QUESTIONS.length}
        </div>
      </div>

      <div className="quiz-content">
        <div className="question">
          <h3>{QUIZ_QUESTIONS[currentQuestion].question}</h3>
        </div>

        <div className="answers">
          {QUIZ_QUESTIONS[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              className={`answer-button ${
                selectedAnswer === index ? 'selected' : ''
              } ${
                showFeedback && selectedAnswer === index
                  ? isCorrect ? 'correct' : 'incorrect'
                  : ''
              }`}
              onClick={() => handleAnswerSelect(index)}
              disabled={showFeedback}
            >
              {option}
            </button>
          ))}
        </div>

        {showFeedback && (
          <div className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
            {isCorrect ? (
              <div>
                <span className="feedback-icon">✅</span>
                <span>Правильно! {currentQuestion === QUIZ_QUESTIONS.length - 1 ? 'Блок завершен!' : 'Переходим к следующему вопросу.'}</span>
              </div>
            ) : (
              <div>
                <span className="feedback-icon">❌</span>
                <span>Неправильно! Попробуй ещё раз.</span>
              </div>
            )}
          </div>
        )}

        {!showFeedback && (
          <button 
            className="submit-button"
            onClick={handleSubmit}
            disabled={selectedAnswer === null}
          >
            Ответить
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizBlock;