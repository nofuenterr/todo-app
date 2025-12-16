import { useForm } from 'react-hook-form';
import { useTodoStore } from '../stores/todoStore';
import { Checkbox } from 'radix-ui';
import { CheckIcon, Cross1Icon } from '@radix-ui/react-icons';
import { AccessibleIcon } from 'radix-ui';
import { RadioGroup } from 'radix-ui';

export default function Main() {
	const todoIds = useTodoStore((s) => s.todoIds);
	const deleteCompletedTodos = useTodoStore((s) => s.deleteCompletedTodos);

	return (
		<main className="grid gap-4 overflow-hidden text-lg drop-shadow-md">
			<AddTodo />

			{todoIds.length !== 0 ? (
				<>
					<div className="dark:bg-navy-900 overflow-scroll rounded-sm bg-white">
						<ul className="text-navy-850 dark:text-purple-100">
							{todoIds.map((id) => {
								return <TodoItem key={id} id={id} />;
							})}
						</ul>
						<div className="flex items-center justify-between px-5 py-4 text-sm text-gray-600 dark:text-purple-600">
							<span aria-label="Number of todos">{todoIds.length} items</span>
							<div className="dark:bg-navy-900 hidden bg-white sm:inline-block">
								<FilterGroup />
							</div>
							<button
								className="hover:text-navy-850 cursor-pointer hover:dark:text-purple-300"
								onClick={deleteCompletedTodos}
								aria-label="Clear completed todos"
							>
								Clear Completed
							</button>
						</div>
					</div>

					<div className="dark:bg-navy-900 grid place-content-center rounded-sm bg-white py-4 drop-shadow-md sm:hidden">
						<FilterGroup />
					</div>
				</>
			) : (
				<>
					<div className="dark:bg-navy-900 text-navy-850 grid place-content-center rounded-sm bg-white px-5 py-4 drop-shadow-md dark:text-purple-100">
						<p>You currently have no todos.</p>
					</div>
					<div className="dark:bg-navy-900 grid place-content-center rounded-sm bg-white py-4 drop-shadow-md">
						<FilterGroup />
					</div>
				</>
			)}
		</main>
	);
}

function AddTodo() {
	const { register, reset, handleSubmit } = useForm();

	const addTodo = useTodoStore((s) => s.addTodo);

	const handleAddTodo = (data) => {
		addTodo(data.todo);
		console.log('Added new todo', data.todo);
		reset();
	};

	return (
		<div className="dark:bg-navy-900 rounded-sm bg-white text-purple-800 drop-shadow-md dark:text-gray-600">
			<form onSubmit={handleSubmit(handleAddTodo)}>
				<input
					className="w-full px-6 py-3"
					placeholder="Create a new todo..."
					{...register('todo', { required: 'Todo name is required' })}
				/>
			</form>
		</div>
	);
}

function TodoItem({ id }) {
	const todo = useTodoStore((s) => s.todoByIds[id]);
	const toggleTodo = useTodoStore((s) => s.toggleTodo);
	const deleteTodo = useTodoStore((s) => s.deleteTodo);

	return (
		<li className="flex items-center gap-4 border-b-2 border-b-purple-300 px-5 py-4 text-purple-800 dark:border-b-purple-800 dark:text-gray-600">
			<Checkbox.Root
				onClick={() => toggleTodo(id)}
				checked={todo.complete}
				className={
					'hover:border-gradient-1-end grid size-5 cursor-pointer place-content-center rounded-full border-2 border-purple-300 dark:border-purple-800 ' +
					(todo.complete
						? 'from-gradient-1-start to-gradient-1-end border-none bg-linear-to-r stroke-white text-white'
						: 'bg-transparent')
				}
			>
				<Checkbox.Indicator>
					<CheckIcon />
				</Checkbox.Indicator>
			</Checkbox.Root>

			<span
				className={
					todo.complete
						? 'text-gray-300 line-through dark:text-purple-700'
						: 'text-inherit'
				}
			>
				{todo.title}
			</span>

			<button
				onClick={() => deleteTodo(id)}
				className="ml-auto cursor-pointer"
				aria-label="Delete todo"
			>
				<AccessibleIcon.Root label="Delete todo icon">
					<Cross1Icon />
				</AccessibleIcon.Root>
			</button>
		</li>
	);
}

function FilterGroup() {
	const filterTodoIds = useTodoStore((s) => s.filterTodoIds);

	return (
		<RadioGroup.Root
			defaultValue="all"
			aria-label="Filter todos"
			className="*:hover:text-navy-850 flex items-center gap-4 font-bold text-gray-600 **:cursor-pointer **:aria-checked:text-blue-500 dark:text-purple-600 *:hover:dark:text-purple-300"
		>
			<div>
				<RadioGroup.Item
					className="appearance-none"
					value="all"
					onClick={() => filterTodoIds('all')}
					aria-label="All todos"
				>
					All
				</RadioGroup.Item>
			</div>
			<div>
				<RadioGroup.Item
					className="appearance-none"
					value="active"
					onClick={() => filterTodoIds('active')}
					aria-label="Active todos"
				>
					Active
				</RadioGroup.Item>
			</div>
			<div>
				<RadioGroup.Item
					className="appearance-none"
					value="completed"
					onClick={() => filterTodoIds('completed')}
					aria-label="Completed todos"
				>
					Completed
				</RadioGroup.Item>
			</div>
		</RadioGroup.Root>
	);
}
