import {
  GetUserProfile,
} from './profile';
import {
  LogoutUser,
} from './users';
import {
  CreateProfile,
} from '../mutation/profile';
import { PhoneVerification } from '../mutation/phoneVerification';
import { CreateBrand } from '../mutation/brand';
import { appSubscriptions } from '../subscription/index';
import { AddBrandItem } from '../mutation/category';
import {
  GetUserBrand,
  GetOwnerItemBrand,
  ViewAllAvailableBrands,
} from './brand';
import {
  ViewAllCategories,
  viewCategorySpecificItem,
  ViewAvailableItemsAllCategories,
} from './category';
import { GetMessages, SendMessage } from './chat';

const resolvers = {
  Query: {
    getUserProfile: GetUserProfile,
    logoutUser: LogoutUser,
    viewBrand: GetUserBrand,
    viewOwnerBrandItemsList: GetOwnerItemBrand,
    viewAllCategories: ViewAllCategories,
    viewSpecificItem: viewCategorySpecificItem,
    getMessages: GetMessages,
    viewAvailableItemsAllCategories: ViewAvailableItemsAllCategories,
    viewAllAvailableBrands: ViewAllAvailableBrands,
  },
  Mutation: {
    createProfile: CreateProfile,
    phoneVerification: PhoneVerification,
    createBrand: CreateBrand,
    addBrandItem: AddBrandItem,
    sendMessage: SendMessage,
  },
  Subscription: appSubscriptions,
};

export default resolvers;
