import { useState, useMemo, useRef } from 'react'
import './App.css'
import Utils from './utils/Utils'

interface Task {
  id: string
  description: string
  done: boolean
}

const App: React.FC = () => {
  const newTaskInput = useRef<HTMLInputElement>(null)

  // List of tasks
  const [tasks, setTasks] = useState<Task[]>([])

  // Number of pending tasks
  const pendingTasks = useMemo(() => {
    return tasks.filter((task) => task.done === false).length
  }, [tasks])

  // Number of done tasks
  const doneTasks = useMemo(() => {
    return tasks.filter((task) => task.done === true).length
  }, [tasks])

  function addTask() {
    if (!newTaskInput.current?.value) return

    const newTask = {
      id: Utils.uuidv4(),
      description: newTaskInput.current?.value || '',
      done: false
    }

    const _tasks = [...tasks, newTask]
    setTasks(_tasks)

    newTaskInput.current!.value = ''
  }

  function toggleDoneState(taskId: string) {
    const _tasks = tasks.map((task) =>
      task.id !== taskId
        ? task
        : {
            ...task,
            done: !task.done
          }
    )
    setTasks(_tasks)
  }

  function removeTask(taskId: string) {
    const _tasks = tasks.filter((task) => task.id !== taskId)
    setTasks(_tasks)
  }

  return (
    <div className="container">
      <div className="box">
        <h1 className="title">Todo List @iguerra94</h1>
        <ul className="tasks">
          {tasks.map((task) => (
            <li key={task.id} className="task-item">
              <span
                className={`${task.done === true ? 'task-item--done' : ''}`}
              >
                {task.description}
              </span>
              <div>
                <span>Done?</span>
                <input
                  type="checkbox"
                  checked={task.done}
                  className="task-item--checkbox"
                  onChange={() => toggleDoneState(task.id)}
                />
                <button
                  className="btn btn-remove"
                  onClick={() => removeTask(task.id)}
                  title="Borrar tarea"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>

        <div className="bottom-content">
          <div className="add-task--box">
            <input
              ref={newTaskInput}
              type="text"
              placeholder="Añade la descripción de la tarea aquí..."
              className="input-add"
            />
            <button
              className="btn btn-add"
              onClick={addTask}
              title="Agregar tarea"
            >
              Add task
            </button>
          </div>
          <div className="task-stats--box">
            <div className="task-stats task-stats--pending">
              <span>
                <strong>{pendingTasks}</strong> PENDING tasks
              </span>
            </div>
            <div className="task-stats task-stats--done">
              <span>
                <strong>{doneTasks}</strong> DONE tasks
              </span>
            </div>
            <div className="task-stats task-stats--total">
              <span>
                <strong>{pendingTasks + doneTasks}</strong> TOTAL tasks
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
