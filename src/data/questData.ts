export const QUEST_DIGITS = ['1', '4', '3', '8'];

export const BLOCKS_DATA = [
  {
    title: 'Воспоминания',
    description: 'Вспомни прекрасные ммоменты',
    icon: '🧠',
    digit: '1'
  },
  {
    title: 'Цитаты',
    description: 'Составь фразы',
    icon: '💬',
    digit: '4'
  },
  {
    title: 'Математика',
    description: 'Реши примерчик',
    icon: '🔢',
    digit: '3'
  },
  {
    title: 'Картинки',
    description: 'Найди общее',
    icon: '🖼️',
    digit: '8'
  }
];

export const QUIZ_QUESTIONS = [
  {
    question: 'Какой химический элемент обозначается символом Au?',
    options: ['Алюминий', 'Золото', 'Серебро', 'Медь'],
    correct: 1
  },
  {
    question: 'В каком году была основана компания Google?',
    options: ['1996', '1998', '2000', '2002'],
    correct: 1
  },
  {
    question: 'Какая планета является самой большой в Солнечной системе?',
    options: ['Сатурн', 'Нептун', 'Юпитер', 'Уран'],
    correct: 2
  },
  {
    question: 'Кто написал роман "Война и мир"?',
    options: ['Достоевский', 'Толстой', 'Пушкин', 'Гоголь'],
    correct: 1
  },
  {
    question: 'Какой газ составляет большую часть атмосферы Земли?',
    options: ['Кислород', 'Углекислый газ', 'Азот', 'Водород'],
    correct: 2
  },
  {
    question: 'В каком году закончилась Вторая мировая война?',
    options: ['1944', '1945', '1946', '1947'],
    correct: 1
  },
  {
    question: 'Столица Австралии?',
    options: ['Сидней', 'Мельбурн', 'Канберра', 'Перт'],
    correct: 2
  }
];

export const QUOTE_QUESTIONS = [
  {
    hint: 'Известная фраза из фильма "Терминатор"',
    words: ['Я', 'вернусь'],
    correct: ['Я', 'вернусь']
  },
  {
    hint: 'Фраза Йоды из "Звездных войн"',
    words: ['сила', 'Да', 'пребудет', 'с', 'тобой'],
    correct: ['Да', 'пребудет', 'с', 'тобой', 'сила']
  },
  {
    hint: 'Из песни Виктора Цоя',
    words: ['Кино', 'будет', 'перемен', 'Мы', 'ждем'],
    correct: ['Мы', 'ждем', 'перемен']
  },
  {
    hint: 'Известная фраза из "Форреста Гампа"',
    words: ['как', 'коробка', 'Жизнь', 'шоколадок', 'это'],
    correct: ['Жизнь', 'это', 'как', 'коробка', 'шоколадок']
  },
  {
    hint: 'Из мультфильма "Король Лев"',
    words: ['Акуна', 'Матата'],
    correct: ['Акуна', 'Матата']
  },
  {
    hint: 'Из фильма "Матрица"',
    words: ['красную', 'Выбирай', 'таблетку'],
    correct: ['Выбирай', 'красную', 'таблетку']
  },
  {
    hint: 'Из сериала "Игра престолов"',
    words: ['идет', 'Зима'],
    correct: ['Зима', 'идет']
  }
];

export const MATH_QUESTIONS = [
  {
    question: 'Сколько дней в високосном году?',
    answer: 1,
    position: 0
  },
  {
    question: 'Сколько сторон у куба?',
    answer: 2,
    position: 1
  },
  {
    question: 'Результат: 2 + 2 = ?',
    answer: 3,
    position: 2
  },
  {
    question: 'Сколько месяцев в году?',
    answer: 4,
    position: 3
  },
  {
    question: 'Квадратный корень из 25?',
    answer: 5,
    position: 4
  }
];

export const ASSOCIATION_QUESTIONS = [
  {
    images: [
      'https://images.pexels.com/photos/1367269/pexels-photo-1367269.jpeg', // красное яблоко
      'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg', // красная роза
      'https://images.pexels.com/photos/46024/pexels-photo-46024.jpeg', // красная машина
      'https://images.pexels.com/photos/1029896/pexels-photo-1029896.jpeg' // красные губы
    ],
    answer: ['КРАСНЫЙ', 'ЦВЕТ'],
    hint: 'Что объединяет все эти изображения?'
  },
  {
    images: [
      'https://images.pexels.com/photos/374074/pexels-photo-374074.jpeg', // круглый мяч
      'https://images.pexels.com/photos/1367269/pexels-photo-1367269.jpeg', // круглое яблоко
      'https://images.pexels.com/photos/1146134/pexels-photo-1146134.jpeg', // круглые часы
      'https://images.pexels.com/photos/1109541/pexels-photo-1109541.jpeg' // круглая тарелка
    ],
    answer: ['КРУГЛАЯ', 'ФОРМА'],
    hint: 'Какая общая характеристика у всех предметов?'
  },
  {
    images: [
      'https://images.pexels.com/photos/1109541/pexels-photo-1109541.jpeg', // горячий кофе
      'https://images.pexels.com/photos/1146134/pexels-photo-1146134.jpeg', // горячий суп
      'https://images.pexels.com/photos/1029896/pexels-photo-1029896.jpeg', // горячий чай
      'https://images.pexels.com/photos/374074/pexels-photo-374074.jpeg' // горячая пицца
    ],
    answer: ['ГОРЯЧАЯ', 'ЕДА'],
    hint: 'Что общего у всех этих блюд?'
  },
  {
    images: [
      'https://images.pexels.com/photos/1146134/pexels-photo-1146134.jpeg', // собака
      'https://images.pexels.com/photos/1029896/pexels-photo-1029896.jpeg', // кошка
      'https://images.pexels.com/photos/374074/pexels-photo-374074.jpeg', // хомяк
      'https://images.pexels.com/photos/1109541/pexels-photo-1109541.jpeg' // попугай
    ],
    answer: ['ЖИВОТНЫЕ'],
    hint: 'Кто изображен на всех картинках?'
  },
  {
    images: [
      'https://images.pexels.com/photos/1367269/pexels-photo-1367269.jpeg', // зима
      'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg', // весна
      'https://images.pexels.com/photos/46024/pexels-photo-46024.jpeg', // лето
      'https://images.pexels.com/photos/1029896/pexels-photo-1029896.jpeg' // осень
    ],
    answer: ['ВРЕМЕНА'],
    hint: 'Что изображено на картинках?'
  },
  {
    images: [
      'https://images.pexels.com/photos/374074/pexels-photo-374074.jpeg', // автомобиль
      'https://images.pexels.com/photos/1109541/pexels-photo-1109541.jpeg', // автобус
      'https://images.pexels.com/photos/1146134/pexels-photo-1146134.jpeg', // велосипед
      'https://images.pexels.com/photos/1029896/pexels-photo-1029896.jpeg' // самолет
    ],
    answer: ['ТРАНСПОРТ'],
    hint: 'Что объединяет все эти предметы?'
  },
  {
    images: [
      'https://images.pexels.com/photos/1367269/pexels-photo-1367269.jpeg', // яблоко
      'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg', // банан
      'https://images.pexels.com/photos/46024/pexels-photo-46024.jpeg', // апельсин
      'https://images.pexels.com/photos/374074/pexels-photo-374074.jpeg' // виноград
    ],
    answer: ['ФРУКТЫ'],
    hint: 'Что изображено на всех картинках?'
  },
  {
    images: [
      'https://images.pexels.com/photos/1109541/pexels-photo-1109541.jpeg', // книга
      'https://images.pexels.com/photos/1146134/pexels-photo-1146134.jpeg', // ручка
      'https://images.pexels.com/photos/1029896/pexels-photo-1029896.jpeg', // тетрадь
      'https://images.pexels.com/photos/1367269/pexels-photo-1367269.jpeg' // карандаш
    ],
    answer: ['УЧЕБА'],
    hint: 'Для чего используются все эти предметы?'
  }
];