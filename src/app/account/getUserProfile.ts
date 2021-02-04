import { getProfile } from '../../services/accountService';
import type { Request, Response, NextFunction } from 'express';

export default async function(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId: string = req.headers.userId as string;
    const response = await getProfile(userId);
    res.send(response);  
  } catch (err) {
    next(err);
  }
}
