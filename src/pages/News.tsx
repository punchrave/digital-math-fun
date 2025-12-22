import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Tag } from "lucide-react";

const news = [
  {
    id: 1,
    date: "18 декабря 2024",
    title: "Открытая лекция по машинному обучению",
    description: "Приглашаем студентов на открытую лекцию профессора Иванова А.С. о современных методах машинного обучения и их применении в научных исследованиях.",
    category: "Мероприятия",
    featured: true,
  },
  {
    id: 2,
    date: "15 декабря 2024",
    title: "Результаты зимней сессии",
    description: "Опубликованы предварительные результаты зимней экзаменационной сессии. Студенты могут ознакомиться с оценками в личном кабинете.",
    category: "Учебный процесс",
    featured: false,
  },
  {
    id: 3,
    date: "10 декабря 2024",
    title: "Ежегодная научная конференция",
    description: "Кафедра проводит ежегодную научную конференцию студентов и аспирантов. Приём тезисов до 20 декабря.",
    category: "Наука",
    featured: true,
  },
  {
    id: 4,
    date: "5 декабря 2024",
    title: "Новые учебные материалы",
    description: "В личном кабинете размещены новые учебные материалы по курсу «Численные методы». Рекомендуем ознакомиться до начала экзаменационной сессии.",
    category: "Учебный процесс",
    featured: false,
  },
  {
    id: 5,
    date: "1 декабря 2024",
    title: "Стажировки в IT-компаниях",
    description: "Открыт набор на зимние стажировки в ведущих IT-компаниях для студентов 3-4 курсов. Подробности на странице карьеры.",
    category: "Карьера",
    featured: false,
  },
  {
    id: 6,
    date: "28 ноября 2024",
    title: "Грант на научные исследования",
    description: "Кафедра получила грант РНФ на проведение исследований в области математического моделирования климатических процессов.",
    category: "Наука",
    featured: true,
  },
  {
    id: 7,
    date: "25 ноября 2024",
    title: "Победа на олимпиаде по программированию",
    description: "Команда студентов кафедры заняла призовое место на региональной олимпиаде по программированию.",
    category: "Достижения",
    featured: false,
  },
  {
    id: 8,
    date: "20 ноября 2024",
    title: "Расписание консультаций",
    description: "Опубликовано расписание предэкзаменационных консультаций. Обратите внимание на изменения в аудиториях.",
    category: "Учебный процесс",
    featured: false,
  },
];

const categories = ["Все", "Мероприятия", "Учебный процесс", "Наука", "Карьера", "Достижения"];

export default function News() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container">
          <h1 className="mb-4 font-serif text-4xl font-bold">Новости и события</h1>
          <p className="max-w-2xl text-lg text-primary-foreground/80">
            Актуальная информация о жизни кафедры
          </p>
        </div>
      </section>

      {/* News */}
      <section className="py-16">
        <div className="container">
          {/* Categories filter */}
          <div className="mb-8 flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge 
                key={category} 
                variant={category === "Все" ? "default" : "outline"}
                className="cursor-pointer"
              >
                <Tag className="mr-1 h-3 w-3" />
                {category}
              </Badge>
            ))}
          </div>

          {/* Featured news */}
          <div className="mb-12">
            <h2 className="mb-6 font-semibold">Важное</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {news.filter(n => n.featured).map((item) => (
                <Card key={item.id} className="border-2 border-primary/20 shadow-sm">
                  <CardHeader>
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {item.date}
                      </div>
                      <Badge variant="secondary">{item.category}</Badge>
                    </div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="line-clamp-3">{item.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* All news */}
          <div>
            <h2 className="mb-6 font-semibold">Все новости</h2>
            <div className="space-y-4">
              {news.map((item) => (
                <Card key={item.id} className="border-0 shadow-sm transition-shadow hover:shadow-md">
                  <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex-1">
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <span className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          {item.date}
                        </span>
                        <Badge variant="outline">{item.category}</Badge>
                      </div>
                      <h3 className="mb-2 font-semibold">{item.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
