import 'dotenv/config';
import clientPromise from "../../lib/mongodb.js";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  let { id } = req.query;

  // If query contains an array (possible with repeated params), use the first value
  if (Array.isArray(id)) id = id[0];

  // Ensure id exists and is a string before calling ObjectId.isValid
  if (!id || typeof id !== "string" || !ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid blog ID" });
  }

  try {
    const client = await clientPromise;
    const db = client.db("ACM-SIGAI");
    const collection = db.collection("blogs");

    const blog = await collection.findOne({ _id: new ObjectId(id) });

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.status(200).json(blog);
  } catch (err) {
    // Log the error and stack so we can see the real cause in dev logs
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
