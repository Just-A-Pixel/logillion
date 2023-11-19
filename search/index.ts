import express, { Request, Response } from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const port = 4000;
const baseURL = `http://localhost:9200/logs`;

app.get("/", (req, res) => {
    res.send("Works");
});

app.post("/filterSearch", async (req: Request, res: Response) => {
    let searchResults = null;
    console.log(req.body.queryFilters);
    const query = {
        query: {
            bool: {
                filter: req.body.queryFilters,
            },
        },
    };

    console.log(query);
    try {
        searchResults = await axios.post(`${baseURL}/_search`, query);
    } catch (error) {
        console.log(error);
        res.send(error);
        return;
    }
    res.json(searchResults.data);
});

app.post("/fullTextSearch", async (req: Request, res: Response) => {
    console.log(req.body);
    let searchResults = null;
    const query = {
        query: {
            multi_match: {
                query: req.body.query,
                fields: req.body.fields,
            },
        },
    };
    try {
        searchResults = await axios.post(`${baseURL}/_search`, query);
    } catch (error) {
        console.log(error);
        res.send(error);
        return;
    }
    res.json(searchResults.data);
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
