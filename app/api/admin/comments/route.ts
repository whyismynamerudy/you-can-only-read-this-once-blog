import clientPromise from 'app/utils/mongodb'
import { NextRequest, NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'

// GET pending comments
export async function GET(request: NextRequest) {
    try {
        const client = await clientPromise
        const db = client.db("blogDB")
        const comments = db.collection("comments")

        const pendingComments = await comments
            .find({ approved: false })
            .sort({ createdAt: -1 })
            .toArray()

        return NextResponse.json({ comments: pendingComments })
    } catch (error) {
        console.error('Error fetching pending comments:', error)
        return NextResponse.json({ error: 'Error fetching comments' }, { status: 500 })
    }
}

// PUT update comment approval status
export async function PUT(request: NextRequest) {
    try {
        const { commentId, approved } = await request.json()

        if (!commentId) {
            return NextResponse.json({ error: 'Comment ID is required' }, { status: 400 })
        }

        const client = await clientPromise
        const db = client.db("blogDB")
        const comments = db.collection("comments")

        const result = await comments.updateOne(
            { _id: new ObjectId(commentId) },
            { 
                $set: { 
                    approved,
                    moderatedAt: new Date()
                }
            }
        )

        if (result.modifiedCount === 0) {
            return NextResponse.json({ error: 'Comment not found' }, { status: 404 })
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error updating comment:', error)
        return NextResponse.json({ error: 'Error updating comment' }, { status: 500 })
    }
}