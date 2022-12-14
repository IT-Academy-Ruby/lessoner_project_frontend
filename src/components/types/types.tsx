export interface ILesson {
  id: number;
  view: number;
  title: string;
  status: string;
  duration: string;
  imagePreview: string;
  published: string;
  category: string;
  rating: string;
  totalVotes: string;
}

export interface ILessonBack {
  author_id: number;
  category_id: number;
  description: string;
  id: number;
  status: string;
  title: string;
  video_link: string;
}