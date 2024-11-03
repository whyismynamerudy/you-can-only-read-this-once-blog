import clientPromise from 'app/utils/mongodb'
import { NextRequest, NextResponse } from 'next/server'

// GET comments for a specific post
export async function GET(request: NextRequest) {
    try {
        const searchParams = new URL(request.url).searchParams
        const slug = searchParams.get('slug')
        
        if (!slug) {
            return NextResponse.json({ error: 'Slug is required' }, { status: 400 })
        }

        const client = await clientPromise
        const db = client.db("blogDB")
        const comments = db.collection("comments")

        const approvedComments = await comments
            .find({ slug, approved: true })
            .sort({ createdAt: -1 })
            .toArray()

        return NextResponse.json({ comments: approvedComments })
    } catch (error) {
        console.error('Error fetching comments:', error)
        return NextResponse.json({ error: 'Error fetching comments' }, { status: 500 })
    }
}

// POST new comment
export async function POST(request: NextRequest) {
    try {
        const { slug, content } = await request.json()

        if (!slug || !content) {
            return NextResponse.json({ error: 'Slug and content are required' }, { status: 400 })
        }

        const client = await clientPromise
        const db = client.db("blogDB")
        const comments = db.collection("comments")

        const comment = {
            slug,
            content,
            approved: false,
            createdAt: new Date(),
        }

        await comments.insertOne(comment)

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error posting comment:', error)
        return NextResponse.json({ error: 'Error posting comment' }, { status: 500 })
    }
}