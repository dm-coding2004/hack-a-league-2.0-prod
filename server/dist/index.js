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
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const port = process.env.PORT || 3000;
const schemeUserLogin = zod_1.z.object({
    name: zod_1.z.string(),
    email: zod_1.z.string().email(),
    phoneno: zod_1.z.number().int().gte(1000000000).lte(9999999999),
    dp: zod_1.z.string().url().optional(),
});
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server + Zod. Ok!!");
});
app.post("/user/login", (req, res) => {
    try {
        const data = schemeUserLogin.parse(req.body);
        console.log(data);
        res.send("Got it!!");
    }
    catch (error) {
        console.log(error);
        res.sendStatus(403);
    }
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
