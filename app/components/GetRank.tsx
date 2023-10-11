"use client"
import { useState } from "react";
import { ClipLoader } from "react-spinners";

function GetRank() {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [rank, setRank] = useState(0);


    const handleClick = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch('/api/view-all');
            const data = await response.json();

            const dataFilter = data.fileData;
            const nameRecord = dataFilter.find((data: any) => data.name === name);

            if (nameRecord) {
                const userScore = Number(nameRecord.satScore);
                const scores = dataFilter.map((record: any) => Number(record.satScore));

                scores.sort((a: any, b: any) => b - a);
                const userRank = scores.findIndex((score: any) => score === userScore) + 1;
                setRank(userRank);
            } else {
                setRank(0); // User not found in the data
            }
        } catch (error) {
            console.error("API call error:", error);
        }
        setLoading(false);
    };

    return (
        <div className="flex flex-col items-center justify-center gap-10 text-white">
            <h1 className="h-10 pt-10 pb-10 text-2xl font-bold text-white">Check Rank</h1>
            <input
                type="text"
                className="bg-neutral-800 p-2 px-8 rounded-lg"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            {loading ? (
                <span className="mt-5 flex items-center justify-center">
                    <ClipLoader color="#342522" size={40} />
                </span>
            ) : (
                <button
                    className="mt-5 text-black font-semibold transition hover:opacity-80 px-6 py-2 bg-green-500 rounded-xl"
                    type="submit"
                    onClick={handleClick}
                >
                    Check Rank
                </button>
            )}
            <span className={`h-20 mt-5 ${rank === 0 ? "hidden" : "flex"} text-4xl text-center font-mono font-bold text-white bg-green-900 rounded-full p-10 justify-center items-center`}>
                {rank}
            </span>
        </div>
    );
}

export default GetRank;
