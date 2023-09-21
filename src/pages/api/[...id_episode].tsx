import type { NextApiRequest,NextApiResponse } from "next";
import db from "../../../db.json"

export default function handler(req: NextApiRequest, res: NextApiResponse){
    const {id_episode} = req.query
    const id = id_episode[1]
    const result = db.episodes.find((episode)=> episode.id == id)
    res.status(200).json(result)
}