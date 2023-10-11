import { useState } from "react"
import { ClipLoader } from "react-spinners";


function Delete() {
    const [name, setName] = useState("")
    const [loading, setLoading] = useState(false);
    const handleDelete = async (e: any) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await fetch('/api/view-all');
            const data = await response.json();

            const dataFilter = data.fileData;
            const nameRecord = dataFilter.find((data: any) => data.name === name);

            if (nameRecord) {
                await fetch(`/api/delete?name=${nameRecord.name}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },

                })
            }
            else {
                alert("Name not found")
            }
            console.log(nameRecord)
        } catch (error) {
            console.error("API call error:", error);

        }

        setLoading(false);

    }
    return (
        <div className="flex flex-col gap-10">
            <h1 className="h-10 pt-10 pb-10 text-2xl text-center font-bold text-white">Delete Record</h1>
            <input className="bg-neutral-800 p-2 px-8 py-3 rounded-lg w-[300px] text-white" type="text" placeholder="Enter Name to Delete Record" value={name} onChange={(e) => setName(e.target.value)} />

            {loading ? (
                <span className="mt-5 flex items-center justify-center">
                    <ClipLoader color="#342522" size={40} />
                </span>
            ) : (
                <button
                    className=" text-black font-semibold transition hover:opacity-80 px-6 py-2 bg-green-500 rounded-xl mt-5"
                    type="submit"
                    onClick={handleDelete}
                >
                    Delete Record
                </button>
            )}
        </div>
    )
}

export default Delete
