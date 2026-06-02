import type {
  Day,
  Exercise,
  FoodEntry,
  Goals,
  LastSession,
  Phase,
  Run,
  Session,
  WeightEntry,
} from "./types";
import chickenRicePhoto from "../assets/chicken-rice.jpeg";

export const today_date = "Monday, Jun 1, 2026";
export const today_dow = "Mon";
export const selected_date = "2026-06-01";
export const next_date = "2026-06-02";

export const phase: Phase = {
  name: "Build",
  tagline: "Heavier loads, tighter focus on the big three.",
  focus: "Add 2.5 kg week-over-week on squat / bench / deadlift while keeping accessory volume.",
  pct: 47,
  week: 6,
  duration_weeks: 12,
};

export const days: Day[] = [
  { id: 1, day_order: 1, day_label: "DAY 1 — Lower Strength", day_of_week: "Mon" },
  { id: 2, day_order: 2, day_label: "DAY 2 — Upper Push", day_of_week: "Tue" },
  { id: 3, day_order: 3, day_label: "DAY 3 — Upper Pull", day_of_week: "Thu" },
  { id: 4, day_order: 4, day_label: "DAY 4 — Lower Hypertrophy", day_of_week: "Fri" },
  { id: 5, day_order: 5, day_label: "DAY 5 — Conditioning", day_of_week: "Sat" },
];

export const today_day: Day = days[0];

export const exercises_by_day: Record<number, Exercise[]> = {
  1: [
    {
      id: 11,
      day_id: 1,
      exercise_order: 1,
      exercise: "Back Squat",
      sets: "4",
      reps: "4-5",
      rpe: "7-8",
      notes: "Top set RPE 7-8. Belt for top set, no belt below.",
    },
    {
      id: 12,
      day_id: 1,
      exercise_order: 2,
      exercise: "Romanian Deadlift",
      sets: "3",
      reps: "6-8",
      rpe: "8",
      notes: "Slow eccentric, 2s stretch at the bottom.",
    },
    {
      id: 13,
      day_id: 1,
      exercise_order: 3,
      exercise: "Walking Lunge",
      sets: "3",
      reps: "10/leg",
      rpe: "8",
    },
    {
      id: 14,
      day_id: 1,
      exercise_order: 4,
      exercise: "Standing Calf Raise",
      sets: "4",
      reps: "12-15",
      rpe: "9",
      notes: "1s pause at the top.",
    },
  ],
  2: [
    {
      id: 21,
      day_id: 2,
      exercise_order: 1,
      exercise: "Bench Press",
      sets: "4",
      reps: "5",
      rpe: "8",
    },
    {
      id: 22,
      day_id: 2,
      exercise_order: 2,
      exercise: "Overhead Press",
      sets: "3",
      reps: "6-8",
      rpe: "8",
    },
    {
      id: 23,
      day_id: 2,
      exercise_order: 3,
      exercise: "Dips",
      sets: "3",
      reps: "8-12",
      rpe: "9",
    },
    {
      id: 24,
      day_id: 2,
      exercise_order: 4,
      exercise: "Lateral Raise",
      sets: "3",
      reps: "12-15",
      rpe: "9",
    },
  ],
  3: [
    {
      id: 31,
      day_id: 3,
      exercise_order: 1,
      exercise: "Weighted Pull-up",
      sets: "4",
      reps: "5-6",
      rpe: "8",
    },
    {
      id: 32,
      day_id: 3,
      exercise_order: 2,
      exercise: "Barbell Row",
      sets: "3",
      reps: "6-8",
      rpe: "8",
    },
    {
      id: 33,
      day_id: 3,
      exercise_order: 3,
      exercise: "Face Pull",
      sets: "3",
      reps: "12-15",
      rpe: "9",
    },
    {
      id: 34,
      day_id: 3,
      exercise_order: 4,
      exercise: "Hammer Curl",
      sets: "3",
      reps: "10-12",
      rpe: "9",
    },
  ],
  4: [
    {
      id: 41,
      day_id: 4,
      exercise_order: 1,
      exercise: "Front Squat",
      sets: "4",
      reps: "6-8",
      rpe: "8",
    },
    {
      id: 42,
      day_id: 4,
      exercise_order: 2,
      exercise: "Deadlift",
      sets: "3",
      reps: "5",
      rpe: "8",
      notes: "Reset between every rep.",
    },
    {
      id: 43,
      day_id: 4,
      exercise_order: 3,
      exercise: "Leg Curl",
      sets: "3",
      reps: "10-12",
      rpe: "9",
    },
  ],
  5: [
    {
      id: 51,
      day_id: 5,
      exercise_order: 1,
      exercise: "Sled Push",
      sets: "5",
      reps: "30m",
      rpe: "9",
    },
    {
      id: 52,
      day_id: 5,
      exercise_order: 2,
      exercise: "Farmer Carry",
      sets: "4",
      reps: "40m",
      rpe: "9",
    },
  ],
};

export const last_session_lookup: Record<string, LastSession> = {
  "Back Squat": {
    date: "2026-05-25",
    sets: [
      { weight: 130, reps: 5, rpe: 7 },
      { weight: 130, reps: 5, rpe: 7.5 },
      { weight: 130, reps: 4, rpe: 8 },
      { weight: 130, reps: 4, rpe: 8 },
    ],
  },
  "Romanian Deadlift": {
    date: "2026-05-25",
    sets: [
      { weight: 110, reps: 8, rpe: 8 },
      { weight: 110, reps: 8, rpe: 8 },
      { weight: 110, reps: 7, rpe: 8.5 },
    ],
  },
  "Walking Lunge": {
    date: "2026-05-25",
    sets: [
      { weight: 20, reps: 10, rpe: 7 },
      { weight: 20, reps: 10, rpe: 7.5 },
      { weight: 20, reps: 10, rpe: 8 },
    ],
  },
  "Standing Calf Raise": {
    date: "2026-05-25",
    sets: [
      { weight: 60, reps: 15, rpe: 8 },
      { weight: 60, reps: 13, rpe: 9 },
      { weight: 60, reps: 12, rpe: 9 },
      { weight: 60, reps: 10, rpe: 9.5 },
    ],
  },
  "Bench Press": {
    date: "2026-05-26",
    sets: [
      { weight: 92.5, reps: 5, rpe: 7.5 },
      { weight: 92.5, reps: 5, rpe: 8 },
      { weight: 92.5, reps: 5, rpe: 8.5 },
      { weight: 92.5, reps: 4, rpe: 9 },
    ],
  },
};

export const recent_sessions: Session[] = [
  { id: 101, date: "2026-05-30", day_id: 5, day_label: "DAY 5 — Conditioning", duration_min: 38 },
  { id: 102, date: "2026-05-29", day_id: 4, day_label: "DAY 4 — Lower Hypertrophy", duration_min: 72 },
  { id: 103, date: "2026-05-27", day_id: 3, day_label: "DAY 3 — Upper Pull", duration_min: 68 },
  { id: 104, date: "2026-05-26", day_id: 2, day_label: "DAY 2 — Upper Push", duration_min: 65 },
  { id: 105, date: "2026-05-25", day_id: 1, day_label: "DAY 1 — Lower Strength", duration_min: 81 },
];

export const food_entries_today: FoodEntry[] = [
  {
    id: 901,
    date: "2026-06-01",
    eaten_at: "08:15",
    food_name: "Greek yogurt + berries + honey",
    serving: "200g yogurt, 80g berries, 1 tbsp honey",
    calories: 280,
    protein_g: 22,
    carbs_g: 38,
    fat_g: 4,
    notes: "Post-fasted",
  },
  {
    id: 902,
    date: "2026-06-01",
    eaten_at: "10:30",
    food_name: "Cold brew + protein scoop",
    serving: "16oz cold brew + 30g whey",
    calories: 140,
    protein_g: 24,
    carbs_g: 4,
    fat_g: 1.5,
  },
  {
    id: 903,
    date: "2026-06-01",
    eaten_at: "13:00",
    food_name: "Chicken rice bowl",
    serving: "200g chicken thigh, 1.5 cup rice, salsa, avocado",
    calories: 720,
    protein_g: 52,
    carbs_g: 78,
    fat_g: 18,
    notes: "Pre-workout meal",
    photo_url: chickenRicePhoto,
    source: "ai_photo",
  },
  {
    id: 904,
    date: "2026-06-01",
    eaten_at: "17:45",
    food_name: "Banana",
    serving: "1 large",
    calories: 121,
    protein_g: 1.5,
    carbs_g: 31,
    fat_g: 0.4,
    notes: "Post-workout snack",
  },
];

export const food_totals_today = {
  calories: 1261,
  protein_g: 99.5,
  carbs_g: 151,
  fat_g: 23.9,
  entries: 4,
};

export const recent_food_days = [
  { date: "2026-05-31", entries: 6, calories: 2410, protein_g: 178 },
  { date: "2026-05-30", entries: 5, calories: 2180, protein_g: 165 },
  { date: "2026-05-29", entries: 7, calories: 2520, protein_g: 192 },
  { date: "2026-05-28", entries: 5, calories: 2050, protein_g: 158 },
];

export const calories_last_7_days = [
  { day: "Tue", value: 2180 },
  { day: "Wed", value: 2310 },
  { day: "Thu", value: 2520 },
  { day: "Fri", value: 2050 },
  { day: "Sat", value: 2410 },
  { day: "Sun", value: 2240 },
  { day: "Mon", value: 1261 },
];

export interface ExercisePoint {
  date: string;
  top_weight: number;
  top_reps: number;
}

export const exercise_history: Record<string, ExercisePoint[]> = {
  "Back Squat": [
    { date: "2026-03-09", top_weight: 117.5, top_reps: 5 },
    { date: "2026-03-16", top_weight: 120, top_reps: 5 },
    { date: "2026-03-23", top_weight: 122.5, top_reps: 5 },
    { date: "2026-03-30", top_weight: 125, top_reps: 5 },
    { date: "2026-04-06", top_weight: 122.5, top_reps: 6 },
    { date: "2026-04-13", top_weight: 127.5, top_reps: 5 },
    { date: "2026-04-20", top_weight: 130, top_reps: 5 },
    { date: "2026-04-27", top_weight: 130, top_reps: 5 },
    { date: "2026-05-04", top_weight: 132.5, top_reps: 4 },
    { date: "2026-05-11", top_weight: 135, top_reps: 4 },
    { date: "2026-05-18", top_weight: 130, top_reps: 5 },
    { date: "2026-05-25", top_weight: 130, top_reps: 5 },
  ],
  "Bench Press": [
    { date: "2026-03-10", top_weight: 85, top_reps: 5 },
    { date: "2026-03-17", top_weight: 87.5, top_reps: 5 },
    { date: "2026-03-24", top_weight: 87.5, top_reps: 5 },
    { date: "2026-03-31", top_weight: 90, top_reps: 5 },
    { date: "2026-04-07", top_weight: 90, top_reps: 6 },
    { date: "2026-04-14", top_weight: 92.5, top_reps: 5 },
    { date: "2026-04-21", top_weight: 92.5, top_reps: 5 },
    { date: "2026-04-28", top_weight: 95, top_reps: 4 },
    { date: "2026-05-05", top_weight: 92.5, top_reps: 5 },
    { date: "2026-05-12", top_weight: 95, top_reps: 5 },
    { date: "2026-05-19", top_weight: 92.5, top_reps: 5 },
    { date: "2026-05-26", top_weight: 92.5, top_reps: 5 },
  ],
  Deadlift: [
    { date: "2026-03-12", top_weight: 160, top_reps: 5 },
    { date: "2026-03-19", top_weight: 162.5, top_reps: 5 },
    { date: "2026-03-26", top_weight: 165, top_reps: 5 },
    { date: "2026-04-02", top_weight: 165, top_reps: 5 },
    { date: "2026-04-09", top_weight: 170, top_reps: 5 },
    { date: "2026-04-16", top_weight: 170, top_reps: 4 },
    { date: "2026-04-23", top_weight: 172.5, top_reps: 5 },
    { date: "2026-04-30", top_weight: 175, top_reps: 4 },
    { date: "2026-05-07", top_weight: 172.5, top_reps: 5 },
    { date: "2026-05-14", top_weight: 175, top_reps: 5 },
    { date: "2026-05-21", top_weight: 177.5, top_reps: 4 },
    { date: "2026-05-29", top_weight: 175, top_reps: 5 },
  ],
  "Overhead Press": [
    { date: "2026-03-10", top_weight: 55, top_reps: 5 },
    { date: "2026-03-17", top_weight: 55, top_reps: 6 },
    { date: "2026-03-24", top_weight: 57.5, top_reps: 5 },
    { date: "2026-03-31", top_weight: 57.5, top_reps: 6 },
    { date: "2026-04-07", top_weight: 60, top_reps: 5 },
    { date: "2026-04-14", top_weight: 60, top_reps: 6 },
    { date: "2026-04-21", top_weight: 62.5, top_reps: 5 },
    { date: "2026-04-28", top_weight: 60, top_reps: 6 },
    { date: "2026-05-05", top_weight: 62.5, top_reps: 6 },
    { date: "2026-05-12", top_weight: 62.5, top_reps: 6 },
    { date: "2026-05-19", top_weight: 65, top_reps: 5 },
    { date: "2026-05-26", top_weight: 62.5, top_reps: 6 },
  ],
  "Romanian Deadlift": [
    { date: "2026-03-09", top_weight: 95, top_reps: 8 },
    { date: "2026-03-16", top_weight: 100, top_reps: 8 },
    { date: "2026-03-23", top_weight: 100, top_reps: 8 },
    { date: "2026-03-30", top_weight: 105, top_reps: 8 },
    { date: "2026-04-13", top_weight: 105, top_reps: 8 },
    { date: "2026-04-20", top_weight: 110, top_reps: 7 },
    { date: "2026-04-27", top_weight: 110, top_reps: 8 },
    { date: "2026-05-04", top_weight: 112.5, top_reps: 7 },
    { date: "2026-05-11", top_weight: 110, top_reps: 8 },
    { date: "2026-05-18", top_weight: 110, top_reps: 8 },
    { date: "2026-05-25", top_weight: 110, top_reps: 8 },
  ],
  "Weighted Pull-up": [
    { date: "2026-03-12", top_weight: 20, top_reps: 6 },
    { date: "2026-03-19", top_weight: 20, top_reps: 7 },
    { date: "2026-03-26", top_weight: 22.5, top_reps: 6 },
    { date: "2026-04-02", top_weight: 22.5, top_reps: 7 },
    { date: "2026-04-09", top_weight: 25, top_reps: 6 },
    { date: "2026-04-16", top_weight: 25, top_reps: 6 },
    { date: "2026-04-23", top_weight: 27.5, top_reps: 5 },
    { date: "2026-04-30", top_weight: 25, top_reps: 7 },
    { date: "2026-05-07", top_weight: 27.5, top_reps: 6 },
    { date: "2026-05-14", top_weight: 30, top_reps: 5 },
    { date: "2026-05-21", top_weight: 27.5, top_reps: 6 },
    { date: "2026-05-28", top_weight: 30, top_reps: 6 },
  ],
};

export const latest_weight: WeightEntry = {
  date: "2026-06-01",
  weight_kg: 82.3,
  resting_hr: 54,
  sleep_h: 7.5,
};

export const weight_history: WeightEntry[] = [
  { date: "2026-06-01", weight_kg: 82.3, resting_hr: 54, sleep_h: 7.5 },
  { date: "2026-05-30", weight_kg: 82.5, resting_hr: 55, sleep_h: 8.0 },
  { date: "2026-05-28", weight_kg: 82.7, resting_hr: 56, sleep_h: 6.5 },
  { date: "2026-05-26", weight_kg: 82.4, resting_hr: 54, sleep_h: 7.0 },
  { date: "2026-05-24", weight_kg: 82.9, resting_hr: 57, sleep_h: 7.2 },
];

export const goals: Goals = {
  lifting_min_week: 240,
  running_min_week: 90,
  running_km_week: 18,
  calories_day: 2400,
  protein_g_day: 180,
  carbs_g_day: 280,
  fat_g_day: 70,
};

export const week_summary = {
  lifting_min: 286,
  run_min: 64,
  run_km: 13.2,
  avg_calories: 2304,
  avg_protein: 172,
  avg_carbs: 264,
  avg_fat: 67,
  workouts: 4,
};

export const runs_recent: Run[] = [
  { id: 201, date: "2026-05-31", duration_min: 34, distance_km: 6.8, notes: "Easy zone 2" },
  { id: 202, date: "2026-05-28", duration_min: 30, distance_km: 6.4, notes: "Tempo intervals" },
];

export const all_phases: Phase[] = [
  { name: "Foundation", tagline: "Find groove, dial movement", focus: "RPE 6-7, build the habit", pct: 100, week: 4, duration_weeks: 4 },
  { name: "Build", tagline: "Heavier loads, tighter focus", focus: "Add 2.5 kg/wk on the big three", pct: 47, week: 6, duration_weeks: 12 },
  { name: "Deload", tagline: "Recover, then ramp", focus: "Drop volume 40%, keep intensity", pct: 0, week: 0, duration_weeks: 1 },
  { name: "Intensify", tagline: "Peak the big three", focus: "Singles and doubles at RPE 9", pct: 0, week: 0, duration_weeks: 3 },
  { name: "Reveal", tagline: "Test the new ceiling", focus: "Open meet sim, top sets", pct: 0, week: 0, duration_weeks: 1 },
];

export const ai_enabled = true;
