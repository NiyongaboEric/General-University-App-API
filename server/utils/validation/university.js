import Validator, { buildCheckFunction } from 'express-validator';

export const createUniversity = (req, res, next) => {
	const { body } = req;
	buildCheckFunction
	console.log("====================================>", body);
	return next();
};
