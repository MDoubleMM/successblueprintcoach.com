import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { requireSession } from '@/lib/session';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await requireSession(req, res);
  if (!session) return;

  const userId = session.user!.id;

  if (req.method === 'GET') {
    const tasks = await prisma.task.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } });
    res.json(tasks);
    return;
  }

  if (req.method === 'POST') {
    const { title, description, dueDate, status } = req.body;
    if (!title) {
      res.status(400).json({ error: 'Title is required' });
      return;
    }

    const parsedDate = dueDate ? new Date(dueDate) : null;
    const task = await prisma.task.create({
      data: {
        title,
        description,
        dueDate: parsedDate || undefined,
        status: status || 'todo',
        userId
      }
    });
    res.status(201).json(task);
    return;
  }

  res.status(405).json({ error: 'Method not allowed' });
}
