import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { requireSession } from '@/lib/session';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await requireSession(req, res);
  if (!session) return;

  const userId = session.user!.id;

  if (req.method === 'GET') {
    const habits = await prisma.habit.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } });
    res.json(habits);
    return;
  }

  if (req.method === 'POST') {
    const { title, description, frequency, targetTime } = req.body;
    if (!title || !frequency) {
      res.status(400).json({ error: 'Title and frequency are required' });
      return;
    }

    const habit = await prisma.habit.create({
      data: { title, description, frequency, targetTime, userId }
    });
    res.status(201).json(habit);
    return;
  }

  res.status(405).json({ error: 'Method not allowed' });
}
