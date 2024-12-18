const fs = require('fs');

const test_input = [
  125, 17
];

const final_input = [
  0, 4, 4979, 24, 4356119, 914, 85734, 698829
];

function separate(arr) {
  const len = arr.length;
  const fplen = Math.floor(len / 2);
  return [
    arr.slice(0, fplen),
    arr.slice(fplen, len),
  ];
}

function part1(inputs, iterCount) {
  for (let i = 0; i < iterCount; i++) {
    let newInputs = [];
    for (let ii = 0; ii < inputs.length; ii++) {
      if (inputs[ii].length >= 10000) {
        newInputs = newInputs.concat(separate(inputs[ii]));
      } else {
        newInputs.push(inputs[ii]);
      }
    }
    inputs = newInputs;

    for (let k = 0; k < inputs.length; k++) {
      let newSeries = [];

      for (let j = 0; j < inputs[k].length; j++) {
        let len = inputs[k][j].toString().length;
        if (inputs[k][j] === 0) {
          newSeries.push(1);
        } else if (len % 2 === 0) {
          newSeries.push(parseInt(inputs[k][j].toString().slice(0, len / 2)));
          newSeries.push(parseInt(inputs[k][j].toString().slice(len / 2, len)));
        } else {
          newSeries.push(inputs[k][j] * 2024);
        }
      }

      inputs[k] = newSeries;
    }
  }

  return inputs.reduce((acc, val) => acc + val.length, 0);
}

function addOrIncrement(nrs, nc) {

}

function part2(input, iterCount = 0) {
  const nrCounts = {};
  const alreadyParsed = {};

  for (let i = 0; i < input.length; i++) {
    nrCounts[input[i]] = 1;
  }

  t = new Date().getTime();
  t2 = new Date().getTime();

  for (let i = 0; i < iterCount; i++) {
    console.log(`loop ${i}`, ((new Date().getTime() - t) / 1000) + 's');
    t = new Date().getTime();
    const nrs = {};
    for (let nr in nrCounts) {
      let val = nrCounts[nr];
      if (val > 0) {
        nrs[nr] = val;
      }
    }

    for (let nr in nrs) {
      nri = parseInt(nr);
      nrCounts[nri] = Math.max(nrCounts[nri] - nrs[nri], 0);

      let newNr;
      let len = nri.toString().length;

      if (nri === 0) {
        newNr = 1;
        nrCounts[newNr] = (nrCounts[newNr] ?? 0) + nrs[nri];
      } else if (len % 2 === 0) {
        if (!alreadyParsed[nri]) {
          alreadyParsed[nri] = [
            parseInt(nri.toString().slice(0, len / 2)),
            parseInt(nri.toString().slice(len / 2, len))
          ];
        }

        newNr = parseInt(alreadyParsed[nri][0]);
        nrCounts[newNr] = (nrCounts[newNr] ?? 0) + nrs[nri];

        newNr = parseInt(alreadyParsed[nri][1]);
        nrCounts[newNr] = (nrCounts[newNr] ?? 0) + nrs[nri];
      } else {
        newNr = nri * 2024;
        nrCounts[newNr] = (nrCounts[newNr] ?? 0) + nrs[nri];
      }
    }
  }

  console.log(`end`, ((new Date().getTime() - t2) / 1000) + 's');

  return Object.keys(nrCounts).reduce((acc, val) => acc + nrCounts[val], 0);
}

console.log(part2(final_input, 75));
