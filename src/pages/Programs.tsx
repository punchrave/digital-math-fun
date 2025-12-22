import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Users, GraduationCap, BookOpen, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const programs = {
  bachelor: [
    {
      name: "Прикладная математика и информатика",
      code: "01.03.02",
      duration: "4 года",
      form: "Очная",
      places: 50,
      description: "Подготовка специалистов в области математического моделирования, программирования и анализа данных",
      subjects: ["Математический анализ", "Программирование", "Численные методы", "Машинное обучение"],
    },
    {
      name: "Фундаментальная информатика и ИТ",
      code: "02.03.02",
      duration: "4 года",
      form: "Очная",
      places: 40,
      description: "Глубокое изучение теоретических основ информатики и информационных технологий",
      subjects: ["Алгоритмы", "Базы данных", "Компьютерные сети", "Искусственный интеллект"],
    },
    {
      name: "Информационные системы и технологии",
      code: "09.03.02",
      duration: "4 года",
      form: "Очная",
      places: 45,
      description: "Проектирование и разработка современных информационных систем",
      subjects: ["Проектирование ИС", "Веб-разработка", "Мобильные приложения", "UX/UI"],
    },
    {
      name: "Прикладная информатика",
      code: "09.03.03",
      duration: "4 года",
      form: "Очная",
      places: 40,
      description: "IT-специалисты с глубокими знаниями предметных областей",
      subjects: ["ERP-системы", "Бизнес-анализ", "1С:Предприятие", "Big Data"],
    },
    {
      name: "Системный анализ и управление",
      code: "27.03.03",
      duration: "4 года",
      form: "Очная",
      places: 25,
      description: "Анализ сложных систем и принятие управленческих решений",
      subjects: ["Теория систем", "Оптимизация", "Моделирование", "Управление проектами"],
    },
    {
      name: "Бизнес-информатика",
      code: "38.03.05",
      duration: "4 года",
      form: "Очная",
      places: 30,
      description: "IT-решения для бизнеса и цифровая трансформация",
      subjects: ["Бизнес-процессы", "ИТ-менеджмент", "Цифровая экономика", "Аналитика"],
    },
  ],
  master: [
    {
      name: "Математика",
      code: "01.04.01",
      duration: "2 года",
      form: "Очная",
      places: 15,
      description: "Углублённое изучение современных разделов математики",
      subjects: ["Функциональный анализ", "Дифференциальные уравнения", "Топология", "Алгебра"],
    },
    {
      name: "Прикладная математика и информатика",
      code: "01.04.02",
      duration: "2 года",
      form: "Очная",
      places: 25,
      description: "Математическое моделирование и высокопроизводительные вычисления",
      subjects: ["Суперкомпьютеры", "Параллельные вычисления", "Оптимизация", "Data Science"],
    },
    {
      name: "Математика и компьютерные науки",
      code: "02.04.01",
      duration: "2 года",
      form: "Очная",
      places: 20,
      description: "Синтез математических методов и компьютерных технологий",
      subjects: ["Криптография", "Компьютерное зрение", "NLP", "Квантовые вычисления"],
    },
    {
      name: "Информационные системы и технологии",
      code: "09.04.02",
      duration: "2 года",
      form: "Очная",
      places: 20,
      description: "Проектирование корпоративных информационных систем",
      subjects: ["Архитектура ИС", "DevOps", "Облачные технологии", "Безопасность"],
    },
    {
      name: "Прикладная информатика",
      code: "09.04.03",
      duration: "2 года",
      form: "Очная",
      places: 20,
      description: "Цифровая трансформация и интеллектуальные системы",
      subjects: ["Deep Learning", "Большие данные", "Интернет вещей", "Блокчейн"],
    },
  ],
  postgrad: [
    {
      name: "Дифференциальные уравнения и математическая физика",
      code: "1.1.2",
      duration: "3-4 года",
      form: "Очная/Заочная",
      places: 5,
      description: "Исследования в области теории дифференциальных уравнений",
      subjects: ["Научные исследования", "Публикации", "Диссертация"],
    },
    {
      name: "Математическое моделирование, численные методы",
      code: "1.2.2",
      duration: "3-4 года",
      form: "Очная/Заочная",
      places: 5,
      description: "Разработка математических моделей и вычислительных методов",
      subjects: ["Моделирование", "Численные методы", "Программные комплексы"],
    },
    {
      name: "Системный анализ и обработка информации",
      code: "2.3.1",
      duration: "3-4 года",
      form: "Очная/Заочная",
      places: 5,
      description: "Методы системного анализа и статистической обработки данных",
      subjects: ["Системный анализ", "Статистика", "Управление"],
    },
    {
      name: "Информатика и информационные процессы",
      code: "2.3.8",
      duration: "3-4 года",
      form: "Очная/Заочная",
      places: 5,
      description: "Теоретические и прикладные исследования в области информатики",
      subjects: ["Теория информации", "Алгоритмы", "Информационные процессы"],
    },
  ],
  specialitet: [
    {
      name: "Информационно-аналитические системы безопасности",
      code: "10.05.04",
      duration: "5,5 лет",
      form: "Очная",
      places: 20,
      description: "Подготовка специалистов в области информационной безопасности",
      subjects: ["Криптография", "Защита информации", "Кибербезопасность", "Аналитика угроз"],
    },
  ],
};

function ProgramCard({ program }: { program: typeof programs.bachelor[0] }) {
  return (
    <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="mb-2 flex items-center gap-2">
          <Badge variant="outline">{program.code}</Badge>
          <Badge variant="secondary">{program.form}</Badge>
        </div>
        <CardTitle className="text-xl">{program.name}</CardTitle>
        <CardDescription>{program.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 grid grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{program.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>{program.places} мест</span>
          </div>
          <div className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
            <span>Диплом</span>
          </div>
        </div>
        
        <div>
          <p className="mb-2 flex items-center gap-2 text-sm font-medium">
            <BookOpen className="h-4 w-4" />
            Основные дисциплины:
          </p>
          <div className="flex flex-wrap gap-1">
            {program.subjects.map((subject) => (
              <Badge key={subject} variant="secondary" className="text-xs">
                {subject}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Programs() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container">
          <h1 className="mb-4 font-serif text-4xl font-bold">Образовательные программы</h1>
          <p className="max-w-2xl text-lg text-primary-foreground/80">
            Институт инженерных и цифровых технологий готовит специалистов по 56 образовательным программам
          </p>
        </div>
      </section>

      {/* Programs */}
      <section className="py-16">
        <div className="container">
          <Tabs defaultValue="bachelor" className="w-full">
            <TabsList className="mb-8 grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
              <TabsTrigger value="bachelor">Бакалавриат</TabsTrigger>
              <TabsTrigger value="specialitet">Специалитет</TabsTrigger>
              <TabsTrigger value="master">Магистратура</TabsTrigger>
              <TabsTrigger value="postgrad">Аспирантура</TabsTrigger>
            </TabsList>
            
            <TabsContent value="bachelor">
              <div className="mb-4">
                <p className="text-muted-foreground">Программы бакалавриата — 4 года обучения</p>
              </div>
              <div className="grid gap-6 lg:grid-cols-2">
                {programs.bachelor.map((program) => (
                  <ProgramCard key={program.code} program={program} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="specialitet">
              <div className="mb-4">
                <p className="text-muted-foreground">Программы специалитета — 5,5 лет обучения</p>
              </div>
              <div className="grid gap-6 lg:grid-cols-2">
                {programs.specialitet.map((program) => (
                  <ProgramCard key={program.code} program={program} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="master">
              <div className="mb-4">
                <p className="text-muted-foreground">Программы магистратуры — 2 года обучения</p>
              </div>
              <div className="grid gap-6 lg:grid-cols-2">
                {programs.master.map((program) => (
                  <ProgramCard key={program.code} program={program} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="postgrad">
              <div className="mb-4">
                <p className="text-muted-foreground">Программы аспирантуры — 3-4 года обучения</p>
              </div>
              <div className="grid gap-6 lg:grid-cols-2">
                {programs.postgrad.map((program) => (
                  <ProgramCard key={program.code} program={program} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t bg-card py-16">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 font-serif text-2xl font-bold">Поступление</h2>
            <p className="mb-6 text-muted-foreground">
              Для получения подробной информации о поступлении и актуальном расписании занятий 
              посетите официальные ресурсы университета
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild>
                <a href="https://dekanat.bsuedu.ru/blocks/bsu_nabor/nabor.php" target="_blank" rel="noopener noreferrer">
                  Приёмная комиссия <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href="https://bsuedu.ru/bsu/education/schedule/" target="_blank" rel="noopener noreferrer">
                  Расписание занятий <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
