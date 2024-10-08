"use server";

import { getUserServerSession } from "@/auth/actions/auth-actions";
import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";
import { revalidatePath } from "next/cache";

//! Simulando un delay para que se pare el fetch y ver cómo se comporta la app
export const sleep = async (seconds: number): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, seconds * 1000)
  });
}

export const toggleTodo = async (id: string, complete: boolean): Promise<Todo> => {

  await sleep(3);

  const todo = await prisma.todo.findFirst({ where: { id } });

  if(!todo) {
    throw (`No se encontró el todo con ID: ${id}`);
  }

  const updatedTodo = await prisma.todo.update({
    where: { id },
    data: { complete },
  });

  revalidatePath('/dashboard/server-todos');

  return updatedTodo;
}


export const addTodo = async (description: string) => {
  try {
    const user = await getUserServerSession();
    const todo = await prisma.todo.create({
      data: { description, userId: user!.id },
    });
    revalidatePath('/dashboard/server-todos');
    return todo;

  } catch (error) {
    return {
      message: "Error creando ToDo"
    }
  }
}


export const deleteCompleted = async (): Promise<void> => {
  await prisma.todo.deleteMany({
    where: { complete: true },
  });

  revalidatePath('/dashboard/server-todos');

  return;
}