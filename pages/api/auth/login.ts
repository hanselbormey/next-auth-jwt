// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { SignJWT } from 'jose';
import { nanoid } from 'nanoid';
import cookie from 'cookie';

import prisma from '@/lib/prisma';
import { USER_TOKEN } from '@/utils/constants';

/* type Data = {
  name: string;
};
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = req.body;

  if (req.method === 'POST') {
    /*     const user = await prisma.user.findUnique({
      where: {
        email
      }
    }); */

    const foundUser = {
      email: 'admin@gmail.com',
      name: 'admin',
      password: 'admin123'
    };

    if (email === foundUser.email && password === foundUser.password) {
      // const areEqualPasswords = await compare(password, user.password);
      const areEqualPasswords = true;
      if (!areEqualPasswords)
        res.status(400).json({ message: "Password doesn't match." });
      const session = { user: foundUser };

      const accessToken = await new SignJWT({
        session
      })
        .setProtectedHeader({ alg: 'HS256' })
        .setJti(nanoid())
        .setIssuedAt()
        .setExpirationTime('2h')
        .sign(new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET || ''));

      res.setHeader(
        'Set-Cookie',
        cookie.serialize(USER_TOKEN, accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          sameSite: 'strict',
          maxAge: 3600,
          path: '/'
        })
      );

      res.status(200).json({
        data: session
      });
    } else res.status(400).json({ error: 'User not found.' });
  } else res.status(404).json({ error: 'Request method not supported.' });
}
