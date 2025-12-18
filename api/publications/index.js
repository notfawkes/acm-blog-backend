// api/publications/index.js
import "dotenv/config";
import clientPromise from "../../lib/mongodb.js";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  try {
    const client = await clientPromise;
    const db = client.db("ACM-SIGAI");
    const collection = db.collection("magazines");

    // Single publication via ?id=
    if (req.query.id) {
      let { id } = req.query;
      if (Array.isArray(id)) id = id[0];
      if (!id || !ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid publication ID" });
      }

      const publication = await collection.findOne({ _id: new ObjectId(id) });
      if (!publication) return res.status(404).json({ error: "Publication not found" });

      return res.status(200).json(publication);
    }

    // List view
    const publications = await collection
      .find({})
      .project({
        title: 1,
        smallDescription: 1,
        image: 1,
        bookLink: 1,
        views: 1,
        optionDate: 1,
        latest: 1,
      })
      .sort({ optionDate: -1 })
      .toArray();

    return res.status(200).json(publications);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
