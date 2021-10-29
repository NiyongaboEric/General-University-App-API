import { makeExecutableSchema } from 'apollo-server-express';
import resolvers from '../resolvers/index';
import profileTypeDef from './profile';
import userTypeDef from './users';
import sharedTypeDef from './shared';
import brandTypeDef from './brand';
import phoneVerificationTypeDef from './subscription/phoneVerification';
import categoryTypeDef from './category';
import chatTypeDef from './chat';
import chatSubscriptionTypeDef from './subscription/chat';

/**
 *  Created Empty or feke or temp query and Mutation
 *  Others queries and mutation will extend it.
 *  It does not take any parameter.
 *
 *  @var(_empty) is dummy variable
 *
 *  Note: In the current version of GraphQL,
 *  you can’t have an empty type even if you intend to extend it later.
 */

const fekeQueryTypeDef = `
  type Query {
    _empty: String
  }
`;

const fekeMutationTypeDef = `
  type Mutation {
    _empty: String
  }
`;

const fekeSubscriptionTypeDef = `
  type Subscription {
    _empty: String
  }
`;


const typeDefs = [
  fekeQueryTypeDef,
  fekeMutationTypeDef,
  fekeSubscriptionTypeDef,
  userTypeDef,
  profileTypeDef,
  sharedTypeDef,
  brandTypeDef,
  phoneVerificationTypeDef,
  categoryTypeDef,
  chatTypeDef,
  chatSubscriptionTypeDef,
];

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
