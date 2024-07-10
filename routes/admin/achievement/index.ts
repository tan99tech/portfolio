import { Router, json } from "express";
import multer from "multer";

import addAchievement from "./addAchievement";
import updateAchievement from "./updateAchievement";
import deleteAchievement from "./deleteAchievement";
import transactionUpdateAchievement from "./transactionUpdateAchievement";
import lockUpdateAchievement from "./lockUpdateAchievement";
import transactionUpdateAchievementTitle from './transactionUpdateAchievementTitle';
import lockUpdateAchievementTitle from './lockUpdateAchievementTitle';

const upload = multer({ dest: "uploads/" });

const router = Router();

router.post("/create", upload.single("image"), addAchievement);
router.put("/:achievement_id/update", json(), updateAchievement);
router.put("/:achievement_id/lock_update", json(), lockUpdateAchievement);
router.put("/:achievement_id/lock_update_title", json(), lockUpdateAchievementTitle);
router.put("/:achievement_id/transaction_update", json(), transactionUpdateAchievement);
router.put("/:achievement_id/transaction_update_title", json(), transactionUpdateAchievementTitle);
router.delete("/:achievement_id/delete", json(), deleteAchievement);

export default router;