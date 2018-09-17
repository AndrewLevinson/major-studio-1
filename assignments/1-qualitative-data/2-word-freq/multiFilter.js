// Credit: https://gist.github.com/jherax/f11d669ba286f21b7a2dcff69621eb72

/**
 * Filters an array of objects with multiple criteria.
 *
 * @param  {Array}  array: the array to filter
 * @param  {Object} filters: an object with the filter criteria as the property names
 * @return {Array}
 */
function multiFilter(array, filters) {
  const filterKeys = Object.keys(filters);
  // filters all elements passing the criteria
  return array.filter(item => {
    // dynamically validate all filter criteria
    return filterKeys.every(key => !!~filters[key].indexOf(item[key]));
  });
}
