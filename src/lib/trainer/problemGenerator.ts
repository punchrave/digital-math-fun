// Генератор математических задач высшей математики с адаптивной сложностью

import { Problem, TopicSlug } from './types';

// Утилита для получения случайного числа в диапазоне
function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Случайный выбор из массива
function randomChoice<T>(arr: T[]): T {
  return arr[randomInt(0, arr.length - 1)];
}

// ===== ПРЕДЕЛЫ =====
function generateLimits(level: number): Problem {
  let text: string;
  let answer: string;
  let hint: string | undefined;
  
  switch (level) {
    case 1: {
      // lim (ax + b) при x→c
      const a = randomInt(1, 5);
      const b = randomInt(-10, 10);
      const c = randomInt(1, 5);
      const result = a * c + b;
      text = `lim(${a}x ${b >= 0 ? '+' : ''}${b}) при x→${c}`;
      answer = String(result);
      hint = 'Подставьте значение x в выражение';
      break;
    }
    case 2: {
      // lim (x² - a²)/(x - a) при x→a
      const a = randomInt(2, 6);
      text = `lim((x² - ${a*a})/(x - ${a})) при x→${a}`;
      answer = String(2 * a);
      hint = 'Разложите числитель: x² - a² = (x-a)(x+a)';
      break;
    }
    case 3: {
      // lim sin(ax)/x при x→0
      const a = randomInt(2, 5);
      text = `lim(sin(${a}x)/x) при x→0`;
      answer = String(a);
      hint = 'Первый замечательный предел: lim(sin(x)/x) = 1';
      break;
    }
    case 4: {
      // lim (1 + 1/n)^n при n→∞
      text = `lim(1 + 1/n)^n при n→∞`;
      answer = 'e';
      hint = 'Второй замечательный предел';
      break;
    }
    case 5:
    default: {
      // lim ((x+a)/(x+b))^x при x→∞
      const a = randomInt(1, 3);
      const b = randomInt(1, 3);
      const diff = a - b;
      text = `lim((x+${a})/(x+${b}))^x при x→∞`;
      answer = `e^${diff}`;
      hint = 'Сведите к второму замечательному пределу';
      break;
    }
  }
  
  return { text, answer, difficulty: level, hint };
}

// ===== ПРОИЗВОДНЫЕ =====
function generateDerivatives(level: number): Problem {
  let text: string;
  let answer: string;
  let hint: string | undefined;
  
  switch (level) {
    case 1: {
      // (ax^n)' = ?
      const a = randomInt(2, 6);
      const n = randomInt(2, 4);
      text = `Найдите (${a}x^${n})'`;
      answer = `${a * n}x^${n - 1}`;
      hint = '(xⁿ)\' = n·xⁿ⁻¹';
      break;
    }
    case 2: {
      // (sin x)' или (cos x)'
      const isSin = Math.random() > 0.5;
      text = isSin ? `Найдите (sin x)'` : `Найдите (cos x)'`;
      answer = isSin ? 'cos x' : '-sin x';
      hint = 'Табличные производные тригонометрических функций';
      break;
    }
    case 3: {
      // (e^ax)'
      const a = randomInt(2, 5);
      text = `Найдите (e^${a}x)'`;
      answer = `${a}e^${a}x`;
      hint = '(eᵃˣ)\' = a·eᵃˣ';
      break;
    }
    case 4: {
      // (ln(ax))'
      const a = randomInt(2, 5);
      text = `Найдите (ln(${a}x))'`;
      answer = '1/x';
      hint = '(ln(ax))\' = 1/x для любого a > 0';
      break;
    }
    case 5:
    default: {
      // Сложная функция
      const a = randomInt(2, 4);
      text = `Найдите (sin(${a}x²))'`;
      answer = `${2*a}x·cos(${a}x²)`;
      hint = 'Используйте правило сложной функции';
      break;
    }
  }
  
  return { text, answer, difficulty: level, hint };
}

// ===== ИНТЕГРАЛЫ =====
function generateIntegrals(level: number): Problem {
  let text: string;
  let answer: string;
  let hint: string | undefined;
  
  switch (level) {
    case 1: {
      // ∫x^n dx
      const n = randomInt(2, 5);
      text = `∫x^${n} dx = ?`;
      answer = `x^${n+1}/${n+1}+C`;
      hint = '∫xⁿdx = xⁿ⁺¹/(n+1) + C';
      break;
    }
    case 2: {
      // ∫a dx
      const a = randomInt(2, 8);
      text = `∫${a} dx = ?`;
      answer = `${a}x+C`;
      hint = '∫a dx = ax + C';
      break;
    }
    case 3: {
      // ∫cos(x) dx или ∫sin(x) dx
      const isCos = Math.random() > 0.5;
      text = isCos ? `∫cos(x) dx = ?` : `∫sin(x) dx = ?`;
      answer = isCos ? 'sin(x)+C' : '-cos(x)+C';
      hint = 'Табличные интегралы тригонометрических функций';
      break;
    }
    case 4: {
      // ∫e^x dx
      text = `∫e^x dx = ?`;
      answer = 'e^x+C';
      hint = 'Интеграл экспоненты равен самой экспоненте';
      break;
    }
    case 5:
    default: {
      // ∫1/x dx
      text = `∫(1/x) dx = ?`;
      answer = 'ln|x|+C';
      hint = '∫(1/x)dx = ln|x| + C';
      break;
    }
  }
  
  return { text, answer, difficulty: level, hint };
}

// ===== ЛОГАРИФМЫ =====
function generateLogarithms(level: number): Problem {
  let text: string;
  let answer: string;
  let hint: string | undefined;
  
  switch (level) {
    case 1: {
      // log_a(a^n) = n
      const a = randomChoice([2, 3, 5, 10]);
      const n = randomInt(2, 5);
      text = `log${a === 10 ? '' : '_' + a}(${Math.pow(a, n)}) = ?`;
      answer = String(n);
      hint = 'log_a(aⁿ) = n';
      break;
    }
    case 2: {
      // ln(e^n) = n
      const n = randomInt(2, 6);
      text = `ln(e^${n}) = ?`;
      answer = String(n);
      hint = 'ln(eⁿ) = n';
      break;
    }
    case 3: {
      // log_a(b) + log_a(c) = log_a(bc)
      const a = randomChoice([2, 10]);
      const b = randomInt(2, 4);
      const c = randomInt(2, 4);
      const aStr = a === 10 ? '' : `_${a}`;
      text = `log${aStr}(${b}) + log${aStr}(${c}) = log${aStr}(?)`;
      answer = String(b * c);
      hint = 'log(a) + log(b) = log(a·b)';
      break;
    }
    case 4: {
      // n·log_a(b) = log_a(b^n)
      const n = randomInt(2, 4);
      const b = randomInt(2, 5);
      text = `${n}·log_2(${b}) = log_2(?)`;
      answer = String(Math.pow(b, n));
      hint = 'n·log(a) = log(aⁿ)';
      break;
    }
    case 5:
    default: {
      // Переход к другому основанию
      text = `log_4(16) = ?`;
      answer = '2';
      hint = '4² = 16';
      break;
    }
  }
  
  return { text, answer, difficulty: level, hint };
}

// ===== МАТРИЦЫ =====
function generateMatrices(level: number): Problem {
  let text: string;
  let answer: string;
  let hint: string | undefined;
  
  switch (level) {
    case 1: {
      // Сложение 2x2
      const a = randomInt(1, 5);
      const b = randomInt(1, 5);
      const c = randomInt(1, 5);
      const d = randomInt(1, 5);
      text = `|${a} ${b}| + |${c} ${d}| = |? ?| (первый элемент)`;
      answer = String(a + c);
      hint = 'Складываем соответствующие элементы';
      break;
    }
    case 2: {
      // Умножение на скаляр
      const k = randomInt(2, 4);
      const a = randomInt(1, 5);
      text = `${k}·|${a}| = ?`;
      answer = String(k * a);
      hint = 'Умножаем каждый элемент на скаляр';
      break;
    }
    case 3: {
      // Определитель 2x2
      const a = randomInt(1, 5);
      const b = randomInt(1, 5);
      const c = randomInt(1, 5);
      const d = randomInt(1, 5);
      text = `det|${a} ${b}; ${c} ${d}| = ?`;
      answer = String(a * d - b * c);
      hint = 'det = ad - bc';
      break;
    }
    case 4: {
      // След матрицы
      const a = randomInt(1, 9);
      const d = randomInt(1, 9);
      text = `tr|${a} *; * ${d}| = ? (след матрицы)`;
      answer = String(a + d);
      hint = 'След = сумма элементов главной диагонали';
      break;
    }
    case 5:
    default: {
      // Определитель 3x3 (простой)
      text = `det|1 0 0; 0 2 0; 0 0 3| = ?`;
      answer = '6';
      hint = 'Для диагональной матрицы det = произведение диагональных элементов';
      break;
    }
  }
  
  return { text, answer, difficulty: level, hint };
}

// ===== СИСТЕМЫ УРАВНЕНИЙ =====
function generateLinearSystems(level: number): Problem {
  let text: string;
  let answer: string;
  let hint: string | undefined;
  
  switch (level) {
    case 1: {
      // x + y = a, x = b → y = ?
      const x = randomInt(1, 5);
      const y = randomInt(1, 5);
      text = `x + y = ${x + y}, x = ${x}. Найдите y`;
      answer = String(y);
      hint = 'Подставьте x во второе уравнение';
      break;
    }
    case 2: {
      // 2x2 простая система
      const x = randomInt(1, 5);
      const y = randomInt(1, 5);
      text = `x + y = ${x + y}, x - y = ${x - y}. Найдите x`;
      answer = String(x);
      hint = 'Сложите оба уравнения';
      break;
    }
    case 3: {
      // Определитель системы
      const a = randomInt(1, 4);
      const b = randomInt(1, 4);
      const c = randomInt(1, 4);
      const d = randomInt(1, 4);
      text = `Главный определитель: |${a} ${b}; ${c} ${d}| = ?`;
      answer = String(a * d - b * c);
      hint = 'Δ = a₁b₂ - a₂b₁';
      break;
    }
    case 4: {
      // Метод Крамера
      const x = 2;
      text = `x + 2y = 5, 2x + y = 4. Найдите x (метод Крамера)`;
      answer = '1';
      hint = 'x = Δx/Δ';
      break;
    }
    case 5:
    default: {
      text = `Ранг матрицы |1 2; 2 4| = ?`;
      answer = '1';
      hint = 'Вторая строка = 2 × первая строка';
      break;
    }
  }
  
  return { text, answer, difficulty: level, hint };
}

// ===== РЯДЫ =====
function generateSeries(level: number): Problem {
  let text: string;
  let answer: string;
  let hint: string | undefined;
  
  switch (level) {
    case 1: {
      // Арифметическая прогрессия
      const a1 = randomInt(1, 5);
      const d = randomInt(1, 3);
      const n = randomInt(3, 5);
      text = `a₁=${a1}, d=${d}. Найдите a${n}`;
      answer = String(a1 + (n - 1) * d);
      hint = 'aₙ = a₁ + (n-1)d';
      break;
    }
    case 2: {
      // Геометрическая прогрессия
      const b1 = randomInt(1, 3);
      const q = randomInt(2, 3);
      const n = 3;
      text = `b₁=${b1}, q=${q}. Найдите b${n}`;
      answer = String(b1 * Math.pow(q, n - 1));
      hint = 'bₙ = b₁·qⁿ⁻¹';
      break;
    }
    case 3: {
      // Сумма арифметической прогрессии
      const a1 = 1;
      const an = randomInt(5, 10);
      const n = an;
      text = `S = 1 + 2 + ... + ${an} = ?`;
      answer = String((n * (a1 + an)) / 2);
      hint = 'S = n(a₁ + aₙ)/2';
      break;
    }
    case 4: {
      // Сумма бесконечной геом. прогрессии
      text = `Σ(1/2)ⁿ при n от 0 до ∞ = ?`;
      answer = '2';
      hint = 'S = b₁/(1-q) при |q| < 1';
      break;
    }
    case 5:
    default: {
      // Сходимость
      text = `Ряд Σ(1/n) при n→∞ сходится? (да/нет)`;
      answer = 'нет';
      hint = 'Гармонический ряд расходится';
      break;
    }
  }
  
  return { text, answer, difficulty: level, hint };
}

// ===== ДИФ. УРАВНЕНИЯ =====
function generateDiffEquations(level: number): Problem {
  let text: string;
  let answer: string;
  let hint: string | undefined;
  
  switch (level) {
    case 1: {
      // y' = a
      const a = randomInt(2, 6);
      text = `y' = ${a}. Найдите y`;
      answer = `${a}x+C`;
      hint = 'Проинтегрируйте обе части';
      break;
    }
    case 2: {
      // y' = ax
      const a = randomInt(2, 4);
      text = `y' = ${a}x. Найдите y`;
      answer = `${a/2 === Math.floor(a/2) ? a/2 : a + '/2'}x²+C`;
      hint = '∫ax dx = (a/2)x² + C';
      break;
    }
    case 3: {
      // y' = y
      text = `y' = y. Общее решение?`;
      answer = 'Ce^x';
      hint = 'Разделите переменные: dy/y = dx';
      break;
    }
    case 4: {
      // y' = ky
      const k = randomInt(2, 4);
      text = `y' = ${k}y. Общее решение?`;
      answer = `Ce^${k}x`;
      hint = 'Решение: y = Ce^(kx)';
      break;
    }
    case 5:
    default: {
      // y'' = 0
      text = `y'' = 0. Общее решение?`;
      answer = 'C₁x+C₂';
      hint = 'Интегрируем дважды';
      break;
    }
  }
  
  return { text, answer, difficulty: level, hint };
}

// ===== КОМПЛЕКСНЫЕ ЧИСЛА =====
function generateComplexNumbers(level: number): Problem {
  let text: string;
  let answer: string;
  let hint: string | undefined;
  
  switch (level) {
    case 1: {
      // Сложение
      const a = randomInt(1, 5);
      const b = randomInt(1, 5);
      const c = randomInt(1, 5);
      const d = randomInt(1, 5);
      text = `(${a}+${b}i) + (${c}+${d}i) = ?`;
      answer = `${a+c}+${b+d}i`;
      hint = 'Складываем отдельно действительные и мнимые части';
      break;
    }
    case 2: {
      // Модуль
      const a = 3;
      const b = 4;
      text = `|${a}+${b}i| = ?`;
      answer = '5';
      hint = '|z| = √(a² + b²)';
      break;
    }
    case 3: {
      // i² = ?
      text = `i² = ?`;
      answer = '-1';
      hint = 'По определению мнимой единицы';
      break;
    }
    case 4: {
      // i³ = ?
      text = `i³ = ?`;
      answer = '-i';
      hint = 'i³ = i² · i = -1 · i';
      break;
    }
    case 5:
    default: {
      // i⁴ = ?
      text = `i⁴ = ?`;
      answer = '1';
      hint = 'i⁴ = (i²)² = (-1)² = 1';
      break;
    }
  }
  
  return { text, answer, difficulty: level, hint };
}

// ===== ВЕКТОРЫ =====
function generateVectors(level: number): Problem {
  let text: string;
  let answer: string;
  let hint: string | undefined;
  
  switch (level) {
    case 1: {
      // Сложение векторов
      const a1 = randomInt(1, 5);
      const a2 = randomInt(1, 5);
      const b1 = randomInt(1, 5);
      const b2 = randomInt(1, 5);
      text = `(${a1};${a2}) + (${b1};${b2}) = (x;y). x = ?`;
      answer = String(a1 + b1);
      hint = 'Складываем соответствующие координаты';
      break;
    }
    case 2: {
      // Умножение на скаляр
      const k = randomInt(2, 4);
      const a = randomInt(1, 5);
      text = `${k}·(${a};?) = (${k*a};6). ? = ?`;
      answer = String(6 / k);
      hint = 'При умножении на скаляр каждая координата умножается на k';
      break;
    }
    case 3: {
      // Длина вектора
      const a = 3;
      const b = 4;
      text = `|a| = ?, если a = (${a};${b})`;
      answer = '5';
      hint = '|a| = √(x² + y²)';
      break;
    }
    case 4: {
      // Скалярное произведение
      const a1 = randomInt(1, 3);
      const a2 = randomInt(1, 3);
      const b1 = randomInt(1, 3);
      const b2 = randomInt(1, 3);
      text = `(${a1};${a2})·(${b1};${b2}) = ?`;
      answer = String(a1 * b1 + a2 * b2);
      hint = 'a·b = x₁x₂ + y₁y₂';
      break;
    }
    case 5:
    default: {
      // Перпендикулярность
      text = `Векторы (2;3) и (-3;2) перпендикулярны? (да/нет)`;
      answer = 'да';
      hint = 'Перпендикулярны, если скалярное произведение = 0';
      break;
    }
  }
  
  return { text, answer, difficulty: level, hint };
}

// Главная функция генерации задачи
export function generateProblem(topic: TopicSlug, level: number): Problem {
  const clampedLevel = Math.max(1, Math.min(5, level));
  
  switch (topic) {
    case 'limits':
      return generateLimits(clampedLevel);
    case 'derivatives':
      return generateDerivatives(clampedLevel);
    case 'integrals':
      return generateIntegrals(clampedLevel);
    case 'logarithms':
      return generateLogarithms(clampedLevel);
    case 'matrices':
      return generateMatrices(clampedLevel);
    case 'linear_systems':
      return generateLinearSystems(clampedLevel);
    case 'series':
      return generateSeries(clampedLevel);
    case 'diff_equations':
      return generateDiffEquations(clampedLevel);
    case 'complex_numbers':
      return generateComplexNumbers(clampedLevel);
    case 'vectors':
      return generateVectors(clampedLevel);
    default:
      return generateLimits(clampedLevel);
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
  const isQuick = timeMs < 10000; // Для высшей математики 10 секунд — быстро
  
  let levelChange = 0;
  
  if (isCorrect && isQuick && accuracy >= 0.8) {
    levelChange = 1;
  } else if (!isCorrect && accuracy < 0.5) {
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
  
  // Базовые очки за правильные ответы (больше для высшей математики)
  const basePoints = correctAnswers * 15 * level;
  
  // Бонус за точность
  const accuracyBonus = Math.round(accuracy * 75);
  
  // Бонус за скорость
  const speedBonus = averageTimeMs < 8000 ? 40 : averageTimeMs < 15000 ? 20 : 0;
  
  // Бонус за серию
  const streakBonus = bestStreak * 10;
  
  return basePoints + accuracyBonus + speedBonus + streakBonus;
}
