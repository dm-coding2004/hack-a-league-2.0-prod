"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.js
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const zod_1 = require("zod");
const cors_1 = __importDefault(require("cors"));
const fs_1 = __importDefault(require("fs"));
const child_process_1 = require("child_process");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/static", express_1.default.static("public"));
const port = process.env.PORT || 9000;
const schemeUserLogin = zod_1.z.object({
    name: zod_1.z.string(),
    email: zod_1.z.string().email(),
    phoneno: zod_1.z.number().int().gte(1000000000).lte(9999999999),
    dp: zod_1.z.string().url().optional(),
});
const botDescriptionSchema = zod_1.z.object({
    username: zod_1.z.string(),
    name: zod_1.z.string(),
    dp: zod_1.z.string().url(),
    companyname: zod_1.z.string(),
    category: zod_1.z.string(),
    questions: zod_1.z.array(zod_1.z.object({
        question: zod_1.z.string(),
        answer: zod_1.z.string(),
    })),
    additional: zod_1.z.string().url().optional(),
});
const newSchema = zod_1.z.union([zod_1.z.number(), zod_1.z.string()]);
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
    }
    catch (error) {
        console.log(error);
        res.sendStatus(403);
    }
});
app.post("/createbot", (req, res) => {
    try {
        const botDescription = botDescriptionSchema.parse(req.body);
        fs_1.default.writeFileSync(`./temp_db/${botDescription.username}_${botDescription.name}.json`, JSON.stringify(botDescription));
        let scriptData = fs_1.default.readFileSync("./script-tag-gen/script.js", {
            encoding: "utf-8",
        });
        // http://localhost:9000/chatbot/Vilas/Mario/chat?input="Tell me about what shoe I can buy"
        scriptData = scriptData.replace("{{{$4}}}", `http://localhost:9000/chatbot/${botDescription.username}/${botDescription.name}/chat`);
        fs_1.default.writeFileSync(`./public/${botDescription.username}_${botDescription.name}_script.js`, scriptData);
        res.status(201);
        res.send({
            script: `
    <script defer async src="https://3320-223-30-20-253.ngrok-free.app/static/${botDescription.username}_${botDescription.name}_script.js"></script>`,
            page: `http://localhost:3003/chatbot/${botDescription.username}/${botDescription.name}`,
        });
    }
    catch (error) {
        console.log(error);
        res.status(403);
        res.send(error);
    }
});
app.get("/chatbot/:username/:botname/chat", (req, res) => {
    try {
        const userInput = req.query.input?.toString() || "Hi Tell me about your products?";
        console.log(userInput);
        const botDetails = botDescriptionSchema.parse(JSON.parse(fs_1.default.readFileSync(`./temp_db/${req.params.username}_${req.params.botname}.json`, {
            encoding: "utf-8",
        })));
        const response = (0, child_process_1.spawn)("python3", [
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
    }
    catch (error) {
        console.log(error);
        res.status(403);
        res.send(error);
    }
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
