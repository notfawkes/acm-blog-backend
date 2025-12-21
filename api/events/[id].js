import "dotenv/config";
import clientPromise from "../../lib/mongodb.js";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  if (!process.env.MONGODB_URI) {
    return res.status(500).json({ error: "MONGODB_URI not set" });
  }

  let { id } = req.query;
  if (Array.isArray(id)) id = id[0];

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid event ID" });
  }

  try {
    const client = await clientPromise;
    const db = client.db("ACM-SIGAI");
    const collection = db.collection("events");

    const event = await collection.findOne({ _id: new ObjectId(id) });
    if (!event) return res.status(404).json({ error: "Event not found" });

    return res.status(200).json(event);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
