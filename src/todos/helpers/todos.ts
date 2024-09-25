// Acciones para manejos de la API

import { Todo } from "@prisma/client";

//! Simulando un delay para que se pare el fetch y ver cómo se comporta la app
const sleep = (seconds: number): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, seconds * 1000)
  });
}


export const updateTodo = async ( id: string, complete: boolean ): Promise<Todo> => {

  //TODO: Implementar actualizaciones optimistas 
  ///await sleep(2); // Simulando delay

  const body = { complete };

  // LLamado del lado del cliente no necesita toda la URL, lado del server SI
  const todoAPI = await fetch(`/api/todos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(response => response.json());

  console.log('updated todo: ', todoAPI);

  return todoAPI;

}

export const createTodo = async ( description: string ): Promise<Todo> => {

  const body = { description };

  // LLamado del lado del cliente no necesita toda la URL, lado del server SI
  const todoAPI = await fetch(`/api/todos`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(response => response.json());

  console.log('created todo: ', todoAPI);

  return todoAPI;

}

export const deleteCompletedTodos = async ( ): Promise<void> => {


  // LLamado del lado del cliente no necesita toda la URL, lado del server SI
  const { message } = await fetch(`/api/todos`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(response => response.json());

  console.log('deleted all completed todos response: ', message);

  return;

}