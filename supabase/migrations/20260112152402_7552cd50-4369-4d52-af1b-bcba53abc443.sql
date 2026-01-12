-- Create table to track daily AI question limits
CREATE TABLE public.ai_question_limits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  question_date DATE NOT NULL DEFAULT CURRENT_DATE,
  question_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, question_date)
);

-- Enable RLS
ALTER TABLE public.ai_question_limits ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own limits
CREATE POLICY "Users can view their own limits"
ON public.ai_question_limits
FOR SELECT
USING (auth.uid() = user_id);

-- Policy: Users can insert their own limits
CREATE POLICY "Users can insert their own limits"
ON public.ai_question_limits
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own limits
CREATE POLICY "Users can update their own limits"
ON public.ai_question_limits
FOR UPDATE
USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_ai_question_limits_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_ai_question_limits_updated_at
BEFORE UPDATE ON public.ai_question_limits
FOR EACH ROW
EXECUTE FUNCTION public.update_ai_question_limits_updated_at();