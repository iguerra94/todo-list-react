import { useState, useMemo } from 'react'
import Utils from 'src/utils/Utils'

export interface Task {
  id: string
  description: string
  done: boolean
}

function useTasks() {
  const [newTaskDescription, setNewTaskDescription] = useState('')

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
    if (!newTaskDescription) return

    const newTask = {
      id: Utils.uuidv4(),
      description: newTaskDescription,
      done: false
    }

    const _tasks = [...tasks, newTask]
    setTasks(_tasks)

    setNewTaskDescription('')
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

  return {
    newTaskDescription,
    setNewTaskDescription,
    tasks,
    pendingTasks,
    doneTasks,
    addTask,
    toggleDoneState,
    removeTask
  }
}

export default useTasks
