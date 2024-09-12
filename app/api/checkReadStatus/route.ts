import clientPromise from 'app/utils/mongodb'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    try {
      const { slug, fingerprint } = await request.json()

      const client = await clientPromise
      const db = client.db("blogDB")
      const blogPosts = db.collection("blogPosts")

      //  // Use findOneAndUpdate with upsert for an atomic operation
      // const result = await blogPosts.findOneAndUpdate(
      //   { slug },
      //   {
      //     $setOnInsert: { createdAt: new Date() },
      //     $addToSet: { readers: fingerprint },
      //     $currentDate: { lastReadAt: true }
      //   },
      //   { 
      //     upsert: true
      //   }
      // )

      // const hasRead = result?.matchedCount > 0 && result?.modifiedCount === 0

      // // First, try to find the existing document
      // let result = await blogPosts.findOne({ slug })

      // let hasRead = false

      // if (result) {
      //   // Document exists, check if the fingerprint is in the readers array
      //   if (result.readers && result.readers.includes(fingerprint)) {
      //     hasRead = true
      //   } else {
      //     // Fingerprint not in readers, add it
      //     await blogPosts.updateOne(
      //       { slug },
      //       { 
      //         $addToSet: { readers: fingerprint },
      //         $currentDate: { lastReadAt: true }
      //       }
      //     )
      //   }
      // } else {
      //   // Document doesn't exist, create a new one
      //   await blogPosts.insertOne({
      //     slug,
      //     createdAt: new Date(),
      //     readers: [fingerprint],
      //     lastReadAt: new Date()
      //   })
      // }

      // Check if the blog post exists and if the fingerprint has read it
      // const result = await blogPosts.findOneAndUpdate(
      //   { slug, readers: { $ne: fingerprint } },
      //   { 
      //     $setOnInsert: { 
      //       slug,
      //       createdAt: new Date(),
      //       // Add any other relevant fields for your blog post
      //     },
      //     $addToSet: { readers: fingerprint },
      //     $currentDate: { lastReadAt: true }
      //   },
      //   { upsert: true, returnDocument: 'after' }
      // )

    //   const result = await readPosts.findOneAndUpdate(
    //     { slug, fingerprint },
    //     { $setOnInsert: { slug, fingerprint, readAt: new Date() } },
    //     { upsert: true, returnDocument: 'after' }
    //   )

    // If the document was modified (not inserted), it means the fingerprint was added
      // If it wasn't modified, it either means the post already existed and was read by this fingerprint,
      // or a new post was created (which counts as unread for this fingerprint)
      // const hasRead = result?.lastErrorObject?.updatedExisting && !result.lastErrorObject?.modifiedCount

      // Step 1: Try to find the existing document
    const existingDoc = await blogPosts.findOne({ slug })

    let hasRead = false
    let operation = ''

    if (existingDoc) {
      console.log(`Existing document found for slug: ${slug}`)
      if (existingDoc.readers.includes(fingerprint)) {
        console.log(`Fingerprint ${fingerprint} has already read the post`)
        hasRead = true
        operation = 'none'
      } else {
        console.log(`Updating document to add fingerprint ${fingerprint}`)
        const updateResult = await blogPosts.updateOne(
          { slug },
          {
            $addToSet: { readers: fingerprint },
            $currentDate: { lastReadAt: true }
          }
        )
        console.log(`Update result: ${JSON.stringify(updateResult)}`)
        operation = 'update'
      }
    } else {
      console.log(`No existing document found for slug: ${slug}. Creating new document.`)
      const insertResult = await blogPosts.insertOne({
        slug,
        createdAt: new Date(),
        readers: [fingerprint],
        lastReadAt: new Date()
      })
      console.log(`Insert result: ${JSON.stringify(insertResult)}`)
      operation = 'insert'
    }

    console.log(`Final hasRead status: ${hasRead}, Operation performed: ${operation}`)
    return NextResponse.json({ hasRead, operation })
    } catch (error) {
      console.error('Error checking read status:', error)
      return NextResponse.json({ error: 'Error checking read status' }, { status: 500 })
    }
}