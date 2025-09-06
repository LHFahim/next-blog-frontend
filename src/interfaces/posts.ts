export interface IPost {
  id: number;
  image_url: string;
  title: string;
  content: string;
  created_at: string | Date;
  user_id: string | number | null;
}
