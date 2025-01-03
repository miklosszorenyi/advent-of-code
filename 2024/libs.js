const { clone, max, cloneDeep, flatMap } = require("lodash");
const { v4 } = require("uuid");
const fs = require('fs');


// const path = [];

// while (currentNode !== start) {
//   if (!currentNode) {
//     return path;
//   }

//   const prevNode = previousNodes.filter((node) => {
//     return node.neighbors.includes(currentNode) && node.distance <= currentNode.distance;
//   });
//   console.log(prevNode.length);
//   prevNode[0].dir = currentNode.x < prevNode[0].x ? '<' : currentNode.x > prevNode[0].x ? '>' : currentNode.y < prevNode[0].y ? '^' : 'v';
//   currentNode = prevNode[0];

//   if (!path.includes(currentNode)) {
//     path.push(currentNode);
//   }
// }

// return path;

function getObjectByUuid(graph, uuid) {
  return clone(graph.filter((obj) => obj.uuid === uuid)[0]);
}

function removeReferences(previousNodes) {
  return previousNodes.map((node) => {
    delete node.prev;
    node.neighbors = node.neighbors ? node.neighbors.map((neighbor) => {
      return {
        x: neighbor.x,
        y: neighbor.y,
        type: neighbor.type,
        uuid: neighbor.uuid,
      };
    }) : undefined;

    return node;
  });
}

function backtrackPath(previousNodes, currentNode, start, lastDirPreferred = false, callback) {
  let path = [];

  while (currentNode !== start) {
    if (!currentNode) {
      return path;
    }

    let prevNodes = previousNodes.filter((node) => {
      return node.neighbors.includes(currentNode) && node.distance <= currentNode.distance;
    }).map((node) => {
      // node.dir = currentNode.x < node.x
      //   ? '<'
      //   : currentNode.x > node.x
      //     ? '>'
      //     : currentNode.y < node.y
      //       ? '^'
      //       : 'v';
      return node;
    });

    let prevNode = callback(currentNode, prevNodes, lastDirPreferred)
    currentNode = prevNode;

    if (!path.includes(currentNode)) {
      path.push(currentNode);
    } else {
      path = [];
      break;
    }
  }

  return path;
}

function backtrackAllPaths(graph, currentNode, sourceNode, path, allPaths, maxLength, maxScore) {
  // Ha az útvonal hossza elérte a maximumot, visszalépünk
  const score = path.reduce((acc, node) => acc + (node.score || 0), 0);

  if (path.length > maxLength /*|| score > maxScore*/) {
    // fs.appendFileSync('day16.txt', JSON.stringify(path.map((nodeId) => {
    //   const node = getObjectByUuid(graph, nodeId);
    //   return [node.x, node.y];
    // })) + '\n');

    return;
  }

  // if (allPaths.length && !(allPaths.length % 10)) {
  //   console.log(allPaths.length, path.length);
  // }

  path.push(currentNode);

  // console.log('path', path.length);

  if (currentNode === sourceNode) {
    allPaths.push([...path].reverse());  // Útvonal hozzáadása, ha elértük a forrást
    // console.log('source reached', allPaths.length, path.length);

    // fs.appendFileSync('day16.txt', JSON.stringify(path.reverse().map((nodeId) => {
    //   const node = getObjectByUuid(graph, nodeId);
    //   return [node.x, node.y];
    // })) + '\n');

  } else {
    currentNode.neighbors.forEach(neighbor => {
      if (!path.includes(neighbor)) {
        backtrackAllPaths(graph, neighbor, sourceNode, path, allPaths, maxLength, maxScore);
      }
    });

    // graph.forEach(node => {
    //   if (node.neighbors.includes(currentNode)) {
    //     backtrackAllPaths(graph, getObjectByUuid(graph, node), sourceNode, path, allPaths, maxLength, maxScore);
    //   }
    // });


  }

  path.pop();
}

function Dijkstra(nodes, start, target, useWeighting = false, lastDirPreferred = false, withStuckedPaths = false, withAllPaths = false, callback = (currentNode, prevNodes, lastDirPreferred) => prevNodes[0]) {
  let previousNodes = [];
  nodes.forEach((node) => {
    node.distance = node === start ? 0 : Infinity;
  });
  let unvisited = nodes.slice();
  let currentNode, neighbors;

  while (unvisited.length) {
    currentNode = unvisited.sort((a, b) => a.distance - b.distance)[0];

    neighbors = currentNode.neighbors.filter((neighbor) => unvisited.includes(neighbor));

    if (!neighbors.length) {
      currentNode.stuck = true;
    }

    for (let i = 0; i < neighbors.length; i++) {
      if (neighbors[i].distance > currentNode.distance + 1) {
        neighbors[i].score = useWeighting && (!currentNode.prev
          || (currentNode.prev && (neighbors[i].x !== currentNode.prev.x && neighbors[i].y !== currentNode.prev.y)))
          ? 1000 : 1;
        neighbors[i].distance = currentNode.distance + neighbors[i].score;
        neighbors[i].prev = currentNode;
      }
    }

    previousNodes.push(currentNode);

    unvisited = unvisited.filter((node) => node !== currentNode);
  }

  let stuckedPoints;
  let stuckedPaths = [];
  if (withStuckedPaths) {
    stuckedPoints = previousNodes.filter((node) => node.stuck && node !== target)
    for (let i in stuckedPoints) {
      stuckedPaths.push(
        backtrackPath(previousNodes, stuckedPoints[i], start, lastDirPreferred, callback),
      );
    }
    stuckedPaths = stuckedPaths.filter((spath) => {
      return spath.filter((path) => path.neighbors.includes(start)).length;
    });
  }

  let path = backtrackPath(previousNodes, target, start, lastDirPreferred, callback).filter((node) => node !== target);
  // previousNodes = removeReferences(previousNodes);

  let allPaths = [];
  if (withAllPaths) {
    backtrackAllPaths(previousNodes, target, start, [], allPaths, path.length, path.reduce((acc, node) => acc + (node.score || 0), 0));
    // allPaths = allPaths.map((path) => path.map((nodeId) => getObjectByUuid(nodes, nodeId)));
    // console.log(allPaths.length);
  }

  return {
    path,
    allPaths,
    stuckedPaths
  };
}

function refreshNeighbors(graph) {
  graph = graph.map((node) => {
    node.neighbors = graph.filter((neighborNode) => {
      return (neighborNode.x === node.x - 1 && neighborNode.y === node.y)
        || (neighborNode.x === node.x + 1 && neighborNode.y === node.y)
        || (neighborNode.y === node.y - 1 && neighborNode.x === node.x)
        || (neighborNode.y === node.y + 1 && neighborNode.x === node.x);
    }).map((neighborNode) => {
      const side = neighborNode.x < node.x ? 'left' : neighborNode.x > node.x ? 'right' : neighborNode.y < node.y ? 'up' : 'down';
      neighborNode.side = side;
      return neighborNode;
    });

    return node;
  });
}

function collectGraph(map, objects = ['.']) {
  let graph = [];

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (objects.includes(map[y][x])) {
        graph.push({
          x, y,
          type: map[y][x],
          uuid: v4(),
        });
      }
    }
  }

  refreshNeighbors(graph);

  return graph;
}

function wait(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}


function DFS(graph, node, target, visited, path) {
  visited.push(node);
  path.push(node)

  for (neighbor of node.neighbors) {
    if (neighbor === target) {
      visited.push(neighbor);
      return path;
    }

    if (!visited.includes(neighbor)) {
      if (DFS(graph, neighbor, target, visited, path)) {
        return path;
      }
    }
  }

  path.pop();
  return false;
}


function generatePermutations(array) {
  let result = [];

  function permute(arr, m = []) {
    if (arr.length === 0) {
      result.push(m);
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next = curr.splice(i, 1);
        permute(curr, m.concat(next));
      }
    }
  }

  permute(array);

  return result;
}

function variations(arr) {
  let variations = []

  for (let i = 0; i < arr.length; i++) {
    if (!i) {
      variations.push(...generatePermutations(arr[i]));
    } else {
      const newVariations = [];
      variations.forEach((variation) => {
        generatePermutations(arr[i]).map((perm) => {
          newVariations.push(flatMap([...variation, ...perm]));
        });
      });
      variations = newVariations;
    }
  }

  return variations;
}

function combine(arrays) {
  // return [arrays.map(arr => arr[0]).join('')];
  let result = [];

  function helper(prefix, index) {
    if (index === arrays.length) {
      result.push(prefix.join(''));
      return;
    }

    for (let value of arrays[index]) {
      helper([...prefix, value], index + 1);
    }
  }

  helper([], 0);

  return result;
}

module.exports = {
  DFS,
  Dijkstra,
  collectGraph,
  refreshNeighbors,
  wait,
  combine,
  variations,
  generatePermutations,
};