import 'katex/dist/katex.min.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TopicContent as TopicContentType, KnowledgeTopic } from '@/lib/knowledge/types';
import { BookOpen, Calculator, Lightbulb } from 'lucide-react';
import { ContentRenderer, MathRenderer } from './MathRenderer';
import { InlineMath } from 'react-katex';

interface TopicContentProps {
  topic: KnowledgeTopic;
  content: TopicContentType;
}

export function TopicContentComponent({ topic, content }: TopicContentProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div 
          className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl font-bold text-primary-foreground"
          style={{ backgroundColor: topic.color }}
        >
          {topic.icon}
        </div>
        <div>
          <h1 className="font-serif text-3xl font-bold">{topic.name}</h1>
          <p className="text-muted-foreground">{topic.description}</p>
        </div>
      </div>

      {/* Key formulas */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Lightbulb className="h-5 w-5 text-primary" />
            Ключевые формулы
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {content.formulas.map((formula, idx) => (
              <div 
                key={idx} 
                className="bg-secondary text-secondary-foreground px-3 py-1.5 rounded-md text-sm"
              >
                <InlineMath math={formula} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main content tabs */}
      <Tabs defaultValue="theory" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="theory" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Теория
          </TabsTrigger>
          <TabsTrigger value="examples" className="flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            Примеры
          </TabsTrigger>
        </TabsList>

        <TabsContent value="theory" className="mt-6">
          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-6">
              {content.sections.map((section) => (
                <Card key={section.id}>
                  <CardHeader>
                    <CardTitle>{section.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ContentRenderer content={section.content} />
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="examples" className="mt-6">
          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-6">
              {content.examples.map((example) => (
                <Card key={example.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{example.title}</CardTitle>
                    <div className="mt-2 p-3 bg-muted rounded-lg">
                      <p className="font-medium mb-1">Задача:</p>
                      <div className="text-lg">
                        <MathRenderer content={example.problem} />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                      <p className="font-medium text-primary mb-3">Решение:</p>
                      <ContentRenderer content={example.solution} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}
