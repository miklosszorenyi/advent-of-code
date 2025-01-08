const fs = require('fs');
const { flatMap, uniq } = require('lodash');

const test_input = {
  startValues: {
    x00: 1,
    x01: 0,
    x02: 1,
    x03: 1,
    x04: 0,
    y00: 1,
    y01: 1,
    y02: 1,
    y03: 1,
    y04: 1,
  },
  wires: [
    { first: 'ntg', op: 'XOR', second: 'fgs', target: 'mjb' },
    { first: 'y02', op: 'OR', second: 'x01', target: 'tnw' },
    { first: 'kwq', op: 'OR', second: 'kpj', target: 'z05' },
    { first: 'x00', op: 'OR', second: 'x03', target: 'fst' },
    { first: 'tgd', op: 'XOR', second: 'rvg', target: 'z01' },
    { first: 'vdt', op: 'OR', second: 'tnw', target: 'bfw' },
    { first: 'bfw', op: 'AND', second: 'frj', target: 'z10' },
    { first: 'ffh', op: 'OR', second: 'nrd', target: 'bqk' },
    { first: 'y00', op: 'AND', second: 'y03', target: 'djm' },
    { first: 'y03', op: 'OR', second: 'y00', target: 'psh' },
    { first: 'bqk', op: 'OR', second: 'frj', target: 'z08' },
    { first: 'tnw', op: 'OR', second: 'fst', target: 'frj' },
    { first: 'gnj', op: 'AND', second: 'tgd', target: 'z11' },
    { first: 'bfw', op: 'XOR', second: 'mjb', target: 'z00' },
    { first: 'x03', op: 'OR', second: 'x00', target: 'vdt' },
    { first: 'gnj', op: 'AND', second: 'wpb', target: 'z02' },
    { first: 'x04', op: 'AND', second: 'y00', target: 'kjc' },
    { first: 'djm', op: 'OR', second: 'pbm', target: 'qhw' },
    { first: 'nrd', op: 'AND', second: 'vdt', target: 'hwm' },
    { first: 'kjc', op: 'AND', second: 'fst', target: 'rvg' },
    { first: 'y04', op: 'OR', second: 'y02', target: 'fgs' },
    { first: 'y01', op: 'AND', second: 'x02', target: 'pbm' },
    { first: 'ntg', op: 'OR', second: 'kjc', target: 'kwq' },
    { first: 'psh', op: 'XOR', second: 'fgs', target: 'tgd' },
    { first: 'qhw', op: 'XOR', second: 'tgd', target: 'z09' },
    { first: 'pbm', op: 'OR', second: 'djm', target: 'kpj' },
    { first: 'x03', op: 'XOR', second: 'y03', target: 'ffh' },
    { first: 'x00', op: 'XOR', second: 'y04', target: 'ntg' },
    { first: 'bfw', op: 'OR', second: 'bqk', target: 'z06' },
    { first: 'nrd', op: 'XOR', second: 'fgs', target: 'wpb' },
    { first: 'frj', op: 'XOR', second: 'qhw', target: 'z04' },
    { first: 'bqk', op: 'OR', second: 'frj', target: 'z07' },
    { first: 'y03', op: 'OR', second: 'x01', target: 'nrd' },
    { first: 'hwm', op: 'AND', second: 'bqk', target: 'z03' },
    { first: 'tgd', op: 'XOR', second: 'rvg', target: 'z12' },
    { first: 'tnw', op: 'OR', second: 'pbm', target: 'gnj' },
  ]
};

const test_input_2 = {
  startValues: {
    x00: 0,
    x01: 1,
    x02: 0,
    x03: 1,
    x04: 0,
    x05: 1,
    y00: 0,
    y01: 0,
    y02: 1,
    y03: 1,
    y04: 0,
    y05: 1,
  },
  wires: [
    { first: 'x00', op: 'AND', second: 'y00', target: 'z00' },
    { first: 'x01', op: 'AND', second: 'y01', target: 'z01' },
    { first: 'x02', op: 'AND', second: 'y02', target: 'z02' },
    { first: 'x03', op: 'AND', second: 'y03', target: 'z03' },
    { first: 'x04', op: 'AND', second: 'y04', target: 'z04' },
    { first: 'x05', op: 'AND', second: 'y05', target: 'z05' },
  ]
};

const final_input = {
  startValues: {
    x00: 1,
    x01: 0,
    x02: 1,
    x03: 1,
    x04: 0,
    x05: 0,
    x06: 1,
    x07: 1,
    x08: 0,
    x09: 1,
    x10: 1,
    x11: 1,
    x12: 1,
    x13: 0,
    x14: 1,
    x15: 1,
    x16: 1,
    x17: 0,
    x18: 0,
    x19: 0,
    x20: 0,
    x21: 0,
    x22: 0,
    x23: 1,
    x24: 1,
    x25: 0,
    x26: 0,
    x27: 0,
    x28: 0,
    x29: 0,
    x30: 1,
    x31: 0,
    x32: 0,
    x33: 0,
    x34: 1,
    x35: 1,
    x36: 1,
    x37: 1,
    x38: 0,
    x39: 0,
    x40: 1,
    x41: 1,
    x42: 1,
    x43: 1,
    x44: 1,
    y00: 1,
    y01: 0,
    y02: 0,
    y03: 1,
    y04: 1,
    y05: 0,
    y06: 0,
    y07: 0,
    y08: 0,
    y09: 0,
    y10: 0,
    y11: 1,
    y12: 0,
    y13: 1,
    y14: 0,
    y15: 1,
    y16: 1,
    y17: 0,
    y18: 0,
    y19: 0,
    y20: 1,
    y21: 0,
    y22: 1,
    y23: 0,
    y24: 1,
    y25: 0,
    y26: 0,
    y27: 1,
    y28: 1,
    y29: 1,
    y30: 1,
    y31: 0,
    y32: 1,
    y33: 1,
    y34: 0,
    y35: 0,
    y36: 1,
    y37: 1,
    y38: 1,
    y39: 0,
    y40: 0,
    y41: 0,
    y42: 1,
    y43: 1,
    y44: 1,
  },
  wires: [
    { first: 'fcw', op: 'AND', second: 'hrn', target: 'jjw' },
    { first: 'rhr', op: 'AND', second: 'gwd', target: 'rjs' },
    { first: 'y24', op: 'XOR', second: 'x24', target: 'npf' },
    { first: 'tnj', op: 'XOR', second: 'qqn', target: 'z11' },
    { first: 'jfr', op: 'OR', second: 'qhf', target: 'jrv' },
    { first: 'fgc', op: 'AND', second: 'whc', target: 'gdr' },
    { first: 'dqm', op: 'AND', second: 'dfw', target: 'mmh' },
    { first: 'y08', op: 'XOR', second: 'x08', target: 'rqg' },
    { first: 'wvr', op: 'XOR', second: 'sfq', target: 'z03' },
    { first: 'y26', op: 'XOR', second: 'x26', target: 'nbq' },
    { first: 'x10', op: 'XOR', second: 'y10', target: 'nvk' },
    { first: 'rnc', op: 'XOR', second: 'rnf', target: 'z09' },
    { first: 'dws', op: 'AND', second: 'jkb', target: 'tsk' },
    { first: 'x34', op: 'AND', second: 'y34', target: 'hss' },
    { first: 'gkc', op: 'OR', second: 'tff', target: 'cfb' },
    { first: 'mmh', op: 'OR', second: 'vhw', target: 'bqr' },
    { first: 'vdj', op: 'AND', second: 'hvq', target: 'gkc' },
    { first: 'kfp', op: 'OR', second: 'hss', target: 'pfd' },
    { first: 'hbg', op: 'AND', second: 'rwk', target: 'jhc' },
    { first: 'y42', op: 'AND', second: 'x42', target: 'tbv' },
    { first: 'hgm', op: 'OR', second: 'gwk', target: 'qjk' },
    { first: 'jmr', op: 'AND', second: 'qts', target: 'fsf' },
    { first: 'prk', op: 'XOR', second: 'hsj', target: 'z16' },
    { first: 'y22', op: 'XOR', second: 'x22', target: 'wct' },
    { first: 'jwd', op: 'OR', second: 'fvv', target: 'nbs' },
    { first: 'ckj', op: 'OR', second: 'kjg', target: 'khc' },
    { first: 'dgr', op: 'XOR', second: 'rrd', target: 'z33' },
    { first: 'x00', op: 'AND', second: 'y00', target: 'njb' },
    { first: 'x08', op: 'AND', second: 'y08', target: 'dmd' },
    { first: 'y15', op: 'AND', second: 'x15', target: 'knn' },
    { first: 'jfk', op: 'AND', second: 'vkb', target: 'z29' },
    { first: 'y33', op: 'XOR', second: 'x33', target: 'vvm' },
    { first: 'kjp', op: 'XOR', second: 'nmj', target: 'z42' },
    { first: 'y02', op: 'XOR', second: 'x02', target: 'vvh' },
    { first: 'mgf', op: 'OR', second: 'dqq', target: 'bvf' },
    { first: 'snd', op: 'AND', second: 'sdf', target: 'tvn' },
    { first: 'rjd', op: 'OR', second: 'tbv', target: 'cvg' },
    { first: 'ghp', op: 'XOR', second: 'tjc', target: 'z06' },
    { first: 'kjp', op: 'AND', second: 'nmj', target: 'rjd' },
    { first: 'mbg', op: 'OR', second: 'ggm', target: 'skg' },
    { first: 'wjd', op: 'OR', second: 'dtv', target: 'jkb' },
    { first: 'x43', op: 'XOR', second: 'y43', target: 'drs' },
    { first: 'qjk', op: 'AND', second: 'fck', target: 'dqq' },
    { first: 'x38', op: 'XOR', second: 'y38', target: 'dws' },
    { first: 'tkb', op: 'AND', second: 'njb', target: 'hfp' },
    { first: 'pdf', op: 'XOR', second: 'npf', target: 'z24' },
    { first: 'x36', op: 'XOR', second: 'y36', target: 'kvv' },
    { first: 'x41', op: 'AND', second: 'y41', target: 'vhd' },
    { first: 'vjw', op: 'OR', second: 'hfp', target: 'knm' },
    { first: 'kgm', op: 'OR', second: 'nkt', target: 'hgw' },
    { first: 'y07', op: 'AND', second: 'x07', target: 'tff' },
    { first: 'jjw', op: 'OR', second: 'jvf', target: 'ntr' },
    { first: 'x41', op: 'XOR', second: 'y41', target: 'hbg' },
    { first: 'x39', op: 'XOR', second: 'y39', target: 'dfw' },
    { first: 'x25', op: 'AND', second: 'y25', target: 'vwd' },
    { first: 'dtp', op: 'XOR', second: 'hdp', target: 'z32' },
    { first: 'x19', op: 'XOR', second: 'y19', target: 'rsj' },
    { first: 'y43', op: 'AND', second: 'x43', target: 'tdb' },
    { first: 'x05', op: 'XOR', second: 'y05', target: 'mgj' },
    { first: 'y01', op: 'AND', second: 'x01', target: 'vjw' },
    { first: 'y20', op: 'XOR', second: 'x20', target: 'wpm' },
    { first: 'mbs', op: 'XOR', second: 'kvv', target: 'z36' },
    { first: 'wrd', op: 'AND', second: 'djc', target: 'kfp' },
    { first: 'x01', op: 'XOR', second: 'y01', target: 'tkb' },
    { first: 'gdr', op: 'OR', second: 'wfh', target: 'dtw' },
    { first: 'wct', op: 'AND', second: 'nbs', target: 'mbg' },
    { first: 'qqn', op: 'AND', second: 'tnj', target: 'njh' },
    { first: 'x17', op: 'XOR', second: 'y17', target: 'fnw' },
    { first: 'rnf', op: 'AND', second: 'rnc', target: 'rmd' },
    { first: 'bbn', op: 'AND', second: 'khc', target: 'kvj' },
    { first: 'x02', op: 'AND', second: 'y02', target: 'qhs' },
    { first: 'skg', op: 'XOR', second: 'bkg', target: 'z23' },
    { first: 'gdf', op: 'XOR', second: 'bqr', target: 'z40' },
    { first: 'rqg', op: 'AND', second: 'cfb', target: 'hgt' },
    { first: 'x27', op: 'XOR', second: 'y27', target: 'kbf' },
    { first: 'gdv', op: 'AND', second: 'hkd', target: 'qkt' },
    { first: 'x14', op: 'AND', second: 'y14', target: 'ckj' },
    { first: 'kvj', op: 'OR', second: 'knn', target: 'prk' },
    { first: 'tvn', op: 'OR', second: 'rhk', target: 'dtp' },
    { first: 'fgc', op: 'XOR', second: 'whc', target: 'z13' },
    { first: 'mjs', op: 'OR', second: 'cwb', target: 'rhr' },
    { first: 'x09', op: 'AND', second: 'y09', target: 'tjm' },
    { first: 'wpb', op: 'OR', second: 'fbj', target: 'z45' },
    { first: 'y23', op: 'AND', second: 'x23', target: 'gsv' },
    { first: 'x25', op: 'XOR', second: 'y25', target: 'cmd' },
    { first: 'drs', op: 'XOR', second: 'cvg', target: 'z43' },
    { first: 'x13', op: 'XOR', second: 'y13', target: 'whc' },
    { first: 'vwd', op: 'OR', second: 'qbc', target: 'wpt' },
    { first: 'knm', op: 'XOR', second: 'vvh', target: 'z02' },
    { first: 'y18', op: 'AND', second: 'x18', target: 'jvf' },
    { first: 'y23', op: 'XOR', second: 'x23', target: 'bkg' },
    { first: 'nfm', op: 'AND', second: 'nww', target: 'fbj' },
    { first: 'rhr', op: 'XOR', second: 'gwd', target: 'z28' },
    { first: 'fvf', op: 'OR', second: 'ncn', target: 'hvq' },
    { first: 'cfb', op: 'XOR', second: 'rqg', target: 'z08' },
    { first: 'bjh', op: 'OR', second: 'bcf', target: 'tsf' },
    { first: 'dnm', op: 'XOR', second: 'nvk', target: 'z10' },
    { first: 'y33', op: 'AND', second: 'x33', target: 'dgr' },
    { first: 'y13', op: 'AND', second: 'x13', target: 'wfh' },
    { first: 'wpt', op: 'AND', second: 'nbq', target: 'kgm' },
    { first: 'y44', op: 'XOR', second: 'x44', target: 'nww' },
    { first: 'hbg', op: 'XOR', second: 'rwk', target: 'z41' },
    { first: 'tjm', op: 'OR', second: 'rmd', target: 'dnm' },
    { first: 'y06', op: 'AND', second: 'x06', target: 'ncn' },
    { first: 'y22', op: 'AND', second: 'x22', target: 'ggm' },
    { first: 'sfq', op: 'AND', second: 'wvr', target: 'hgm' },
    { first: 'bvf', op: 'AND', second: 'mgj', target: 'rsn' },
    { first: 'vvh', op: 'AND', second: 'knm', target: 'fwv' },
    { first: 'wpm', op: 'XOR', second: 'tsf', target: 'z20' },
    { first: 'y31', op: 'XOR', second: 'x31', target: 'snd' },
    { first: 'x04', op: 'XOR', second: 'y04', target: 'fck' },
    { first: 'y42', op: 'XOR', second: 'x42', target: 'kjp' },
    { first: 'dtp', op: 'AND', second: 'hdp', target: 'wng' },
    { first: 'hgw', op: 'XOR', second: 'kbf', target: 'z27' },
    { first: 'jmr', op: 'XOR', second: 'qts', target: 'fgc' },
    { first: 'y21', op: 'XOR', second: 'x21', target: 'pjs' },
    { first: 'x24', op: 'AND', second: 'y24', target: 'jfr' },
    { first: 'wbg', op: 'OR', second: 'mtj', target: 'gdv' },
    { first: 'pfd', op: 'AND', second: 'hrb', target: 'sts' },
    { first: 'fsf', op: 'OR', second: 'nqs', target: 'z12' },
    { first: 'x00', op: 'XOR', second: 'y00', target: 'z00' },
    { first: 'bkj', op: 'AND', second: 'fhq', target: 'wjd' },
    { first: 'drs', op: 'AND', second: 'cvg', target: 'gwc' },
    { first: 'rsn', op: 'OR', second: 'rfc', target: 'ghp' },
    { first: 'x09', op: 'XOR', second: 'y09', target: 'rnf' },
    { first: 'rkd', op: 'OR', second: 'gvm', target: 'fhq' },
    { first: 'njb', op: 'XOR', second: 'tkb', target: 'z01' },
    { first: 'jhc', op: 'OR', second: 'vhd', target: 'nmj' },
    { first: 'wrb', op: 'XOR', second: 'dtw', target: 'z14' },
    { first: 'y18', op: 'XOR', second: 'x18', target: 'fcw' },
    { first: 'x11', op: 'AND', second: 'y11', target: 'gpj' },
    { first: 'y06', op: 'XOR', second: 'x06', target: 'tjc' },
    { first: 'y12', op: 'AND', second: 'x12', target: 'nqs' },
    { first: 'y29', op: 'AND', second: 'x29', target: 'wbg' },
    { first: 'y16', op: 'XOR', second: 'x16', target: 'hsj' },
    { first: 'nbq', op: 'XOR', second: 'wpt', target: 'z26' },
    { first: 'x27', op: 'AND', second: 'y27', target: 'cwb' },
    { first: 'y35', op: 'XOR', second: 'x35', target: 'hrb' },
    { first: 'dgr', op: 'AND', second: 'rrd', target: 'vtc' },
    { first: 'y38', op: 'AND', second: 'x38', target: 'wms' },
    { first: 'tqp', op: 'OR', second: 'mjj', target: 'hrn' },
    { first: 'pdf', op: 'AND', second: 'npf', target: 'qhf' },
    { first: 'qkt', op: 'OR', second: 'qgt', target: 'sdf' },
    { first: 'x28', op: 'AND', second: 'y28', target: 'jvp' },
    { first: 'qgr', op: 'OR', second: 'ght', target: 'vmr' },
    { first: 'y36', op: 'AND', second: 'x36', target: 'rkd' },
    { first: 'tsk', op: 'OR', second: 'wms', target: 'dqm' },
    { first: 'x32', op: 'AND', second: 'y32', target: 'gtw' },
    { first: 'gsv', op: 'OR', second: 'rvw', target: 'pdf' },
    { first: 'y17', op: 'AND', second: 'x17', target: 'tqp' },
    { first: 'nbs', op: 'XOR', second: 'wct', target: 'z22' },
    { first: 'nvk', op: 'AND', second: 'dnm', target: 'cgn' },
    { first: 'vmr', op: 'XOR', second: 'pjs', target: 'z21' },
    { first: 'tsf', op: 'AND', second: 'wpm', target: 'qgr' },
    { first: 'y03', op: 'AND', second: 'x03', target: 'gwk' },
    { first: 'bqr', op: 'AND', second: 'gdf', target: 'npt' },
    { first: 'y26', op: 'AND', second: 'x26', target: 'nkt' },
    { first: 'rsj', op: 'XOR', second: 'ntr', target: 'z19' },
    { first: 'y19', op: 'AND', second: 'x19', target: 'bcf' },
    { first: 'rsj', op: 'AND', second: 'ntr', target: 'bjh' },
    { first: 'hkd', op: 'XOR', second: 'gdv', target: 'z30' },
    { first: 'vkb', op: 'XOR', second: 'jfk', target: 'mtj' },
    { first: 'dmd', op: 'OR', second: 'hgt', target: 'rnc' },
    { first: 'x16', op: 'AND', second: 'y16', target: 'gfs' },
    { first: 'x04', op: 'AND', second: 'y04', target: 'mgf' },
    { first: 'x40', op: 'XOR', second: 'y40', target: 'gdf' },
    { first: 'y10', op: 'AND', second: 'x10', target: 'mvg' },
    { first: 'y05', op: 'AND', second: 'x05', target: 'rfc' },
    { first: 'y03', op: 'XOR', second: 'x03', target: 'sfq' },
    { first: 'x28', op: 'XOR', second: 'y28', target: 'gwd' },
    { first: 'wrd', op: 'XOR', second: 'djc', target: 'z34' },
    { first: 'bkj', op: 'XOR', second: 'fhq', target: 'dtv' },
    { first: 'vdj', op: 'XOR', second: 'hvq', target: 'z07' },
    { first: 'gpj', op: 'OR', second: 'njh', target: 'jmr' },
    { first: 'dws', op: 'XOR', second: 'jkb', target: 'z38' },
    { first: 'vvm', op: 'OR', second: 'vtc', target: 'wrd' },
    { first: 'jvp', op: 'OR', second: 'rjs', target: 'jfk' },
    { first: 'y15', op: 'XOR', second: 'x15', target: 'bbn' },
    { first: 'y34', op: 'XOR', second: 'x34', target: 'djc' },
    { first: 'y07', op: 'XOR', second: 'x07', target: 'vdj' },
    { first: 'nkg', op: 'OR', second: 'npt', target: 'rwk' },
    { first: 'hgw', op: 'AND', second: 'kbf', target: 'mjs' },
    { first: 'y12', op: 'XOR', second: 'x12', target: 'qts' },
    { first: 'wng', op: 'OR', second: 'gtw', target: 'rrd' },
    { first: 'jrv', op: 'XOR', second: 'cmd', target: 'z25' },
    { first: 'pjs', op: 'AND', second: 'vmr', target: 'fvv' },
    { first: 'bbn', op: 'XOR', second: 'khc', target: 'z15' },
    { first: 'sts', op: 'OR', second: 'skr', target: 'mbs' },
    { first: 'x30', op: 'AND', second: 'y30', target: 'qgt' },
    { first: 'y37', op: 'XOR', second: 'x37', target: 'bkj' },
    { first: 'nww', op: 'XOR', second: 'nfm', target: 'z44' },
    { first: 'bkg', op: 'AND', second: 'skg', target: 'rvw' },
    { first: 'y32', op: 'XOR', second: 'x32', target: 'hdp' },
    { first: 'qhs', op: 'OR', second: 'fwv', target: 'wvr' },
    { first: 'x30', op: 'XOR', second: 'y30', target: 'hkd' },
    { first: 'y44', op: 'AND', second: 'x44', target: 'wpb' },
    { first: 'x20', op: 'AND', second: 'y20', target: 'ght' },
    { first: 'y39', op: 'AND', second: 'x39', target: 'vhw' },
    { first: 'dgd', op: 'XOR', second: 'fnw', target: 'z17' },
    { first: 'tjc', op: 'AND', second: 'ghp', target: 'fvf' },
    { first: 'y14', op: 'XOR', second: 'x14', target: 'wrb' },
    { first: 'fnw', op: 'AND', second: 'dgd', target: 'mjj' },
    { first: 'sdf', op: 'XOR', second: 'snd', target: 'z31' },
    { first: 'mbs', op: 'AND', second: 'kvv', target: 'gvm' },
    { first: 'x31', op: 'AND', second: 'y31', target: 'rhk' },
    { first: 'x37', op: 'AND', second: 'y37', target: 'z37' },
    { first: 'mgj', op: 'XOR', second: 'bvf', target: 'z05' },
    { first: 'trs', op: 'OR', second: 'gfs', target: 'dgd' },
    { first: 'hrb', op: 'XOR', second: 'pfd', target: 'z35' },
    { first: 'wrb', op: 'AND', second: 'dtw', target: 'kjg' },
    { first: 'x11', op: 'XOR', second: 'y11', target: 'qqn' },
    { first: 'fcw', op: 'XOR', second: 'hrn', target: 'z18' },
    { first: 'y35', op: 'AND', second: 'x35', target: 'skr' },
    { first: 'y29', op: 'XOR', second: 'x29', target: 'vkb' },
    { first: 'x40', op: 'AND', second: 'y40', target: 'nkg' },
    { first: 'prk', op: 'AND', second: 'hsj', target: 'trs' },
    { first: 'cmd', op: 'AND', second: 'jrv', target: 'qbc' },
    { first: 'gwc', op: 'OR', second: 'tdb', target: 'nfm' },
    { first: 'qjk', op: 'XOR', second: 'fck', target: 'z04' },
    { first: 'dqm', op: 'XOR', second: 'dfw', target: 'z39' },
    { first: 'y21', op: 'AND', second: 'x21', target: 'jwd' },
    { first: 'mvg', op: 'OR', second: 'cgn', target: 'tnj' },
  ]
};

function part1(input) {
  uniq(flatMap(input.wires.map((wire) => [wire.first, wire.second, wire.target]))).forEach((key) => {
    if (input.startValues[key] === undefined) {
      input.startValues[key] = undefined;
    }
  });

  while (Object.values(input.startValues).some((value) => value === undefined)) {
    input.wires.forEach((wire) => {
      const first = input.startValues[wire.first];
      const second = input.startValues[wire.second];

      if (first !== undefined && second !== undefined) {
        let result = 0;
        switch (wire.op) {
          case 'AND':
            result = first && second;
            break;
          case 'OR':
            result = first || second;
            break;
          case 'XOR':
            result = first ^ second;
            break;
        }

        input.startValues[wire.target] = result;
      }
    });
  }

  const resultArray = Object.keys(input.startValues).map((key) => ({
    key: key,
    value: input.startValues[key],
  }));

  return parseInt(
    resultArray.filter(r => r.key.startsWith('z'))
      .sort((a, b) => a.key.localeCompare(b.key))
      .map(r => r.value)
      .reverse()
      .join('')
    , 2
  );
}

function part2(input) {
  const corruptedWires = [];
  const firstZ = 'z00';
  const lastZ = 'z45';

  for (let wire of input.wires) {
    if (/^z[0-9]+$/.test(wire.target) && wire.op !== "XOR" && wire.target !== firstZ) {
      corruptedWires.push(wire.target);
    }

    if (
      wire.op === "XOR"
      && /^[xyz][0-9]+$/.test(wire.first)
      && /^[xyz][0-9]+$/.test(wire.second)
      && /^[xyz][0-9]+$/.test(wire.target)
    ) {
      corruptedWires.push(wire.target);
    }

    if (wire.op === "AND" && wire.first !== "x00" && wire.second !== "x00") {
      for (let subwire of input.wires) {
        if ((wire.target === subwire.first || wire.target === subwire.second) && subwire.op !== "OR") {
          corruptedWires.push(wire.target);
        }
      }
    }

    if (wire.op === "XOR") {
      for (let subwire of input.wires) {
        if ((wire.target === subwire.first || wire.target === subwire.second) && subwire.op === "OR") {
          corruptedWires.push(wire.target);
        }
      }
    }
  }

  return corruptedWires.filter(wire => wire !== lastZ).sort().join(',');
}

console.log(part2(final_input));