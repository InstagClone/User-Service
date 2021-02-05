import Express, { Router } from 'express';
import createAccount from './createAccount';

const router: Router = Express.Router();

router.post('/', createAccount);

export default router;
