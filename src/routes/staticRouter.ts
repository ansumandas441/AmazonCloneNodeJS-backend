import { Router } from 'express';

const router = Router();

router.get('/signup', async (req, res) => {
    return res.render('signup');
});


export default router;