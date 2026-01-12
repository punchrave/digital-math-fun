// Типы для базы знаний по высшей математике

export type TopicSlug = 
  | 'limits' 
  | 'derivatives' 
  | 'integrals' 
  | 'logarithms' 
  | 'matrices' 
  | 'linear_systems' 
  | 'series' 
  | 'diff_equations' 
  | 'complex_numbers' 
  | 'vectors';

export interface KnowledgeTopic {
  slug: TopicSlug;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export interface TopicSection {
  id: string;
  title: string;
  content: string; // Markdown with LaTeX
}

export interface TopicExample {
  id: string;
  title: string;
  problem: string;
  solution: string; // Step-by-step solution with LaTeX
}

export interface TopicContent {
  slug: TopicSlug;
  sections: TopicSection[];
  examples: TopicExample[];
  formulas: string[]; // Key formulas for quick reference
}

// Список тем
export const TOPICS: KnowledgeTopic[] = [
  {
    slug: 'limits',
    name: 'Пределы',
    description: 'Теория пределов, правило Лопиталя, замечательные пределы',
    icon: '∞',
    color: 'hsl(var(--primary))',
  },
  {
    slug: 'derivatives',
    name: 'Производные',
    description: 'Правила дифференцирования, таблица производных',
    icon: "f'",
    color: 'hsl(220, 70%, 50%)',
  },
  {
    slug: 'integrals',
    name: 'Интегралы',
    description: 'Неопределённые и определённые интегралы, методы интегрирования',
    icon: '∫',
    color: 'hsl(280, 70%, 50%)',
  },
  {
    slug: 'logarithms',
    name: 'Логарифмы',
    description: 'Свойства логарифмов, показательные и логарифмические уравнения',
    icon: 'log',
    color: 'hsl(160, 70%, 40%)',
  },
  {
    slug: 'matrices',
    name: 'Матрицы',
    description: 'Операции с матрицами, определители, обратные матрицы',
    icon: '▦',
    color: 'hsl(30, 70%, 50%)',
  },
  {
    slug: 'linear_systems',
    name: 'Системы уравнений',
    description: 'Методы Гаусса, Крамера, матричный метод',
    icon: '⋮',
    color: 'hsl(0, 70%, 50%)',
  },
  {
    slug: 'series',
    name: 'Ряды',
    description: 'Числовые и функциональные ряды, признаки сходимости',
    icon: 'Σ',
    color: 'hsl(200, 70%, 50%)',
  },
  {
    slug: 'diff_equations',
    name: 'Диф. уравнения',
    description: 'ОДУ первого и второго порядка, методы решения',
    icon: "y'",
    color: 'hsl(320, 70%, 50%)',
  },
  {
    slug: 'complex_numbers',
    name: 'Комплексные числа',
    description: 'Алгебраическая и тригонометрическая формы, формула Эйлера',
    icon: 'i',
    color: 'hsl(260, 70%, 50%)',
  },
  {
    slug: 'vectors',
    name: 'Векторы',
    description: 'Операции с векторами, скалярное и векторное произведение',
    icon: '→',
    color: 'hsl(180, 70%, 40%)',
  },
];
