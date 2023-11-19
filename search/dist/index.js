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
const axios_1 = __importDefault(require("axios"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const port = 4000;
const baseURL = `http://localhost:9200/logs`;
app.get("/", (req, res) => {
    res.send("Works");
});
app.post("/filterSearch", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        searchResults = yield axios_1.default.post(`${baseURL}/_search`, query);
    }
    catch (error) {
        console.log(error);
        res.send(error);
        return;
    }
    res.json(searchResults.data);
}));
app.post("/fullTextSearch", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        searchResults = yield axios_1.default.post(`${baseURL}/_search`, query);
    }
    catch (error) {
        console.log(error);
        res.send(error);
        return;
    }
    res.json(searchResults.data);
}));
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
