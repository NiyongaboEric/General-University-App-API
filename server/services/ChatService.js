import { v4 as uuidv4 } from 'uuid';
import mongoose from 'mongoose';
import Response from '../helpers/Response';
import CommonQueries from './queries/CommonQueries';
import CategoryModel from '../models/category';
import ProfileModel from '../models/profile';
import MessageModel from '../models/message';
import Pagination from '../helpers/pagination';
import {
  categoryBrandTarget,
  profileUserTarget,
} from '../constants/queries';
import {
  noContentMessage, noItemFoundMessage,
  usernameNotFoundMessage, profileNotCreatedMessage, firstNotNegativeMessage,
} from '../constants/messages';
import {
  decodeBase64,
} from '../helpers/encodeDecodeBase64';
import * as eventNames from '../constants/subscription/eventNames';
import { viewMessageSplitResultIntoFormat } from '../helpers/paginationFormat';
/**
 * @exports
 * @class ChatService
 */


class ChatService {
  /**
   * Save sent message into database
   * @static
   * @param {object} args should contain item, content and from
   * @param {object} authUser should contain current auth information
   * @param {object} pubsub should contain current redis pubsub
   * @memberof ChatService
   * @returns {object} data
  */
  static async sendMessage(args, authUser, pubsub) {
    const senderQuery = {
      user: authUser._id,
    };
    const itemQuery = {
      publicId: args.item,
    };
    if (args.content.trim() === '') {
      return Response.errorInputHandler(noContentMessage);
    }
    const isItem = await CommonQueries.findOneByField(
      CategoryModel, itemQuery, categoryBrandTarget,
    );
    if (!isItem) {
      return Response.errorInputHandler(noItemFoundMessage);
    }
    if (isItem.brand.username !== args.username) {
      return Response.errorInputHandler(usernameNotFoundMessage);
    }
    const isProfile = await CommonQueries.findOneByField(
      ProfileModel, senderQuery, profileUserTarget,
    );
    if (!isProfile) {
      return Response.errorInputHandler(profileNotCreatedMessage);
    }
    const data = {
      publicId: uuidv4(),
      content: args.content,
      from: isProfile.user._id,
      to: isItem.brand._id,
      item: isItem._id,
    };
    const saveNewmessage = await CommonQueries.createNewRecord(MessageModel, data);
    const result = {
      getMessage: {
        message: {
          publicId: saveNewmessage.publicId,
          content: saveNewmessage.content,
          createdAt: saveNewmessage.createdAt,
          item: isItem.publicId,
          from: isProfile.user.publicId,
          to: isItem.brand.username,
        },
        brand: {
          username: isItem.brand.username,
        },
        profile: {
          firstName: isProfile.firstName,
          lastName: isProfile.lastName,
          profileImage: isProfile.profileImage,
        },
        user: {
          publicId: authUser.publicId,
        },
      },
    };
    pubsub.publish(eventNames.VIEW_CHAT_MESSAGE_EVENT, result);
    return result.getMessage;
  }

  /**
   * User and owner can be able to view all message of an item given id
   * @static
   * @param {string} first size of pagination to fetch
   * @param {string} after cursor of last item to start from fetching
   * @param {string} item fetch item from database by using the item id
   * @memberof CategoryService
   * @returns {object} data
  */
  static async getMessages(args) {
    const { first, after, item } = args;
    const limit = first || 10;
    if (limit < 0) {
      return Response.errorCommonHandler(firstNotNegativeMessage);
    }
    const itemQuery = {
      publicId: item,
    };

    const isItem = await CommonQueries.findOneByField(
      CategoryModel, itemQuery, categoryBrandTarget,
    );

    if (!isItem) {
      return Response.errorInputHandler(noItemFoundMessage);
    }

    const messageQuery = {
      item: isItem._id,
    };

    const totalCount = await CommonQueries.countAllItems(
      MessageModel, { field: 'item', value: messageQuery.item },
    );

    const expectedOutputFormat = (connectionData) => ({
      ...connectionData,
    });

    const fetchMessageQuery = [
      {
        $match: {
          item: messageQuery.item,
        },
      },
      {
        $lookup: {
          from: 'brands',
          localField: 'to',
          foreignField: '_id',
          as: 'brand',
        },
      },
      {
        $lookup: {
          from: 'profiles',
          localField: 'from',
          foreignField: 'user',
          as: 'profile',
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'from',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $sort: {
          _id : -1,
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
            item: messageQuery.item,
            _id: {
              $lt: convertCursorToObjectId,
              $nin: [convertCursorToObjectId],
            },
          },
        },
        {
          $lookup: {
            from: 'brands',
            localField: 'to',
            foreignField: '_id',
            as: 'brand',
          },
        },
        {
          $lookup: {
            from: 'profiles',
            localField: 'from',
            foreignField: 'user',
            as: 'profile',
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'from',
            foreignField: '_id',
            as: 'user',
          },
        },
        {
          $sort: {
            _id : -1,
          },
        },
        {
          $limit: limit,
        },
      ];
      const fetchWithAfterResult = await Pagination.fetchItemsWithAfter(
        MessageModel, fetchMoreMessageQuery, totalCount,
        '_id', limit, after, expectedOutputFormat,
        CommonQueries.findaggregate,
        viewMessageSplitResultIntoFormat,
      );
      return fetchWithAfterResult;
    }

    const fetchWithoutAfterResult = await Pagination.fetchItemsWithoutAfter(
      MessageModel, fetchMessageQuery, totalCount,
      '_id', limit, expectedOutputFormat,
      CommonQueries.findaggregate,
      viewMessageSplitResultIntoFormat,
    );
    return fetchWithoutAfterResult;
  }
}

export default ChatService;
