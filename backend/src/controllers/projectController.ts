import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getProjects = async (req: Request, res: Response): Promise<void> => {
  try {
    const projects = await prisma.project.findMany();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching projects' });
  }
};
