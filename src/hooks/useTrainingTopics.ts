import { useQuery } from '@tanstack/react-query';
import { trainerDb } from '@/lib/trainer/db';
import { TrainingTopic, TopicSlug } from '@/lib/trainer/types';

export function useTrainingTopics() {
  return useQuery({
    queryKey: ['training-topics'],
    queryFn: async (): Promise<TrainingTopic[]> => {
      const { data, error } = await trainerDb.trainingTopics()
        .select('*')
        .order('name');
      
      if (error) throw error;
      return (data || []) as TrainingTopic[];
    },
  });
}

export function useTrainingTopic(topicId: string) {
  return useQuery({
    queryKey: ['training-topic', topicId],
    queryFn: async (): Promise<TrainingTopic | null> => {
      const { data, error } = await trainerDb.trainingTopics()
        .select('*')
        .eq('id', topicId)
        .maybeSingle();
      
      if (error) throw error;
      return data as TrainingTopic | null;
    },
    enabled: !!topicId,
  });
}
