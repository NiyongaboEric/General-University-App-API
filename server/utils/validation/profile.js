/* eslint-disable import/prefer-default-export */
import Joi from '@hapi/joi';

export const isProfileValid = (input) => {
  const schema = Joi.object().keys({
    firstName: Joi.string().trim().required(),
    lastName: Joi.string().trim().required(),
    gender: Joi.string().valid('male', 'female', 'private').trim().allow(''),
    jobPosition: Joi.string().trim().allow(''),
    address: Joi.string().trim().allow(''),
    phoneNumber: Joi.string().trim().allow(''),
    profileImage: Joi.string().trim().uri().allow(''),
  });

  const result = schema.validate(input, { abortEarly: false });
  return result;
};
