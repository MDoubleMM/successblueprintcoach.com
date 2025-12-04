import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { requireSession } from '@/lib/session';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await requireSession(req, res);
  if (!session) return;

  const userId = session.user!.id;

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { mood, energy, stress, sleepHours, notes } = req.body;
  if ([mood, energy, stress, sleepHours].some((v) => v === undefined)) {
    res.status(400).json({ error: 'All fields except notes are required' });
    return;
  }

  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date();
  end.setHours(23, 59, 59, 999);

  const existing = await prisma.dailyState.findFirst({
    where: { userId, date: { gte: start, lte: end } }
  });

  const state = existing
    ? await prisma.dailyState.update({
        where: { id: existing.id },
        data: { mood: Number(mood), energy: Number(energy), stress: Number(stress), sleepHours: Number(sleepHours), notes }
      })
    : await prisma.dailyState.create({
        data: { userId, date: start, mood: Number(mood), energy: Number(energy), stress: Number(stress), sleepHours: Number(sleepHours), notes }
      });

  res.status(existing ? 200 : 201).json(state);
}
