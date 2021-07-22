import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { parseBggXmlApi2ThingResponse } from "@code-bucket/board-game-geek";

export default async function bgg(req: NextApiRequest, res: NextApiResponse) {
  const bgg = req.query;
  console.log("******* bggId", bgg);

  const response = await axios.get(
    `https://api.geekdo.com/xmlapi2/thing?id=${bgg.id}&versions=1`
  );

  const bggResponse = parseBggXmlApi2ThingResponse(response.data);

  console.log("bggResponse", bggResponse);
  res.json(bggResponse.item);
}
