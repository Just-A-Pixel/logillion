"use client";
import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import axios from "axios";
import KeywordSearch from "./components/KeywordSearch";
import FullTextSearch from "./components/FullTextSearch";

export default function Home() {
    const [result, setResult] = useState([]);

    const FILTERS = [
        "level",
        "message",
        "resourceId",
        "timestamp",
        "traceId",
        "spanId",
        "commit",
        "parentResourceId",
    ];

    return (
        <>
             <h1 className=" text-center text-2xl">LOGIMILLION</h1>
            <h1 className=" text-center">FULL TEXT SEARCH</h1>
            <FullTextSearch FILTERS={FILTERS} setResult={setResult} />

            <h1 className=" text-center  mt-40">SEARCH FILTERS</h1>

            <KeywordSearch FILTERS={FILTERS} setResult={setResult} />
            <h1 className=" text-center  mt-40">OUTPUT</h1>
            <div className="flex flex-col justify-center w-1/2 mx-auto">
                {result.map((data) => {
                    return (
                        // eslint-disable-next-line react/jsx-key
                        <div className=" my-4">
                            <li>
                                <b>level:</b> {data._source.level}
                            </li>
                            <li>
                                <b>message:</b> {data._source.message}
                            </li>
                            <li>
                                <b>resourceId:</b> {data._source.message}
                            </li>
                            <li>
                                <b>timestamp:</b> {data._source.timestamp}
                            </li>
                            <li>
                                <b>traceId:</b> {data._source.traceId}
                            </li>
                            <li>
                                <b>spanId:</b> {data._source.spanId}
                            </li>
                            <li>
                                <b>commit:</b> {data._source.commit}
                            </li>
                            <li>
                                <b>metadata.parentResourceId:</b>{" "}
                                {data._source.metadata.parentResourceId}
                            </li>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
