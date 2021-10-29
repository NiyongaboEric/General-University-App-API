const CategoryTypeDef = `

  scalar Date

  type Category {
    itemPrice: String!
    itemPriceDiscount: String!
    itemPriceCurrency: String!
    itemRemainder: String!
    itemImageOne: String!
    itemImageTwo: String!
    itemImageThree: String!
    location: [Coordinate]
    itemCategory: String!
    title: String!
    description: String!
    venue: String!
    subItemType: String
    startDate: Date!
    endDate: Date!
    itemType: String!
    itemStatus: String!
    itemComment: String
    publicId: String!
    createdAt: Date
    totalItems: Int
  }

  type ViewCategoryDetails {
    brand: Brand
    profile: Profile
    category: Category
  }

  type ViewOwnerBrandItemsEdges {
    node: Category
    cursor: String
  }

  type ViewCategoryItemsEdges {
    node: ViewCategoryDetails
    cursor: String
  }
  
  type ViewOwnerBrandItemsConnection {
    totalCount: Int
    edges: [ViewOwnerBrandItemsEdges]
    pageInfo: PageInfo!
  }

  type ViewAllCategoriesItemsConnection {
    totalCount: Int
    edges: [ViewCategoryItemsEdges]
    pageInfo: PageInfo!
  }

  type ViewOwnerBrandItems {
    brand: Brand
    brandItemsList: ViewOwnerBrandItemsConnection
  }

  type ViewAllCategories {
    brandItemsList: ViewAllCategoriesItemsConnection
  }

  extend type Mutation {
    addBrandItem(
      itemPrice: String!
      itemPriceDiscount: String!
      itemPriceCurrency: String!
      itemRemainder: String!
      itemImageOne: String!
      itemImageTwo: String!
      itemImageThree: String!
      location: [CoordinateInput!]!
      itemCategory: String!
      title: String!
      description: String!
      venue: String!
      subItemType: String
      startDate: Date!
      endDate: Date!
      itemType: String!
    ): ViewCategoryDetails!
  }

  extend type Query {
    viewOwnerBrandItemsList(first: Int, after: String, username: String!): ViewOwnerBrandItems!
    viewAllCategories(first: Int, after: String, category: String!): ViewAllCategories!
    viewSpecificItem(itemId: String): ViewCategoryDetails!
    viewAvailableItemsAllCategories(first: Int, after: String): ViewAllCategories!
  }
`;

export default CategoryTypeDef;
