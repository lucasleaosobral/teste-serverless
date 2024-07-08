import {todoListResolver} from "./todoListResolver";

const resolvers = {
    Query: {
        ...todoListResolver.Query
    },
    Mutation: {
        ...todoListResolver.Mutation
    }
}

export {resolvers}