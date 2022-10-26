import { TodosAccess } from './todosAcess'
import { AttachmentUtils } from './attachmentUtils'
import { TodoItem } from '../models/TodoItem'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import { createLogger } from '../utils/logger'
import * as uuid from 'uuid'
// import * as createError from 'http-errors'

// TODO: Implement businessLogic

const logger = createLogger('businessLogic')

const todosAcess = new TodosAccess()
const signedUrl = new AttachmentUtils()
const bucketName = process.env.ATTACHMENT_S3_BUCKET

export async function createToDo(
  toDoRequest: CreateTodoRequest,
  userId: string
): Promise<TodoItem> {
  const todoId = uuid.v4()
  logger.info('creating new todo item', todoId)

  return await todosAcess.createToDo({
    todoId: todoId,
    userId: userId,
    createdAt: new Date().toISOString(),
    name: toDoRequest.name,
    dueDate: toDoRequest.dueDate,
    done: false,
    attachmentUrl: `https://${bucketName}.s3.amazonaws.com/${todoId}`
  })
}

export async function getAllToDos(userId: string) {
  logger.info('getting all ToDos for user', userId)
  return await todosAcess.getAllToDos(userId)
}

export async function updateToDo(
  userId: string,
  todoId: string,
  todoRequest: UpdateTodoRequest
) {
  logger.info('updating todo', todoId)
  return await todosAcess.updateToDo(todoRequest, todoId, userId)
}

export async function deleteTodo(todoId: string, userId: string) {
  logger.info('deleting todo', todoId)
  return await todosAcess.DeleteTodo(todoId, userId)
}

export async function generateUploadUrl(todoId: string) {
  logger.info('generating signed url')
  return await signedUrl.getUploadUrl(todoId)
}
