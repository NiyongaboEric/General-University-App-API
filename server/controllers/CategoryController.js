import CategoryService from '../services/CategoryService';
import Response from '../helpers/Response';

/**
 * @exports
 * @class CategoryController
 */

class CategoryController {
  /**
   * Owner add item to brand
   * @static
   * @param {object} data should contain incoming data
   * @param {object} authUser should contain current auth data
   * @memberof CategoryController
   * @returns {object} object
   */
  static async addBrandItem(data, authUser) {
    try {
      const addNewItem = CategoryService.addNewItem(data, authUser);
      return addNewItem;
    } catch (error) {
      return Response.errorCommonHandler(error);
    }
  }

  /**
   * User and owner can be able to view all items of Brand according to any category
   * @static
   * @param {string} first size of pagination to fetch
   * @param {string} after cursor of last item to start from fetching
   * @param {string} field fetch in database by using the provided field
   * @memberof CategoryService
   * @returns {object} data
  */
  static async viewCategoryBrandItems(input) {
    try {
      const newInput = input;
      const addFieldValue = {
        field: 'itemCategory', value: input.field,
      };
      newInput.queryCondition = addFieldValue;
      const getAllItemsByCategory = CategoryService.viewCategoryBrandItems(input);
      return getAllItemsByCategory;
    } catch (error) {
      return Response.errorCommonHandler(error);
    }
  }

  /**
   * User and owner can be able to view specific item of Brand according to any category
   * @static
   * @param {string} id use id to fetch data from database
   * @memberof CategoryService
   * @returns {object} data
  */
  static async viewCategorySpecificItemBrand(id) {
    try {
      const getSpecificItemCategory = CategoryService.viewSpecificItemBrandCategory(id);
      return getSpecificItemCategory;
    } catch (error) {
      return Response.errorCommonHandler(error);
    }
  }
}

export default CategoryController;
