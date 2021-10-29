import ChatService from '../services/ChatService';
import Response from '../helpers/Response';

/**
 * @exports
 * @class ChatController
 */

class ChatController {
  /**
   * Save new chat message
   * @static
   * @param {object} args should contain item, content, from
   * @param {object} authUser should contain current auth information
   * @param {object} pubsub should contain current redis pubsub
   * @memberof ChatController
   * @returns {object} object
   */
  static async sendMessage(args, authUser, pubsub) {
    try {
      const addNewMessage = await ChatService.sendMessage(args, authUser, pubsub);
      return addNewMessage;
    } catch (error) {
      return Response.errorCommonHandler(error);
    }
  }

  /**
   * View all chat message from service
   * @static
   * @param {object} args should contain first, after and item
   * @memberof ChatController
   * @returns {object} object
   */
  static async getMessages(args) {
    try {
      const viewMessages = await ChatService.getMessages(args);
      return viewMessages;
    } catch (error) {
      return Response.errorCommonHandler(error);
    }
  }
}

export default ChatController;
