import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from 'fs'
export async function DELETE(request: NextRequest) {
    const name: any = request.nextUrl.searchParams.get("name")
    const file = await fs.readFile(process.cwd() + '/app/data.json', 'utf8')
    const fileData = JSON.parse(file)
    const recordIndex = fileData.findIndex((record: any) => record.name === name);

    if (recordIndex !== -1) {
        fileData.splice(recordIndex, 1);
        await fs.writeFile(process.cwd() + '/app/data.json', JSON.stringify(fileData, null, 2))
    }
    return NextResponse.json({
        recordIndex
    })
} 