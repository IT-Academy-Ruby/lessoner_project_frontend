export interface ILessonBack {
  author_id: number;
  category_id: number;
  description: string;
  id: number;
  status: string;
  title: string;
  video_link: string;
}

export interface LessonCardsProps {
  id: number;
  imagePreview: string;
  status: string;
  duration: string;
  title: string;
  published: string | null;
  view: number;
  category: string;
  rating: string;
  totalVotes: string;
};