const createGenreString = (genres) => {
  let genreString = '&with_genres='
  genres.forEach(genre => [
    genreString += genre + '|'
  ])
  genreString = genreString.slice(0, -1)
  return genreString
}

// yearRange[0] is earliest year, yearRange[1] is most recent year
const createYearString = (yearRange) => `&primary_release_date.gte=${yearRange[0].toString() + '-01-01' || '1900-01-01'}&primary_release_date.lte=${yearRange[1].toString() + '-01-01' || new Date().getFullYear() + '-01-01'}`

const createLanguageString = (langCode) => `&with_original_language=${langCode}`

const createSearchString = (genres, yearRange, langCode) => createGenreString(genres) + createYearString(yearRange) + createLanguageString(langCode) + '&vote_average.gte=6.5&vote_count.gte=1000'

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

module.exports = { createSearchString, deepEqual }