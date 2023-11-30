"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMessageModel = void 0;
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../../database/db"));
const CreateMessageModel = () => {
    const model = db_1.default.sq.define("Message" /* ModelNames.Message */, {
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        content: sequelize_1.DataTypes.STRING,
    }, {
        // Marking messages for soft-deletion
        paranoid: true,
    });
    return ["Message" /* ModelNames.Message */, model];
};
exports.CreateMessageModel = CreateMessageModel;
