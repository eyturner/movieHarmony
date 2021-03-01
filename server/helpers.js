const createGenreString = (genres) => {
  let genreString = ''
  genres.forEach(genre => [
    genreString += genre + '|'
  ])
  genreString = genreString.slice(0, -1)
  return genreString + '&vote_average.gte=6.5&vote_count.gte=1000&primary_release_date.gte=1999-01-01&with_original_language=en'
}

//following 2 functions taken from: https://dmitripavlutin.com/how-to-compare-objects-in-javascript/
const isObject = (object) => {
  return object != null && typeof object === 'object'
}

const deepEqual = (object1, object2) => {
  const keys1 = Object.keys(object1)
  const keys2 = Object.keys(object2)

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    const val1 = object1[key];
    const val2 = object2[key];
    const areObjects = isObject(val1) && isObject(val2);
    if (
      areObjects && !deepEqual(val1, val2) ||
      !areObjects && val1 !== val2
    ) {
      return false;
    }
  }
  return true;
}

module.exports = { createGenreString, deepEqual }