import { Sequelize } from "sequelize";

const schema = "tutorial_sequelize";
const username = "root";
const password = "";

const sequelize = new Sequelize(schema, username, password, {
  host: "localhost",
  dialect: "mysql",
});
sequelize.authenticate()
  .then(() => console.log(`connect datasource success`))
  .catch((e: any) => console.log(`datasource failed`, e));

export default sequelize;