import BrandService from '../services/BrandService';
import Response from '../helpers/Response';

/**
 * @exports
 * @class BrandController
 */

class BrandController {
  /**
   * We can save new user brand
   * @static
   * @param {object} brandInfo should contain username, coverPhoto, userLocation
   * @param {object} brandInfo should contain ownerContact, witnessContactOne, witnessContactTwo
   * @memberof BrandController
   * @returns {object} object
   */
  static async createBrand(brandInfo) {
    try {
      const addNewBrand = await BrandService.createBrand(brandInfo);
      return addNewBrand;
    } catch (error) {
      return Response.errorCommonHandler(error);
    }
  }

  /**
   * User can be able to view Brand
   * @static
   * @param {object} args brand data
   * @memberof BrandService
   * @returns {object} data
  */

  static async viewBrand(args) {
    try {
      const { username } = args;
      const getUserBrand = BrandService.viewBrand(username);
      return getUserBrand;
    } catch (error) {
      return Response.errorCommonHandler(error);
    }
  }

  /**
   * User and owner can be able to view all items of Brand
   * @static
   * @param {object} input user brand argument
   * @memberof BrandService
   * @returns {object} data
  */
  static async viewBrandAllItems(input) {
    try {
      const getAllItems = BrandService.viewBrandAllItems(input);
      return getAllItems;
    } catch (error) {
      return Response.errorCommonHandler(error);
    }
  }
}

export default BrandController;
