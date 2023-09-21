import type { NextApiRequest, NextApiResponse } from "next";
import db from "../../../db.json"


export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if( req.method == "GET"){  
        res.status(200).json(db)
    }
    
}