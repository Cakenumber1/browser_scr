// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { imgToTxt } from '../../helpers/imgToTxt';

// search
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST': {
      if (req.body.img) {
        const resData = await imgToTxt(req.body.img);
        return res.status(200).json(resData);
      }
      break;
    }
    default:
  }
  return res.status(400).end();
}
