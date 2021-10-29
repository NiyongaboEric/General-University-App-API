const sharedTypeDef = `
  type ContactVerification {
    telephoneNumber: String!
    codeVerification: String!
  }

  type PageInfo {
    endCursor: String
    startCursor: String
    hasNextPage: Boolean
    hasPreviousPage: Boolean
  }

  extend type Mutation {
    phoneVerification(
      telephoneNumber: String!,
      contactOwner: String!
    ): ContactVerification
  }
`;

export default sharedTypeDef;
