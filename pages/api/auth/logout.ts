// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader('Set-Cookie', `user-token=deleted; path=/; Max-Age=0`);
  res.status(200).json({ data: 'Logout successfuly.' });
}
