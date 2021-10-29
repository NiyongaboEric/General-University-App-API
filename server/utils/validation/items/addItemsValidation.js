/* eslint-disable import/prefer-default-export */
import Joi from '@hapi/joi';
import { isImageValid } from '../../../helpers/validation';


export const isAddBrandItemValid = (input) => {
  const schema = Joi.object({
    itemPrice: Joi.number().min(0).required(),
    itemPriceDiscount: Joi.number().min(0).required(),
    itemPriceCurrency: Joi.string().required(),
    itemRemainder: Joi.string().required(),
    itemImageOne: Joi.string().uri().required(),
    itemImageTwo: Joi.string().uri().required(),
    itemImageThree: Joi.string().uri().required(),
    location: Joi.array().items(
      Joi.object().keys({
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
      }),
    ),
    itemCategory: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    venue: Joi.string().required(),
    subItemType: Joi.string().allow(''),
    startDate: Joi.date().iso().required(),
    endDate: Joi.date().iso().min(Joi.ref('startDate')),
    itemType: Joi.string().required(),
  });

  const { error } = schema.validate(input, { abortEarly: false });
  return error;
};

export const isItemImageValid = (args) => {
  const errors = {};
  if (!isImageValid(args.itemImageOne)) {
    errors.imageOne = 'Image one is not valid';
  }
  if (!isImageValid(args.itemImageTwo)) {
    errors.imageTwo = 'Image two is not valid';
  }
  if (!isImageValid(args.itemImageThree)) {
    errors.imageThree = 'Image three is not valid';
  }
  return Object.values(errors);
};
