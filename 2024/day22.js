const { compact } = require("lodash");

const test_input = [
  // 123,
  1,
  2,
  3,
  2024,
];

const final_input = [
  11039925,
  7437815,
  11477663,
  9656683,
  13355289,
  13392160,
  8479502,
  8227148,
  13059460,
  6689101,
  13137270,
  13039782,
  15624590,
  2530006,
  2060314,
  15264131,
  2461044,
  10484158,
  15476464,
  3050434,
  2087661,
  9981434,
  12183172,
  6657016,
  4105536,
  7788999,
  5596358,
  12510123,
  11064134,
  11023978,
  4411436,
  6594390,
  3956866,
  7405223,
  1817822,
  12488702,
  1235906,
  15595780,
  2284261,
  5186708,
  15020444,
  9805710,
  7692974,
  10735786,
  10743548,
  2081109,
  13515349,
  11548641,
  7725841,
  3273754,
  14578044,
  15449304,
  8978536,
  15289567,
  14155389,
  5975411,
  3828086,
  13966599,
  1903114,
  1425885,
  2655669,
  3512717,
  8137032,
  9383408,
  12589202,
  707459,
  12647851,
  633476,
  13097585,
  15859362,
  10705087,
  12550996,
  4308428,
  6370576,
  2718764,
  6528133,
  8291809,
  16298156,
  2053931,
  4300030,
  4704635,
  11678561,
  8121759,
  12511074,
  3344988,
  5216962,
  12602855,
  8818396,
  3786818,
  12939550,
  13681786,
  2497934,
  3536133,
  12783785,
  1061645,
  3130708,
  3077381,
  931318,
  2992141,
  6602255,
  3105862,
  2500371,
  1725902,
  2739426,
  11379612,
  16434679,
  9558722,
  12497539,
  5843686,
  293029,
  2173085,
  11821579,
  6073313,
  1661320,
  4076326,
  14684863,
  15865101,
  11978724,
  11965433,
  14844830,
  5166122,
  3241216,
  9265732,
  8518876,
  8889382,
  6899662,
  1783822,
  7861984,
  12222944,
  15718459,
  759094,
  7986686,
  2545125,
  14245419,
  10030813,
  12423844,
  241203,
  12279843,
  9683834,
  4015522,
  16005723,
  16739423,
  384062,
  16432093,
  9782432,
  13895050,
  10694407,
  15813309,
  9944177,
  15832276,
  5358687,
  10798013,
  1026136,
  12625491,
  4112016,
  6006644,
  11734943,
  2919605,
  12205327,
  6048992,
  140579,
  6453066,
  3141116,
  12516803,
  8697163,
  16077600,
  16734600,
  1278618,
  4884457,
  6545053,
  13636759,
  15807703,
  14613398,
  10494075,
  9120757,
  6144757,
  7799397,
  8390742,
  13153243,
  5409896,
  2111240,
  3934749,
  10134388,
  2122075,
  11851065,
  9750491,
  13919605,
  5365990,
  8898539,
  13086704,
  15263941,
  4218255,
  525033,
  11094722,
  14930522,
  11315381,
  5913521,
  1692475,
  9684855,
  282605,
  16090598,
  14271229,
  10281096,
  16740442,
  6556234,
  3338053,
  7023796,
  16671118,
  13642559,
  9600951,
  9042011,
  13109458,
  2494137,
  10278386,
  5189757,
  5368904,
  8801049,
  10218980,
  2090494,
  3750121,
  12249551,
  15789074,
  9664911,
  15815723,
  10887041,
  5679831,
  16674536,
  8425430,
  10681700,
  14609029,
  16258974,
  8573305,
  9793984,
  13710557,
  14431981,
  4453623,
  1154537,
  1376995,
  3615540,
  15611820,
  507333,
  10999619,
  11142109,
  507363,
  16742318,
  11857882,
  11394539,
  9718671,
  15975103,
  2437295,
  12964382,
  5468588,
  6943933,
  9556702,
  6703411,
  6942719,
  13942669,
  12198971,
  4161623,
  1764771,
  15839138,
  13027949,
  456053,
  13391449,
  8802582,
  14100290,
  4791183,
  11885909,
  5287675,
  6284671,
  3643062,
  3372324,
  7999530,
  13676359,
  9177294,
  8217887,
  1197360,
  5669465,
  7182221,
  15813888,
  500742,
  1246431,
  16411825,
  8387619,
  14810924,
  8601712,
  14147225,
  13039982,
  5309979,
  11727374,
  7685361,
  7061472,
  8719477,
  2913914,
  15468087,
  8269940,
  3091241,
  5678087,
  10201947,
  723268,
  9304700,
  5543795,
  12581306,
  6203815,
  9645406,
  7514544,
  15379761,
  505978,
  12680322,
  8526499,
  3905240,
  10414777,
  8219263,
  4602339,
  4785525,
  14584398,
  4868341,
  4871274,
  15502728,
  2043134,
  2543811,
  4054472,
  16178191,
  16570209,
  4969618,
  14825203,
  4146204,
  1144070,
  3329149,
  16661834,
  2977630,
  16309001,
  7332665,
  16591733,
  8388797,
  2984661,
  15593514,
  3153147,
  2441496,
  15076638,
  11896256,
  4660798,
  6292759,
  1722042,
  3966983,
  11443811,
  983815,
  6993801,
  8858543,
  4813092,
  2925665,
  8363110,
  10539460,
  5735717,
  14291868,
  769496,
  6483761,
  16044430,
  4761493,
  4059954,
  2918512,
  2532570,
  7134662,
  13077161,
  10367274,
  10086598,
  4361973,
  10465344,
  2677831,
  6532382,
  8512289,
  10437688,
  11270839,
  15894202,
  16149424,
  7167082,
  7390566,
  9194159,
  2595553,
  247511,
  682250,
  16007377,
  5515230,
  13338009,
  1566748,
  11535889,
  7578505,
  11301282,
  8300524,
  16025626,
  4660875,
  12804231,
  6682844,
  8743327,
  13699286,
  8032057,
  10530512,
  3601243,
  11657483,
  2377087,
  13088128,
  10930805,
  1413875,
  1774023,
  9573316,
  3072848,
  4387420,
  1992742,
  16589035,
  5804323,
  3618643,
  7567150,
  14145326,
  8634545,
  4791498,
  13279188,
  1488295,
  10817683,
  10803024,
  10614673,
  12847770,
  7265579,
  16109975,
  1424273,
  1358764,
  15915784,
  11041770,
  4628003,
  4695182,
  1145351,
  9682396,
  3650102,
  13817036,
  14816943,
  9777592,
  10918245,
  4633263,
  6594715,
  9530212,
  3409098,
  10889990,
  14783645,
  2198400,
  15265217,
  7957267,
  9916985,
  12017598,
  450215,
  7500605,
  614076,
  7710061,
  2605754,
  9919786,
  16260807,
  16430911,
  6546533,
  9383548,
  8524410,
  5391981,
  11649143,
  2568715,
  3238572,
  15906094,
  1849380,
  7945062,
  7253944,
  13398173,
  5202193,
  9243527,
  1676856,
  4795868,
  15662916,
  7790824,
  1541345,
  2708827,
  6469202,
  2334945,
  6935105,
  16059104,
  15117059,
  12059337,
  3707536,
  7091418,
  6484541,
  13940610,
  6534931,
  10450229,
  10185511,
  1255479,
  9052853,
  6567127,
  15597111,
  10913157,
  12627044,
  13724787,
  427823,
  6579185,
  12411048,
  634185,
  16620035,
  11987836,
  9362043,
  8175072,
  10805271,
  15926554,
  15761673,
  3853729,
  9099637,
  12796487,
  15709744,
  9857434,
  10654275,
  8142695,
  162291,
  3723402,
  15361304,
  375126,
  8274683,
  7180175,
  12227743,
  7712942,
  2714952,
  3880874,
  14786466,
  2224436,
  10674094,
  13039999,
  5719918,
  2937228,
  1751210,
  1424474,
  180079,
  7839168,
  5495831,
  11027152,
  3418861,
  8910365,
  2105329,
  14403031,
  9963747,
  5868254,
  8597288,
  3963483,
  6122302,
  822145,
  13678741,
  2312424,
  14459883,
  15949322,
  159459,
  2287109,
  1283261,
  7255608,
  10755573,
  7141486,
  6947965,
  9363110,
  12625050,
  2181961,
  5937463,
  6839540,
  15140846,
  4366821,
  5737303,
  6975071,
  2212297,
  16501644,
  11228194,
  11600644,
  13344417,
  5010502,
  9626053,
  1550973,
  7951153,
  2162256,
  1962317,
  171245,
  11524063,
  12895055,
  696522,
  4910729,
  1153359,
  7962412,
  15335209,
  13484362,
  4377638,
  11246762,
  5247333,
  4890647,
  10315506,
  15900836,
  428842,
  14761882,
  16466577,
  15874030,
  5783890,
  13486875,
  10620936,
  13000879,
  9792590,
  7486992,
  1946810,
  4189685,
  9979133,
  14591387,
  4803685,
  14096160,
  16700761,
  3835651,
  9223389,
  9369484,
  11947270,
  8851747,
  14367633,
  5349814,
  880080,
  4367896,
  541263,
  9221861,
  7811863,
  6234062,
  10399851,
  11472122,
  4294206,
  7003334,
  8112522,
  3392229,
  3428191,
  15598153,
  9540782,
  7529675,
  6128084,
  8441165,
  14094050,
  13848231,
  9422197,
  9343914,
  10522141,
  13333162,
  3294442,
  10879679,
  5473324,
  9296721,
  7865594,
  15988587,
  14424182,
  10959782,
  11558253,
  1389614,
  15035234,
  12084637,
  12318651,
  15494523,
  9961678,
  10685196,
  3387339,
  13584558,
  13113750,
  13988898,
  12731561,
  12361646,
  11835554,
  10732200,
  6535275,
  12171566,
  12087089,
  2395862,
  13970537,
  9714542,
  16715806,
  15664318,
  3008302,
  8647896,
  5293029,
  310204,
  10080728,
  895502,
  3289325,
  15701908,
  5521430,
  7267340,
  14313017,
  630854,
  736821,
  1976724,
  1059878,
  16653739,
  1196442,
  7507348,
  16539684,
  10541667,
  2956888,
  1927002,
  3626890,
  15231356,
  3479212,
  5519655,
  15954845,
  395182,
  6034357,
  6294882,
  4886465,
  2969308,
  12472327,
  7549408,
  6566792,
  4441288,
  10715506,
  13202101,
  9731770,
  4612069,
  15582665,
  10322626,
  7585535,
  569925,
  2423659,
  2346667,
  12533479,
  13401717,
  16111594,
  16559840,
  7599682,
  16465987,
  14805598,
  6286979,
  14400882,
  8886056,
  6490524,
  5275211,
  6619745,
  7447821,
  12359198,
  1932300,
  14145315,
  603631,
  5040409,
  15564895,
  8239595,
  5699281,
  7115785,
  7300059,
  7435550,
  15659015,
  1334008,
  13884302,
  4509342,
  6349805,
  10851733,
  13818066,
  14280737,
  6609551,
  4109702,
  12544576,
  14270855,
  11335869,
  7520318,
  7656034,
  10054266,
  14643320,
  8887867,
  11664361,
  15096947,
  1623417,
  13112738,
  4305500,
  8981073,
  353800,
  14897364,
  10737902,
  15196450,
  15567373,
  4653080,
  3997358,
  9783171,
  12907439,
  7462163,
  15818613,
  13254700,
  11686265,
  11982217,
  4967152,
  8612263,
  13966693,
  14810566,
  2406079,
  5602048,
  1874337,
  11145180,
  4558096,
  16710785,
  15492952,
  15167759,
  16002596,
  6542820,
  9816097,
  16717760,
  7120905,
  4848240,
  3621915,
  9252735,
  3204178,
  14856302,
  1753097,
  12569630,
  9828072,
  16709160,
  15160338,
  4031766,
  13093600,
  4045911,
  5304330,
  16084483,
  2560544,
  724542,
  13453666,
  6612131,
  13304292,
  2939934,
  10298389,
  9651783,
  12839009,
  892626,
  5893910,
  4215724,
  4251284,
  275543,
  14305496,
  9123782,
  1545195,
  10452717,
  10055098,
  6390343,
  11974555,
  388136,
  4793121,
  7896686,
  1971373,
  5054670,
  5665572,
  16320532,
  6408507,
  12958415,
  6799523,
  1448183,
  13027088,
  6432197,
  7691951,
  11719873,
  13249231,
  8892829,
  4987663,
  12699785,
  3280573,
  13754319,
  11533979,
  3123271,
  14739165,
  1291109,
  3475982,
  2240287,
  9550936,
  11457704,
  9881298,
  15096905,
  14732863,
  15580079,
  1389571,
  8938232,
  3748965,
  4038502,
  14070994,
  3206596,
  13211275,
  11434418,
  1126690,
  11356888,
  3296598,
  5605221,
  12931053,
  10193785,
  8665937,
  12047479,
  14845905,
  8078443,
  539140,
  8440991,
  2515111,
  13595451,
  8679759,
  1289998,
  8555729,
  6747035,
  14329218,
  3932957,
  4920680,
  3546526,
  12141109,
  13284687,
  5539109,
  304918,
  9331866,
  14475446,
  12736064,
  8461580,
  14196498,
  15932155,
  13085504,
  13138918,
  15913171,
  16095678,
  14288114,
  4074214,
  10936078,
  9177288,
  2878565,
  2905930,
  2162784,
  4739800,
  7918095,
  15671965,
  11253632,
  7599138,
  1529538,
  4189116,
  12492238,
  2639767,
  16657235,
  5840998,
  15221263,
  1855537,
  16270404,
  805720,
  15671761,
  13111053,
  1938178,
  10657421,
  8068322,
  13232108,
  13848971,
  10356602,
  10592523,
  13492492,
  12086148,
  279026,
  13408401,
  3326656,
  6693912,
  12094172,
  8994602,
  10086443,
  7269879,
  7146430,
  15548137,
  8435375,
  12117531,
  9910533,
  13281333,
  15828564,
  6462967,
  8313816,
  14075164,
  5160008,
  3420639,
  16182095,
  3518570,
  457451,
  9312347,
  12686640,
  16429951,
  9353848,
  780898,
  303442,
  6515330,
  4658011,
  1152536,
  10472035,
  3847280,
  2740622,
  4927995,
  2402304,
  8823744,
  4880401,
  6744079,
  3776192,
  7246721,
  16002666,
  6050719,
  2103363,
  9749662,
  11518389,
  15928326,
  6782281,
  2850175,
  10952760,
  6358707,
  1530715,
  9016441,
  576429,
  11847287,
  13003953,
  13830523,
  10652851,
  9173233,
  1532125,
  1003030,
  13677230,
  7923848,
  9641186,
  3996260,
  12316747,
  654680,
  155530,
  4837986,
  431990,
  8787151,
  8605724,
  1867865,
  12638496,
  15704738,
  8280025,
  13473335,
  16750444,
  2945333,
  10024764,
  2689101,
  15809864,
  4409143,
  8199284,
  11216802,
  4486714,
  5160873,
  16727595,
  7692303,
  12004925,
  14287917,
  9921158,
  5822049,
  5188910,
  10572502,
  11524876,
  11410531,
  9256163,
  13827122,
  4737292,
  13970192,
  11402855,
  16662449,
  8665139,
  2999866,
  8086301,
  15384314,
  7922701,
  11298777,
  8569762,
  14419967,
  14452333,
  7756711,
  8485194,
  16745754,
  7448059,
  10046714,
  15333806,
  11978146,
  11692709,
  10102968,
  401322,
  15010769,
  8126210,
  9685774,
  3113810,
  170467,
  2871166,
  1696706,
  11113736,
  7719872,
  15808420,
  10169447,
  1001403,
  15650674,
  7366869,
  6377533,
  16463258,
  15673605,
  9202006,
  2264666,
  4565546,
  4798812,
  8236248,
  12481240,
  16535174,
  7278267,
  15107455,
  3424985,
  3891720,
  4842678,
  1010589,
  9672917,
  15569908,
  7809881,
  3446939,
  8446520,
  13595666,
  8105518,
  11191260,
  16129098,
  11524376,
  7386858,
  16114889,
  4027512,
  7009986,
  5814343,
  1046737,
  8185452,
  11184940,
  2314140,
  8457379,
  6498546,
  11724199,
  7871103,
  13214416,
  11810931,
  8135084,
  2362536,
  9524368,
  5018305,
  15765714,
  1076495,
  579988,
  1719104,
  9607138,
  9136894,
  2555513,
  11423688,
  10170121,
  8196236,
  14699747,
  10042715,
  8328460,
  2304707,
  1437974,
  745384,
  7521006,
  11418655,
  7849342,
  9264730,
  15985193,
  10917911,
  7223724,
  4472720,
  8379581,
  4323474,
  6438398,
  16100968,
  6979002,
  13503770,
  689287,
  11083570,
  5819346,
  5388782,
  9873563,
  1867757,
  13328247,
  1425074,
  14640629,
  15545036,
  6130860,
  1459435,
  2395249,
  3002625,
  15896418,
  7739655,
  16071443,
  11224459,
  797059,
  8747229,
  7465544,
  6900161,
  7431452,
  12915778,
  11896634,
  14696250,
  875832,
  9400945,
  12668535,
  5723176,
  12432873,
  6421871,
  9175122,
  7950219,
  7410100,
  8210150,
  14260958,
  1460611,
  1751390,
  10760988,
  8059358,
  5562585,
  6016108,
  8868614,
  9496979,
  6396181,
  3390987,
  10176663,
  2395144,
  8082368,
  7947582,
  13681810,
  16444991,
  15803165,
  3473705,
  3925598,
  7713142,
  1889385,
  13450557,
  6135911,
  9925060,
  182973,
  16248220,
  8032681,
  13149248,
  11819490,
  12203186,
  14783255,
  10545457,
  6256890,
  16361555,
  8276118,
  11927497,
  5312354,
  11000042,
  13718823,
  3391120,
  3109465,
  336215,
  4887539,
  5544641,
  1377997,
  6745092,
  4446140,
  7776157,
  10090569,
  13427328,
  3232539,
  15247923,
  6824802,
  3015281,
  15452651,
  5987309,
  374500,
  7636554,
  10099173,
  4950994,
  16034532,
  1686344,
  13455978,
  14098842,
  292662,
  3154580,
  9796645,
  4756315,
  5233430,
  3281438,
  11736286,
  11271414,
  4257168,
  11601116,
  791992,
  9069665,
  9322747,
  4657808,
  4113792,
  15979863,
  10982170,
  7528134,
  5996948,
  4702013,
  6774422,
  6786859,
  11839833,
  11179655,
  12050735,
  8319848,
  10798557,
  15742333,
  3959725,
  5539545,
  8023248,
  5979103,
  9682085,
  7337799,
  15859320,
  14612374,
  7515454,
  1023364,
  10794435,
  15058852,
  8181406,
  16459372,
  934682,
  9165608,
  15531825,
  9729561,
  14926311,
  3239593,
  12263421,
  14259584,
  13035851,
  9229984,
  14269179,
  15062425,
  9190832,
  15644096,
  9016347,
  12711002,
  2774625,
  16678017,
  2500007,
  12075102,
  5917562,
  11461649,
  8345304,
  580075,
  170212,
  6323751,
  14090005,
  9059403,
  5205549,
  4784857,
  3211681,
  10109687,
  193634,
  2878277,
  4369364,
  7506950,
  12498459,
  10922141,
  1528462,
  4206209,
  13332006,
  12828921,
  6341225,
  10260722,
  8858191,
  12714858,
  10827823,
  8008794,
  15875282,
  4548781,
  1475685,
  5409554,
  3863576,
  2030363,
  6908961,
  14980033,
  4767839,
  13501612,
  15727397,
  6858620,
  16141808,
  15653436,
  5862928,
  12749180,
  8543083,
  15127964,
  16125852,
  2275217,
  8233631,
  5550492,
  2295868,
  1556051,
  10824297,
  3973566,
  8848373,
  14091423,
  1352878,
  10133511,
  339480,
  15945830,
  6498465,
  13882414,
  13514110,
  4521245,
  12612113,
  12012871,
  179502,
  9460539,
  644731,
  7669767,
  7208103,
  15364650,
  6755097,
  7290094,
  9625558,
  4584436,
  8316952,
  6414487,
  13951094,
  14402938,
  5164944,
  10167033,
  12151004,
  15421609,
  3925684,
  3566989,
  11280975,
  1360231,
  13365278,
  4135381,
  5695172,
  14697263,
  1376967,
  13887325,
  16442989,
  12639810,
  12553669,
  12091089,
  14558375,
  9589091,
  4888675,
  12209573,
  3599578,
  1339804,
  13241512,
  9654158,
  2485867,
  11503168,
  3611352,
  2449133,
  3665502,
  8826289,
  5360350,
  13379708,
  11699534,
  15702211,
  9322495,
  8945271,
  3358750,
  5009564,
  8677247,
  7961052,
  5519742,
  15611646,
  4740932,
  14838405,
  2908261,
  1813639,
  14995907,
  14102127,
  14030022,
  13116749,
  13220827,
  3351246,
  16023138,
  10398586,
  789329,
  11261005,
  11561460,
  160528,
  3687709,
  4590708,
  15265340,
  12688128,
  10630280,
  13983212,
  2716688,
  11749344,
  5208979,
  12074571,
  8571482,
  4564295,
  857347,
  9946869,
  15202316,
  3456423,
  10103963,
  9366967,
  12370487,
  7562982,
  4382219,
  15945185,
  5968632,
  2481535,
  5945907,
  6042092,
  11880097,
  4377080,
  2056241,
  14190837,
  16713309,
  6956756,
  15284185,
  5685480,
  4383419,
  14301370,
  8214746,
  9724578,
  584673,
  9111978,
  2033931,
  386789,
  6463655,
  5813076,
  3200999,
  2686686,
  13025481,
  14839409,
  8472909,
  6669966,
  3987493,
  9018870,
  2820419,
  11317368,
  5517685,
  6014813,
  2345291,
  10153435,
  1029399,
  10622468,
  13822353,
  14514933,
  7795831,
  9844901,
  2220026,
  3111098,
  14951214,
  1328741,
  16357543,
  5120779,
  5987418,
  2500251,
  16036426,
  15161460,
  1678262,
  3771579,
  7346219,
  8357182,
  14094015,
  13560323,
  1304405,
  1500163,
  11506117,
  2378391,
  15552506,
  6016932,
  16680669,
  16419992,
  5374605,
  14979894,
  6547643,
  8910703,
  9711005,
  16339312,
  10760464,
  737589,
  3723495,
  701402,
  12124260,
  13332839,
  14983046,
  13359166,
  14124172,
  13290612,
  3832190,
  9438669,
  15036829,
  3712177,
  15534166,
  8652981,
  755657,
  4015184,
  9885092,
  2783281,
  5871064,
  9661087,
  15503838,
  15844737,
  5153749,
  7892631,
  11450342,
  10600349,
  11625305,
  13761307,
  10715937,
  4558151,
  7705107,
  497587,
  3652859,
  7875203,
  9701255,
  619696,
  2844685,
  10665345,
  3180439,
  13434015,
  16065813,
  13170354,
  4978739,
  8706258,
  1668395,
  4054503,
  821418,
  8115332,
  6227869,
  13662248,
  6550569,
  14443397,
  8527100,
  4488547,
  4392612,
  10266597,
  10417863,
  4300552,
  7445228,
  10903335,
  5457991,
  1163045,
  8884643,
  8189121,
  8379392,
  10999818,
  975610,
  13729386,
  6360590,
  1276887,
  10256204,
  10428576,
  12483006,
  14671907,
  10667374,
  15294538,
  9249640,
  10997898,
  5631786,
  13921007,
  6853267,
  4583858,
  456039,
  16001807,
  4556539,
  2759266,
  13667532,
  15463322,
  669978,
  503565,
  551162,
  5907738,
  11478866,
  13677453,
  2021173,
  9435993,
  8732591,
  8543143,
  973103,
  16112545,
  15167189,
  1592205,
  3443910,
  2049153,
  12591714,
  16143010,
  9055678,
  8962311,
  11647876,
  5270126,
  2630195,
  4189423,
  4856128,
  4273959,
  9701634,
  10434044,
  2872407,
  1348579,
  12706471,
  7551692,
  11093063,
  9115699,
  4675572,
  10201617,
  2910554,
  562401,
  3636910,
  2271162,
  792101,
  1814336,
  8645004,
  10807794,
  2529117,
  1756102,
  7825159,
  8910653,
  7620131,
  5242504,
  10264681,
  1034975,
  9126758,
  3059854,
  14243820,
  6575841,
  14918983,
  647474,
  250121,
  6958255,
  16444830,
  8292391,
  1372420,
  8218614,
  4994600,
  7380277,
  8703627,
  6079720,
  12474116,
  11731828,
  4332927,
  15508566,
  7264872,
  16200761,
  13862719,
  6704946,
  5636245,
  12881926,
  10971025,
  10080555,
  8309843,
  855626,
  16736741,
  15440063,
  4728356,
  5002775,
  1579478,
  7349257,
  6549164,
  9545378,
  5983233,
  4482527,
  10511020,
  13124824,
  6113474,
  12804198,
  7258122,
  13377623,
  12327188,
  15559273,
  16623432,
  13116307,
  16090560,
  11437247,
  7893722,
  11408959,
  7598621,
  15824675,
  7772566,
  8479677,
  5838089,
  6463595,
  3821176,
  14915275,
  4301881,
  366551,
  510401,
  11298168,
  7472871,
  3284094,
  201042,
  3344946,
  10427590,
  3352382,
  13401063,
  15861138,
  11570287,
  8332203,
  13602725,
  13156011,
  4542685,
  15062900,
  11664417,
  2859408,
  13518667,
  14083727,
  3620285,
  5309455,
  3616126,
  6706966,
  13541344,
  1459159,
  12921801,
  3881813,
  6535231,
];

const modulo = (n, d) => ((n % d) + d) % d;
const mix = (n, s) => n ^ s;
const prune = (n) => modulo(n, 16777216);
const lastDigit = (n) => parseInt(n.toString().split('').pop());

function part1(input) {
  let secretNumber;
  let secretNumberSum = 0;

  for (let i in input) {
    secretNumber = input[i];

    for (let j = 0; j < 2000; j++) {
      secretNumber = prune(mix(secretNumber * 64, secretNumber));
      secretNumber = prune(mix(Math.floor(secretNumber / 32), secretNumber));
      secretNumber = prune(mix(secretNumber * 2048, secretNumber));
    }

    secretNumberSum += secretNumber;
  }

  return secretNumberSum;
}

function part2(input) {
  let secretNumber;
  let bestPrices = [];
  let sequences = {};

  for (let i in input) {
    secretNumber = input[i];
    let prices = [];
    let diffs = [];
    let bestPrice;

    for (let j = 0; j < 2000; j++) {
      let newSecretNumber = secretNumber;
      newSecretNumber = prune(mix(newSecretNumber * 64, newSecretNumber));
      newSecretNumber = prune(mix(Math.floor(newSecretNumber / 32), newSecretNumber));
      newSecretNumber = prune(mix(newSecretNumber * 2048, newSecretNumber));

      let price = lastDigit(secretNumber);
      let newPrice = lastDigit(newSecretNumber);
      let diff = newPrice - price;

      prices.push(newPrice);
      diffs.push(diff);

      if (diffs.length >= 4) {
        let seqStr = diffs.slice(-4).join(',');
        if (!sequences[seqStr]) {
          sequences[seqStr] = 0;
        }
        sequences[seqStr] += newPrice;
        if (seqStr == '-1,0,0,2') {
          bestPrice = newPrice;
          break;
        }
      }

      secretNumber = newSecretNumber
    }

    if (bestPrice) {
      bestPrices.push(bestPrice);
    }
  }


  sequences = Object.keys(sequences).map(key => ({ key, value: sequences[key] }));
  console.log(sequences.sort((a, b) => b.value - a.value).slice(0, 10));

  return bestPrices;
}

console.log(part2(final_input).reduce((a, b) => a + b, 0));