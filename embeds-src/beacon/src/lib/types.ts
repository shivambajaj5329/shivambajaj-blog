export interface Day {
  id: number;
  day_order: number;
  day_label: string;
  day_of_week: string;
}

export interface Exercise {
  id: number;
  day_id: number;
  exercise_order: number;
  exercise: string;
  sets: string;
  reps: string;
  rpe?: string;
  notes?: string;
}

export interface SetEntry {
  id: number;
  session_id: number;
  exercise: string;
  set_num: number;
  weight?: number;
  reps?: number;
  rpe?: number;
}

export interface Session {
  id: number;
  date: string;
  day_id: number | null;
  day_label?: string;
  duration_min?: number;
  notes?: string;
}

export interface FoodEntry {
  id: number;
  date: string;
  eaten_at: string;
  food_name: string;
  serving?: string;
  calories?: number;
  protein_g?: number;
  carbs_g?: number;
  fat_g?: number;
  notes?: string;
  photo_url?: string;
  source?: "manual" | "ai_text" | "ai_photo";
}

export interface WeightEntry {
  date: string;
  weight_kg: number;
  resting_hr?: number;
  sleep_h?: number;
}

export interface Goals {
  lifting_min_week: number;
  running_min_week: number;
  running_km_week: number;
  calories_day: number;
  protein_g_day: number;
  carbs_g_day: number;
  fat_g_day: number;
}

export interface Phase {
  name: string;
  tagline: string;
  focus: string;
  pct: number;
  week: number;
  duration_weeks: number;
}

export interface FoodTotals {
  calories: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
  entries: number;
}

export interface LastSession {
  date: string;
  sets: { weight?: number; reps?: number; rpe?: number }[];
}

export interface Run {
  id: number;
  date: string;
  duration_min: number;
  distance_km: number;
  notes?: string;
}
