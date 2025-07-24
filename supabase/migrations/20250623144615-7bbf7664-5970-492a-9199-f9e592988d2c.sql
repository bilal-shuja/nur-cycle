
-- Create table for topic discussions
CREATE TABLE public.topic_discussions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  topic TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for topic likes
CREATE TABLE public.topic_likes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  discussion_id UUID REFERENCES public.topic_discussions(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for topic replies
CREATE TABLE public.topic_replies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  discussion_id UUID REFERENCES public.topic_discussions(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS)
ALTER TABLE public.topic_discussions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.topic_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.topic_replies ENABLE ROW LEVEL SECURITY;

-- Create policies for topic_discussions
CREATE POLICY "Anyone can view topic discussions" 
  ON public.topic_discussions 
  FOR SELECT 
  USING (true);

CREATE POLICY "Authenticated users can create topic discussions" 
  ON public.topic_discussions 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own topic discussions" 
  ON public.topic_discussions 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own topic discussions" 
  ON public.topic_discussions 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Create policies for topic_likes
CREATE POLICY "Anyone can view topic likes" 
  ON public.topic_likes 
  FOR SELECT 
  USING (true);

CREATE POLICY "Authenticated users can create topic likes" 
  ON public.topic_likes 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own topic likes" 
  ON public.topic_likes 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Create policies for topic_replies
CREATE POLICY "Anyone can view topic replies" 
  ON public.topic_replies 
  FOR SELECT 
  USING (true);

CREATE POLICY "Authenticated users can create topic replies" 
  ON public.topic_replies 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own topic replies" 
  ON public.topic_replies 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own topic replies" 
  ON public.topic_replies 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Add unique constraint to prevent duplicate likes
ALTER TABLE public.topic_likes ADD CONSTRAINT unique_user_discussion_like UNIQUE (user_id, discussion_id);
