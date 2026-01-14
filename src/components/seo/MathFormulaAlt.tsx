// Утилиты для генерации alt-текстов для математических формул LaTeX
// Это инновационное решение для SEO и доступности математического контента

// Словарь для перевода LaTeX в читаемый текст
const latexToText: Record<string, string> = {
  // Греческие буквы
  '\\alpha': 'альфа',
  '\\beta': 'бета',
  '\\gamma': 'гамма',
  '\\delta': 'дельта',
  '\\epsilon': 'эпсилон',
  '\\varepsilon': 'эпсилон',
  '\\zeta': 'дзета',
  '\\eta': 'эта',
  '\\theta': 'тета',
  '\\iota': 'йота',
  '\\kappa': 'каппа',
  '\\lambda': 'лямбда',
  '\\mu': 'мю',
  '\\nu': 'ню',
  '\\xi': 'кси',
  '\\pi': 'пи',
  '\\rho': 'ро',
  '\\sigma': 'сигма',
  '\\tau': 'тау',
  '\\upsilon': 'ипсилон',
  '\\phi': 'фи',
  '\\chi': 'хи',
  '\\psi': 'пси',
  '\\omega': 'омега',
  '\\Delta': 'дельта',
  '\\Sigma': 'сигма',
  '\\Pi': 'пи',
  '\\Omega': 'омега',
  
  // Операторы
  '\\cdot': 'умножить на',
  '\\times': 'умножить на',
  '\\div': 'разделить на',
  '\\pm': 'плюс-минус',
  '\\mp': 'минус-плюс',
  '\\leq': 'меньше или равно',
  '\\geq': 'больше или равно',
  '\\neq': 'не равно',
  '\\approx': 'приблизительно равно',
  '\\equiv': 'тождественно равно',
  '\\sim': 'подобно',
  '\\propto': 'пропорционально',
  '\\infty': 'бесконечность',
  '\\partial': 'частная производная',
  '\\nabla': 'набла',
  
  // Функции
  '\\sin': 'синус',
  '\\cos': 'косинус',
  '\\tan': 'тангенс',
  '\\cot': 'котангенс',
  '\\sec': 'секанс',
  '\\csc': 'косеканс',
  '\\arcsin': 'арксинус',
  '\\arccos': 'арккосинус',
  '\\arctan': 'арктангенс',
  '\\sinh': 'гиперболический синус',
  '\\cosh': 'гиперболический косинус',
  '\\tanh': 'гиперболический тангенс',
  '\\ln': 'натуральный логарифм',
  '\\log': 'логарифм',
  '\\lg': 'десятичный логарифм',
  '\\exp': 'экспонента',
  '\\lim': 'предел',
  '\\sum': 'сумма',
  '\\prod': 'произведение',
  '\\int': 'интеграл',
  '\\iint': 'двойной интеграл',
  '\\iiint': 'тройной интеграл',
  '\\oint': 'контурный интеграл',
  
  // Корни и степени
  '\\sqrt': 'квадратный корень из',
  
  // Стрелки
  '\\to': 'стремится к',
  '\\rightarrow': 'стремится к',
  '\\leftarrow': 'стрелка влево',
  '\\Rightarrow': 'следовательно',
  '\\Leftarrow': 'следует из',
  '\\Leftrightarrow': 'эквивалентно',
  
  // Скобки
  '\\left(': 'открывающая скобка',
  '\\right)': 'закрывающая скобка',
  '\\left[': 'открывающая квадратная скобка',
  '\\right]': 'закрывающая квадратная скобка',
  '\\left\\{': 'открывающая фигурная скобка',
  '\\right\\}': 'закрывающая фигурная скобка',
  
  // Матрицы
  '\\begin{pmatrix}': 'матрица',
  '\\end{pmatrix}': '',
  '\\begin{bmatrix}': 'матрица',
  '\\end{bmatrix}': '',
  '\\begin{vmatrix}': 'определитель',
  '\\end{vmatrix}': '',
  
  // Дроби и индексы
  '\\frac': 'дробь',
  '^': 'в степени',
  '_': 'индекс',
  
  // Прочее
  '\\forall': 'для всех',
  '\\exists': 'существует',
  '\\in': 'принадлежит',
  '\\notin': 'не принадлежит',
  '\\subset': 'подмножество',
  '\\subseteq': 'подмножество или равно',
  '\\cup': 'объединение',
  '\\cap': 'пересечение',
  '\\emptyset': 'пустое множество',
  '\\mathbb{R}': 'множество вещественных чисел',
  '\\mathbb{N}': 'множество натуральных чисел',
  '\\mathbb{Z}': 'множество целых чисел',
  '\\mathbb{Q}': 'множество рациональных чисел',
  '\\mathbb{C}': 'множество комплексных чисел',
};

/**
 * Генерирует читаемый alt-текст для LaTeX формулы
 * Инновационная функция для SEO и доступности
 */
export function generateFormulaAlt(latex: string): string {
  if (!latex) return 'Математическая формула';
  
  let text = latex;
  
  // Удаляем $$ и $ для display и inline math
  text = text.replace(/\$\$/g, '').replace(/\$/g, '');
  
  // Обрабатываем дроби
  text = text.replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, (_, num, den) => {
    return `дробь ${num} делить на ${den}`;
  });
  
  // Обрабатываем квадратные корни
  text = text.replace(/\\sqrt\{([^}]+)\}/g, (_, content) => {
    return `квадратный корень из ${content}`;
  });
  
  // Обрабатываем корни n-й степени
  text = text.replace(/\\sqrt\[([^\]]+)\]\{([^}]+)\}/g, (_, n, content) => {
    return `корень ${n}-й степени из ${content}`;
  });
  
  // Обрабатываем пределы
  text = text.replace(/\\lim_\{([^}]+)\}/g, (_, limit) => {
    const cleanLimit = limit
      .replace('x \\to', 'x стремится к')
      .replace('n \\to', 'n стремится к')
      .replace('\\infty', 'бесконечности');
    return `предел при ${cleanLimit}`;
  });
  
  // Обрабатываем суммы
  text = text.replace(/\\sum_\{([^}]+)\}\^\{([^}]+)\}/g, (_, from, to) => {
    return `сумма от ${from} до ${to}`;
  });
  
  // Обрабатываем интегралы
  text = text.replace(/\\int_\{([^}]+)\}\^\{([^}]+)\}/g, (_, from, to) => {
    return `интеграл от ${from} до ${to}`;
  });
  
  // Заменяем LaTeX команды на текст
  for (const [latex, readable] of Object.entries(latexToText)) {
    const escapedLatex = latex.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    text = text.replace(new RegExp(escapedLatex, 'g'), ` ${readable} `);
  }
  
  // Обрабатываем степени
  text = text.replace(/\^\{([^}]+)\}/g, ' в степени $1');
  text = text.replace(/\^(\w)/g, ' в степени $1');
  
  // Обрабатываем индексы
  text = text.replace(/_\{([^}]+)\}/g, ' индекс $1');
  text = text.replace(/_(\w)/g, ' индекс $1');
  
  // Очистка
  text = text.replace(/\{|\}/g, '');
  text = text.replace(/\s+/g, ' ');
  text = text.trim();
  
  // Если результат пустой или слишком короткий
  if (text.length < 3) {
    return 'Математическая формула';
  }
  
  return `Формула: ${text}`;
}

/**
 * Генерирует краткое описание для темы базы знаний (для SEO)
 */
export function generateTopicSEODescription(topicName: string, formulas: string[]): string {
  const formulaDescriptions = formulas
    .slice(0, 3)
    .map(f => generateFormulaAlt(f))
    .join('. ');
  
  return `${topicName} — теория и примеры. Ключевые формулы: ${formulaDescriptions}`;
}

/**
 * Генерирует массив ключевых слов для темы
 */
export function generateTopicKeywords(topicName: string, description: string): string[] {
  const baseKeywords = [
    topicName.toLowerCase(),
    'высшая математика',
    'математика',
    'формулы',
    'примеры',
    'теория',
    'БелГУ',
    'обучение',
  ];
  
  // Извлекаем ключевые слова из описания
  const descWords = description
    .toLowerCase()
    .split(/[,\s]+/)
    .filter(word => word.length > 3)
    .slice(0, 5);
  
  return [...new Set([...baseKeywords, ...descWords])];
}
