import 'katex/dist/katex.min.css';
import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, Send, User, Loader2, Sparkles, Trash2, Lock, LogIn } from 'lucide-react';
import { KnowledgeTopic } from '@/lib/knowledge/types';
import { MathRenderer } from './MathRenderer';
import { useAILimit } from '@/hooks/useAILimit';
import { Link } from 'react-router-dom';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AIAssistantProps {
  topic?: KnowledgeTopic | null;
  variant?: 'default' | 'navigation';
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/math-assistant`;
const NAVIGATION_CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/navigation-assistant`;

export function AIAssistant({ topic, variant = 'default' }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated, loading, canAsk, remainingQuestions, dailyLimit, incrementCount } = useAILimit();

  useEffect(() => {
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }
  }, [messages]);

  const clearChat = () => {
    setMessages([]);
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading || !canAsk) return;

    // Increment question count first
    const success = await incrementCount();
    if (!success) {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: 'Произошла ошибка при отправке. Попробуйте ещё раз.' }
      ]);
      return;
    }

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    let assistantContent = '';
    const url = variant === 'navigation' ? NAVIGATION_CHAT_URL : CHAT_URL;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          topic: topic?.name || null,
        }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error('Слишком много запросов. Пожалуйста, подождите немного.');
        }
        if (response.status === 402) {
          throw new Error('Превышен лимит использования AI.');
        }
        throw new Error('Ошибка при получении ответа');
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No reader available');

      const decoder = new TextDecoder();
      let textBuffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf('\n')) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith('\r')) line = line.slice(0, -1);
          if (line.startsWith(':') || line.trim() === '') continue;
          if (!line.startsWith('data: ')) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantContent += content;
              setMessages(prev => {
                const last = prev[prev.length - 1];
                if (last?.role === 'assistant') {
                  return prev.map((m, i) => 
                    i === prev.length - 1 ? { ...m, content: assistantContent } : m
                  );
                }
                return [...prev, { role: 'assistant', content: assistantContent }];
              });
            }
          } catch {
            textBuffer = line + '\n' + textBuffer;
            break;
          }
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [
        ...prev,
        { 
          role: 'assistant', 
          content: error instanceof Error ? error.message : 'Произошла ошибка. Попробуйте ещё раз.' 
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const getWelcomeMessage = () => {
    if (variant === 'navigation') {
      return {
        main: 'Привет! Я помогу вам сориентироваться на сайте кафедры.',
        sub: 'Задайте вопрос о программах, преподавателях, новостях или контактах!'
      };
    }
    return {
      main: 'Привет! Я AI-ассистент по математике.',
      sub: `Задайте вопрос по ${topic ? `теме «${topic.name}»` : 'любой теме'}, и я помогу разобраться!`
    };
  };

  const welcome = getWelcomeMessage();

  if (loading) {
    return (
      <Card className="h-full flex flex-col">
        <CardContent className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  if (!isAuthenticated) {
    return (
      <Card className="h-full flex flex-col">
        <CardHeader className="pb-3 border-b">
          <CardTitle className="flex items-center gap-2 text-lg">
            <div className="p-2 rounded-lg bg-primary/10">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            AI-Ассистент
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col items-center justify-center text-center p-6">
          <div className="p-4 rounded-full bg-muted mb-4">
            <Lock className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Требуется авторизация</h3>
          <p className="text-muted-foreground text-sm mb-6">
            Чтобы использовать AI-ассистента, необходимо войти в систему
          </p>
          <Button asChild>
            <Link to="/auth">
              <LogIn className="mr-2 h-4 w-4" />
              Войти
            </Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3 border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <div className="p-2 rounded-lg bg-primary/10">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            AI-Ассистент
            {topic && (
              <span className="text-sm font-normal text-muted-foreground">
                • {topic.name}
              </span>
            )}
          </CardTitle>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              {remainingQuestions}/{dailyLimit} вопросов
            </span>
            {messages.length > 0 && (
              <Button
                variant="ghost"
                size="icon"
                onClick={clearChat}
                className="h-8 w-8"
                title="Очистить чат"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-4 gap-4 overflow-hidden">
        <div ref={scrollAreaRef} className="flex-1 overflow-hidden">
          <ScrollArea className="h-full pr-4">
            <div className="space-y-4">
              {messages.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground animate-fade-in">
                  <Bot className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="mb-2">{welcome.main}</p>
                  <p className="text-sm">{welcome.sub}</p>
                </div>
              ) : (
                messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex gap-3 animate-fade-in ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    {msg.role === 'assistant' && (
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Bot className="h-4 w-4 text-primary" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] p-3 rounded-lg transition-all duration-200 ${
                        msg.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      <div className="text-sm whitespace-pre-wrap break-words">
                        <MathRenderer content={msg.content} />
                      </div>
                    </div>
                    {msg.role === 'user' && (
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                        <User className="h-4 w-4 text-primary-foreground" />
                      </div>
                    )}
                  </div>
                ))
              )}
              {isLoading && messages[messages.length - 1]?.role === 'user' && (
                <div className="flex gap-3 animate-fade-in">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                  <div className="bg-muted p-3 rounded-lg">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        <div className="flex gap-2">
          <Textarea
            placeholder={canAsk ? "Задайте вопрос..." : "Лимит вопросов исчерпан на сегодня"}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="resize-none transition-all duration-200 focus:ring-2 focus:ring-primary/20"
            rows={2}
            disabled={!canAsk}
          />
          <Button
            onClick={sendMessage}
            disabled={!input.trim() || isLoading || !canAsk}
            size="icon"
            className="h-full aspect-square transition-transform duration-200 hover:scale-105"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
