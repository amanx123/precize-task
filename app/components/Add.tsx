"use client"
import { FormEvent, useState } from "react"
import ClipLoader from "react-spinners/ClipLoader";
type FormData = {
    name: string;
    address: string;
    city: string;
    country: string;
    pincode: number;
    satScore: number;

}
function Add() {
    const [allNames, setAllNames] = useState([])
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState<FormData>({ name: "", address: "", city: "", country: "", pincode: 0, satScore: 0 });
    const update = async (event: any) => {
        const target = event.currentTarget
        const fetchNames = await fetch('/api/view-all').then(res => res.json());
        const dataAll = fetchNames.fileData
        const filterNames = dataAll.map((data: any) => data.name)
        setAllNames(() => filterNames)
        setForm({
            ...form,
            [target.name]: target.value
        })
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const formTarget = e.currentTarget
        const formData = new FormData(formTarget);
        const formObj = Object.fromEntries(formData)

        let name = formObj.name
        const found = allNames.find((elem) => elem === name)
        if (!found) {
            let score = Number(formObj.satScore)
            let passStatus = "yes";
            if (score <= 480) {
                passStatus = "no";
            }
            const res = await fetch('/api/add',
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ ...formObj, "passed": passStatus })
                })
            const data = await res.json();
            setLoading(false);
            formTarget.reset();
        }
        else {
            alert("Name must be unique")
            setLoading(false)
            formTarget.reset()
        }
    }
    return (
        <div className="bg-neutral-900 text-white font-sans font-medium text-lg">
            <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-[300px]">
                <label className="text-center font-bold" htmlFor="name">Name</label>
                <input className="bg-neutral-800 p-2 px-8 rounded-lg" placeholder="Enter Name" type="text" id="name" name="name" required onChange={update} />
                <label className="text-center font-bold" htmlFor="address">Address</label>
                <input className="bg-neutral-800 p-2 px-8 rounded-lg" placeholder="Enter Address" type="text" id="address" name="address" required onChange={update} />
                <label className="text-center font-bold" htmlFor="city" >City</label>
                <input className="bg-neutral-800 p-2 px-8 rounded-lg" placeholder="Enter City" type="text" id="city" name="city" required onChange={update} />
                <label className="text-center font-bold" htmlFor="country">Country</label>
                <input className="bg-neutral-800 p-2 px-8 rounded-lg" placeholder="Enter Country" type="text" id="country" name="country" required onChange={update} />
                <label className="text-center font-bold" htmlFor="pincode" >Pincode</label>
                <input className="bg-neutral-800 p-2 px-8 rounded-lg" placeholder="Enter Pincode" type="number" id="pincode" name="pincode" required onChange={update} />
                <label className="text-center font-bold" htmlFor="satScore">SAT Score</label>
                <input className="bg-neutral-800 p-2 px-8 rounded-lg" placeholder="Enter Sat Score out of 1600" type="number" id="satScore" name="satScore" required onChange={update} />
                {loading && (<span className="mt-5 flex items-center justify-center"><ClipLoader color="#342522" size={40} /></span>)}
                <button type="submit" className={`mt-5 ${loading && 'hidden'} py-3 hover:opacity-80 bg-black rounded-full`}>Add</button>
            </form>
        </div>
    )
}

export default Add
