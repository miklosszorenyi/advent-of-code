const fs = require('fs');

const test_input = {
  A: 729,
  B: 0,
  C: 0,
  Program: [[0, 1], [5, 4], [3, 0]]
};

const test_input_2 = {
  A: 284799,
  B: 0,
  C: 0,
  Program: [[0, 3], [5, 4], [3, 0]]
};

const test_input_3 = {
  A: 117440,
  B: 0,
  C: 0,
  Program: [[0, 3], [5, 4], [3, 0]]
};

const final_input = {
  A: 30344604,
  B: 0,
  C: 0,
  Program: [[2, 4], [1, 1], [7, 5], [1, 5], [4, 5], [0, 3], [5, 5], [3, 0]]
};

const map = {
  A: 30344604,
  B: 0,
  C: 0,
  Program: [[2, 4], [1, 1], [7, 5], [1, 5], [4, 5], [0, 3], [5, 5], [3, 0]]
};

function modulo(n, d) {
  return ((n % d) + d) % d;
}

function comboOperand(input, operand) {
  if (operand <= 3) {
    return operand;
  } else if (operand == 4) {
    return input.A;
  } else if (operand == 5) {
    return input.B;
  } else if (operand == 6) {
    return input.C;
  }
}

function part1(input) {
  let output = [];
  let pointer = 0;

  while (pointer < input.Program.length) {
    let [opcode, operand] = input.Program[pointer];
    let jump = 1;

    switch (opcode) {
      case 0: // adv
        input.A = Math.floor(input.A / 2 ** comboOperand(input, operand));
        break;
      case 1: // bxl
        input.B = input.B ^ operand;
        break;
      case 2: // bst
        input.B = modulo(comboOperand(input, operand), 8);
        break;
      case 3: // jnz
        if (input.A != 0) {
          pointer = operand;
          jump = 0;
        }
        break;
      case 4: // bxc
        input.B = input.B ^ input.C;
        break;
      case 5: // out
        output.push(modulo(comboOperand(input, operand), 8))
        break;
      case 6: // bdv
        input.B = Math.floor(input.A / 2 ** comboOperand(input, operand));
        break;
      case 7: // cdv
        input.C = Math.floor(input.A / 2 ** comboOperand(input, operand));
        break;
    }
    pointer += jump;
  }

  return output.join(',');
}

function part2(input) {
  const expected = input.Program.map(p => p.join(',')).join(',');
  const t = Date.now();
  // let incr = 164546073102924;
  // let incr = 164546164274876;
  // let incr = 164546059530173; 
  // let incr = 35184437673842; // felfele
  let incr = 164540892147389; // 164545991376446 innen kell folytatni
  // jo, csak nem a legkisebb: 164546059530173, 164546059529917, 164545992421309, 164545992421053, 164540892147645, 164540892147389
  // elso 16 szamjegyu: 35184372088832
  let done = false;

  while (!done) {
    input.A = incr;

    let result = part1(input)

    fs.appendFileSync('result9.txt', `${incr};${result}\n`);
    console.log(incr, result, result.length, expected.length);

    if (expected == result || result.length > expected.length) {
      done = true;
    }

    incr -= 256;
  }
}

console.log(part2(map));

// 1159494
// 9275948