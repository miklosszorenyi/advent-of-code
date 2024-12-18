const test_input = {
  map: [
    '##########',
    '#..O..O.O#',
    '#......O.#',
    '#.OO..O.O#',
    '#..O@..O.#',
    '#O#..O...#',
    '#O..O..O.#',
    '#.OO.O.OO#',
    '#....O...#',
    '##########',
  ].map((row) => row.split('')),
  moves: '<vv>^<v^>v>^vv^v>v<>v^v<v<^vv<<<^><<><>>v<vvv<>^v^>^<<<><<v<<<v^vv^v>^vvv<<^>^v^^><<>>><>^<<><^vv^^<>vvv<>><^^v>^>vv<>v<<<<v<^v>^<^^>>>^<v<v><>vv>v^v^<>><>>>><^^>vv>v<^^^>>v^v^<^^>v^^>v^<^v>v<>>v^v^<v>v^^<^^vv<<<v<^>>^^^^>>>v^<>vvv^><v<<<>^^^vv^<vvv>^>v<^^^^v<>^>vvvv><>>v^<<^^^^^^><^><>>><>^^<<^^v>>><^<v>^<vv>>v>>>^v><>^v><<<<v>>v<v<v>vvv>^<><<>^><^>><>^v<><^vvv<^^<><v<<<<<><^v<<<><<<^^<v<^^^><^>>^<v^><<<^>>^v<v^v<v^>^>>^v>vv>^<<^v<>><<><<v<<v><>v<^vv<<<>^^v^>^^>>><<^v>>v^v><^^>>^<>vv^<><^^>^^^<><vvvvv^v<v<<>^v<v>v<<^><<><<><<<^^<<<^<<>><<><^^^>^^<>^>v<>^^>vv<^v^v<vv>^<><v<^v>^^^>>>^^vvv^>vvv<>>>^<^>>>>>^<<^v>^vvv<>^<><<v>v^^>>><<^^<>>^v^<v^vv<>v^<<>^<^v^v><^<<<><<^<v><v<>vv>>v><v^<vv<>v^<<^'.split('')
};

const test_input_2 = {
  map: [
    '#######',
    '#...#.#',
    '#.....#',
    '#..OO@#',
    '#..O..#',
    '#.....#',
    '#######',
  ].map((row) => row.split('')),
  moves: '<vv<<^'.split('')
  // moves: '<vv<<^^<<^^'.split('')
}

const final_input = {
  map: [
    '##################################################',
    '#..O.O..#..O.O.O.O.......##O..OOO.....O...O..#..O#',
    '#.O.O.#.....O..O......O.O.OOO.......OO.O.....#...#',
    '#OO........O.....OO......##OO.#OO.OO..O....OOO...#',
    '#......O...O..O.#....O...O.....O..#.O.O.O...#O...#',
    '#OOO.OO.OO...####O.#O...O..OO...O#.O..#.OO.O...O.#',
    '#O#...OOOO......O#O#....#OO...O.....O.O.OOO.OOO..#',
    '#O.O...O.#OO......#...........O...OO.O..O#.#OO...#',
    '#O.....O.O.O.#...OO..O#....OO.O.O....#.........O.#',
    '#.O.#O.O#...O#..O.O.#.O.OO..O..O...O.O...OO.O...O#',
    '#..#..O.#.O..##......OO...........O.....O...#.#..#',
    '#.OO#.........O...O.....OO.O...OO............O#.O#',
    '##.O.OO.O...O.O..O..OO.#....O.#....O......OOO...O#',
    '#..OO..O.O..O..O..O...O..O.....#OO.....O...#OOO.O#',
    '#.......O.#O.OO..#......O..OO.......O..O.O....OO##',
    '#.....O.........O...#.O..O..#OO.O...O.O.#....O...#',
    '#.OO##O#..O.#..O......OO..OO.OO.....O..OO#O.O..O##',
    '#.O....O...#O.O..O#....O#O...OO.....O....O.......#',
    '#...OOO....#O.OO...#.OO#O...O#O..#..#.O..O....#..#',
    '##....O.OO.O#..........O#.OOO.#....#...O#....OO..#',
    '#.#OOO..OO..O.......#.OO.O..#O.#.OO....OO.O.....O#',
    '#.O......#..O.#.O..........#O..O.OO...#O...O#....#',
    '#.#....O.O....O.......O..OOO..OO...OO.#OOO.O.O.#.#',
    '#.O.#.O.O....OOO...O...O#......OO##.O..OO.....O..#',
    '#.OO.......#O.OO#..#....@O...O....OOO.O..OO......#',
    '#O..#..#OO...O#OO.......OO..##..O.#.O.O..O.O..OO.#',
    '#.#.O.OO.........OO#.O..O.O...OOO.O......O#...OO.#',
    '#.OO...#..OO.##......O#.O.OO....O..O#.......O.OO##',
    '#OO..O.O.O....O#.O..O......#...OO#.O..O.O..O..OOO#',
    '#...OO....OOO.....O..O..O....OO......OOO.........#',
    '#O...#.....O...O..OO..O.OO....O.O..O....O....O.O.#',
    '#.....OOOO..#..#.O.OO.......O....OO#.O...O..O..O.#',
    '##.OO...O.#O......#O.O#O#..O#..O.....O....OO..O.##',
    '#..O..OOO...OO.OO.#O#.OOO......O...OO...O.O......#',
    '#.OO.O..O.O.O#..O.#.O.OOO...O..OO.O##.O.#...#...O#',
    '#........#...O##.....OO....O.O....OO#.O.O.O.#OO.O#',
    '#.O..O.O.#...O.......#...#..O...O.#.........#..O##',
    '#...........O.....O..OO.......#..#...O...#..O.##O#',
    '#.OOO..O..OO....#..OOOO......O...##..#.......O...#',
    '##..#O..OOO.#O...O..OO...O....OO..#..#.OO.O.OO...#',
    '##O....#...OO#.O.O...O...O.O..O.......O.....O..#.#',
    '#........#.O##...O#..O..O.#O........O#..OO#.O.O###',
    '#....#.O............O..O...OO....OOO...OO...#....#',
    '#.#O.....#...OO.OO.........#.#.OOO.OO.O...O#.O.#.#',
    '##....#..OO...O...O..#O..O.O..O.O..O..O.OO.......#',
    '#...........OO.O.O...O......O...O.OOO.....O..O...#',
    '##O.O..O.O...O.....O.O.O.O.OO.#O.O.O..#.....#....#',
    '##.O.......#O.#...O#O#O..O..#O..O....OO.O.O......#',
    '#O...O.O.........O......O.......O......#..O.....##',
    '##################################################',
  ].map((row) => row.split('')),
  moves: '^>>^v><^>v>>^v^^^v<>>v><vvv<>v^>>v><<<>^<<v^>vvvv^v^>v^>>^<v><>vv^>^>^v<^v^v<<<<^<>v<<>vv<>^vv<^v><^^>^>^v>>^>^v>>>v<<^>^>^<^<><^vvv<<^vvv>v<v<<>v^><<v^<>v^v^^^>v^<^v<vv^v^>>^^<<>^><<<>>>^v^>vv><<>>v>vv<<>^v<>>v<v^<>><>>^<v<>^<^^<^v>v^<vvv^<v<v^>vv>>^^^>v><^<vv<>>><v>>>^v>><v^>vv<v>vvv<vv>>>^<v<^vv^<^<<v^^vv<^>^<<<v<v<^><v<<^^v^v<>>>^v^<<<vvvvv<<^><^v<>v>^v>>>><v>v^><^v^^<<><v^>^<v<>v><v^^^^<^v>^><>^^<^>^<<^<<^v>^v^^v><>v^^^<^^<>vv<v<<><>v^<vv>^vv><vvvvv<^v<vvvv^vv^v^>>vv>^<v>^^v<^v><^v^^v^^v>vvvv^v^^>^^v^^^v>v><>^<v<<^><v>^v^<vvvv>>v^v^v>v^<vv>>^>^>>^>><>^<v<<^v^<>^><^<vv>^^^vv>v>^^vv^>><^v<v<v><v<>>vv>>v<v<>vv<vvv^<><^>v<^^^<>^v<>>v>^>>^^v>vv>vv^><<^v<<^><<v<v^vv<<^v<^<>^>>^<<><^vv<v<<<v^v<<>^>v<<v<^v>>vv^^>v^><><><<vv<^><>v^vv><<v<vvv<>^<^^vv<<<>^^<>^vv>>vvv<<^<v>^^><<^><vvv^>^^>^<^^>v><<<<<vv^><>>vv<^<<^^v<>v<>v<<v>v^^v<>>><<^^>v>vv^^^<^<>^^><^>vvvv>vv^<v^<>^<<^^>^^^>^<^<v^<<v<><v^>v^>^>^>v<^<^><<<>><>>>^^<<>^v>^^>>v^v<^^<v>v^v<v>^vv^^^<>^v^^v<>v<>vv<^^<<>vv^>>^^^vv<^^^<><>^<<><>^v<v<^v<<^vv^>^vv>^vvv<^<<>^>>^^>^v<^<>v^^<<^v<v><>>^<^<<v<^v<^^<<v<<^^^^><><v<^^^v>><<^<<>>><>^v>vv>>v^<>v^<^v>v^>>^v<v<v<>^<<^>>><><^<^v<<^>v^^^<><<>>><<^vv>>v^<vv<<>^^<<v>>v><>^<<>^^><<><>v>v^<^v^<^>vvv<>v>>>>>>^vvv>v^<^v<>v>v^><^vv<vv<v>>v<^>v>^>^<v^^^<<>^><v>^>><^<vvv>>v^v^>^<vv^<v^>>v<>>>v^>v<v<^^>^><^>><v^><^v^^<>vv>>^^^>v^<><^<><^^<v^v^<<<^<vv>v>^^>v<^<<v^>^>v<<<>^>><^v<vv>v^v^^^^<vv^><>v^>v>><<v<<>v<>v^>v><v^^^v^<v<^<>^v<v<v>v^v<^^v<v^>v<v^v^>><^>><v><>>^<><v^<<<v<><<^^><><<v><vvv<v><>>^>>>vv<^^^>^<<<<^^^v<vv^<>vv>>^^^^vv>v<^>><<v^^^v>vv^v><^v><v^<<<v<>^v>vv^^>v<v^<<>^>><<^v^^>^>>^^><<^<<>^>>v>v<^<v^^^v<^^>>^^^<>^>><<v><<v>vv<>>>^vv<<><v^>>>vvv^>vv><v<<>^^>^v<^^>v>v^<^>^<v<v<>>><vv<vv^<<>^v<v<^^<vv>vv^>v<<>^<>v<^>v^<vv<><<>^v<>>^^<^><vv>^^^<^v<<^>^^<<<vvv><^v<^^^v>>v>><v<><>><v>^<>>vvv<v>v^^<v<>>><>v>^>>><v<v<<>v^>>^>^v>^><^v>^<v>v<vv^><>v<v>^v>>^v><v<<^>v>^^<<^v<^<vv<>^<><vv^v<<v>>^v<<^>>^<^>^><v^><^>>v<v^<^v<^^v>^<v<^vvv<v^>vvv><^v<v<v<v^^>^<^>^^>v<^^^<^^>^v>><v^<<><>>v^^v^v^v<<<>>>^>><><>^^>>^<<vv>vvvv<><^<^v^v<>>>><^<>v><^vv<^v>>v<<<^^>^<<><>^^><<^><<<<^^v^^>v<<vv>^>>^^^v>^<v><<^><<vv^<><^>^><vv>v^<<v<>v^>^<><<>>>v^>^>v<v><><<v<<>>^vv>>><<^^>vvv^<vv<v<<>><<^^v>>><v<<<^<^v>v^>v>>vv^^^v>>v^><<<>v><^<^v<<<^^<^v<<^^v<>^^<>^>^<v^^^^^^>v<<v>^vv<>v<>vv>v<>v<^^v><^<vv<^<>>^<v<>v^<>v><>v<^v>>v>^^><v<vvv^^<v>>v^><vv<<<>>^<v>v^vv>><^<<v>^^^>>>v><>>vv>^^<vv<vv><v^v>^v<>vvvv<>^v<>>^<><vv^><>>>^^^^>>vv^v^<>><^^><^^>><<<v<>^vvv^>vv><>v>v^<^v^<vv<><<<v<vv<v>^>v^>><<^>^>^vv>^<v>v^>v<<>>><<vv^<<v>v>^<<<<<<>>vv^^^<<v<<<^<<<v^v<^<v>>>vv>v<>>>^<>^>^v<>vv>>v<<^>v>^vv>vvv^<>><<vv<^^><<^>vvv><v^v><><<v^^vv>^<>>v^>^^>v>>>v>vv^><>>><<<<<>^>vv^<<^^<^>^<>^>v<v<<>v^v>>>^v^v>^v>^<<v>^vvv>>vv<>v><v><v^<>v^v^>v<><vv><^^vv^v<vvv>^<<^^>^>v^^>^^<>^>>>>v^<^>><>^v>v>v>><^vv^v^<^<v<<<v><v>vv<<<>>>>^v<<v^^<^^><>^^<^^v^v<>><><>><>v>>v^v^><^<^v^>>><vvv<>>><v><v^^v^><vvv>>^^>>>^><<<>v>^^v<v<<v<<><^<>^^vv^<^><v><^>^<>v><vv^^^v<<^<>^^>^^v<^v<vv<<<><v><v><v<<^^v<v>>^>^^<>^vvvvv^^^>><<^<><v>^>^<v>>>v<^<^^<v^v>^>vv^v><>^>^>^^<vv<^><^v^><^v^><^><<<^^v>v>^>^><vv>^^^v^>^v^<v<<<<<>>v>>>vv><<<v>v<<><<v<v^>>^v<<v<<^vv<<^<^>><^^v>vvv>>v>><^vv>^<<<^>v<^<><^v>^<<v^<<v^>>v>>v<<^^v^^><^>v^v>^<<<<v^v^<>>v^>v^^v^<v^^<^>v<v>>v^v>>^^<>><vv^<>v<><^^>^^^^vvv>vvv>^><><^><<<>^v^<>v^>^^>>^vv>^<>>>>v<vv^vvv>><^^<<>^>^^>><<^<^>^^v<vv>^^>^v>v^>^^<<v>>>^<vv^vv^>v><>v><<vv^>>^vvv<<^v^<vvvv>^<^<^<^<vv<>>^<vv>v^>v^><<^^><^v<vv<>>^<v^<>^>v^<<<v^>>>>><<<vvv>v<^vvv>v><^^^<v^v^>v>^<>v^<>>^vvv<v^<v<^>^<v<v<>v<<>^<<>^^^^v<v<^v<v<<>^>^vv^>v>v>vv^>vvv>v^vv><^>vv^><^^v<^>v<>^>^<v<>^vv^^<<<<>^^^v^^^<>v<>^<>><v>>v>^>v^>^>^<v>^<^<>^<<<v<<^><^<v^>><>>v^^v>v<^^><><v<^<<^v>>^v^>^<<<vvvv>^><^><vv^v>^^^>v><>v>^>^v>^v^<^v>>v^v^><^^<^^<v^v^<v^>^^>v>><<v><vv^^><<^^><>v>><<<^<<>>v><>v^<<<vv>^<<<>vv<<v<>v<vv^v^>^>v^^>^vv^^><v<^><<>v^<v^>^v<v>v>>^vv<v<>v>>v^v^^^>>^vv^^><<<^<^v>v^v<<>^vvv<v<v^^vv<>v^><v><<^>^<^><>>>>>v<v<<<^vv<^^v^v>vv<^<>>>^>>>v^>^v^^^>^>^<>^^<v>>>><<><<vvv>vv><v^^<^v>>v<<>vv^^<<><vv<^>^v>v^v^vv^vv<><v<<<^<vvvvv>>v^v<><v>v><><v>v^^^<^v>>^v>v^><v^v^><<>>>><><^>v<^^^>v>v><^^v<v^<><<<^v<><^<<^^>>^>^>><^>><<^^v^^>><>>v<v<vv<><<>>vv>vv^vvv<<>>vv<^^>><<vv<><v^<v^<>>^>^^v>^>>v<<<<>>>v<^^v>>v>^><>^<v<v><>v>>^>vv<^^v<<>v>>^<^^>><^<v>>v<>v>^^>v^v<^<^^<v>v^<^<v^^>^<<^^>>v^v^^v<vv<<v<^v<>^v^<^^<>^^>>^<^v><>v<v><^^^<vv<<^^v^<<^v^^v>^v^<<^vv>v>^v^v<^v<vv>v<^><>><^v><v<vv^<>v>>^^^>v>v^v^>v>><>><<<vv<v^<^v^>>>v<v>><v>v^>^<>>>>><v^<^v>^<^<^^>>><v^><v^^^<>v^^>v^vv<>^<<v>^>>^<^>^^>^^>>^<v>v>><<>^>^>^v>><^^<^><v^v<<^>>vv>v>>vv<v<>^><><<<><><<^<>>>v>^^v<<>v^>v><<vvv><>>v<<^<>><<>^><>^v<<^vv<^<^<>>vv<^v^>v><v><^v^v>^<><>^>>>v^><>>^<<^v<v^vv^><<v^>v^^><>v>><v^<<v><^>>vv^>^><^v>v^><>><>>>v>^^>^<v<vvv>vvv<><v<vv>>>>^^^><<>^<^^<^vv<>v>^>>>vv^>>>v>vv<<>^vvv^<><><>v<^<>>^<><><>v^vv>^v>vv^vv^^<^<^>>v<^<v<^<vv>^<>><v<^><<><<^v>>vv^>v<<vv>^<>^v>^>v<<<<>>^>>^^^^v<<^^><v^v^^vv<v<^^v^v^v<v^^>>^>v^>^^><^<^<^v>^^v>><>>^>>v>v^^^<^^>>>^<v<<<>^^v^v>>>>^^v^><>><v<^vv<><><v^>>v<<>>>>vv^>^^><><v<^>vvv>^>>v<<<>><^<^^^^^<^>^^^v<><^^^v<vv<<^<^>>^^<<>v^^<<^<v^<v>^>^<vv>^<v<v<>><>^<><^<v<<^<v^<<<vv^vv<>>^^^<v<^v^>^vv<>^^<><^^>>v^v<><^>v^><^^^>v^>vv<vvvv<<^^>^v^>^>^^^v^<<v<vvv^^v>^^v>^^>^><><vv^^<v^<>v<vv^^^>>^^<<v>><<<v><<><^<<vv<^<^<v>^<^<v><<><v<<<>^^^^><^^v^<>v>v^<^v>^^vv><><vvvvv<>><v>^vv^^^v><<<<^<<<^<v^>^>>^v<<>vvvv>^>^v<<v^>>^>v^>v^^^<v^v<vv<<><v^^<^^^v<v<v<<v^vv<<<^^<>^vvvvv^<vvv><^<^^^^<<^>v<^vv><<<v^>vv<v^<<^^^v<v>^v>>v^>><><<v<<v^<^>><^<vv^v^<v>^v<<>v^<<>vv<>>>^<v>v^^<^>^v<>^>v^v>^<>vv^vvvv>v^<<>v<v>>><^^<<^^^<vvv>^v<^>^vvv^<>^v>><v<>v^<>^v^^^v<v^<<>vvv^^<v><vvv^^^^>>v^^<^>^><>^v^<v>v<^<v<<<><vv<v>v><^>>>^v<v<^<^^v^>^<v><^^>v><^v<<<<v^v<v^vv^>v>>^^<<v^<>^v>^>v<v^v><^v^v<v^^>vv<>^>>^v<^<><><>^>v^v<><>^v<^>^<v^<vv^^>>><v<>v<><<<^^>vv<><<^vvv<>^^^^>vv<<><>^^>v>^^^<vv>vvvv<<^^<v^<^>^>>><^>v<v^^><^^vv><v><<v<^<>v^^v<<vv^<>v<<<^<^><^v^^<^v><><<vv><v<v^<<>v>><<><>^><><<>>>^v^vv<vv^v><<^^<^^>^^^<v<<<^v<v^<<<<>v<vv^vv^>>>><>vv^>^<^<v<^v>>><^><<>v^v<>^v^>>v^v^^v^>vvv^<<v<^v<><>v^><v<v>>>^v<<>v<<>v>v>>^>><v>v^><vv<vv^<<v><^>v><v<<<><^>v<^<^v><v^<v^>^<vv^^<^^<vv>vv<v><<v><^^^v<^v^<<<<v^<<^^vv^<^^^v<v^<><>>v><v<^><>><^>^><^v^^<^<<>><>>^v><>vvv^^v<vvv<>v^^>^v<<<><v^>^>>v>^<vv<<vv^^>v>^^<^>^>v><v^v>^<>>><^^v<>^^<>^v^v><>v<>v^>v<^>vv^v^>^<vv^<v^v>v<<v><^^<^^<<^^<^<<>>^<v^<>>>v^^<^^v><>><>>>><<^><>>^<v^v>><^<>v>>>^>><>>^^<v^^>^v<>>v^^v>vv^v>^<^^^<>^<v^^^<vvvvv<<<>vv<v<>v>v<^<^^<v<^^^<>^>>v>^<><v<<><<^>^^v<>v^<^vv<<<v>><><^>>^>v><>v>v>^v>^<v>>^^^<<<^>^^>>><^><^v^v<^>^^^v>v<>v<<<^<^<><>><>^^>>^<><v>^<^v<vvv^<><v>^<v>v>v<<>^v>v^><>><^v>vv>v^<><^^<v<v<vv<><^^v>^^^><<>v<^<<><^^><<>>v>^><v>^v<<^<vv<<^<vv^^^<vv>>v^v<^><>^<v^vv><><<^><^^><v^^v<^><>^v>><<^v^>v^^v^^><<vv^<>^<>v^>^^>>v>v^^vv>>><^>>^^<v><<^>^>>><>vvv^<^vv><^>^^<><<>v^^v<^vvv>^>>vv^^<>v^^>^^<vv<<v^>>^<<v<v<^v<<^<^>>^^v<>v^<v<<<v><^vv<^^><^v>^<<<vv>v<v>>vvv<><><vv>^v^v^v<^v><^<v^>><<vv><<vvv^vvv^<<v>^v>^^><^^vv^^<<>^v<>^^v<^<v^^v>v<>^>^<^^>>>v><>^<v<<v><>^^>><vv<^^^^^v^^v^^v^<^>vv><v<<<^^^<>v>^vv<>^<^v^>^^<>>^<><^<>><>^v<^>vvv^<^<<<<^v><vv<v<><^>><<<v^v><>vv>>><>>^>^<<><^>><>v^^<^>>v><v<v^>>><v>^<^<>^vvv<>^^v<v<^<<v>v^v^<><^v>>v^>v^v^v>><<v<>>v<>>^<><>v^<^^>v^>^v^>v><^>^^v>^v<>v^<>><><v>v>><<><v<v^^v^><<^>^<vv>v^<^v>v>^<<<v<^v<v^v^v^<<v^vv^^<<v^v>v<vv^>^^vvv^^^^v>^<^<vv>>>^^<^>^><v^>^^vv^^^vvv>v^v^v<^<^vvv<><<>>>>^<v^v<^v<>vv^<^<<^v>><^v<><^>^v^>^^>^>vvvv^^^>><^^<<^v>v<>^^^>v^v>^<vv<<<<>^>^>^>^^<<^vvv^<<<^><><^>><^>>^><^<v>^^<<<<>v>v><><<vv<^>^>v<v<>v>v>^^vv^>v>v>^>^>v>^^v<><vv^^v^^v>^^^<>^><^^v>v>^^>>^<<>vv>^vvv>^v^>v<vv^<<<v<<v^<v><v^v^^>v>^><vv<v^<v><<^<^<v^<>^^<v>^>>^^><>vv^><>v>>v>^^v<<v^<>>^v>>v^>v^>^>vv<>>>^<<v<><<<<^vv>v>><^<>^>vv>v<>^<><<><<v>^^vv^<<v<vv<^^>><<<>>^>>v>>>>>^<vvv^<<>vv<^<vv^^<^^v^<>^<>^^>^^>>v>v><<^<>^v<<<<v>^<^v^v>^^v>v<^>>>vv<>>v^^^^><>vv<v>><<v<<<>v^v^>vv<<v<^>v>vv<>^>^v>^<>>>>^^<><^^<<v<v^>^^>^vv^<v<v<>^vvv>v<^v^^v<>v<^>>vv^^^^^^>>vv<><vv>>v><><v>vvv>>^>^^vv^v^^^>^>^v^^^v<v>>^v<>^v^^^>^v^<v^><^vv<v^v<>vv><>vvv>><^v>v<v>^vv><v<<>v<v<^v<v>vv>^<<>v>><>^<v<><<>^<>>^^><<vvv^>v^^v><<<>v<<^v^^>^<vvvvv><^>v^^<<^>>vv<>>^^<<>v>^vv<><>vvv><>>^v><v^>vv>>>>^<v<<v<v<vv<>><^<^v>vv<><<<<v^<^>v<^v<>v<^^>>^v><><^^<<^^<<><<vv^<>^^vv>v^<v<<v><^vv>>v>^<>>v>v^>><>v>v^>v^^>>^v<<v^<>><>^^<<v^>vv^<v^^v<v><^^^v^<^>^>v<<vvv<v^<^^v>>^><v^<<vv<><^<v^<><>^><^>>^v^vv^<<vv>v<>>^>^^^v^<>v^>v^^^>v<><><<^><v^<<<v^><>^<<><^v^<<v>^<>>^<^v<<v<>v^><v<v<^v^vvv<^^><<^<><vvv<^^v^>^v>^^<>>><v<<>^^<<<v><v<>^v>^^<v^><v<<<><<v<<vv>v><>>><^>v><<<^^v>>vvvv<<v>>^^^^^<^<^v^<v^v<<vv>>v^^>vv>^^v<vv>><>><^<>><v^>>^>^<vv^>v^>vvvvv<^^><>^^>^^v>>>vv>^<<v^v>>v^v^<v^<<^v<>^^^^<^v><<^vvv>^<v><v^><>><v<<>^^v>>>>><><>>>vv^<vvv><vv>v^<>^^v^>>v>>^^<<>v^<>v>^v>><v>^>v<<><<>^><vv^>v>>v>vv^v>vv<<v^>v<>^<v>>><v>^^^>vv>^>vv^><^v^v<vvv<<v>^<^vvv^<>v>^^^<^v^>^>>>v^<><>><vvv^<<<vvv>v^<<>v>^v<><v^vv<>^<><><^>^^^^v^v><<v<<vv^v<v<<<<v^v<v>^^^><vv^^<<<<>v><<<^^>>^^^^>^vv><<v>>>v^>^vv<vvv^<<<^><v^<>^^<>^<<<vv>v>^^>^vv<^<<^<<^<><<v^>^v<v>>>>v>><^<v><<<^>^<v<^>v<vvv>v^vv<v<^^>><v^v<v<vv^v^^><<^><v<>^<^v^><v^>v^v>>^vv^<<^v^<>v<^<^^v^<>^<>^><^>^^^^v<^v^^v><<vv^<<<<v>>>>v<>>v^>^>>^<<v^<<<^<>v<^^<v>^^>^^<^<<v^<<^><>>>v<v>><^^>^<<<^<>^<v<^>>^>v><<^v<<<v^vvv<><><><<<>^<><^v<><v^<>^v<vvv^^<v<v^>v>>v<v^v>vvv<^v^^^^^v>v<^^^vvv<v>^>>>^vv^>><>^>^<>^^v<^v<v^v^><^^^^><^v^><<<>><<<<>^<^>v<<v<<<vv^^<<^>>v>^>><<<<^><^v<>^>^<>^>^<>^<<vv^>^<>vv>^v>>><^<^^v^>>^v>vv>v^^>^<<<<v><vv<<<^v<<vv<<^^<<>^vv><>v^><<v<v><^^><^><<<^^v<<vv><<><>v<<v>^>vv>^<^>^>><<<^><>vv^<>v>v^>^v<<^><<<v<^^^>^v<^^^>><<^v^^<v^^<^>v<v<<vvv<>^<^v<<^<<><>^<><>^^vv<>v<vv>^vv^<^v>v<<v><>^><^>v<<<<^>^>v<vv^>^^<^<>>^v>v>>v<>v>>^>>^<<^^<>><<vv>v^>v>vvv>^^<vv>vv<vv>><>>v>^>v<><^><<^v^>^><>vv<^<>^v>>vv<><^v>>^>v>v^>^^v<>>^^>^^^v<v><>vv^vv^^<<><>^>>v<vv>><^>>v>^<^<>^><v>^<>^v<>v<<<<v>^vvv^<^>v^vv<><<><v<>v<<v>><>v<>v>v<vv>^vv><^<^^v<><<><^^v<<>v<>v<>^><v^v>>v<><vvv^>><<vvv<>^<><^v>^v^v^><>v>vv<>>^^>vvv^vv<<^v<>^v^vv<v>v>>>><v><v^v>^^vv<<>v<^<vv<^>^<vv>^<^<v<>>v^^><^^>>>^v><<v><vv<<>^vv>vv^^^^v><^^v>>v<>vvv>^v>v^<v^>vv><><v<<vv^v>^^v<v>vv^^v^^<^^^vv<^^>>>vv<><<><><><v<<><>>v>^>>^<<>><v^>^<^^^>^><^vv><^<^vv<>><<>vv^>v^^v>><^>^v^>v<<^<^>vv>^^v^><><v<^<><<^v>><>vv>v^<<><vv<<^vv<v^<^vv<^^<^>v^v^<><^>v><>^<<>^<v^><v>^^<^>>>>>>v><^^><v^^><<^v^v>v>>><^^v>>v>><<<><<v<vvv<^^<<>^^<vvv<^^^^^^<<><v<^>v>>>^>^^^<<<<<<v^<v>v>>v<^<v<^^vv<^^<<^<<><v<<<<v<<v^^^^^^v<^v<^^^>^^>^v>>vvv>v<>>v>v<^<v^<>>v<<><<<>^^<v^v>>^<v>>><v>^<vvv<v<v><>^v^^<>>>>v<vv<<>v>>>><^v<^^<v>>^v^<<vvv>vvvv>^v><v>><<v<<>^<^^^v>v<v><^<^<>v<vv<^>>^>><<>>>vvv^<>^v^<>^<<^<v^^<v<<<vv>vvv>v^<<><>^>v>v<v<<<>>v>>><v^>^v^v^v>>>^v^<v>^>^^><>vv<^v><><>v>^<^v>^>>^<<^>^^><<^v<^v^<>^v<^^>vv<<vvvv>v>v^<>^<<v><^<vv>>^<<>v^<v^<<v^^^v<^<<^<>>vv<<^><^>v<>>>>>>><v<^^>>><vv<v<>v^>><^><^>v^>^><<vv>>>^><vv<<v>><v<<<><>v>^><vv^>>^^v<<v>vv^><^v^><>^v^^v>^^<>>^vvv<<v<>v><>vv>^^>>v>^>v<^^<vv<>>v<v<vv^^<>>v>v<>^v<^vv>^vv^vvv<^v><>><vv><<^<v<>>>>>>vv<>^v<<<^<<vv><^<<<^^<v^<>^^<v^<v>>^<^<<>>>^^v<^>^v>^<^vvv>>v<^<vv<^>^^^>><>^<>v^><>>^^v^<v<v>^>><v^^>^>v<v>v<><><v>><<v^<vv>vv<^>^v^^v<v^>v^><<>^v>^^<^v^><v<><<><<v>v^>^vvv>v<><<>^^<>^<><>^<>v^><v^><><><>>^<vv^><v>^v^><<>vvv^v>><>vvvv<<vv^v^v>><>v<<^v>^v^<^^><><>^>>^^v^v>v<^<>vvv^v^>v^v^><>^<><<><v^<^>^>vv>v>><>v<><><v^>^>><<^<^<<<^<>^><v^^v^<^<v>^<>^>^^>^^>^><<><>^<v>^>><v><<^<><v^v><v<>>v^>v^^>vv^v^>v^><vvv<^<v><^><>>v>>>v<>^>v^v^^^v<<v>><v>>^^v<vv^^^^v><<<^v>^>>>^v^>vv>^^>vv<^^^v<<<><<v^>>>v^<v>>v>vv><><<v><>^<v<<v<>v^vv^><>>><vvv><<>><^<<<>v><v^>^<v<<vvv><^<>^><vvv<<<vv^^<v<<>v<<<^>>^^v><vv>v><^<><<^^^<>^^^>v^v>v><^<<^v<>v^>^>>^^^<^<>v<^^v<^>^^^>^<^v>v>^^<v<^^v<<^vv>v<v^<v<>>v^v^<^>>>><<^<>vv<v<<v^>>>^v><^^>>v>^v<v>^>v^>>^^vv>v^v<<^^^^v<^^><>^vv>>^<^<>v<^^^<^v<^<><<^v>v^<>^v<>^<>v>><vv<^<^^v>>><>^^^v<^>>>^v<v>>v<>>><vv>^<^><v<v^>^<^<><<^v>><<<^>^vv^^v>^vv<>v<<<^<>vvv<<<<^<>>vv>v^<<v^^><<>vv<vv>^^^^<v^<^>><<^^v<vv<v>>v^v^vv<><vv^^>^^<v^v>vv^^v><<<>>^^<^<v^^>v><^>v<><v><^>v><<^>>>>>^>v^^v><^v>^>v^>^>^^>^^v<^>^^>^<<^v^^vvv><<>vv^>^^vv>^vv^v>><>><vv><<><>>vvv^^vv<<><v<^^^<<^vvv>^vv>^v<>^^^vv><^v>v^<v<v>vvvv>>^^^<v<<^>^<>^<^><<>v^v^v^<v^><vvvvvv^<>><<<>vv<<v^^v>v<v<^^<<^^><^^<<<<v><<^<>>v<>><vv<<<>v^^<>>>>v^^>vv>v>v^^^^^vv<v^^v<<>><>^v<>^v>vv^><>v>><><^<^>>^^v^<<^><^>>>>>>>v><vv^^v^>^<>>^vv><vv>v^v>^^<>>><v^<<^<>vvv^><><^<<<^<>^>>>>v^^^>^^^<<>^<v<>v<><^v^^v<><>>^v^>^><<^v^^>v>>>v^>^>><^<^v><^<^^<^>v^^<^v^<^^^><>><^^<<>><^v^v>vvv>vv^<<^vv><<><>vv<>v>^>vv<>v<^^<<vv<^<>v^vvvv><v>^<>^v<^vv<v^v<^^>v^^<<vvv<^v>v><^>>^>^^<>vv<><^<^<^vvv<v^>^<>^<>v>vvv>v<<v><<<<>vv^v<>>^^v>^^v>v<>v>^v>>><<><<^v^^>^^v^^v^v<v>^<v>><v<^>^<>>v^^><v<>v>>^>^<><v><><v^<<^v^v^^^^<v^<vv>>vv<<<><^vv^<^^v>v^^>v<>><><><<>><^<<<^>v<^^^>^^v>vv<^>><><v>>^v><^<>v^>>^^<>^vv>>^^^^v<>><^<><>v>^v<<>^<v<^v^v^>vv>>>>>^>>>vvv<<<<^<<^<>><vv<v<<vv<v>>^<v<<<<^><<>v>v>v>^<<^^^<>^vv<>^v>vv>>>vv^^v<<>vvv^>^<<v>^v>>vvv>><>vvv>>^^v<^^v>^v>vv>>><vvv><vv>>v<<^v^<<<>^^>vv^><^v<>vv<<^<v^^v>^<<v<^>>><^^<v<^v^v^^^<<><^v<>^<<<v>^v><<<^v<vv<v^<v^^vv^<><<<>>^<><>^^v<>v^><><^^>vv^v>v>^v>^<>>vvv^>^vv^><><^^v<<^vv>^^><v>^<v^<v<<vv>^><^<v<<^vvv<><>^>^<^vv<^>vv>vv>^><<<>v<<^vv<>vv<^>>v<>vv^<v>^v<v<>>^<^^v^vv<><>>v>><vv>><v^<><>v^>v^><^^v<>v<^v^>v>><^v>>vvv^<>^v<^<^v^v>>^^vv<<v<v>>v<^><<<v>^<<<<<^v<vv^v<v>v<v^>>><^>^^^vvvv><<vvv^><v>><>><v<>>^v<vv^><v><^^<>^>v<^<>^vvv^v^^<<^vv<<v^vv<>^vvv^<v<>><vv>v><>^><v<>^<vv<v>vvv^^>v<v<><vv>>v^^><<>^>^^>^>^^v<<v<>>>>^>>>v><v^<<<<^^>v<^^^>^^vv<><vvv><^<<>>>^<<vv^<<vv^v^<^^vv>v<^^<>^><<>^<>^>>><>v<>vv>^><>^<^>>^^>vv^v>>v>^^v><><^^v^^^^v>>>><>>vv^^v<^v>v^>^<v<<>v><vv>>v<<>^<<<>^<v>vvvv>v^<v<<<^^vvv>^>v<<>^^<<>v<v^v<>vv<^><vv<>^<v^><v><v^^^v>^vv<v>^^v<^^>v<><vvv<><<<>^vv>>v>^<v><^vv^>v^>>v>v^^<<v<>>v<>v^><<<^v<v><v><^v^><>^^>v^<v^<>v<^>^<<^^><><v<vv>v<>v<<^v><<><><^^^<v^^<v^<^vv^<v>v><<^<vvv><>^<<^^v^^><>><><>><^<><vv<>>^<v>v><^>^vv<<^vv>>><>v^>^vv>^vvv<^^>v>^v^^^^<v^<v><^^^v<v><<>^^><<<<v<>v><<>^>^vv^<^>^<<<<<vv<<^<vv<<<v>^<<>^>^v>^>>vvv^>vv^<^v<>>v^^<v<^v^^v^v^v<<>><v>^>><vv^^<^>>><><^>^v^^<^>><<<>^^>v<><^<>^^v^>^v<v>v<<<^<><v<<>v<<<v^<<<<^^>^><vvvv<^^>>^v^^v^<^>><<><><v<>^^v^vvv<<<v<v^^>^>^v>>>><<vv^v<v^>>><v>v><>vv^<><>><^v>^>^v>v<^<>>^vv<vv>vv^^^<<^v^<><>v^vvv^>^>^^>^>^^><<^^vvv<<vv>^<><^vv><>^<v^v>vv^v>>vv<<<v^v<><>^v<<v>^>><><^>vvv<^v>>>vv><<^^<v<^<><^vv^^^^><>><v<>>>>vvv^>>vvv<^<<>><>v>^vvvv>v^vv>v^<>v^^>>v<>v<<^vv^^<v>^>^^<^v<<^v^vvv>^<<v>v<<^<><><v^>v>^<^<<^>>>^^^<v^^<v>>>>v>>v^<^^><>><^^<^v^>^>>v^<v>^><<^<^<<^v<vv<<>>^v>^^<^^>vvv>v<>v<>v<<>^<^<<><<>v>^^>v<^vv^<^<>>vvv>><<vv>>vv>vvv^^^^>>>^^>^^>^><<vv><>>^<^^^<v<^^^>vvvv^>^>><^^>><vv>v^<>v^<v><vv^v>^<^>^>^^v>^v<<vv<><v<<v^^^^<><v<>^>>^><^<^>vvv>><^><^<<v^<>^v^^^<>^^<^v>>>v<v>v<<<^>>>^>^^^^^<<v>^v>vv^^>><vv>v<^^v^><^^<^><v^vvvvvv<^v<>^v^v>>v^^^>v<vv>>>>>>>>^>><<<<><<<v<<><^v>^><^^<<vv^>v<v^v<<<^>^vv>><>v<><>^v>v<^<<<<<^>vv^>vv^v>^v<^v^^>v>^>>v>>v^v^v>>v<v^<<^><<>vvvv<><><v^>>^<v><<vvv<><><v>>^v<<v^<>^^v>><^v>v<<><>^v^^v<^<<>>>^^>^<>^v>^v^><>v>v<^>>vv^<><<vv>^v<^vv<^^v<>^^vvv^v<<<v^v<^<^^<v>^vv>v^>^>v><>v>>^>>^v>>v^v<^^^v>>v^<>>v>><>vv<v>v<^<>v^>^><><v>v<>>>>><vvv<<<>><vvvv^^<v<>>^^>v^v^>^^<v^>><v>v^^><v>v>^^>^^v<^<^<<^<^vv^>v<v^<^^v><v<^><^^^v<vv>^v<^^<>><v^^v<v^<<^>^>^<<>^<^><>v<vv^v^^>^v<^^^>^<><<>^^<>>>v<<v^>>>>v^^^>v<>^v<v>>^^^<v<>><>vv^<v>^<><<vvv>>>^<>^vv^<<<^>v^^<>><v>vvv>>vv^vv<^^><^^<<^v^^><<^^><v>v^>><<>^vv>^<><<^^<<vvvv<^vv^^<^v><v^^v<v^^v><<<^^<><<<^<^v><>>>v><<><v<^<><^vv<v<<<>v>>^<v^>>^^<<>^<>v^>><>>^^^vv^v<>^>^v<^<^>v^<v>><<<v<^^v<^^^<>><v^>>><^><^<v><^v^>><v^>>>^><<>>^<^^>v<<>v^^v^<<<>^<>><>^vv^^<^^>v<><<^>><^v<>><>v^v><>^<^>^<<v>>v^^<v<v^<<<><<<^<<^^v<>v<^<v<v>^>>>v<v<^>^<<<>><^^^>>vvvvv^><<<^^v>^>>^^><<>>><<v>>v^<><><v>>v>>>v>>>vvv>vv<^<>^><><v<v<><v^<<^<^^v<^<^v><>><>v>v>v^<>><v><<vv^v^^^<<>vvv^^v^v^v^<<^<>^v^^<vv^v<>^>^>^>>v><<^<>^^<^<>v^>v<>><>v>^<v^^><>>^<<v^<><>^><<<<<<^^^>><^^>^^v<<<v>^<<<>v^^^v^^^^vv><>><v<^^>>>v^<^<<>^^>v^^<v>>v^^v<<^><<^vv<>v>>vv^<v>><v^v^<<vvv^<><<^<^^><><v>^<^^<v<vv<^^^^>^<>v^^vv<^<vv^<>^^<v^^<^>^><^>^v>v^<>>^^>><vvv<>v<v^^>v<vv><v>^><vv<^>>>^>^<>v^^v>^>>><>vv>v^vv<<^<<v<^<<v>><><><v<<^^^vv>>>v^v^<>^>><>>>vv>><^vvv<v^><>v>>v<<>^vvv>>^vvv^v>>>>^v><^^^>^^><^v^v^<v<^<v<^^>vv><v<^v>v<^^vvvv>><vvv^<^v^<v<><><vv>>v>^<><v<<^vvvv>>>v^>>v<<>^^<<><^^^<><v^v^v<><>vv>v>vv<<>>v>><^<<^>^>><>^>v<^^^^^<^>>>>v>^><^^>v<<<^^v>>><>>^v<v><>v^^>^^vv^v<>^v<^^>v<^<<>^><>v<<>^^<v>v<><^<vv<v^v<vv<<^v<v<<<><>>^^>v<<>>v^>><>><>^vv<<v^vv><><<<v<v><v<<^>>^<>vv^<v^<<><<>>^>>v>>>v><>^>v><v<v>><>^<<^<^^<vvv>v<<^>^v>>>>^>>^>>v<^<vvv><>><vvv<>^^^^^>v>>>>>><<<<v<<<>><>><>>vv<><>v<><<^^<vvv>^<^<^^^>><vv^>>^v<>v^^v^^^<vvv><<<<<v<v<>^<>>vv^><^<^^^^<>v<<vv<>vv>><<^vv>>>>^vv^>><v>v^><v>v<^>v>v^v>><^<>v>>v<>vv^<<vv>>>^vv^>v^<>^^v^<>v<v^<<>><v^>^^v<^>>>>>v>>><>^><^v<>>v>>v<><><<>^v^<<^^v>>vv>v>^<>^vv>^^>^v^<>>vv^^^<>^<^^<<<^vv><<v<^v>v>>>^v>><>^^>>v<^><<>^<^^>^><v<v^>>v>><v<v<>^<vv<<<<vv>v>vv>>><>^^v>^^>v<vv<>v<v^>^vv^>^<>><><vv^<^^v><v^^<<v^^v^>><>>v<>v^<<^v<>>^v<<vvvv>v^>^>v><<<v>^>^>v><v^><<^>>>^^>v>>>^<<><v<^>^>>^v>v><v>^>^>vv>^>>^^>v><>vvv<>v^^<^^^>^<><^>>>vv<<><v>v<>v<<^>^^>v^^<v<<<>vv<>>vv^>v>><vv>>vvv^>vv<<<^>^^v>^^<v<>v>>^v>>^v>^v>>^>^<^v<^>><vv^<>>>^<v^<vv><vv<<>>v^><v^<<v<>^>^vv^<v<^>>><<<^^>>vv><v><><><^>v>vvv^><<<<<>v^^<^v<^>^>^^^^v<<^^^v^v<<^><^^<^>^v>><>>v^>><v<^^^<>>^>^v<>>>^v>>><><vv>><^^^^^>><v>v><^^^<<v><vvv>vv<><^v<<^>v<^<><v<>v^<v^<^><^v>^><<<^v><><^<<>vvvv>^v^>><><<>v>^^>^vvv^^^<<v^>^^^<<v^^>^v^^vv<>vv^v<><v<>^v<><v^>^^<^><^>v<><^v<<><^vv<<<<^^^>>>^^^^<v^^^v^>^v<^v>v>v^><^>v<<>>^><><>^<^v>><<v<<<^^>>v><<v^^><vvvvvv<v^<>><>^>>>v^>v<vvv^<^^>^>^v<v>v>>^>v<^v>^>^<v^^<>^><<<<<>vv<^v<^v<^<^><>v^<<<<v>v>><^<v^v<v^>^><v>><<<>v^><<^>v^<>^<v<<v<<<>^<<>vv<>^^v>>v>^^v^><><vv^<v<>>^>><^^>>>>^<^>>>><vvv>^vv<>vv^<v><^<>^>^^>^<<^><<>>>^>>v^>v>^^^>^vv><>><vvv>v>>v>^<v^v>^><<<v^>^>vv<>v^^^>^^v>>vv<>>^v>v>^^<<vv><v<^>vvv^><<v><<v^>>^^^^>vv^<<><<>vvv<<v^^v^v<<v>^>>^v^<^>v>^<>>>v>v^^v<<v><>><<><^vvvv<<>^v>><^><v^vv>>>>^>><v<>>><<^^>v^^><>v>vv^>>>>>><vvv<^>>vv<>^<<v>^<<>v>>v^v^>^^>^>vv^v^>^><v>>v<^>^v^>^<^<v<<^vv<^><vv<^<<>v<<vv^>^v^>>v^v^<<<>^<^>>^<<v>>^>vv>v^^>v>>>>><^^<><>v<^^<v<v<v<v>>^<^<<>^vv<vv^>^v^>v^<<v<^v>^>vv>^<v^^^^<^<v^^<v<^<v^>v<^><>><vvvvv^><v<>v>>^>>v>>v>^<vv>v><>>^>>^<<vv^^><^v<<>^<v^^v>^^v>v><<v>^v<v^<>^>v^^>v>>^<^^>vv>v<>^v<vvvvv<^^v<>>^vvv^<^^v^v<<v<v><><>^^>v<<v<<<v<<^<^^>vv^^<^>v><v^^^v>vv<>>>vv^^<><<v<>^v^>vvv><>v^vvv>>^<>>vv^v>><vv<^^<><>>v>v^<><v><^<><^v>v>v><^>^^^v^<^<v<><><vvvv<<>v><^^<><^v^<^>v>v>vv<vv<<><^<^><<v^v^v<v<><<^^vvv>><<vv^<>^<v^>v^^>^>v>vvv<<><^>^^^>v<^vvv>v<^^>v^^^>>>><vvv^<<<<^<v>><><^<v<>v>v^^^^<v><v<>v<v<^^v<<^><^v<v<v^vv>^>v^^v^^>>><^vvv>>>^^^>>v<^<v<>^v<vv<^^<<v<v><<v^^v<^<>>^v^>^<><v<<v<>vv^^^v<v<<<v<><>>v>v><<<>>^>v<v^^v>vvvv><><>><^^v>vvv^v>^v>^^^^<v<^^>v<>>vv>><vv^v<^>^<^v>^v>vv<><^>><^<^^^^<^>^>vv<v<vvvvvvv<^<><^<<<vv<^<>^vv>^^<^><>>v^<vv<<<><><v^^>>^^^v<<<^>^v^<vv>v>^v^<vv^^v<v>>v^<<^>^><><<^^^<^^>>^^>vv<v^v^vvv>>v<v^v<<>v<vv><v^v<<>>vv^^^>^^v^>^<><>^v^<><vv<^v>>v^v^^>^vv>vv^^><v>vvv<v><<>v<v^vv^v^><v<^v<v<^>^<>v<v^v>v<v^<v<^^<>^>>v<<>><>>>v^<><<<<<^<v<<>><><v><<<<^<^^<^>>^^><<^v><^>^vv><>v<v>v<><v^<>v<vvv^^<<<>^^v><>>v<v><<^v<>><v^v>><<<v><v<vv^^^vv>>^^<<><<^>v^<v^^^>v><v<>>>^vv<^^>^<>^v<v>>v^<>^v<>^^<<>v<>^^><v^<^^^<<^>>v<><v^<>>v<v^v<>v>^>>^v<^^v<<^><^v>^>v<v<<v^^v>^<>^^v<v>v><<^<<v><>><<^vv^^<<<>v<^<><^><<^><^<<<^<>^^<>><v^v^vvv^v<^<>>^v<<^>>v<>v>v<^v^v^v>^<^v<^^>>v^<v>^<>^<<<>><<^^><>>v>^v^>><^v>^<<vv^v<<v^<<>^^>^<<><<^v>>^v^v>^<<^<v>v^v>>v^>^>v>^v^v<v<^^>>v><^>^^>^^^v<vv>^>^^v<^^>^><>><<>v^vvv><<><^<vv^<>v><v^<^<>>v<<>>v>>^><v>v>^^^<^^><^>>>^v^^^<>><>>>v^vvv^v<vv^^vv^<v^<<<^^>^v>v<v^v<>><^>>v<<^>^>>v^<<^>>><vv><^<><^>>^>>^vv^<>v<^^>v>>><<>><<^<^v>^>^>^v^>>><^><<><^<<><<<>v^^^^vv<>vv<<^>>^<vv<v<^v>^><v>>><^vvv>^<v><>^v^^<vvvv>>v^^v<>^^>^<>><><v<^^vv<^<<<><^^<^^^^<vv<v><^^<>><>>^<vvv>><^^>^^><^<><v^<><>>^<v<^^<vvv<>^^<<^<^^^>><^^>v<v><>^^^^>^^^><v>><v^>v>^^>^v<><<^<>vv<>^^><^vv<v<>><>>>^<<<v>>><>v>^<>^<>^<v^<<v^^v<<<<v^<<>>^>v>>v>>>>^<v^vv<<v>^><^^^^^><<^>^^<<<<v>v<^vvv<<v><v>><vv>>vv<^^<^^vvv^^^^v<<<^<^>v^vv<<^>vv>^<v><>^>vv^>v>v<>^<<>^^v>^^v>>>^<v><v<vvv<vv<<vvv^^<<<<^^v>vv>>^><v^^>>>><>>^v^^<><v^>^v^^v<><^>^>><^<<^>>>vv<v<^>v>vv^><v<>v>>^^>^>vv>vv<<^><^vv^>v<<>^^<<><>^v>vv^v^><<^<<<v^>^^<>>v>^^<><^<^<>^<v>>v><>>><>>v><v>>v>^v<<>v^<>^vvv<vv><><<<^<<^<>v^><'
};

const OBJECT_TYPES = {
  WALL: 'WALL',
  FREE: 'FREE',
  ROBOT: 'ROBOT',
  BOX: 'BOX',
};

const OBJECTS = {
  [OBJECT_TYPES.WALL]: '#',
  [OBJECT_TYPES.FREE]: '.',
  [OBJECT_TYPES.ROBOT]: '@',
  [OBJECT_TYPES.BOX]: 'O',
};

function viewMap(currentMap) {
  console.log(currentMap.map((row) => row.join('')).join('\n'));
}

function findRobot(map) {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === OBJECTS.ROBOT) {
        return { x, y };
      }
    }
  }
}

function getAllConnectedBoxes(x, y, map) {
  let done = false;
  let connectedBoxes = [`${x}-${y}`];

  while (!done) {
    let found = false;

    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[y].length; x++) {
        if (map[y][x] === OBJECTS.BOX && !connectedBoxes.includes(`${x}-${y}`)) {
          connectedBoxes.push(`${x}-${y}`);
          found = true;
        }
      }
    }

    if (!found) {
      done = true;
    }
  }

  return connectedBoxes.map((box) => box.split('-').map((coord) => parseInt(coord)));
}

function push(pos, currentMap, direction, checkNeighboursToo = false) {
  let done = false;
  let step = 0;
  let next, nextX, nextY;
  let positions = [];

  while (!done) {
    step++;

    if (direction === 'left') {
      nextX = pos.x - step;
      nextY = pos.y;
    } else if (direction === 'right') {
      nextX = pos.x + step;
      nextY = pos.y;
    } else if (direction === 'up') {
      nextX = pos.x;
      nextY = pos.y - step;
    } else if (direction === 'down') {
      nextX = pos.x;
      nextY = pos.y + step;
    }

    next = currentMap[nextY][nextX];
    console.log(nextY, nextX, next);
    if (next == OBJECTS.BOX) {
      if (['up', 'down'].includes(direction) && checkNeighboursToo) {
        ;
        console.log('check neighbours', getAllConnectedBoxes(nextX, nextY, currentMap));
        positions = [
          ...positions,
          ...getAllConnectedBoxes(nextX, nextY, currentMap).map((box) => [box[0], box[1] - 1]),
        ];
      } else {
        positions.push([nextX, nextY]);
      }
    } else if (next == OBJECTS.FREE) {
      positions.push([nextX, nextY]);
      done = true;
    } else if (next == OBJECTS.WALL) {
      positions = [];
      done = true;
    }
  }

  if (positions.length === 0) {
    return false;
  }

  console.log(pos, positions);

  for (let position of positions) {
    currentMap[position[1]][position[0]] = OBJECTS.BOX;
  }
  currentMap[positions[0][1]][positions[0][0]] = OBJECTS.FREE;

  return true;
}

function collectBoxCoords(currentMap) {
  let boxes = [];

  for (let y = 0; y < currentMap.length; y++) {
    for (let x = 0; x < currentMap[y].length; x++) {
      if (currentMap[y][x] === OBJECTS.BOX) {
        boxes.push([x, y]);
      }
    }
  }

  return boxes;
}

function part1(input, wideMap = false) {
  const currentMap = wideMap ? duplicateObjects(input.map) : input.map;
  const robot = {
    ...findRobot(currentMap),
  };

  for (let move of input.moves) {
    currentMap[robot.y][robot.x] = OBJECTS.FREE;

    switch (move) {
      case '<':
        if (push({ x: robot.x, y: robot.y }, currentMap, 'left', wideMap)) {
          robot.x--;
        }
        break;
      case '>':
        if (push({ x: robot.x, y: robot.y }, currentMap, 'right', wideMap)) {
          robot.x++;
        }
        break;
      case 'v':
        if (push({ x: robot.x, y: robot.y }, currentMap, 'down', wideMap)) {
          robot.y++;
        }
        break;
      case '^':
        if (push({ x: robot.x, y: robot.y }, currentMap, 'up', wideMap)) {
          robot.y--;
        }
        break;
    }

    currentMap[robot.y][robot.x] = OBJECTS.ROBOT;
  }

  viewMap(currentMap);

  return collectBoxCoords(currentMap)
    .map((box) => box[0] + box[1] * 100)
    .reduce((acc, val) => acc + val);
}

function duplicateObjects(map) {
  return map.map((row) => row.flatMap(cell => cell != OBJECTS.ROBOT ? [cell, cell] : [cell, '.']));
}

function part2(input) {
  const currentMap = duplicateObjects(input.map);

  viewMap(currentMap);
}

console.log(part1(test_input_2, true));