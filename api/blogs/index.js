// api/blogs/index.js
import 'dotenv/config'; // loads .env.local automatically
import clientPromise from "../../lib/mongodb.js";
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  // === CORS headers ===
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080', 'https://acm-blogs.vercel.app/'); // allow frontend on localhost
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const client = await clientPromise;
    const db = client.db("ACM-SIGAI");
    const collection = db.collection("blogs");

    // If an id query param is provided, return single blog
    if (req.query.id) {
      let { id } = req.query;
      if (Array.isArray(id)) id = id[0];
      if (!id || typeof id !== 'string' || !ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid blog ID' });
      }

      const blog = await collection.findOne({ _id: new ObjectId(id) });
      if (!blog) return res.status(404).json({ error: 'Blog not found' });
      return res.status(200).json(blog);
    }

    // Otherwise return list of blogs with limited fields
    const blogs = await collection
      .find({})
      .project({
        image: 1,
        title: 1,
        authorName: 1,
        authorRole: 1,
        slug: 1,
        smallDescription: 1,
      })
      .toArray();

    return res.status(200).json(blogs);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
