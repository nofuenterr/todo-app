import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

interface Todo {
  id: number,
  title: string,
  complete: boolean,
}

interface TodoStore {
  todoIds: number[],
  todoByIds: Record<number, Todo>,

  addTodo: (title: string) => void,
  toggleTodo: (id: number) => void,
  deleteTodo: (id: number) => void,
  deleteCompletedTodos: () => void,
}

export const useTodoStore = create<TodoStore>()(
  persist(
    immer((set, get) => ({
      todoIds: [],
      todoByIds: {},
      addTodo: (title: string) => set(state => {
        const id = Date.now()
        state.todoIds.push(id)
        state.todoByIds[id] = {
          id,
          title,
          complete: false
        }
      }),
      toggleTodo: (id: number) => set(state => {
        if (state.todoByIds[id]) {
          state.todoByIds[id].complete = !state.todoByIds[id].complete
        }
      }),
      deleteTodo: (id: number) => set(state => {
        state.todoIds = state.todoIds.filter(todoId => todoId !== id)
        delete state.todoByIds[id]
      }),
      deleteCompletedTodos: () => set(state => {
        state.todoIds = state.todoIds.filter(id => !state.todoByIds[id].complete)
        Object.keys(state.todoByIds).forEach(id => {
          if (state.todoByIds[Number(id)].complete) {
            delete state.todoByIds[Number(id)]
          }
        })
      }),
    })),
    {
      name: 'todo-storage'
    }
  )
)
