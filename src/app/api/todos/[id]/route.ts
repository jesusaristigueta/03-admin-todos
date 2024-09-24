import prisma from '@/lib/prisma';
import { Todo } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server';
import * as yup from 'yup';

interface Segments {
  params: {
    id: string;
  }
}

const getTodo = async (id: string): Promise<Todo | null> => {
  return await prisma.todo.findFirst({
    where: { id },
  });
}

export async function GET(request: NextRequest, { params }: Segments) {

  const todo = await getTodo(params.id);

  if (!todo) {
    return NextResponse.json({ error: `ToDo con ID: ${params.id} no encontrado.` }, { status: 404 });
  }

  return NextResponse.json(todo);
}


const putSchema = yup.object({
  description: yup.string().optional(),
  complete: yup.boolean().optional(),
})

export async function PUT(request: NextRequest, { params }: Segments) {

  const todo = await getTodo(params.id);

  if (!todo) {
    return NextResponse.json({ error: `ToDo con ID: ${params.id} no encontrado.` }, { status: 404 });
  }

  try {
    //! Desestructurando ya que cualquier valor extra puede pasar la validacion de yup
    const { complete, description } = await putSchema.validate(await request.json());

    const todo = await prisma.todo.update({
      where: { id: params.id },
      data: { complete, description }, //! Si es null, se mantiene el valor anterior
    });

    return NextResponse.json(todo);

  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }

}

export async function DELETE(request: NextRequest, { params }: Segments) {

  const todo = await getTodo(params.id);

  if (!todo) {
    return NextResponse.json({ error: `ToDo con ID: ${params.id} no encontrado.` }, { status: 404 });
  }

  await prisma.todo.delete({
    where: { id: params.id },
  });

  return NextResponse.json(todo);
}