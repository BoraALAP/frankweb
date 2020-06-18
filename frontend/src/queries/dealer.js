const data = [
  {
    dealer: "Balm Beach House of Glass",
    address: "760 Balm Beach Dr",
    city: "midland",
    province: "ON",
    postal: "N4K 0A8",
    lat: 44.734582,
    lng: -79.9108493,
    phone: "705-527-6509",
    email: "houseofglass@rogers.com",
    person: "Aaron Kontkanen",
  },
  {
    dealer: "Bavarian Window Works Ltd",
    address: "2236 Shirley Drive",
    city: "kitchener",
    province: "ON",
    postal: "N2B 3Y1",
    lat: 43.4772582,
    lng: -80.4364542,
    phone: "519-578-3938",
    email: "morgan@bavarianwindws.com",
    person: "Morgan Reay",
  },
  {
    dealer: "Bowen Windows",
    address: "1050 Baxter Rd,",
    city: "ottawa",
    province: "ON",
    postal: "K2C 3P1",
    lat: 45.3542614,
    lng: -75.7819521,
    phone: "613-822-6291",
    email: "jdawson@bowenwindows.com",
    person: "John Dawson",
  },
  {
    dealer: "CAMERON WINDOWS & DOORS INC.",
    address: "1195 Gainsborough Rd",
    city: "london",
    province: "ON",
    postal: "N6H 5L5",
    lat: 42.9982632,
    lng: -81.3418907,
    phone: "519-473-0002",
    email: "steve@cameronwindows.ca",
    person: "Steve Watson",
  },
  {
    dealer: "Castle Building Centre - Austin",
    address: "4961 County Rd 45",
    city: "kinmount",
    province: "ON",
    postal: "K0M 2A0",
    lat: 44.7830481,
    lng: -78.6556106,
    phone: "1-877-488-2961",
    email: "julie@austinandsons.com",
    person: "Julie Austin",
  },
  {
    dealer: "CASTLE BUILDING CENTRE - JERMYN",
    address: "57 North St",
    city: "bobcaygeon",
    province: "ON",
    postal: "K0M 1A0",
    lat: 44.543318,
    lng: -78.554321,
    phone: "705-738-2412",
    email: "info@jermynlumber.com",
    person: "Craig Jermyn",
  },
  {
    dealer: "Castle Building Centre Emmerson Lumber",
    address: "63 Maple Ave",
    city: "haliburton",
    province: "ON",
    postal: "K0M 1S0",
    lat: 45.0483319,
    lng: -78.5109461,
    phone: "1-888-339-3325",
    email: "cleve@emmersonlumber.com",
    person: "Cleve Roberts",
  },
  {
    dealer: "Castle Building Centre - Handley Lumber",
    address: "12 Helen Street",
    city: "fenlon falls",
    province: "ON",
    postal: "K0M 1N0",
    lat: 44.5344073,
    lng: -78.7408085,
    phone: "705-887-3242",
    email: "chris@handleylumber.ca",
    person: "Chris Handley",
  },
  {
    dealer: "Castle-Cottage Country Building Supplies",
    address: "15492 HWY # 35",
    city: "carnavon",
    province: "ON",
    postal: "K0M 1J0",
    lat: 45.0469982,
    lng: -78.7008576,
    phone: "705-489-2212",
    email: "ryan@cottagecbs.com",
    person: "Ryan Emmerson",
  },
  {
    dealer: "Cheney Window & Door Specialists",
    address: "2390 WYECROFT RD",
    city: "oakville",
    province: "ON",
    postal: "L6L 6L8",
    lat: 43.4111899,
    lng: -79.7351805,
    phone: "905-847-2071",
    email: "tom@cheney.ca",
    person: "Tom Cheney",
  },
  {
    dealer: "City Windows and Doors",
    address: "1889 Hwy 2 East",
    city: "brockville",
    province: "ON",
    postal: "K6V 5T7",
    lat: 44.6102712,
    lng: -75.6545008,
    phone: "613-498-0118",
    email: "citywindows1@cogeco.net",
    person: "Kelvin Young",
  },
  {
    dealer: "CLEAR CHOICE WINDOW & DOOR",
    address: "1856 De Vries Ave",
    city: "winnipeg",
    province: "MB",
    postal: "R2G 3S8",
    lat: 49.9353997,
    lng: -97.0436844,
    phone: "204-663-0271",
    email: "mikej@clearchoicewindow.ca",
    person: "Mike Wolanik",
  },
  {
    dealer: "CONCORD WINDOW STORE",
    address: "8461 KEELE ST.",
    city: "concord",
    province: "ON",
    postal: "L4K 1Z6",
    lat: 43.8175218,
    lng: -79.5049644,
    phone: "905-669-8248",
    email: "greg@concordwindowstore.com",
    person: "Greg Barberi",
  },
  {
    dealer: "Connor Windows Doors & Sunrooms",
    address: "1720 CHEMONG RD",
    city: "selwyn",
    province: "ON",
    postal: "K9J 6X2",
    lat: 44.3447209,
    lng: -78.3587939,
    phone: "705-743-6006",
    email: "lindsey@connorwindows.ca",
    person: "Lindsey Richie",
  },
  {
    dealer: "Crowland Sash & Frame Ltd",
    address: "65 Shaw Street",
    city: "welland",
    province: "ON",
    postal: "L3B 5W9",
    lat: 42.9648856,
    lng: -79.2615366,
    phone: "905-735-5001",
    email: "bill@crowlandsash.ca",
    person: "Bill Rizzo",
  },
  {
    dealer: "DECOLA WINDOW & DOORS",
    address: "41 COMMERCE PARK DR",
    city: "barrie",
    province: "ON",
    postal: "L4N 8X1",
    lat: 44.327341,
    lng: -79.6877474,
    phone: "705-725-8111",
    email: "michael@decola.ca",
    person: "Michael DeCola",
  },
  {
    dealer: "DUNDAS WOODWINDOWS & SPECIALTIES",
    address: "2113 DUNDAS ST WEST",
    city: "toronto",
    province: "ON",
    postal: "M6R 1X1",
    lat: 43.6524952,
    lng: -79.4513445,
    phone: "416-534-4593",
    email: "nelson@dundaswoodwindows.ca",
    person: "Nelson Pereira",
  },
  {
    dealer: "Grace Windows & Doors",
    address: "117 Corestate Ave.",
    city: "concord",
    province: "ON",
    postal: "L4K 4K2",
    lat: 43.8175127,
    lng: -79.5364565,
    phone: "905-660-0271",
    email: "dillion@gracewindows.com",
    person: "Dillon Grace",
  },
  {
    dealer: "Hodder Carpentry Inc.",
    address: "3967 Hwy #2",
    city: "newcastle",
    province: "ON",
    postal: "L1B 0P5",
    lat: 43.9273742,
    lng: -78.5474674,
    phone: "905-987-3407",
    email: "hoddercarpentry@outlook.com",
    person: "Terry and Janet Hodder",
  },
  {
    dealer: "Home Building Center Gilmers - Port Hope",
    address: "177 Toronto Rd",
    city: "port hope",
    province: "ON",
    postal: "L1A 3V5",
    lat: 43.9610146,
    lng: -78.3246273,
    phone: "905-885-4568",
    email: "chrism@gilmers-hhbc.com",
    person: "Chris Mosher",
  },
  {
    dealer: "Home Building Centre McDonald - Brussels",
    address: "226 Turnberry St N",
    city: "brussels",
    province: "ON",
    postal: "N0G 1H0",
    lat: 43.748978,
    lng: -81.2488285,
    phone: "519-887-6277",
    email: "tim@mcdonaldhomehardware.com",
    person: "Tim Deelstra",
  },
  {
    dealer: "Home Building Centre Sharbot Lake",
    address: "14593 RD #38",
    city: "sharbot lake",
    province: "ON",
    postal: "K0H 2P0",
    lat: 44.7872329,
    lng: -76.6810928,
    phone: "613-279-2947",
    email: "keith.duggan@homehardware.ca",
    person: "Keith Duggan",
  },
  {
    dealer: "Home Hardware - Wilson HBC Lions Head",
    address: "3458 Hwy#6",
    city: "lions head",
    province: "ON",
    postal: "N0H 1W0",
    lat: 45.021563,
    lng: -81.3139843,
    phone: "519-793-3610",
    email: "liverancelumber@amtelecom.net, dlivlum@eastlink.ca",
    person: "Sandra Wilson - Dave Shearer",
  },
  {
    dealer: "Home Hardware Alcona",
    address: "840 Innisfil Beach Rd",
    city: "innisfil",
    province: "ON",
    postal: "L9S 2C3",
    lat: 44.3167081,
    lng: -79.5445364,
    phone: "705-431-0129",
    email: "alconalumberhhbc@homehardware.ca",
    person: "Will",
  },
  {
    dealer: "Home Hardware Apsley",
    address: "18 Tucker Street",
    city: "apsley",
    province: "ON",
    postal: "K0L 1A0",
    lat: 44.7529289,
    lng: -78.0888833,
    phone: "705-656-4295",
    email: "josh@apsleyhhbc.ca",
    person: "Josh Harvey",
  },
  {
    dealer: "HOME HARDWARE AURORA",
    address: "289 Wellington St. East",
    city: "aurora",
    province: "ON",
    postal: "L4G 6H6",
    lat: 44.0021765,
    lng: -79.4545632,
    phone: "905-727-4751",
    email: "john.barfitt@homehardware.ca",
    person: "John Barfitt",
  },
  {
    dealer: "Home Hardware Barrie United Lumber",
    address: "520 Bayfield North",
    city: "barrie",
    province: "On",
    postal: "L4M 5A2",
    lat: 44.4133266,
    lng: -79.7148797,
    phone: "",
    email: "kpepin@unitedlumber.ca",
    person: "Kevin Pepin",
  },
  {
    dealer: "HOME HARDWARE BRANTFORD",
    address: "116 KING GEORGE RD",
    city: "brantford",
    province: "ON",
    postal: "N3R 5K6",
    lat: 43.1687371,
    lng: -80.2776211,
    phone: "519-753-3114",
    email: "john.oliver@live.ca",
    person: "John Oliver",
  },
  {
    dealer: "Home Hardware Chemong",
    address: "1699 Chemong Rd North RR#1",
    city: "selwyn",
    province: "ON",
    postal: "K9J 6X2",
    lat: 44.3434729,
    lng: -78.3596118,
    phone: "705-748-9111",
    email: "sandrews@chemonghhbc.com",
    person: "Sarah Andrews",
  },
  {
    dealer: "HOME HARDWARE COBOURG",
    address: "650 Division Stret",
    city: "cobourg",
    province: "ON",
    postal: "K9A 4K2",
    lat: 43.9691756,
    lng: -78.1705723,
    phone: "905-372-3381",
    email: "eric@yourhomehardware.ca",
    person: "Eric Hobe",
  },
  {
    dealer: "Home Hardware Deka Carp",
    address: "545 Donald B. Munro",
    city: "carp",
    province: "ON",
    postal: "K0L 1L0",
    lat: 45.3420582,
    lng: -76.0451812,
    phone: "613-839-3467",
    email: "murray@deka.on.ca",
    person: "Murray Schroeder",
  },
  {
    dealer: "Home Hardware Elmvale",
    address: "121 Highway 27",
    city: "elmvale",
    province: "ON",
    postal: "L0L 1P0",
    lat: 44.573681,
    lng: -79.8587773,
    phone: "1-705-322-2800",
    email: "jamiejacobs@elmvalehomehardware.com",
    person: "Jamie Jacobs",
  },
  {
    dealer: "Home hardware H.F.Smith Lumber Inc",
    address: "61 Queen Street",
    city: "cookstown",
    province: "ON",
    postal: "L0M 1B2",
    lat: 44.1877511,
    lng: -79.7110678,
    phone: "705-458-4462",
    email: "chris@hfsmithlumber.com",
    person: "Chris Currie",
  },
  {
    dealer: "Home Hardware Hill's Home Building",
    address: "488 Mara Rd",
    city: "beaverton",
    province: "ON",
    postal: "L0K 1A0",
    lat: 44.4363579,
    lng: -79.1532596,
    phone: "705-426-7301",
    email: "todd.hill@homehardware.ca",
    person: "Todd Hill",
  },
  {
    dealer: "HOME HARDWARE LINDSAY",
    address: "220 LINDSAY ST SOUTH",
    city: "lindsay",
    province: "ON",
    postal: "K9V 2N3",
    lat: 44.3443318,
    lng: -78.7311335,
    phone: "705-324-3516",
    email: "dan@hbclindsay.com",
    person: "Dan Hargrave",
  },
  {
    dealer: "Home Hardware Liverance",
    address: "3458 Hwy 6",
    city: "lion's head",
    province: "ON",
    postal: "N0H 1W0",
    lat: 45.021563,
    lng: -81.3139843,
    phone: "519-793-3610",
    email: "dlivlum@eastlink.ca",
    person: "Dave Shearer",
  },
  {
    dealer: "HOME HARDWARE MARMORA",
    address: "HIGHWAY #7 WEST",
    city: "marmora",
    province: "ON",
    postal: "K0K 2M0",
    lat: 44.4828837,
    lng: -77.6996301,
    phone: "613-472-2539",
    email: "broadbent.hardware@bellnet.ca",
    person: "Russ or Scott Broadbent",
  },
  {
    dealer: "Home Hardware Millers",
    address: "900 Main Street",
    city: "sauble beach",
    province: "ON",
    postal: "N0H 2GO",
    lat: 44.6295636,
    lng: -81.2443866,
    phone: "519-422-2424",
    email: "k.walpole@millershbc.com",
    person: "Keith Walpole",
  },
  {
    dealer: "Home Hardware Minden",
    address: "16 Bobcaygeon Rd.",
    city: "minden",
    province: "ON",
    postal: "K0M 2K0",
    lat: 44.9189505,
    lng: -78.724882,
    phone: "705-286-1351",
    email: "tim@mhhbc.com",
    person: "Tim Henderson",
  },
  {
    dealer: "Home Hardware Mt Albert",
    address: "6 Princess Street",
    city: "mount albert",
    province: "ON",
    postal: "L0G 1M0",
    lat: 44.1344012,
    lng: -79.3229539,
    phone: "905-473-2341",
    email: "bfacer@mahhbc.com",
    person: "Braedyn Facer",
  },
  {
    dealer: "HOME HARDWARE NAPANEE",
    address: "199 Jim Kimmett Boulevard",
    city: "napanee",
    province: "ON",
    postal: "K7R 3L1",
    lat: 44.2589627,
    lng: -76.9772904,
    phone: "613-354-3315",
    email: "chris.geenevasen@homehardware.ca",
    person: "Chris Geenevasan",
  },
  {
    dealer: "HOME HARDWARE PETERBOROUGH",
    address: "1460 LANDSDOWNE ST. WEST",
    city: "peterborough",
    province: "ON",
    postal: "K9J 2A2",
    lat: 44.2786461,
    lng: -78.3630353,
    phone: "705-743-3553",
    email: "mike@homehardwarepeterborough.ca",
    person: "Mike Ardiel",
  },
  {
    dealer: "Home Hardware Picton",
    address: "13544 Loyalist Parkway",
    city: "picton",
    province: "ON",
    postal: "K0K2T0",
    lat: 43.9957295,
    lng: -77.1795575,
    phone: "613-476-7497",
    email: "sherry@pictonhomehardware.com",
    person: "Sherry Otterway",
  },
  {
    dealer: "Home Hardware Plevna",
    address: "7617 Hwy #509",
    city: "plevna",
    province: "ON",
    postal: "K0H 2M0",
    lat: 44.9675913,
    lng: -76.9812032,
    phone: "613-479-5579",
    email: "rcard479@icloud.com",
    person: "Ricky Card",
  },
  {
    dealer: "Home Hardware Port Loring",
    address: "11 Wilson Lake Cr",
    city: "port loring",
    province: "ON",
    postal: "P0H 1Y0",
    lat: 45.9159156,
    lng: -79.9866889,
    phone: "705-757-2588",
    email: "sjacksonhh@hotmail.com",
    person: "Steve Jackson",
  },
  {
    dealer: "Home Hardware Rashotte",
    address: "18 Countryman Road",
    city: "tweed",
    province: "ON",
    postal: "K0K 3J0",
    lat: 44.4607324,
    lng: -77.3168376,
    phone: "613-478-2539",
    email: "john.nugent@rashotte.ca",
    person: "John Nugent",
  },
  {
    dealer: "Home Hardware Shelburne",
    address: "725 Steeles St.",
    city: "shelburne",
    province: "ON",
    postal: "L9V 3M7",
    lat: 44.0854573,
    lng: -80.1924031,
    phone: "519-925-3991",
    email: "vicky.stevens@homehardware.ca",
    person: "Vicky Stevens",
  },
  {
    dealer: "Home Hardware Sundridge",
    address: "23 John Street",
    city: "sundridge",
    province: "ON",
    postal: "P0A 1Z0",
    lat: 45.7709279,
    lng: -79.3974951,
    phone: "705-384-5365",
    email: "rob.t@kiddshomehardware.ca",
    person: "Rob Therian",
  },
  {
    dealer: "Home Team Holdings Inc",
    address: "1624 28 Avenue East",
    city: "owen sound",
    province: "ON",
    postal: "N4K 0A8",
    lat: 44.5777541,
    lng: -80.8986834,
    phone: "519-376-1624",
    email: "amanda@vandolders.com",
    person: "Amanda Rogers",
  },
  {
    dealer: "Hook's Building Centre",
    address: "13586 Highway # 41",
    city: "cloyne",
    province: "ON",
    postal: "K0H 1K0",
    lat: 44.7903279,
    lng: -77.1792981,
    phone: "613-336-8416",
    email: "thook@hooksbc.com",
    person: "Tracy Hook",
  },
  {
    dealer: "Intuitive Fine Homes",
    address: "21 Dymond Drive",
    city: "whitby",
    province: "ON",
    postal: "L1N 3N1",
    lat: 43.9036786,
    lng: -78.9138015,
    phone: "416-335-6555",
    email: "toni@intuitivefinehomes.ca",
    person: "Toni Stojanovic",
  },
  {
    dealer: "K & S Supply Ltd. (Jeff's Windows & Doors)",
    address: "15 Lanark Road",
    city: "perth",
    province: "ON",
    postal: "K7H 2R2",
    lat: 44.9080902,
    lng: -76.274269,
    phone: "613-264-9266",
    email: "jeffswindows15@gmail.com",
    person: "Jeff Fitzgerald",
  },
  {
    dealer: "Kelly Lake Building Supplies",
    address: "22 Brady Street",
    city: "sudbury",
    province: "ON",
    postal: "P3E 6E1",
    lat: 46.4878048,
    lng: -81.0023009,
    phone: "705-674-5283",
    email: "johnc@kellylakebuildingsupplies.ca",
    person: "John Carr",
  },
  {
    dealer: "Kemptville Building Centre",
    address: "2540 County Road #43",
    city: "kemptville",
    province: "ON",
    postal: "K0G 1J0",
    lat: 45.0162661,
    lng: -75.6631663,
    phone: "613-258-6000",
    email: "shawn.markell@kbchome.ca",
    person: "Shawn Markell",
  },
  {
    dealer: "M&T GLASS",
    address: "1380 Cyrville Road",
    city: "ottawa",
    province: "ON",
    postal: "K1B 3L9",
    lat: 45.4208445,
    lng: -75.6246822,
    phone: "613-745-7158",
    email: "sales@mtglass.com",
    person: "Sheldon Montroy",
  },
  {
    dealer: "Mark A Cook",
    address: "45 JOHN POUND RD",
    city: "tillsonburg",
    province: "ON",
    postal: "N4G 4G8",
    lat: 42.8541726,
    lng: -80.7284509,
    phone: "519-859-3247",
    email: "cookn@msn.com",
    person: "Mark Cook",
  },
  {
    dealer: "Mcadam Window and Door Centre",
    address: "354 PINNACLE ST",
    city: "belleville",
    province: "ON",
    postal: "K8N 3B4",
    lat: 44.1683089,
    lng: -77.3869811,
    phone: "613-968-4512",
    email: "info@mcadamwindows.com",
    person: "Brett Chisholm",
  },
  {
    dealer: "MERITCO INDUSTRIES LTD",
    address: "2675 REID SIDEROAD",
    city: "campbellville",
    province: "ON",
    postal: "L0P 1B0",
    lat: 43.4891643,
    lng: -79.9922533,
    phone: "905-854-2228",
    email: "pmerritt@ridleywindows.com",
    person: "Paul Merritt",
  },
  {
    dealer: "MODCO INVESTMENTS LTD",
    address: "31 IRONWOOD TRAIL",
    city: "coldwater",
    province: "ON",
    postal: "L0K 1E0",
    lat: 44.5692031,
    lng: -79.630514,
    phone: "705-538-1444",
    email: "rene@yourplans2permits.ca",
    person: "Rene DeMartini",
  },
  {
    dealer: "Muskoka Window and Door Center",
    address: "15 Robert Dollar Drive",
    city: "bracebridge",
    province: "ON",
    postal: "P1L 1W6",
    lat: 45.024729,
    lng: -79.317469,
    phone: "705-645-3057",
    email: "randy@muskokawindowanddoor.ca",
    person: "Randy Hodges",
  },
  {
    dealer: "Newco Glass",
    address: "1842 County Road 6",
    city: "douro-dummer",
    province: "ON",
    postal: "K0L 2H0",
    lat: 44.5125379,
    lng: -78.1452793,
    phone: "705-652-8266",
    email: "newcoglass@xplornet.ca",
    person: "Elaine and Kent Hilker",
  },
  {
    dealer: "Normerica Building Systems Inc",
    address: "2007 Commerce Park Drive",
    city: "innisfil",
    province: "ON",
    postal: "L9S 4A2",
    lat: 44.282611,
    lng: -79.6774049,
    phone: "705-431-4710",
    email: "d.gelinas@normerica.com",
    person: "Doug Gelinas",
  },
  {
    dealer: "Northwood Window & Door Centre",
    address: "1030 Lakeshore Drive",
    city: "north bay",
    province: "ON",
    postal: "P1A 2H3",
    lat: 46.258472,
    lng: -79.4204095,
    phone: "705-497-9137",
    email: "adam@northwoodwindows.com",
    person: "Adam Walton",
  },
  {
    dealer: "Oomen's Glass Ltd",
    address: "1033 John Counter Blvd",
    city: "kingston",
    province: "ON",
    postal: "K7K 6C7",
    lat: 44.2603867,
    lng: -76.5016007,
    phone: "613-547-5494",
    email: "tara@oomensglass.com",
    person: "Tara Oomen",
  },
  {
    dealer: "PALMER RAPIDS WINDOWS & DOORS",
    address: "2297 SCHUTT RD",
    city: "palmer rapids",
    province: "ON",
    postal: "K0J 2E0",
    lat: 45.2953636,
    lng: -77.4998121,
    phone: "613-758-2329",
    email: "palmerrapidswindowsanddoors@gmail.com",
    person: "Willard Musclow",
  },
  {
    dealer: "Parry Sound Rona",
    address: "115 Bowes St.",
    city: "parry sound",
    province: "ON",
    postal: "P2A 2L8",
    lat: 45.3425653,
    lng: -80.0121316,
    phone: "705-746-5894",
    email: "karenh@parrysoundrona.com",
    person: "Karen Hannon",
  },
  {
    dealer: "Penner Home Hardware Building Centre",
    address: "700 Penner St",
    city: "virgil",
    province: "ON",
    postal: "L0S 1T0",
    lat: 43.225662,
    lng: -79.120719,
    phone: "905-468-3242",
    email: "johnredekop@pennerbuildingcenter.com",
    person: "John Redekop",
  },
  {
    dealer: "RIDLEY WINDOWS & DOORS",
    address: "520 Applewood Drive",
    city: "vaughan",
    province: "ON",
    postal: "L4K 4B4",
    lat: 43.8012903,
    lng: -79.5417261,
    phone: "416-742-3546",
    email: "dcairns@ridley-windows.com",
    person: "David Cairns",
  },
  {
    dealer: "Rona Lindsay",
    address: "36 Harvest St.",
    city: "lindsay",
    province: "ON",
    postal: "K9V 2Y4",
    lat: 44.3474417,
    lng: -78.7709955,
    phone: "705-878-8135",
    email: "ashley.marren@rona.ca",
    person: "Ashley Marren",
  },
  {
    dealer: "Royal Building Solutions - Calgary",
    address: "Royal Building Solutions",
    city: "calgary",
    province: "AB",
    postal: "T2H 1Z9",
    lat: 51.0044013,
    lng: -114.0424561,
    phone: "403-253-3833",
    email: "kstopple@royalbp.com",
    person: "Kevin Stopple",
  },
  {
    dealer: "Royal Building Solutions - Cambridge",
    address: "85 Thompson Drive",
    city: "cambridge",
    province: "ON",
    postal: "N1T 2E4",
    lat: 43.4060571,
    lng: -80.2931211,
    phone: "519-621-1128",
    email: "kparkins@royalbp.com",
    person: "Katie Parkins",
  },
  {
    dealer: "Royal Building Solutions - Dartmouth",
    address: "Royal Building Solutions",
    city: "dartmouth",
    province: "NS",
    postal: "B3B 2E3",
    lat: 44.7107174,
    lng: -63.5858965,
    phone: "902-468-8800",
    email: "horgar@royalbp.com",
    person: "Holly Orgar",
  },
  {
    dealer: "Royal Building Solutions - Hamilton",
    address: "275 Nebo Road",
    city: "hamilton",
    province: "ON",
    postal: "L8W 2E2",
    lat: 43.1903984,
    lng: -79.8401488,
    phone: "905-383-8400",
    email: "jsawyer@westlake.com",
    person: "Justin Sawyer",
  },
  {
    dealer: "Royal Building Solutions - London",
    address: "3886 Commerce Road",
    city: "london",
    province: "ON",
    postal: "N6N 1P8",
    lat: 42.9331,
    lng: -81.1692887,
    phone: "519-644-0440",
    email: "kparkins@royalbp.com",
    person: "Katie Parkins",
  },
  {
    dealer: "Royal Building Solutions - Mount Pearl",
    address: "Royal Building Solutions",
    city: "mt pearl",
    province: "NL",
    postal: "A1N 4R7",
    lat: 47.5185785,
    lng: -52.8426454,
    phone: "709-364-8900",
    email: "drose@royalbp.com",
    person: "Devin Rose",
  },
  {
    dealer: "Royal Building Solutions - St. Catharines",
    address: "21 Wright St.",
    city: "st. catharines",
    province: "ON",
    postal: "L2P 3J2",
    lat: 43.1664603,
    lng: -79.2202131,
    phone: "905-984-8500",
    email: "jsawyer@westlake.com",
    person: "Justin Sawyer",
  },
  {
    dealer: "Royal Building Solutions - Thunder Bay",
    address: "Royal Building Solutions",
    city: "thunder bay",
    province: "ON",
    postal: "P7B 6J3",
    lat: 48.413612,
    lng: -89.257331,
    phone: "807-623-5459",
    email: "mrothenburger@royalbp.com",
    person: "Mike Rothenburger",
  },
  {
    dealer: "Royal Building Solutions - Vaughan",
    address: "7933 Huntington Road",
    city: "vaughan",
    province: "ON",
    postal: "L4H 0S9",
    lat: 43.7727462,
    lng: -79.6491568,
    phone: "905-326-6920",
    email: "mscatozza@royalbp.com",
    person: "Maurizio Scatozza",
  },
  {
    dealer: "Royal Building Solutions - Winnipeg",
    address: "Royal Building Solutions",
    city: "winnipeg",
    province: "MB",
    postal: "R2X 2R4",
    lat: 49.9410784,
    lng: -97.1832487,
    phone: "204-694-1918",
    email: "eneufeld@royalbp.com",
    person: "Ed Neufeld",
  },
  {
    dealer: "Schell Ace Building Centre",
    address: "20971 DALTON RD",
    city: "sutton",
    province: "ON",
    postal: "L0E 1L0",
    lat: 44.3141323,
    lng: -79.3686814,
    phone: "905-722-6561",
    email: "doug.morden@schelllumber.com",
    person: "Doug Morden",
  },
  {
    dealer: "SCHELL LUMBER",
    address: "33 EDWARD ST",
    city: "stouffville",
    province: "ON",
    postal: "L4A 1A4",
    lat: 43.9714613,
    lng: -79.2530355,
    phone: "905-640-3440",
    email: "michael@schelllumber.ca",
    person: "Michael Heffernan",
  },
  {
    dealer: "Statements Oakville Inc",
    address: "3120 Glen Erin Drive",
    city: "mississauga",
    province: "ON",
    postal: "L5L 1R6",
    lat: 43.532484,
    lng: -79.6791103,
    phone: "905-845-4195",
    email: "rob@statementsdefine.com",
    person: "Rob Shaw",
  },
  {
    dealer: "Superior Glass Ltd",
    address: "1156 Great Northern Road",
    city: "sault ste marie",
    province: "ON",
    postal: "P6B 0B6",
    lat: 46.56219,
    lng: -84.3221705,
    phone: "705-253-2555",
    email: "graham@superiorcustomglass.com",
    person: "Graham Moraca",
  },
  {
    dealer: "THE BURLINGTON DOOR CENTER",
    address: "4280 HARVESTER RD",
    city: "burlington",
    province: "ON",
    postal: "L7L 5Z5",
    lat: 43.3697788,
    lng: -79.7773407,
    phone: "905-333-4044",
    email: "rick.block@thedoorcenter.ca",
    person: "Rick Block",
  },
  {
    dealer: "THE PAINT STORE PLUS",
    address: "3749 MOUNTJOY ROAD",
    city: "blackstock",
    province: "ON",
    postal: "L0B 1B0",
    lat: 44.0755287,
    lng: -78.7840534,
    phone: "905-261-4798",
    email: "rick.hackney@gmail.com",
    person: "Rick Hackney",
  },
  {
    dealer: "TIM-BR MART GROUP- Dorset",
    address: "1292 Kawagama Lake Road",
    city: "dorset",
    province: "ON",
    postal: "P0A 1E0",
    lat: 45.2541787,
    lng: -78.8774278,
    phone: "705-652-3361",
    email: "grant@kingdontruss.com",
    person: "Grant Holland",
  },
  {
    dealer: "TIM-BR MART GROUP- Watson Courtright",
    address: "79 Courtright Line",
    city: "courtright",
    province: "ON",
    postal: "N0N 1H0",
    lat: 42.8142401,
    lng: -82.4685711,
    phone: "705-766-2263",
    email: "chantal@timbrmart.on.ca",
    person: "Chantal Hamilton",
  },
  {
    dealer: "TIM-BR MART GROUP- Watson Wyoming",
    address: "4528 CHURCHILL LINE",
    city: "plympton-wyoming",
    province: "ON",
    postal: "NON 1TO",
    lat: 42.9310641,
    lng: -82.1220398,
    phone: "519-867-2858",
    email: "alex.clendening@timbrmart.on.ca",
    person: "Alex Clendening",
  },
  {
    dealer: "TIM-BR MART GROUP-Brechin",
    address: "2218 Hwy 12",
    city: "brechin",
    province: "ON",
    postal: "L0K 1B0",
    lat: 44.5439309,
    lng: -79.1779293,
    phone: "519-845-3321",
    email: "dbaron@timbrmart.on.ca",
    person: "Dan Barron",
  },
  {
    dealer: "TIM-BR MART GROUP-Kingdon Lakefield",
    address: "309 Lansdowne St. East",
    city: "peterborough",
    province: "ON",
    postal: "K9L 2A3",
    lat: 44.2908329,
    lng: -78.2948823,
    phone: "705-484-5357",
    email: "scottyswitzer@hotmail.com",
    person: "Scott Switzer",
  },
  {
    dealer: "TIM-BR MART GROUP-Washago",
    address: "8253 County Rd 169",
    city: "washago",
    province: "ON",
    postal: "L0K 2B0",
    lat: 44.7492819,
    lng: -79.3352526,
    phone: "705-749-1144",
    email: "jesse.h@kingdontruss.com",
    person: "Jesse Hatcher",
  },
  {
    dealer: "True North Log Homes",
    address: "1730 Winhara Road",
    city: "bracebridge",
    province: "ON",
    postal: "P1L 1W1",
    lat: 44.9946386,
    lng: -79.3115482,
    phone: "705-689-2626",
    email: "harvey.b.washago@timbermart.ca",
    person: "Harvey Barnes",
  },
  {
    dealer: "Turkstra Lumber - Stoney Creek",
    address: "370 Green Rd",
    city: "stoney creek",
    province: "ON",
    postal: "L8E 4A5",
    lat: 43.2330397,
    lng: -79.7300051,
    phone: "905-664-7337",
    email: "dwillis@turkstrawindows.ca",
    person: "Dave Willis",
  },
  {
    dealer: "VAN DOLDER'S CUSTOM EXTERIORS",
    address: "185 Mountain Road",
    city: "collingwood",
    province: "ON",
    postal: "L9Y 3Z8",
    lat: 44.502019,
    lng: -80.250459,
    phone: "705-444-5601",
    email: "jason@vandolders.com",
    person: "Jason Acres",
  },
  {
    dealer: "VAN DOLDER'S CUSTOM EXTERIORS",
    address: "1624 28 Ave E",
    city: "owen sound",
    province: "ON",
    postal: "N4K 0A8",
    lat: 44.5777541,
    lng: -80.8986834,
    phone: "519-376-1624",
    email: "kris@vandolders.com",
    person: "Kris Vandolder",
  },
  {
    dealer: "West Side Windows and Doors",
    address: "2050 10th Ave. SW",
    city: "calgary",
    province: "AB",
    postal: "T3C0J9",
    lat: 51.044794,
    lng: -114.111645,
    phone: "403-229-1234",
    email: "stephen.mccarthy@wswd.ca",
    person: "Stephen McCarthy",
  },
  {
    dealer: "West Windows & Doors Ltd",
    address: "2462 Industrial Street",
    city: "burlington",
    province: "ON",
    postal: "L7P 1A5",
    lat: 43.3539623,
    lng: -79.8103745,
    phone: "905-335-3751",
    email: "info@westwindows.on.ca",
    person: "Chris West",
  },
];

export { data };
