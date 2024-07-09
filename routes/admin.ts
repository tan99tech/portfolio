import { Router, Request, Response, NextFunction, json } from "express";
import Achievement from "../models/achievement";
import multer from "multer";
import fs from "fs";
import RedisSeqLock from "../utils/redisSeqLock";
import redisClient from "../utils/redis";
import sequelize from "../models/sequelize";

const upload = multer({ dest: "uploads/" });

const router = Router();

const add_achievement = async (req: Request, res: Response, next: NextFunction) => {
  const title = req.body.title;
  const description = req.body.description;
  const achievedDate = req.body.achievedDate;

  const file = req.file;
  const achievement = await Achievement.create({ title, description, achievedDate, imagePath: file?.path });

  res.send(achievement);
};

const update_achievement = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.achievement_id);
  const achievement = await Achievement.findByPk(id);


  await achievement?.update({
    title: req.body.title as string,
    description: req.body.description as string,
  });

  res.send(achievement);
};

const delete_achievement = async (req: Request, res: Response, next: NextFunction) => {
  const id: number = parseInt(req.params.achievement_id);
  const achievement = await Achievement.findByPk(id);
  const path = achievement?.imagePath;
  if (path) {
    const filePath = `./${path}`;
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Error deleting the file: ${err.message}`);
      }
    });
  }
  await achievement?.destroy();
  res.send(`delete successful ID: ${id}`);
};

const transaction_update_achievement = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.achievement_id);

  let transaction;
  try {
    // Start a transaction
    transaction = await sequelize.transaction();

    // Find the achievement within the transaction
    const achievement = await Achievement.findByPk(id, { transaction });

    // Update the achievement attributes
    await achievement?.update({
      title: req.body.title,
      description: req.body.description,
    }, { transaction });

    // If everything succeeds, commit the transaction
    await transaction.commit();

    res.send(achievement); // Send the updated achievement back in the response
  } catch (error) {
    // If any error occurs, rollback the transaction
    if (transaction) await transaction.rollback();

    console.error('Transaction failed:', error);
    res.status(500).send('Transaction failed');
  }
};

const lock_update_achievement = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.achievement_id);
  const redisSeqLock = new RedisSeqLock(redisClient);

  const updated_achievement = await redisSeqLock.write(
    async () => {
      let achievement = await Achievement.findByPk(id);
      if (achievement !== null) {
        return await achievement.update({
          title: req.body.title as string,
          description: req.body.description as string,
        });
      } else {
        return {};
      }
    }
  );

  res.send(updated_achievement);
}

router.post("/achievement/create", upload.single("image"), add_achievement);
router.put("/achievement/:achievement_id/update", json(), update_achievement);
router.put("/achievement/:achievement_id/lock_update", json(), lock_update_achievement);
router.put("/achievement/:achievement_id/transaction_update", json(), transaction_update_achievement);
router.delete("/achievement/:achievement_id/delete", json(), delete_achievement);

export default router;