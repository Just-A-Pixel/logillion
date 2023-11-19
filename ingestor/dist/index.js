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
const bull_1 = __importDefault(require("bull"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const port = 3000;
const messageQueue = new bull_1.default("message", "redis://localhost:6379");
const addToQueue = (logData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield messageQueue.add(Object.assign({}, logData), { removeOnComplete: true });
    }
    catch (error) {
        console.log(error);
        throw new Error("Could not add to queue");
    }
});
app.get("/", (_req, res) => {
    res.send("Test success");
});
app.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const logData = req.body;
    try {
        yield addToQueue(logData);
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Could not add to queue");
    }
    res.send("Success");
}));
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
