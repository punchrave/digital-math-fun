import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { 
  Home, 
  Info, 
  Users, 
  GraduationCap, 
  Newspaper, 
  Phone, 
  BookOpen,
  ChevronRight 
} from 'lucide-react';
import { SEOHead, BreadcrumbJsonLd } from '@/components/seo';
import { TOPICS } from '@/lib/knowledge/types';

// Структура сайта для sitemap
const siteStructure = [
  {
    title: 'Главная',
    path: '/',
    icon: Home,
    description: 'Главная страница кафедры прикладной математики и компьютерного моделирования',
  },
  {
    title: 'О кафедре',
    path: '/about',
    icon: Info,
    description: 'История, миссия и научные направления кафедры',
  },
  {
    title: 'Преподаватели',
    path: '/teachers',
    icon: Users,
    description: 'Профессорско-преподавательский состав кафедры',
  },
  {
    title: 'Образовательные программы',
    path: '/programs',
    icon: GraduationCap,
    description: 'Бакалавриат, магистратура, специалитет и аспирантура',
  },
  {
    title: 'Новости',
    path: '/news',
    icon: Newspaper,
    description: 'Актуальные новости и события кафедры',
  },
  {
    title: 'Контакты',
    path: '/contacts',
    icon: Phone,
    description: 'Контактная информация и форма обратной связи',
  },
  {
    title: 'База знаний',
    path: '/knowledge',
    icon: BookOpen,
    description: 'Интерактивная база знаний по высшей математике',
    children: TOPICS.map(topic => ({
      title: topic.name,
      description: topic.description,
    })),
  },
];

export default function Sitemap() {
  return (
    <Layout>
      <SEOHead 
        title="Карта сайта"
        description="Полная структура сайта кафедры прикладной математики и компьютерного моделирования НИУ БелГУ"
        keywords={['карта сайта', 'sitemap', 'навигация', 'структура']}
      />
      <BreadcrumbJsonLd 
        items={[
          { name: 'Главная', url: 'https://digital-math-fun.lovable.app' },
          { name: 'Карта сайта' }
        ]}
      />

      {/* Hero */}
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container">
          <h1 className="mb-4 font-serif text-4xl font-bold">Карта сайта</h1>
          <p className="max-w-2xl text-lg text-primary-foreground/80">
            Полная структура сайта для удобной навигации
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {siteStructure.map((item) => (
              <Card key={item.path} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <Link to={item.path} className="flex items-center gap-3 group">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {item.title}
                    </CardTitle>
                  </Link>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {item.description}
                  </p>
                  
                  {item.children && (
                    <div className="space-y-2 border-t pt-4">
                      <p className="text-xs font-medium text-muted-foreground uppercase">
                        Разделы:
                      </p>
                      <ul className="space-y-1">
                        {item.children.map((child, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm">
                            <ChevronRight className="h-3 w-3 text-muted-foreground" />
                            <span>{child.title}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SEO информация для разработчиков */}
      <section className="border-t bg-muted/30 py-16">
        <div className="container">
          <h2 className="mb-6 font-serif text-2xl font-bold">SEO-оптимизация сайта</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Структурированные данные</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>✓ Schema.org EducationalOrganization</p>
                <p>✓ Schema.org Course для программ</p>
                <p>✓ Schema.org LearningResource для базы знаний</p>
                <p>✓ Schema.org FAQPage для FAQ</p>
                <p>✓ Schema.org BreadcrumbList для навигации</p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Мета-теги</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>✓ Динамические title и description</p>
                <p>✓ Open Graph для соцсетей</p>
                <p>✓ Twitter Card</p>
                <p>✓ Canonical URL</p>
                <p>✓ Географические мета-теги</p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Доступность формул</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>✓ Alt-тексты для LaTeX формул</p>
                <p>✓ Семантическая HTML-структура</p>
                <p>✓ ARIA-атрибуты</p>
                <p>✓ Поддержка скринридеров</p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Производительность</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>✓ Preconnect для внешних ресурсов</p>
                <p>✓ Lazy loading изображений</p>
                <p>✓ Оптимизированные шрифты</p>
                <p>✓ Минимизация CSS/JS</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
}