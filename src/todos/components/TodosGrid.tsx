// ESTOS SON CLIENT COMPONENTS
'use client';

import React from 'react'
import { useRouter } from 'next/navigation';
import { Todo } from '@prisma/client'
import { TodoItem } from './TodoItem';

import * as todosApi from '@/todos/helpers/todos';
import { toggleTodo } from '../actions/todo-actions';

interface Props {
  todos?: Todo[];   //Se puede manejar con una interfaz propia y se hace el mapping
}

export const TodosGrid = ({ todos = []}: Props) => {
  //console.log(todos);

  //const router = useRouter();

  // const toggleTodo = async (id: string, complete: boolean) => {
  //   const updatedTodo = await todosApi.updateTodo(id, complete );
  //   console.log({updatedTodo});
  //   router.refresh();
  // }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-3 gap-2'>
      {
        todos.map(todo => (
          <TodoItem key={todo.id} todo={todo} toggleTodo={ toggleTodo } />
        ))
      }
    </div>
  )
}
