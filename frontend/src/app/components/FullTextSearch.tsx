import axios from "axios";
import React, { useEffect, useState } from "react";
import Filter from "./Filter";

const FullTextSearch = ({ FILTERS, setResult }: any) => {
    const [queryMessage, setQueryMessage] = useState<string>("");
    const [filters, setFilters] = useState<string[]>([]);

    const getFullTextSearch = async () => {
        let data = null;
        if(filters.length === 0) return
        try {
            data = await axios.post("http://localhost:4000/fullTextSearch", {
                query: queryMessage,
                fields: filters,
            });
        } catch (error) {
            console.log(error);
        }

        console.log(data.data.hits.hits);
        setResult(data.data.hits.hits);
    };
    return (
        <>
            <div>
                <div className="mb-4 flex w-1/2 mx-auto flex-wrap items-stretch my-3 ">
                    <input
                        type="search"
                        className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-slate-600 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-slate-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:text-slate-800focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none "
                        placeholder="Search a keyword or text"
                        aria-label="Search"
                        aria-describedby="button-addon3"
                        value={queryMessage}
                        onChange={(e) => setQueryMessage(e.target.value)}
                    />
                    {/* Search button */}
                    <button
                        className="relative z-[2] rounded-r border-2 border-primary px-6 py-2 text-xs font-medium uppercase text-primary transition duration-150 ease-in-out border-slate-600 hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0"
                        type="button"
                        id="button-addon3"
                        data-te-ripple-init
                        onClick={() => {
                            getFullTextSearch();
                        }}
                    >
                        Search
                    </button>
                </div>
            </div>
            <div className="flex flex-row w-1/2 mx-auto justify-center ">
                {FILTERS.map((filterItem) => {
                    return (
                        <Filter
                            text={filterItem}
                            filters={filters}
                            setFilters={setFilters}
                            key={filterItem}
                        />
                    );
                })}
            </div>
        </>
    );
};

export default FullTextSearch;
