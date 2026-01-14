import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Target, BookOpen, Users, Building, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEOHead, BreadcrumbJsonLd } from "@/components/seo";
const milestones = [
  { year: "1876", event: "Основание Белгородского учительского института" },
  { year: "1919", event: "Преобразование в Белгородский педагогический институт" },
  { year: "1996", event: "Создание Белгородского государственного университета" },
  { year: "2010", event: "Присвоение статуса Национального исследовательского университета" },
  { year: "2011", event: "Создание НИУ «БелГУ» как автономного учреждения" },
];

const values = [
  {
    icon: Target,
    title: "Миссия",
    description: "Подготовка высококвалифицированных специалистов в области прикладной математики и информационных технологий, способных решать актуальные научные и практические задачи.",
  },
  {
    icon: Award,
    title: "Достижения",
    description: "Единственный вуз Центрального федерального округа (кроме столичных), получивший статус национального исследовательского университета.",
  },
  {
    icon: BookOpen,
    title: "Образование",
    description: "298 образовательных программ высшего образования, 33 совместные программы с ведущими университетами мира, 28 программ с двойными дипломами.",
  },
  {
    icon: Users,
    title: "Сообщество",
    description: "Более 25 700 студентов, 4 100 иностранных студентов из разных стран, активное научное сообщество с 8 зарегистрированными научными школами.",
  },
];

const universityFacts = [
  "10 институтов, 2 колледжа и филиал",
  "103 кафедры, из которых 21 осуществляет практическую подготовку",
  "Более 1 100 докторов и кандидатов наук",
  "14 академиков и членов-корреспондентов РАН",
  "62 научных центра и лаборатории",
  "21 диссертационный совет по 14 отраслям науки",
];

export default function About() {
  return (
    <Layout>
      <SEOHead 
        title="О кафедре"
        description="История и структура кафедры прикладной математики и компьютерного моделирования НИУ БелГУ. Миссия, достижения и научные направления."
        keywords={['о кафедре', 'БелГУ', 'история', 'миссия', 'научные направления', 'институт инженерных технологий']}
      />
      <BreadcrumbJsonLd 
        items={[
          { name: 'Главная', url: 'https://digital-math-fun.lovable.app' },
          { name: 'О кафедре' }
        ]}
      />

      {/* Hero */}
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container">
          <h1 className="mb-4 font-serif text-4xl font-bold">О кафедре</h1>
          <p className="max-w-2xl text-lg text-primary-foreground/80">
            Кафедра прикладной математики и компьютерного моделирования — 
            структурное подразделение Института инженерных и цифровых технологий НИУ «БелГУ»
          </p>
        </div>
      </section>

      {/* About Institute */}
      <section className="py-16">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <Building className="h-6 w-6 text-primary" />
                <h2 className="font-serif text-3xl font-bold">Институт инженерных и цифровых технологий</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Кафедра входит в состав Института инженерных и цифровых технологий НИУ «БелГУ» — 
                  одного из крупнейших структурных подразделений университета, готовящего специалистов 
                  в области IT, математики и инженерных наук.
                </p>
                <p>
                  Институт обеспечивает подготовку кадров по современным направлениям: от программной 
                  инженерии и информационной безопасности до математического моделирования и анализа данных.
                </p>
                <p>
                  Студенты имеют доступ к современным лабораториям, центрам коллективного пользования 
                  и участвуют в реальных научных проектах под руководством ведущих специалистов.
                </p>
              </div>
              <Button asChild variant="outline" className="mt-6">
                <a href="https://edt.bsuedu.ru/" target="_blank" rel="noopener noreferrer">
                  Сайт института <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
            <div>
              <h3 className="mb-6 font-semibold">НИУ «БелГУ» в цифрах</h3>
              <div className="space-y-3">
                {universityFacts.map((fact, index) => (
                  <div key={index} className="flex items-start gap-3 rounded-lg border p-4">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                      {index + 1}
                    </div>
                    <span className="text-foreground">{fact}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* History */}
      <section className="border-t bg-card py-16">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 font-serif text-3xl font-bold">История университета</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  История НИУ «БелГУ» началась 26 сентября 1876 года, когда в уездном городе Белгороде 
                  был открыт учительский институт. С этого момента начался сложный, но интересный путь 
                  одного из старейших вузов России.
                </p>
                <p>
                  В 1996 году на базе педагогического университета был создан Белгородский государственный 
                  университет, объединивший несколько образовательных учреждений региона.
                </p>
                <p>
                  В 2010 году БелГУ стал единственным вузом Центрального федерального округа 
                  (за исключением столичных университетов), получившим статус национального 
                  исследовательского университета.
                </p>
                <p>
                  Сегодня НИУ «БелГУ» — это крупнейший научно-образовательный центр региона, 
                  участник программы «Приоритет-2030».
                </p>
              </div>
            </div>
            <div>
              <h3 className="mb-6 font-semibold">Ключевые вехи</h3>
              <div className="relative border-l pl-6">
                {milestones.map((milestone) => (
                  <div key={milestone.year} className="relative pb-8 last:pb-0">
                    <div className="absolute -left-[25px] flex h-4 w-4 items-center justify-center rounded-full bg-primary" />
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
      <section className="py-16">
        <div className="container">
          <h2 className="mb-12 text-center font-serif text-3xl font-bold">Наши ценности</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {values.map((value) => (
              <Card key={value.title} className="border-0 shadow-sm">
                <CardContent className="flex gap-4 p-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
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
      <section className="border-t bg-card py-16">
        <div className="container">
          <h2 className="mb-8 font-serif text-3xl font-bold">Научные направления кафедры</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <h3 className="mb-3 font-semibold">Математическое моделирование</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Моделирование физических процессов</li>
                  <li>• Вычислительная гидродинамика</li>
                  <li>• Экономико-математические модели</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <h3 className="mb-3 font-semibold">Анализ данных и AI</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Машинное обучение</li>
                  <li>• Глубокие нейронные сети</li>
                  <li>• Big Data технологии</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <h3 className="mb-3 font-semibold">Вычислительные методы</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Численные методы</li>
                  <li>• Оптимизационные алгоритмы</li>
                  <li>• Параллельные вычисления</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 font-serif text-2xl font-bold">Узнайте больше о НИУ «БелГУ»</h2>
            <p className="mb-6 text-muted-foreground">
              Посетите официальный сайт университета для получения подробной информации
            </p>
            <Button asChild>
              <a href="https://bsuedu.ru/bsu/" target="_blank" rel="noopener noreferrer">
                Официальный сайт НИУ «БелГУ» <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
