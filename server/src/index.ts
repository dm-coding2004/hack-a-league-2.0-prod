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
app.use("/static", express.static("public"));

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
      `./temp_db/${botDescription.username}_${botDescription.name}.json`,
      JSON.stringify(botDescription)
    );
    let scriptData = fs.readFileSync("./script-tag-gen/script.js", {
      encoding: "utf-8",
    });
    // http://localhost:9000/chatbot/Vilas/Mario/chat?input="Tell me about what shoe I can buy"
    scriptData = scriptData.replace(
      "{{{$4}}}",
      `http://localhost:9000/chatbot/${botDescription.username}/${botDescription.name}/chat`
    );
    fs.writeFileSync(
      `./public/${botDescription.username}_${botDescription.name}_script.js`,
      scriptData
    );
    res.status(201);
    res.send({
      script: `
    <script defer async src="https://c8af-223-30-20-253.ngrok-free.app/static/${botDescription.username}_${botDescription.name}_script.js"></script>`,
      page: `http://localhost:3003/chatbot/${botDescription.username}/${botDescription.name}`,
    });
  } catch (error) {
    console.log(error);
    res.status(403);
    res.send(error);
  }
});

app.get("/chatbot/:username/:botname/chat", (req, res) => {
  try {
    const userInput =
      req.query.input?.toString() || "Hi Tell me about your products?";
    console.log(userInput);
    const botDetails = botDescriptionSchema.parse(
      JSON.parse(
        fs.readFileSync(
          `./temp_db/${req.params.username}_${req.params.botname}.json`,
          {
            encoding: "utf-8",
          }
        )
      )
    );
    const response = spawn("python3", [
      "./python/custom_bot_qaa_only.py",
      botDetails.name,
      botDetails.dp,
      botDetails.category,
      botDetails.companyname,
      JSON.stringify(botDetails.questions),
      userInput,
    ]);
    response.stdout.on("data", (data) => {
      console.log(`stdout: ${data}`);
      res.status(200);
      res.send({ data: data.toString() });
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
