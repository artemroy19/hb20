import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { unlockDigit, setCurrentBlock } from '../../store/questSlice';
import { ASSOCIATION_QUESTIONS } from '../../data/questData';
import '../../styles/AssociationBlock.css';

const AssociationBlock: React.FC = () => {
  const dispatch = useDispatch();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showInstructions, setShowInstructions] = useState(true);
  const [firstWord, setFirstWord] = useState<string[]>([]);
  const [secondWord, setSecondWord] = useState<string[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const currentAssociationQuestion = ASSOCIATION_QUESTIONS[currentQuestion];

  const handleLetterChange = (wordIndex: number, letterIndex: number, letter: string) => {
    const upperLetter = letter.toUpperCase();
    
    if (wordIndex === 0) {
      const newFirstWord = [...firstWord];
      newFirstWord[letterIndex] = upperLetter;
      setFirstWord(newFirstWord);
    } else {
      const newSecondWord = [...secondWord];
      newSecondWord[letterIndex] = upperLetter;
      setSecondWord(newSecondWord);
    }
    
    // Автоматический переход к следующей ячейке
    if (letter) {
      setTimeout(() => {
        let nextInput: HTMLInputElement | null = null;
        
        if (wordIndex === 0 && letterIndex < currentAssociationQuestion.answer[0].length - 1) {
          // Следующая буква в первом слове
          nextInput = document.querySelector(`input[data-word="0"][data-index="${letterIndex + 1}"]`) as HTMLInputElement;
        } else if (wordIndex === 0 && letterIndex === currentAssociationQuestion.answer[0].length - 1 && currentAssociationQuestion.answer.length > 1) {
          // Переход ко второму слову
          nextInput = document.querySelector(`input[data-word="1"][data-index="0"]`) as HTMLInputElement;
        } else if (wordIndex === 1 && currentAssociationQuestion.answer.length > 1 && letterIndex < currentAssociationQuestion.answer[1].length - 1) {
          // Следующая буква во втором слове
          nextInput = document.querySelector(`input[data-word="1"][data-index="${letterIndex + 1}"]`) as HTMLInputElement;
        }
        
        if (nextInput) {
          nextInput.focus();
        }
      }, 50);
    }
  };

  const handleSubmit = () => {
    let correct = false;
    
    if (currentAssociationQuestion.answer.length === 1) {
      // Одно слово
      const userWord = firstWord.join('');
      correct = userWord === currentAssociationQuestion.answer[0];
    } else {
      // Два слова
      const userFirstWord = firstWord.join('');
      const userSecondWord = secondWord.join('');
      correct = userFirstWord === currentAssociationQuestion.answer[0] && 
               userSecondWord === currentAssociationQuestion.answer[1];
    }
    
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setTimeout(() => {
        if (currentQuestion < ASSOCIATION_QUESTIONS.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setFirstWord([]);
          setSecondWord([]);
          setShowFeedback(false);
        } else {
          // Блок завершен
          setTimeout(() => {
            dispatch(unlockDigit(3));
            dispatch(setCurrentBlock(null));
          }, 1500);
        }
      }, 2000);
    } else {
      setTimeout(() => {
        setShowFeedback(false);
        setFirstWord([]);
        setSecondWord([]);
      }, 2000);
    }
  };

  const handleBack = () => {
    dispatch(setCurrentBlock(null));
  };

  const handleStartAssociation = () => {
    setShowInstructions(false);
  };

  // Инициализируем массив ответов при смене вопроса
  React.useEffect(() => {
    setFirstWord(new Array(currentAssociationQuestion.answer[0].length).fill(''));
    if (currentAssociationQuestion.answer.length > 1) {
      setSecondWord(new Array(currentAssociationQuestion.answer[1].length).fill(''));
    } else {
      setSecondWord([]);
    }
  }, [currentQuestion, currentAssociationQuestion.answer]);

  if (showInstructions) {
    return (
      <div className="association-block">
        <div className="block-header">
          <button className="back-button" onClick={handleBack}>← Назад</button>
          <h2>🖼️ Блок: Картинки</h2>
          <div className="progress">Инструкция</div>
        </div>

        <div className="association-content">
          <div className="instructions">
            <div className="instruction-image">
              <img src="images/bio4.jpg" alt="Картинки" />
            </div>
            <div className="instruction-text">
              <h3>Блок "Картинки"</h3>
              <p>В этом блоке тебе нужно найти общее между изображениями в 8 заданиях.</p>
              <ul>
                <li>Посмотри на 4 изображения</li>
                <li>Найди то, что их объединяет</li>
                <li>Ответ может состоять из одного или двух слов</li>
                <li>Введи каждую букву в отдельную ячейку</li>
                <li>После прохождения всех заданий откроется четвертая и последняя (наверное) цифра кода, и ты (возможно) наконец-то получишь подарок</li>
                <li>Данный блок скорее всего самый сложный</li>
                <li>Я даже не уверен, решаемо это или нет</li>
              </ul>
              <button className="start-button" onClick={handleStartAssociation}>
                Начинаем, хочу уже открыть этот замок 
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="association-block">
      <div className="block-header">
        <button className="back-button" onClick={handleBack}>← Назад</button>
        <h2>🖼️ Блок: Картинки</h2>
        <div className="progress">
          Задание {currentQuestion + 1} из {ASSOCIATION_QUESTIONS.length}
        </div>
      </div>

      <div className="association-content">
        <div className="hint">
          <h3>{currentAssociationQuestion.hint}</h3>
        </div>

        <div className="images-grid">
          {currentAssociationQuestion.images.map((image, index) => (
            <div key={index} className="image-container">
              <img src={image} alt={`Изображение ${index + 1}`} />
            </div>
          ))}
        </div>

        <div className="answer-section">
          <h4>Ваш ответ:</h4>
          <div className="words-container">
            <div className="word-group">
              <label>{currentAssociationQuestion.answer.length > 1 ? 'Первое слово:' : 'Ответ:'}</label>
              <div className="letter-inputs">
                {firstWord.map((letter, index) => (
                  <input
                    key={`first-${index}`}
                    data-word="0"
                    data-index={index}
                    type="text"
                    value={letter}
                    onChange={(e) => handleLetterChange(0, index, e.target.value)}
                    maxLength={1}
                    className="letter-input"
                    disabled={showFeedback}
                  />
                ))}
              </div>
            </div>
            
            {currentAssociationQuestion.answer.length > 1 && (
              <div className="word-group">
                <label>Второе слово:</label>
                <div className="letter-inputs">
                  {secondWord.map((letter, index) => (
                    <input
                      key={`second-${index}`}
                      data-word="1"
                      data-index={index}
                      type="text"
                      value={letter}
                      onChange={(e) => handleLetterChange(1, index, e.target.value)}
                      maxLength={1}
                      className="letter-input"
                      disabled={showFeedback}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {showFeedback && (
          <div className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
            {isCorrect ? (
              <div>
                <span className="feedback-icon">✅</span>
                <span>Правильно! {currentQuestion === ASSOCIATION_QUESTIONS.length - 1 ? 'Блок завершен!' : 'Переходим к следующему вопросу.'}</span>
              </div>
            ) : (
              <div>
                <span className="feedback-icon">❌</span>
                <span>Неправильно! Попробуйте еще раз.</span>
              </div>
            )}
          </div>
        )}

        {!showFeedback && (
          <button 
            className="submit-button"
            onClick={handleSubmit}
            disabled={
              firstWord.some(letter => !letter.trim()) || 
              (currentAssociationQuestion.answer.length > 1 && secondWord.some(letter => !letter.trim()))
            }
          >
            Проверить
          </button>
        )}
      </div>
    </div>
  );
};

export default AssociationBlock;