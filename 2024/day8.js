const { uniq, findIndex } = require("lodash");

const test_input = [
  '............',
  '........0...',
  '.....0......',
  '.......0....',
  '....0.......',
  '......A.....',
  '............',
  '............',
  '........A...',
  '.........A..',
  '............',
  '............',
];

const final_input = [
  '..........M..........j.............y.....O........',
  '...B...............q......m........lGO............',
  '....................q......2.l.GQ...O.............',
  '.....X.......................................4....',
  '.....................q............................',
  '....M......P...............xl.K.............2.....',
  '....F.........L.......C.K..............m..........',
  '..........FM......P....jy......m..........o...r...',
  '..X.......P.....RL..............G..x..........4...',
  '............L..........NC.....q...................',
  '.....C.X...............K....y..........4..........',
  '........S...R.............j.x.....V...4...........',
  '.....................R..x.....V..i......m.........',
  '...........................R.V......N.......X.....',
  '.....F.........M......N......E....................',
  '................v................T.......F......O.',
  '.............................N...V.......Q........',
  '...v.....................C.....i..................',
  '......c.....W..n.w........................E.......',
  '3...................c.....................Q..6....',
  '...........h......................j...............',
  '.......n.0......h.................E..............2',
  '.v.............7.......120.....c..................',
  '......n.0............w...........D.t.........E...r',
  '....8..3......0.w.hP....z...D..T...............r..',
  '.................f........T........G......eQ......',
  '......f.n.....7..p................................',
  '.....Y..7.......f......I......D......K............',
  '............Uf....T..W.....D..r...i...............',
  '......I...............................Z...........',
  '....5....B.......b..............s..............Z..',
  '..........d...W..Uwh.............c..........i.....',
  '..I.3..Y......................e...................',
  '.....p.b..........k......7........................',
  'p...........k....I..b..........s..................',
  '.....k.......o...........W........................',
  '.A..Y..........U.................a........6.......',
  '..A...Y.p...................................6.....',
  'B......k..........................Z............u..',
  '...3.....................s..............a.........',
  '......A.........................g.....a...........',
  '.......A....8...b.U......H....sS..................',
  '.........................S1.............t.........',
  '.....................9z..e.....5..1.g.u...........',
  '.......................z....d....g....H.J....o.6..',
  '........B................d.....u....9.J.H.........',
  '.8........S.................u9.............J.....H',
  '.....................Z5.............t1...........a',
  '.....................e..v...................o..t..',
  '.....8...............L.....z.............J........',
];

function strReplace(str, ind, char) {
  const split = str.split('');
  split[ind] = char;
  return split.join('');
  // return str.replace(new RegExp(`^(.{${ind}})`, 'g'), char);
}

function part1(input) {
  const inputLine = input.join('');
  const uniqAntennas = uniq(inputLine.replace(/\./g, ''));
  const regex = new RegExp('[' + uniqAntennas.join('') + ']', 'g');
  const antennaCoords = {};
  let antennaPairs = [];

  let match;

  while ((match = regex.exec(inputLine)) !== null) {
    if (!antennaCoords[match[0]]) {
      antennaCoords[match[0]] = [];
    }
    antennaCoords[match[0]].push([
      match.index % input[0].length,
      Math.floor(match.index / input[0].length)
    ]);
  }

  // [[8, 1], [5, 2], [7, 3], [4, 4]],
  // [ [ 6, 5 ], [ 8, 8 ], [ 9, 9 ] ]

  uniqAntennas.forEach(antenna => {
    for (let i = 0; i < antennaCoords[antenna].length; i++) {
      for (let j = 0; j < antennaCoords[antenna].length; j++) {
        if (j > i) {
          antennaPairs.push([antennaCoords[antenna][i], antennaCoords[antenna][j]]);
        }
      }
    }
  });

  // antennaPairs = [[[8, 1], [5, 2]]];

  let cnt = 0;

  antennaPairs.forEach(pair => {
    const distance = [
      pair[0][0] - pair[1][0],
      pair[0][1] - pair[1][1],
    ];

    let outOfBounds = false;
    let iter = 0;
    let coo1, coo2;

    while (!outOfBounds) {
      iter++;
      coo1 = [pair[0][0] + distance[0] * iter, pair[0][1] + distance[1] * iter];
      outOfBounds = coo1[0] < 0 || coo1[0] >= input[0].length || coo1[1] < 0 || coo1[1] >= input.length;

      if (!outOfBounds) {
        input[coo1[1]] = strReplace(
          input[coo1[1]],
          coo1[0],
          '#'
        );
        cnt++;
      }
    }

    outOfBounds = false;
    iter = 0;

    while (!outOfBounds) {
      iter++;
      coo2 = [pair[1][0] - distance[0] * iter, pair[1][1] - distance[1] * iter];
      outOfBounds = coo2[0] < 0 || coo2[0] >= input[0].length || coo2[1] < 0 || coo2[1] >= input.length;

      if (!outOfBounds) {
        input[coo2[1]] = strReplace(
          input[coo2[1]],
          coo2[0],
          '#'
        );
        cnt++;
      }
    }
  });

  return input.join('').replace(/[\.]/g, '').length;
}

function part2(input) {
}

console.log(part1(final_input));