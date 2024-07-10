import { Router } from "express";

import { homeController } from '../../app/home';
import { listAchievements, listAchievementsLock } from '../../app/achievement';
const router = Router();

// replace app with router here
// note the path is also shorter
router.get("/", homeController);
router.get("/achievements", listAchievements);
router.get("/achievements_lock", listAchievementsLock);

export default router;