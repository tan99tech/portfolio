import express from 'express';
import achievement_router from './achievement';

const router = express.Router();

// Nested route to achievement
router.use('/achievement', achievement_router);

export default router;
