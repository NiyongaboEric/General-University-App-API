/* eslint-disable no-underscore-dangle */
import CommonQueries from './queries/CommonQueries';
import {
  usernameAlreadyTaken,
  usernameNotFoundMessage,
  firstNotNegativeMessage,
} from '../constants/messages';
import Response from '../helpers/Response';
import BrandModel from '../models/brand';
import CategoryModel from '../models/category';
import { newBrandTarget } from '../constants/queries';
import Pagination from '../helpers/pagination';

/**
 * @exports
 * @class BrandService
 */

class BrandService {
  /**
   * User can be able to create brand
   * @static
   * @param {object} data brand data
   * @memberof BrandService
   * @returns {object} data
  */
  static async createBrand(data) {
    const { username } = data;
    const isUserNameTaken = await CommonQueries.findOne(BrandModel, { username });
    if (isUserNameTaken) {
      return Response.errorInputHandler(usernameAlreadyTaken);
    }
    const { _id: brandId } = await CommonQueries.createNewRecord(BrandModel, data);
    // query
    const query = { _id: brandId };
    const newBrandInfo = await BrandService.getBrand(query);
    const brand = {
      userLocation: newBrandInfo.brand.userLocation,
      brandName: newBrandInfo.brand.brandName,
      username: newBrandInfo.brand.username,
      coverPhoto: newBrandInfo.brand.coverPhoto,
      ownerContact: newBrandInfo.brand.ownerContact,
      witnessContactOne: newBrandInfo.brand.witnessContactOne,
      witnessContactTwo: newBrandInfo.brand.witnessContactTwo,
    };
    const profile = {
      profileImage: newBrandInfo.brand.profile.profileImage,
    };
    const result = {
      brand,
      profile,
    };
    return result;
  }

  /**
   * User can be able to get Brand
   * @static
   * @param {object} brandId brand data
   * @memberof BrandService
   * @returns {object} data
  */
  static async getBrand(query) {
    const targetPath = newBrandTarget;
    const newBrandInfo = await CommonQueries
      .findDeepAssociatedTable(BrandModel, query, targetPath);
    if (!newBrandInfo) {
      return newBrandInfo;
    }
    const hideInfo = {
      brand: {
        ...newBrandInfo._doc,
        profile: {
          ...newBrandInfo._doc.profile._doc,
          user: {
            ...newBrandInfo._doc.profile._doc.user._doc,
            password: null,
            token: null,
            _id: null,
          },
        },
      },
    };
    return hideInfo;
  }

  /**
   * User can be able to view Brand
   * @static
   * @param {object} username brand data
   * @memberof BrandService
   * @returns {object} data
  */
  static async viewBrand(username) {
    const query = { username };
    const result = await BrandService.getBrand(query);
    if (!result) {
      return {
        brand: null,
        profile: null,
      };
    }
    const brand = {
      userLocation: result.brand.userLocation,
      brandName: result.brand.brandName,
      username: result.brand.username,
      coverPhoto: result.brand.coverPhoto,
      category: result.brand.category,
      ownerContact: result.brand.ownerContact,
      witnessContactOne: result.brand.witnessContactOne,
      witnessContactTwo: result.brand.witnessContactTwo,
    };
    const profile = {
      profileImage: result.brand.profile.profileImage,
    };
    const brandResult = {
      brand,
      profile,
    };
    return brandResult;
  }

  /**
   * User and owner can be able to view all items of Brand
   * @static
   * @param {string} first size of pagination to fetch
   * @param {string} after cursor of last item to start from fetching
   * @param {string} field fetch in database by using the provided field
   * @memberof BrandService
   * @returns {object} data
  */
  static async viewBrandAllItems(input) {
    const { first, after, field: username } = input;
    const isBrandExist = await BrandService.isBrandExist(username);
    if (!isBrandExist) {
      return Response.errorCommonHandler(usernameNotFoundMessage);
    }
    const { _id: brandId } = isBrandExist;
    const limit = first || 5;
    if (limit < 0) {
      return Response.errorCommonHandler(firstNotNegativeMessage);
    }
    const totalCount = await CommonQueries.countAllItems(
      CategoryModel, { field: 'brand', value: brandId },
    );
    const expectedOutputFormat = (connectionData) => ({
      brand: {
        username,
      },
      brandItemsList: connectionData,
    });

    if (after) {
      const fetchWithoutAfterResult = await Pagination.fetchWithAfter(
        after, CategoryModel, { field: 'brand', value: brandId }, limit, { _id: -1 },
        totalCount, '_id', expectedOutputFormat,
      );
      return fetchWithoutAfterResult;
    }
    const fetchWithoutAfterResult = await Pagination.fetchWithoutAfter(
      CategoryModel, { brand: brandId }, limit, { _id: -1 },
      totalCount, '_id', expectedOutputFormat,
    );
    return fetchWithoutAfterResult;
  }

  /**
   * Verify user brand
   * @static
   * @param {object} username brand data
   * @memberof BrandService
   * @returns {object} data
  */
  static async isBrandExist(username) {
    const query = { username };
    const isUsername = await CommonQueries.findOne(BrandModel, query);
    return isUsername;
  }
}

export default BrandService;
