import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { TopicContent as TopicContentType, KnowledgeTopic } from '@/lib/knowledge/types';
import { BookOpen, Calculator, Lightbulb } from 'lucide-react';

interface TopicContentProps {
  topic: KnowledgeTopic;
  content: TopicContentType;
}

// Simple markdown-like renderer for math content
function renderContent(text: string) {
  // Convert markdown bold
  let html = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  
  // Convert headers
  html = html.replace(/^### (.+)$/gm, '<h3 class="text-lg font-semibold mt-6 mb-2">$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2 class="text-xl font-semibold mt-8 mb-3">$1</h2>');
  
  // Convert lists
  html = html.replace(/^- (.+)$/gm, '<li class="ml-4">$1</li>');
  html = html.replace(/^(\d+)\. (.+)$/gm, '<li class="ml-4"><strong>$1.</strong> $2</li>');
  
  // Convert tables (basic)
  html = html.replace(/\|(.+)\|/g, (match) => {
    const cells = match.split('|').filter(c => c.trim());
    if (cells.every(c => /^[-:]+$/.test(c.trim()))) {
      return ''; // Skip separator row
    }
    const isHeader = !html.includes('<tr>');
    const cellTag = isHeader ? 'th' : 'td';
    const cellClass = isHeader ? 'border px-3 py-2 text-left font-semibold bg-muted' : 'border px-3 py-2';
    return `<tr>${cells.map(c => `<${cellTag} class="${cellClass}">${c.trim()}</${cellTag}>`).join('')}</tr>`;
  });
  
  // Wrap table rows
  if (html.includes('<tr>')) {
    html = html.replace(/(<tr>.*<\/tr>)+/gs, '<table class="w-full border-collapse my-4">$&</table>');
  }
  
  return html;
}

export function TopicContentComponent({ topic, content }: TopicContentProps) {
  // Load MathJax for LaTeX rendering
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
    script.async = true;
    script.id = 'mathjax-script';
    
    if (!document.getElementById('mathjax-script')) {
      // Configure MathJax
      (window as any).MathJax = {
        tex: {
          inlineMath: [['\\(', '\\)']],
          displayMath: [['$$', '$$']],
        },
        startup: {
          pageReady: () => {
            (window as any).MathJax.typeset();
          }
        }
      };
      document.head.appendChild(script);
    } else {
      // Re-typeset if MathJax is already loaded
      setTimeout(() => {
        if ((window as any).MathJax?.typeset) {
          (window as any).MathJax.typeset();
        }
      }, 100);
    }
  }, [content]);

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
              <Badge key={idx} variant="secondary" className="text-sm px-3 py-1.5 font-mono">
                \({formula}\)
              </Badge>
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
                    <div 
                      className="prose prose-sm dark:prose-invert max-w-none"
                      dangerouslySetInnerHTML={{ __html: renderContent(section.content) }}
                    />
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
                      <p className="font-medium">Задача:</p>
                      <p className="text-lg">{example.problem}</p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                      <p className="font-medium text-primary mb-3">Решение:</p>
                      <div 
                        className="prose prose-sm dark:prose-invert max-w-none"
                        dangerouslySetInnerHTML={{ __html: renderContent(example.solution) }}
                      />
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
