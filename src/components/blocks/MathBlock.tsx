import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { unlockDigit, setCurrentBlock } from '../../store/questSlice';
import { MATH_QUESTIONS } from '../../data/questData';
import '../../styles/MathBlock.css';

const MathBlock: React.FC = () => {
  const dispatch = useDispatch();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showInstructions, setShowInstructions] = useState(true);
  const [answer, setAnswer] = useState('');
  const [answers, setAnswers] = useState<number[]>([]);
  const [finalAnswer, setFinalAnswer] = useState('');
  const [showFinalQuestion, setShowFinalQuestion] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSubmit = () => {
    if (showFinalQuestion) {
      // Проверяем финальный ответ
      const [a, b, c, d, e] = answers;
      const correctResult = (a + b) * c - d + e;
      const userResult = parseInt(finalAnswer);
      const correct = userResult === correctResult;
      
      setIsCorrect(correct);
      setShowFeedback(true);

      if (correct) {
        setTimeout(() => {
          dispatch(unlockDigit(2));
          dispatch(setCurrentBlock(null));
        }, 2000);
      } else {
        setTimeout(() => {
          setShowFeedback(false);
          setFinalAnswer('');
        }, 2000);
      }
      return;
    }

    const numAnswer = parseInt(answer);
    const correct = numAnswer === MATH_QUESTIONS[currentQuestion].answer;
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      const newAnswers = [...answers, numAnswer];
      setAnswers(newAnswers);

      setTimeout(() => {
        if (currentQuestion < MATH_QUESTIONS.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setAnswer('');
          setShowFeedback(false);
        } else {
          // Переходим к финальному вопросу
          setShowFinalQuestion(true);
          setAnswer('');
          setShowFeedback(false);
        }
      }, 2000);
    } else {
      setTimeout(() => {
        setShowFeedback(false);
        setAnswer('');
      }, 2000);
    }
  };

  const handleBack = () => {
    dispatch(setCurrentBlock(null));
  };

  const handleStartMath = () => {
    setShowInstructions(false);
  };

  if (showInstructions) {
    return (
      <div className="math-block">
        <div className="block-header">
          <button className="back-button" onClick={handleBack}>← Назад</button>
          <h2>🔢 Блок: Математика</h2>
          <div className="progress">Инструкция</div>
        </div>

        <div className="math-content">
          <div className="instructions">
            <div className="instruction-image">
              <img src="images/bio3.png" alt="Математика" />
            </div>
            <div className="instruction-text">
              <h3>Блок "Математика"</h3>
              <p>В этом блоке нужно решить математическую задачу из 5 вопросов.</p>
              <ul>
                <li>Ответь на 5 вопросов, связанные с числами</li>
                <li>Каждый ответ - это переменная в формуле (A + B) × C - D + E</li>
                <li>После всех вопросов вычисли финальный результат</li>
                <li>Введи итоговое число как ответ</li>
                <li>Правильный результат откроет третью цифру кода</li>
              </ul>
              <button className="start-button" onClick={handleStartMath}>
                Не хочу, но надо...
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const renderMathExample = () => {
    const placeholders = ['A', 'B', 'C', 'D', 'E'];
    return (
      <div className="math-example">
        <h3>Математический пример:</h3>
        <div className="formula">
          ({placeholders[0]} + {placeholders[1]}) × {placeholders[2]} - {placeholders[3]} + {placeholders[4]} = ?
        </div>
        <div className="answers-progress">
          {placeholders.map((placeholder, index) => (
            <div key={index} className="answer-slot">
              <span className="placeholder">{placeholder}</span>
              <span className="value">
                {index < answers.length ? answers[index] : 
                 index === currentQuestion ? '?' : '?'}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (showFinalQuestion) {
    const [a, b, c, d, e] = answers;
    return (
      <div className="math-block">
        <div className="block-header">
          <button className="back-button" onClick={handleBack}>← Назад</button>
          <h2>🔢 Блок: Математика</h2>
          <div className="progress">Финальный расчет</div>
        </div>

        <div className="math-content">
          <div className="math-example">
            <h3>Вычисли результат:</h3>
            <div className="formula">
              ({a} + {b}) × {c} - {d} + {e} = ?
            </div>
            <p className="calculation-hint">
              Подставь полученные значения в формулу и вычисли результат
            </p>
          </div>

          <div className="current-question">
            <h4>Введи итоговый результат:</h4>
            
            <div className="answer-input">
              <input
                type="number"
                value={finalAnswer}
                onChange={(e) => setFinalAnswer(e.target.value)}
                placeholder="Результат"
                disabled={showFeedback}
              />
            </div>
          </div>

          {showFeedback && (
            <div className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
              {isCorrect ? (
                <div>
                  <span className="feedback-icon">✅</span>
                  <span>Правильно! Блок завершен!</span>
                </div>
              ) : (
                <div>
                  <span className="feedback-icon">❌</span>
                  <span>Неправильно! Проверь вычисления или обратись к математику</span>
                </div>
              )}
            </div>
          )}

          {!showFeedback && (
            <button 
              className="submit-button"
              onClick={handleSubmit}
              disabled={!finalAnswer.trim()}
            >
              Проверить результат
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="math-block">
      <div className="block-header">
        <button className="back-button" onClick={handleBack}>← Назад</button>
        <h2>🔢 Блок: Математика</h2>
        <div className="progress">
          Вопрос {currentQuestion + 1} из {MATH_QUESTIONS.length}
        </div>
      </div>

      <div className="math-content">
        {renderMathExample()}

        <div className="current-question">
          <h4>Вопрос {currentQuestion + 1}:</h4>
          <p>{MATH_QUESTIONS[currentQuestion].question}</p>
          
          <div className="answer-input">
            <input
              type="number"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Ответ"
              disabled={showFeedback}
            />
          </div>
        </div>

        {showFeedback && (
          <div className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
            {isCorrect ? (
              <div>
                <span className="feedback-icon">✅</span>
                <span>Правильно! {currentQuestion === MATH_QUESTIONS.length - 1 ? 'Блок завершен!' : 'Переходим к следующему вопросу.'}</span>
              </div>
            ) : (
              <div>
                <span className="feedback-icon">❌</span>
                <span>Неправильно! Попробуй еще раз.</span>
              </div>
            )}
          </div>
        )}

        {!showFeedback && (
          <button 
            className="submit-button"
            onClick={handleSubmit}
            disabled={!answer.trim()}
          >
            Ответить
          </button>
        )}
      </div>
    </div>
  );
};

export default MathBlock;