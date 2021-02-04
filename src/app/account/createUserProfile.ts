import { createProfile } from '../../services/accountService';
import type { Request, Response, NextFunction } from 'express';

export default async function(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { userId, name, email, dateOfBirth } = req.body;
    const response = await createProfile(userId, name, email, dateOfBirth);
    res.send(response);  
  } catch (err) {
    next(err);
  }
}
