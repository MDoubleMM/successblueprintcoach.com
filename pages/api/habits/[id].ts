import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { requireSession } from '@/lib/session';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await requireSession(req, res);
  if (!session) return;

  const userId = session.user!.id;
  const id = Number(req.query.id);

  if (Number.isNaN(id)) {
    res.status(400).json({ error: 'Invalid id' });
    return;
  }

  if (req.method === 'PUT') {
    const { title, description, frequency, targetTime } = req.body;
    const updated = await prisma.habit.updateMany({
      where: { id, userId },
      data: { title, description, frequency, targetTime }
    });
    if (updated.count === 0) {
      res.status(404).json({ error: 'Habit not found' });
      return;
    }
    const habit = await prisma.habit.findUnique({ where: { id } });
    res.json(habit);
    return;
  }

  if (req.method === 'DELETE') {
    const deleted = await prisma.habit.deleteMany({ where: { id, userId } });
    if (deleted.count === 0) {
      res.status(404).json({ error: 'Habit not found' });
      return;
    }
    res.status(204).end();
    return;
  }

  res.status(405).json({ error: 'Method not allowed' });
}
