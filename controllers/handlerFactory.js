// Utils
const { catchAsync, AppError, ApiFeatures } = require("../utils");

/**
 * Get Single Document
 * @param {Object} Model Mongoose model
 * @param {string} docName Document name
 * @param {Object} populate Populate ref fields
 */
const getOne = (Model, docName = "doc", populate) =>
  catchAsync(async (req, res, next) => {
    // 1) Create Query
    let query = Model.findById(req.params.id);

    // 2) Chain populate method to query, if populate param is set
    if (populate) {
      query = query.populate(populate);
    }

    // 3) Get document
    const doc = await query;

    // 4) If document is empty, then throw error
    if (!doc)
      throw new AppError(`${docName} with the specified id do not exist`, 404);

    // 5) Send response
    res.status(200).json({ status: "success", data: { [docName]: doc } });
  });

/**
 * Get All Documents
 * @param {Object} Model Mongoose model
 * @param {string} docName Document name
 * @param {Object} populate Populate ref fields
 */
const getAll = (Model, docName = "docs", populate) =>
  catchAsync(async (req, res, next) => {
    // 1). Chain important query methods
    const apiFeatures = new ApiFeatures(
      Model.find(),
      req.query,
      await Model.countDocuments()
    );

    // 2). Chain populate method to query, if populate param is set
    if (populate) {
      apiFeatures.query = apiFeatures.query.populate(populate);
    }

    // 3). Get documents
    const docs = await apiFeatures.query;

    // 4). Send response
    res
      .status(200)
      .json({
        status: "success",
        data: { [docName]: docs, paging: apiFeatures.paging },
      });
  });

/**
 * Create Single/Multiple Document
 * @param {Object} Model Mongoose model
 * @param {string} docName Document name
 */
const createOne = (Model, docName = "doc") =>
  catchAsync(async (req, res, next) => {
    // 1). Create document
    const doc = await Model.create(req.body);

    // 2). Send response
    res.status(201).json({ status: "success", data: { [docName]: doc } });
  });

/**
 * Update Single Document
 * @param {Object} Model Mongoose model
 * @param {string} docName Document name
 */
const updateOne = (Model, docName = "doc") =>
  catchAsync(async (req, res, next) => {
    // 1). Get document and update
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    // 2). Throw error, if document is empty
    if (!doc)
      throw new AppError(`${docName} with the specified id do not exist`);

    // 3). Send response
    res.status(200).json({ status: "success", data: { [docName]: doc } });
  });

/**
 * Delete Single Document
 * @param {Object} Model Mongoose model
 * @param {string} docName Document name
 */
const deleteOne = (Model, docName = "doc") =>
  catchAsync(async (req, res, next) => {
    // 1). Get document and delete
    const doc = await Model.findByIdAndDelete(req.params.id);

    // 2). Throw error, if document is empty
    if (!doc)
      throw new AppError(`${docName} with the specified id do not exist`);

    // 3). Send response
    res.status(204).json({ status: "success", data: null });
  });

module.exports = { getOne, getAll, createOne, updateOne, deleteOne };
