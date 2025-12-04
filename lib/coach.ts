import { DailyState } from '@prisma/client';

export function coachMessage(state: DailyState | null, completedHabits: number, totalHabits: number, completedTasks: number, totalTasks: number) {
  if (!state) {
    return 'Share a quick check-in to get a tailored tip for today.';
  }

  if (state.sleepHours < 6 && totalTasks - completedTasks > 3) {
    return 'Low sleep today. Focus on 1–2 essential tasks and keep it light.';
  }

  if (totalHabits > 0 && completedHabits / totalHabits >= 0.8) {
    return "Great discipline today. You're building real momentum!";
  }

  if (state.mood <= 2 && state.stress >= 4) {
    return 'Tough day. A short walk or breathing exercise can help reset.';
  }

  if (state.energy >= 4 && completedTasks < totalTasks) {
    return 'Energy is high. Knock out a task you have been postponing.';
  }

  return 'Keep stacking small wins today—consistency beats intensity.';
}
