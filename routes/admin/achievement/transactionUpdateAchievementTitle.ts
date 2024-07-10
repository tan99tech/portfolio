import { Request, Response, NextFunction } from "express";
import { Achievement, sequelize } from "../../../models";

const transactionUpdateAchievementTitle = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.achievement_id);
  let transaction;
  try {
    // Start a transaction
    transaction = await sequelize.transaction();

    const achievement = await Achievement.findByPk(id, { transaction });
    await achievement?.update({
      title: `${achievement.title}a`,
    }, { transaction });

    // If everything succeeds, commit the transaction
    await transaction.commit();
    res.send(achievement);
  } catch (error) {
    // If any error occurs, rollback the transaction
    if (transaction) await transaction.rollback();
    console.error('Transaction failed:', error);
    res.status(500).send('Transaction failed');
  }
};

export default transactionUpdateAchievementTitle;