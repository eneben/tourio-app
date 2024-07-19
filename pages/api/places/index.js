import dbConnect from "@/db/connect";
import Place from "@/db/models/Place";

export default async function handler(request, response) {
  try {
    await dbConnect();
  } catch (error) {
    return response
      .status(500)
      .json({ error: "Database connection error: " + error.message });
  }

  if (request.method === "GET") {
    try {
      const places = await Place.find();
      response.status(200).json(places);
      return;
    } catch (error) {
      response
        .status(500)
        .json({ error: "Error retrieving places: " + error.message });
      return;
    }
  }

  if (request.method === "POST") {
    try {
      const newPlace = request.body;
      await Place.create(newPlace);
      response.status(201).json({ status: "Place created" });
      return;
    } catch (error) {
      return response
        .status(400)
        .json({ error: "Error creating place: " + error.message });
    }
  }
}
