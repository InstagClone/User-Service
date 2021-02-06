import Express, { Router } from 'express';
import createUserProfile from '../userProfile/createUserProfile';
import getUserProfile from '../userProfile/getUserProfile';
import updateUserProfile from '../userProfile/updateUserProfile';

const router: Router = Express.Router();

router.get('/profile', getUserProfile);
router.post('/profile', createUserProfile);
router.patch('/profile', updateUserProfile);

export default router;
