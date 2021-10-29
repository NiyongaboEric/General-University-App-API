/**
 * @export
 * @class StyleSimilarObject
 */
class StyleSimilarObject {
  /**
    * destruct data from any object
    * @static
    * @param {object} data data object
    * @memberof StyleSimilarObject
    * @returns {object} desired object
    */
  static destructAndReturnAnyObject(data, fields) {
    const combineData = {};
    fields.map((item) => {
      if (item in data) {
        combineData[item] = data[item];
      }
      return combineData;
    });
    return combineData;
  }
}

export default StyleSimilarObject;
