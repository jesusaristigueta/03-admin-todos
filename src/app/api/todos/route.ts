import prisma from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'
import * as yup from 'yup';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const take = Number(searchParams.get('take') ?? '10');
  const skip = Number(searchParams.get('skip') ?? '0');

  if (isNaN(take)) {
    return NextResponse.json({ error: 'Take tiene que ser un número.' }, { status: 400 });
  }
  if (isNaN(skip)) {
    return NextResponse.json({ error: 'Skip tiene que ser un número.' }, { status: 400 });
  }

  const todos = await prisma.todo.findMany({
    take, skip,
  });

  return NextResponse.json(todos);
}

const postSchema = yup.object({
  description: yup.string().required(),
  complete: yup.boolean().optional().default(false),
})

export async function POST(request: NextRequest) {
  try {
    //! Desestructurando ya que cualquier valor extra puede pasar la validacion de yup
    const { complete, description } = await postSchema.validate(await request.json());

    const todo = await prisma.todo.create({
      data: { complete, description },
    });

    return NextResponse.json(todo);

  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }

}