import { Router, json } from "express";
import multer from "multer";

import { 
  addAchievement, updateAchievement, lockUpdateAchievement, lockUpdateAchievementTitle,
  transactionUpdateAchievement, transactionUpdateAchievementTitle, deleteAchievement,
} from "../../../app/achievement";

const upload = multer({ dest: "uploads/" });

const router = Router();

router.post("/create", upload.single("image"), addAchievement);
router.put("/:achievement_id/update", json(), updateAchievement);
router.delete("/:achievement_id/delete", json(), deleteAchievement);

router.put("/:achievement_id/lock_update", json(), lockUpdateAchievement);
router.put("/:achievement_id/lock_update_title", json(), lockUpdateAchievementTitle);
router.put("/:achievement_id/transaction_update", json(), transactionUpdateAchievement);
router.put("/:achievement_id/transaction_update_title", json(), transactionUpdateAchievementTitle);

export default router;