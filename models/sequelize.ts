import { Sequelize } from "sequelize";

const database = "tutorial_sequelize";
const username = "tantruongtd";
const password = "";

const sequelize = new Sequelize({
  database, 
  username, 
  password, 
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

sequelize.authenticate()
  .then(() => console.log(`connect datasource success`))
  .catch((e: any) => console.log(`datasource failed`, e));

export {
  sequelize
};