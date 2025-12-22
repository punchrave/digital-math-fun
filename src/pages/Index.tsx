import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  GraduationCap, 
  BookOpen, 
  Users, 
  Calculator, 
  ArrowRight,
  Calendar,
  ChevronRight
} from "lucide-react";

const features = [
  {
    icon: Calculator,
    title: "Математическое моделирование",
    description: "Изучение методов построения и анализа математических моделей реальных процессов",
  },
  {
    icon: BookOpen,
    title: "Компьютерные технологии",
    description: "Современные методы программирования и обработки данных",
  },
  {
    icon: Users,
    title: "Научные исследования",
    description: "Участие в актуальных научных проектах под руководством ведущих специалистов",
  },
  {
    icon: GraduationCap,
    title: "Практическая подготовка",
    description: "Стажировки в ведущих компаниях и научных организациях",
  },
];

const news = [
  {
    date: "18 декабря 2024",
    title: "Открытая лекция по машинному обучению",
    description: "Приглашаем студентов на открытую лекцию профессора Иванова А.С.",
  },
  {
    date: "15 декабря 2024",
    title: "Результаты зимней сессии",
    description: "Опубликованы предварительные результаты зимней экзаменационной сессии.",
  },
  {
    date: "10 декабря 2024",
    title: "Научная конференция",
    description: "Кафедра проводит ежегодную научную конференцию студентов и аспирантов.",
  },
];

export default function Index() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary py-24 text-primary-foreground">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="container relative">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-4 py-2">
              <GraduationCap className="h-5 w-5" />
              <span className="text-sm font-medium">НИУ «БелГУ»</span>
            </div>
            <h1 className="mb-6 font-serif text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Кафедра прикладной математики и компьютерного моделирования
            </h1>
            <p className="mb-8 text-lg text-primary-foreground/80 sm:text-xl">
              Готовим специалистов будущего в области математического моделирования, 
              анализа данных и информационных технологий
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" variant="secondary">
                <Link to="/programs">
                  Образовательные программы
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
                <Link to="/about">О кафедре</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-b bg-card py-12">
        <div className="container">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary sm:text-4xl">50+</p>
              <p className="mt-1 text-sm text-muted-foreground">Лет истории</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary sm:text-4xl">25</p>
              <p className="mt-1 text-sm text-muted-foreground">Преподавателей</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary sm:text-4xl">500+</p>
              <p className="mt-1 text-sm text-muted-foreground">Студентов</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary sm:text-4xl">15</p>
              <p className="mt-1 text-sm text-muted-foreground">Направлений</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="mb-4 font-serif text-3xl font-bold">Наши преимущества</h2>
            <p className="text-muted-foreground">
              Мы создаём условия для качественного образования и научного развития
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <Card key={feature.title} className="border-0 bg-card shadow-sm transition-shadow hover:shadow-md">
                <CardHeader>
                  <div className="mb-2 flex h-12 w-12 items-center justify-center bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="border-t bg-card py-16 lg:py-24">
        <div className="container">
          <div className="mb-12 flex items-center justify-between">
            <div>
              <h2 className="mb-2 font-serif text-3xl font-bold">Новости и события</h2>
              <p className="text-muted-foreground">Актуальная информация о жизни кафедры</p>
            </div>
            <Button asChild variant="outline" className="hidden sm:inline-flex">
              <Link to="/news">
                Все новости
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {news.map((item) => (
              <Card key={item.title} className="group cursor-pointer border transition-all hover:border-primary/20 hover:shadow-md">
                <CardHeader>
                  <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {item.date}
                  </div>
                  <CardTitle className="text-lg transition-colors group-hover:text-primary">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{item.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Button asChild variant="outline">
              <Link to="/news">
                Все новости
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 font-serif text-3xl font-bold">Есть вопросы?</h2>
            <p className="mb-8 text-muted-foreground">
              Свяжитесь с нами для получения дополнительной информации 
              о кафедре и образовательных программах
            </p>
            <Button asChild size="lg">
              <Link to="/contacts">Связаться с нами</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
