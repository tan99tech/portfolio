import { DataTypes, Model } from "sequelize";
import { sequelize } from "./sequelize";

class Achievement extends Model {
  // we have to declare the members
  // for TypeScript to properly work.
  public id!: number | null;
  public title!: string | null;
	public description!: string | null;
  public achievedDate!: string | null;
  public imagePath!: string | null;
};

Achievement.init({
	id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
	title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: DataTypes.STRING,
	achievedDate: DataTypes.DATE,
  imagePath: DataTypes.STRING,
}, { 
	sequelize, 
	modelName: "achievement",
	freezeTableName: true,
	timestamps: false,
});

export {
  Achievement,
}