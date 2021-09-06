# str-similarity

- Reference:- <a href="https://sumn2u.medium.com/string-similarity-comparision-in-js-with-examples-4bae35f13968">Click here</a>

### Description

<p>
<em>
Hi, this library can help you to find string similarity using various types of Algorithms.
<br>
<br>
Till now Algorithms used are:

- Levenshtein Algorithm
- Cosine Similarity
- Jaro-Winkler Algorithm
</em>
</p>

<br>
<br>

### How to implement

- For using Levenshtein Algorithm
<p>
<em>
Since the Levenshtein Distance is the minimum number of single character edit require to make both the Strings equal.

Here is the code required to implement the code
</em>

</p>

```javascript
const strSimilarity = require("str-similarity");

console.log(
  strSimilarity.levenshtein("Hi my name is John", "Hi my name is Mary")
);
```

<br>
<br>

- For using Cosine Similarity Algorithm
<p>
<em>
Cosine Similarity is a measure of similarity between two non-zero vectors of an inner product space.
Cosine Similarity between two sentences can be found as a dot product of their vector representation. There are various ways to represent sentences/paragraphs as vectors.

Here is the code required to implement the code
</em>

</p>

```javascript
const strSimilarity = require("str-similarity");

console.log(strSimilarity.cosine("Hi my name is John", "Hi my name is Mary"));
```

<br>
<br>

- For using Jaro-Winkler Algorithm
<p>
<em>
Jaro distance between two words is the minimum number of single-character transpositions required to change one word into the other.

Here is the code required to implement the code
</em>

</p>

```javascript
const strSimilarity = require("str-similarity");

console.log(
  strSimilarity.jaroWrinker("Hi my name is John", "Hi my name is Mary")
);
```
