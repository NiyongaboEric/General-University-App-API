// import {
//   AuthenticationError,
//   UserInputError,
//   ApolloError,
//   SchemaError,
// } from 'apollo-server-express';

// /**
//  * @exports
//  * @class Response
// */
// class Response {
//   /**
//    * @static
//    * @param {message} message custom authenticate message error
//    * @returns {Error} object
//   */
//   static errorAuthHandler(message) {
//     throw new AuthenticationError(message);
//   }

//   /**
//    * @static
//    * @param {message} input custom input message error
//    * @returns {Error} object
//   */
//   static errorInputHandler(message, property) {
//     throw new UserInputError(message, property);
//   }

//   /**
//    * @static
//    * @param {message} request custom message error
//    * @returns {Error} object
//   */
//   static errorCommonHandler(message) {
//     throw new ApolloError(message);
//   }

//   /**
//    * @static
//    * @param {message} request custom scheme error
//    * @returns {Error} object
//   */
//   static errorSchemeHandler(message) {
//     throw new SchemaError(message);
//   }
// }

// export default Response;
