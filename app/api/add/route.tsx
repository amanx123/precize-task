import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from 'fs'
export async function POST(request: NextRequest) {
    const res = await request.json();
    const file = await fs.readFile(process.cwd() + '/app/data.json', 'utf8')
    const fileData = JSON.parse(file)
    fileData.push(res);
    await fs.writeFile(process.cwd() + '/app/data.json', JSON.stringify(fileData))

    return NextResponse.json({ fileData })
} 