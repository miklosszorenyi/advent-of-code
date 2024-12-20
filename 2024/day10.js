const { uniq } = require("lodash");

const test_input = [
  [8, 9, 0, 1, 0, 1, 2, 3],
  [7, 8, 1, 2, 1, 8, 7, 4],
  [8, 7, 4, 3, 0, 9, 6, 5],
  [9, 6, 5, 4, 9, 8, 7, 4],
  [4, 5, 6, 7, 8, 9, 0, 3],
  [3, 2, 0, 1, 9, 0, 1, 2],
  [0, 1, 3, 2, 9, 8, 0, 1],
  [1, 0, 4, 5, 6, 7, 3, 2],
];

const final_input = [
  [3, 2, 1, 0, 2, 1, 0, 9, 2, 1, 2, 1, 2, 3, 4, 7, 8, 9, 8, 3, 2, 1, 0, 3, 2, 1, 4, 3, 2, 1, 0, 0, 6, 5, 4, 1, 0, 1, 0, 1, 3, 2, 1, 0, 6, 5, 4, 1, 0, 1, 7, 6, 5, 4, 3, 0, 0],
  [4, 3, 8, 9, 3, 4, 7, 8, 3, 0, 1, 0, 3, 4, 5, 6, 7, 6, 5, 4, 3, 3, 4, 5, 3, 0, 5, 4, 5, 3, 2, 1, 7, 4, 3, 2, 1, 8, 7, 2, 3, 3, 4, 7, 7, 8, 3, 2, 0, 1, 8, 9, 8, 0, 2, 1, 1],
  [5, 6, 7, 0, 1, 5, 6, 5, 4, 5, 0, 1, 2, 9, 6, 4, 8, 9, 4, 1, 0, 2, 5, 6, 4, 5, 6, 5, 6, 9, 3, 4, 8, 9, 4, 5, 0, 9, 6, 5, 4, 4, 9, 8, 6, 9, 1, 0, 1, 2, 9, 8, 7, 1, 2, 3, 2],
  [4, 5, 6, 7, 2, 3, 1, 2, 3, 4, 5, 6, 9, 8, 7, 3, 3, 4, 3, 2, 0, 1, 0, 7, 5, 6, 7, 6, 7, 8, 7, 5, 8, 9, 9, 6, 8, 9, 8, 5, 5, 5, 6, 7, 8, 9, 0, 1, 2, 3, 6, 7, 8, 9, 5, 4, 3],
  [3, 0, 9, 8, 5, 4, 0, 1, 0, 9, 8, 7, 1, 0, 6, 2, 1, 2, 4, 3, 0, 1, 9, 8, 4, 3, 8, 7, 3, 4, 3, 6, 7, 9, 8, 7, 5, 6, 7, 4, 5, 6, 9, 6, 7, 4, 3, 2, 5, 4, 5, 2, 1, 0, 6, 9, 2],
  [2, 1, 9, 7, 6, 4, 1, 1, 0, 8, 9, 9, 2, 3, 4, 3, 0, 2, 3, 4, 1, 2, 3, 4, 3, 2, 9, 7, 6, 5, 2, 1, 0, 8, 0, 3, 4, 5, 6, 3, 2, 7, 8, 7, 6, 5, 4, 5, 6, 9, 4, 3, 5, 6, 7, 8, 1],
  [0, 7, 8, 7, 4, 3, 2, 1, 1, 8, 9, 8, 7, 6, 5, 6, 7, 1, 2, 9, 6, 5, 4, 1, 0, 1, 7, 8, 9, 1, 0, 1, 0, 7, 1, 2, 9, 8, 7, 8, 1, 8, 7, 6, 0, 1, 7, 6, 7, 8, 3, 5, 4, 3, 4, 9, 0],
  [1, 6, 5, 4, 3, 0, 3, 0, 2, 3, 4, 5, 6, 1, 0, 9, 8, 0, 3, 8, 7, 6, 5, 2, 1, 3, 2, 1, 6, 9, 1, 2, 5, 6, 2, 1, 0, 7, 6, 9, 0, 9, 8, 5, 9, 2, 8, 5, 4, 3, 2, 8, 9, 2, 1, 0, 1],
  [2, 3, 4, 3, 2, 1, 4, 5, 9, 6, 5, 4, 3, 2, 4, 3, 4, 1, 4, 5, 5, 6, 7, 8, 9, 2, 3, 0, 7, 8, 4, 3, 4, 0, 1, 8, 5, 6, 5, 0, 1, 2, 3, 4, 8, 3, 9, 6, 5, 0, 1, 7, 8, 3, 0, 3, 0],
  [9, 6, 5, 0, 7, 8, 9, 6, 8, 7, 6, 7, 8, 6, 5, 2, 1, 0, 5, 6, 4, 5, 4, 3, 0, 1, 4, 5, 6, 8, 7, 4, 2, 1, 0, 9, 4, 1, 0, 9, 8, 3, 4, 6, 7, 4, 8, 7, 6, 4, 5, 6, 5, 4, 1, 2, 1],
  [8, 7, 0, 1, 6, 5, 6, 7, 8, 6, 5, 4, 9, 7, 8, 1, 0, 9, 6, 3, 4, 3, 3, 2, 1, 2, 5, 9, 8, 9, 6, 5, 3, 4, 7, 8, 3, 2, 1, 4, 7, 4, 3, 2, 6, 5, 7, 6, 5, 4, 6, 5, 5, 3, 2, 3, 9],
  [7, 4, 3, 2, 3, 4, 5, 8, 9, 6, 2, 3, 0, 8, 9, 2, 3, 8, 7, 2, 3, 7, 6, 5, 2, 2, 3, 6, 7, 8, 7, 6, 4, 5, 6, 9, 4, 3, 6, 5, 6, 5, 0, 1, 5, 9, 6, 1, 0, 3, 8, 7, 6, 4, 5, 4, 8],
  [6, 5, 8, 9, 2, 1, 0, 5, 6, 7, 1, 2, 1, 0, 9, 8, 4, 1, 0, 1, 4, 8, 9, 4, 0, 1, 4, 5, 6, 9, 6, 5, 5, 2, 3, 4, 5, 8, 7, 6, 5, 2, 1, 0, 3, 8, 7, 6, 1, 2, 9, 8, 5, 5, 6, 9, 7],
  [0, 6, 7, 8, 7, 6, 5, 4, 9, 8, 0, 3, 4, 5, 8, 9, 5, 8, 9, 6, 5, 0, 2, 3, 7, 8, 9, 0, 1, 2, 3, 4, 5, 1, 0, 5, 6, 9, 8, 5, 0, 1, 2, 1, 2, 3, 6, 5, 0, 1, 2, 3, 4, 2, 7, 8, 6],
  [1, 4, 9, 9, 8, 9, 0, 3, 4, 1, 0, 4, 5, 6, 7, 5, 6, 7, 8, 7, 4, 1, 1, 2, 6, 3, 2, 1, 0, 1, 4, 3, 7, 6, 5, 6, 7, 8, 7, 4, 3, 2, 3, 2, 3, 4, 5, 3, 2, 1, 0, 0, 3, 1, 2, 4, 5],
  [2, 3, 8, 7, 0, 1, 1, 2, 3, 2, 3, 4, 7, 8, 9, 8, 1, 0, 9, 8, 3, 2, 0, 1, 5, 4, 3, 6, 5, 4, 3, 2, 8, 9, 4, 1, 0, 9, 5, 4, 6, 7, 6, 5, 4, 5, 3, 4, 5, 0, 9, 1, 2, 0, 4, 3, 0],
  [3, 4, 5, 6, 3, 2, 0, 1, 0, 3, 4, 5, 6, 5, 4, 3, 2, 1, 0, 1, 2, 3, 1, 7, 1, 2, 3, 7, 8, 8, 9, 1, 1, 0, 3, 2, 8, 7, 6, 3, 3, 8, 9, 4, 3, 2, 1, 0, 6, 7, 8, 9, 2, 1, 2, 2, 1],
  [7, 6, 5, 6, 4, 3, 1, 0, 1, 2, 3, 4, 9, 8, 3, 4, 9, 8, 7, 6, 5, 4, 9, 8, 0, 1, 4, 6, 9, 7, 8, 0, 2, 1, 2, 3, 9, 4, 3, 2, 2, 3, 4, 5, 8, 9, 0, 1, 0, 9, 8, 8, 3, 4, 5, 6, 9],
  [8, 9, 4, 3, 5, 6, 9, 0, 9, 8, 7, 5, 6, 7, 6, 5, 4, 3, 0, 3, 4, 5, 6, 7, 7, 6, 5, 6, 5, 6, 5, 4, 3, 1, 1, 2, 3, 1, 0, 1, 1, 0, 5, 6, 7, 8, 1, 2, 3, 4, 7, 7, 2, 1, 6, 7, 8],
  [0, 1, 8, 2, 4, 7, 8, 1, 2, 3, 6, 5, 8, 8, 9, 8, 3, 2, 1, 0, 3, 0, 7, 7, 8, 9, 6, 5, 7, 8, 9, 8, 7, 0, 0, 3, 4, 5, 1, 5, 4, 1, 4, 7, 6, 9, 0, 5, 4, 5, 6, 4, 3, 0, 5, 4, 9],
  [3, 2, 9, 1, 0, 6, 3, 2, 1, 4, 5, 8, 9, 8, 1, 0, 1, 8, 2, 1, 2, 1, 8, 6, 9, 8, 7, 1, 0, 7, 8, 3, 2, 1, 2, 8, 7, 6, 5, 4, 3, 4, 9, 8, 5, 8, 7, 6, 9, 6, 5, 5, 0, 1, 2, 3, 2],
  [4, 7, 8, 9, 0, 5, 4, 5, 0, 1, 2, 3, 4, 7, 2, 7, 8, 9, 5, 6, 7, 0, 9, 5, 0, 1, 1, 0, 1, 6, 5, 4, 1, 2, 8, 9, 8, 9, 2, 1, 2, 5, 6, 7, 6, 7, 6, 7, 8, 7, 4, 6, 1, 0, 5, 4, 1],
  [5, 6, 5, 2, 1, 0, 5, 6, 7, 0, 1, 2, 5, 6, 3, 6, 6, 5, 4, 9, 8, 1, 4, 4, 3, 2, 2, 1, 2, 3, 4, 5, 0, 1, 5, 6, 7, 0, 1, 0, 1, 0, 0, 6, 5, 3, 6, 7, 8, 2, 3, 7, 8, 9, 6, 7, 0],
  [9, 8, 4, 3, 0, 3, 4, 9, 8, 7, 8, 1, 0, 1, 4, 5, 7, 2, 3, 0, 1, 2, 3, 8, 9, 8, 3, 2, 1, 0, 7, 6, 1, 0, 4, 3, 2, 1, 4, 0, 1, 2, 1, 5, 3, 4, 5, 6, 9, 1, 0, 4, 3, 2, 9, 8, 7],
  [6, 7, 6, 5, 4, 2, 1, 8, 7, 6, 9, 2, 1, 2, 5, 9, 8, 1, 0, 1, 9, 3, 4, 5, 6, 7, 4, 5, 2, 9, 8, 3, 2, 9, 8, 0, 1, 2, 3, 7, 2, 3, 4, 7, 2, 3, 4, 7, 2, 3, 4, 5, 6, 1, 0, 9, 8],
  [7, 0, 1, 4, 1, 0, 0, 9, 6, 5, 8, 3, 4, 5, 5, 8, 5, 0, 1, 2, 8, 5, 4, 3, 2, 6, 5, 6, 7, 8, 7, 4, 5, 6, 7, 9, 6, 5, 4, 8, 7, 4, 7, 8, 1, 2, 9, 8, 1, 0, 0, 6, 7, 8, 1, 2, 1],
  [8, 9, 2, 3, 2, 3, 8, 2, 3, 4, 9, 6, 5, 6, 6, 7, 6, 7, 8, 1, 7, 6, 1, 0, 1, 2, 1, 0, 6, 0, 1, 2, 3, 4, 9, 8, 7, 6, 5, 9, 6, 5, 6, 9, 0, 1, 0, 7, 3, 2, 1, 7, 8, 9, 0, 3, 0],
  [7, 6, 5, 2, 1, 4, 9, 1, 0, 7, 8, 7, 6, 6, 5, 0, 1, 6, 9, 0, 1, 0, 0, 1, 4, 3, 8, 9, 0, 1, 2, 9, 8, 5, 6, 7, 5, 4, 3, 8, 7, 6, 2, 1, 2, 3, 4, 6, 4, 9, 6, 5, 7, 6, 5, 4, 3],
  [5, 6, 4, 3, 0, 5, 8, 0, 7, 8, 7, 9, 8, 5, 4, 3, 2, 5, 0, 1, 2, 3, 1, 2, 5, 6, 7, 6, 5, 2, 3, 4, 7, 3, 4, 5, 6, 7, 2, 1, 0, 4, 3, 0, 1, 4, 5, 4, 5, 8, 7, 4, 3, 2, 6, 5, 6],
  [6, 7, 8, 9, 8, 6, 7, 0, 6, 9, 8, 7, 7, 6, 3, 4, 3, 4, 3, 2, 5, 4, 9, 3, 4, 9, 8, 7, 4, 3, 6, 5, 6, 2, 5, 6, 7, 8, 3, 2, 6, 5, 4, 2, 0, 9, 6, 3, 6, 7, 8, 1, 0, 1, 7, 6, 5],
  [3, 6, 7, 2, 1, 0, 2, 1, 5, 4, 3, 2, 1, 0, 2, 5, 2, 1, 4, 5, 6, 7, 8, 6, 7, 8, 1, 2, 3, 4, 5, 6, 2, 1, 0, 1, 8, 9, 4, 3, 7, 8, 5, 1, 0, 8, 7, 2, 5, 3, 9, 8, 1, 9, 8, 3, 4],
  [4, 5, 6, 5, 2, 0, 3, 4, 4, 8, 9, 5, 6, 0, 1, 6, 1, 0, 5, 6, 9, 0, 3, 5, 6, 9, 0, 1, 0, 5, 6, 7, 8, 9, 8, 0, 1, 2, 3, 4, 5, 9, 8, 2, 6, 7, 6, 1, 2, 2, 3, 4, 2, 2, 1, 2, 3],
  [3, 0, 7, 4, 3, 1, 4, 5, 6, 7, 8, 4, 7, 7, 8, 7, 0, 0, 6, 7, 8, 1, 2, 4, 3, 0, 3, 2, 3, 4, 9, 8, 3, 4, 5, 6, 2, 3, 4, 3, 8, 9, 4, 3, 9, 8, 7, 0, 3, 1, 4, 5, 6, 5, 0, 1, 2],
  [2, 1, 8, 9, 4, 2, 3, 4, 9, 8, 2, 3, 8, 6, 9, 8, 9, 1, 2, 3, 3, 2, 9, 8, 2, 1, 2, 1, 0, 4, 5, 7, 2, 3, 6, 7, 9, 4, 5, 4, 7, 6, 5, 1, 2, 3, 6, 5, 4, 0, 9, 8, 7, 4, 3, 0, 3],
  [3, 5, 4, 6, 5, 4, 3, 3, 2, 2, 1, 0, 9, 5, 8, 3, 9, 8, 5, 4, 4, 5, 6, 7, 1, 9, 8, 7, 0, 3, 6, 7, 1, 3, 9, 8, 8, 7, 6, 5, 3, 2, 4, 0, 3, 4, 5, 6, 5, 8, 9, 7, 0, 1, 2, 3, 4],
  [7, 6, 3, 7, 8, 3, 0, 4, 1, 0, 3, 2, 1, 4, 1, 2, 3, 7, 6, 5, 3, 2, 1, 1, 0, 0, 3, 6, 1, 2, 9, 8, 0, 4, 3, 2, 3, 4, 5, 6, 4, 1, 1, 2, 3, 9, 6, 9, 6, 7, 6, 5, 1, 0, 1, 4, 5],
  [8, 9, 2, 8, 9, 2, 1, 5, 6, 5, 4, 3, 0, 3, 0, 3, 4, 0, 3, 4, 4, 5, 0, 9, 1, 1, 2, 5, 0, 1, 8, 7, 6, 5, 2, 1, 8, 9, 8, 7, 5, 0, 0, 1, 4, 8, 7, 8, 1, 0, 5, 4, 3, 0, 6, 5, 6],
  [3, 2, 1, 8, 9, 1, 0, 6, 7, 6, 7, 4, 3, 2, 1, 6, 5, 1, 2, 2, 5, 6, 7, 8, 7, 8, 3, 4, 3, 2, 9, 8, 5, 0, 1, 0, 4, 5, 6, 7, 6, 7, 6, 2, 5, 5, 6, 5, 2, 5, 4, 3, 2, 1, 7, 8, 7],
  [1, 0, 0, 7, 6, 5, 0, 1, 8, 7, 8, 9, 8, 1, 0, 7, 8, 7, 8, 1, 0, 5, 8, 9, 6, 9, 8, 3, 4, 3, 2, 7, 4, 9, 8, 1, 3, 4, 7, 8, 9, 8, 7, 6, 6, 9, 8, 4, 3, 6, 9, 9, 3, 0, 8, 9, 6],
  [2, 3, 5, 6, 5, 4, 3, 2, 9, 8, 7, 8, 9, 1, 0, 8, 9, 6, 9, 2, 3, 4, 1, 0, 5, 8, 7, 6, 5, 0, 1, 2, 3, 8, 7, 6, 2, 1, 0, 1, 8, 4, 5, 6, 7, 8, 7, 4, 3, 7, 8, 8, 7, 6, 7, 8, 7],
  [3, 4, 6, 5, 4, 3, 0, 1, 2, 8, 9, 7, 6, 0, 1, 2, 3, 5, 2, 1, 0, 4, 0, 1, 4, 5, 6, 8, 7, 1, 0, 1, 4, 9, 8, 5, 0, 1, 1, 5, 4, 3, 4, 9, 8, 9, 6, 5, 2, 1, 0, 7, 6, 5, 4, 9, 8],
  [4, 5, 7, 8, 9, 2, 1, 2, 6, 7, 8, 0, 5, 4, 0, 3, 4, 4, 3, 2, 3, 3, 0, 2, 3, 4, 5, 9, 2, 1, 0, 0, 1, 2, 3, 4, 3, 2, 7, 6, 1, 2, 3, 2, 1, 0, 7, 0, 1, 7, 8, 7, 8, 0, 3, 0, 1],
  [5, 6, 9, 2, 3, 4, 0, 4, 5, 6, 0, 1, 2, 3, 9, 6, 5, 3, 0, 1, 4, 2, 1, 2, 2, 3, 4, 8, 3, 4, 9, 1, 2, 3, 2, 1, 0, 9, 8, 5, 0, 1, 0, 7, 8, 7, 8, 9, 8, 6, 9, 6, 9, 1, 2, 1, 2],
  [6, 7, 8, 1, 0, 5, 0, 3, 0, 4, 3, 0, 5, 4, 8, 7, 3, 2, 0, 1, 2, 3, 2, 3, 1, 0, 0, 7, 6, 5, 8, 7, 3, 4, 3, 4, 3, 2, 3, 4, 5, 6, 5, 3, 9, 8, 3, 4, 0, 5, 4, 5, 8, 7, 1, 0, 1],
  [7, 6, 7, 8, 7, 6, 1, 2, 1, 5, 2, 1, 6, 9, 6, 6, 7, 1, 0, 2, 1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6, 4, 5, 6, 5, 2, 1, 0, 7, 6, 6, 5, 4, 5, 7, 4, 3, 1, 2, 3, 4, 5, 6, 0, 7, 8],
  [8, 7, 8, 9, 8, 7, 4, 3, 7, 6, 0, 1, 7, 8, 7, 7, 8, 7, 4, 3, 0, 9, 6, 5, 8, 7, 6, 5, 0, 1, 2, 5, 9, 6, 7, 8, 7, 0, 3, 8, 9, 7, 8, 3, 2, 6, 5, 2, 0, 1, 2, 1, 6, 7, 5, 6, 9],
  [9, 8, 9, 0, 9, 6, 5, 9, 8, 9, 1, 2, 3, 2, 1, 0, 9, 6, 5, 6, 6, 8, 7, 6, 9, 0, 3, 4, 1, 2, 3, 4, 8, 7, 8, 9, 6, 1, 2, 3, 4, 5, 9, 9, 1, 0, 0, 1, 7, 6, 5, 0, 7, 8, 4, 3, 8],
  [8, 7, 0, 1, 1, 0, 1, 8, 2, 1, 0, 5, 4, 3, 1, 2, 3, 4, 5, 6, 5, 6, 7, 8, 9, 1, 2, 0, 8, 9, 9, 8, 7, 4, 3, 2, 5, 4, 1, 0, 1, 6, 7, 8, 7, 5, 6, 9, 8, 9, 4, 3, 6, 9, 3, 2, 7],
  [9, 6, 3, 2, 2, 3, 2, 7, 3, 6, 7, 6, 9, 8, 0, 0, 1, 7, 8, 7, 4, 9, 8, 7, 6, 5, 2, 1, 7, 6, 5, 0, 6, 5, 0, 1, 2, 3, 2, 3, 4, 6, 7, 6, 5, 4, 5, 6, 7, 0, 1, 2, 5, 4, 3, 1, 0],
  [8, 5, 4, 1, 3, 4, 5, 6, 4, 5, 8, 7, 8, 3, 2, 1, 5, 6, 9, 8, 3, 6, 7, 6, 5, 4, 3, 0, 0, 5, 2, 1, 8, 7, 6, 5, 1, 0, 1, 2, 3, 9, 8, 9, 4, 3, 0, 1, 0, 1, 2, 5, 6, 3, 2, 1, 0],
  [3, 4, 3, 0, 6, 5, 4, 3, 2, 1, 9, 6, 3, 4, 7, 8, 4, 7, 8, 9, 2, 5, 6, 5, 0, 3, 4, 1, 1, 4, 3, 0, 9, 4, 5, 0, 1, 2, 0, 3, 4, 0, 1, 2, 3, 2, 1, 9, 8, 2, 3, 4, 7, 2, 1, 2, 1],
  [2, 1, 2, 8, 7, 6, 7, 0, 1, 0, 9, 8, 2, 5, 6, 9, 3, 0, 1, 0, 1, 6, 5, 6, 1, 2, 3, 4, 2, 3, 2, 1, 2, 3, 0, 1, 2, 3, 9, 6, 5, 8, 9, 2, 1, 0, 0, 8, 7, 6, 8, 9, 8, 9, 0, 3, 2],
  [1, 0, 8, 9, 8, 9, 8, 7, 0, 1, 8, 7, 1, 0, 7, 8, 2, 1, 2, 3, 4, 5, 8, 7, 6, 3, 0, 1, 2, 3, 4, 9, 8, 4, 1, 8, 9, 4, 8, 7, 6, 7, 8, 3, 0, 1, 1, 9, 6, 5, 7, 8, 1, 2, 3, 9, 8],
  [0, 1, 7, 1, 2, 9, 8, 7, 1, 2, 5, 6, 7, 6, 6, 2, 1, 0, 1, 8, 7, 6, 9, 6, 5, 4, 1, 4, 5, 4, 5, 6, 7, 6, 9, 9, 8, 5, 9, 6, 5, 6, 5, 4, 3, 2, 3, 4, 5, 4, 6, 9, 0, 3, 4, 5, 7],
  [2, 1, 0, 0, 3, 4, 5, 6, 0, 3, 4, 5, 8, 9, 7, 6, 5, 4, 0, 9, 8, 5, 4, 3, 0, 7, 6, 5, 0, 1, 2, 9, 8, 7, 8, 8, 7, 6, 8, 5, 0, 1, 7, 6, 5, 4, 0, 1, 4, 4, 5, 4, 9, 8, 7, 6, 6],
  [3, 2, 5, 6, 7, 6, 8, 9, 4, 3, 2, 4, 3, 8, 8, 9, 4, 3, 0, 8, 9, 4, 3, 2, 1, 8, 5, 4, 3, 2, 1, 0, 7, 6, 3, 2, 1, 0, 3, 4, 3, 2, 8, 5, 2, 3, 3, 2, 3, 3, 2, 3, 2, 0, 1, 2, 5],
  [4, 3, 4, 5, 8, 9, 7, 6, 5, 4, 1, 0, 2, 1, 0, 0, 1, 2, 1, 7, 6, 5, 0, 1, 8, 9, 8, 5, 4, 3, 2, 3, 4, 5, 4, 3, 2, 1, 4, 3, 4, 5, 9, 0, 1, 0, 2, 1, 0, 4, 1, 0, 1, 0, 1, 3, 4],
];

function findPath(input, y, x, curr, path = [], paths = []) {
  // up
  if (y > 0 && input[y - 1][x] == curr + 1) {
    findPath(input, y - 1, x, curr + 1, [...path, [y - 1, x]], paths);
  }
  // down
  if (y < input.length - 1 && input[y + 1][x] == curr + 1) {
    findPath(input, y + 1, x, curr + 1, [...path, [y + 1, x]], paths);
  }
  // left
  if (x > 0 && input[y][x - 1] == curr + 1) {
    findPath(input, y, x - 1, curr + 1, [...path, [y, x - 1]], paths);
  }
  // right
  if (x < input[0].length - 1 && input[y][x + 1] == curr + 1) {
    findPath(input, y, x + 1, curr + 1, [...path, [y, x + 1]], paths);
  }

  // console.log(path);
  if (curr == 9) paths.push(path);

  return paths;
}

function part1(input) {
  let score = 0;

  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[0].length; x++) {
      if (input[y][x] === 0) {
        let paths = findPath(input, y, x, 0, [[y, x]]);

        // part 1 score
        // score += uniq(paths.map(path => path[path.length - 1].join(''))).length;

        // part 2 score
        score += paths.length;
      }
    }
  }

  console.log(score);
}

function part2(input) {

}

console.log(part1(final_input));