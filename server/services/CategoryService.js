/* eslint-disable no-underscore-dangle */
import CommonQueries from './queries/CommonQueries';
import CategoryModel from '../models/category';
import Response from '../helpers/Response';
import ProfileService from './ProfileService';
import BrandService from './BrandService';
import {
  profileNotCreatedMessage,
  brandNotCreatedMessage,
  noItemFoundMessage,
  firstNotNegativeMessage,
} from '../constants/messages';
import { newItemBrandTarget, categoryBrandTarget } from '../constants/queries';
import Pagination from '../helpers/pagination';

/**
 * @exports
 * @class CategoryService
 */

class CategoryService {
  /**
   * Owner can be able to add item to brand
   * @static
   * @param {object} data brand data
   * @memberof CategoryService
   * @returns {object} data
  */
  static async addNewItem(data, authUser) {
    const { _id: userId } = authUser;
    const newData = data;
    const getProfile = await ProfileService.getUserProfile(userId);
    if (!getProfile) {
      return Response.errorCommonHandler(profileNotCreatedMessage);
    }
    const { _id: profileId } = getProfile;
    const getBrand = await BrandService.getBrand({ profile: profileId });
    if (!getBrand) {
      return Response.errorCommonHandler(brandNotCreatedMessage);
    }
    const { brand: { _id: brandId } } = getBrand;
    newData.brand = brandId;
    const { _id: itemId } = await CommonQueries.createNewRecord(CategoryModel, newData);
    const query = { _id: itemId };
    const newItemAddedInfo = await CategoryService.getItem(query);

    const brand = {
      username: newItemAddedInfo.items.brand.username,
    };
    const profile = {
      profileImage: newItemAddedInfo.items.brand.profile.profileImage,
    };
    const category = {
      itemPrice: newItemAddedInfo.items.itemPrice,
      itemPriceDiscount: newItemAddedInfo.items.itemPriceDiscount,
      itemPriceCurrency: newItemAddedInfo.items.itemPriceCurrency,
      itemRemainder: newItemAddedInfo.items.itemRemainder,
      itemImageOne: newItemAddedInfo.items.itemImageOne,
      itemImageTwo: newItemAddedInfo.items.itemImageTwo,
      itemImageThree: newItemAddedInfo.items.itemImageThree,
      location: newItemAddedInfo.items.location,
      itemCategory: newItemAddedInfo.items.itemCategory,
      title: newItemAddedInfo.items.title,
      description: newItemAddedInfo.items.description,
      venue: newItemAddedInfo.items.venue,
      subItemType: newItemAddedInfo.items.subItemType,
      startDate: newItemAddedInfo.items.startDate,
      endDate: newItemAddedInfo.items.endDate,
      itemType: newItemAddedInfo.items.itemType,
      itemStatus: newItemAddedInfo.items.itemStatus,
      itemComment: newItemAddedInfo.items.itemComment,
      publicId: newItemAddedInfo.items.publicId,
    };

    return {
      brand,
      profile,
      category,
    };
  }

  /**
  * owner can be able to view item info
  * @static
  * @param {object} query item query
  * @memberof CategoryService
  * @returns {object} data
  */

  static async getItem(query) {
    const targetPath = newItemBrandTarget;
    const addedItemInfo = await CommonQueries
      .findDeepAssociatedTable(CategoryModel, query, targetPath);
    if (!addedItemInfo) {
      return noItemFoundMessage;
    }
    const hideInfo = {
      items: {
        ...addedItemInfo._doc,
        brand: {
          ...addedItemInfo._doc.brand._doc,
          profile: {
            ...addedItemInfo._doc.brand._doc.profile._doc,
            user: {
              ...addedItemInfo._doc.brand._doc.profile._doc.user._doc,
              password: null,
              token: null,
              _id: null,
            },
          },
        },
      },
    };
    return hideInfo;
  }

  /**
   * User and owner can be able to view all items of Brand by given any category type
   * @static
   * @param {string} first size of pagination to fetch
   * @param {string} after cursor of last item to start from fetching
   * @param {string} field fetch in database by using the provided field
   * @memberof CategoryService
   * @returns {object} data
  */
  static async viewCategoryBrandItems(input) {
    const { first, after } = input;
    const limit = first || 5;
    if (limit < 0) {
      return Response.errorCommonHandler(firstNotNegativeMessage);
    }
    const totalCount = await CommonQueries.countAllItems(
      CategoryModel, {
        field: input.queryCondition.field,
        value: input.queryCondition.value,
      },
    );
    const expectedOutputFormat = (connectionData) => ({
      brandItemsList: connectionData,
    });

    if (after) {
      const fetchWithoutAfterResult = await Pagination
        .fetchCategoryWithAfterAssociateTable(
          after, CategoryModel, {
            field: input.queryCondition.field,
            value: input.queryCondition.value,
          },
          limit,
          { _id: -1 },
          totalCount, '_id',
          expectedOutputFormat, newItemBrandTarget,
        );
      return fetchWithoutAfterResult;
    }
    const fetchWithoutAfterResult = await Pagination
      .fetchCategoryWithoutAfterAssociateTable(
        CategoryModel, {
          [input.queryCondition.field]: input.queryCondition.value,
        }, limit, { _id: -1 },
        totalCount, '_id', expectedOutputFormat,
        newItemBrandTarget,
      );
    return fetchWithoutAfterResult;
  }

  /**
   * User and owner can be able to view specific item of Brand according to any category
   * @static
   * @param {string} id use id to fetch data from database
   * @memberof CategoryService
   * @returns {object} data
  */
  static async viewSpecificItemBrandCategory(id) {
    const query = { publicId: id };
    const fetchItem = await CommonQueries.findDeepAssociatedTable(
      CategoryModel, query, categoryBrandTarget,
    );
    if (!fetchItem) {
      return Response.errorCommonHandler(noItemFoundMessage);
    }
    const data = {
      category: {
        ...fetchItem._doc,
        brand: null,
      },
      brand: {
        ...fetchItem._doc.brand._doc,
      },
    };
    return data;
  }
}

export default CategoryService;
