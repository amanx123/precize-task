import { useState } from "react"
import { ClipLoader } from "react-spinners";


function Update() {
    const [name, setName] = useState("")
    const [score, setScore] = useState("")
    const [loading, setLoading] = useState(false);
    const handleUpdate = async (e: any) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await fetch('/api/view-all');
            const data = await response.json();
            const dataFilter = data.fileData;
            const nameRecord = dataFilter.find((data: any) => data.name === name);

            if (nameRecord) {

                const updatedRecord = { ...nameRecord, satScore: score }

                await fetch(`/api/update`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(updatedRecord)
                })
            }
            else {
                alert("Name not found")
                setLoading(false)
            }
        } catch (error) {
            console.error("API call error:", error);

        }
        setLoading(false);

    }
    return (
        <div className="flex flex-col gap-8">
            <h1 className="h-10 pt-10 pb-10 text-2xl text-center font-bold text-white">Update Score</h1>
            <input className="bg-neutral-800 p-2 px-8 py-3 rounded-lg w-[300px] text-white" type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
            <input className="bg-neutral-800 p-2 px-8 py-3 rounded-lg w-[300px] text-white" type="text" placeholder="Enter updated score " value={score} onChange={(e) => setScore(e.target.value)} />

            {loading ? (
                <span className="mt-5 flex items-center justify-center">
                    <ClipLoader color="#342522" size={40} />
                </span>
            ) : (
                <button
                    className="text-black font-semibold transition hover:opacity-80 px-6 py-2 bg-green-500 rounded-xl mt-5"
                    type="submit"
                    onClick={handleUpdate}
                >
                    Update Score
                </button>
            )}
        </div>
    )
}

export default Update
