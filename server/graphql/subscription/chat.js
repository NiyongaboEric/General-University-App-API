/* eslint-disable import/prefer-default-export */
import { withFilter } from 'graphql-subscriptions';
import * as eventNames from '../../constants/subscription/eventNames';

const { VIEW_CHAT_MESSAGE_EVENT } = eventNames;

export const getMessage = {
  subscribe: withFilter(
    (parent, args, { pubsub }) => pubsub.asyncIterator(VIEW_CHAT_MESSAGE_EVENT),
    (payload, args) => payload.getMessage.message.item === args.item,
  ),
};
