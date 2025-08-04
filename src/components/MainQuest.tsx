import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { setCurrentBlock, toggleLetter } from '../store/questSlice';
import { BLOCKS_DATA, QUEST_DIGITS } from '../data/questData';
import Letter from './Letter';
import '../styles/MainQuest.css';

const MainQuest: React.FC = () => {
  const dispatch = useDispatch();
  const { unlockedDigits, showLetter, questCompleted } = useSelector((state: RootState) => state.quest);

  const handleBlockClick = (blockIndex: number) => {
    dispatch(setCurrentBlock(blockIndex));
  };

  const handleShowLetter = () => {
    dispatch(toggleLetter());
  };

  if (showLetter) {
    return <Letter onClose={() => {}} />;
  }

  if (questCompleted) {
    return (
      <div className="quest-completed">
        <div className="completion-content">
          <div className="completion-animation">🎉</div>
          <h1>Саш, с днём рождения!</h1>
          <p>Ты успешно прошла все испытания!</p>
          <div className="final-code">
            <h2>Код от подарка:</h2>
            <div className="code-display">
              {QUEST_DIGITS.map((digit, index) => (
                <span key={index} className="final-digit">{digit}</span>
              ))}
            </div>
          </div>
          <p className="completion-message">
            Теперь ты можешь открыть коробку и забрать свои подарки! <br/>
            (P.S. Замок идёт приятным бонусом)
          </p>
          <button className="letter-button" onClick={handleShowLetter}>
            📜 Перечитать письмо
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="main-quest">
      <header className="quest-header">
        <h1>Просто так получить подарок - это не про нас</h1>
        <button className="letter-button" onClick={handleShowLetter}>
          📜 Письмо
        </button>
      </header>

      <div className="code-display-section">
        <h2>🔒 Кодовый замок</h2>
        <div className="code-slots">
          {QUEST_DIGITS.map((digit, index) => (
            <div key={index} className={`code-slot ${unlockedDigits[index] ? 'unlocked' : 'locked'}`}>
              {unlockedDigits[index] ? (
                <span className="digit">{digit}</span>
              ) : (
                <span className="hidden">?</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="blocks-grid">
        {BLOCKS_DATA.map((block, index) => (
          <div key={index} className="quest-block">
            <div className="block-icon">{block.icon}</div>
            <h3>{block.title}</h3>
            <p>{block.description}</p>
            <div className="block-status">
              {unlockedDigits[index] ? (
                <div className="completed">
                  ✅ Завершено
                  <div className="unlocked-digit">{block.digit}</div>
                </div>
              ) : (
                <button 
                  className="start-block-button"
                  onClick={() => handleBlockClick(index)}
                >
                  Начать
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainQuest;