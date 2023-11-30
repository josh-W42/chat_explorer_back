import { Sequelize } from "sequelize";
import { ModelCreationFunctions } from "../models";

export default class DB {
  public static sq: Sequelize;

  public static async Init() {
    const username = process.env.PG_USERNAME || "";
    const password = process.env.PG_PASSWORD || "";
    const postgresPort = parseInt(process.env.PG_PORT || "5432");
    const hostname = process.env.PG_HOSTNAME || "";
    const database = process.env.PG_DATABASE || "";

    this.sq = new Sequelize(database, username, password, {
      host: hostname,
      port: postgresPort,
      dialect: "postgres",
    });

    if (!(await this.TestConnection())) {
      return;
    }

    for (const createModel of Object.values(ModelCreationFunctions)) {
      const [name, model] = createModel();
      model.sync();
    }
  }

  public static async TestConnection(): Promise<boolean> {
    try {
      await this.sq.authenticate();
      console.log("Connection to Database Successful");
      return true;
    } catch (error) {
      console.error("Unable to connect to database:", error);
      return false;
    }
  }
}
