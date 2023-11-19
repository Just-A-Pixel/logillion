import express, { Request, Response } from "express";
import Bull, { Job } from "bull";
import { LogData } from "./types";
import cors from "cors";


const app = express();
app.use(express.json());
app.use(cors())

const port = 3000;

const messageQueue = new Bull("message", "redis://localhost:6379");

const addToQueue = async (logData: LogData) => {
    try {
        await messageQueue.add({ ...logData }, { removeOnComplete: true });
    } catch (error) {
        console.log(error);
        throw new Error("Could not add to queue");
    }
};

app.get("/", (_req: Request, res: Response) => {
    res.send("Test success");
});

app.post("/", async (req: Request, res: Response) => {
    const logData: LogData = req.body;
    try {
        await addToQueue(logData);
    } catch (error) {
        console.log(error);
        res.status(500).send("Could not add to queue")
    }
    res.send("Success");
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
