import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import configureStore from './store/store'
import {
	completedTask,
	loadTasks,
	getTasks,
	taskDeleted,
	titleChange,
	getTasksLoadingStatus,
	createTask,
} from './store/task'
import { Provider, useSelector, useDispatch } from 'react-redux'
import { getError } from './store/errors'

const store = configureStore()
const App = () => {
	const state = useSelector(getTasks())
	const isLoading = useSelector(getTasksLoadingStatus())
	const error = useSelector(getError())
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(loadTasks())
	}, [])

	const addNewTask = () => {
		dispatch(
			createTask({ userId: 1, title: 'Some New Task', completed: false })
		)
	}

	const changeTitle = taskId => {
		dispatch(titleChange(taskId))
	}

	const deleteTask = taskId => {
		dispatch(taskDeleted(taskId))
	}

	if (isLoading) {
		return <h1>Loading...</h1>
	}
	if (error) {
		return <p>{error}</p>
	}

	return (
		<>
			<h1>App</h1>
			<button onClick={addNewTask}>Add new task</button>
			<ul>
				{state.map(el => (
					<li key={el.id}>
						<p>{el.title}</p>
						<p>{`Completed: ${el.completed}`}</p>
						<button onClick={() => dispatch(completedTask(el.id))}>
							Completed
						</button>
						<button onClick={() => changeTitle(el.id)}>Change title</button>
						<button onClick={() => deleteTask(el.id)}>Delete</button>
						<hr />
					</li>
				))}
			</ul>
		</>
	)
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<Provider store={store}>
		<App />
	</Provider>
)
