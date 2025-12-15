import { useForm } from 'react-hook-form'

export default function Main() {
  const {
    register,
    reset,
    handleSubmit,
  } = useForm()

  const addTodo = (data) => {
    console.log('Added new todo', data)
    reset()
  }

  return (
    <div className='bg-white dark:bg-navy-900 text-purple-800 dark:text-gray-600 rounded-sm drop-shadow-md'>
      <form onSubmit={handleSubmit(addTodo)}>
        <input 
          className='w-full py-3 px-6'
          placeholder='Create a new todo...'
          {...register('todo', { required: 'Todo name is required' })}
        />
      </form>
    </div>
  )
}
