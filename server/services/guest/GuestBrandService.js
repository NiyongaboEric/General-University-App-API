/* eslint-disable no-underscore-dangle */
import mongoose from 'mongoose';
import CommonQueries from '../queries/CommonQueries';
import Response from '../../helpers/Response';
import Pagination from '../../helpers/pagination';
import BrandModel from '../../models/brand';
import {
  firstNotNegativeMessage,
} from '../../constants/messages';
import {
  decodeBase64,
} from '../../helpers/encodeDecodeBase64';
import { viewBrandSplitResultIntoFormat } from '../../helpers/paginationFormat';


/**
 * @exports
 * @class GuestBrandService
 */

class GuestBrandService {
  /**
   * Guest can be able to view all available brands
   * @static
   * @param {string} first size of pagination to fetch
   * @param {string} after cursor of last item to start from fetching
   * @memberof GuestBrandService
   * @returns {object} data
  */
  static async viewBrandAllItems(args) {
    const { first, after } = args;
    const limit = first || 10;
    if (limit < 0) {
      return Response.errorCommonHandler(firstNotNegativeMessage);
    }
    const expectedOutputFormat = (connectionData) => ({
      AllAvailableBrands: connectionData,
    });
    const totalCount = await CommonQueries.countTotalItems(BrandModel);


    const fetchMessageQuery = [
      {
        $lookup: {
          from: 'profiles',
          localField: 'profile',
          foreignField: '_id',
          as: 'profile',
        },
      },
      {
        $sort: {
          _id: -1,
        },
      },
      {
        $limit: limit,
      },
    ];

    if (after) {
      const cursorDecoded = decodeBase64(after);
      const convertCursorToObjectId = mongoose.Types.ObjectId(cursorDecoded);
      const fetchMoreMessageQuery = [
        {
          $match: {
            _id: {
              $lt: convertCursorToObjectId,
              $nin: [convertCursorToObjectId],
            },
          },
        },
        {
          $lookup: {
            from: 'profiles',
            localField: 'profile',
            foreignField: '_id',
            as: 'profile',
          },
        },
        {
          $sort: {
            _id: -1,
          },
        },
        {
          $limit: limit,
        },
      ];
      const fetchWithAfterResult = await Pagination.fetchItemsWithAfter(
        BrandModel, fetchMoreMessageQuery, totalCount,
        '_id', limit, after, expectedOutputFormat,
        CommonQueries.findaggregate,
        viewBrandSplitResultIntoFormat,
      );
      return fetchWithAfterResult;
    }

    const fetchWithoutAfterResult = await Pagination.fetchItemsWithoutAfter(
      BrandModel, fetchMessageQuery, totalCount,
      '_id', limit, expectedOutputFormat,
      CommonQueries.findaggregate,
      viewBrandSplitResultIntoFormat,
    );
    return fetchWithoutAfterResult;
  }
}

export default GuestBrandService;
