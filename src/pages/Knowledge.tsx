import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { TopicCard } from '@/components/knowledge/TopicCard';
import { TopicContentComponent } from '@/components/knowledge/TopicContent';
import { AIAssistant } from '@/components/knowledge/AIAssistant';
import { Button } from '@/components/ui/button';
import { TOPICS, KnowledgeTopic } from '@/lib/knowledge/types';
import { TOPIC_CONTENT } from '@/lib/knowledge/content';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { 
  SEOHead, 
  LearningResourceJsonLd, 
  BreadcrumbJsonLd,
  generateTopicKeywords 
} from '@/components/seo';

export default function Knowledge() {
  const [selectedTopic, setSelectedTopic] = useState<KnowledgeTopic | null>(null);

  return (
    <Layout>
      <section className="py-8 md:py-12">
        <div className="container">
      {/* SEO для списка тем */}
      {!selectedTopic ? (
        <>
          <SEOHead 
            title="База знаний по высшей математике"
            description="Интерактивная база знаний по высшей математике: пределы, производные, интегралы, матрицы и другие темы. Теория, формулы и разобранные примеры с AI-ассистентом."
            keywords={['база знаний', 'высшая математика', 'формулы', 'примеры', 'теория', 'пределы', 'производные', 'интегралы', 'матрицы']}
          />
          <LearningResourceJsonLd
            name="База знаний по высшей математике"
            description="Интерактивная образовательная платформа с теоретическими материалами, формулами и примерами по высшей математике"
            teaches={TOPICS.map(t => t.name)}
          />
          <BreadcrumbJsonLd 
            items={[
              { name: 'Главная', url: 'https://digital-math-fun.lovable.app' },
              { name: 'База знаний' }
            ]}
          />
        </>
      ) : (
        <>
          {/* SEO для выбранной темы */}
          <SEOHead 
            title={`${selectedTopic.name} — База знаний`}
            description={`${selectedTopic.description}. Теория, ключевые формулы и разобранные примеры с пошаговыми решениями.`}
            keywords={generateTopicKeywords(selectedTopic.name, selectedTopic.description)}
          />
          <LearningResourceJsonLd
            name={selectedTopic.name}
            description={selectedTopic.description}
            teaches={TOPIC_CONTENT[selectedTopic.slug].formulas.slice(0, 5)}
            topic={selectedTopic.name}
          />
          <BreadcrumbJsonLd 
            items={[
              { name: 'Главная', url: 'https://digital-math-fun.lovable.app' },
              { name: 'База знаний', url: 'https://digital-math-fun.lovable.app/#/knowledge' },
              { name: selectedTopic.name }
            ]}
          />
        </>
      )}

      {!selectedTopic ? (
        <>
          <div className="mb-8">
            <h1 className="font-serif text-3xl font-bold mb-2 flex items-center gap-3">
              <BookOpen className="h-8 w-8 text-primary" />
              База знаний
            </h1>
            <p className="text-muted-foreground">
              Теоретический материал и разобранные примеры по высшей математике
            </p>
          </div>

              <div className="grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <div className="grid gap-4 sm:grid-cols-2">
                    {TOPICS.map((topic) => (
                      <TopicCard
                        key={topic.slug}
                        topic={topic}
                        onClick={() => setSelectedTopic(topic)}
                      />
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-1 h-[600px]">
                  <AIAssistant topic={null} />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="mb-6">
                <Button variant="ghost" onClick={() => setSelectedTopic(null)}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Назад к темам
                </Button>
              </div>

              <div className="grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <TopicContentComponent
                    topic={selectedTopic}
                    content={TOPIC_CONTENT[selectedTopic.slug]}
                  />
                </div>

                <div className="lg:col-span-1 h-[700px]">
                  <AIAssistant topic={selectedTopic} />
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </Layout>
  );
}
