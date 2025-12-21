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

  try {
    const client = await clientPromise;
    const db = client.db("ACM-SIGAI");
    const collection = db.collection("events");

    // ---------- single event via query ----------
    if (req.query.id) {
      let { id } = req.query;
      if (Array.isArray(id)) id = id[0];

      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid event ID" });
      }

      const event = await collection.findOne({ _id: new ObjectId(id) });
      if (!event) return res.status(404).json({ error: "Event not found" });

      return res.status(200).json(event);
    }

    // ---------- event list (card-safe response) ----------
    const events = await collection
      .aggregate([
        {
          $project: {
            title: 1,
            smallDescription: 1,
            date: 1,
            optionDate: 1,
            image: { $arrayElemAt: ["$image", 0] } // first image only
          }
        }
      ])
      .toArray();

    return res.status(200).json(events);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
