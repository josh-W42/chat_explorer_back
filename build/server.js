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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./database/db"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5001;
// Middleware
app.use(express_1.default.json()); // json parsing.
app.use((0, morgan_1.default)("combined")); // Simple Logging
app.use((0, cors_1.default)());
const db = db_1.default.Init();
app.get("/api", (req, res) => {
    res.status(200).json({
        response: "Success",
    });
});
app.get("/api/messages", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const messages = yield db_1.default.sq.models.Message.findAll();
        res.status(200).json({
            response: "Success",
            messages,
        });
    }
    catch (error) {
        res.status(500).json({
            response: "Failure",
            messages: [],
        });
    }
}));
app.post("/api/messages", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { content } = req.body;
    if (!content) {
        content = "Error";
    }
    try {
        const newMessage = yield db_1.default.sq.models.Message.create({ content });
        res.status(201).json({
            response: "Success",
            message: newMessage,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            response: "Failure",
        });
    }
}));
app.get("*", (req, res) => {
    res.status(404).json({
        response: "Not Found",
    });
});
app.listen(PORT, () => {
    console.log("Server is running on port: ", PORT);
});
