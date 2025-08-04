import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { hideLetter } from '../store/questSlice';
import '../styles/Letter.css';

interface LetterProps {
  onClose: () => void;
}

const Letter: React.FC<LetterProps> = ({ onClose }) => {
  const [isOpened, setIsOpened] = useState(false);
  const dispatch = useDispatch();

  const handleOpen = () => {
    setIsOpened(true);
  };

  const handleContinue = () => {
    dispatch(hideLetter());
    onClose();
  };

  return (
    <div className="letter-overlay">
      <div className="letter-container">
        {!isOpened ? (
          <div className="letter-envelope">
            <div className="envelope">
              <div className="envelope-flap"></div>
              <div className="envelope-body">
                <div className="letter-inside"></div>
              </div>
            </div>
            <button className="open-button" onClick={handleOpen}>
              Открыть письмо
            </button>
          </div>
        ) : (
          <div className="letter-content">
            <div className="letter-header">
              <h2>Мини-квестик на 20 лет </h2>
            </div>
            
            <div className="letter-body">
              <div className="quote">
              <em>"На тебе кодовый замок,<br/>
               И какой же пароль?<br/>
               Я Т-Е-Б-Я<br/>
               Л-Ю-Б-Л-Ю<br/>
               Наверно, пароль неверный..."</em>
              </div>
              
              <div className="main-text">
                <p>Сашенька, привет!</p>
                
                <p>Как ты догадываешься, я не мог просто подарить подарок, поэтому держи вот такой прикольный перфоманс. </p><br/>
                 <p>Тебе предстоит разгадать 4 блока вопросов, чтобы узнать какой же всё-таки пароль. Он не такой длинный и сложный, 
                  как в песне Олега, но всё равно придётся постараться и хорошо подумать, чтобы заполучить заветные 4 цифры и подарки внутри коробки.

                 </p>

                
                <p>Каждый блок содержит уникальные задания:</p>
                <ul>
                  <li><strong>🧠 Воспоминания</strong> — Вспомни некоторые яркие мгновения жизни</li>
                  <li><strong>💬 Цитаты</strong> — Окунись в цитаты из любимых фильмов, сериалов и песен </li>
                  <li><strong>🔢 Математика</strong> — Не пугайся, там нетрудно</li>
                  <li><strong>🖼️ Картинки</strong> — Найди связь между изображениями</li>
                </ul>
                
                <p>За каждый пройденный блок ты получиь одну цифру от кода. Разрешено пользоваться помощью друзей.</p>
                
                <p className="warning">Никаких ножниц!!! <br/>
                   Даже не думай резать ленточки и так открывать коробку :(</p>
                
                <p className="signature">Надеюсь будет интересно и увлекательно, ну и мило тоже<br/>
                <br/>
                P.S. Тестировщиков сайта не было… <br/>
                Если что, то все баги - это на самом деле фичи <br/>
                <br/>
                <em>- Твой тёмч</em></p>
              </div>
              
              <button className="continue-button" onClick={handleContinue}>
                Хочу уже быстрее открыть коробку!
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Letter;