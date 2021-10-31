import CategoryService from '../../services/CategoryService';
import Response from '../../helpers/Response';

/**
 * @exports
 * @class GuestCategoryController
 */

class GuestCategoryController {
  /**
   * Guest can be able to view all items of Brand with mixed categories
   * @static
   * @param {string} first size of pagination to fetch
   * @param {string} after cursor of last item to start from fetching
   * @memberof GuestCategoryController
   * @returns {object} data
  */
  static async guestViewCategoryBrandItems(input) {
    try {
      const addFieldValue = {
        field: 'itemStatus', value: 'accepted',
      };
      const newInput = input;
      newInput.queryCondition = addFieldValue;
      const getAllAvailableItemsCategories = CategoryService.viewCategoryBrandItems(
        newInput,
      );
      return getAllAvailableItemsCategories;
    } catch (error) {
      return Response.errorCommonHandler(error);
    }
  }
}

export default GuestCategoryController;
