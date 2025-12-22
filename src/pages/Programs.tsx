import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Users, GraduationCap, BookOpen } from "lucide-react";

const programs = {
  bachelor: [
    {
      name: "Прикладная математика",
      code: "01.03.04",
      duration: "4 года",
      form: "Очная",
      places: 50,
      description: "Подготовка специалистов в области математического моделирования и вычислительных методов",
      subjects: ["Математический анализ", "Линейная алгебра", "Программирование", "Численные методы"],
    },
    {
      name: "Прикладная информатика",
      code: "09.03.03",
      duration: "4 года",
      form: "Очная",
      places: 40,
      description: "Подготовка IT-специалистов с глубокими знаниями математики",
      subjects: ["Базы данных", "Веб-разработка", "Алгоритмы", "Машинное обучение"],
    },
  ],
  master: [
    {
      name: "Математическое моделирование",
      code: "01.04.04",
      duration: "2 года",
      form: "Очная",
      places: 25,
      description: "Углублённое изучение методов построения и анализа математических моделей",
      subjects: ["Теория моделирования", "Оптимизация", "Суперкомпьютерные вычисления", "Big Data"],
    },
    {
      name: "Искусственный интеллект",
      code: "01.04.02",
      duration: "2 года",
      form: "Очная",
      places: 20,
      description: "Современные методы машинного обучения и анализа данных",
      subjects: ["Глубокое обучение", "Компьютерное зрение", "NLP", "Reinforcement Learning"],
    },
  ],
  postgrad: [
    {
      name: "Математическое моделирование",
      code: "1.2.2",
      duration: "3-4 года",
      form: "Очная/Заочная",
      places: 10,
      description: "Подготовка научных кадров высшей квалификации",
      subjects: ["Научные исследования", "Педагогическая практика", "Диссертация"],
    },
  ],
};

function ProgramCard({ program }: { program: typeof programs.bachelor[0] }) {
  return (
    <Card className="border-0 shadow-sm">
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
            Многоуровневая система подготовки специалистов
          </p>
        </div>
      </section>

      {/* Programs */}
      <section className="py-16">
        <div className="container">
          <Tabs defaultValue="bachelor" className="w-full">
            <TabsList className="mb-8 grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
              <TabsTrigger value="bachelor">Бакалавриат</TabsTrigger>
              <TabsTrigger value="master">Магистратура</TabsTrigger>
              <TabsTrigger value="postgrad">Аспирантура</TabsTrigger>
            </TabsList>
            
            <TabsContent value="bachelor">
              <div className="grid gap-6 lg:grid-cols-2">
                {programs.bachelor.map((program) => (
                  <ProgramCard key={program.code} program={program} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="master">
              <div className="grid gap-6 lg:grid-cols-2">
                {programs.master.map((program) => (
                  <ProgramCard key={program.code} program={program} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="postgrad">
              <div className="grid gap-6 lg:grid-cols-2">
                {programs.postgrad.map((program) => (
                  <ProgramCard key={program.code} program={program} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Schedule info */}
      <section className="border-t bg-card py-16">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 font-serif text-2xl font-bold">Расписание и материалы</h2>
            <p className="mb-6 text-muted-foreground">
              Для доступа к расписанию занятий и учебным материалам 
              войдите в личный кабинет студента
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
