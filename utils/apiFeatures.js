class ApiFeatures {
  constructor(mongooseQuery, queryString) {
    this.mongooseQuery = mongooseQuery;
    this.queryString = queryString;
  }

  filter() {
    const queryStringObj = { ...this.queryString };
    const excludedFields = ["page", "limit", "sort", "fields", "keyword"];

    excludedFields.forEach((field) => delete queryStringObj[field]);

    let queryStr = JSON.stringify(queryStringObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    const filterObj = queryStr && queryStr !== "{}" ? JSON.parse(queryStr) : {};
    this.mongooseQuery = this.mongooseQuery.find(filterObj);
    return this;
  }

  search() {
    if (this.queryString.keyword) {
      const keyword = this.queryString.keyword;
      const searchRegex = { $regex: keyword, $options: "i" };
      const searchCond = {
        $or: [{ name: searchRegex }, { description: searchRegex }],
      };

      // Merge search condition with any existing filters on the query.
      const currentFilter = this.mongooseQuery.getQuery() || {};
      let mergedFilter = {};
      if (Object.keys(currentFilter).length === 0) {
        mergedFilter = searchCond;
      } else {
        mergedFilter = { $and: [currentFilter, searchCond] };
      }

      this.mongooseQuery = this.mongooseQuery.find(mergedFilter);
    }
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.sort(sortBy);
    } else {
      this.mongooseQuery = this.mongooseQuery.sort("-createdAt");
    }
    return this;
  }

  fields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.select(fields);
    } else {
      this.mongooseQuery = this.mongooseQuery.select("-__v");
    }
    return this;
  }

  paginate() {
    const page = parseInt(this.queryString.page, 10) || 1;
    const limit = parseInt(this.queryString.limit, 10) || 10;
    const skip = (page - 1) * limit;
    this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);
    return this;
  }
}

module.exports = ApiFeatures;
