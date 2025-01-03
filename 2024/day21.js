const { sample, uniq, find, clone, flatMap, cloneDeep } = require("lodash");
const { Dijkstra, collectGraph, combine } = require("./libs");

const test_input = [
  '029A',
  '980A',
  '179A',
  '456A',
  '379A',
];

const final_input = [
  '083A',
  '935A',
  '964A',
  '149A',
  '789A',
];

const pads = {
  numPad: [
    ['7', '8', '9'],
    ['4', '5', '6'],
    ['1', '2', '3'],
    ['#', '0', 'A'],
  ],
  arrowPad: [
    ['#', '^', 'A'],
    ['<', 'v', '>'],
  ]
}

function getVariousDirs(targets, padType) {
  let dirs = [];

  for (let j = 0; j < targets.length; j++) {
    const pad = collectGraph(pads[padType], pads[padType].reduce((acc, row) => acc.concat(row.filter(n => n != '#')), []));
    let startPos = !j ? 'A' : targets[j - 1];
    let targetPos = targets[j];

    let start = pad.filter((node) => node.type === startPos)[0];
    let target = pad.filter((node) => node.type === targetPos)[0];
    let finding = Dijkstra(pad, start, target, false, false, false, true);
    let localDirs = [];

    for (let i = 0; i < finding.allPaths.length; i++) {
      const path = finding.allPaths[i];
      const dir = [];
      const pathCopy = cloneDeep(path);
      pathCopy.map((node, index) => {
        node.dir = undefined;
        if (index > 0) {
          let prevNode = pathCopy[index - 1];
          node.dir = prevNode.x < node.x
            ? '>'
            : prevNode.x > node.x
              ? '<'
              : prevNode.y < node.y
                ? 'v'
                : '^';
        }

        if (node.dir) {
          dir.push(node.dir);
        }
      })
      dir.push('A');
      localDirs.push(dir.join(''));
    }

    dirs.push(localDirs);
  }

  return dirs;
}

function part1(input) {
  let sequences = [];

  for (let inp of input) {
    let targets = inp.split('');

    let variants = [combine(getVariousDirs(targets, 'numPad'))];

    for (let v = 1; v <= 2; v++) {
      let t = new Date().getTime();

      for (let i = 0; i < variants[v - 1].length; i++) {
        variants[v] = [...(variants[v] || []), ...combine(getVariousDirs(variants[v - 1][i].split(''), 'arrowPad'))];
      }
    }

    sequences.push([parseInt(inp), variants.at(-1).sort((a, b) => a.length - b.length).at(0).length]);
  }

  return sequences.map(seq => seq.reduce((acc, val) => acc * val, 1)).reduce((acc, val) => acc + val, 0);
}

function part2(input) {
}

console.log(part1(test_input));