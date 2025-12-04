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
    const { title, description, dueDate, status } = req.body;
    const parsedDate = dueDate ? new Date(dueDate) : undefined;
    const updated = await prisma.task.updateMany({
      where: { id, userId },
      data: { title, description, dueDate: parsedDate, status }
    });
    if (updated.count === 0) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }
    const task = await prisma.task.findUnique({ where: { id } });
    res.json(task);
    return;
  }

  if (req.method === 'DELETE') {
    const deleted = await prisma.task.deleteMany({ where: { id, userId } });
    if (deleted.count === 0) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }
    res.status(204).end();
    return;
  }

  res.status(405).json({ error: 'Method not allowed' });
}
