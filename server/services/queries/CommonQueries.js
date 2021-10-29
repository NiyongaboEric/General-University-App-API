/**
 * @exports
 * @class CommonQueries
 */

class CommonQueries {
  /**
   * User can be able to find or create new data or user
   * @static
   * @param {object} table model chema
   * @param {object} query write custom query
   * @param {object} data data to
   * @memberof CommonQueries
   * @returns {object} data
  */

  static async findOrCreate(table, query, data) {
    const findOrCreate = await table.findOneAndUpdate(
      query,
      {
        $set: data,
      },
      {
        upsert: true,
        returnNewDocument: true,
        useFindAndModify: false,
        new: true,
      },
    );
    return findOrCreate;
  }

  /**
   * Find any field and return all associate data
   * @static
   * @param {object} table model chema
   * @param {object} query write custom query
   * @memberof CommonQueries
   * @returns {object} data
  */
  static async findAllByField(table, query) {
    const findItemByField = await table.find(query);
    return findItemByField;
  }

  /**
   * Create new record to database
   * @static
   * @param {object} table model chema
   * @param {object} data save new data
   * @memberof CommonQueries
   * @returns {object} data
  */
  static async createNewRecord(table, data) {
    const newRecord = await table.create(data);
    return newRecord;
  }

  /**
   * Find one matching record with combined associate table
   * @static
   * @param {object} table model schema
   * @param {object} query database query
   * @param {object} option save new data
   * @memberof CommonQueries
   * @returns {object} data
  */
  static async findOneByField(table, query, targetTable) {
    const result = await table.findOne(query).populate(targetTable);
    return result;
  }

  /**
   * Find one and update
   * @static
   * @param {object} table model schema
   * @param {object} query database query¸
   * @param {object} data database data
   * @memberof CommonQueries
   * @returns {object} data
  */
  static async findOneAndUpdate(table, query, data) {
    const result = await table.findOneAndUpdate(
      query,
      {
        $set: data,
      },
      {
        new: true,
        useFindAndModify: false,
      },
    );
    return result;
  }

  /**
   * Find one field only and return data
   * @static
   * @param {object} table model chema
   * @param {object} query write custom query
   * @memberof CommonQueries
   * @returns {object} data
  */
  static async findOne(table, query) {
    const result = await table.findOne(query);
    return result;
  }

  /**
   * Update an item in a table
   * @static
   * @param {object} table model schema
   * @param {object} query write custom query
   * @param {data} data update data
   * @memberof CommonQueries
   * @returns {object} data
  */
  static async UpdateItem(table, query, data) {
    const result = await table.updateOne(query, data);
    return result;
  }

  /**
   * Find deep of matching record for deep associated table
   * @static
   * @param {object} table model schema
   * @param {object} query database query
   * @param {object} deepPathTargetTable fetch deep associated table
   * @memberof CommonQueries
   * @returns {object} data
  */
  static async findDeepAssociatedTable(table, query, deepPathTargetTable) {
    const result = await table.findOne(query).populate(deepPathTargetTable);
    return result;
  }

  /**
   * Count items in any collection
   * @static
   * @param {object} table model schema
   * @param {object} query database query
   * @memberof CommonQueries
   * @returns {object} data
  */
  static async countAllItems(table, query) {
    const { field, value } = query;
    const countItemsCategory = await table.collection.countDocuments({ [field]: { $eq: value } });
    return countItemsCategory;
  }

  /**
   * Count total items in any collection
   * @static
   * @param {object} table model schema
   * @param {object} query database query
   * @memberof CommonQueries
   * @returns {object} data
  */
  static async countTotalItems(table) {
    const countItemsCategory = await table.collection.countDocuments();
    return countItemsCategory;
  }

  /**
   * Fetch more item of given data
   * @static
   * @param {object} table model schema
   * @param {object} cursorOpaque cursor is unique base 64 decoded opaque
   * @param {object} uniqueQuery query is to ensure result are specific and intended
   * @param {object} limit return the item size according to limit
   * @param {object} querySort sort retrieved items accordingly
   * @memberof CommonQueries
   * @returns {object} data
  */
  static async fetchMoreItems(table, cursorOpaque, uniqueQuery, limit, querySort) {
    const result = await table.find({
      _id: {
        $lt: cursorOpaque,
        $nin: [cursorOpaque],
      },
      [uniqueQuery.field]: { $eq: uniqueQuery.value },
    }).limit(limit).sort(querySort);
    return result;
  }

  /**
   * Fetch more item of given data
   * @static
   * @param {object} table model schema
   * @param {object} query query ensure result are specific and intended
   * @param {object} limit return the item size according to limit
   * @param {object} querySort sort retrieved items accordingly
   * @memberof CommonQueries
   * @returns {object} data
  */
  static async findLimitAndSort(table, query, limit, querySort) {
    const result = table.find(query).limit(limit).sort(querySort);
    return result;
  }

  /**
   * Fetch more item of given data
   * Find matching record for deep associated table
   * @static
   * @param {object} table model schema
   * @param {object} query query ensure result are specific and intended
   * @param {object} limit return the item size according to limit
   * @param {object} querySort sort retrieved items accordingly
   * @param {object} deepPathTargetTable fetch deep associated table
   * @memberof CommonQueries
   * @returns {object} data
  */
  static async findLimitAndSortAssociateTable(table, query, limit, querySort, deepPathTargetTable) {
    const result = table.find(query)
      .populate(deepPathTargetTable)
      .limit(limit)
      .sort(querySort);
    return result;
  }

  /**
   * Fetch more item of given data
   * Find matching record for deep associated table
   * @static
   * @param {object} table model schema
   * @param {object} cursorOpaque cursor is unique base 64 decoded opaque
   * @param {object} uniqueQuery query is to ensure result are specific and intended
   * @param {object} limit return the item size according to limit
   * @param {object} querySort sort retrieved items accordingly
   * @param {object} deepPathTargetTable fetch deep associated table
   * @memberof CommonQueries
   * @returns {object} data
  */

  static async fetchMoreItemsAssociateTable(
    table, cursorOpaque, uniqueQuery, limit, querySort, deepPathTargetTable,
  ) {
    const result = await table.find({
      _id: {
        $lt: cursorOpaque,
        $nin: [cursorOpaque],
      },
      [uniqueQuery.field]: { $eq: uniqueQuery.value },
    })
      .populate(deepPathTargetTable)
      .limit(limit)
      .sort(querySort);
    return result;
  }

  /**
   * Fetch more item of given data
   * @static
   * @param {object} table model schema
   * @param {object} query ensure result are specific and intended
   * @memberof CommonQueries
   * @returns {object} data
  */
  static async findaggregate(table, query) {
    const result = table.aggregate(query);
    return result;
  }
}

export default CommonQueries;
