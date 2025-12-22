import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Target, BookOpen, Users } from "lucide-react";

const milestones = [
  { year: "1970", event: "Основание кафедры" },
  { year: "1985", event: "Открытие первой компьютерной лаборатории" },
  { year: "2000", event: "Запуск программы магистратуры" },
  { year: "2015", event: "Создание центра компьютерного моделирования" },
  { year: "2020", event: "Внедрение дистанционного обучения" },
];

const values = [
  {
    icon: Target,
    title: "Миссия",
    description: "Подготовка высококвалифицированных специалистов в области прикладной математики и компьютерного моделирования, способных решать актуальные научные и практические задачи.",
  },
  {
    icon: Award,
    title: "Достижения",
    description: "Более 5000 выпускников, 200+ научных публикаций ежегодно, успешные проекты с ведущими российскими и международными организациями.",
  },
  {
    icon: BookOpen,
    title: "Образование",
    description: "Сочетание фундаментальной математической подготовки с современными методами программирования и анализа данных.",
  },
  {
    icon: Users,
    title: "Сообщество",
    description: "Активное научное сообщество студентов, аспирантов и преподавателей, объединённых интересом к математике.",
  },
];

export default function About() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container">
          <h1 className="mb-4 font-serif text-4xl font-bold">О кафедре</h1>
          <p className="max-w-2xl text-lg text-primary-foreground/80">
            Кафедра прикладной математики и компьютерного моделирования — 
            ведущий научно-образовательный центр в области математического моделирования
          </p>
        </div>
      </section>

      {/* History */}
      <section className="py-16">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 font-serif text-3xl font-bold">История кафедры</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Кафедра прикладной математики и компьютерного моделирования была основана 
                  в 1970 году как ответ на растущую потребность в специалистах, способных 
                  применять математические методы для решения практических задач.
                </p>
                <p>
                  За более чем 50 лет существования кафедра прошла путь от небольшого 
                  подразделения до крупного научно-образовательного центра, объединяющего 
                  ведущих специалистов в области математического моделирования.
                </p>
                <p>
                  Сегодня кафедра является признанным лидером в подготовке специалистов 
                  по прикладной математике, компьютерному моделированию и анализу данных.
                </p>
              </div>
            </div>
            <div>
              <h3 className="mb-6 font-semibold">Ключевые вехи</h3>
              <div className="relative border-l pl-6">
                {milestones.map((milestone, index) => (
                  <div key={milestone.year} className="relative pb-8 last:pb-0">
                    <div className="absolute -left-[25px] flex h-4 w-4 items-center justify-center bg-primary" />
                    <p className="text-sm font-semibold text-primary">{milestone.year}</p>
                    <p className="text-muted-foreground">{milestone.event}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-t bg-card py-16">
        <div className="container">
          <h2 className="mb-12 text-center font-serif text-3xl font-bold">Наши ценности</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {values.map((value) => (
              <Card key={value.title} className="border-0 shadow-sm">
                <CardContent className="flex gap-4 p-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-primary/10">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Directions */}
      <section className="py-16">
        <div className="container">
          <h2 className="mb-8 font-serif text-3xl font-bold">Направления деятельности</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="border-0 bg-card shadow-sm">
              <CardContent className="p-6">
                <h3 className="mb-3 font-semibold">Математическое моделирование</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Моделирование физических процессов</li>
                  <li>• Экономико-математические модели</li>
                  <li>• Биоматематика</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-0 bg-card shadow-sm">
              <CardContent className="p-6">
                <h3 className="mb-3 font-semibold">Вычислительные методы</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Численные методы решения уравнений</li>
                  <li>• Оптимизационные алгоритмы</li>
                  <li>• Параллельные вычисления</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-0 bg-card shadow-sm">
              <CardContent className="p-6">
                <h3 className="mb-3 font-semibold">Анализ данных</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Машинное обучение</li>
                  <li>• Статистический анализ</li>
                  <li>• Big Data технологии</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
}
