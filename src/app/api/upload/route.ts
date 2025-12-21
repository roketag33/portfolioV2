import { NextRequest, NextResponse } from 'next/server'
import { join } from 'path'
import { writeFile, mkdir } from 'fs/promises'
import { v4 as uuidv4 } from 'uuid'

// Limit file size to 5MB
const MAX_FILE_SIZE = 5 * 1024 * 1024
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()
        const file = formData.get('file') as File | null

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 })
        }

        if (file.size > MAX_FILE_SIZE) {
            return NextResponse.json({ error: 'File too large (max 5MB)' }, { status: 400 })
        }

        if (!ACCEPTED_TYPES.includes(file.type)) {
            return NextResponse.json({ error: 'Invalid file type' }, { status: 400 })
        }

        // Create uploads dir if not exists
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        // Generate unique filename
        const extension = file.type.split('/')[1] || 'jpg'
        const filename = `${uuidv4()}.${extension}`

        // Save using absolute path process.cwd()
        const uploadDir = join(process.cwd(), 'public', 'uploads')

        // Ensure directory exists (recursive)
        await mkdir(uploadDir, { recursive: true })

        const filepath = join(uploadDir, filename)

        await writeFile(filepath, buffer)

        return NextResponse.json({
            url: `/uploads/${filename}`,
            filename: filename
        })

    } catch (error) {
        console.error('Upload failed:', error)
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
    }
}
