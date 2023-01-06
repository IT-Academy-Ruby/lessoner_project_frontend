export interface ILessonBack {
  author_avatar_url: string | null;
  author_id: number;
  author_name: string;
  category_id: number;
  created_at: string;
  description: string;
  id: number;
  image_link: string | null;
  image_name: string | null;
  image_size: string | null;
  rating: number | null;
  status: string;
  title: string;
  video_link: string;
  views_count: number;
  votes_count: number;
}

export interface LessonCardsProps {
  id: number;
  imagePreview?: string;
  status: string;
  duration?: string;
  title: string;
  published: string;
  view?: number;
  category?: string;
  rating?: number;
  totalVotes?: number;
};