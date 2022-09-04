// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { USER_TOKEN } from '@/utils/constants';
import { jwtVerify } from 'jose';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  data: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  /* return new Error('custom error'); */
  res.status(200).json({ data: 'You are in admin-settings section.' });
}
