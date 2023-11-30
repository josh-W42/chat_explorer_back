"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const models_1 = require("../models");
class DB {
    static Init() {
        return __awaiter(this, void 0, void 0, function* () {
            const username = process.env.PG_USERNAME || "";
            const password = process.env.PG_PASSWORD || "";
            const postgresPort = parseInt(process.env.PG_PORT || "5432");
            const hostname = process.env.PG_HOSTNAME || "";
            const database = process.env.PG_DATABASE || "";
            this.sq = new sequelize_1.Sequelize(database, username, password, {
                host: hostname,
                port: postgresPort,
                dialect: "postgres",
            });
            if (!(yield this.TestConnection())) {
                return;
            }
            for (const createModel of Object.values(models_1.ModelCreationFunctions)) {
                const [name, model] = createModel();
                model.sync();
            }
        });
    }
    static TestConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.sq.authenticate();
                console.log("Connection to Database Successful");
                return true;
            }
            catch (error) {
                console.error("Unable to connect to database:", error);
                return false;
            }
        });
    }
}
exports.default = DB;
