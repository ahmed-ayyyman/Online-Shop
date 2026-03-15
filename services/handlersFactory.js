const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const ApiError = require("../utils/apiError");
const ApiFeatures = require("../utils/apiFeatures");

exports.getAll = (Model, modelName, populateOpts) =>
  asyncHandler(async (req, res) => {
    // Allow nested route filters (e.g. subcategories under a category)
    let initialFilter = {};
    if (req.filterObj) initialFilter = req.filterObj;

    const features = new ApiFeatures(Model.find(initialFilter), req.query)
      .filter()
      .search(modelName)
      .sort()
      .limitFields()
      .paginate();

    if (populateOpts)
      features.mongooseQuery = features.mongooseQuery.populate(populateOpts);

    const { page, limit } = features.paginationResult;

    const [documents, totalResults] = await Promise.all([
      features.mongooseQuery,
      Model.countDocuments({ ...initialFilter, ...features.filterObj }),
    ]);

    res.status(200).json({
      results: documents.length,
      totalResults,
      totalPages: Math.ceil(totalResults / limit),
      page,
      data: documents,
    });
  });

exports.getOne = (Model, populateOpts) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    let query = Model.findById(id);
    if (populateOpts) query = query.populate(populateOpts);

    const document = await query;
    if (!document) {
      return next(new ApiError(`No document for this ID: ${id}`, 404));
    }
    res.status(200).json({ data: document });
  });

exports.createOne = (Model) =>
  asyncHandler(async (req, res) => {
    if (req.body.name) req.body.slug = slugify(req.body.name);
    const document = await Model.create(req.body);
    res.status(201).json({ data: document });
  });

exports.updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    if (req.body.name) req.body.slug = slugify(req.body.name);

    const document = await Model.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!document) {
      return next(new ApiError(`No document for this ID: ${id}`, 404));
    }
    res.status(200).json({ data: document });
  });

exports.deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findByIdAndDelete(id);
    if (!document) {
      return next(new ApiError(`No document for this ID: ${id}`, 404));
    }
    res.status(204).send();
  });
