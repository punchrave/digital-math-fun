import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { KnowledgeTopic } from '@/lib/knowledge/types';

interface TopicCardProps {
  topic: KnowledgeTopic;
  onClick: () => void;
}

export function TopicCard({ topic, onClick }: TopicCardProps) {
  return (
    <Card 
      className="cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02] hover:border-primary/50"
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <div 
            className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl font-bold text-primary-foreground"
            style={{ backgroundColor: topic.color }}
          >
            {topic.icon}
          </div>
          <div>
            <CardTitle className="text-lg">{topic.name}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription>{topic.description}</CardDescription>
      </CardContent>
    </Card>
  );
}
