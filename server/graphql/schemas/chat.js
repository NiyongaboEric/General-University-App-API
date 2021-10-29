const chatTypeDef = `
  type Message {
    publicId: String!
    content: String!
    from: String!
    to: String!
    item: String!
    createdAt: String!
  }

  type ViewMessage {
    message: Message
    brand: Brand
    profile: Profile
    user: User
  }

  type ViewMessageEdges {
    node: ViewMessage
    cursor: String
  }

  type ViewAllMessageConnection {
    totalCount: Int
    edges: [ViewMessageEdges]
    pageInfo: PageInfo!
  }

  extend type Query {
    getMessages(first: Int, after: String, item: String!): ViewAllMessageConnection!
  }

  extend type Mutation {
    sendMessage(
      item: String!,
      content: String!
      username: String!
    ): ViewMessage!
  }
`;

export default chatTypeDef;
