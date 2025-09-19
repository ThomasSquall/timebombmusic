export interface TodosPercentages {
  hundred: number;
  aboveFifty: number;
  belowFifty: number;
  total?: number;
  days?: number;
}

export interface Todo {
  id: number;
  name: string;
  notes: string;
  completed: boolean;
  due_date: string;
  user_id?: number;
}
