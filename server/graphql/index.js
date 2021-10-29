import { ApolloServer } from 'apollo-server-express';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import Redis from 'ioredis';
import schema from './schemas/index';
import AuthenticateToken from '../helpers/AuthenticateToken';
import config from '../../config/index';


const {
  ENGINE_API_KEY_NAME_STAGING,
  REDIS_URL,
  REDIS_PORT,
  REDIS_PASSWORD,
} = config;

const {
  verifyToken,
  verifyWebsocketToken,
} = AuthenticateToken;

const options = {
  host: REDIS_URL,
  port: REDIS_PORT,
  password: REDIS_PASSWORD,
  retry_strategy: (times) => {
    // reconnect after upto 3000 milis
    return Math.max(times * 100, 3000);
  },
};

const pubsub = new RedisPubSub({
  publisher: new Redis(options),
  subscriber: new Redis(options),
});


const apolloConnected = new ApolloServer({
  introspection: true,
  playground: true,
  schema,
  context: async ({ req, connection }) => {
    if (connection) {
      return {
        connection: connection.context,
        pubsub,
      };
    }
    const authUser = await verifyToken(req);
    return {
      user: authUser,
      pubsub,
    };
  },
  engine: {
    apiKey: ENGINE_API_KEY_NAME_STAGING,
    schemaTag: 'production',
  },
  subscriptions: {
    onConnect: (connectionParams) => {
      const currentAuthuserWS = verifyWebsocketToken(connectionParams);
      return currentAuthuserWS;
    },
  },
});

export default apolloConnected;
