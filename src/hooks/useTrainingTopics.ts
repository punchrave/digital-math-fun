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

export function useTrainingTopic(slug: TopicSlug) {
  return useQuery({
    queryKey: ['training-topic', slug],
    queryFn: async (): Promise<TrainingTopic | null> => {
      const { data, error } = await trainerDb.trainingTopics()
        .select('*')
        .eq('slug', slug)
        .maybeSingle();
      
      if (error) throw error;
      return data as TrainingTopic | null;
    },
    enabled: !!slug,
  });
}
