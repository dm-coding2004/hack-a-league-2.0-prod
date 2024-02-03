// src/index.js
import express from "express";
import dotenv from "dotenv";
import { number, z } from "zod";
import cors from "cors";
import fs from "fs";
import { spawn } from "child_process";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 9000;

const schemeUserLogin = z.object({
  name: z.string(),
  email: z.string().email(),
  phoneno: z.number().int().gte(1000000000).lte(9999999999),
  dp: z.string().url().optional(),
});

const botDescriptionSchema = z.object({
  username: z.string(),
  name: z.string(),
  dp: z.string().url(),
  companyname: z.string(),
  category: z.string(),
  questions: z.array(
    z.object({
      question: z.string(),
      answer: z.string(),
    })
  ),
  additional: z.string().url().optional(),
});

const newSchema = z.union([z.number(), z.string()]);
// type newSchemaType = z.infer<typeof newSchema>;

let some = newSchema.parse(10);

if (typeof some === "number") {
  some.toFixed();
}
if (typeof some === "string") {
  some.toLowerCase();
}

app.get("/", (req, res) => {
  res.send("Express + TypeScript Server + Zod. Ok!!");
});

app.post("/user/login", (req, res) => {
  try {
    const data = schemeUserLogin.parse(req.body);
    console.log(data);
    data.dp;
    // has string | undefined

    if (data.dp !== undefined) {
      data.dp;
      // has only string
    }

    res.send("Got it!!");
  } catch (error) {
    console.log(error);
    res.sendStatus(403);
  }
});

app.post("/createbot", (req, res) => {
  try {
    const botDescription = botDescriptionSchema.parse(req.body);
    fs.writeFileSync(
      `./temp_db/${botDescription.username}.json`,
      JSON.stringify(botDescription)
    );
    res.status(201);
    res.send("OK!");
  } catch (error) {
    console.log(error);
    res.status(403);
    res.send(error);
  }
});

app.get("/chatbot/:username/chat", (req, res) => {
  try {
    const userInput = req.query.input?.toString() || "Hi Tell me about your products?";
    console.log(userInput)
    const botDetails = botDescriptionSchema.parse(
      JSON.parse(
        fs.readFileSync(`./temp_db/${req.params.username}.json`, {
          encoding: "utf-8",
        })
      )
    );
    const response = spawn("python3", [
      "./python/custom_bot_qaa_only.py",
      botDetails.name,
      botDetails.dp,
      botDetails.category,
      botDetails.companyname,
      JSON.stringify(botDetails.questions),
      userInput
    ]);
    response.stdout.on("data", (data) => {
      console.log(`stdout: ${data}`);
      res.status(200);
      res.send(data);
    });
    response.stderr.on("data", (data) => {
      console.error(`stderr: ${data}`);
    });

    response.on("close", (code) => {
      console.log(`child process exited with code ${code}`);
    });
  } catch (error) {
    console.log(error);
    res.status(403);
    res.send(error);
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
