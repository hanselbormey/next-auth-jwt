// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { hash } from 'bcrypt';
import prisma from '@/lib/prisma';

/* type Data = {
  name: string;
};
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, email, password } = req.body;

  if (req.method === 'POST') {
    const hashedPassword = await hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    });

    res.status(200).json({
      user: {
        name: user.name,
        email: user.email
      }
    });
  } else res.status(404).json({ message: 'Request method not supported.' });
}
