// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

// search
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST': {
      // save img func
      // const res = await find words in pic func
      // if (res.exists && res.status(200))
      if (req.body) {
        return res.status(200).json({img : req.body.img });
      }
      break;
    }
    default:
  }
  return res.status(400).end();
}
