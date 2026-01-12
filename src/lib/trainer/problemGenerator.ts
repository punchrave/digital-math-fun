// Генератор математических задач с адаптивной сложностью

import { Problem, TopicSlug } from './types';

// Утилита для получения случайного числа в диапазоне
function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Наибольший общий делитель для дробей
function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

// Генератор задач по арифметике
function generateArithmetic(level: number): Problem {
  const operations = ['+', '-', '×', '÷'];
  
  let maxNum: number;
  let allowNegative = false;
  let allowMultipleOps = false;
  
  switch (level) {
    case 1:
      maxNum = 10;
      break;
    case 2:
      maxNum = 50;
      break;
    case 3:
      maxNum = 100;
      break;
    case 4:
      maxNum = 500;
      allowNegative = true;
      break;
    case 5:
    default:
      maxNum = 1000;
      allowNegative = true;
      allowMultipleOps = true;
  }
  
  const op = operations[randomInt(0, level >= 3 ? 3 : 1)];
  let a = randomInt(allowNegative ? -maxNum : 1, maxNum);
  let b = randomInt(allowNegative ? -maxNum : 1, maxNum);
  let answer: number;
  let text: string;
  
  switch (op) {
    case '+':
      answer = a + b;
      text = `${a} + ${b < 0 ? `(${b})` : b}`;
      break;
    case '-':
      answer = a - b;
      text = `${a} - ${b < 0 ? `(${b})` : b}`;
      break;
    case '×':
      // Для умножения уменьшаем числа
      a = randomInt(2, Math.min(maxNum, 20));
      b = randomInt(2, Math.min(maxNum, level >= 3 ? 50 : 12));
      answer = a * b;
      text = `${a} × ${b}`;
      break;
    case '÷':
      // Генерируем делимое как произведение
      b = randomInt(2, Math.min(maxNum, 12));
      const quotient = randomInt(2, Math.min(maxNum, level >= 3 ? 20 : 10));
      a = b * quotient;
      answer = quotient;
      text = `${a} ÷ ${b}`;
      break;
    default:
      answer = a + b;
      text = `${a} + ${b}`;
  }
  
  // Для высокого уровня добавляем третье число
  if (allowMultipleOps && Math.random() > 0.5) {
    const op2 = operations[randomInt(0, 1)];
    const c = randomInt(1, 50);
    if (op2 === '+') {
      answer = answer + c;
      text = `${text} + ${c}`;
    } else {
      answer = answer - c;
      text = `${text} - ${c}`;
    }
  }
  
  return {
    text: `${text} = ?`,
    answer: String(answer),
    difficulty: level,
  };
}

// Генератор задач по дробям
function generateFractions(level: number): Problem {
  let text: string;
  let answer: string;
  
  switch (level) {
    case 1: {
      // Простые дроби с одинаковым знаменателем
      const denom = randomInt(2, 6);
      const num1 = randomInt(1, denom - 1);
      const num2 = randomInt(1, denom - num1);
      const resultNum = num1 + num2;
      const g = gcd(resultNum, denom);
      text = `${num1}/${denom} + ${num2}/${denom} = ?`;
      answer = g > 1 ? `${resultNum / g}/${denom / g}` : `${resultNum}/${denom}`;
      if (resultNum === denom) answer = '1';
      break;
    }
    case 2: {
      // Дроби с разными знаменателями (простые)
      const denom1 = randomInt(2, 4);
      const denom2 = denom1 * randomInt(2, 3);
      const num1 = randomInt(1, denom1 - 1);
      const num2 = randomInt(1, denom2 - 1);
      const commonDenom = denom2;
      const resultNum = (num1 * (denom2 / denom1)) + num2;
      const g = gcd(resultNum, commonDenom);
      text = `${num1}/${denom1} + ${num2}/${denom2} = ?`;
      answer = resultNum >= commonDenom 
        ? `${Math.floor(resultNum / commonDenom)} ${(resultNum % commonDenom) / g}/${commonDenom / g}`.trim()
        : `${resultNum / g}/${commonDenom / g}`;
      if (resultNum % commonDenom === 0) answer = String(resultNum / commonDenom);
      break;
    }
    case 3: {
      // Десятичные дроби
      const a = (randomInt(10, 99) / 10).toFixed(1);
      const b = (randomInt(10, 99) / 10).toFixed(1);
      const op = Math.random() > 0.5 ? '+' : '-';
      const result = op === '+' 
        ? (parseFloat(a) + parseFloat(b)).toFixed(1)
        : (parseFloat(a) - parseFloat(b)).toFixed(1);
      text = `${a} ${op} ${b} = ?`;
      answer = result;
      break;
    }
    case 4: {
      // Умножение дробей
      const num1 = randomInt(1, 5);
      const denom1 = randomInt(2, 6);
      const num2 = randomInt(1, 5);
      const denom2 = randomInt(2, 6);
      const resultNum = num1 * num2;
      const resultDenom = denom1 * denom2;
      const g = gcd(resultNum, resultDenom);
      text = `${num1}/${denom1} × ${num2}/${denom2} = ?`;
      answer = `${resultNum / g}/${resultDenom / g}`;
      if (resultNum / g === resultDenom / g) answer = '1';
      if (resultDenom / g === 1) answer = String(resultNum / g);
      break;
    }
    case 5:
    default: {
      // Деление дробей
      const num1 = randomInt(1, 6);
      const denom1 = randomInt(2, 8);
      const num2 = randomInt(1, 6);
      const denom2 = randomInt(2, 8);
      const resultNum = num1 * denom2;
      const resultDenom = denom1 * num2;
      const g = gcd(resultNum, resultDenom);
      text = `${num1}/${denom1} ÷ ${num2}/${denom2} = ?`;
      answer = `${resultNum / g}/${resultDenom / g}`;
      if (resultNum / g === resultDenom / g) answer = '1';
      if (resultDenom / g === 1) answer = String(resultNum / g);
      break;
    }
  }
  
  return { text, answer, difficulty: level };
}

// Генератор задач по уравнениям
function generateEquations(level: number): Problem {
  let text: string;
  let answer: string;
  
  switch (level) {
    case 1: {
      // x + a = b
      const a = randomInt(1, 10);
      const x = randomInt(1, 10);
      const b = x + a;
      text = `x + ${a} = ${b}`;
      answer = String(x);
      break;
    }
    case 2: {
      // ax = b
      const a = randomInt(2, 10);
      const x = randomInt(1, 10);
      const b = a * x;
      text = `${a}x = ${b}`;
      answer = String(x);
      break;
    }
    case 3: {
      // ax + b = c
      const a = randomInt(2, 5);
      const x = randomInt(1, 10);
      const b = randomInt(1, 20);
      const c = a * x + b;
      text = `${a}x + ${b} = ${c}`;
      answer = String(x);
      break;
    }
    case 4: {
      // ax + b = cx + d
      const x = randomInt(1, 10);
      const a = randomInt(2, 8);
      const c = randomInt(1, a - 1);
      const b = randomInt(1, 20);
      const d = (a - c) * x + b;
      text = `${a}x + ${b} = ${c}x + ${d}`;
      answer = String(x);
      break;
    }
    case 5:
    default: {
      // x² = a (с целым корнем)
      const x = randomInt(2, 12);
      const a = x * x;
      text = `x² = ${a}`;
      answer = String(x); // Принимаем положительный корень
      break;
    }
  }
  
  return { text, answer, difficulty: level };
}

// Генератор задач по степеням
function generatePowers(level: number): Problem {
  let text: string;
  let answer: string;
  
  switch (level) {
    case 1: {
      // a² = ?
      const a = randomInt(2, 10);
      text = `${a}² = ?`;
      answer = String(a * a);
      break;
    }
    case 2: {
      // a³ = ?
      const a = randomInt(2, 6);
      text = `${a}³ = ?`;
      answer = String(a * a * a);
      break;
    }
    case 3: {
      // √a = ?
      const x = randomInt(2, 12);
      const a = x * x;
      text = `√${a} = ?`;
      answer = String(x);
      break;
    }
    case 4: {
      // a^n × a^m = ?
      const a = randomInt(2, 5);
      const n = randomInt(1, 3);
      const m = randomInt(1, 3);
      text = `${a}^${n} × ${a}^${m} = ${a}^?`;
      answer = String(n + m);
      break;
    }
    case 5:
    default: {
      // (a^n)^m = ?
      const a = randomInt(2, 4);
      const n = randomInt(2, 3);
      const m = randomInt(2, 3);
      text = `(${a}^${n})^${m} = ${a}^?`;
      answer = String(n * m);
      break;
    }
  }
  
  return { text, answer, difficulty: level };
}

// Генератор задач по процентам
function generatePercentages(level: number): Problem {
  let text: string;
  let answer: string;
  
  switch (level) {
    case 1: {
      // 10% от числа
      const base = randomInt(2, 10) * 10;
      const percent = 10;
      text = `${percent}% от ${base} = ?`;
      answer = String((base * percent) / 100);
      break;
    }
    case 2: {
      // Простые проценты
      const base = randomInt(2, 20) * 10;
      const percent = randomInt(1, 5) * 10;
      text = `${percent}% от ${base} = ?`;
      answer = String((base * percent) / 100);
      break;
    }
    case 3: {
      // Найти процент
      const base = randomInt(2, 10) * 10;
      const percent = randomInt(1, 9) * 10;
      const part = (base * percent) / 100;
      text = `${part} это ?% от ${base}`;
      answer = String(percent);
      break;
    }
    case 4: {
      // Найти целое
      const base = randomInt(10, 50) * 10;
      const percent = randomInt(2, 5) * 10;
      const part = (base * percent) / 100;
      text = `${part} это ${percent}% от ?`;
      answer = String(base);
      break;
    }
    case 5:
    default: {
      // Сложные проценты
      const base = randomInt(50, 200);
      const percent = randomInt(5, 25);
      const result = Math.round((base * percent) / 100);
      text = `${percent}% от ${base} ≈ ?`;
      answer = String(result);
      break;
    }
  }
  
  return { text, answer, difficulty: level };
}

// Главная функция генерации задачи
export function generateProblem(topic: TopicSlug, level: number): Problem {
  const clampedLevel = Math.max(1, Math.min(5, level));
  
  switch (topic) {
    case 'arithmetic':
      return generateArithmetic(clampedLevel);
    case 'fractions':
      return generateFractions(clampedLevel);
    case 'equations':
      return generateEquations(clampedLevel);
    case 'powers':
      return generatePowers(clampedLevel);
    case 'percentages':
      return generatePercentages(clampedLevel);
    default:
      return generateArithmetic(clampedLevel);
  }
}

// Алгоритм адаптивной сложности
export function calculateNewLevel(
  currentLevel: number,
  isCorrect: boolean,
  timeMs: number,
  recentCorrectCount: number,
  recentTotalCount: number
): number {
  const accuracy = recentTotalCount > 0 ? recentCorrectCount / recentTotalCount : 0;
  const isQuick = timeMs < 5000; // Быстрый ответ < 5 секунд
  
  let levelChange = 0;
  
  if (isCorrect && isQuick && accuracy >= 0.8) {
    // Повышаем уровень при высокой точности и скорости
    levelChange = 1;
  } else if (!isCorrect && accuracy < 0.5) {
    // Понижаем при низкой точности
    levelChange = -1;
  }
  
  const newLevel = currentLevel + levelChange;
  return Math.max(1, Math.min(5, newLevel));
}

// Формула расчёта очков
export function calculateScore(
  correctAnswers: number,
  totalProblems: number,
  averageTimeMs: number,
  bestStreak: number,
  level: number
): number {
  const accuracy = totalProblems > 0 ? correctAnswers / totalProblems : 0;
  
  // Базовые очки за правильные ответы
  const basePoints = correctAnswers * 10 * level;
  
  // Бонус за точность
  const accuracyBonus = Math.round(accuracy * 50);
  
  // Бонус за скорость (если средний ответ быстрее 3 секунд)
  const speedBonus = averageTimeMs < 3000 ? 30 : averageTimeMs < 5000 ? 15 : 0;
  
  // Бонус за серию
  const streakBonus = bestStreak * 5;
  
  return basePoints + accuracyBonus + speedBonus + streakBonus;
}
