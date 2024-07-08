
const todoListSchema = `#graphql
    scalar DateTime    
    
    type TodoList {
        id: ID!,
        title: String!,
        description: String!,
        status: String,
        createdAt: DateTime!,
    }

    type Query {
        getAll(status: String): [TodoList],
        getById(id: ID): TodoList,
    }

    type Mutation {
        addTodoList(todo: CreateTodoListInput): TodoList
        editTodoList(id: ID!, edits:  UpdateTodoListInput): TodoList
        deleteTodoList(id: ID!): ID
    }

    input CreateTodoListInput {
        title: String!
        description: String!
        status: String = "PENDING"
    }
    input UpdateTodoListInput {
        title: String,
        description: String,
        status: String,
    }
`

export {todoListSchema}