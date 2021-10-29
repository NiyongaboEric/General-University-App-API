/* eslint-disable import/prefer-default-export */
import { withFilter } from 'graphql-subscriptions';
import * as eventNames from '../../constants/subscription/eventNames';

const { PHONE_VERIFICATION_EVENT } = eventNames;

export const phoneVerified = {
  subscribe: withFilter(
    (parent, args, { pubsub }) => pubsub.asyncIterator(PHONE_VERIFICATION_EVENT),
    (payload, args) => payload.phoneVerified.publicId === args.publicId,
  ),
};
