import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { requireSession } from '@/lib/session';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await requireSession(req, res);
  if (!session) return;

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const userId = session.user!.id;
  const { taskId } = req.body;
  const id = Number(taskId);
  if (Number.isNaN(id)) {
    res.status(400).json({ error: 'taskId is required' });
    return;
  }

  const task = await prisma.task.findFirst({ where: { id, userId } });
  if (!task) {
    res.status(404).json({ error: 'Task not found' });
    return;
  }

  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date();
  end.setHours(23, 59, 59, 999);

  const existing = await prisma.checkin.findFirst({ where: { userId, taskId: id, date: { gte: start, lte: end } } });
  if (existing) {
    res.json(existing);
    return;
  }

  const checkin = await prisma.$transaction(async (tx) => {
    await tx.task.update({ where: { id }, data: { status: 'done' } });
    return tx.checkin.create({ data: { userId, taskId: id, status: 'done', date: new Date() } });
  });

  res.status(201).json(checkin);
}
