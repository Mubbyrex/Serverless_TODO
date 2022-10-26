import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
// import { createLogger } from '../utils/logger'
import { TodoItem } from '../models/TodoItem'
import { TodoUpdate } from '../models/TodoUpdate'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'

const XAWS = AWSXRay.captureAWS(AWS)

// const logger = createLogger('TodosAccess')

// TODO: Implement the dataLayer logic

export class TodosAccess {
  constructor(
    private readonly docClient: DocumentClient = new XAWS.DynamoDB.DocumentClient(),
    private readonly todoTable = process.env.TODOS_TABLE
  ) {}

  //   GET ALL TODOS
  async getAllToDos(userId: string): Promise<TodoItem[]> {
    console.log('Getting all ToDos')

    const result = await this.docClient
      .query({
        TableName: this.todoTable,
        KeyConditionExpression: '#userId = :userId',
        ExpressionAttributeValues: {
          ':userId': userId
        },
        ExpressionAttributeNames: { '#userId': 'userId' }
      })
      .promise()

    const items = result.Items
    return items as TodoItem[]
  }

  // Creating  A New Todo
  async createToDo(todoItem: TodoItem): Promise<TodoItem> {
    console.log('creating a new ToDo')

    await this.docClient
      .put({
        TableName: this.todoTable,
        Item: todoItem
      })
      .promise()

    return todoItem
  }

  // updating existing ToDo
  async updateToDo(
    todoUpdate: UpdateTodoRequest,
    todoId: string,
    userId: string
  ): Promise<TodoUpdate> {
    console.log('Updating todo')

    await this.docClient
      .update({
        TableName: this.todoTable,
        Key: {
          todoId,
          userId
        },
        UpdateExpression: 'set #name = :name, dueDate = :date, done = :done',
        ExpressionAttributeNames: {
          '#name': 'name',
          '#dueDate': 'dueDate',
          '#done': 'done'
        },
        ExpressionAttributeValues: {
          ':name': todoUpdate.name,
          ':date': todoUpdate.dueDate,
          ':done': todoUpdate.done
        }
      })
      .promise()

    return todoUpdate
  }

  //   Deleting ToDo
  async DeleteTodo(todoId: string, userId: string): Promise<void> {
    console.log('deleting todo', todoId)
    await this.docClient
      .delete({
        TableName: this.todoTable,
        Key: {
          userId: userId,
          todoId: todoId
        }
      })
      .promise()
  }
}
