const userTypeDef = `
  type User {
    _id: ID!
    email: String!
    signupType: String!
    publicId: String!
    token: String!
    smsCode: Int
    isVerified: Boolean!
  }

  type Logout {
    message: String!
  }

  extend type Query {
    logoutUser: Logout
  }

`;

export default userTypeDef;
