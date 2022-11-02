/**
 * Exclude keys from object
 * @param {Object} filterObj Object to filter
 * @param  {...string} removeKeys Keys to remove from object
 * @example
 * objectFilter({name: "peter", age: 10, bug: 0}, "bug")
 */
const objectFilter = function (filterObj, ...removeKeys) {
  // 1). Make a copy of filterObj
  const copiedFilterObj = { ...filterObj };

  // 2. Remove keys from copiedFilterObj
  removeKeys.forEach((key) => delete copiedFilterObj[key]);

  // 3. Return copiedFilterObj
  return copiedFilterObj;
};

module.exports = { objectFilter };
