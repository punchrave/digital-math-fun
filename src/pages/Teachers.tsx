import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, BookOpen } from "lucide-react";

const teachers = [
  {
    name: "Иванов Александр Сергеевич",
    position: "Заведующий кафедрой",
    degree: "Доктор физ.-мат. наук, профессор",
    specialization: ["Математическое моделирование", "Численные методы"],
    email: "ivanov@university.ru",
    publications: 150,
  },
  {
    name: "Петрова Елена Владимировна",
    position: "Профессор",
    degree: "Доктор физ.-мат. наук",
    specialization: ["Машинное обучение", "Анализ данных"],
    email: "petrova@university.ru",
    publications: 95,
  },
  {
    name: "Сидоров Михаил Николаевич",
    position: "Доцент",
    degree: "Кандидат физ.-мат. наук",
    specialization: ["Оптимизация", "Исследование операций"],
    email: "sidorov@university.ru",
    publications: 45,
  },
  {
    name: "Козлова Анна Петровна",
    position: "Доцент",
    degree: "Кандидат физ.-мат. наук",
    specialization: ["Теория вероятностей", "Статистика"],
    email: "kozlova@university.ru",
    publications: 38,
  },
  {
    name: "Новиков Дмитрий Игоревич",
    position: "Старший преподаватель",
    degree: "Кандидат технических наук",
    specialization: ["Программирование", "Алгоритмы"],
    email: "novikov@university.ru",
    publications: 22,
  },
  {
    name: "Морозова Ольга Александровна",
    position: "Доцент",
    degree: "Кандидат физ.-мат. наук",
    specialization: ["Дифференциальные уравнения", "Математическая физика"],
    email: "morozova@university.ru",
    publications: 55,
  },
];

export default function Teachers() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container">
          <h1 className="mb-4 font-serif text-4xl font-bold">Преподаватели</h1>
          <p className="max-w-2xl text-lg text-primary-foreground/80">
            Высококвалифицированный коллектив учёных и преподавателей кафедры
          </p>
        </div>
      </section>

      {/* Teachers grid */}
      <section className="py-16">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {teachers.map((teacher) => (
              <Card key={teacher.name} className="border-0 shadow-sm transition-shadow hover:shadow-md">
                <CardContent className="p-6">
                  {/* Avatar placeholder */}
                  <div className="mb-4 flex h-20 w-20 items-center justify-center bg-primary/10 text-2xl font-bold text-primary">
                    {teacher.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  
                  <h3 className="mb-1 font-semibold">{teacher.name}</h3>
                  <p className="mb-1 text-sm text-primary">{teacher.position}</p>
                  <p className="mb-4 text-sm text-muted-foreground">{teacher.degree}</p>
                  
                  <div className="mb-4 flex flex-wrap gap-1">
                    {teacher.specialization.map((spec) => (
                      <Badge key={spec} variant="secondary" className="text-xs">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <a 
                      href={`mailto:${teacher.email}`} 
                      className="flex items-center gap-2 hover:text-primary"
                    >
                      <Mail className="h-4 w-4" />
                      {teacher.email}
                    </a>
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      {teacher.publications} публикаций
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
