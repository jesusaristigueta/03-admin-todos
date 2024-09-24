

import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: Request) {

  return NextResponse.json({
    message: 'Hello, Next.js Serverless!'
  })
}

export async function POST(request: Request) {

  return NextResponse.json({
    message: 'Hello, Next.js Serverless!',
    method: 'POST',
  });
}