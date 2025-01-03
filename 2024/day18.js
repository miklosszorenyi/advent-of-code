const { Dijkstra, collectGraph } = require("./libs");
const fs = require('fs');

const test_input = {
  map: [
    [5, 4],
    [4, 2],
    [4, 5],
    [3, 0],
    [2, 1],
    [6, 3],
    [2, 4],
    [1, 5],
    [0, 6],
    [3, 3],
    [2, 6],
    [5, 1],
    [1, 2],
    [5, 5],
    [2, 5],
    [6, 5],
    [1, 4],
    [0, 4],
    [6, 4],
    [1, 1],
    [6, 1],
    [1, 0],
    [0, 5],
    [1, 6],
    [2, 0],
  ],
  memSize: [7, 7],
  bytesToUse: 12,
};

const final_input = {
  map: fs.readFileSync('./2024/day18.txt', 'utf-8').trim().split('\n').map(line => line.split(',').map(Number)),
  memSize: [71, 71],
  bytesToUse: 1024,
};

function createEmptyMap(memSize) {
  const map = [];

  for (let i = 0; i < memSize[0]; i++) {
    map.push([]);
    for (let j = 0; j < memSize[1]; j++) {
      map[i].push('.');
    }
  }

  return map;
}

function viewMap(currentMap) {
  console.log(currentMap.map((row) => row.join('').replace(/[\.]/g, ' ')).join('\n'));
}

function part1(input) {
  const map = createEmptyMap(input.memSize);

  for (let i = 0; i < input.map.slice(0, input.bytesToUse || input.map.length).length; i++) {
    const [x, y] = input.map[i];
    map[y][x] = '#';
  }

  const graph = collectGraph(map);
  const start = graph.filter((node) => node.x === 0 && node.y === 0)[0];
  const target = graph.filter((node) => node.x === map[0].length - 1 && node.y === map.length - 1)[0];
  const { path } = Dijkstra(graph, start, target);

  path.forEach((node) => {
    map[node.y][node.x] = 'O';
  });

  viewMap(map);

  return path.length + 1; // + 1 because the start node is not included in the path
}

function part2(input) {
  const map = createEmptyMap(input.memSize);

  for (let i = 0; i < input.map.slice(0, input.bytesToUse || input.map.length).length; i++) {
    const [x, y] = input.map[i];
    map[y][x] = '#';
  }

  const restBytes = input.bytesToUse ? input.map.slice(input.bytesToUse) : [];

  for (let i in restBytes) {
    console.log(`byte ${i}`);
    const [x, y] = restBytes[i];
    map[y][x] = '#';

    const graph = collectGraph(map);
    const start = graph.filter((node) => node.x === map[0].length - 1 && node.y === map.length - 1)[0];
    const target = graph.filter((node) => node.x === 0 && node.y === 0)[0];
    const { path, stuckedPaths } = Dijkstra(graph, start, target);

    if (!path.length) {
      return { x, y };
      break;
    }
  }
}

console.log(part1(test_input));

