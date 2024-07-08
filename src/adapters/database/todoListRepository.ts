import {dynamoDB} from "./dynamodbClient";
import { v4 as uuidv4 } from 'uuid';
import {localTableName} from "../../configuration/appConfig";

const tableName = process.env.NODE_ENV === "development" ? localTableName : process.env.TODOLIST_TABLE;

type GetAllResponse = TodoList[];

interface TodoList {
    id: string;
    title: string;
    description: string;
    status: string;
    createdAt: string | null;
}

interface UpdateTodoListInput {
    title: String,
    description: String,
    status: String,
}

interface CreateTodoListInput {
    title: string;
    description: string;
    status: string;
}


const todoListRepository = {
    getAll: async (status: string): Promise<GetAllResponse> => {
        let params = {
            TableName: tableName,
        };

        if(status) {
            params = {
                TableName: tableName,
                // @ts-ignore
                FilterExpression: '#status = :status',
                ExpressionAttributeNames: {
                    '#status': 'status',
                },
                ExpressionAttributeValues: {
                    ':status': status,
                },
            };
        }


        try {
            // @ts-ignore
            const data = await dynamoDB.scan((params)).promise();

            return data.Items?.map(item => ({
                id: item.id,
                title: item.title,
                description: item.description,
                status: item.status,
                createdAt: item.createdAt,
            })) || [];

        }catch (error) {
            console.error('Erro ao buscar lista:', error);
            throw new Error('Erro ao buscar lista');
        }
    },
    getById: async (id: string) => {

        const params = {
            TableName: tableName,
            Key: {
                id: id
            }
        };

        try {
            // @ts-ignore
            const data = await dynamoDB.get(params).promise();
            return data.Item;
        } catch (error) {
            console.error('Erro ao buscar lista por ID:', error);
            throw new Error('Erro ao buscar lista por ID');
        }
    },
    create: async (todoListInput: CreateTodoListInput ) => {
        const id = uuidv4();

        const params = {
            TableName: tableName,
            Item: {
                id: id,
                title: todoListInput.title,
                description: todoListInput.description,
                status: todoListInput.status,
                createdAt: Date.now(),
            },
        };

        try {
            // @ts-ignore
            const data = await dynamoDB.put(params).promise();
            return params.Item;
        } catch (error) {
            console.error('Erro ao criar lista:', error);
            throw new Error('Erro ao criar lista');
        }
    },
    delete: async(id: string) => {
        const params = {
            TableName: tableName,
            Key: {
                id: id,
            },
        };

        try {
            // @ts-ignore
            await dynamoDB.delete(params).promise();
            return id;
        } catch (error) {
            console.error('Erro ao deletar lista:', error);
            throw new Error('Erro ao deletar lista');
        }
    },
    update: async(id: String, edits: UpdateTodoListInput ) => {


        const params = {
            TableName: tableName,
            Key: {
                id: id,
            },
            UpdateExpression: 'SET #title = :title, #description = :description, #status = :status',
            ExpressionAttributeNames: {
                '#title': 'title',
                '#description': 'description',
                '#status': 'status'
            },
            ExpressionAttributeValues: {
                ':title':  edits.title ,
                ':description': edits.description,
                ':status': edits.status
            },
            ReturnValues: 'ALL_NEW'
        };

        try {
            // @ts-ignore
            const data = await dynamoDB.update(params).promise();

            return data.Attributes;

        } catch (error) {
            console.error('Erro ao atualizar lista:', error);
            throw new Error('Erro ao atualizar lista');
        }

    }
}

export {todoListRepository}