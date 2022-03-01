import { render, screen } from '@testing-library/react'
import { act, renderHook } from '@testing-library/react-hooks'

import App from './App'
import './test/setupTests'
import useTasks from './hooks/useTasks'

describe('App component', () => {
  test('renders App component', () => {
    render(<App />)
    const element = screen.getByText(/todo list @iguerra94/i)
    expect(element).toBeInTheDocument()
  })

  test('initial values are correctly set', () => {
    const { result } = renderHook(() => useTasks())

    expect(typeof result.current.newTaskDescription).toBe('string')
    expect(result.current.newTaskDescription).toBe('')

    expect(Array.isArray(result.current.tasks)).toBe(true)
    expect(result.current.tasks.length).toBe(0)

    expect(typeof result.current.pendingTasks).toBe('number')
    expect(result.current.pendingTasks).toBe(0)

    expect(typeof result.current.doneTasks).toBe('number')
    expect(result.current.doneTasks).toBe(0)

    expect(typeof result.current.addTask).toBe('function')
    expect(typeof result.current.toggleDoneState).toBe('function')
    expect(typeof result.current.removeTask).toBe('function')
  })

  test('can add a PENDING task successfully', () => {
    const { result } = renderHook(() => useTasks())

    act(() => {
      result.current.setNewTaskDescription('Task 1')
    })

    act(() => {
      result.current.addTask()
    })

    expect(result.current.newTaskDescription).toBe('')
    expect(result.current.pendingTasks).toBe(1)
    expect(result.current.doneTasks).toBe(0)
    expect(result.current.tasks.length).toBe(1)
    expect(result.current.tasks[0].description).toBe('Task 1')
  })

  test('can set a task as DONE successfully', () => {
    const { result } = renderHook(() => useTasks())

    act(() => {
      result.current.setNewTaskDescription('Task 1')
    })

    act(() => {
      result.current.addTask()
    })

    expect(result.current.pendingTasks).toBe(1)
    expect(result.current.doneTasks).toBe(0)

    act(() => {
      const { id: taskId } = result.current.tasks[0]
      result.current.toggleDoneState(taskId)
    })

    expect(result.current.pendingTasks).toBe(0)
    expect(result.current.doneTasks).toBe(1)
  })

  test('can delete a task successfully', () => {
    const { result } = renderHook(() => useTasks())

    act(() => {
      result.current.setNewTaskDescription('Task 1')
    })

    act(() => {
      result.current.addTask()
    })

    expect(result.current.pendingTasks).toBe(1)

    act(() => {
      const { id: taskId } = result.current.tasks[0]
      result.current.removeTask(taskId)
    })

    expect(result.current.pendingTasks).toBe(0)
  })
})
