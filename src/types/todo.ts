export interface Todo {
  id: number;
  title: string;
  description?: string;
  type: string;
  completed: boolean;
  created_at: Date;
}
