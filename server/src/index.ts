// src/index.js
import express from "express";
import dotenv from "dotenv";
import { number, z } from "zod";
import cors from "cors";

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
  name: z.string(),
  dp: z.string().url(),
  category: z.string(),
  questions: z.array(z.object({
    question: z.string(),
    answer: z.string(),
  })),
  additional: z.string().url(),
})

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
    
  } catch (error) {
    console.log(error);
    res.status(403);
    res.send(error);
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
