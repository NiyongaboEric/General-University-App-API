import { isAuthenticateMessage } from '../../constants/messages';
import ChatController from '../../controllers/ChatController';

export const GetMessages = (_, args) => {
  const viewMessages = ChatController.getMessages(args);
  return viewMessages;
};

export const SendMessage = (parent, args, context) => {
  const { user: authUser, pubsub } = context;
  if (!authUser) {
    return Response.errorAuthHandler(isAuthenticateMessage);
  }
  const saveMessage = ChatController.sendMessage(args, authUser, pubsub);
  return saveMessage;
};
