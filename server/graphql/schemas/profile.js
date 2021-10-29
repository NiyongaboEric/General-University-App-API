const profileTypeDef = `
  type Profile {
    _id: ID!
    firstName: String!
    lastName: String!
    profileImage: String!
    jobPosition: String!
    address: String!
    phoneNumber: String!
    gender: String!
    userId: String!
  }

  type ViewProfile {
    profile: Profile
    user: User
    brand: Brand
  }

  extend type Query {
    getUserProfile(publicId: String!): ViewProfile!
  }

  extend type Mutation {
    createProfile(
      firstName: String!,
      lastName: String!,
      profileImage: String,
      jobPosition: String,
      address: String,
      phoneNumber: String,
      gender: String,
    ): ViewProfile!
  }
`;

export default profileTypeDef;
