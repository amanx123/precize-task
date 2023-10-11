"use client"
import Add from '@/components/Add';
import Delete from '@/components/Delete';
import GetRank from '@/components/GetRank';
import Update from '@/components/Update';
import ViewAll from '@/components/ViewAll';
import { useState } from 'react'

export default function Home() {
  const [buttonState, setButtonState] = useState("add");

  return (
    <div className='pb-20 h-screen' >
      <main className='gap-5 h-40 pt-10 pb-20 max-w-[1300px] mx-auto flex flex-wrap items-center justify-center md:gap-10 p-10 md:pt-20 text-lg font-semibold'>
        <button onClick={() => setButtonState("add")} className='bg-emerald-600 px-4 p-2 hover:opacity-70 transition rounded-xl'>Insert</button>
        <button onClick={() => setButtonState("viewAll")} className='bg-emerald-600 px-4 p-2 hover:opacity-70 transition rounded-xl'>View All</button>
        <button onClick={() => setButtonState("getRank")} className='bg-emerald-600 px-4 p-2 hover:opacity-70 transition rounded-xl'>Get Rank</button>
        <button onClick={() => setButtonState("updateScore")} className='bg-emerald-600 px-4 p-2 hover:opacity-70 transition rounded-xl'>Update Score</button>
        <button onClick={() => setButtonState("deleteScore")} className='bg-emerald-600 px-4 p-2 hover:opacity-70 transition rounded-xl'>Delete Record</button>
      </main>
      <div className='pt-16 items-center flex justify-center'>
        {
          buttonState == "add" && <Add /> ||
          buttonState == "viewAll" && <ViewAll /> ||
          buttonState == "getRank" && <GetRank /> ||
          buttonState == "updateScore" && <Update /> ||
          buttonState == "deleteScore" && <Delete />
        }
      </div>
    </div>
  )
}
