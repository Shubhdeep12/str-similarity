const levenshtein = (Str1, Str2) => {
  if (Str1.length == 0) return Str2.length;
  if (Str2.length == 0) return Str1.length;

  var matrix = [];

  // increment along the first column of each row
  var i;
  for (i = 0; i <= Str2.length; i++) {
    matrix[i] = [i];
  }

  // increment each column in the first row
  var j;
  for (j = 0; j <= Str1.length; j++) {
    matrix[0][j] = j;
  }

  // Fill in the rest of the matrix
  for (i = 1; i <= Str2.length; i++) {
    for (j = 1; j <= Str1.length; j++) {
      if (Str2.charAt(i - 1) == Str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          Math.min(
            matrix[i][j - 1] + 1, // insertion
            matrix[i - 1][j] + 1
          )
        ); // deletion
      }
    }
  }

  return matrix[Str2.length][Str1.length];
};

/*
COSINE SIMILARITY
*/

const termFreqMap = (str) => {
  var words = str.split(" ");
  var termFreq = {};
  words.forEach(function (w) {
    termFreq[w] = (termFreq[w] || 0) + 1;
  });
  return termFreq;
};

const addKeysToDict = (map, dict) => {
  for (var key in map) {
    dict[key] = true;
  }
};

const termFreqMapToVector = (map, dict) => {
  var termFreqVector = [];
  for (var term in dict) {
    termFreqVector.push(map[term] || 0);
  }
  return termFreqVector;
};

const vecDotProduct = (vecA, vecB) => {
  var product = 0;
  for (var i = 0; i < vecA.length; i++) {
    product += vecA[i] * vecB[i];
  }
  return product;
};

const vecMagnitude = (vec) => {
  var sum = 0;
  for (var i = 0; i < vec.length; i++) {
    sum += vec[i] * vec[i];
  }
  return Math.sqrt(sum);
};

const cosineSimilarity = (vecA, vecB) => {
  return vecDotProduct(vecA, vecB) / (vecMagnitude(vecA) * vecMagnitude(vecB));
};
const textCosineSimilarity = (strA, strB) => {
  var termFreqA = termFreqMap(strA);
  var termFreqB = termFreqMap(strB);

  var dict = {};
  addKeysToDict(termFreqA, dict);
  addKeysToDict(termFreqB, dict);

  var termFreqVecA = termFreqMapToVector(termFreqA, dict);
  var termFreqVecB = termFreqMapToVector(termFreqB, dict);

  return cosineSimilarity(termFreqVecA, termFreqVecB);
};

/*

*/

const JaroWrinker = (s1, s2) => {
  var m = 0;

  // Exit early if either are empty.
  if (s1.length === 0 || s2.length === 0) {
    return 0;
  }

  // Exit early if they're an exact match.
  if (s1 === s2) {
    return 1;
  }

  var range = Math.floor(Math.max(s1.length, s2.length) / 2) - 1,
    s1Matches = new Array(s1.length),
    s2Matches = new Array(s2.length);

  for (i = 0; i < s1.length; i++) {
    var low = i >= range ? i - range : 0,
      high = i + range <= s2.length ? i + range : s2.length - 1;

    for (j = low; j <= high; j++) {
      if (s1Matches[i] !== true && s2Matches[j] !== true && s1[i] === s2[j]) {
        ++m;
        s1Matches[i] = s2Matches[j] = true;
        break;
      }
    }
  }

  // Exit early if no matches were found.
  if (m === 0) {
    return 0;
  }

  // Count the transpositions.
  var k = (n_trans = 0);

  for (i = 0; i < s1.length; i++) {
    if (s1Matches[i] === true) {
      for (j = k; j < s2.length; j++) {
        if (s2Matches[j] === true) {
          k = j + 1;
          break;
        }
      }

      if (s1[i] !== s2[j]) {
        ++n_trans;
      }
    }
  }

  var weight = (m / s1.length + m / s2.length + (m - n_trans / 2) / m) / 3,
    l = 0,
    p = 0.1;

  if (weight > 0.7) {
    while (s1[l] === s2[l] && l < 4) {
      ++l;
    }

    weight = weight + l * p * (1 - weight);
  }

  return weight;
};

module.exports = {
  levenshtein: levenshtein,
  cosine: textCosineSimilarity,
  jaroWrinker: JaroWrinker,
};
