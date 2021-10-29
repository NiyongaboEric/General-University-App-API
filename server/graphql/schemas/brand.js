const BrandTypeDef = `
  input CoordinateInput {
    latitude: Float!
    longitude: Float!
  }

  type Coordinate {
    latitude: Float!
    longitude: Float!
  }

  type Brand {
    brandName: String!
    username: String!
    coverPhoto: String!
    userLocation: [Coordinate]
    ownerContact: String!
    witnessContactOne: String!
    witnessContactTwo: String!
    category: String!
    createdAt: Date
  }

  type ViewBrandDetails {
    brand: Brand
    profile: Profile
  }

  type ViewAllBrands {
    brand: Brand
    profile: Profile
    category: Category
  }

  type ViewAllAvailableBrandsEdges {
    node: ViewAllBrands
    cursor: String
  }

  type ViewAllAvailableBrandsConnection {
    totalCount: Int
    edges: [ViewAllAvailableBrandsEdges]
    pageInfo: PageInfo!
  }

  type ViewAllAvailableBrands {
    AllAvailableBrands: ViewAllAvailableBrandsConnection
  }

  extend type Mutation {
    createBrand(
      brandName: String!
      username: String!
      coverPhoto: String!
      userLocation: [CoordinateInput!]!
      ownerContact: String!
      witnessContactOne: String!
      witnessContactTwo: String!
      category: String!
    ): ViewBrandDetails!
  }

  extend type Query {
    viewBrand(username: String!): ViewBrandDetails!
    viewAllAvailableBrands(first: Int, after: String): ViewAllAvailableBrands!
  }
`;

export default BrandTypeDef;
