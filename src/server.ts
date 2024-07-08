import { ApolloServer } from '@apollo/server';

import { startServerAndCreateLambdaHandler, handlers } from '@as-integrations/aws-lambda';
import {startStandaloneServer} from "@apollo/server/standalone";
import {typeDefs} from "./adapters/graphql/schemas/typeDefs";
import {resolvers} from "./adapters/graphql/resolvers/resolvers";


const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    // @ts-ignore
    playground: true,
    tracing: true
});


if(process.env.NODE_ENV === 'development') {

    startStandaloneServer(server, {
        listen: {port: 4000}
    }).then(r => console.log(`server started on ${r.url}`) )

}

const graphqlHandler = startServerAndCreateLambdaHandler(
    server,
    handlers.createAPIGatewayProxyEventV2RequestHandler(),
);


export {graphqlHandler}