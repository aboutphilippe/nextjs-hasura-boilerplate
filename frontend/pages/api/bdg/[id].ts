import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { parseBggXmlApi2ThingResponse } from "@code-bucket/board-game-geek";

export default async function bdgId(req: NextApiRequest, res: NextApiResponse) {
  const bdg = req.query;
  // console.log("bdg", bdg);

  // `https://api.geekdo.com/xmlapi2/thing?id=${bdg.id}&versions=1&videos=1&stats=1&ratingcomments=1`;
  const response = await axios.get(
    `https://api.geekdo.com/xmlapi2/thing?id=${bdg.id}&versions=1&stats=1`
  );

  const bdgResponse = parseBggXmlApi2ThingResponse(response.data);

  // console.log("bdgResponse", bdgResponse);
  res.json(bdgResponse.item);
}
