import { createProfile } from '../../services/userProfileService';
import type { Request, Response, NextFunction } from 'express';

export default async function(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.headers.userid as string;
    const { name, email, dateOfBirth } = req.body;
    const response = await createProfile(userId, name, email, dateOfBirth);
    res.send(response);  
  } catch (err) {
    next(err);
  }
}
