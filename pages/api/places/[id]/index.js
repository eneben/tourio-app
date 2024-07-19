import dbConnect from "@/db/connect.js";
import Place from "@/db/models/Place.js";

export default async function handler(request, response) {
  try {
    await dbConnect();
  } catch (error) {
    return response
      .status(500)
      .json({ error: "Database connection error: " + error.message });
  }

  const { id } = request.query;

  if (!id) {
    return null;
  }

  if (request.method === "GET") {
    try {
      const place = await Place.findById(id);
      if (!place) {
        response.status(404).json({ status: "Not Found" });
        return;
      }

      response.status(200).json(place);
      return;
    } catch (error) {
      response
        .status(500)
        .json({ error: "Error retrieving place: " + error.message });
      return;
    }
  }
}
