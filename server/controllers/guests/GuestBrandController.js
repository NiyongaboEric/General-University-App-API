import GuestBrandService from '../../services/guest/GuestBrandService';
import Response from '../../helpers/Response';

/**
 * @exports
 * @class GuestBrandController
 */

class GuestBrandController {
  /**
   * Guest can be able to view all available brands
   * @static
   * @param {string} first size of pagination to fetch
   * @param {string} after cursor of last item to start from fetching
   * @memberof GuestBrandController
   * @returns {object} data
  */
  static async guestViewAvailableBrandItems(input) {
    try {
      const getAllAvailableItemsCategories = GuestBrandService.viewBrandAllItems(
        input,
      );
      return getAllAvailableItemsCategories;
    } catch (error) {
      return Response.errorCommonHandler(error);
    }
  }
}

export default GuestBrandController;
