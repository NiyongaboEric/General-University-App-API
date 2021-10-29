
const phoneVerificationTypeDef = `
  type PhoneDetails {
    status: String!
    message: String!
  }

  extend type Subscription {
    phoneVerified(publicId: String!): PhoneDetails!
  }
`;

export default phoneVerificationTypeDef;
