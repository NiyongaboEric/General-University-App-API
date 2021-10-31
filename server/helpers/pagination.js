// import Mongoose from 'mongoose';
// import { encodeBase64, decodeBase64 } from './encodeDecodeBase64';
// import CommonQueries from '../services/queries/CommonQueries';
// import Response from './Response';
// import {
//   afterIsNotValidMessage,
// } from '../constants/messages';
// import { viewCategorySplitResultIntoFormat } from './paginationFormat';

// /**
//  * @exports
//  * @class Pagination
//  */

// class Pagination {
//   /**
//    * Display pagination result in cursor format
//    * @static
//    * @param {object} totalCount total items
//    * @param {object} edges data
//    * @param {object} endCursor next cursor
//    * @param {object} hasNextPage next page
//    * @memberof Pagination
//    * @returns {object} data
//   */
//   static cursorFormat(totalCount, edges, endCursor, hasNextPage) {
//     return {
//       totalCount,
//       edges,
//       pageInfo: {
//         endCursor,
//         hasNextPage,
//       },
//     };
//   }

//   /**
//    * Display pagination result in cursor format
//    * @static
//    * @param {object} data found data
//    * @param {object} target cursor target
//    * @memberof Pagination
//    * @returns {object} data
//   */
//   static combineEdges(data, target) {
//     const newEdge = data.map((item) => {
//       const cursor = encodeBase64(`${item[target]}`);
//       return {
//         node: item,
//         cursor,
//       };
//     });
//     return newEdge;
//   }

//   /**
//    * Display end cursor from edges
//    * @static
//    * @param {object} data edges data
//    * @memberof Pagination
//    * @returns {object} data
//   */
//   static endCursor(data) {
//     const { cursor } = data[data.length - 1];
//     return cursor;
//   }

//   /**
//    * Decide to continue to next page or stop
//    * @static
//    * @param {object} data edges data
//    * @memberof Pagination
//    * @returns {object} data
//   */
//   static hasNextPage(edges, first) {
//     if (edges.length >= first) {
//       return true;
//     }
//     return false;
//   }

//   /**
//    * Return fetched result
//    * @static
//    * @param {object} listItems fetched data from database
//    * @param {object} targetOpaque target next cursor
//    * @param {object} first limit size
//    * @param {object} totalCount total result
//    * @memberof Pagination
//    * @returns {object} data
//   */
//   static fetchedItems(listItems, targetOpaque, first, totalCount) {
//     const edges = Pagination.combineEdges(listItems, targetOpaque);
//     const endCursor = Pagination.endCursor(edges);
//     const hasNextPage = Pagination.hasNextPage(edges, first);
//     const foundItems = Pagination.cursorFormat(totalCount, edges, endCursor, hasNextPage);
//     return foundItems;
//   }

//   /**
//    * Return fetched without after
//    * @static
//    * @param {object} anyModel fetched data from database by using any item model
//    * @param {object} uniqueQuery fetched data from database by using unique item id
//    * @param {object} limit fetched data from database and limit to specific size
//    * @param {object} querySort fetched data from database and sort it accordingly
//    * @param {object} totalCount count total item size from database
//    * @param {object} targetCursor specify cursor opaque
//    * @param {object} outputExpectedFormatFunc return output in requested format
//    * @memberof Pagination
//    * @returns {object} data
//   */
//   static async fetchWithoutAfter(
//     anyModel, uniqueQuery, limit, querySort, totalCount, targetCursor, outputExpectedFormatFunc,
//   ) {
//     const fetchItems = await CommonQueries.findLimitAndSort(
//       anyModel, uniqueQuery, limit, querySort,
//     );
//     if (fetchItems.length === 0) {
//       const emptyItems = Pagination.cursorFormat(totalCount, [], null, false);
//       return outputExpectedFormatFunc(emptyItems);
//     }
//     const initialFetch = Pagination.fetchedItems(fetchItems, targetCursor, limit, totalCount);
//     return outputExpectedFormatFunc(initialFetch);
//   }

//   /**
//    * Return fetched without after
//    * @static
//    * @param {object} after base 64 opaque cursor to find next items
//    * @param {object} anyModel fetched data from database by using any item model
//    * @param {object} uniqueQuery fetched data from database by using unique item id
//    * @param {object} limit fetched data from database and limit to specific size
//    * @param {object} querySort fetched data from database and sort it accordingly
//    * @param {object} totalCount count total item size from database
//    * @param {object} targetCursor specify cursor opaque
//    * @param {object} outputExpectedFormatFunc return output in requested format
//    * @memberof Pagination
//    * @returns {object} data
//   */
//   static async fetchWithAfter(
//     after, anyModel, uniqueQuery, limit, sortQuery,
//     totalCount, targetCursor, outputExpectedFormatFunc,
//   ) {
//     const cursorDecoded = decodeBase64(after);
//     const isAfterValid = Mongoose.Types.ObjectId.isValid(cursorDecoded);

//     if (!isAfterValid) {
//       return Response.errorCommonHandler(afterIsNotValidMessage);
//     }
//     const fetchMoreItems = await CommonQueries.fetchMoreItems(
//       anyModel, cursorDecoded, uniqueQuery, limit, sortQuery,
//     );
//     if (fetchMoreItems.length === 0) {
//       const emptyItems = Pagination.cursorFormat(totalCount, [], null, false);
//       return outputExpectedFormatFunc(emptyItems);
//     }
//     const fetchedMoreItems = Pagination.fetchedItems(
//       fetchMoreItems, targetCursor, limit, totalCount,
//     );
//     return outputExpectedFormatFunc(fetchedMoreItems);
//   }

//   /**
//    * Return fetched without after
//    * Combine associate table
//    * @static
//    * @param {object} anyModel fetched data from database by using any item model
//    * @param {object} uniqueQuery fetched data from database by using unique item id
//    * @param {object} limit fetched data from database and limit to specific size
//    * @param {object} querySort fetched data from database and sort it accordingly
//    * @param {object} totalCount count total item size from database
//    * @param {object} targetCursor specify cursor opaque
//    * @param {object} outputExpectedFormatFunc return output in requested format
//    * @param {object} deepPathTargetTable path to get associated table
//    * @memberof Pagination
//    * @returns {object} data
//   */
//   static async fetchCategoryWithoutAfterAssociateTable(
//     anyModel, uniqueQuery, limit, querySort,
//     totalCount, targetCursor, outputExpectedFormatFunc,
//     deepPathTargetTable,
//   ) {
//     const fetchItems = await CommonQueries.findLimitAndSortAssociateTable(
//       anyModel, uniqueQuery, limit, querySort, deepPathTargetTable,
//     );
//     if (fetchItems.length === 0) {
//       const emptyItems = Pagination.cursorFormat(totalCount, [], null, false);
//       return outputExpectedFormatFunc(emptyItems);
//     }
//     const fetchFormat = viewCategorySplitResultIntoFormat(fetchItems);
//     const initialFetch = Pagination.fetchedItems(fetchFormat, targetCursor, limit, totalCount);
//     return outputExpectedFormatFunc(initialFetch);
//   }

//   /**
//    * Return fetched without after
//    * Combine associate table
//    * @static
//    * @param {object} after base 64 opaque cursor to find next items
//    * @param {object} anyModel fetched data from database by using any item model
//    * @param {object} uniqueQuery fetched data from database by using unique item id
//    * @param {object} limit fetched data from database and limit to specific size
//    * @param {object} querySort fetched data from database and sort it accordingly
//    * @param {object} totalCount count total item size from database
//    * @param {object} targetCursor specify cursor opaque
//    * @param {object} outputExpectedFormatFunc return output in requested format
//    * @param {object} deepPathTargetTable path to get associated table
//    * @memberof Pagination
//    * @returns {object} data
//   */
//   static async fetchCategoryWithAfterAssociateTable(
//     after, anyModel, uniqueQuery, limit, sortQuery,
//     totalCount, targetCursor, outputExpectedFormatFunc,
//     deepPathTargetTable,
//   ) {
//     const cursorDecoded = decodeBase64(after);
//     const isAfterValid = Mongoose.Types.ObjectId.isValid(cursorDecoded);

//     if (!isAfterValid) {
//       return Response.errorCommonHandler(afterIsNotValidMessage);
//     }
//     const fetchMoreItems = await CommonQueries.fetchMoreItemsAssociateTable(
//       anyModel, cursorDecoded, uniqueQuery, limit, sortQuery,
//       deepPathTargetTable,
//     );
//     if (fetchMoreItems.length === 0) {
//       const emptyItems = Pagination.cursorFormat(totalCount, [], null, false);
//       return outputExpectedFormatFunc(emptyItems);
//     }
//     const fetchFormat = viewCategorySplitResultIntoFormat(fetchMoreItems);
//     const fetchedMoreItems = Pagination.fetchedItems(
//       fetchFormat, targetCursor, limit, totalCount,
//     );
//     return outputExpectedFormatFunc(fetchedMoreItems);
//   }

//   /**
//    * Return fetched items without after
//    * Combine associate table
//    * @static
//    * @param {object} anyModel fetched data from database by using any item model
//    * @param {object} query fetched data from database by using provided query
//    * @param {object} totalCount count total item size from database
//    * @param {object} targetCursor specify cursor opaque
//    * @param {object} limit fetched data from database and limit to specific size
//    * @param {object} outputExpectedFormatFunc return output in requested format
//    * @param {object} execQuery get the database query to be executed
//    * @param {object} viewSplitResultIntoFormat format fetched result data into specific format
//    * @memberof Pagination
//    * @returns {object} data
//   */
//   static async fetchItemsWithoutAfter(
//     anyModel, query, totalCount, targetCursor,
//     limit, outputExpectedFormatFunc,
//     execQuery, viewSplitResultIntoFormat,
//   ) {
//     const fetchItems = await execQuery(anyModel, query);
//     if (fetchItems.length === 0) {
//       const emptyItems = Pagination.cursorFormat(totalCount, [], null, false);
//       return outputExpectedFormatFunc(emptyItems);
//     }
//     const fetchFormat = viewSplitResultIntoFormat(fetchItems);
//     const initialFetch = Pagination.fetchedItems(fetchFormat, targetCursor, limit, totalCount);
//     return outputExpectedFormatFunc(initialFetch);
//   }

//   /**
//    * Return fetched messages with after
//    * Combine associate table
//    * @static
//    * @param {object} anyModel fetched data from database by using any item model
//    * @param {object} query fetched data from database by using provided query
//    * @param {object} totalCount count total item size from database
//    * @param {object} targetCursor specify cursor opaque
//    * @param {object} limit fetched data from database and limit to specific size
//    * @param {object} after fetched data from last coursel item
//    * @param {object} outputExpectedFormatFunc return output in requested format
//    * @param {object} execQuery get the database query to be executed
//    * @param {object} viewSplitResultIntoFormat format fetched result data into specific format
//    * @memberof Pagination
//    * @returns {object} data
//   */
//   static async fetchItemsWithAfter(
//     anyModel, query, totalCount, targetCursor,
//     limit, after, outputExpectedFormatFunc,
//     execQuery, viewSplitResultIntoFormat,
//   ) {
//     const cursorDecoded = decodeBase64(after);
//     const isAfterValid = Mongoose.Types.ObjectId.isValid(cursorDecoded);
//     if (!isAfterValid) {
//       return Response.errorCommonHandler(afterIsNotValidMessage);
//     }
//     const fetchMoreItems = await execQuery(anyModel, query);
//     if (fetchMoreItems.length === 0) {
//       const emptyItems = Pagination.cursorFormat(totalCount, [], null, false);
//       return outputExpectedFormatFunc(emptyItems);
//     }
//     const fetchFormat = viewSplitResultIntoFormat(fetchMoreItems);
//     const fetchedMoreItems = Pagination.fetchedItems(
//       fetchFormat, targetCursor, limit, totalCount,
//     );
//     return outputExpectedFormatFunc(fetchedMoreItems);
//   }
// }

// export default Pagination;
