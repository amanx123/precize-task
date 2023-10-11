import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from 'fs'
export async function PUT(request: NextRequest) {
    const data = await request.json();
    const file = await fs.readFile(process.cwd() + '/app/data.json', 'utf8')
    const fileData = JSON.parse(file)
    const userRecord = fileData.find((record: any) => record.name === data.name);
    if (userRecord) {
        userRecord.satScore = data.satScore
        fs.writeFile(process.cwd() + '/app/data.json', JSON.stringify(fileData, null, 2));

    }

    return NextResponse.json({ userRecord })
}
