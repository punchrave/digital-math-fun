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

// ===== ПРЕДЕЛЫ (10 уровней) =====
function generateLimits(level: number): Problem {
  const problems: (() => Problem)[] = [
    // Уровень 1: Простая подстановка
    () => {
      const a = randomInt(2, 6);
      const b = randomInt(-10, 10);
      const c = randomInt(1, 5);
      const result = a * c + b;
      return {
        text: `lim(${a}x ${b >= 0 ? '+' : ''}${b}) при x→${c}`,
        answer: String(result),
        hint: 'Подставьте значение x в выражение',
        solution: `Подставляем x = ${c}:\n${a}·${c} ${b >= 0 ? '+' : ''}${b} = ${a * c} ${b >= 0 ? '+' : ''}${b} = ${result}`,
        difficulty: 1
      };
    },
    // Уровень 2: Разложение разности квадратов
    () => {
      const a = randomInt(2, 7);
      return {
        text: `lim((x² - ${a*a})/(x - ${a})) при x→${a}`,
        answer: String(2 * a),
        hint: 'Разложите числитель: x² - a² = (x-a)(x+a)',
        solution: `Раскладываем числитель:\nx² - ${a*a} = (x - ${a})(x + ${a})\n\nlim((x - ${a})(x + ${a})/(x - ${a})) = lim(x + ${a}) = ${a} + ${a} = ${2 * a}`,
        difficulty: 2
      };
    },
    // Уровень 3: Первый замечательный предел
    () => {
      const a = randomInt(2, 6);
      return {
        text: `lim(sin(${a}x)/x) при x→0`,
        answer: String(a),
        hint: 'Первый замечательный предел: lim(sin(x)/x) = 1',
        solution: `Используем первый замечательный предел:\nlim(sin(${a}x)/x) = lim(${a}·sin(${a}x)/(${a}x)) = ${a}·lim(sin(${a}x)/(${a}x)) = ${a}·1 = ${a}`,
        difficulty: 3
      };
    },
    // Уровень 4: Второй замечательный предел
    () => ({
      text: `lim(1 + 1/n)^n при n→∞`,
      answer: 'e',
      hint: 'Это определение числа e',
      solution: 'По определению числа Эйлера:\nlim(1 + 1/n)^n = e ≈ 2.718...',
      difficulty: 4
    }),
    // Уровень 5: Модификация второго предела
    () => {
      const a = randomInt(2, 5);
      return {
        text: `lim(1 + ${a}/n)^n при n→∞`,
        answer: `e^${a}`,
        hint: 'Сведите к второму замечательному пределу',
        solution: `lim(1 + ${a}/n)^n = lim((1 + ${a}/n)^(n/${a}))^${a} = e^${a}`,
        difficulty: 5
      };
    },
    // Уровень 6: Предел с тангенсом
    () => {
      const a = randomInt(2, 4);
      return {
        text: `lim(tan(${a}x)/x) при x→0`,
        answer: String(a),
        hint: 'tan(x) = sin(x)/cos(x), используйте первый замечательный предел',
        solution: `lim(tan(${a}x)/x) = lim(sin(${a}x)/(x·cos(${a}x)))\n= lim(sin(${a}x)/x)·lim(1/cos(${a}x))\n= ${a}·1 = ${a}`,
        difficulty: 6
      };
    },
    // Уровень 7: Предел (1-cos)/x²
    () => ({
      text: `lim((1 - cos(x))/x²) при x→0`,
      answer: '1/2',
      hint: 'Используйте формулу 1 - cos(x) = 2sin²(x/2)',
      solution: `1 - cos(x) = 2sin²(x/2)\nlim(2sin²(x/2)/x²) = lim(2·(sin(x/2))²/(4·(x/2)²)·(x/2)²/x²·4)\n= 2·1²·1/4 = 1/2`,
      difficulty: 7
    }),
    // Уровень 8: Предел ln(1+x)/x
    () => ({
      text: `lim(ln(1+x)/x) при x→0`,
      answer: '1',
      hint: 'Замечательный предел для логарифма',
      solution: `Это стандартный замечательный предел:\nlim(ln(1+x)/x) = 1\nМожно доказать через определение e или правило Лопиталя`,
      difficulty: 8
    }),
    // Уровень 9: Правило Лопиталя
    () => {
      const a = randomInt(2, 4);
      return {
        text: `lim((e^(${a}x) - 1)/x) при x→0`,
        answer: String(a),
        hint: 'Применте правило Лопиталя',
        solution: `Имеем неопределённость 0/0\nПо правилу Лопиталя:\nlim((e^(${a}x) - 1)/x) = lim(${a}e^(${a}x)/1) = ${a}·e^0 = ${a}`,
        difficulty: 9
      };
    },
    // Уровень 10: Сложный предел
    () => ({
      text: `lim(x^x) при x→0+`,
      answer: '1',
      hint: 'Прологарифмируйте: ln(x^x) = x·ln(x)',
      solution: `Пусть y = x^x, тогда ln(y) = x·ln(x)\nlim(x·ln(x)) = lim(ln(x)/(1/x)) = lim((1/x)/(-1/x²)) = lim(-x) = 0\nТак как ln(y)→0, то y→e^0 = 1`,
      difficulty: 10
    }),
  ];
  
  const idx = Math.min(level - 1, problems.length - 1);
  return problems[Math.max(0, idx)]();
}

// ===== ПРОИЗВОДНЫЕ (10 уровней) =====
function generateDerivatives(level: number): Problem {
  const problems: (() => Problem)[] = [
    // Уровень 1: Степенная функция
    () => {
      const a = randomInt(2, 6);
      const n = randomInt(2, 5);
      return {
        text: `(${a}x^${n})' = ?`,
        answer: `${a * n}x^${n - 1}`,
        hint: '(xⁿ)\' = n·xⁿ⁻¹',
        solution: `(${a}x^${n})' = ${a}·${n}·x^(${n}-1) = ${a * n}x^${n - 1}`,
        difficulty: 1
      };
    },
    // Уровень 2: Тригонометрия
    () => {
      const isSin = Math.random() > 0.5;
      return {
        text: isSin ? `(sin x)' = ?` : `(cos x)' = ?`,
        answer: isSin ? 'cos x' : '-sin x',
        hint: 'Табличные производные',
        solution: isSin 
          ? '(sin x)\' = cos x — табличная производная' 
          : '(cos x)\' = -sin x — табличная производная',
        difficulty: 2
      };
    },
    // Уровень 3: Экспонента
    () => {
      const a = randomInt(2, 5);
      return {
        text: `(e^(${a}x))' = ?`,
        answer: `${a}e^(${a}x)`,
        hint: '(e^(ax))\' = a·e^(ax)',
        solution: `(e^(${a}x))' = ${a}·e^(${a}x)\nПроизводная сложной функции: внешняя e^u, внутренняя ${a}x`,
        difficulty: 3
      };
    },
    // Уровень 4: Логарифм
    () => {
      const a = randomInt(2, 5);
      return {
        text: `(ln(${a}x))' = ?`,
        answer: '1/x',
        hint: '(ln(ax))\' = (1/ax)·a = 1/x',
        solution: `(ln(${a}x))' = (1/(${a}x))·${a} = 1/x\nПроизводная ln(u) равна u'/u`,
        difficulty: 4
      };
    },
    // Уровень 5: Сложная функция
    () => {
      const a = randomInt(2, 4);
      return {
        text: `(sin(${a}x²))' = ?`,
        answer: `${2*a}x·cos(${a}x²)`,
        hint: 'Используйте правило сложной функции',
        solution: `(sin(${a}x²))' = cos(${a}x²)·(${a}x²)'\n= cos(${a}x²)·${a}·2x = ${2*a}x·cos(${a}x²)`,
        difficulty: 5
      };
    },
    // Уровень 6: Произведение функций
    () => {
      return {
        text: `(x·e^x)' = ?`,
        answer: 'e^x + x·e^x',
        hint: '(uv)\' = u\'v + uv\'',
        solution: `(x·e^x)' = (x)'·e^x + x·(e^x)'\n= 1·e^x + x·e^x = e^x(1 + x)`,
        difficulty: 6
      };
    },
    // Уровень 7: Частное функций
    () => ({
      text: `(x/e^x)' = ?`,
      answer: '(1-x)/e^x',
      hint: '(u/v)\' = (u\'v - uv\')/v²',
      solution: `(x/e^x)' = ((x)'·e^x - x·(e^x)')/(e^x)²\n= (e^x - x·e^x)/e^(2x) = (1 - x)/e^x`,
      difficulty: 7
    }),
    // Уровень 8: Обратные тригонометрические
    () => ({
      text: `(arctan(x))' = ?`,
      answer: '1/(1+x²)',
      hint: 'Табличная производная обратного тангенса',
      solution: `(arctan(x))' = 1/(1 + x²) — табличная производная`,
      difficulty: 8
    }),
    // Уровень 9: Логарифмическая производная
    () => ({
      text: `(x^x)' = ?`,
      answer: 'x^x(ln(x)+1)',
      hint: 'Прологарифмируйте: y = x^x, ln(y) = x·ln(x)',
      solution: `y = x^x, ln(y) = x·ln(x)\ny'/y = ln(x) + x·(1/x) = ln(x) + 1\ny' = x^x·(ln(x) + 1)`,
      difficulty: 9
    }),
    // Уровень 10: Неявная функция
    () => ({
      text: `x² + y² = 1. Найдите y'`,
      answer: '-x/y',
      hint: 'Продифференцируйте обе части по x',
      solution: `Дифференцируем: 2x + 2y·y' = 0\n2y·y' = -2x\ny' = -x/y`,
      difficulty: 10
    }),
  ];
  
  const idx = Math.min(level - 1, problems.length - 1);
  return problems[Math.max(0, idx)]();
}

// ===== ИНТЕГРАЛЫ (10 уровней) =====
function generateIntegrals(level: number): Problem {
  const problems: (() => Problem)[] = [
    // Уровень 1: Степенная функция
    () => {
      const n = randomInt(2, 5);
      return {
        text: `∫x^${n} dx = ?`,
        answer: `x^${n+1}/${n+1}+C`,
        hint: '∫xⁿdx = xⁿ⁺¹/(n+1) + C',
        solution: `∫x^${n} dx = x^(${n}+1)/(${n}+1) + C = x^${n+1}/${n+1} + C`,
        difficulty: 1
      };
    },
    // Уровень 2: Константа
    () => {
      const a = randomInt(2, 8);
      return {
        text: `∫${a} dx = ?`,
        answer: `${a}x+C`,
        hint: '∫a dx = ax + C',
        solution: `∫${a} dx = ${a}x + C`,
        difficulty: 2
      };
    },
    // Уровень 3: Тригонометрия
    () => {
      const isCos = Math.random() > 0.5;
      return {
        text: isCos ? `∫cos(x) dx = ?` : `∫sin(x) dx = ?`,
        answer: isCos ? 'sin(x)+C' : '-cos(x)+C',
        hint: 'Табличные интегралы',
        solution: isCos 
          ? '∫cos(x) dx = sin(x) + C' 
          : '∫sin(x) dx = -cos(x) + C',
        difficulty: 3
      };
    },
    // Уровень 4: Экспонента
    () => ({
      text: `∫e^x dx = ?`,
      answer: 'e^x+C',
      hint: 'Интеграл экспоненты равен самой экспоненте',
      solution: '∫e^x dx = e^x + C',
      difficulty: 4
    }),
    // Уровень 5: 1/x
    () => ({
      text: `∫(1/x) dx = ?`,
      answer: 'ln|x|+C',
      hint: '∫(1/x)dx = ln|x| + C',
      solution: '∫(1/x) dx = ln|x| + C\nМодуль нужен, т.к. ln определён для x > 0',
      difficulty: 5
    }),
    // Уровень 6: Линейная замена
    () => {
      const a = randomInt(2, 5);
      return {
        text: `∫e^(${a}x) dx = ?`,
        answer: `e^(${a}x)/${a}+C`,
        hint: 'Используйте замену u = ${a}x',
        solution: `Замена u = ${a}x, du = ${a}dx\n∫e^u·(du/${a}) = e^u/${a} + C = e^(${a}x)/${a} + C`,
        difficulty: 6
      };
    },
    // Уровень 7: Интеграл 1/(1+x²)
    () => ({
      text: `∫1/(1+x²) dx = ?`,
      answer: 'arctan(x)+C',
      hint: 'Табличный интеграл для арктангенса',
      solution: '∫1/(1+x²) dx = arctan(x) + C — табличный интеграл',
      difficulty: 7
    }),
    // Уровень 8: Интегрирование по частям
    () => ({
      text: `∫x·e^x dx = ?`,
      answer: 'e^x(x-1)+C',
      hint: 'Интегрирование по частям: ∫u dv = uv - ∫v du',
      solution: `u = x, dv = e^x dx\ndu = dx, v = e^x\n∫x·e^x dx = x·e^x - ∫e^x dx = x·e^x - e^x + C = e^x(x - 1) + C`,
      difficulty: 8
    }),
    // Уровень 9: Тригонометрическая замена
    () => ({
      text: `∫1/√(1-x²) dx = ?`,
      answer: 'arcsin(x)+C',
      hint: 'Табличный интеграл для арксинуса',
      solution: '∫1/√(1-x²) dx = arcsin(x) + C — табличный интеграл',
      difficulty: 9
    }),
    // Уровень 10: Определённый интеграл
    () => ({
      text: `∫₀¹ x² dx = ?`,
      answer: '1/3',
      hint: 'Вычислите первообразную и подставьте пределы',
      solution: `∫₀¹ x² dx = [x³/3]₀¹ = 1³/3 - 0³/3 = 1/3 - 0 = 1/3`,
      difficulty: 10
    }),
  ];
  
  const idx = Math.min(level - 1, problems.length - 1);
  return problems[Math.max(0, idx)]();
}

// ===== ЛОГАРИФМЫ (10 уровней) =====
function generateLogarithms(level: number): Problem {
  const problems: (() => Problem)[] = [
    // Уровень 1: Простой логарифм
    () => {
      const a = randomChoice([2, 3, 5, 10]);
      const n = randomInt(2, 4);
      const value = Math.pow(a, n);
      return {
        text: `log${a === 10 ? '' : '_' + a}(${value}) = ?`,
        answer: String(n),
        hint: 'log_a(aⁿ) = n',
        solution: `log${a === 10 ? '' : '_' + a}(${value}) = log${a === 10 ? '' : '_' + a}(${a}^${n}) = ${n}`,
        difficulty: 1
      };
    },
    // Уровень 2: Натуральный логарифм
    () => {
      const n = randomInt(2, 6);
      return {
        text: `ln(e^${n}) = ?`,
        answer: String(n),
        hint: 'ln(eⁿ) = n',
        solution: `ln(e^${n}) = ${n} — по определению натурального логарифма`,
        difficulty: 2
      };
    },
    // Уровень 3: Сумма логарифмов
    () => {
      const a = randomChoice([2, 10]);
      const b = randomInt(2, 5);
      const c = randomInt(2, 5);
      const aStr = a === 10 ? '' : `_${a}`;
      return {
        text: `log${aStr}(${b}) + log${aStr}(${c}) = log${aStr}(?)`,
        answer: String(b * c),
        hint: 'log(a) + log(b) = log(a·b)',
        solution: `log${aStr}(${b}) + log${aStr}(${c}) = log${aStr}(${b}·${c}) = log${aStr}(${b * c})`,
        difficulty: 3
      };
    },
    // Уровень 4: Вынесение степени
    () => {
      const n = randomInt(2, 4);
      const b = randomInt(2, 4);
      return {
        text: `${n}·log_2(${b}) = log_2(?)`,
        answer: String(Math.pow(b, n)),
        hint: 'n·log(a) = log(aⁿ)',
        solution: `${n}·log_2(${b}) = log_2(${b}^${n}) = log_2(${Math.pow(b, n)})`,
        difficulty: 4
      };
    },
    // Уровень 5: Разность логарифмов
    () => ({
      text: `log_2(16) - log_2(4) = ?`,
      answer: '2',
      hint: 'log(a) - log(b) = log(a/b)',
      solution: `log_2(16) - log_2(4) = log_2(16/4) = log_2(4) = 2`,
      difficulty: 5
    }),
    // Уровень 6: Переход к другому основанию
    () => ({
      text: `log_4(8) = ?`,
      answer: '3/2',
      hint: 'log_a(b) = ln(b)/ln(a)',
      solution: `log_4(8) = ln(8)/ln(4) = ln(2³)/ln(2²) = 3ln(2)/(2ln(2)) = 3/2`,
      difficulty: 6
    }),
    // Уровень 7: Логарифм произведения
    () => ({
      text: `log_3(9·27) = ?`,
      answer: '5',
      hint: 'log(ab) = log(a) + log(b)',
      solution: `log_3(9·27) = log_3(9) + log_3(27) = log_3(3²) + log_3(3³) = 2 + 3 = 5`,
      difficulty: 7
    }),
    // Уровень 8: Сложное уравнение
    () => ({
      text: `log_2(x) = 3. Найдите x`,
      answer: '8',
      hint: 'Если log_a(x) = n, то x = aⁿ',
      solution: `log_2(x) = 3\nx = 2³ = 8`,
      difficulty: 8
    }),
    // Уровень 9: Система с логарифмами
    () => ({
      text: `log_2(log_2(16)) = ?`,
      answer: '2',
      hint: 'Вычислите внутренний логарифм сначала',
      solution: `log_2(log_2(16)) = log_2(log_2(2⁴)) = log_2(4) = log_2(2²) = 2`,
      difficulty: 9
    }),
    // Уровень 10: Логарифмическое неравенство
    () => ({
      text: `ln(e²·e³) = ?`,
      answer: '5',
      hint: 'e²·e³ = e^(2+3)',
      solution: `ln(e²·e³) = ln(e^5) = 5`,
      difficulty: 10
    }),
  ];
  
  const idx = Math.min(level - 1, problems.length - 1);
  return problems[Math.max(0, idx)]();
}

// ===== МАТРИЦЫ (10 уровней) =====
function generateMatrices(level: number): Problem {
  const problems: (() => Problem)[] = [
    // Уровень 1: Сложение элементов
    () => {
      const a = randomInt(1, 5);
      const c = randomInt(1, 5);
      return {
        text: `A = |${a}|, B = |${c}|. A + B = ?`,
        answer: String(a + c),
        hint: 'Складываем соответствующие элементы',
        solution: `A + B = |${a}| + |${c}| = |${a + c}|`,
        difficulty: 1
      };
    },
    // Уровень 2: Умножение на скаляр
    () => {
      const k = randomInt(2, 4);
      const a = randomInt(1, 5);
      return {
        text: `${k}·|${a} 2; 1 3| = |? 2k; k 3k|. ? = ?`,
        answer: String(k * a),
        hint: 'Умножаем каждый элемент на скаляр',
        solution: `${k}·|${a} 2; 1 3| = |${k}·${a} ${k}·2; ${k}·1 ${k}·3| = |${k*a} ${k*2}; ${k} ${k*3}|\n? = ${k*a}`,
        difficulty: 2
      };
    },
    // Уровень 3: Определитель 2×2
    () => {
      const a = randomInt(1, 5);
      const b = randomInt(1, 5);
      const c = randomInt(1, 5);
      const d = randomInt(1, 5);
      return {
        text: `det|${a} ${b}; ${c} ${d}| = ?`,
        answer: String(a * d - b * c),
        hint: 'det = ad - bc',
        solution: `det|${a} ${b}; ${c} ${d}| = ${a}·${d} - ${b}·${c} = ${a*d} - ${b*c} = ${a*d - b*c}`,
        difficulty: 3
      };
    },
    // Уровень 4: След матрицы
    () => {
      const a = randomInt(1, 9);
      const d = randomInt(1, 9);
      return {
        text: `tr|${a} 5; 3 ${d}| = ?`,
        answer: String(a + d),
        hint: 'След = сумма диагональных элементов',
        solution: `Trace = ${a} + ${d} = ${a + d}`,
        difficulty: 4
      };
    },
    // Уровень 5: Определитель диагональной матрицы
    () => ({
      text: `det|2 0 0; 0 3 0; 0 0 4| = ?`,
      answer: '24',
      hint: 'Для диагональной матрицы det = произведение диагональных',
      solution: `det = 2·3·4 = 24`,
      difficulty: 5
    }),
    // Уровень 6: Умножение матриц
    () => ({
      text: `|1 2|·|2; 3| = ?`,
      answer: '8',
      hint: 'Строка на столбец: сумма произведений',
      solution: `|1 2|·|2; 3| = 1·2 + 2·3 = 2 + 6 = 8`,
      difficulty: 6
    }),
    // Уровень 7: Транспонирование
    () => ({
      text: `A = |1 2; 3 4|. Aᵀ₁₂ = ?`,
      answer: '3',
      hint: 'При транспонировании строки становятся столбцами',
      solution: `Aᵀ = |1 3; 2 4|\nЭлемент (1,2) матрицы Aᵀ = 3`,
      difficulty: 7
    }),
    // Уровень 8: Обратная матрица
    () => ({
      text: `A = |2 0; 0 3|. A⁻¹ = |? 0; 0 ?|. Первый элемент = ?`,
      answer: '1/2',
      hint: 'Для диагональной матрицы A⁻¹ᵢᵢ = 1/Aᵢᵢ',
      solution: `A⁻¹ = |1/2 0; 0 1/3|\nПервый элемент = 1/2`,
      difficulty: 8
    }),
    // Уровень 9: Ранг матрицы
    () => ({
      text: `Ранг матрицы |1 2; 2 4| = ?`,
      answer: '1',
      hint: 'Вторая строка = 2 × первая',
      solution: `Строки линейно зависимы: (2,4) = 2·(1,2)\nРанг = 1`,
      difficulty: 9
    }),
    // Уровень 10: Собственное значение
    () => ({
      text: `A = |3 0; 0 5|. Собственные значения λ₁ + λ₂ = ?`,
      answer: '8',
      hint: 'Для диагональной матрицы λ = диагональные элементы',
      solution: `Собственные значения диагональной матрицы = её диагональные элементы\nλ₁ = 3, λ₂ = 5\nλ₁ + λ₂ = 8`,
      difficulty: 10
    }),
  ];
  
  const idx = Math.min(level - 1, problems.length - 1);
  return problems[Math.max(0, idx)]();
}

// ===== СИСТЕМЫ УРАВНЕНИЙ (10 уровней) =====
function generateLinearSystems(level: number): Problem {
  const problems: (() => Problem)[] = [
    // Уровень 1: Простая подстановка
    () => {
      const x = randomInt(1, 5);
      const y = randomInt(1, 5);
      return {
        text: `x + y = ${x + y}, x = ${x}. y = ?`,
        answer: String(y),
        hint: 'Подставьте x',
        solution: `x = ${x}\n${x} + y = ${x + y}\ny = ${x + y} - ${x} = ${y}`,
        difficulty: 1
      };
    },
    // Уровень 2: Метод сложения
    () => {
      const x = randomInt(1, 5);
      const y = randomInt(1, 5);
      return {
        text: `x + y = ${x + y}, x - y = ${x - y}. x = ?`,
        answer: String(x),
        hint: 'Сложите оба уравнения',
        solution: `Складываем:\n(x + y) + (x - y) = ${x + y} + ${x - y}\n2x = ${2 * x}\nx = ${x}`,
        difficulty: 2
      };
    },
    // Уровень 3: Определитель системы
    () => {
      const a = randomInt(1, 4);
      const b = randomInt(1, 4);
      const c = randomInt(1, 4);
      const d = randomInt(1, 4);
      return {
        text: `Δ системы ${a}x + ${b}y = ?, ${c}x + ${d}y = ?. Δ = ?`,
        answer: String(a * d - b * c),
        hint: 'Δ = a₁b₂ - a₂b₁',
        solution: `Δ = |${a} ${b}; ${c} ${d}| = ${a}·${d} - ${b}·${c} = ${a*d - b*c}`,
        difficulty: 3
      };
    },
    // Уровень 4: Метод Крамера
    () => ({
      text: `x + 2y = 5, 2x + y = 4. x = ?`,
      answer: '1',
      hint: 'x = Δx/Δ',
      solution: `Δ = |1 2; 2 1| = 1 - 4 = -3\nΔx = |5 2; 4 1| = 5 - 8 = -3\nx = Δx/Δ = -3/-3 = 1`,
      difficulty: 4
    }),
    // Уровень 5: Ранг и совместность
    () => ({
      text: `Ранг матрицы |1 2; 2 4| = ?`,
      answer: '1',
      hint: 'Строки пропорциональны',
      solution: `(2, 4) = 2·(1, 2)\nРанг = 1 (только одна линейно независимая строка)`,
      difficulty: 5
    }),
    // Уровень 6: Система 3 уравнений
    () => ({
      text: `x + y + z = 6, x = 1, y = 2. z = ?`,
      answer: '3',
      hint: 'Подставьте известные значения',
      solution: `1 + 2 + z = 6\n3 + z = 6\nz = 3`,
      difficulty: 6
    }),
    // Уровень 7: Однородная система
    () => ({
      text: `x + y = 0, 2x + 2y = 0. Система имеет: (1) только нулевое решение (2) бесконечно много решений`,
      answer: '2',
      hint: 'Уравнения пропорциональны',
      solution: `Второе уравнение = 2 × первое\nСистема имеет бесконечно много решений: y = -x`,
      difficulty: 7
    }),
    // Уровень 8: Метод Гаусса
    () => ({
      text: `2x + 4y = 10. Приведите к виду x + 2y = ?`,
      answer: '5',
      hint: 'Разделите на 2',
      solution: `2x + 4y = 10\nДелим на 2:\nx + 2y = 5`,
      difficulty: 8
    }),
    // Уровень 9: Несовместная система
    () => ({
      text: `x + y = 3, x + y = 5. Система: (1) совместна (2) несовместна`,
      answer: '2',
      hint: 'Сравните левые и правые части',
      solution: `Левые части одинаковы, правые разные\nПротиворечие: система несовместна`,
      difficulty: 9
    }),
    // Уровень 10: Параметрическая система
    () => ({
      text: `ax + y = 1, x + ay = 1. При каком a система не имеет единственного решения?`,
      answer: '1',
      hint: 'Δ = 0',
      solution: `Δ = a² - 1 = 0\na² = 1\na = ±1\nПри a = 1 (и a = -1) система не имеет единственного решения`,
      difficulty: 10
    }),
  ];
  
  const idx = Math.min(level - 1, problems.length - 1);
  return problems[Math.max(0, idx)]();
}

// ===== РЯДЫ (10 уровней) =====
function generateSeries(level: number): Problem {
  const problems: (() => Problem)[] = [
    // Уровень 1: Арифметическая прогрессия
    () => {
      const a1 = randomInt(1, 5);
      const d = randomInt(1, 3);
      const n = randomInt(3, 6);
      return {
        text: `a₁=${a1}, d=${d}. a${n} = ?`,
        answer: String(a1 + (n - 1) * d),
        hint: 'aₙ = a₁ + (n-1)d',
        solution: `a${n} = a₁ + (${n}-1)·d = ${a1} + ${n-1}·${d} = ${a1} + ${(n-1)*d} = ${a1 + (n-1)*d}`,
        difficulty: 1
      };
    },
    // Уровень 2: Геометрическая прогрессия
    () => {
      const b1 = randomInt(1, 3);
      const q = randomInt(2, 3);
      return {
        text: `b₁=${b1}, q=${q}. b₃ = ?`,
        answer: String(b1 * q * q),
        hint: 'bₙ = b₁·qⁿ⁻¹',
        solution: `b₃ = b₁·q² = ${b1}·${q}² = ${b1}·${q*q} = ${b1*q*q}`,
        difficulty: 2
      };
    },
    // Уровень 3: Сумма арифметической прогрессии
    () => {
      const n = randomInt(5, 10);
      return {
        text: `S = 1 + 2 + ... + ${n} = ?`,
        answer: String((n * (n + 1)) / 2),
        hint: 'S = n(a₁ + aₙ)/2',
        solution: `S = n(1 + ${n})/2 = ${n}·${n+1}/2 = ${n*(n+1)}/2 = ${n*(n+1)/2}`,
        difficulty: 3
      };
    },
    // Уровень 4: Сумма геометрической прогрессии
    () => ({
      text: `S = 1 + 2 + 4 + 8 + 16 = ?`,
      answer: '31',
      hint: 'S = b₁(qⁿ - 1)/(q - 1)',
      solution: `b₁ = 1, q = 2, n = 5\nS = 1·(2⁵ - 1)/(2 - 1) = (32 - 1)/1 = 31`,
      difficulty: 4
    }),
    // Уровень 5: Бесконечная геом. прогрессия
    () => ({
      text: `S = 1 + 1/2 + 1/4 + 1/8 + ... = ?`,
      answer: '2',
      hint: 'S = b₁/(1-q) при |q| < 1',
      solution: `b₁ = 1, q = 1/2\nS = 1/(1 - 1/2) = 1/(1/2) = 2`,
      difficulty: 5
    }),
    // Уровень 6: Признак сходимости
    () => ({
      text: `Ряд Σ(1/n²) сходится? (да/нет)`,
      answer: 'да',
      hint: 'Сравните с интегралом или эталонным рядом',
      solution: `Ряд Σ(1/n^p) сходится при p > 1\nЗдесь p = 2 > 1, значит ряд сходится`,
      difficulty: 6
    }),
    // Уровень 7: Гармонический ряд
    () => ({
      text: `Ряд Σ(1/n) расходится? (да/нет)`,
      answer: 'да',
      hint: 'Гармонический ряд',
      solution: `Гармонический ряд Σ(1/n) расходится\nЭто классический пример расходящегося ряда`,
      difficulty: 7
    }),
    // Уровень 8: Признак Даламбера
    () => ({
      text: `aₙ = n!/nⁿ. lim(aₙ₊₁/aₙ) = ?`,
      answer: '1/e',
      hint: 'Упростите отношение',
      solution: `aₙ₊₁/aₙ = ((n+1)!/(n+1)^(n+1))·(n^n/n!)\n= (n+1)·n^n/(n+1)^(n+1)\n= n^n/(n+1)^n = (n/(n+1))^n → 1/e`,
      difficulty: 8
    }),
    // Уровень 9: Знакочередующийся ряд
    () => ({
      text: `Ряд Σ((-1)ⁿ/n) сходится условно? (да/нет)`,
      answer: 'да',
      hint: 'Признак Лейбница',
      solution: `По признаку Лейбница: 1/n → 0 монотонно\nРяд сходится, но Σ(1/n) расходится\nЗначит, сходимость условная`,
      difficulty: 9
    }),
    // Уровень 10: Степенной ряд
    () => ({
      text: `Радиус сходимости ряда Σ(xⁿ/n!) = ?`,
      answer: '∞',
      hint: 'Это ряд для e^x',
      solution: `Это ряд Тейлора для e^x\nlim(|aₙ₊₁/aₙ|) = lim(n!/(n+1)!) = lim(1/(n+1)) = 0\nR = 1/0 = ∞`,
      difficulty: 10
    }),
  ];
  
  const idx = Math.min(level - 1, problems.length - 1);
  return problems[Math.max(0, idx)]();
}

// ===== ДИФ. УРАВНЕНИЯ (10 уровней) =====
function generateDiffEquations(level: number): Problem {
  const problems: (() => Problem)[] = [
    // Уровень 1: y' = a
    () => {
      const a = randomInt(2, 6);
      return {
        text: `y' = ${a}. y = ?`,
        answer: `${a}x+C`,
        hint: 'Проинтегрируйте обе части',
        solution: `∫dy = ∫${a}dx\ny = ${a}x + C`,
        difficulty: 1
      };
    },
    // Уровень 2: y' = ax
    () => {
      const a = randomInt(2, 4);
      return {
        text: `y' = ${a}x. y = ?`,
        answer: `${a}/2·x²+C`,
        hint: '∫ax dx = (a/2)x² + C',
        solution: `∫dy = ∫${a}x dx\ny = ${a}x²/2 + C = ${a}/2·x² + C`,
        difficulty: 2
      };
    },
    // Уровень 3: y' = y
    () => ({
      text: `y' = y. y = ?`,
      answer: 'Ce^x',
      hint: 'Разделите переменные',
      solution: `dy/y = dx\n∫dy/y = ∫dx\nln|y| = x + C₁\ny = Ce^x`,
      difficulty: 3
    }),
    // Уровень 4: y' = ky
    () => {
      const k = randomInt(2, 4);
      return {
        text: `y' = ${k}y. y = ?`,
        answer: `Ce^(${k}x)`,
        hint: 'Решение: y = Ce^(kx)',
        solution: `dy/y = ${k}dx\nln|y| = ${k}x + C₁\ny = Ce^(${k}x)`,
        difficulty: 4
      };
    },
    // Уровень 5: y'' = 0
    () => ({
      text: `y'' = 0. y = ?`,
      answer: 'C₁x+C₂',
      hint: 'Интегрируем дважды',
      solution: `y' = C₁ (первое интегрирование)\ny = C₁x + C₂ (второе интегрирование)`,
      difficulty: 5
    }),
    // Уровень 6: y' + y = 0
    () => ({
      text: `y' + y = 0. y = ?`,
      answer: 'Ce^(-x)',
      hint: 'Это однородное линейное уравнение',
      solution: `y' = -y\ndy/y = -dx\nln|y| = -x + C₁\ny = Ce^(-x)`,
      difficulty: 6
    }),
    // Уровень 7: y' = xy
    () => ({
      text: `y' = xy. y = ?`,
      answer: 'Ce^(x²/2)',
      hint: 'Разделите переменные',
      solution: `dy/y = x dx\n∫dy/y = ∫x dx\nln|y| = x²/2 + C₁\ny = Ce^(x²/2)`,
      difficulty: 7
    }),
    // Уровень 8: Начальные условия
    () => ({
      text: `y' = 2, y(0) = 3. y(1) = ?`,
      answer: '5',
      hint: 'Найдите C из начального условия',
      solution: `y = 2x + C\ny(0) = 3: C = 3\ny = 2x + 3\ny(1) = 2·1 + 3 = 5`,
      difficulty: 8
    }),
    // Уровень 9: Линейное уравнение 1-го порядка
    () => ({
      text: `y' - 2y = 0. y(0) = 1. y = ?`,
      answer: 'e^(2x)',
      hint: 'Характеристическое уравнение',
      solution: `Общее решение: y = Ce^(2x)\ny(0) = 1: C = 1\ny = e^(2x)`,
      difficulty: 9
    }),
    // Уровень 10: Уравнение 2-го порядка
    () => ({
      text: `y'' + y = 0. Общее решение?`,
      answer: 'C₁cos(x)+C₂sin(x)',
      hint: 'Характеристическое уравнение λ² + 1 = 0',
      solution: `λ² + 1 = 0, λ = ±i\nКомплексные корни: y = C₁cos(x) + C₂sin(x)`,
      difficulty: 10
    }),
  ];
  
  const idx = Math.min(level - 1, problems.length - 1);
  return problems[Math.max(0, idx)]();
}

// ===== КОМПЛЕКСНЫЕ ЧИСЛА (10 уровней) =====
function generateComplexNumbers(level: number): Problem {
  const problems: (() => Problem)[] = [
    // Уровень 1: Сложение
    () => {
      const a = randomInt(1, 5);
      const b = randomInt(1, 5);
      const c = randomInt(1, 5);
      const d = randomInt(1, 5);
      return {
        text: `(${a}+${b}i) + (${c}+${d}i) = ?`,
        answer: `${a+c}+${b+d}i`,
        hint: 'Складываем действительные и мнимые части отдельно',
        solution: `(${a}+${b}i) + (${c}+${d}i) = (${a}+${c}) + (${b}+${d})i = ${a+c}+${b+d}i`,
        difficulty: 1
      };
    },
    // Уровень 2: Модуль
    () => ({
      text: `|3+4i| = ?`,
      answer: '5',
      hint: '|z| = √(a² + b²)',
      solution: `|3+4i| = √(3² + 4²) = √(9 + 16) = √25 = 5`,
      difficulty: 2
    }),
    // Уровень 3: i²
    () => ({
      text: `i² = ?`,
      answer: '-1',
      hint: 'По определению мнимой единицы',
      solution: `i² = -1 — определение мнимой единицы`,
      difficulty: 3
    }),
    // Уровень 4: i³
    () => ({
      text: `i³ = ?`,
      answer: '-i',
      hint: 'i³ = i²·i',
      solution: `i³ = i²·i = (-1)·i = -i`,
      difficulty: 4
    }),
    // Уровень 5: i⁴
    () => ({
      text: `i⁴ = ?`,
      answer: '1',
      hint: 'i⁴ = (i²)²',
      solution: `i⁴ = (i²)² = (-1)² = 1`,
      difficulty: 5
    }),
    // Уровень 6: Умножение
    () => ({
      text: `(2+i)(3-2i) = a+bi. a = ?`,
      answer: '8',
      hint: 'Раскройте скобки',
      solution: `(2+i)(3-2i) = 6 - 4i + 3i - 2i²\n= 6 - i - 2(-1) = 6 - i + 2 = 8 - i\na = 8`,
      difficulty: 6
    }),
    // Уровень 7: Сопряжённое число
    () => ({
      text: `z = 3-4i. z̄ = ?`,
      answer: '3+4i',
      hint: 'Меняем знак мнимой части',
      solution: `Сопряжённое к a+bi это a-bi\nz̄ = 3+4i`,
      difficulty: 7
    }),
    // Уровень 8: z·z̄
    () => ({
      text: `z = 3+4i. z·z̄ = ?`,
      answer: '25',
      hint: 'z·z̄ = |z|²',
      solution: `z·z̄ = (3+4i)(3-4i) = 9 - 16i² = 9 + 16 = 25\nИли: z·z̄ = |z|² = 5² = 25`,
      difficulty: 8
    }),
    // Уровень 9: Деление
    () => ({
      text: `(4+3i)/(1-i). Re = ?`,
      answer: '1/2',
      hint: 'Умножьте на сопряжённое знаменателя',
      solution: `(4+3i)(1+i)/((1-i)(1+i))\n= (4 + 4i + 3i + 3i²)/(1 - i²)\n= (4 + 7i - 3)/(1 + 1) = (1 + 7i)/2\nRe = 1/2`,
      difficulty: 9
    }),
    // Уровень 10: Показательная форма
    () => ({
      text: `e^(iπ) = ?`,
      answer: '-1',
      hint: 'Формула Эйлера: e^(iθ) = cos(θ) + i·sin(θ)',
      solution: `e^(iπ) = cos(π) + i·sin(π) = -1 + 0i = -1\nЭто знаменитая формула Эйлера`,
      difficulty: 10
    }),
  ];
  
  const idx = Math.min(level - 1, problems.length - 1);
  return problems[Math.max(0, idx)]();
}

// ===== ВЕКТОРЫ (10 уровней) =====
function generateVectors(level: number): Problem {
  const problems: (() => Problem)[] = [
    // Уровень 1: Сложение
    () => {
      const a1 = randomInt(1, 5);
      const a2 = randomInt(1, 5);
      const b1 = randomInt(1, 5);
      const b2 = randomInt(1, 5);
      return {
        text: `(${a1};${a2}) + (${b1};${b2}) = (x;y). x = ?`,
        answer: String(a1 + b1),
        hint: 'Складываем соответствующие координаты',
        solution: `(${a1};${a2}) + (${b1};${b2}) = (${a1}+${b1}; ${a2}+${b2}) = (${a1+b1};${a2+b2})\nx = ${a1+b1}`,
        difficulty: 1
      };
    },
    // Уровень 2: Умножение на скаляр
    () => {
      const k = randomInt(2, 4);
      const a = randomInt(1, 5);
      const b = randomInt(1, 5);
      return {
        text: `${k}·(${a};${b}) = (x;y). y = ?`,
        answer: String(k * b),
        hint: 'Умножаем каждую координату на k',
        solution: `${k}·(${a};${b}) = (${k*a};${k*b})\ny = ${k*b}`,
        difficulty: 2
      };
    },
    // Уровень 3: Длина вектора
    () => ({
      text: `|a⃗| = ?, если a⃗ = (3;4)`,
      answer: '5',
      hint: '|a⃗| = √(x² + y²)',
      solution: `|a⃗| = √(3² + 4²) = √(9 + 16) = √25 = 5`,
      difficulty: 3
    }),
    // Уровень 4: Скалярное произведение
    () => {
      const a1 = randomInt(1, 4);
      const a2 = randomInt(1, 4);
      const b1 = randomInt(1, 4);
      const b2 = randomInt(1, 4);
      return {
        text: `(${a1};${a2})·(${b1};${b2}) = ?`,
        answer: String(a1 * b1 + a2 * b2),
        hint: 'a⃗·b⃗ = x₁x₂ + y₁y₂',
        solution: `(${a1};${a2})·(${b1};${b2}) = ${a1}·${b1} + ${a2}·${b2} = ${a1*b1} + ${a2*b2} = ${a1*b1 + a2*b2}`,
        difficulty: 4
      };
    },
    // Уровень 5: Перпендикулярность
    () => ({
      text: `(2;3)·(-3;2) = ?`,
      answer: '0',
      hint: 'Перпендикулярные векторы имеют скалярное произведение = 0',
      solution: `(2;3)·(-3;2) = 2·(-3) + 3·2 = -6 + 6 = 0\nВекторы перпендикулярны`,
      difficulty: 5
    }),
    // Уровень 6: Угол между векторами
    () => ({
      text: `cos(a⃗,b⃗) = ?, если a⃗ = (1;0), b⃗ = (1;1)`,
      answer: '√2/2',
      hint: 'cos(θ) = (a⃗·b⃗)/(|a⃗|·|b⃗|)',
      solution: `a⃗·b⃗ = 1·1 + 0·1 = 1\n|a⃗| = 1, |b⃗| = √2\ncos(θ) = 1/(1·√2) = 1/√2 = √2/2`,
      difficulty: 6
    }),
    // Уровень 7: Векторное произведение (3D)
    () => ({
      text: `[i⃗ × j⃗] = ?`,
      answer: 'k⃗',
      hint: 'Правило правой руки',
      solution: `[i⃗ × j⃗] = k⃗ — базисные векторы образуют правую тройку`,
      difficulty: 7
    }),
    // Уровень 8: Проекция
    () => ({
      text: `proj_b⃗(a⃗) = ?, если a⃗ = (4;3), b⃗ = (1;0)`,
      answer: '4',
      hint: 'proj = (a⃗·b⃗)/|b⃗|',
      solution: `proj_b⃗(a⃗) = (a⃗·b⃗)/|b⃗| = (4·1 + 3·0)/1 = 4`,
      difficulty: 8
    }),
    // Уровень 9: Коллинеарность
    () => ({
      text: `(2;4) и (3;6) коллинеарны? (да/нет)`,
      answer: 'да',
      hint: 'Проверьте пропорциональность координат',
      solution: `2/3 ≠ 4/6? Нет: 2/3 = 4/6 (= 2/3)\nВекторы коллинеарны`,
      difficulty: 9
    }),
    // Уровень 10: Смешанное произведение
    () => ({
      text: `(a⃗,b⃗,c⃗) = 0. Что это означает?`,
      answer: 'компланарны',
      hint: 'Геометрический смысл смешанного произведения',
      solution: `Смешанное произведение = 0 означает, что векторы компланарны (лежат в одной плоскости)`,
      difficulty: 10
    }),
  ];
  
  const idx = Math.min(level - 1, problems.length - 1);
  return problems[Math.max(0, idx)]();
}

// Главная функция генерации задачи
export function generateProblem(topic: TopicSlug, level: number): Problem {
  const clampedLevel = Math.max(1, Math.min(10, level));
  
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

// Алгоритм адаптивной сложности (до 10 уровней)
export function calculateNewLevel(
  currentLevel: number,
  isCorrect: boolean,
  timeMs: number,
  recentCorrectCount: number,
  recentTotalCount: number
): number {
  const accuracy = recentTotalCount > 0 ? recentCorrectCount / recentTotalCount : 0;
  const isQuick = timeMs < 30000; // 30 секунд для сложных задач
  
  let levelChange = 0;
  
  if (isCorrect && isQuick && accuracy >= 0.8) {
    levelChange = 1;
  } else if (!isCorrect && accuracy < 0.4) {
    levelChange = -1;
  }
  
  const newLevel = currentLevel + levelChange;
  return Math.max(1, Math.min(10, newLevel));
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
  
  // Базовые очки за правильные ответы (учитываем уровень)
  const basePoints = correctAnswers * 20 * level;
  
  // Бонус за точность
  const accuracyBonus = Math.round(accuracy * 100);
  
  // Бонус за скорость (для сложных задач больше времени)
  const speedBonus = averageTimeMs < 15000 ? 50 : averageTimeMs < 30000 ? 25 : 0;
  
  // Бонус за серию
  const streakBonus = bestStreak * 15;
  
  return basePoints + accuracyBonus + speedBonus + streakBonus;
}
