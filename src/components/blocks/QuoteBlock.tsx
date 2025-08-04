import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { unlockDigit, setCurrentBlock } from '../../store/questSlice';
import { QUOTE_QUESTIONS } from '../../data/questData';
import '../../styles/QuoteBlock.css';

const QuoteBlock: React.FC = () => {
  const dispatch = useDispatch();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showInstructions, setShowInstructions] = useState(true);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([...QUOTE_QUESTIONS[0].words]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const currentQuoteQuestion = QUOTE_QUESTIONS[currentQuestion];

  const handleWordClick = (word: string, fromSelected: boolean) => {
    if (showFeedback) return;

    if (fromSelected) {
      // Убираем слово из выбранных
      setSelectedWords(prev => prev.filter(w => w !== word));
      setAvailableWords(prev => [...prev, word]);
    } else {
      // Добавляем слово в выбранные
      setSelectedWords(prev => [...prev, word]);
      setAvailableWords(prev => prev.filter(w => w !== word));
    }
  };

  const handleSubmit = () => {
    const correct = JSON.stringify(selectedWords) === JSON.stringify(currentQuoteQuestion.correct);
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setTimeout(() => {
        if (currentQuestion < QUOTE_QUESTIONS.length - 1) {
          const nextQuestion = currentQuestion + 1;
          setCurrentQuestion(nextQuestion);
          setSelectedWords([]);
          setAvailableWords([...QUOTE_QUESTIONS[nextQuestion].words]);
          setShowFeedback(false);
        } else {
          // Блок завершен
          setTimeout(() => {
            dispatch(unlockDigit(1));
            dispatch(setCurrentBlock(null));
          }, 1500);
        }
      }, 2000);
    } else {
      setTimeout(() => {
        setShowFeedback(false);
        setSelectedWords([]);
        setAvailableWords([...currentQuoteQuestion.words]);
      }, 2000);
    }
  };

  const handleBack = () => {
    dispatch(setCurrentBlock(null));
  };

  const handleStartQuote = () => {
    setShowInstructions(false);
  };

  if (showInstructions) {
    return (
      <div className="quote-block">
        <div className="block-header">
          <button className="back-button" onClick={handleBack}>← Назад</button>
          <h2>💬 Блок: Цитаты</h2>
          <div className="progress">Инструкция</div>
        </div>

        <div className="quote-content">
          <div className="instructions">
            <div className="instruction-image">
              <img src="images/bio2.png" alt="Цитаты" />
            </div>
            <div className="instruction-text">
              <h3>Блок "Цитаты"</h3>
              <p>В этом блоке тебе нужно составить 7 знаменитых цитат из фильмов, сериалов и песен.</p>
              <ul>
                <li>В каждом вопросе есть подсказка, с помощью которой можно понять о какой именно цитате идёт речь</li>
                <li>Выбери слова в правильном порядке</li>
                <li>Слова можно убирать и добавлять заново</li>
                <li>При правильном составлении будет возможность перейти к следующей цитате</li>
                <li>После всех цитат откроется вторая цифра кода</li>
              </ul>
              <button className="start-button" onClick={handleStartQuote}>
                Все реплики Стива и песни ЛСП знаю наизусть!
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="quote-block">
      <div className="block-header">
        <button className="back-button" onClick={handleBack}>← Назад</button>
        <h2>💬 Блок: Цитаты</h2>
        <div className="progress">
          Вопрос {currentQuestion + 1} из {QUOTE_QUESTIONS.length}
        </div>
      </div>

      <div className="quote-content">
        <div className="hint">
          <h3>Подсказка:</h3>
          <p>{currentQuoteQuestion.hint}</p>
        </div>

        <div className="quote-assembly">
          <h4>Составьте цитату:</h4>
          <div className="selected-words">
            {selectedWords.length > 0 ? (
              selectedWords.map((word, index) => (
                <button
                  key={`selected-${index}`}
                  className="word-button selected"
                  onClick={() => handleWordClick(word, true)}
                  disabled={showFeedback}
                >
                  {word}
                </button>
              ))
            ) : (
              <div className="placeholder">Выбери  слова </div>
            )}
          </div>
        </div>

        <div className="available-words">
          <h4>Доступные слова:</h4>
          <div className="words-grid">
            {availableWords.map((word, index) => (
              <button
                key={`available-${index}`}
                className="word-button available"
                onClick={() => handleWordClick(word, false)}
                disabled={showFeedback}
              >
                {word}
              </button>
            ))}
          </div>
        </div>

        {showFeedback && (
          <div className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
            {isCorrect ? (
              <div>
                <span className="feedback-icon">✅</span>
                <span>Правильно! {currentQuestion === QUOTE_QUESTIONS.length - 1 ? 'Блок завершен!' : 'Переходим к следующему вопросу.'}</span>
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
            disabled={selectedWords.length === 0}
          >
            Проверить
          </button>
        )}
      </div>
    </div>
  );
};

export default QuoteBlock;