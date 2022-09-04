// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { jwtVerify, decodeJwt } from 'jose';

import { USER_TOKEN } from '@/utils/constants';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const token = req.cookies[USER_TOKEN];
    const secret = process.env.ACCESS_TOKEN_SECRET || '';

    if (token) {
      try {
        await jwtVerify(token, new TextEncoder().encode(secret));
      } catch (error) {
        res.status(400).json({ error });
      }
      const claims = decodeJwt(token);
      res.status(200).json({
        data: claims.session
      });
    } else res.status(400).json({ data: null });
  } else res.status(404).json({ error: 'Request method not supported.' });
}
