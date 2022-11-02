// Utils
const objectFilter = require("./objectFilter");

/**
 * Request Utility Methods
 * @class
 */
class ApiFeatures {
  /**
   * @constructor
   * @param {Object} query Mongoose query object
   * @param {Object} queryStr Request query param
   * @param {number} totalDocuments Total number of document
   */
  constructor(query, queryStr, totalDocuments) {
    this.query = query;
    this.queryStr = queryStr;
  }

  /**
   * Perform Filtering On Model
   */
  filter() {
    // 1). Exclude fields in queryStr
    const newQueryStr = objectFilter(
      this.queryStr,
      "sort",
      "limit",
      "page",
      "fields"
    );

    // 2). Perform advanced filtering
    const queryStr = JSON.parse(
      JSON.stringify(newQueryStr).replaceAll(
        /\b(gt|gte|le|lte)\b/g,
        (matched) => `$${matched}`
      )
    );

    // 3) Perform filtering
    this.query = this.query.find(queryStr);
  }

  /**
   * Perform Sorting On Model
   */
  sort() {
    if (this.queryStr.sort) {
      const sortBy = this.queryStr.sort.replaceAll(",", " ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdBy");
    }
  }

  /**
   * Select Fields In Model
   */
  limitFields() {
    if (this.queryStr.fields) {
      const fields = this.queryStr.fields.replaceAll(",", " ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }
  }

  /**
   * Perform Pagination On Model
   */
  paginate() {
    const limit = this.queryStr.limit || 100;
    const page = this.queryStr.page || 1;
    const totalPage = Math.ceil(this.totalDocuments / limit);
    const skip = (page - 1) * limit;
    const next = totalPage && page !== totalPage ? page + 1 : null;
    const prev = page > 1 ? page - 1 : null;

    // 1). Perform pagination
    this.query = this.query.skip(skip).limit(limit);

    // 2). Add pagination details
    this.paging = {
      currentPage: page,
      next,
      prev,
      totalPage,
      totalDocs: this.totalDocuments,
    };
  }
}

module.exports = { ApiFeatures };
