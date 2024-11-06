import React, { useEffect, useState } from "react";

const InputSearch = (props) => {
    const { name, handleSearch, filter } = props;

    const [query, setQuery] = useState("");

    useEffect(() => {
        handleSearch("");
        setQuery("");
    }, [filter]);

    const handleChange = (e) => {
        setQuery(e.target.value || "");

        if (e.target.value.length === 0) {
            return handleSearch("");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSearch(query);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex justify-end mb-8 gap-1">
                <input
                    value={query}
                    onChange={handleChange}
                    className={`px-5 py-3 w-full max-w-md outline-none rounded-md border focus:shadow-sm bg-white`}
                    placeholder={`Search the ${name}`}
                />
                <button className="px-7 py-3 font-medium outline-none bg-primary hover:bg-emerald-600 rounded-md text-light text-lg">
                    Search
                </button>
            </div>
        </form>
    );
};

export default InputSearch;
