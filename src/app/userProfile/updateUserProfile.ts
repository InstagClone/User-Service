import { updateProfile } from '../../services/userProfileService';
import type { Request, Response, NextFunction } from 'express';

export default async function(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.headers.userid as string;
    const payload = req.body;
    const response = await updateProfile({ userId, ...payload });
    res.send(response);  
  } catch (err) {
    next(err);
  }
}
