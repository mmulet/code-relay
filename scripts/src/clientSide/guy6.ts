const guy6Animations = {
  climb: "guy6Climb",
  idle: "guy6Idle",
};

interface DirtParticle {
  relativeX: number;
  relativeY: number;
  size: number;
  velocity: {
    x: number;
    y: number;
  };
  stuck: boolean;
}

interface ConfettiParticle {
  relativeX: number;
  relativeY: number;
  velocity: {
    x: number;
    y: number;
    decreasing: boolean;
  };
  color: string;
  stuck: boolean;
  stuckTime: number;
}

interface IGuy6 extends AnimCharacter {
  dirtParticles: DirtParticle[];
  timeUntilNextDirtParticle: number;
  timeUntilConfettiBurst: {
    left: number;
    right: number;
  };
  confettiParticles: Map<number, ConfettiParticle>;
  /**
   * Not the same as dirtParticles.length
   * because a dirt particle is only generated
   * if it's generated as part of the scene.
   * It's confusing I will change this later
   */
  generatedDirtParticleCount: number;
  timeSinceBatonCrashed: number;
}

class Guy6 implements IGuy6 {
  image: IGuy6["image"];

  constructor() {
    this.image = document.getElementById("guy6-png") as HTMLImageElement;
  }

  dirtParticles: IGuy6["dirtParticles"] = [];
  confettiParticles: IGuy6["confettiParticles"] = new Map();
  animState: IGuy6["animState"] = {
    animation: guy6Animations.climb,
    frame: 0,
    reverse: false,
    nextAnimation: [],
  };
  generatedDirtParticleCount: IGuy6["generatedDirtParticleCount"] = 0;
  position: IGuy6["position"] = {
    x: 0,
    y: 0,
  };
  size: IGuy6["size"] = {
    w: 64,
    h: 64,
  };
  timeUntilNextDirtParticle: IGuy6["timeUntilNextDirtParticle"] = 0.1;
  timeSinceBatonCrashed: IGuy6["timeSinceBatonCrashed"] = 0;
  timeUntilConfettiBurst: IGuy6["timeUntilConfettiBurst"] = {
    left: 0,
    right: 0,
  };
  setPosition({ sixthGuyWall: { left, right, top } }: Walls) {
    this.position.x = (right - left) / 2 + left - 32;
    this.position.y = top - 58;
  }
  hide: IGuy6["hide"] = true;

  framePositions: IGuy6["framePositions"] = {
    guy6Climb: [
      [0, 0],
      [65, 0],
      [130, 0],
      [0, 65],
      [65, 65],
      [0, 130],
      [65, 130],
      [130, 65],
      [130, 130],
      [195, 0],
      [195, 65],
      [260, 0],
      [195, 130],
      [260, 65],
      [325, 0],
      [390, 0],
      [325, 65],
      [260, 130],
      [325, 130],
      [390, 65],
      [390, 130],
      [0, 195],
      [0, 260],
      [65, 195],
      [65, 260],
      [0, 325],
      [130, 195],
      [65, 325],
      [0, 390],
      [195, 195],
      [130, 260],
      [130, 325],
      [260, 195],
      [65, 390],
      [195, 260],
      [130, 390],
      [260, 260],
      [195, 325],
      [325, 195],
      [260, 325],
      [195, 390],
      [390, 195],
      [325, 260],
      [390, 260],
      [325, 325],
      [260, 390],
      [325, 390],
      [390, 325],
      [390, 390],
      [455, 0],
      [455, 65],
      [520, 0],
      [520, 65],
      [455, 130],
      [585, 0],
      [585, 65],
      [520, 130],
      [455, 195],
      [650, 0],
      [715, 0],
      [650, 65],
      [585, 130],
      [520, 195],
      [455, 260],
      [650, 130],
      [585, 195],
      [520, 260],
      [455, 325],
      [780, 0],
      [715, 65],
      [455, 390],
      [780, 65],
      [715, 130],
      [585, 260],
      [520, 325],
      [650, 195],
      [715, 195],
      [650, 260],
      [585, 325],
      [520, 390],
      [780, 130],
      [585, 390],
      [780, 195],
      [650, 325],
      [715, 260],
      [780, 260],
      [715, 325],
      [650, 390],
      [715, 390],
      [780, 325],
      [780, 390],
      [0, 455],
      [65, 455],
      [0, 520],
      [130, 455],
      [65, 520],
      [0, 585],
      [195, 455],
      [130, 520],
      [65, 585],
      [195, 520],
      [130, 585],
      [260, 455],
      [260, 520],
      [195, 585],
      [325, 455],
      [260, 585],
      [390, 455],
      [325, 520],
      [325, 585],
      [390, 520],
      [455, 455],
      [455, 520],
      [390, 585],
      [520, 455],
      [455, 585],
    ],
    guy6Idle: [
      [585, 455],
      [520, 520],
      [520, 585],
      [650, 455],
    ],
  };
  batonPosition: IGuy6["batonPosition"] = {
    guy6Climb: {
      0: {
        zRotation: -1.2024732828140259,
        y: 55.57269453872097,
        x: 32.66970345752487,
        yScale: 0.6120448900481402,
      },
      1: {
        zRotation: -0.7418569326400757,
        y: 52.56094727229551,
        x: 32.20635756638532,
        yScale: 0.6120448900481402,
      },
      2: {
        zRotation: -0.4884149730205536,
        y: 49.1630775993639,
        x: 32.51525482714502,
        yScale: 0.6120448900481402,
      },
      3: {
        zRotation: -0.6846311688423157,
        y: 47.000796708904325,
        x: 33.364722277948765,
        yScale: 0.6120448900481402,
      },
      4: {
        zRotation: -1.1677531003952026,
        y: 45.99688095342918,
        x: 34.136965397277166,
        yScale: 0.5834642608286971,
      },
      5: {
        zRotation: -1.297169804573059,
        y: 45.14741353519627,
        x: 34.90920851660557,
        yScale: 0.6060670493012768,
      },
      6: {
        zRotation: -1.3673712015151978,
        y: 45.14741353519627,
        x: 34.90920851660557,
        yScale: 0.6189181137893159,
      },
      7: {
        zRotation: -1.4036921262741089,
        y: 45.14741353519627,
        x: 34.90920851660557,
        yScale: 0.6253154095956835,
      },
      8: {
        zRotation: -1.4262566566467285,
        y: 45.14741353519627,
        x: 34.90920851660557,
        yScale: 0.6564918716075057,
      },
      9: {
        zRotation: -1.4425307512283325,
        y: 44.838515818444755,
        x: 34.90920851660557,
        yScale: 0.6813455436189296,
      },
      10: {
        zRotation: -1.4538458585739136,
        y: 44.606842791447875,
        x: 34.90920851660557,
        yScale: 0.7221405789003534,
      },
      11: {
        zRotation: -1.4475769996643066,
        y: 44.452394454205624,
        x: 34.90920851660557,
        yScale: 0.7455626281641298,
      },
      12: {
        zRotation: -1.4575906991958618,
        y: 44.452394454205624,
        x: 34.90920851660557,
        yScale: 0.7585568448244515,
      },
      13: {
        zRotation: -1.408705711364746,
        y: 44.606842791447875,
        x: 34.90920851660557,
        yScale: 0.7185837980044091,
      },
      14: {
        zRotation: -1.3686140775680542,
        y: 44.91574050819939,
        x: 34.75475991879656,
        yScale: 0.7046656588376579,
      },
      15: {
        zRotation: -1.3354805707931519,
        y: 44.91574050819939,
        x: 34.75475991879656,
        yScale: 0.7205260507131027,
      },
      16: {
        zRotation: -1.0457594394683838,
        y: 44.76129217095714,
        x: 33.98251679946816,
        yScale: 0.7170834783780373,
      },
      17: {
        zRotation: -0.9833877682685852,
        y: 44.684067481202504,
        x: 33.59639530494565,
        yScale: 0.703303490654897,
      },
      18: {
        zRotation: -0.9240888953208923,
        y: 44.684067481202504,
        x: 33.13304938123526,
        yScale: 0.717384481834153,
      },
      19: {
        zRotation: -0.9084463715553284,
        y: 44.99296519795402,
        x: 32.592479158620364,
        yScale: 0.7256147720045963,
      },
      20: {
        zRotation: -0.8463501334190369,
        y: 44.91574050819939,
        x: 32.28358189786067,
        yScale: 0.7125906519970652,
      },
      21: {
        zRotation: -0.8134615421295166,
        y: 45.14741353519627,
        x: 32.12913326748082,
        yScale: 0.7299191870931852,
      },
      22: {
        zRotation: -0.7644520998001099,
        y: 45.14741353519627,
        x: 32.12913326748082,
        yScale: 0.7216336868577085,
      },
      23: {
        zRotation: -0.8022697567939758,
        y: 45.2246382249509,
        x: 32.12913326748082,
        yScale: 0.7267595852835704,
      },
      24: {
        zRotation: -0.8334147334098816,
        y: 45.61075958919004,
        x: 32.36080619676517,
        yScale: 0.7255268298973472,
      },
      25: {
        zRotation: -0.8566392660140991,
        y: 45.68798427894467,
        x: 32.43803049566967,
        yScale: 0.7180497807971502,
      },
      26: {
        zRotation: -0.8170664310455322,
        y: 45.30186291470554,
        x: 32.283581865289825,
        yScale: 0.7075482505862997,
      },
      27: {
        zRotation: -0.7055155634880066,
        y: 44.9157415504664,
        x: 31.974684604530125,
        yScale: 0.699920472452196,
      },
      28: {
        zRotation: -0.6580761671066284,
        y: 44.37517184898501,
        x: 31.82023597415028,
        yScale: 0.7188606060157389,
      },
      29: {
        zRotation: -0.6483301520347595,
        y: 43.680152767994365,
        x: 31.974684604530125,
        yScale: 0.7467268887212721,
      },
      30: {
        zRotation: -0.6530844569206238,
        y: 43.37125505124285,
        x: 31.897460289340202,
        yScale: 0.7076592263528857,
      },
      31: {
        zRotation: -0.6387086510658264,
        y: 43.2168067140006,
        x: 31.897460289340202,
        yScale: 0.6976127624511719,
      },
      32: {
        zRotation: -0.5934413075447083,
        y: 43.06235837675835,
        x: 31.974684604530125,
        yScale: 0.7111366522514214,
      },
      33: {
        zRotation: -0.563218355178833,
        y: 42.67623701251921,
        x: 32.05190891972005,
        yScale: 0.6877270795531193,
      },
      34: {
        zRotation: -0.539206862449646,
        y: 42.59901232276458,
        x: 32.12913323490997,
        yScale: 0.6841794919159453,
      },
      35: {
        zRotation: -0.5448576807975769,
        y: 42.83068534976146,
        x: 32.05190891972005,
        yScale: 0.6852857642254587,
      },
      36: {
        zRotation: -0.46741783618927,
        y: 42.75346066000683,
        x: 31.82023597415028,
        yScale: 0.7098028215311342,
      },
      37: {
        zRotation: -0.4262125790119171,
        y: 42.59901232276458,
        x: 31.66578734377043,
        yScale: 0.6767896777492459,
      },
      38: {
        zRotation: -0.4034004807472229,
        y: 42.05844157901618,
        x: 31.51133871339058,
        yScale: 0.6985903291378991,
      },
      39: {
        zRotation: -0.34073275327682495,
        y: 41.36342249802553,
        x: 31.511338778532267,
        yScale: 0.7019748627129248,
      },
      40: {
        zRotation: -0.3262194097042084,
        y: 40.35950622141687,
        x: 31.665787408912117,
        yScale: 0.698171732789379,
      },
      41: {
        zRotation: -0.32720232009887695,
        y: 39.66448714042622,
        x: 31.66578737634127,
        yScale: 0.699121164063276,
      },
      42: {
        zRotation: -0.2652936577796936,
        y: 38.89224441194795,
        x: 31.665787408912117,
        yScale: 0.7019147529440412,
      },
      43: {
        zRotation: -0.30138319730758667,
        y: 38.5061220054418,
        x: 31.356890115581574,
        yScale: 0.7306965225833958,
      },
      44: {
        zRotation: -0.27147912979125977,
        y: 38.35167366819955,
        x: 31.202441452630882,
        yScale: 0.7712819313598892,
      },
      45: {
        zRotation: -0.2804314196109772,
        y: 38.042776472581544,
        x: 31.279665751535383,
        yScale: 0.7629277342456883,
      },
      46: {
        zRotation: -0.2871687412261963,
        y: 37.811103445584656,
        x: 31.12521715372638,
        yScale: 0.7758503748198687,
      },
      47: {
        zRotation: -0.2864128053188324,
        y: 37.965552303960415,
        x: 31.356890115581574,
        yScale: 0.8123111926903159,
      },
      48: {
        zRotation: -0.2623315453529358,
        y: 38.197224809823794,
        x: 31.202441452630882,
        yScale: 0.843358090368368,
      },
      49: {
        zRotation: -0.24050681293010712,
        y: 38.35167366819955,
        x: 31.279665751535383,
        yScale: 0.8355053299564427,
      },
      50: {
        zRotation: -0.2214891016483307,
        y: 38.042776472581544,
        x: 31.43411441448608,
        yScale: 0.8233881602853032,
      },
      51: {
        zRotation: -0.24778850376605988,
        y: 38.120000641202665,
        x: 31.66578737634127,
        yScale: 0.8184957302222818,
      },
      52: {
        zRotation: -0.3110043704509735,
        y: 38.120000641202665,
        x: 31.66578737634127,
        yScale: 0.8095837245553227,
      },
      53: {
        zRotation: -0.28169986605644226,
        y: 37.888327614205785,
        x: 31.511338745961424,
        yScale: 0.8007438000986132,
      },
      54: {
        zRotation: -0.29471147060394287,
        y: 37.888327614205785,
        x: 31.356890115581574,
        yScale: 0.8119653342133862,
      },
      55: {
        zRotation: -0.3209635019302368,
        y: 37.888327614205785,
        x: 31.12521721886807,
        yScale: 0.8167543148590347,
      },
      56: {
        zRotation: -0.3735417127609253,
        y: 37.6566545872089,
        x: 30.970768555917374,
        yScale: 0.8492016186148433,
      },
      57: {
        zRotation: -0.38857007026672363,
        y: 37.6566545872089,
        x: 31.20244151777257,
        yScale: 0.8382904327521891,
      },
      58: {
        zRotation: -0.41935646533966064,
        y: 37.6566545872089,
        x: 30.893544191871186,
        yScale: 0.8401449959156877,
      },
      59: {
        zRotation: -0.39581099152565,
        y: 37.42498156021202,
        x: 30.893544191871186,
        yScale: 0.8350500615976625,
      },
      60: {
        zRotation: -0.37591543793678284,
        y: 37.6566545872089,
        x: 30.816319892966682,
        yScale: 0.832487819558483,
      },
      61: {
        zRotation: -0.333662211894989,
        y: 38.042775951448036,
        x: 30.970768490775686,
        yScale: 0.8347948728981665,
      },
      62: {
        zRotation: -0.31231752038002014,
        y: 38.12000012006916,
        x: 30.970768490775686,
        yScale: 0.8483781652935481,
      },
      63: {
        zRotation: -0.27741557359695435,
        y: 38.274448978444916,
        x: 30.816319892966682,
        yScale: 0.8584344791153731,
      },
      64: {
        zRotation: -0.23479770123958588,
        y: 38.197224288690286,
        x: 30.5846468659698,
        yScale: 0.8384727320428622,
      },
      65: {
        zRotation: -0.18311837315559387,
        y: 38.12000012006916,
        x: 30.352973969256293,
        yScale: 0.8278159266811307,
      },
      66: {
        zRotation: -0.1913759708404541,
        y: 38.042775951448036,
        x: 29.8896280455459,
        yScale: 0.8370146913043524,
      },
      67: {
        zRotation: -0.1764533817768097,
        y: 37.50220520769963,
        x: 29.657955148832393,
        yScale: 0.8139096074185129,
      },
      68: {
        zRotation: -0.180090993642807,
        y: 37.50220572883314,
        x: 29.50350655102339,
        yScale: 0.8182115979113822,
      },
      69: {
        zRotation: -0.20328423380851746,
        y: 37.03885967483937,
        x: 29.349057953214384,
        yScale: 0.8488246950052553,
      },
      70: {
        zRotation: -0.20517534017562866,
        y: 36.498289973357984,
        x: 29.19460935540538,
        yScale: 0.8610264729645293,
      },
      71: {
        zRotation: -0.17469623684883118,
        y: 36.112168348552096,
        x: 29.27183378459326,
        yScale: 0.8702388254262634,
      },
      72: {
        zRotation: -0.14845438301563263,
        y: 35.880495321555216,
        x: 29.426282382402263,
        yScale: 0.8379644256527141,
      },
      73: {
        zRotation: -0.17022107541561127,
        y: 35.72604672374621,
        x: 29.349057953214384,
        yScale: 0.830374986438428,
      },
      74: {
        zRotation: -0.13986127078533173,
        y: 35.957719750743095,
        x: 29.426282382402263,
        yScale: 0.8550153950513419,
      },
      75: {
        zRotation: -0.12436648458242416,
        y: 35.957719750743095,
        x: 29.81240400720815,
        yScale: 0.8497166431556314,
      },
      76: {
        zRotation: -0.14884012937545776,
        y: 35.648822555125086,
        x: 29.88962843639603,
        yScale: 0.8606875346878828,
      },
      77: {
        zRotation: -0.16193382441997528,
        y: 35.26270119088595,
        x: 30.198525762297418,
        yScale: 0.8603735495421847,
      },
      78: {
        zRotation: -0.19257107377052307,
        y: 34.72213096827106,
        x: 30.507422957915427,
        yScale: 0.8877487505896617,
      },
      79: {
        zRotation: -0.19257108867168427,
        y: 34.64490653908318,
        x: 30.66187155572443,
        yScale: 0.8650630207385047,
      },
      80: {
        zRotation: -0.19257110357284546,
        y: 34.25878491427729,
        x: 30.739095854628932,
        yScale: 0.8713266607058251,
      },
      81: {
        zRotation: -0.16738587617874146,
        y: 33.718214691662396,
        x: 30.739095854628932,
        yScale: 0.8810694945060601,
      },
      82: {
        zRotation: -0.2009669691324234,
        y: 33.254868767952004,
        x: 30.739095854628932,
        yScale: 0.8703451035386426,
      },
      83: {
        zRotation: -0.22235296666622162,
        y: 33.17764446904751,
        x: 30.584647126536552,
        yScale: 0.9096649743742863,
      },
      84: {
        zRotation: -0.20929312705993652,
        y: 33.10042003985963,
        x: 30.198525501730664,
        yScale: 0.9172102152290992,
      },
      85: {
        zRotation: -0.17783509194850922,
        y: 32.55984975210305,
        x: 30.12130120282616,
        yScale: 0.9113161240593862,
      },
      86: {
        zRotation: -0.2015528380870819,
        y: 32.0965038609635,
        x: 29.966852605017156,
        yScale: 0.9104927717629127,
      },
      87: {
        zRotation: -0.23369820415973663,
        y: 31.78760658391838,
        x: 29.580730980211268,
        yScale: 0.905154115062649,
      },
      88: {
        zRotation: -0.1869075447320938,
        y: 31.24703641015975,
        x: 29.19460935540538,
        yScale: 0.914655196464668,
      },
      89: {
        zRotation: -0.11003149300813675,
        y: 30.629241953782046,
        x: 28.962936328408496,
        yScale: 0.933545120691849,
      },
      90: {
        zRotation: -0.14163252711296082,
        y: 29.702550106361265,
        x: 28.962936328408496,
        yScale: 0.9248947693129718,
      },
      91: {
        zRotation: -0.19338572025299072,
        y: 28.775858258940485,
        x: 28.962936328408496,
        yScale: 0.9408035520779885,
      },
      92: {
        zRotation: -0.20269326865673065,
        y: 28.158063867704463,
        x: 28.885711899220617,
        yScale: 0.9361429739806613,
      },
      93: {
        zRotation: -0.1900949776172638,
        y: 27.463044526147062,
        x: 28.885711899220617,
        yScale: 0.9442056639719818,
      },
      94: {
        zRotation: -0.1591380536556244,
        y: 26.690801276535286,
        x: 28.885711899220617,
        yScale: 0.9379688966072213,
      },
      95: {
        zRotation: -0.2019750326871872,
        y: 25.532436662684372,
        x: 28.885711899220617,
        yScale: 0.965050822597439,
      },
      96: {
        zRotation: -0.2604011595249176,
        y: 24.68296924445147,
        x: 29.1173849262175,
        yScale: 0.9819999589758405,
      },
      97: {
        zRotation: -0.2572175860404968,
        y: 23.061258576606793,
        x: 29.580730719644514,
        yScale: 0.9819999589758405,
      },
      98: {
        zRotation: -0.24461883306503296,
        y: 21.51677207738324,
        x: 29.966852344450402,
        yScale: 0.9904745271650411,
      },
      99: {
        zRotation: -0.26607218384742737,
        y: 20.049510267914318,
        x: 30.352973969256293,
        yScale: 0.9989491963790635,
      },
      100: {
        zRotation: -0.2876419126987457,
        y: 18.8911451329299,
        x: 30.430198268160794,
        yScale: 0.9989491963790635,
      },
      101: {
        zRotation: -0.29619210958480835,
        y: 18.11890240445163,
        x: 30.507422567065298,
        yScale: 0.9989491963790635,
      },
      102: {
        zRotation: -0.31342700123786926,
        y: 17.887229377454748,
        x: 30.352973969256293,
        yScale: 0.9989491963790635,
      },
      103: {
        zRotation: -0.2882557213306427,
        y: 16.188294540988945,
        x: 30.352973969256293,
        yScale: 0.9989491963790635,
      },
      104: {
        zRotation: -0.25238898396492004,
        y: 13.408220301560366,
        x: 30.198525371447285,
        yScale: 0.9989491963790635,
      },
      105: {
        zRotation: -0.18359282612800598,
        y: 9.006432788619579,
        x: 29.889628175829277,
        yScale: 0.9989491963790635,
      },
      106: {
        zRotation: -0.18359282612800598,
        y: 7.384721599641394,
        x: 30.04407677363828,
        yScale: 0.9989491963790635,
      },
      107: {
        zRotation: -0.8401141166687012,
        y: 6.766926166138363,
        x: 30.43019839844417,
        yScale: 0.9989491963790635,
      },
      108: {
        zRotation: -1.1243841648101807,
        y: 6.4580294916538605,
        x: 31.27966594696045,
        yScale: 0.9989491963790635,
      },
      109: {
        zRotation: -1.3460869789123535,
        y: 5.84023405815083,
        x: 31.27966594696045,
        yScale: 0.9989491963790635,
      },
      110: {
        zRotation: -1.544252872467041,
        y: 4.913541950163295,
        x: 30.739095724345557,
        yScale: 0.9989491963790635,
      },
      111: {
        zRotation: -1.544252872467041,
        y: 5.145214977160179,
        x: 30.739095724345557,
        yScale: 0.9989491963790635,
      },
      112: {
        zRotation: -1.544252872467041,
        y: 4.527419543657148,
        x: 30.661871425441053,
        yScale: 0.9989491963790635,
      },
      113: {
        zRotation: -1.544252872467041,
        y: 4.141297137151,
        x: 30.198525501730664,
        yScale: 0.9989491963790635,
      },
      114: {
        zRotation: -1.544252872467041,
        y: 4.450193811635503,
        x: 29.889628175829277,
        yScale: 0.9989491963790635,
      },
      115: {
        zRotation: -1.544252872467041,
        y: 4.681866838632387,
        x: 30.198525501730664,
        yScale: 0.9989491963790635,
      },
    },
    guy6Idle: {
      0: {
        zRotation: -1.544252872467041,
        y: 4.681866838632387,
        x: 30.278954120281615,
      },
      1: {
        zRotation: -1.544252872467041,
        y: 4.681866838632387,
        x: 30.278954120281615,
      },
      2: {
        zRotation: -1.544252872467041,
        y: 4.762296499450351,
        x: 30.35938273883257,
      },
      3: {
        zRotation: -1.544252872467041,
        y: 4.681866838632387,
        x: 30.43981135738352,
      },
    },
  };
}

const generateDiggingDirtParticles = (
  sixthGuy: IGuy6,
  timeIncrement: number
) => {
  sixthGuy.timeUntilNextDirtParticle -= timeIncrement;
  if (sixthGuy.timeUntilNextDirtParticle <= 0) {
    sixthGuy.timeUntilNextDirtParticle = Math.random() * 0.1;
    sixthGuy.generatedDirtParticleCount++;
    generateDirtParticle(sixthGuy, {
      relativeX: 32 + Math.random() * 10 - 5,
      relativeY: 64 - 10,
    });
  }
};

const generateDirtParticle = (
  sixthGuy: IGuy6,
  {
    relativeX,
    relativeY,
  }: {
    relativeX: number;
    relativeY: number;
  }
) => {
  const size = Math.random() * 3;
  sixthGuy.dirtParticles.push({
    relativeX,
    relativeY: relativeY - size,
    size,
    velocity: {
      x: (Math.random() - 0.5) * 25,
      y: Math.random() * -100,
    },
    stuck: false,
  });
};

const generateConfettiParticle = (sixthGuy: IGuy6, timeIncrement: number) => {
  sixthGuy.timeUntilConfettiBurst.left -= timeIncrement;
  sixthGuy.timeUntilConfettiBurst.right -= timeIncrement;

  if (sixthGuy.timeUntilConfettiBurst.left <= 0) {
    generateConfettiBurst(sixthGuy, { relativeX: 0, relativeY: 32 }, false);
    sixthGuy.timeUntilConfettiBurst.left = Math.random() * 5 + 5;
  }
  if (sixthGuy.timeUntilConfettiBurst.right <= 0) {
    generateConfettiBurst(sixthGuy, { relativeX: 64, relativeY: 32 }, true);
    sixthGuy.timeUntilConfettiBurst.right = Math.random() * 5 + 5;
  }
};
const confettiColors = [
  "#0a84ff",
  "#30d158",
  "#5e5ce6",
  "#64d2ff",
  "#bf5aff",
  "#6c59ff",
];

const generateConfettiBurst = (
  sixthGuy: IGuy6,
  {
    relativeX,
    relativeY,
  }: {
    relativeX: number;
    relativeY: number;
  },
  left: boolean
) => {
  for (let i = 0; i < 50; i++) {
    const velocity = Math.random() * -100;
    sixthGuy.confettiParticles.set(Math.random(), {
      relativeX,
      relativeY,
      color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
      stuck: false,
      stuckTime: 0,
      velocity: {
        x: (left ? 1 : -1) * velocity + (Math.random() - 0.5) * 20,
        y: velocity + -(Math.random() - 0.5) * 20,
        decreasing: true,
      },
    });
  }
};

const updateDirtParticle = (
  sixthGuy: IGuy6,
  timeIncrement: number,
  { sixthGuyWall: { right, left } }: Walls
) => {
  for (const dirtParticle of sixthGuy.dirtParticles) {
    if (dirtParticle.stuck) {
      dirtParticle.relativeY = 59 - dirtParticle.size;
      continue;
    }
    dirtParticle.relativeX += dirtParticle.velocity.x * timeIncrement;
    dirtParticle.relativeY += dirtParticle.velocity.y * timeIncrement;
    dirtParticle.velocity.y += 50 * timeIncrement;

    if (
      dirtParticle.velocity.y >= 0 &&
      dirtParticle.relativeY >= 59 - dirtParticle.size + 1
    ) {
      const absoluteX = sixthGuy.position.x + dirtParticle.relativeX;
      if (absoluteX <= right && absoluteX >= left) {
        dirtParticle.stuck = true;
        dirtParticle.relativeY = 59 - dirtParticle.size - 1;
      }
    }
  }
};

const updateConfettiParticles = (
  sixthGuy: IGuy6,
  timeIncrement: number,
  { sixthGuyWall: { right, left } }: Walls
) => {
  const haveTooMany = sixthGuy.confettiParticles.size > 5000;

  for (const [key, confettiParticle] of sixthGuy.confettiParticles) {
    if (confettiParticle.stuck) {
      confettiParticle.relativeY = 58;
      confettiParticle.stuckTime += timeIncrement;
      if (
        confettiParticle.stuckTime > 10 ||
        (haveTooMany && confettiParticle.stuckTime > 1)
      ) {
        sixthGuy.confettiParticles.delete(key);
      }
      continue;
    }
    confettiParticle.relativeX += confettiParticle.velocity.x * timeIncrement;

    if (confettiParticle.velocity.decreasing) {
      const goingRight = confettiParticle.velocity.x >= 0;
      confettiParticle.velocity.x += (goingRight ? -1 : 1) * 25 * timeIncrement;
      if (
        (goingRight && confettiParticle.velocity.x <= 0) ||
        (!goingRight && confettiParticle.velocity.x >= 0)
      ) {
        confettiParticle.velocity.decreasing = false;
        confettiParticle.velocity.x = (goingRight ? 1 : -1) * 5;
      }
    } else {
      if (Math.random() < 0.1) {
        confettiParticle.velocity.x *= -1;
      }
    }
    confettiParticle.relativeY += confettiParticle.velocity.y * timeIncrement;

    if (confettiParticle.velocity.y < 0) {
      confettiParticle.velocity.y += 50 * timeIncrement;

      /**
       * no acceleration on these going down, because
       * of their air resistance
       */
      if (confettiParticle.velocity.y > 0) {
        confettiParticle.velocity.y = 15;
      }
    }
    if (confettiParticle.velocity.y >= 0 && confettiParticle.relativeY >= 58) {
      const absoluteX = sixthGuy.position.x + confettiParticle.relativeX;
      if (absoluteX <= right && absoluteX >= left) {
        confettiParticle.stuck = true;
        confettiParticle.relativeY = 58;
      }
    }
    if (confettiParticle.relativeY > 1000) {
      sixthGuy.confettiParticles.delete(key);
    }
  }
};

const drawDirtParticles = (
  { position: { x, y }, dirtParticles }: IGuy6,
  context: CanvasRenderingContext2D
) => {
  context.fillStyle = "#714e1b";
  context.translate(x, y);
  for (const { relativeX, relativeY, size } of dirtParticles) {
    context.fillRect(relativeX, relativeY, size, size);
  }
  context.translate(-x, -y);
};

const drawConfettiParticles = (
  { confettiParticles, position: { x, y } }: IGuy6,
  context: CanvasRenderingContext2D
) => {
  context.translate(x, y);

  for (const [, { relativeX, relativeY, color }] of confettiParticles) {
    context.fillStyle = color;
    context.fillRect(relativeX, relativeY, 2, 2);
  }
  context.translate(-x, -y);
};
