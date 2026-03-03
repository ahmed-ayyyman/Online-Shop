const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const ApiFeatures = require("../utils/apiFeatures");

exports.deleteOne = (Model) => {
  return asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findByIdAndDelete(id);
    if (!document) {
      return next(new ApiError(`No document for this ID: ${id}`, 404));
    }
    // Per HTTP spec, 204 No Content must not include a response body
    res.status(204).send();
  });
};

exports.updateOne = (Model, populateOptions) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    let document = await Model.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!document)
      return next(new ApiError(`No document for this ID: ${id}`, 404));
    if (populateOptions) await document.populate(populateOptions);
    res.status(200).json({ data: document });
  });

exports.createOne = (Model, populateOptions) =>
  asyncHandler(async (req, res, next) => {
    const document = await Model.create(req.body);
    if (populateOptions) await document.populate(populateOptions);
    res.status(201).json({ data: document });
  });

exports.getOne = (Model, populateOptions) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    let query = Model.findById(id);
    if (populateOptions) query = query.populate(populateOptions);
    const document = await query;
    if (!document)
      return next(new ApiError(`No document for this ID: ${id}`, 404));
    res.status(200).json({ data: document });
  });

exports.getAll = (Model, populateOptions) =>
  asyncHandler(async (req, res, next) => {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;

    // Allow passing an initial filter via `req.filter` (e.g., nested routes)
    const filter = req.filter || {};

    const features = new ApiFeatures(Model.find(filter), req.query)
      .filter()
      .search()
      .sort()
      .fields()
      .paginate();

    if (populateOptions)
      features.mongooseQuery = features.mongooseQuery.populate(populateOptions);

    const docsPromise = features.mongooseQuery;
    const countFeatures = new ApiFeatures(Model.find(filter), req.query)
      .filter()
      .search();
    const totalResultsPromise = countFeatures.mongooseQuery.countDocuments();

    const [docs, totalResults] = await Promise.all([
      docsPromise,
      totalResultsPromise,
    ]);

    res.status(200).json({
      results: docs.length,
      totalResults,
      totalPages: Math.ceil(totalResults / limit),
      page,
      data: docs,
    });
  });
