import { useEffect, useState } from "react";
import Filter from "./Filter";
import axios from "axios";

const KeywordSearch = ({ setResult }: any) => {
    const [filters, setFilters] = useState<string[]>([]);

    const [level, setLevel] = useState("");
    const [resourceId, setResourceId] = useState("");
    const [traceId, setTraceId] = useState("");
    const [spanId, setSpanId] = useState("");
    const [commit, setCommit] = useState("");
    const [parentResourceId, setParentResourceId] = useState("");
    const [timeLessOrEqual, setTimeStampLessOrEqual] = useState("");
    const [timeGreaterOrEqual, setTimeStampGreaterOrEqual] = useState("");

    const getKeywordsSearch = async () => {
        let data = null;
        let queryFilters = [];

        if (filters.length === 0) return;

        if (filters.includes("level")) {
            queryFilters.push({
                term: {
                    level: level,
                },
            });
        }

        if (filters.includes("resourceId")) {
            queryFilters.push({
                term: {
                    resourceId: resourceId,
                },
            });
        }

        if (filters.includes("traceId")) {
            queryFilters.push({
                term: {
                    traceId: traceId,
                },
            });
        }

        if (filters.includes("spanId")) {
            queryFilters.push({
                term: {
                    spanId: spanId,
                },
            });
        }

        if (filters.includes("commit")) {
            queryFilters.push({
                term: {
                    commit: commit,
                },
            });
        }

        if (filters.includes("parentResourceId")) {
            queryFilters.push({
                term: {
                    parentResourceId: parentResourceId,
                },
            });
        }

        if (timeGreaterOrEqual !== "" && timeLessOrEqual !== "") {
            queryFilters.push({
                range: {
                    timestamp: {
                        gte: timeGreaterOrEqual,
                        lte: timeLessOrEqual,
                    },
                },
            });
        }

        console.log("doing");
        try {
            data = await axios.post("http://localhost:4000/filterSearch", {
                queryFilters,
            });
        } catch (error) {
            console.log(error);
        }

        console.log(data);
        setResult(data.data.hits.hits);
    };

    return (
        <>
            <div className="flex flex-col w-1/3 mx-auto justify-center">
                <div className="flex flex-row justify-between align-bottom my-2">
                    <Filter
                        text="level"
                        filters={filters}
                        setFilters={setFilters}
                    />
                    <input
                        type="search"
                        className=" block w-80 rounded-l border border-solid border-slate-600 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-slate-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:text-slate-800focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none "
                        placeholder="Search a keyword or text"
                        aria-label="Search"
                        aria-describedby="button-addon3"
                        value={level}
                        onChange={(e) => setLevel(e.target.value)}
                    />
                </div>

                <div className="flex flex-row justify-between align-bottom my-2">
                    <Filter
                        text="resourceId"
                        filters={filters}
                        setFilters={setFilters}
                    />
                    <input
                        type="search"
                        className=" block w-80 rounded-l border border-solid border-slate-600 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-slate-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:text-slate-800focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none "
                        placeholder="Search a keyword or text"
                        aria-label="Search"
                        aria-describedby="button-addon3"
                        value={resourceId}
                        onChange={(e) => setResourceId(e.target.value)}
                    />
                </div>
                <div className="flex flex-row justify-between align-bottom my-2">
                    <Filter
                        text="traceId"
                        filters={filters}
                        setFilters={setFilters}
                    />
                    <input
                        type="search"
                        className=" block w-80 rounded-l border border-solid border-slate-600 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-slate-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:text-slate-800focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none "
                        placeholder="Search a keyword or text"
                        aria-label="Search"
                        aria-describedby="button-addon3"
                        value={traceId}
                        onChange={(e) => setTraceId(e.target.value)}
                    />
                </div>

                <div className="flex flex-row justify-between align-bottom my-2">
                    <Filter
                        text="spanId"
                        filters={filters}
                        setFilters={setFilters}
                    />
                    <input
                        type="search"
                        className=" block w-80 rounded-l border border-solid border-slate-600 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-slate-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:text-slate-800focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none "
                        placeholder="Search a keyword or text"
                        aria-label="Search"
                        aria-describedby="button-addon3"
                        value={spanId}
                        onChange={(e) => setSpanId(e.target.value)}
                    />
                </div>

                <div className="flex flex-row justify-between align-bottom my-2">
                    <Filter
                        text="commit"
                        filters={filters}
                        setFilters={setFilters}
                    />
                    <input
                        type="search"
                        className=" block w-80 rounded-l border border-solid border-slate-600 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-slate-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:text-slate-800focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none "
                        placeholder="Search a keyword or text"
                        aria-label="Search"
                        aria-describedby="button-addon3"
                        value={commit}
                        onChange={(e) => setCommit(e.target.value)}
                    />
                </div>

                <div className="flex flex-row justify-between align-bottom my-2">
                    <Filter
                        text="parentResourceId"
                        filters={filters}
                        setFilters={setFilters}
                    />
                    <input
                        type="search"
                        className=" block w-80 rounded-l border border-solid border-slate-600 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-slate-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:text-slate-800focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none "
                        placeholder="Search a keyword or text"
                        aria-label="Search"
                        aria-describedby="button-addon3"
                        value={parentResourceId}
                        onChange={(e) => setParentResourceId(e.target.value)}
                    />
                </div>
            </div>
            <br />

            <div className=" w-full flex flex-row justify-around">
                <div>
                    <label className="mr-3">Start date</label>
                    <input
                        type="datetime-local"
                        onChange={(e) =>
                            setTimeStampGreaterOrEqual(
                                new Date(e.target.value).toISOString()
                            )
                        }
                    />
                </div>
            </div>
            <br />
            <div className=" w-full flex flex-row justify-around">
                <div>
                    <label className="mr-3">End date</label>
                    <input
                        type="datetime-local"
                        onChange={(e) =>
                            setTimeStampLessOrEqual(
                                new Date(e.target.value).toISOString()
                            )
                        }
                    />
                </div>
            </div>
            <br />

            <div className="mx-auto w-3/4 flex justify-center">
                <button
                    className="relative mx-auto z-[2] rounded-r border-2 border-primary px-6 py-2 text-xs font-medium uppercase text-primary transition duration-150 ease-in-out border-slate-600 hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0"
                    type="button"
                    id="button-addon3"
                    data-te-ripple-init
                    onClick={() => {
                        getKeywordsSearch();
                    }}
                >
                    Search
                </button>
            </div>
        </>
    );
};

export default KeywordSearch;
