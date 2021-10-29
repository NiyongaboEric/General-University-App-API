
const chatSubscriptionTypeDef = `
  extend type Subscription {
    getMessage(item: String!): ViewMessage!
  }
`;

export default chatSubscriptionTypeDef;
