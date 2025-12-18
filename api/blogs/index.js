import 'dotenv/config';
import clientPromise from "../../lib/mongodb.js";
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*'); // allow all origins
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Preflight
  if (req.method === 'OPTIONS') return res.status(204).end();

  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!process.env.MONGODB_URI) {
    return res.status(500).json({ error: 'MONGODB_URI not set' });
  }

  try {
    const client = await clientPromise;
    const db = client.db("ACM-SIGAI");
    const collection = db.collection("blogs");

    // Return single blog if ?id= provided
    if (req.query.id) {
      let { id } = req.query;
      if (Array.isArray(id)) id = id[0];
      if (!id || !ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid blog ID' });
      }
      const blog = await collection.findOne({ _id: new ObjectId(id) });
      if (!blog) return res.status(404).json({ error: 'Blog not found' });
      return res.status(200).json(blog);
    }

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
