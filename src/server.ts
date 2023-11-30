import express, { Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import { RequestWithBody } from "./v1";
import dotenv from "dotenv";
import DB from "./database/db";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json()); // json parsing.
app.use(morgan("combined")); // Simple Logging
app.use(cors());

const db = DB.Init();

app.get("/api", (req: Request, res: Response) => {
  res.status(200).json({
    response: "Success",
  });
});

app.get("/api/messages", async (req: Request, res: Response) => {
  try {
    const messages = await DB.sq.models.Message.findAll();
    res.status(200).json({
      response: "Success",
      messages,
    });
  } catch (error) {
    res.status(500).json({
      response: "Failure",
      messages: [],
    });
  }
});

app.post("/api/messages", async (req: RequestWithBody, res: Response) => {
  let { content } = req.body;

  if (!content) {
    content = "Error";
  }

  try {
    const newMessage = await DB.sq.models.Message.create({ content });
    res.status(201).json({
      response: "Success",
      message: newMessage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      response: "Failure",
    });
  }
});

app.get("*", (req: Request, res: Response) => {
  res.status(404).json({
    response: "Not Found",
  });
});

app.listen(PORT, () => {
  console.log("Server is running on port: ", PORT);
});
