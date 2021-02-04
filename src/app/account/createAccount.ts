import { createAccount } from '../../services/accountService';
import type { Request, Response, NextFunction } from 'express';

export default async function(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { username, password } = req.body;
    const response = await createAccount(username, password);
    res.send(response);  
  } catch (err) {
    next(err);
  }
}
