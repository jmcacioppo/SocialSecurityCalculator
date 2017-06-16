export var wagePerc = [
        0.0699, //1956
        0.031,
        0.0088,
        0.0495,
        0.0392, //1960
        0.0199,
        0.0501,
        0.0245,
        0.0409,
        0.018,
        0.06,
        0.0557,
        0.0687,
        0.0578,
        0.0496, //1970
        0.0502,
        0.098,
        0.0626,
        0.0594,
        0.0747,
        0.069,
        0.0599,
        0.0794,
        0.0875,
        0.0901, //1980
        0.1007,
        0.0551,
        0.0487,
        0.0588,
        0.0426,
        0.0297,
        0.0638,
        0.0493,
        0.0396,
        0.0462, //1990
        0.0373,
        0.0515,
        0.0086,
        0.0268,
        0.0401,
        0.0489,
        0.0584,
        0.0523,
        0.0557,
        0.0553, //2000
        0.0239,
        0.01,
        0.0244,
        0.0465,
        0.0366,
        0.046,
        0.0454,
        0.023,
        -0.0151,
        0.0236, //2010
        0.0313,
        0.0128,
        0.0355,
        0.0348,
        0.0348,
        0.045955,
        0.045955 //2017 - stays .045955 for the future
    ];

export var inflationIndex = [
        13.6165708, //1956
        13.2076684,
        13.0923376,
        12.4743581,
        12.0032916, //1960
        11.7693797,
        11.2081442,
        10.9398609,
        10.5103293,
        10.3244303,
        9.7397982,
        9.2258912,
        8.6325739,
        8.1609414,
        7.7750993,//1970
        7.4031149,
        6.7423575,
        6.3453318,
        5.9892999,
        5.5728277,
        5.2131073,
        4.918342,
        4.5565075,
        4.1899732,
        3.8437514, //1980
        3.4922153,
        3.3099927,
        3.1562355,
        2.9809992,
        2.8591827,
        2.7767654,
        2.6102952,
        2.4877692,
        2.3930202,
        2.2873633, //1990
        2.2051858,
        2.0971332,
        2.0792511,
        2.0249045,
        1.9468668,
        1.8560938,
        1.7537603,
        1.666536,
        1.5785652,
        1.4958451, //2000
        1.460991,
        1.4464844,
        1.4119683,
        1.3492451,
        1.3016185,
        1.2444211,
        1.1903987,
        1.1636305,
        1.1814475,
        1.1541687, //2010
        1.1191035,
        1.085217,
        1.0715215,
        1.0347904,
        1,
        1,
        1 //2017 - stays 1 for the future
    ];

 export var allowedSalary = [
        4200, //1956
        4200,
        4200,
        4800,
        4800, //1960
        4800,
        4800,
        4800,
        4800,
        4800,
        6600,
        6600,
        7800,
        7800,
        7800, //1970
        7800,
        9000,
        10800,
        13200,
        14100,
        15300,
        16500,
        17700,
        22900,
        25900, //1980
        29700,
        32400,
        35700,
        37800,
        39600,
        42000,
        43800,
        45000,
        48000,
        51300, //1990
        53400,
        55500,
        57600,
        60600,
        61200,
        62700,
        65400,
        68400,
        72600,
        76200, //2000
        80400,
        84900,
        87000,
        87900,
        90000,
        94200,
        97500,
        102000,
        106800,
        106800, //2010
        110100,
        113700,
        117000,
        118500,
        118500,
        118500,
        127200 //2017 - increases by 2.1% every year for the future
    ];

    export var consttier1 = 885;
    export var tier1perc = 0.90;
    export var consttier2 = 5336;
    export var tier2perc = 0.32;
    export var tier3perc = 0.15;

    export var subEarningsPerc = [
        .9000, //30+ years of substantial earnings
        .8500, //29
        .8000, //28
        .7500, //27
        .7000, //26
        .6500, //25
        .6000, //24
        .5500, //23
        .5000, //22
        .4500, //21
        .4000 //20 or less years of substantial earnings
    ];

    export var EL1943plus = [
        0.75, //Age 62
        0.8,
        0.867,
        0.933,
        1,
        1.08,
        1.16,
        1.24,
        1.32 //Age 70
    ];

    export var EL1955 = [
        0.742, //Age 62
        0.796,
        0.856,
        0.922,
        0.989,
        1.069,
        1.149,
        1.229,
        1.309 //Age 70
    ];

    export var EL1956 = [
        0.733, //Age 62
        0.783,
        0.844,
        0.911,
        0.978,
        1.058,
        1.138,
        1.218,
        1.298 //Age 70
    ];

    export var EL1957 = [
        0.725, //Age 62
        0.775,
        0.833,
        0.9,
        0.967,
        1.047,
        1.127,
        1.207,
        1.287 //Age 70
    ];

    export var EL1958 = [
        0.717, //Age 62
        0.767,
        0.822,
        0.889,
        0.956,
        1.036,
        1.116,
        1.196,
        1.276 //Age 70
    ];

    export var EL1959 = [
        0.708, //Age 62
        0.758,
        0.811,
        0.878,
        0.944,
        1.024,
        1.104,
        1.184,
        1.264 //Age 70
    ];

    export var EL1960plus = [
        0.7, //Age 62
        0.75,
        0.8,
        0.867,
        0.933,
        1,
        1.08,
        1.16,
        1.24 //Age 70
    ];
    