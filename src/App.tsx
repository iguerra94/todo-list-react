import './App.css'
import useTasks from './hooks/useTasks'

const App: React.FC = () => {
  const {
    newTaskDescription,
    setNewTaskDescription,
    tasks,
    pendingTasks,
    doneTasks,
    addTask,
    toggleDoneState,
    removeTask
  } = useTasks()

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
              type="text"
              value={newTaskDescription}
              onChange={(evt) => setNewTaskDescription(evt.currentTarget.value)}
              data-testid="new-task-description"
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
