import Express, { Router } from 'express';
import createAccount from './createAccount';
import createUserProfile from './createUserProfile';
import getUserProfile from './getUserProfile';

const router: Router = Express.Router();

router.post('/', createAccount);
router.post('/user', createUserProfile);
router.get('/user', getUserProfile);

export default router;
