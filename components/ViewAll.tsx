"use client"
import { useState } from "react"
import ReactJson from 'react-json-view'

function ViewAll() {
    const [data, setData] = useState([])
    const handleClick = async () => {
        const res = await fetch('/api/view-all').then((res) => res.json())
        setData(res.fileData)
        console.log(data)
    }
    return (
        <div className="flex flex-col items-center justify-center">
            <button onClick={handleClick} className="flex transition hover:opacity-80 items-center justify-center px-6 py-2 bg-green-500 rounded-xl">Fetch All Data</button>
            <div className="mt-10">
                <ReactJson theme="pop" src={data} />
            </div>
        </div>
    )
}

export default ViewAll
