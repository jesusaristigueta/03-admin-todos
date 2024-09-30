import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs';

export async function GET() {

  await prisma.todo.deleteMany(); // DELETE * FROM todo; // DELETE ALL records
  await prisma.user.deleteMany(); // DELETE * FROM user; // DELETE ALL records

  const user = await prisma.user.create({
    data: {
      email: 'prueba@correo.com',
      password: bcrypt.hashSync('123456', 10),
      name: 'Test User',
      roles: ['admin', 'client', 'super-user'],
      todos: {
        create: [
          { description: 'Piedra del alma', complete: true },
          { description: 'Piedra del poder' },
          { description: 'Piedra del tiempo' },
          { description: 'Piedra del espacio' },
          { description: 'Piedra del realidad' },
        ]
      }
    }
  });
  // const todo = await prisma.todo.create({
  //   data: { description: 'Piedra del alma', complete: true }
  // });
  // console.log(todo);

  // await prisma.todo.createMany({
  //   data: [
  //     { description: 'Piedra del alma', complete: true },
  //     { description: 'Piedra del poder' },
  //     { description: 'Piedra del tiempo' },
  //     { description: 'Piedra del espacio' },
  //     { description: 'Piedra del realidad' },
  //   ],
  // })

  return NextResponse.json({
    message: 'Seed executed successfully!'
  })
}