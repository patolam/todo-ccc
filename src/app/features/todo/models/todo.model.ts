export interface Todo {
  id: number;
  date?: string;
  location?: string;
  content?: string;
  extras?: TodoExtras;
}

export interface TodoExtras {
  latitude?: number;
  longitude?: number;
  temperature?: number;
  error?: string;
}
