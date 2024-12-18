function backtrackPath(previousNodes, currentNode, start) {
  const path = [];

  while (currentNode !== start) {
    if (!currentNode) {
      return path;
    }
    if (!path.includes(currentNode)) {
      path.push(currentNode);
    }

    // if (currentNode.x == 5 && currentNode.y == 7) {
    //   console.log(previousNodes.filter((node) => {
    //     return node.neighbors.includes(currentNode) //&& node.distance < currentNode.distance;
    //   }).filter(node => node.prev != currentNode));
    // }
    currentNode = previousNodes.filter((node) => {
      return node.neighbors.includes(currentNode) && node.distance < currentNode.distance;
    });
    currentNode = currentNode[0];


  }

  return path;
}

function Dijkstra(nodes, start, target, useWeighting = false) {
  const previousNodes = [];
  nodes.forEach((node) => {
    node.distance = node === start ? 0 : Infinity;
  });
  let unvisited = nodes.slice();
  let currentNode, neighbors;

  while (unvisited.length) {
    currentNode = unvisited.sort((a, b) => a.distance - b.distance)[0];


    // if (currentNode.x == 2 && currentNode.y == 11) {
    //   if (currentNode.prev && currentNode.prev.prev) {
    //     currentNode.prev.score += (currentNode.x !== currentNode.prev.prev.x
    //       && currentNode.y !== currentNode.prev.prev.y
    //       ? 1000 : 1) - 1;
    //     console.log(currentNode.x, currentNode.y);
    //     console.log(currentNode.prev.x, currentNode.prev.y);
    //     console.log(currentNode.prev.prev.x, currentNode.prev.prev.y);
    //   }
    // }

    neighbors = currentNode.neighbors.filter((neighbor) => unvisited.includes(neighbor));

    if (!neighbors.length) {
      currentNode.stuck = true;
    }

    // currentNode.score = isCorner(currentNode) ? 1000 : 1;

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

  const stuckedPoints = previousNodes.filter((node) => node.stuck && node !== target);
  let stuckedPaths = [];
  for (let i in stuckedPoints) {
    stuckedPaths.push(
      backtrackPath(previousNodes, stuckedPoints[i], start),
    );
  }
  stuckedPaths = stuckedPaths.filter((spath) => {
    return spath.filter((path) => path.neighbors.includes(start)).length;
  });

  path = backtrackPath(previousNodes, target, start).filter((node) => node !== target);

  return {
    path,
    stuckedPaths
  };
}


function collectGraph(map, objects = ['.']) {
  let graph = [];

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (objects.includes(map[y][x])) {
        graph.push({
          x, y,
          type: map[y][x],
        });
      }
    }
  }

  graph = graph.map((node) => {
    node.neighbors = graph.filter((neighborNode) => {
      return (neighborNode.x === node.x - 1 && neighborNode.y === node.y)
        || (neighborNode.x === node.x + 1 && neighborNode.y === node.y)
        || (neighborNode.y === node.y - 1 && neighborNode.x === node.x)
        || (neighborNode.y === node.y + 1 && neighborNode.x === node.x);
    });

    return node;
  });

  return graph;
}

module.exports = {
  Dijkstra,
  collectGraph
};