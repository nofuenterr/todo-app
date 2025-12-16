import { useForm } from 'react-hook-form'
import { useTodoStore } from '../stores/todoStore'
import { Checkbox } from "radix-ui";
import { CheckIcon, Cross1Icon } from "@radix-ui/react-icons";
import { AccessibleIcon } from "radix-ui";
import { ToggleGroup } from "radix-ui";

export default function Main() {
  const todoIds = useTodoStore(s => s.todoIds)
  const filterTodoIds = useTodoStore(s => s.filterTodoIds)
  const deleteCompletedTodos = useTodoStore(s => s.deleteCompletedTodos)

  return (
    <main className='grid gap-4'> 
      <AddTodo />

      {todoIds.length !== 0
        ? (
          <div className='bg-white dark:bg-navy-900 rounded-sm drop-shadow-md'>
            <ul className='text-navy-850 dark:text-purple-100 '>
              {todoIds.map(id => {
                return <TodoItem key={id} id={id} />
              })}
            </ul>
            <div className='text-gray-600 dark:text-purple-600 py-4 px-5 flex justify-between items-center'>
              <span aria-label='Number of todos'>{todoIds.length} items</span>
              <button className='cursor-pointer' onClick={deleteCompletedTodos} aria-label='Clear completed todos'>Clear Completed</button>
            </div>
          </div>
        )
        : (
          <div className='bg-white dark:bg-navy-900 text-navy-850 dark:text-purple-100 py-4 px-5 grid place-content-center rounded-sm drop-shadow-md'>
            <p>You currently have no todos.</p>
          </div>
        )
      }

      <div className='bg-white dark:bg-navy-900 text-gray-600 dark:text-purple-600 py-4 grid place-content-center rounded-sm drop-shadow-md'>
        <ToggleGroup.Root
          className='flex items-center gap-4 *:cursor-pointer *:aria-checked:text-blue-500'
          type="single"
          defaultValue="all"
          aria-label="Filter todos"
        >
          <ToggleGroup.Item
            value="all"
            aria-label="All todos"
            onClick={() => filterTodoIds('all')}
          >
            <span>All</span>
          </ToggleGroup.Item>
          <ToggleGroup.Item
            value="active"
            aria-label="Active todos"
            onClick={() => filterTodoIds('active')}
          >
            <span>Active</span>
          </ToggleGroup.Item>
          <ToggleGroup.Item
            value="completed"
            aria-label="Completed todos"
            onClick={() => filterTodoIds('completed')}
          >
            <span>Completed</span>
          </ToggleGroup.Item>
        </ToggleGroup.Root>
      </div>
    </main>
  )
}

function AddTodo() {
  const {
    register,
    reset,
    handleSubmit,
  } = useForm()

  const addTodo = useTodoStore(s => s.addTodo)

  const handleAddTodo = (data) => {
    addTodo(data.todo)
    console.log('Added new todo', data.todo)
    reset()
  }

  return (
    <div className='bg-white dark:bg-navy-900 text-purple-800 dark:text-gray-600 rounded-sm drop-shadow-md'>
      <form onSubmit={handleSubmit(handleAddTodo)}>
        <input 
          className='w-full py-3 px-6'
          placeholder='Create a new todo...'
          {...register('todo', { required: 'Todo name is required' })}
        />
      </form>
    </div>
  )
}

function TodoItem({ id }) {
  const todo = useTodoStore(s => s.todoByIds[id])
  const toggleTodo = useTodoStore(s => s.toggleTodo)
  const deleteTodo = useTodoStore(s => s.deleteTodo)

  return (
    <li className='text-purple-800 dark:text-gray-600 py-4 px-5 flex items-center gap-4 
    border-b-2 border-b-purple-300 dark:border-b-purple-800'>
      <Checkbox.Root
        onClick={() => toggleTodo(id)}
        checked={todo.complete}
        className={'size-5 rounded-full border-2 border-purple-300 dark:border-purple-800 grid place-content-center cursor-pointer ' + (
          todo.complete ? 'bg-linear-to-r from-gradient-1-start to-gradient-1-end border-none text-white stroke-white' : 'bg-transparent'
        )}
      >
        <Checkbox.Indicator>
          <CheckIcon />
        </Checkbox.Indicator>
      </Checkbox.Root>

      <span className={todo.complete ? 'text-gray-300 dark:text-purple-700 line-through' : 'text-inherit'}>{todo.title}</span>

      <button onClick={() => deleteTodo(id)} className='ml-auto cursor-pointer' aria-label='Delete todo'>
        <AccessibleIcon.Root label='Delete todo icon'>
          <Cross1Icon />
        </AccessibleIcon.Root>
      </button>
    </li>
  )
}

/* bg-linear-to-r from-gradient-2-start to-gradient-2-end */