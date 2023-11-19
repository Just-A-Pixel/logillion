"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bull_1 = __importDefault(require("bull"));
const axios_1 = __importDefault(require("axios"));
const messageQueue = new bull_1.default("message", "redis://localhost:6379");
const processFromQueue = async (job) => {
    const logData = job.data;
    let res = null;
    try {
        res = await axios_1.default.post(`http://localhost:9200/logs/_doc/`, logData);
    }
    catch (error) {
        console.log(error);
    }
};
messageQueue.process(processFromQueue);
