const fs = require('fs');
const { sample, uniq } = require("lodash");

const test_input = {
  samples: ['r', 'wr', 'b', 'g', 'bwu', 'rb', 'gb', 'br'],
  plans: ['rrbgbr'/*'rrbgbr', 'brwrr', 'bggr', 'gbbr', 'rrbgbr', 'ubwu', 'bwurrg', 'brgr', 'bbrgwb'*/],
};

const final_input = {
  samples: ['ububwuu', 'ub', 'gbwbgr', 'rrur', 'ggbuwg', 'uuubrwb', 'bww', 'brug', 'bgb', 'ugrbb', 'ggwuu', 'uur', 'wbwr', 'gug', 'gbgub', 'rru', 'urwbw', 'bgwgu', 'gguguu', 'wbgguuw', 'buubuuu', 'bgugrbr', 'wrwbr', 'ug', 'rrww', 'ugug', 'urr', 'ugbgbw', 'rugg', 'wrguuw', 'rwwbwwww', 'wgwbbr', 'bbur', 'wwgwr', 'rrug', 'rugugr', 'bbrw', 'wbgruw', 'urwbbw', 'bgrwgb', 'rgwgrr', 'wuruur', 'bruub', 'wg', 'wwguwu', 'bggbubbg', 'bu', 'urb', 'rugwuuu', 'gwgww', 'wubbg', 'gbb', 'urw', 'bgwrb', 'rrwwu', 'gurbrg', 'ggubgu', 'rub', 'rgub', 'buwug', 'rbguwwb', 'bgrur', 'bguuguu', 'uggbu', 'rug', 'rgrw', 'wr', 'wbbrw', 'ugwrwb', 'bugbubg', 'uwrb', 'gwwwuu', 'rgw', 'uw', 'grbrr', 'ugbwbgg', 'ubrr', 'wug', 'rrbgw', 'buru', 'bwb', 'rgwrg', 'gwrwubb', 'buruurw', 'bwgwg', 'gwbruuw', 'bwbr', 'gw', 'br', 'wgugg', 'gurwb', 'www', 'rgggg', 'rgu', 'grwgrwr', 'uru', 'uwu', 'wwuugbr', 'gbr', 'gbbwgw', 'wwbbrb', 'uubg', 'brgwbrr', 'gww', 'ubbg', 'g', 'bwwg', 'rrbb', 'bug', 'uburg', 'guu', 'rubruw', 'rrbr', 'rgwrrug', 'urbwrub', 'rubggrgb', 'uggw', 'wgu', 'ugw', 'bubbw', 'uwbu', 'wrgg', 'ubgub', 'wbu', 'bgrrb', 'gwbb', 'rgbu', 'grgu', 'rgb', 'wbw', 'bbbb', 'gbwbwbw', 'bur', 'wu', 'gub', 'wub', 'brg', 'gbrw', 'gwu', 'ru', 'uugw', 'ggwbrb', 'ruu', 'rgru', 'rb', 'ubuu', 'gurgbu', 'urww', 'gru', 'uwbb', 'wburw', 'ugbbrwgr', 'gg', 'wur', 'bwgbb', 'bgggr', 'wrur', 'buwub', 'uwwguuu', 'uww', 'bugb', 'bbg', 'bugbu', 'rubg', 'wuu', 'grgbug', 'wrbg', 'ggw', 'uugu', 'rburug', 'bgru', 'bbwuwg', 'gbubg', 'urwwgw', 'buu', 'wwb', 'rguu', 'brb', 'wwrwg', 'grb', 'gwbrgw', 'ugu', 'wbruu', 'ubb', 'rubgw', 'grrbr', 'r', 'ubbwub', 'urrg', 'rgbgu', 'gbwrggwb', 'wrg', 'rrr', 'rw', 'guw', 'wrbruurg', 'rgr', 'grrub', 'rrgguug', 'rrw', 'uwuu', 'grwu', 'uug', 'rr', 'ubu', 'gggrr', 'guburg', 'guwrb', 'wgwrugb', 'rbbgu', 'ugbru', 'buwwbur', 'rwwr', 'wwgr', 'bwg', 'rgwgg', 'gbgrur', 'wguwg', 'ggbrb', 'wgguwgg', 'bwr', 'grgur', 'gbwuggr', 'gu', 'urrgrw', 'uburu', 'wrbrwbwu', 'gruwgr', 'wgbgubrw', 'gbbg', 'ubw', 'grwwrbu', 'wbgw', 'rrbgr', 'rwr', 'ggu', 'bgbbwu', 'ww', 'ur', 'ubuuwr', 'wwugb', 'urrb', 'grr', 'grrw', 'rwg', 'wwgurwr', 'grbr', 'uub', 'rguurrg', 'uurg', 'urrggbu', 'rbrw', 'uwg', 'rgrrubgb', 'grbur', 'grgb', 'rurg', 'ugrbr', 'rww', 'bwrugu', 'bgwg', 'uguw', 'uwwu', 'ggrgbg', 'grg', 'wwu', 'rbgr', 'rggrbwuw', 'bgr', 'bwrw', 'wbuu', 'wrwbwu', 'wgr', 'ugwwwg', 'gggu', 'rwwrbrb', 'rrg', 'wrrr', 'rurb', 'wubruruw', 'brr', 'ugubw', 'gbuuwr', 'uu', 'gwb', 'bwru', 'wbwggug', 'bgu', 'gggrbrrg', 'wubu', 'grw', 'gbu', 'ruuu', 'bbwb', 'bw', 'wuw', 'ugrw', 'brurb', 'wuwrbr', 'wrb', 'brw', 'rbg', 'bgurb', 'uuw', 'uwur', 'rwwruwgu', 'gbuuug', 'urwrwugr', 'bgrr', 'gwr', 'wgwr', 'ggugu', 'wburwrb', 'rggur', 'ggg', 'rbb', 'gguu', 'wb', 'rwwgu', 'rbw', 'grrbuuu', 'rrgg', 'wrw', 'wwbg', 'wwg', 'wrww', 'gbug', 'bwubwuu', 'wru', 'ubrguu', 'wggg', 'rg', 'wwwb', 'ubr', 'bbw', 'rgwwbwwr', 'urbwub', 'rwb', 'urub', 'gguug', 'rburru', 'u', 'rgwr', 'ruwurru', 'rggwg', 'wbg', 'ugwbbwb', 'ruub', 'wbuw', 'ggr', 'gwwgb', 'bbbrru', 'rbub', 'rur', 'rwubbrru', 'bruuwg', 'rrrw', 'gwggww', 'rwu', 'rggw', 'gubuuw', 'gugbbggw', 'ubg', 'wgw', 'bwug', 'wwuruu', 'wbb', 'ubguub', 'rgg', 'brrwr', 'wwrgb', 'brrbg', 'uwb', 'w', 'gubuu', 'uggbbr', 'uwr', 'ugwg', 'ggwbww', 'bwu', 'ubgbu', 'rbbbu', 'brgr', 'bwub', 'uuwgu', 'gb', 'bbu', 'urg', 'rurwrbrr', 'rrb', 'ugbbru', 'grwrw', 'wwr', 'wbbbg', 'ggurbgu', 'rrbgrbur', 'rbu', 'gbg', 'rwwwr', 'ugr', 'ugrrb', 'uwwbugu', 'gbuuwg', 'rguubu', 'urruu', 'brgub', 'gwg', 'uuu', 'bgw', 'rgrgb', 'rrurb', 'uggr', 'rgbbrg', 'burr', 'wbru', 'wuug', 'rwgubuww', 'ugb', 'gggr', 'ugg', 'ruuug', 'brrg', 'wuur', 'wuwb', 'grgrrb', 'wgb', 'bb', 'bbr', 'bbrgbw', 'grgbr', 'urbb', 'gbw', 'bub', 'ruw', 'ggb', 'bru', 'wbr', 'wgg', 'grrwug', 'uwwgr', 'brru', 'gggbgrw', 'rrurbgu', 'wruw', 'wrr', 'ubbgb', 'bgguwb'],
  plans: [
    'bggwbgrwuguugubbuuubgrwgubgwgugrbuwguuwgugggburgurwbwgbwrg',
    'uwrrurwgubgrgwbgrwgwgbgbgwbrgbwwguwguuggrgbwuwbbbwgwrbgg',
    'rgwwbrurrrbbwrwuubwubuwrgbbrruuwwgwuggwwgubgbbubgr',
    'gbubwggrgrbrggrbgrgbuwuguwrrrrrwbgrrgguugurbuwggwwbrguugbu',
    'gwrgubuggbuwbgwbrrgbuwrrrgbrbwburgwrrwuguwuwuwgrurrwwggg',
    'rbwurwubrwwuggrrgrbgurbgbgruwbwgwuururwuggggbwrgu',
    'brugwwwubbgwgrgbwggrggwugugrwwgrwgwgruwrgwgguru',
    'bwuuwurubugbwgwubruruwrurbbuwggbrwgurwbuwwurggwuugbb',
    'wwwbrrwugbbrrbgwrwurwbugwggbubgbggwbrrbgwub',
    'bubrubwbgbrgubuuuwugrwgwwrbbubwrruwrrrrrrruubruwgburbr',
    'rguwwrrggubrbrbuggubwubgwugwrrbgrrrwugwbwurugurbwwugbg',
    'ubgbwuggwrrrrururgbwwrwgurwwbrwgwggwgwubrrwwrrwwrrbbu',
    'grururbubgwrubbrwwbrwubrrbbwwggwrbbrruubbubrug',
    'wbuuuwgwgwgwggwguwrwwrwbwwbwruwugwgbbgruurbrwg',
    'ubububbwugrgurrgbrbwruggrwuubbwuuubbrrbuggwgrbuw',
    'guwwuwuwbrgugwwbbuwbgwguruurrgrbggbruwrruwb',
    'bggbuuwggwrbbwwgguggbwubggwugbgrbwbuwrgguruwubbgrg',
    'bggwubbugubugurbbrgbbbrgurggrruubwbbrgrwgbrgbwguwbrbwwurwrww',
    'rurrwbggrwwggbrbwugrgrgwurugbbugbguruuwrwrrrgbruguggbug',
    'ggwwugwrbggwgrbbuugwgggubrbwgwgbgurubwuuwbggrwugbgwbrbwbb',
    'bggwggbuwrrwbguurwrruwbguurgubgbruurbrgbbgwggrbggurrrb',
    'gbrwbrwwugwbwguwgurggbwwrbuwbuuuruugbuuggwgw',
    'bbgrubbbrgbwurwbwgrgbwgugurbgbgbuggwrbbrgbbu',
    'rwwbbgbugbwrrgrubgbwggrwgwruwurrubwruwwurggrrbwwwbgurw',
    'wwgbgurrrbwwgruwgggugbwwurwbbgrwruwbbbbgwbw',
    'rrwbbwwrwgbbgrgwrubbwwrbuwrgbgrwwugrbgwguburrrguuubrrggbb',
    'buwururbrwurbguuguggggbuguugguuwbubbrrgubwbuuwwgwwrgruw',
    'bggwguwrwruwruwrrgbrbgwugwbbwugbggugwwbrrurubu',
    'bggrbwwuwurgwrrgrgwgguwwgburuwbbbgrruwgbbwruugu',
    'gruruurbgrbbwwubwbrubruurrruwrbrwubburruub',
    'wwwruuwbwwwwubgrruggbbggwbubwrrrbgrbwrbguwgwububuubg',
    'bwwwrubwwuwwwuwuggugrgbrrbggubrwgrgwbrrrgwgbggubuw',
    'bggbbggwbwwuwwbgrwrrbrbwbgrgggrggbwrbuwwrwwwwubuuubwg',
    'bggrwbguugwubwrgbrwuurgruuuwbrbwgwbwrwuuwwgrrrgrgwwgguwrwb',
    'grwbbbgggwubwbuwubbwwbuwubrrrrguuguwugbrrubwgrwrbbr',
    'bbgugggwuruwurbrbruwbwgrggugbbrwgrgbwbggrr',
    'wrrwwubrbbbwrbugwwwugwwrggubwugubrrrwgbubbguwwbrrgbu',
    'rwugwuwubuwwrggwrurgwbwubrbgurgbbubwurwrbrbgrwbrw',
    'gbrwuruurguwbbwgburbgugubgguwwruwruruugwgbwbgg',
    'uwbrbbrgrubwggggwbrrrurururbwbrburgbbrgwuuruurrbrgbbwg',
    'bggrbwguggurrgubrbgrubwwggrgrwrrbrubwrbrgwbgwruuwuwwggrubbuw',
    'uuuubgbubbrbrbwgbgrbggwruubwuwbbrurbwwbugbrrwwbuugr',
    'bggbgurwbgwwrwbbwuurgwbrwubbuuurwgbruwbubrrwuburgbwbbgugub',
    'bggbuubwrurwwgrurwrrbbbrrwwrwbgggwurbbwurrgbwrrrgbbbwr',
    'urwgrgubguuggwgwgbwuuwguwgrgubrgwwwwwrgugrrbu',
    'bgwggugubugwgrrurugugurbguubbruubwbgrwguuuubgggruu',
    'wbububwrubbrruuurguwugbggugrrgbuguubbbggguwguuwwbwbgwwgwww',
    'ubbrbbuuubrrwurubwwbgrurbrrrwgwbburrguguwbuwrbw',
    'gruguubrbbbrbbwbwwbrwwgwggwwrubgrwggugbrgbgub',
    'bggugbuurbwubgbbgrwruwgwbwrgwwubburbuwwubwuwuggubrg',
    'ggwrwwuugugwgubggggbrguwbwwbugrugwubwugbrbwbbbgb',
    'bggbwurrbgrwbwuguggwbbwwuuuuwugwbgwubggbwuurwuugwrr',
    'urwuuubwuwrbuurbbwrrbbwgbwgrrurwwwwbwbgbwu',
    'bggbgbubbggugwburwrrgwwrrubrgrggubwrbbggbbubww',
    'rurbrbubburrwbuuwwwgwrwwwwuguwbwgggwubgwbg',
    'uuugubwggwwrwubrguwurbrurubrbrrwwrbrrwugbwbggwrgbbrrbgbru',
    'bbggbgbgwwgbwwwbwrwubbbgwgrbrbrubgrguwgwgrwwgu',
    'ubbwwwrbuuuwguwrwwbrbruguwurggurwuwwwbbburgbgw',
    'wurgrwwuururrbugrwburugrbbwuurruwuwwguwrugbruguwrrrgrurw',
    'bggwbrwggwrrgrbwbgwwggwuurgburuuwwubwrburggrrggru',
    'wrgbwgwruwrwurruwgggrgwgwgbwrrruubggbgbggubg',
    'rbwwubgbrgbuugubbwbgggwwwugwwrugurgruwuuuuuwwbwugguuguwbwr',
    'bggbuggbrwbgwubwgubbrgrugbrrrugbbrbbuwuuubrwrbgbuguwwgbu',
    'bggrwburrwbwrbrwbwurrrruugurgwwbbrwugwururbwwbburrbgrrrgbr',
    'bgbwubwwggrrrrgugbbggwbrgugubbbggggbruubggrbbrr',
    'gugrgbggbrwggrwuuuuwrbrbrwrrggbbrrwwbugbubwburbwuuguwugr',
    'wbuggwbbruwwurgwbrgbwubbbbgrwwwrbwbrbgggugrrwburrb',
    'bgguwgwbbwwubugwurrrrwrugwbbggguugrgwubbwrguggbbwu',
    'rgwwubbuwwubrruwbggwwgbruuuwwbuubrrgwurruww',
    'bbbggwgwuuggurwwwggurrbrwwwbwrbububbbwguwuwgruubgrwrubbbbwgg',
    'bggbguggbwrugwwbgubrwbbrbggrrrwwggbwrggbgubbwrwbwgwrwubgrb',
    'bgggbgrwgwrguuwwrbrgrrwgrwgbwbrwbwguwgrrwbuwwuwwgwbrrwg',
    'bggrbwurrugurwbgwbubrubrugubbubgwwrbrwwrruur',
    'bgggwrbugbbrruwbbbuuugwruruwbugwwuguwubuugubgwuwgbrrrubr',
    'gubugbgbuuuubgruwrrgurgrwrbrbugwwwwgrbgwrbuugrrbwrwwrw',
    'bbbggburrwggrrwrubgugwuururwgwwrrgbwwgbwwwrwrwbwwwbugrubgbwb',
    'bwbrwrbbgurgugrbugwbgruuwbuuuuuwbwwgbubgbwuwbg',
    'bggwrggwurwugubbrubgwubgrrugrbguburgwugbbrwgrbwwugbgbuwr',
    'rwwurugrugrugbwbwrbrwwgwuggbrurruwggrgurbrwb',
    'bggrbbgruggbwrguubgrbbgugrgbrbrrbrugwwbuggbgbuwbwuw',
    'bggubgugwwgguwbgwurrbgwwbgbbuwgwurwbbwgbugubgbrr',
    'rwbrrbwbguuwuwrbbwgugrbgwgrwrbguuuwbbwwwubgrbwbwwwuwrub',
    'bggrrbuguuuwrrwbrrbgrguugbruburwrgwwbwbwwurgrbrbrggrbwbubwb',
    'bgguuuugwurgurbwrrggbbugwurbgubrurwrbrrb',
    'bwggwbbrwbbrbgrrrbwuwrgwbbgbguwbrgugbuwggurubbbgb',
    'bbgrububguwwruuwgbuwbbwrgrrubgrbgrbuurbguwwwbbbrggbbw',
    'gbgbgbrbbbbgrgwrrwgwbwgwurbbbubuurrgubbwwwgwrgbbwuwb',
    'bggwruwrrgwggbgbbggbuwbgugbuwgbrurwwrbwwrgu',
    'bggwrbggggbwrwrrguwbguburbwguwuggrwrgwwwbguuwrbwbgw',
    'bggwwbgggwrrbwuuwguugwbwubrbgbbwubruruwrruwrguuubbubg',
    'bggbrbbugbuwrubwggubuwwgwgwggggbubrrrguuuwu',
    'rbrrwguwbubgwuurwwbwwrwwggbbbugwgwbuggurugwwbuwgr',
    'bggwwwgugbbggwggwuuwrrrggrgrwrbrrgbrugurwugwgubbbgwwbbwr',
    'ubbrwwruwguurrggbbwwgugwbrwbrwwuwwwrgbbbwrgubr',
    'bgbwgrwbrgguubbbbbgbwburrrwrururwuuwuburrugugbwg',
    'wuurwwgwrurwrurrrwrruubruuwrgbbwuurwbubrwuruuuubuub',
    'bggurwwuugbrbugrbbrgrbwbrbbrurrburrwubbrruurrwgwgurggw',
    'uwrgugrbrrrbgwuggbwuuuwurbrwuwrugbgruwurubwwubgwwrw',
    'gurrwrbbrurgurbgburrugggruwrrwwwruwuurrrgubuuwurrwbbw',
    'rurubgggrbuuwwwubgbruuubrubrgurrgburbwurrrubwrubgu',
    'bbbggbuuwggrrwrbbwbbugwwugwbgbgwwwuuwgbuwguruwwbwgrrbbgw',
    'rurbwgugurbuuuwrrwgrurgrgbbuwwrwguuwurwbggrbgwgggrrrbrbuuu',
    'gwburggwurbrwwgbrgbgbbwwbwrrrwgugwwwggrugubruu',
    'uwwurbuuubrubrrubuwwuurrbrgbgrubwbubbgwbuugbu',
    'bgggwwrrguggrggbrbgubgbugugugrgguurbgrgguuguwgbrbr',
    'uwubrbbgrurwgbbwgbugwrgwbwbrrgbwbgrurwuwruwbrrwbggbw',
    'bggbbbrgwbwrrgbwwwggwbgubrrbrrrguwwwbbbbbgburb',
    'bggwuwuwgrbubgwguubgwgugbbwbwbgrgrwuwuwwrwww',
    'wggggbwbrrwwwgubbwrgbuuurruwggrrwggwggruugrbg',
    'uwrbwgrrrguwgbugwurruurbubuurugurwbggbrruurwwg',
    'bggwggbwbubbbrurrugrrbggwwuubburwgruwruguubbuwbug',
    'bbrrwguwwuurwwrggugggrwuuugwwbbgwrubrrubwbggwrbwbwgugb',
    'grrgurbbubbggwwrwuugwwbwrrrububrbgwbwruubuwwwurwb',
    'gbrwwbbrruwbggbwgrwrugwuuwuuururbbgrrgrrurrrg',
    'gwbggbgurrwgbubwrbgbbbgbrgwrubbrrrugbggruugbwuu',
    'bgbwbwgububwwgggbrurwuwgbbwurbggrggurugwgrrrwbruggbrrbw',
    'bwwrwwrbbrwuuuwwrugrwgbbbrwbbrbwwubuurbgwwrgugbbbrg',
    'bggwgrbruwugburbwggwurbwrgwggbbgrrgruwbrwuuurwgburbrgbugwr',
    'buuuubbbugrugburubrggwugwurgurwwuwurbrwbbbgrwbwb',
    'ubrgrrubgbbwubwwbrruuuggrgwbbwuwrbrburbubbgugugbgwuw',
    'wrwuwrwwugwwggrwgwbuwwrgwguwrrbuuggurgwrggg',
    'ubuwwbrbbbbrgwwggruugguggwgwwwuruggurgwrbrwgbbrbbrr',
    'bggggrgbubwbgrwbbrbuwuwrwggbuwrurggbruubrurruwug',
    'bbgwwgwbgrbrbwwuwwbbgrwrrgrurwgugbbrubrwgrugrbbrrb',
    'wguwgbruwuuggrrubbgbuurgbuuburwrwbruwbwbgbrgbwwurbr',
    'wbbrgwruwruwbggbbwwurwbubrwggrrrugwrggrbwuwubuwb',
    'ugguubrrgrbuwbrrruggwruwrgrurbbbwrggrurgurwwurgrwwu',
    'burruwrbwuwbrbgwgwgburbuurwrwbbuwururguwgurgwgbwbwrugru',
    'wggbwbguwwbwwwbrurgggrwgubuwwrbrurgwbbwwubbw',
    'bggrbbgrgwwrurugwbgrgrururwwrwbwbwuggrbguwbbrrbwwuubrwrg',
    'gwubgwbbgwubbwrbwwwbbwuugwbwbbggrubgwbrgrbwwgrbwwwbr',
    'wggbrrrbbbgbrgbgwbuwgwurgurbbrgrgbrgbgrbgrrbuwbwu',
    'grbwubuuuguguwrurwwrgwuwuggbwbwgrruwrgwrbrruwrrb',
    'bwbbbbbgubrbbugwrgrbbbrbrbugbuuubwwgbbgwwuruwwrbruurggg',
    'wwgbugrrwguuuuwrgwwwwwwbgruwggruuuuuburbgbugurgwurruguubu',
    'rgbbbuwuubuuuugbrrbrwwubuwubrurwwrrwgruwgubgw',
    'bwgguwuwgbrgbrgwbuwrgbrgugrrrgwrwrrurgbrwwbbguuwuu',
    'brubbgbugwruubgruwwbwurrbuubuwwuwwuwgbugruwrgrgbruug',
    'bbrwguwwrwuurgrwwugwrguwubuubrbrrgwgrwguggrgwu',
    'bwurrbbwubgwbgwwubgubrwrrbgrbrwguguwgbgrbwuwbggwuuwbbw',
    'ruwruuwgbbwrwruwbuwgrwbuwgwrubbbgrbwrggggrg',
    'gwrrruwwuwgwwgwbgwuubwuuruggwuurrrbgrguuubuu',
    'uurbgwrrguwggurbwbwuggrbrgwuuwubgruubbgubb',
    'bgguugrrurrugrgwrubwbrwruburrrrggbrgbbuwrwbrbguuwgbbrgrrbrrr',
    'brwguwugrburubbrurrguuggrbwbwbwgbbuwbgwgbbrb',
    'bugwbuwruuuurbrrbrrrrrubbbuwwugurwbgbubbburwrgbwrugwrgb',
    'bggwuubbubwurgurbbguuggggwrgbbguuwrrrggrgrbgwb',
    'bububugrrbrwbrurguuwrrrwwbwuubuwgururgrguubgww',
    'wwurrgwrwwurgruuwrbgurwgrwwwugbgwuuuwrrbwuggbrrwbgbruuu',
    'bggguwwrwbwurubgubrgrbbuwwugrgurgwrbrgbgrwwwbrgbwrgwg',
    'wuguguugwruwuuggwgbggugrrburbugrbwrugguwwwggbuugu',
    'bggwbbubrrwrgbrwrgubgwrbwwwurrbwrrbgwwubbbuwburugbru',
    'uggbrrurwrwugrgurrwugugrrbwggwrgbbrbwuruggwwugrguwg',
    'rbrbuburuwuruugrgbrbwburguwuuwubbbwwwgwuubwww',
    'bggubrbwgugggbggbubbgburgwwwubbrrguuguuuururrrwrbbrgr',
    'bggrwrrwwurrruuwwgwuwrrbrurbuubrgbuugrbrwwurubwuw',
    'wgburubrbrrgrguruggwwgugwuuwwwggwgwwrguwrbwwuurrbgrburwrg',
    'bwgburbuuuurbuuggruuwrrruwwuubbwguwgggwbubgwggrwug',
    'rgwgbuwgugwguwgbrbggbubwbubrurwwwguwuuwgrugr',
    'rbugugwggrgruwuguuurrggruuwggbburwgugrgburbrgwugwugubgb',
    'burruwggruuubbrbggbwgwrgurwwggubwbuuugrbrg',
    'bgbrrwwbuwwuubuubuubbbrbubuuurggwuwwwgbwbwurw',
    'gbrgurgbwbgububbgbbgburbubrrugurwgugwgubugugrwgu',
    'bggwrrwbbgggrbrrguwgwggugbbgbuwbburrrbrgggruugruwgwbbuuwwu',
    'rrururubrbbrrwgbwrwbggbbrwgurbwrubwwwgbrrbwrwgbugbwrgwgbb',
    'bggwugrbgwwubguugrgrbbrurrgrrrgbrugugwur',
    'wgruwwggrggrgrubbrrgurwwbgguggrruuwuuwrrwrurwrbrrgwbbwuuu',
    'bggbguwguwrgbrwbbgwrrubbgwwwbrggruurwuwwgbbbggrwrgu',
    'rwuubwugguugbrggwuwrwbgwuwgugwbrugwrrrbwuubrgwuugbg',
    'uubwwwggbgubbwurwugwururggwrrbwgwgburrruuur',
    'bwbwubggbubbgwguwrbguwuwgubbbrgwbuwgggbubgbuugrwbbrbbgu',
    'urrgwbugwbwrbbwgrggrbrguuwwwwruruwruwrrwurwgbuuwbguurgbg',
    'rugwuuwbuuwgwubrgurwwrbrwbwurbwwbgwburuuuggbwwubbguwrbb',
    'ggbgubrruuuurwugubgruubrgwrubrgrugbruggwgurrrwwruwrgwu',
    'wrrrbrubggrgbugwuuubwbwrbrrgrgrgbwgbbgbwrugbwwwgbggrubuur',
    'bggwuurruggwwbwuwwuurwbrguuuggruuwwbrurgbwuurgurrwrguruw',
    'bbuwwwbwuwrrrwguuurbugugwwgwgrwuruwrubrgrugurrbubg',
    'wugwgwuwwwuwubwrrrrruubuuguruguggbburuubgurwuuwubgwugbubw',
    'uurbugubbwgggrgbgwbbbbbwubrwrbrgwgrwrwrgugrgbuug',
    'wbgwuwbbwrgbwgwrgwuurbbugbwbuubwbubgwgbbbgbbbbbugrrrwbgb',
    'wrbbgubbbuwrgrguurrrwrugugurwbbwwwrbbgggrbrrrgbu',
    'bggbgugrbbgbbgwgbbrgrrbuwggwuurguwgugrwugugbugwwuuw',
    'bggbbwgurrgrurbwuugrwugubrrwwrbbbrburbuubuugbgrw',
    'bbgrbwgrrbuwwugrrwrrwguwwgbgggguurbwrggwwwgugggg',
    'bggruuuwwbrbrbrbbbuwgwgwrwrbruurgwwgbgburubwrubgrgwuwrb',
    'urbbwrrgbwuubbrgrbugrbguubbubuugggrrrbwgwwguurrbwgwrur',
    'uugrbbwbbgrrbbbuwrwrgbgbggwwuwbwwwubwgbrgug',
    'guubrubrururrrrubbrbbgggrgubuggbrbuubuguuubwg',
    'bggwurgggburgwrrwurbwrbbggguwwugggubwwwgbrwuuwuubggbg',
    'wrbgbwbwwwurwwrrguuurgwrrugwububbuwrrbgurgbwwww',
    'bbbggugugwuuwugbgrbbwurbrgwgrgbbgrgrwwugwgrguwbr',
    'rwwwrgwwbwwrrrwbrgwrwwgubgbggbgbubggbwbgbugrubbbwgwbuwwrbb',
    'wguubrrrgwurwwuwwbrrurbguwrgugrubwwuwgurbbwrr',
    'uwgbrwgrgbwbwuuggbrurgguwwwwrgbrruubrrbwgrbugwrw',
    'uuwrugrrbgrrgwrbbwggbbbuwrbgbubgbruwuuuuugggw',
    'gwwubbwrwgwgugwbubrguwbbubuuggbrgugwugbbwbbgggwwrggrg',
    'buuruuurbwwrubgrbwggwugugugwuwrugbubuguwubruwrrwg',
    'rrwwburggrrgwgrwwbugbrrubwwrrwwbwrwwggwubgwwgrb',
    'uurrrwgrgrubrbwrwbgbwgbbrbruubwwuggbuubrbburb',
    'bgggburbwbrguububbwubbbrwrubburwwbrbbubwubrbwgrrbbrbgrruw',
    'gwbwrbrubbgrbbwwrbwwguwgwgrbuubgbrbruurrrrugbu',
    'bggbgurwbuwrwgbrwbgbwggbwugwwubwuwwgburuuwuugwwwgu',
    'bugurruwuuuwuwburwbrrggbguruubrwggrgubwugubbugrbgwwbgw',
    'bggguububggwwuubwgrwwbwbrbwuuggrguurrurgwugbrrbwbbgrb',
    'uwbwurrwgubbrruurururbgbbgrbguwgubrrgguwuggrrgbbr',
    'wuuuggrwgwrwurgruuwbwuubwwgugwgwugrwruuurw',
    'uguggggrgwbwgbwrbbrruwgwuguubwbuuwwrwugrubrgbruwb',
    'rbgubbrubbrgbbrggrrggrubugbwbugbgrrgbgrggwrguggbbrrwr',
    'ugbrwuwrgrbbugwrbugggwbwbbbgbgbgwugwguuubr',
    'gwgrrbbuwrggubrugggbgwuwbrrwrwguubrrbuwrbuuuuwww',
    'rbwbburwgurruruggrrwgwgwbrgbrwwbgbbbbwwuurggwrggruggu',
    'uuwwrrggwburrbrubwgwrwgguugwbwwuggrwwbwgbwb',
    'gurgggubbbwguuubwrbggwbguggugwguwgbguwrrgbgwbgggr',
    'bggbrruuurubwwggbburrbbgbwwwurwguubuuwgbuwurwwrwwgguw',
    'wwwurwgubwbuggurubwuwurwurrbrwburwbbgwruwwrgruuwuuwrgrr',
    'bbbggrwwururubuuurguubrbuwguruwgggwgggurgrgruurbggwuruubbbrr',
    'bwwuwugrwuuuugbrgurrruwbwwrubruugurguwbububgwu',
    'gwuuwuurrbrurrwgbggrurbugwggwwrwbburgubguugrgrbwgbuwwr',
    'bggwgbbbuwwwbgurwbbruurwubugburwubuugwburrbgbwwrbuwbbwuwur',
    'bugbgrbwububruwuugwbgbuuubuwwrugugrguburrbbgbgrrwwgrwg',
    'bbbggbugggwgwbbruugrggwbrwrwuwuuwrrwwgggburw',
    'wrrbwgbuugugbwrrbgbuuwrubrggbbbbruuwuwbugwgrugwrbub',
    'bggurbgubwbrurgwbggrgruwwurgbgugwbbgugbuggwgr',
    'brrwuugwwrurwwgwbbrbururgwbgrwguurggbrruubwwubwubbggwgrwr',
    'rgbwrburbrrbubwugrwuurbgrugwwgrgurwwugwgbubgggrrwbwuburg',
    'wgrbgwubbwuubrbrgrrugrwwwbbrbuwrwgbwwwbrrrgwwbggu',
    'gbgrrbbwrbrbbbubbuwbgugwuurgwburwwuwgwuuuwbwubr',
    'bggwgwbbrrrrubrwurururrrwbugubrrgggbrggwrwwggwrbugw',
    'gbuguugwgwwggbuuggrurbruuuguwrgubwgrugubrgubwu',
    'gugrgbgrwwwbubwrgbwrwbwurubwggbwgwwbrbgrubuu',
    'urwrgurwgbwbrwuuggrbbrgwubwruwbuwurggbbwrbwu',
    'wbuwguuwbrgrurbgggbbuurbbwwuuuwbwbgruubwuru',
    'wggruggwwuwgugrbgbbwggguuuugwwgbbuwwgrrwgg',
    'gwrgrbgwrrgwbbgugubbwwwrugbbbwrwrbbwrwruwgu',
    'bggrbgwwrwrwuurwuggbrwbbrbbbwwbubbwggrgrrwbw',
    'gubbgwuwuggbwwwguggwubwwrwrbwubggbgrrgwbbubbbugwwwbrwburg',
    'gbbwwgrrbrgwguwgwbrbgrggrgwruuuwgbwurubrbgrrb',
    'bggrrrurrwwrurrrwrgrubuwrwugrgbgwggwuuwuuwwuwrwwbwwwwbbggb',
    'rrugbgbbgrwrrubbuuwuurrubuurgurugbbbrwgbugwr',
    'uwrbuwbrgwubrwbgggrbrwbgugwwwrwruguwrggbbggrug',
    'bgguwuwrurwbbbwbwwgrrgrbrbwrburbgwurugguruwbruwwbbw',
    'bggbggwubbwburwrwgubwurububrugbbugbgrbgurugbgrururg',
    'rrrggwwubwwrrwwrrwwbuwgrwwwwwugrggbgurgggrrrbrurgbbuuuw',
    'urwggwbggburgbwuwgrguwbbbrgbuwbuuwuuguuuguwrgww',
    'bggururbbubrwugrurrrubgubbbuwwgbwwwwbwrggbbrrwwgbuurrwr',
    'grgwbrrurgwbrwwbguuwgwwbwbubbwwrbwubwwbrgurwrruwgbgrbwwwbw',
    'bggbrgugbbgbwrwguuggwuwrgbugrgrgbuubrgwgwgwrgwbrggbwbbggggu',
    'rrruubwrurrbbuwurgrwggwugrwruuwgbgwrwgwburbururbwrbrwgb',
    'grwggwbgburrwgrgwwrbuwrwbrbrwuuuwurrwurrwbbg',
    'bggguruwwugrggrwbgwbbgrwrrguwrgubrguugwbwrrb',
    'ggurwbrurguubbggbgbuurgbwrbbgubgurubugbrbuwrgbwrrb',
    'wbbbrubbgggguwrbwrbrruurgguwguwbruwggrgrwruuubbuw',
    'wbrwuuwwbbrwbrbrwgbruwubuwrbuggguwgwgwbgurwguurgwrurrggbg',
    'bggbuwbbgrgwgbubgwgbrrgurrbwwbgugbugbwrgrguugbruwbu',
    'wwbguuuggwrrwurbbgwbbbugbwuwbbwguurwrugrugggbuuubgurwwg',
    'grgurwuubgbrrrurwgwrrruuwurwrrgbgwwwwurubuguwgubbguu',
    'rrbbgbwuwgrgurbubruugrggugwrugggubgwwrwggrrbr',
    'rgbgbuuwugbuwbbbrrrwgggrrbbrgwurgurugrgurwbbrr',
    'bggwgrrwwrruwrrbbubgwugbbrggwbbugbuuurbwgrrwrwbuurugr',
    'uuuwubrbwgwguuwwuubwgwbbwbgrbrggbubwggubrgurrbgwb',
    'gbbbgrbbrwbwwwurrbbrugbbwwwuwruggrwwwbgrrwwuuug',
    'bgwbgguggwgugrrgguubbbwrggruuuwgrurugwggrbrbbrggururuwb',
    'wbwugubwwgbbrwwrurrwgwuwrgwuwurruwrwbrgrwwrurgwrrgbrbwbub',
    'rwgrubrwgbuubwwbrruugbuwggubugwurgruwwwuruguwggwbug',
    'wgwrugguuubguuuwwuwbbgwrurwbrbguwrgrgrbrrrggbwwbuwwbb',
    'rbwwrwbuwwbgurrgwbrgrrbuggugbbugbgwgwbwbwu',
    'bggrrubugrrwubwrrbrrugrguubwwuurubuwgrurbbuubwuwrurgrgbu',
    'rbwugruurwbgurwwbgwurrurgrrubgbgguurrbuuuuwwwb',
    'bggrguwruurwgrbgrgrwubrbwgbbgbwbrwbrwgguwwwburgbb',
    'guwggbwgubuubwwwugrgguggbbuugrwwugggrgrwwruwuggwwrbuurbw',
    'wgwbburwrrwrugubwrbrwbrwburuwubrbwwgurrbuwub',
    'bguwgwbgggrbrrgrgbrrrurwwwwbwgwgrwwuurgwugbu',
    'rwugugrbrrwrguubrbbuurgbugrwuburbrrubrgwrbbgur',
    'ggwrwrwuuwbrbuwruwwrbbwrwugwruwbgurrgubbbb',
    'bggbbrgguruwgwbuwbwwrubbgrgwubrbrrwbrrbburwwwrurrggrb',
    'wurwrwbuwgurwwgwgwbwbbrwbwbububwwwrrgwwrbgwubgubrrgru',
    'rugbwwbbuwgruwrgwgubwugwbbgbbgbgrbwuubwugbgwggurwurwwuu',
    'brrrbrrrggbbrwuburgwurrwwbgwrggrwbubggrbubwuurrrbwugrrrgg',
    'rgurrbgwwwbwurwbgggugwguurbbwbgbruwrgwruuwggwggruwrugrburu',
    'bggugrgurwuubbuuugbguuwgrgrrwrgbwrrgbguwwgbruggwgugu',
    'bbruuuwuguubwrbwuurwwbbrugbrwbbuubbbuwwgurgrwruubwwguu',
    'rwbgrbwgubugurwrugwuwrwrgrggugwuuuwubwwwbbbwuggrrrrwgbg',
    'rbgguggrburrburuwwgwubrgrgbbwrrguurwwrwbgb',
    'wwrgrurbrgbgwugbgbguguwwwubwbubrurbrbgwugwgurb',
    'bggbbbrrwuguuuwuwwuugwbgwwbuggwrrrguwrrgrwwbbgbrubbggu',
    'bgguggwgurwgrubwuuuuurbbugbrbbbubuuwubbbwbgwbuugrg',
    'burrgugrugbwburwgbgguwrwbwgwgwbuuuwrwbwrgubrbwrwwr',
    'rrbbuwwgrwrgurgbbguggrwrbrrgugbwgbuwubgwuuuwguwwguwurrgw',
    'rbwgbgbbgbrruurrbrwwrrrbwgbbgwubbwgbbwrrgubr',
    'bggrwrwbbrbrwgbuwrgggruwugurgurgrrubgbuwgrgburbuuugrgbrw',
    'gubrbgrwggrggbubbbbuwrwurwrwgubbgbrwbgwbwwbubgwwwggbugw',
    'rwuggwgburburwugubrgwbuwgbubrgbugrbwubrbwwu',
    'uurggrgwbrwrgbuuggbbggbgrwbwwwgurrbbuwgwbbugu',
    'rwuwwgwubwbubguugrguugguubgrwbrrwgbwbgwuwwbuuwurbwb',
    'bggrrwrrwrgubwgwubwguwugububbbgbguwbwurrubgwubbrwb',
    'bggbrguuururrwrburrwwugruwbruwwugwguugwrwgburuugwgwrbwrbrwrw',
    'ggbwrguggguurruuwgrrubgubbuurubwuugrbuwwbwbbwbwrbuwgbrwrrg',
    'rbbgguburrwurwwuuuubggwuggubbwuurwrgbbrwwbguuww',
    'ggbruubbwburguurbbuugubrwuuwubwwwbgugguwuubrbwrbgwguurg',
    'bwuwbbbbbrbgbwubggrwgwrgggugwburwuubwuurbubwrrwgbr',
    'grugurrwwugbuwggbbrurrwbbggrbgggrbbbwurgggbbbbbugrggrubugw',
    'wbguugbuwuwgrrbgrrwgrrugubgrbwugubuwbbwubwwwruuwwgbgbrgg',
    'bbbgwbggurbbuububuuruwguurrgrgrrrrbrrgguubguubb',
    'wuwrwrggrrbubruruubububwrrubrgbbburbwgrwrwwubbwgwgwwgru',
    'rrwwrrrubrguubwgrrbbwwwgbbrbgrbgwugwguwrbwbgbrwuwubw',
    'uurggbrwgrubuwubgwruguubguwgburrrrgubbgwwgbwubggbb',
    'urruwwurgbwgwrrgggwgbgbgurwbrwbwrbbgbubguwgrbrugr',
    'bggrgrbwgwbwugwgbwrwbrrwwwrwbbuggburwbwwrrbwuuwrurubwbr',
    'rwbwrbwgrgrurrwrwwbbbbrwrbgbbuwgbwrbururrurrrwurgbbrbuwrb',
    'wwbwbwrwrubrwwwrwwgrwrwbuugrbuurruuuwgbugwbwggbbguugrwbr',
    'ggugubwbrguwbbggrwguwggwggwwbbbugbbrwbrwbgu',
    'wbrguwwwrbbbwwurwgwubwggugwbrgurubwurwbrbgugwgub',
    'bggwuwbbrugrwgruwbwrrwubbbgwrgbrgrrggrggrbrwbuwgrwgrrgg',
    'bgggwwubwgurguwrgwgwbgbrwuwgbbggbuwgrwwbbuwgrurwrru',
    'ugurrrbrggrwruuggrgurrurruggwgwgrbrwugugwurbgu',
    'bgguuwuruwrwuugwrbuurrbubgwwubbuwbwgrrbrwrwg',
    'rwuwuruuuwwubwrwuwgwrbbubuuuugbubwwbbwubuwgbub',
    'bbrgrrubbubuwrrbwurbuggbguguuwwgwbbwburuugugwrbugru',
    'gbrrbgubgrwbuwrrrwubbrrubgbggbwurugbgurwbb',
    'bbwrbbwwwwbwurbgrwrbwggrrrwbbwubuwgrurgrubbugbug',
    'wbruggrwwwgurwbwgbbgubgggrrbuwgururbbbwrbuwgbwrg',
    'bggbbwgwbugrwgurbbrwwwuwugrggbugruuggbubbbuuburguwwg',
    'wgbbbrgrbbgbrrbuggrrgwwrgrgwuwgrwugrrbbugbbguwuwgubruug',
    'bggwgrrbbrwuguubwuruwgrbrguurrwwbrruurburbrwurbwu',
    'wrbgrbwurruwbgubbubgggurbwwuggrgrbgubwrrbrrbbwwgubgbrw',
    'wrrgbwwrubuwubrbrrgbwggwrbggrbwbwbrbrwgrrgrrwgubwugb',
    'bggurwubwwuugbuwugubwrgwrbrguuwrrrwubwrwurrrbugugg',
    'brurgwwurwbuwrrbuuugwgugwwgrwggrrrbbgrggbwuuwr',
    'gwbrrbwbrwwuwurbgruurbwubrrwbbbwwwgrguwrrwubg',
    'ruwwgguurgrrrwbrbuwrrgrrugbbrbgugruwgrbuugrwuwwbgbbru',
    'wgrwwwrgbrrrrbbwgubuggrwbgbubbbwuugggurrrbbwwururuwugbb',
    'bggbgurguwgurrbgrburgrrgwrurwwrubuurrruw',
    'rbwggbugwbbgubububwrwbbrurwurwwuggrbrbugrwwrburgubugbubgr',
    'ggbrurubgwwwubburugwwbugbwrggwbggwbgwwrrbwbrwbr',
    'bggwrwrgbubbubuwwgruurwugwwuubrbwgbbbbugrbbbbg',
    'wuwrwggwubuwgbbrwurggbbwbwgguuwurgwgbgbrwwb',
    'bbrwggugwbgggwrgugrwgwburgrbgrubruggwwubgwww',
    'bggwwugrbgrrwgubuwwuurwwgbuggurgrurwwuubgr',
    'rgwwuurubugrwbwwggruwwgbbugrgggwrbgrgwrwgburgbbuugwwwg',
    'bubgubwgwgubuwwwbggwgwburrwrubguwwruugbbrbgrurw',
    'rrbwbwrbrbgrbgrburubrwwwuwgbgggbrwwubwrubwguwbbbuubwuwbuuu',
    'ugugubwuuuwrgbwuggburwugrwbuururbgbrgbgwrrbgbuuwbwbbbrruu',
    'bggwburgurugwubbruburwbrubggrgbubrbbugwubgwgbubwggrrwbrwbbg',
    'gbbbbrbrurbwuwbrgbguuurgruurruburgbugbgbrbggw',
    'wugrrrgggbrgbbbrrrrwwbwwwwgrrgwwbgurwuwgugrrru',
    'bggggrrgbbwugbrbrbrgugbbgrwwurbbwuwggggbbuuuuwurwrggwwwwruww',
    'bggrgugbbwgbgubrwgugwurugububbgwbubuuguugrrugbuwbggbrwgw',
    'wggbrrwrrgwrgruuwbrubggwrbrwbrbbbguuwgrwuwr',
    'bggrwwruwgugrgwugrrwbgrrrwwbbuubuwbgurggbbguwwrggbwgwwwgu',
    'rgbbrrgwuuwrbrbrwwgwuurbuuwrurgbwgwrurwbbwrbgwrgbbwrb',
    'bggrwrubgbubbgwgrwbrgwwbwwrrgwuwugggrrgrgbwbgrgubgbugwbugb',
    'rgrbrgurrwurubrwbbbbbgubrburugrugwgggbbwbrrbrbugwwu',
    'rgwrugrwrrgwrugubwgrbbrrwbgbbgrrbrrgwrburwbbbbwugrruurbg',
    'bggrruubgrugbubrrubwrwbwgbrrgurgbwrbbbrwrbuwrgrwgbwgwww',
    'wrwwggrbrbbwwrugwuubbgwgwbgururbuuugugbuubrgruggwwr',
    'guguuwrwguwwbwgggruwgbgwrrrggwbrbwrbwwuwrubwuuwbuwurrrwrbb',
    'urwuurrbugguubwuggguwgwwuwbuwuurgrgburgwgbrwggrwrgwrw',
    'bggwwwggbuwggwuuwggwrgrgwggbrrgbrwwguuuwrrwuwugwbuurgrbgggb',
    'bggruwrbbbwruwrrbwwgbbwrbuubgubbrbbugwuw',
    'gwbrbguruugbwubwuurubwrwguwugwwrgwwbburbgubrbgwbbgwwuwu',
    'ggrguuggrgwubgbbububrrbguwubbrbugurwrwubww',
    'wrgbwgrbgubggrgruruwburrwgrgubrubwwwgugbuwwbwwwgwg',
    'bggwbgurbbwugbugwbwruwrbrguwrguubwurwrrrrwrwbw',
    'wbrbrgrwgwgwgbgrwgrrwwuugbbugrgbgwrugrbwgrbrwbgbuwwwrbubwu',
    'bgguuburbgurgrrrwwbbubuwrugbrwwwbruubwrrgugrgrggubbub',
    'gwwrbwwburgwggrgwruwwbuugbbbbbgbbubgubgrwuwuubgbwbr',
    'bggguwbgrgggwggburwrwugrrguuwuurrgbwggwgrrwgrbbrggurbwrrug',
    'ruwubwbrwrwuwwwrbbwuurgwuuwwrgbbuuwggrurbggwgubrwugr',
    'rbbggwuuuwwrrgbwwurbrwubwguurwwrgwrgguugruruuwrugrww',
    'urwubbuugwuwwrubbububwurwbrgwbbugrrwrwgwwwrbgrbbrrwbgbuwg',
    'bggrrgrrubwrgubgwbuurrbuugrubgbuggwwuwbgbgguwwwbububrrrr',
    'grgubuwrwrgrwgwwwrwugrbwruwrguwbgwrrruuurwrgurbuur',
    'wwrubrgbbgubburrgbuburggbrugubuwbrbrwwrbbwgwrwwbgrr',
    'buwgbgubrwbwrwbwgugbgbgwgubbrwurugwurbwwwrgbruuwburru',
    'wwbgrrwrrwrrgggggwrgbwbrurbgubruwruwuwbbrgubuubggw',
    'grgurrbrugbwwbbbrwwrwbugrgbuwbuugbuwuubbubugrbggubgwwub',
    'uwbgrwgwrrbrrwgrggubbubrbrrbbbuwbbbrgggguwwwuwwwurbrur',
    'bbbrwuwbggrwrggrwruugwbggrwbbwbgrgwggrwrwbggwrgwu',
    'rwggbbuuuugwwurrbbbguuuugwwrwgbbburrbrgrrbuggbwwwwwb',
    'uurruuburugbuuggbuuwwurrgrrruugwguuwwgguuggr',
    'ubwbbrrwbubuurbrgubgwuwuwrrgbrbwgrwbwrwurwrg',
    'bgggwrgubguwrwrubgubgrbrwwrrwggguubwuwurrrgwuwubuu',
    'wrbgwgruuburrwbwrubuwgbuwgrrruubggruuuggwgbb',
    'gwuubuwrwubrbrgrugrgubburwwuwwggggrggugbwbwwgwwbubrbu',
    'ggwbwwugrwrgrrrrbwrggbrgwugrbwrbubbuubgbuuwgrwuwgbrrugbw',
    'bwuuuwubugrubggbubggugbwrwruuguwgwggbbuurwwubrugbur',
    'bgbbggggubrrrbgbbuuburgggububggrggrgwbwgrurbbrgbwugwwbrburg',
    'bbbggbwrggwbugbuwrrwwgbubuurrwuubwgwgrbg',
    'bggbubwuguwbrbgrggrbwuwgbbuwgwrwubbrurrggw',
    'wuuguwgwwgggrwugrwubrguuwbrrrurbubuwguurrgrggwb',
    'uwgwwwgggwbwwbgrwbwgggrbgwggrugbbrwgwrwgrugurrr',
    'guuugrrwruuwbuwgubburwbgbwwwrwrwwwugrwwuwuggbrbgruguu',
    'bruurrrwrrgrrggrrwbuuurbbbggbgwugwgburwuuurrruwbwgwuurb',
    'wrugbbbbugwruguuurbugwbrwbrubwrwgwbgrwwwrbubwwr',
    'bggwbwwbrbubbuubbwrbbugrgwuuwwbwbwuwgwgbubrrrrrrw',
    'wgrugbwuurrwgbrrwrburwwwbuurbrbwgwbrgugwrr',
    'gwrrrwwggbrrurgwbubugwwrrgggubgugguwrbrgwuwbgwrubgbgbb',
    'wguurrrrrgbugrubwgbuwwbuuwubrbwrbgrwbbrugur',
    'gubwurbbguwugrubbwwubrgbwwubwwbgrggbwrubggrggburwbrgruurgg',
    'bgggurugwbbgwuurbrgwrwurgrggubbwwwbgbuwrbbwwwuug',
  ]
};

const test_input_2 = {
  samples: final_input.samples,
  plans: ['grwbbbgggwubwbuwubbwwbuwubrrrrguuguwugbrrubwgrwrbbr'],
};

function part1(input) {
  const solutions = {};

  for (let plan of input.plans) {
    solutions[plan] = {
      progress: [],
      variations: [],
      samples: []
    };
    let done = false;
    let iter = 0;

    while (!done) {
      let found = false;
      let sampleMap = input.samples.reduce((acc, sample) => {
        acc[sample] = false;
        return acc;
      }, {});
      if (iter == 0) {
        for (let sample of input.samples) {
          if (plan.startsWith(sample)) {
            solutions[plan].progress.push(sample);
            solutions[plan].samples.push({ sample, iter });
            solutions[plan].variations.push([sample]);
            sampleMap[sample] = true;
            found = true;
          }
        }
      } else {
        for (let oppIndex in solutions[plan].progress) {
          for (let sample of input.samples) {
            let newPart = solutions[plan].progress[oppIndex] + sample;

            // console.log(sample);
            if (plan.startsWith(newPart)) {
              // console.log(iter, solutions[plan].progress[oppIndex], sample);
              if (!solutions[plan].progress.includes(newPart)) {
                solutions[plan].progress.push(newPart);
                found = true;
              }
              sampleMap[sample] = true;

              solutions[plan].samples.push({ sample, iter, newPart });
            }

            if (solutions[plan][oppIndex] == plan) {
              done = true;
            }
          }
        }
      }
      // console.log(plan, Object.values(sampleMap).filter((v) => v).length);

      iter++;
      if (!found) {
        done = true;
      }
    }
  }

  for (let plan in solutions) {
    solutions[plan] = solutions[plan].progress.map((solution) => solution);

    if (!solutions[plan].includes(plan)) {
      solutions[plan] = null;
    }
  }

  return Object.values(solutions).filter((solution) => solution != null).length;
}

const cache = {}

function vCounts(plan, progress, samples, variations) {
  for (let sample of samples) {
    let joinedWithSample = progress + sample;
    if (plan.startsWith(joinedWithSample)) {
      if (!cache[joinedWithSample]) {
        if (plan == joinedWithSample) {
          cache[joinedWithSample] = true;
          variations[0]++;
        } else {
          vCounts(plan, joinedWithSample, samples, variations);
        }
      } else {
        variations[0]++;
      }
    }
  }

  return variations;
}

function part2(input) {
  let vCount = 0;

  for (let i = 0; i < input.plans.length; i++) {
    let variations = Array(input.plans[i].length + 1).fill(0);

    for (const towel of input.samples) {
      if (input.plans[i].startsWith(towel)) {
        variations[towel.length]++;
      }
    }

    for (let j = 0; j < input.plans[i].length; j++) {
      if (variations[j] == 0) {
        continue;
      }

      for (const towel of input.samples) {
        if (input.plans[i].startsWith(towel, j)) {
          variations[towel.length + j] += variations[j];
        }
      }
    }

    vCount += variations.slice(-1)[0];
  }

  return vCount;
}

function part2__(input) {
  const counts = {};
  for (let i = 0; i < input.plans.length; i++) {
    const filteredSamples = input.samples.filter((sample) => input.plans[i].includes(sample));
    for (let j = 0; j < input.plans[i].length; j++) {
      let variations = [0];
      vCounts(input.plans[i], '', filteredSamples, variations);
      counts[input.plans[i]] = variations[0];
    }
  }

  // 1061738868640
  // 4187779403913
  // 4333080858269 - low
  // 77582603291338 - ?

  return Object.values(counts).reduce((acc, count) => acc + count, 0);
}

function part2_(input) {
  const variations = {};
  let variationCounts = 0;

  for (let i = 0; i < input.plans.length; i++) {
    let plan = input.plans[i];
    variations[plan] = [];
    let done = false;
    let iter = 0;
    while (!done) {
      let found = false;
      let newVars = [];

      for (let sample of input.samples) {
        if (!variations[plan].length && plan.startsWith(sample)) {
          newVars.push([sample]);
          found = true;
        } else {
          for (let vIndex in variations[plan]) {
            if (plan.startsWith(variations[plan][vIndex].join('') + sample)) {
              newVars.push([...variations[plan][vIndex], sample]);
              // if (iter < 10) {
              found = true;
              // }
            }
          }
        }
      }

      variations[plan] = uniq([
        ...variations[plan].filter((v) => v.join('') == plan),
        ...newVars,
      ].map((v) => v.join('-'))).map((v) => v.split('-'));

      if (!found) {
        done = true;
      }

      iter++;
    }

    console.log(`${i + 1}/${input.plans.length}: ${variations[plan].length}`);

    // fs.appendFileSync('day19.txt', JSON.stringify(variations.rrbgbr.map((v) => v.join(''))));

    variationCounts += variations[plan].length;
  }

  return variationCounts;
}

console.log(part2(final_input));

