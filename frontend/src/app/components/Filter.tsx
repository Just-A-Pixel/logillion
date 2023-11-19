import { SetStateAction, useEffect, useState } from "react";

const Filter = ({ text, filters, setFilters } : any) => {
    const [active, setActive] = useState<boolean>(false);

    useEffect(() => {
        if (active) {
            setFilters((oldFilter: string[]) => [...oldFilter, text]);
        } else {
            setFilters((oldFilter: string[]) =>
                oldFilter.filter((data) => data !== text)
            );
        }
        console.log(active)
    }, [active]);
    return (
        <span
            className={`${
                active == true
                    ? `bg-green-900 text-green-300`
                    : ` bg-gray-600 text-gray-300`
            } text-xs cursor-pointer font-medium h-5 me-2 px-2.5 py-0.5 rounded mt-2`}
            onClick={(e) => setActive(!active)}
        >
            {text}
        </span>
    );
};

export default Filter;
