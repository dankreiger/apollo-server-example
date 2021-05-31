import { ApolloServer, gql, IResolvers } from 'apollo-server';
import { GraphQLScalarType } from 'graphql';
import responseCachePlugin from 'apollo-server-plugin-response-cache';

import { SCALAR_DATA } from './scalars';
import { TaskApi } from '../services/tasks/api';
import { Task } from '../types/generated/schema';
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  scalar Date

  enum Priority {
    _1
    _2
    _3
  }

  # This "Task" type defines the queryable fields for every task in the data source.
  type Task {
    id: ID!
    title: String!
    description: String!
    priority: Priority!
    due_date: Date!
    schedule_date: Date!
    completed: Boolean!
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "tasks" query returns an array of zero or more Tasks (defined above).
  type Query {
    tasks: [Task]
  }
`;

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves tasks from the db
const resolvers: IResolvers<
  {
    Date: GraphQLScalarType;
    Priority: {
      _1: 1;
      _2: 2;
      _3: 3;
    };
    Query: { tasks: Promise<Task[]> };
  },
  { dataSources: { taskApi: TaskApi } }
> = {
  Date: SCALAR_DATA.DATE.scalar,
  Priority: {
    _1: 1,
    _2: 2,
    _3: 3,
  },
  Query: {
    tasks: async (_, __, { dataSources }) => dataSources.taskApi.getAllTasks(),
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [responseCachePlugin()],
  dataSources: () => ({
    taskApi: new TaskApi(),
  }),
});

// The `listen` method launches a web server.
server.listen({ port: 3001 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
