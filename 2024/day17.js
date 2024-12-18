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

const map = {
  A: 100000000000000,
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
  let curr = 1000000;
  let incr = 1000000;
  let done = false;

  while (!done) {
    input.A = curr;

    let result = part1(input)

    if (result.length > expected.length) {
      curr -= incr;
    } else {
      curr += incr;
    }

    if (expected == part1(input)) {
      done = true;
    }


    console.log(curr, (new Date() - t) / 1000);

    incr = Math.round(incr / 2);
  }

  console.log(curr - 1);
}

console.log(part1(map));