import Bull, { Job } from "bull";
import { LogData } from "./types";
import axios from "axios";
const messageQueue = new Bull("message", "redis://localhost:6379");

const processFromQueue = async (job: Job) => {
    const logData: LogData = job.data;
    let res = null;
    try {
        res = await axios.post(`http://localhost:9200/logs/_doc/`, logData);
    } catch (error) {
        console.log(error);
    }
};


messageQueue.process(processFromQueue);
