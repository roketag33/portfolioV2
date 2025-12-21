import { NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'

export async function POST(request: Request) {
    try {
        const formData = await request.formData()
        const file = formData.get('file') as File | null

        if (!file) {
            return NextResponse.json(
                { error: 'No file received' },
                { status: 400 }
            )
        }

        const buffer = Buffer.from(await file.arrayBuffer())
        const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`
        const uploadDir = join(process.cwd(), 'public/uploads')

        // Ensure upload directory exists
        try {
            await mkdir(uploadDir, { recursive: true })
        } catch (e) {
            // Ignore if exists
        }

        const filepath = join(uploadDir, filename)
        await writeFile(filepath, buffer)

        return NextResponse.json({ url: `/uploads/${filename}` })
    } catch (error) {
        console.error('Upload error:', error)
        return NextResponse.json(
            { error: 'Failed to upload file' },
            { status: 500 }
        )
    }
}
