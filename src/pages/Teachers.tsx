import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, BookOpen, Phone, MapPin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const departmentHead = {
  name: "Васильев Владимир Борисович",
  position: "Заведующий кафедрой",
  degree: "Доктор физико-математических наук, профессор",
  specialization: ["Дифференциальные уравнения", "Математическая физика", "Псевдодифференциальные операторы"],
  email: "vasilyev_v@bsuedu.ru",
  phone: "(4722) 30-13-56",
  address: "ул. Победы, 85, корп.14, к. 1-11а",
};

const instituteLeadership = [
  {
    name: "Жихарев Александр Геннадиевич",
    position: "Директор института",
    degree: "Доктор технических наук, доцент",
    specialization: ["Автоматизированные системы", "Цифровые технологии"],
    email: "zhikharev@bsuedu.ru",
  },
  {
    name: "Соколов Игорь Анатольевич",
    position: "Научный руководитель института",
    degree: "Доктор технических наук, академик РАН",
    specialization: ["Информационные технологии", "Системный анализ"],
    email: "ISokolov@ipiran.ru",
  },
  {
    name: "Маматов Евгений Михайлович",
    position: "Зам. директора по учебной работе",
    degree: "Кандидат технических наук, доцент",
    specialization: ["Информационные системы", "Методика преподавания"],
    email: "Mamatov@bsuedu.ru",
  },
];

const departmentStaff = [
  {
    name: "Профессорско-преподавательский состав",
    description: "На кафедре работают высококвалифицированные специалисты: доктора и кандидаты физико-математических наук, ведущие активную научную деятельность в области математического моделирования, дифференциальных уравнений и численных методов.",
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
            Кафедра прикладной математики и компьютерного моделирования · Институт инженерных и цифровых технологий
          </p>
        </div>
      </section>

      {/* Department Head */}
      <section className="py-16">
        <div className="container">
          <h2 className="mb-8 font-serif text-2xl font-bold">Заведующий кафедрой</h2>
          <Card className="border-0 shadow-md">
            <CardContent className="p-8">
              <div className="grid gap-8 md:grid-cols-3">
                <div className="flex flex-col items-center md:items-start">
                  <div className="mb-4 flex h-32 w-32 items-center justify-center rounded-lg bg-primary/10 text-4xl font-bold text-primary">
                    ВВБ
                  </div>
                  <Badge className="mb-2">Заведующий кафедрой</Badge>
                </div>
                <div className="md:col-span-2">
                  <h3 className="mb-2 text-xl font-semibold">{departmentHead.name}</h3>
                  <p className="mb-4 text-primary">{departmentHead.degree}</p>
                  
                  <div className="mb-4 flex flex-wrap gap-2">
                    {departmentHead.specialization.map((spec) => (
                      <Badge key={spec} variant="secondary">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <a href={`mailto:${departmentHead.email}`} className="flex items-center gap-2 text-muted-foreground hover:text-primary">
                      <Mail className="h-4 w-4" />
                      {departmentHead.email}
                    </a>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      {departmentHead.phone}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {departmentHead.address}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Institute Leadership */}
      <section className="border-t bg-card py-16">
        <div className="container">
          <h2 className="mb-8 font-serif text-2xl font-bold">Руководство института</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {instituteLeadership.map((person) => (
              <Card key={person.name} className="border-0 shadow-sm transition-shadow hover:shadow-md">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10 text-xl font-bold text-primary">
                    {person.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  
                  <h3 className="mb-1 font-semibold">{person.name}</h3>
                  <p className="mb-1 text-sm text-primary">{person.position}</p>
                  <p className="mb-4 text-sm text-muted-foreground">{person.degree}</p>
                  
                  <div className="mb-4 flex flex-wrap gap-1">
                    {person.specialization.map((spec) => (
                      <Badge key={spec} variant="secondary" className="text-xs">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                  
                  <a 
                    href={`mailto:${person.email}`} 
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
                  >
                    <Mail className="h-4 w-4" />
                    {person.email}
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Department Info */}
      <section className="py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 font-serif text-2xl font-bold">Кадровый состав института</h2>
            <p className="mb-6 text-muted-foreground">
              В кадровом составе Института инженерных и цифровых технологий — 2 академика и члена-корреспондента РАН, 
              35 докторов и более 80 кандидатов наук. Работает 4 диссертационных совета по техническим и физико-математическим наукам.
            </p>
            <Button asChild variant="outline">
              <a href="https://bsuedu.ru/bsu/info/pps/?department=AC2060B4-9395-E811-BFD6-E4115B118B30" target="_blank" rel="noopener noreferrer">
                Полный список преподавателей <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
