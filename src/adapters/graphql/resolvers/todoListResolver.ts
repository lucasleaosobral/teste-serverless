import {todoListRepository} from "../../database/todoListRepository";

const todoListResolver = {
    Query: {
        getAll: async (_: any, args: {status: string}) => {
            const data = await todoListRepository.getAll(args.status);
            return data;
        },
        getById: async (_: any, args: {id: string}) => {
            const data = await todoListRepository.getById(args.id);
            return data;
        },
    },
    Mutation: {
        async addTodoList(_: any, {todo}: any ) {
            const data = await todoListRepository.create(todo);
            return data;
        },
        async deleteTodoList(_: any, {id}: any ) {
            const data = await todoListRepository.delete(id);
            return data;
        },
        async editTodoList(_: any, {id, edits }: any ) {
            const data = await todoListRepository.update(id, edits);
            return data;
        }
    }
}

export { todoListResolver };