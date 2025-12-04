import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { useState, FormEvent } from 'react';
import Layout from '@/components/Layout';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import { coachMessage } from '@/lib/coach';
import { DailyState, Habit, Task } from '@prisma/client';

type TaskWithStringDate = Task & { dueDate: string | null };
type HabitWithMeta = Habit & { createdAt: string };
type DailyStateSerializable = DailyState & { date: string; createdAt: string };

const apiBase = process.env.NEXT_PUBLIC_BASE_PATH || '';

interface DashboardProps {
  habits: HabitWithMeta[];
  tasks: TaskWithStringDate[];
  dailyState: DailyStateSerializable | null;
  habitCheckins: number[];
  taskCheckins: number[];
}

export default function Dashboard({ habits: initialHabits, tasks: initialTasks, dailyState: initialState, habitCheckins, taskCheckins }: DashboardProps) {
  const [habits, setHabits] = useState<HabitWithMeta[]>(initialHabits);
  const [tasks, setTasks] = useState<TaskWithStringDate[]>(initialTasks);
  const [dailyState, setDailyState] = useState<DailyStateSerializable | null>(initialState);
  const [habitDoneIds, setHabitDoneIds] = useState(new Set(habitCheckins));
  const [taskDoneIds, setTaskDoneIds] = useState(new Set(taskCheckins));

  const [habitForm, setHabitForm] = useState({ title: '', frequency: 'daily', targetTime: '' });
  const [taskForm, setTaskForm] = useState({ title: '', dueDate: '' });

  const handleHabitCreate = async () => {
    if (!habitForm.title) return;
    const res = await fetch(`${apiBase}/api/habits`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(habitForm) });
    if (res.ok) {
      const newHabit = await res.json();
      setHabits([newHabit, ...habits]);
      setHabitForm({ title: '', frequency: 'daily', targetTime: '' });
    }
  };

  const handleTaskCreate = async () => {
    if (!taskForm.title) return;
    const res = await fetch(`${apiBase}/api/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...taskForm, dueDate: taskForm.dueDate || null })
    });
    if (res.ok) {
      const newTask = await res.json();
      setTasks([newTask, ...tasks]);
      setTaskForm({ title: '', dueDate: '' });
    }
  };

  const handleHabitDone = async (id: number) => {
    const res = await fetch(`${apiBase}/api/checkins/habit`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ habitId: id }) });
    if (res.ok) {
      setHabitDoneIds(new Set([...habitDoneIds, id]));
    }
  };

  const handleTaskDone = async (id: number) => {
    const res = await fetch(`${apiBase}/api/checkins/task`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ taskId: id }) });
    if (res.ok) {
      setTaskDoneIds(new Set([...taskDoneIds, id]));
      setTasks(tasks.map((t) => (t.id === id ? { ...t, status: 'done' } : t)));
    }
  };

  const handleDailyStateSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());
    const res = await fetch(`${apiBase}/api/daily-state`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    if (res.ok) {
      const data = await res.json();
      setDailyState(data);
    }
  };

  const today = new Date();
  const isDueToday = (task: Task) => !task.dueDate || new Date(task.dueDate).toDateString() === today.toDateString();
  const tasksForToday = tasks.filter(isDueToday);
  const completedHabits = habitDoneIds.size;
  const completedTasks = tasksForToday.filter((t) => t.status === 'done' || taskDoneIds.has(t.id)).length;
  const summaryMessage = coachMessage(dailyState, completedHabits, habits.length, completedTasks, tasksForToday.length);

  return (
    <Layout>
      <div className="card space-y-4">
        <h2 className="text-lg font-bold text-slate-900">Daily Check-in</h2>
        {dailyState ? (
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="rounded-md bg-slate-100 p-2">
              <p className="font-semibold">Mood</p>
              <p>{dailyState.mood}/5</p>
            </div>
            <div className="rounded-md bg-slate-100 p-2">
              <p className="font-semibold">Energy</p>
              <p>{dailyState.energy}/5</p>
            </div>
            <div className="rounded-md bg-slate-100 p-2">
              <p className="font-semibold">Stress</p>
              <p>{dailyState.stress}/5</p>
            </div>
            <div className="rounded-md bg-slate-100 p-2">
              <p className="font-semibold">Sleep</p>
              <p>{dailyState.sleepHours} hrs</p>
            </div>
            {dailyState.notes && (
              <div className="col-span-2 rounded-md bg-slate-100 p-2">
                <p className="font-semibold">Notes</p>
                <p className="text-slate-700">{dailyState.notes}</p>
              </div>
            )}
          </div>
        ) : (
          <form className="grid grid-cols-1 gap-3" onSubmit={handleDailyStateSubmit}>
            <div className="grid grid-cols-2 gap-2">
              {['mood', 'energy', 'stress'].map((field) => (
                <label key={field} className="flex flex-col text-sm font-medium text-slate-700">
                  {field.charAt(0).toUpperCase() + field.slice(1)} (1-5)
                  <input name={field} type="number" min={1} max={5} required className="rounded-md border border-slate-200 p-2" />
                </label>
              ))}
              <label className="flex flex-col text-sm font-medium text-slate-700">
                Sleep Hours
                <input name="sleepHours" type="number" step="0.1" min={0} required className="rounded-md border border-slate-200 p-2" />
              </label>
            </div>
            <label className="flex flex-col text-sm font-medium text-slate-700">
              Notes (optional)
              <textarea name="notes" className="rounded-md border border-slate-200 p-2" rows={3} />
            </label>
            <button type="submit" className="button-primary w-full">Save check-in</button>
          </form>
        )}
      </div>

      <div className="card space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">Habits</h2>
        </div>
        <div className="space-y-3">
          <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
            <input
              type="text"
              placeholder="Habit title"
              className="rounded-md border border-slate-200 p-2"
              value={habitForm.title}
              onChange={(e) => setHabitForm({ ...habitForm, title: e.target.value })}
            />
            <select
              className="rounded-md border border-slate-200 p-2"
              value={habitForm.frequency}
              onChange={(e) => setHabitForm({ ...habitForm, frequency: e.target.value })}
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="custom">Custom</option>
            </select>
            <input
              type="text"
              placeholder="Target time (optional)"
              className="rounded-md border border-slate-200 p-2"
              value={habitForm.targetTime}
              onChange={(e) => setHabitForm({ ...habitForm, targetTime: e.target.value })}
            />
            <button type="button" className="button-primary md:col-span-3" onClick={handleHabitCreate}>
              Add habit
            </button>
          </div>
          <div className="space-y-2">
            {habits.map((habit) => {
              const done = habitDoneIds.has(habit.id);
              return (
                <div key={habit.id} className="flex flex-col gap-2 rounded-md border border-slate-200 p-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-semibold text-slate-900">{habit.title}</p>
                    {habit.targetTime && <p className="text-sm text-slate-600">Target: {habit.targetTime}</p>}
                  </div>
                  <button
                    onClick={() => handleHabitDone(habit.id)}
                    className={`button-primary w-full md:w-auto ${done ? 'opacity-60' : ''}`}
                    disabled={done}
                  >
                    {done ? 'Completed ✓' : 'Done today'}
                  </button>
                </div>
              );
            })}
            {habits.length === 0 && <p className="text-sm text-slate-600">No habits yet. Add one to get started.</p>}
          </div>
        </div>
      </div>

      <div className="card space-y-4">
        <h2 className="text-lg font-bold text-slate-900">Tasks</h2>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
          <input
            type="text"
            placeholder="Task title"
            className="rounded-md border border-slate-200 p-2"
            value={taskForm.title}
            onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
          />
          <input
            type="date"
            className="rounded-md border border-slate-200 p-2"
            value={taskForm.dueDate}
            onChange={(e) => setTaskForm({ ...taskForm, dueDate: e.target.value })}
          />
          <button type="button" className="button-primary md:col-span-1" onClick={handleTaskCreate}>
            Add task
          </button>
        </div>
        <div className="space-y-2">
          {tasksForToday.map((task) => {
            const done = task.status === 'done' || taskDoneIds.has(task.id);
            return (
              <div key={task.id} className="flex flex-col gap-2 rounded-md border border-slate-200 p-3 md:flex-row md:items-center md:justify-between">
                <div className="space-y-1">
                  <p className="font-semibold text-slate-900">{task.title}</p>
                  <span
                    className={`inline-flex w-fit rounded-full px-2 py-1 text-xs font-semibold ${
                      done ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {done ? 'Done' : task.status.replace('_', ' ')}
                  </span>
                </div>
                <button
                  onClick={() => handleTaskDone(task.id)}
                  className={`button-primary w-full md:w-auto ${done ? 'opacity-60' : ''}`}
                  disabled={done}
                >
                  {done ? 'Completed ✓' : 'Mark as done'}
                </button>
              </div>
            );
          })}
          {tasksForToday.length === 0 && <p className="text-sm text-slate-600">No tasks due today. Add a quick one.</p>}
        </div>
      </div>

      <div className="card space-y-2">
        <h2 className="text-lg font-bold text-slate-900">Daily Summary</h2>
        <p className="text-sm text-slate-700">Habits: {completedHabits} / {habits.length}</p>
        <p className="text-sm text-slate-700">Tasks: {completedTasks} / {tasksForToday.length}</p>
      </div>

      <div className="card border-l-4 border-blue-600 bg-blue-50">
        <h2 className="text-lg font-bold text-blue-700">Coach Message</h2>
        <p className="text-slate-800">{summaryMessage}</p>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<DashboardProps> = async (ctx) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  if (!session?.user?.id) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    };
  }

  const userId = session.user.id;
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date();
  end.setHours(23, 59, 59, 999);

  const [habits, tasks, dailyState, habitCheckins, taskCheckins] = await Promise.all([
    prisma.habit.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } }),
    prisma.task.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } }),
    prisma.dailyState.findFirst({ where: { userId, date: { gte: start, lte: end } }, orderBy: { date: 'desc' } }),
    prisma.checkin.findMany({ where: { userId, habitId: { not: null }, date: { gte: start, lte: end }, status: 'done' } }),
    prisma.checkin.findMany({ where: { userId, taskId: { not: null }, date: { gte: start, lte: end }, status: 'done' } })
  ]);

  return {
    props: {
      habits: habits.map((h) => ({ ...h, createdAt: h.createdAt.toISOString() })),
      tasks: tasks.map((t) => ({ ...t, dueDate: t.dueDate ? t.dueDate.toISOString().split('T')[0] : null })),
      dailyState: dailyState
        ? { ...dailyState, date: dailyState.date.toISOString(), createdAt: dailyState.createdAt.toISOString() }
        : null,
      habitCheckins: habitCheckins.map((c) => c.habitId!).filter(Boolean),
      taskCheckins: taskCheckins.map((c) => c.taskId!).filter(Boolean)
    }
  };
};
