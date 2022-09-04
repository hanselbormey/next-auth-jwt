import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

import cookie from 'cookie';
// import jwt from 'jsonwebtoken';
import {
  SignJWT,
  jwtVerify,
  decodeJwt,
  jwtDecrypt,
  generateSecret,
  generateKeyPair,
  createRemoteJWKSet
} from 'jose';
import { USER_TOKEN } from '@/utils/constants';

/* export async function verifyAuth(request: NextRequest) {
  const token = request.cookies[USER_TOKEN];
  const secret = process.env.ACCESS_TOKEN_SECRET || '';

  const verifyJwt = jwt.verify(token, secret);
  if (verifyJwt) {
    return NextResponse.next();
  } else new Response('Expired token', { status: 401 });
} */

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const cookie = req.cookies[USER_TOKEN];
  const secret = process.env.ACCESS_TOKEN_SECRET || '';

  console.log('middleware');

  if (!cookie) {
    console.log('NO COOKIE');
    /* return new Error('Auth required'); */
    /*   return new Response('Auth required', {
      status: 401
    }); */

    return new Response('Auth required', {
      status: 401,
      statusText: 'Auth required!'
    });
  } else {
    try {
      const { payload } = await jwtVerify(
        cookie,
        new TextEncoder().encode(secret)
      );
      if (payload) {
        console.log(`payload - ${JSON.stringify(payload)}`);
        NextResponse.next();
      } else {
        return new Response('JWT not valid.', {
          status: 401
        });
      }
    } catch (error) {
      return new Response('JWT not valid.', {
        status: 401
      });
    }
  }

  return NextResponse.next();
}
