import { NextResponse } from "next/server";
import { promises as fs } from 'fs'
export async function GET() {
    const file = await fs.readFile(process.cwd() + '/app/data.json', 'utf8')
    const fileData = JSON.parse(file)

    return NextResponse.json({ fileData })
} 