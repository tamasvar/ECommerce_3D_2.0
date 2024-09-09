// Define shipping costs for different countries
export const countryShippingCosts = {
  US: 3700,   // United States
  CY: 3700,   // Cyprus
  DK: 3000,   // Denmark
  FI: 3000,   // Finland
  IE: 3000,   // Ireland
  IT: 3000,   // Italy
  LU: 3000,   // Luxembourg
  MT: 3700,   // Malta
  SE: 3000,   // Sweden
  NL: 3000,   // The Netherlands
  GB: 3000,   // United Kingdom
  NO: 3000,
  DE: 2000,   // Germany
  FR: 2000,   // France
  ES: 2000,   // Spain
  PT: 2000,   // Portugal
  BE: 2000,   // Belgium
  AT: 2000,   // Austria
  BG: 2000,   // Bulgaria
  HR: 2000,   // Croatia
  CZ: 2000,   // Czech Republic
  EE: 2000,   // Estonia
  GR: 2000,   // Greece
  HU: 2000,   // Hungary
  LV: 2000,   // Latvia
  LT: 2000,   // Lithuania
  PL: 2000,   // Poland
  RO: 2000,   // Romania
  SK: 2000,   // Slovakia
  SI: 2000,   // Slovenia
  CH: 2000,

};
export const countryShippingCostsSticker = {
  US: 1500,   // United States
  CY: 1500,   // Cyprus
  DK: 1500,   // Denmark
  FI: 1500,   // Finland
  IE: 1500,   // Ireland
  IT: 1500,   // Italy
  LU: 1500,   // Luxembourg
  MT: 1500,   // Malta
  SE: 1500,   // Sweden
  NL: 1500,   // The Netherlands
  GB: 1500,   // United Kingdom
  NO: 1500,
  DE: 1500,   // Germany
  FR: 1500,   // France
  ES: 1500,   // Spain
  PT: 1500,   // Portugal
  BE: 1500,   // Belgium
  AT: 1500,   // Austria
  BG: 1500,   // Bulgaria
  HR: 1500,   // Croatia
  CZ: 1500,   // Czech Republic
  EE: 1500,   // Estonia
  GR: 1500,   // Greece
  HU: 1500,   // Hungary
  LV: 1500,   // Latvia
  LT: 1500,   // Lithuania
  PL: 1500,   // Poland
  RO: 1500,   // Romania
  SK: 1500,   // Slovakia
  SI: 1500,   // Slovenia
  CH: 1500,

};
export const countries = [
  { value: '', label: 'Select country', disabled: true },
  { value: 'US', label: 'United States' },
  { value: 'CY', label: 'Cyprus' },
  { value: 'DK', label: 'Denmark' },
  { value: 'FI', label: 'Finland' },
  { value: 'IE', label: 'Ireland' },
  { value: 'IT', label: 'Italy' },
  { value: 'LU', label: 'Luxembourg' },
  { value: 'MT', label: 'Malta' },
  { value: 'SE', label: 'Sweden' },
  { value: 'NL', label: 'The Netherlands' },
  { value: 'GB', label: 'United Kingdom' },
  { value: 'DE', label: 'Germany' },
  { value: 'FR', label: 'France' },
  { value: 'ES', label: 'Spain' },
  { value: 'PT', label: 'Portugal' },
  { value: 'BE', label: 'Belgium' },
  { value: 'AT', label: 'Austria' },
  { value: 'BG', label: 'Bulgaria' },
  { value: 'HR', label: 'Croatia' },
  { value: 'CZ', label: 'Czech Republic' },
  { value: 'EE', label: 'Estonia' },
  { value: 'GR', label: 'Greece' },
  { value: 'HU', label: 'Hungary' },
  { value: 'LV', label: 'Latvia' },
  { value: 'LT', label: 'Lithuania' },
  { value: 'PL', label: 'Poland' },
  { value: 'RO', label: 'Romania' },
  { value: 'SK', label: 'Slovakia' },
  { value: 'SI', label: 'Slovenia' }
];



export const europeanCountriesWithStates = [
  { value: '', label: 'Select country', disabled: true },
  {
    label: 'United States',
    value: 'US',
    phoneSample: '+1 202 5550173',
    states: [
      { label: 'Select State', value: '', disabled: true },
      { label: 'Alabama', value: 'AL' },
      { label: 'Alaska', value: 'AK' },
      { label: 'Arizona', value: 'AZ' },
      { label: 'Arkansas', value: 'AR' },
      { label: 'California', value: 'CA' },
      { label: 'Colorado', value: 'CO' },
      { label: 'Connecticut', value: 'CT' },
      { label: 'Delaware', value: 'DE' },
      { label: 'Florida', value: 'FL' },
      { label: 'Georgia', value: 'GA' },
      { label: 'Hawaii', value: 'HI' },
      { label: 'Idaho', value: 'ID' },
      { label: 'Illinois', value: 'IL' },
      { label: 'Indiana', value: 'IN' },
      { label: 'Iowa', value: 'IA' },
      { label: 'Kansas', value: 'KS' },
      { label: 'Kentucky', value: 'KY' },
      { label: 'Louisiana', value: 'LA' },
      { label: 'Maine', value: 'ME' },
      { label: 'Maryland', value: 'MD' },
      { label: 'Massachusetts', value: 'MA' },
      { label: 'Michigan', value: 'MI' },
      { label: 'Minnesota', value: 'MN' },
      { label: 'Mississippi', value: 'MS' },
      { label: 'Missouri', value: 'MO' },
      { label: 'Montana', value: 'MT' },
      { label: 'Nebraska', value: 'NE' },
      { label: 'Nevada', value: 'NV' },
      { label: 'New Hampshire', value: 'NH' },
      { label: 'New Jersey', value: 'NJ' },
      { label: 'New Mexico', value: 'NM' },
      { label: 'New York', value: 'NY' },
      { label: 'North Carolina', value: 'NC' },
      { label: 'North Dakota', value: 'ND' },
      { label: 'Ohio', value: 'OH' },
      { label: 'Oklahoma', value: 'OK' },
      { label: 'Oregon', value: 'OR' },
      { label: 'Pennsylvania', value: 'PA' },
      { label: 'Rhode Island', value: 'RI' },
      { label: 'South Carolina', value: 'SC' },
      { label: 'South Dakota', value: 'SD' },
      { label: 'Tennessee', value: 'TN' },
      { label: 'Texas', value: 'TX' },
      { label: 'Utah', value: 'UT' },
      { label: 'Vermont', value: 'VT' },
      { label: 'Virginia', value: 'VA' },
      { label: 'Washington', value: 'WA' },
      { label: 'West Virginia', value: 'WV' },
      { label: 'Wisconsin', value: 'WI' },
      { label: 'Wyoming', value: 'WY' }
    ],
  },
  {
    label: 'Italy',
    value: 'IT',
    phoneSample: '+39 06 69812345',
    states: [
      { value: '', label: 'Select State', disabled: true },
      { label: 'Abruzzo', value: 'AB' },
      { label: 'Aosta Valley', value: 'AO' },
      { label: 'Apulia', value: 'AP' },
      { label: 'Basilicata', value: 'BA' },
      { label: 'Calabria', value: 'CA' },
      { label: 'Campania', value: 'CM' },
      { label: 'Emilia-Romagna', value: 'ER' },
      { label: 'Friuli-Venezia Giulia', value: 'FV' },
      { label: 'Lazio', value: 'LA' },
      { label: 'Liguria', value: 'LI' },
      { label: 'Lombardy', value: 'LO' },
      { label: 'Marche', value: 'MA' },
      { label: 'Molise', value: 'MO' },
      { label: 'Piedmont', value: 'PI' },
      { label: 'Sardinia', value: 'SA' },
      { label: 'Sicily', value: 'SI' },
      { label: 'Trentino-South Tyrol', value: 'TS' },
      { label: 'Tuscany', value: 'TU' },
      { label: 'Umbria', value: 'UM' },
      { label: 'Veneto', value: 'VE' }
    ]
  },
  {
    label: 'Luxembourg',
    value: 'LU',
    phoneSample: '+352 20 880123',
    states: [
      { value: '', label: 'Select State', disabled: true },
      { label: 'Luxembourg District', value: 'LD' },
      { label: 'Diekirch District', value: 'DD' },
      { label: 'Grevenmacher District', value: 'GD' }
    ]
  },
  {
    label: 'Malta',
    value: 'MT',
    phoneSample: '+356 21 234567',
    states: [
      { value: '', label: 'Select State', disabled: true },
      { label: 'Northern Region', value: 'NR' },
      { label: 'Southern Region', value: 'SR' },
      { label: 'Gozo and Comino', value: 'GC' }
    ]
  },
  {
    label: 'Sweden',
    value: 'SE',
    phoneSample: '+46 8 123456',
    states: [
      { value: '', label: 'Select State', disabled: true },
      { label: 'Stockholm County', value: 'SC' },
      { label: 'Uppsala County', value: 'UC' },
      { label: 'Södermanland County', value: 'SOC' },
      { label: 'Östergötland County', value: 'OC' },
      { label: 'Jönköping County', value: 'JC' },
      { label: 'Kronoberg County', value: 'KC' },
      { label: 'Kalmar County', value: 'KAC' },
      { label: 'Gotland County', value: 'GC' },
      { label: 'Blekinge County', value: 'BC' },
      { label: 'Skåne County', value: 'SKC' },
      { label: 'Halland County', value: 'HC' },
      { label: 'Västra Götaland County', value: 'VGC' },
      { label: 'Värmland County', value: 'VAC' },
      { label: 'Örebro County', value: 'OC' },
      { label: 'Västmanland County', value: 'VAC' },
      { label: 'Dalarna County', value: 'DC' },
      { label: 'Gävleborg County', value: 'GC' },
      { label: 'Västernorrland County', value: 'VNC' },
      { label: 'Jämtland County', value: 'JC' },
      { label: 'Västerbotten County', value: 'VBC' },
      { label: 'Norrbotten County', value: 'NC' }
    ]
  },
  {
    label: 'Denmark',
    value: 'DK',
    phoneSample: '+45 32 123456',
    states: [
      { label: 'Select State', value: '', disabled: true },
      { label: 'Capital Region of Denmark', value: 'CAP' },
      { label: 'Central Denmark Region', value: 'CD' },
      { label: 'North Denmark Region', value: 'ND' },
      { label: 'Region Zealand', value: 'ZL' },
      { label: 'Region of Southern Denmark', value: 'SD' }
    ]
  },
  {
    label: 'Finland',
    value: 'FI',
    phoneSample: '+358 9 1234567',
    states: [
      { label: 'Select Region', value: '', disabled: true },
      { label: 'Åland Islands', value: 'AI' },
      { label: 'Central Finland', value: 'CF' },
      { label: 'Central Ostrobothnia', value: 'CO' },
      { label: 'Eastern Finland', value: 'EF' },
      { label: 'Finland Proper', value: 'FP' },
      { label: 'Kainuu', value: 'KA' },
      { label: 'Kymenlaakso', value: 'KY' },
      { label: 'Lapland', value: 'LA' },
      { label: 'North Karelia', value: 'NK' },
      { label: 'Northern Ostrobothnia', value: 'NO' },
      { label: 'Northern Savonia', value: 'NS' },
      { label: 'Ostrobothnia', value: 'OB' },
      { label: 'Päijänne Tavastia', value: 'PT' },
      { label: 'Satakunta', value: 'SA' },
      { label: 'South Karelia', value: 'SK' },
      { label: 'Southern Ostrobothnia', value: 'SO' },
      { label: 'Southern Savonia', value: 'SS' },
      { label: 'Tavastia Proper', value: 'TP' },
      { label: 'Uusimaa', value: 'UA' }
    ]
  },
  {
    label: 'Ireland',
    value: 'IE',
    phoneSample: '+353 1 2345678',
    states: [
      { label: 'Select Province', value: '', disabled: true },
      { label: 'Connacht', value: 'CON' },
      { label: 'Leinster', value: 'LEI' },
      { label: 'Munster', value: 'MUN' },
      { label: 'Ulster', value: 'ULS' }
    ]
  },
  {
    label: 'The Netherlands',
    value: 'NL',
    phoneSample: '+31 20 1234567',
    states: [
      { value: '', label: 'Select State', disabled: true },
      { label: 'Drenthe', value: 'DR' },
      { label: 'Flevoland', value: 'FL' },
      { label: 'Friesland', value: 'FR' },
      { label: 'Gelderland', value: 'GE' },
      { label: 'Groningen', value: 'GR' },
      { label: 'Limburg', value: 'LI' },
      { label: 'North Brabant', value: 'NB' },
      { label: 'North Holland', value: 'NH' },
      { label: 'Overijssel', value: 'OV' },
      { label: 'South Holland', value: 'ZH' },
      { label: 'Utrecht', value: 'UT' },
      { label: 'Zeeland', value: 'ZE' }
    ]
  },
  {
    label: 'United Kingdom',
    value: 'GB',
    phoneSample: '+44 20 79460123',
    states: [
      { value: '', label: 'Select State', disabled: true },
      { label: 'England', value: 'ENG' },
      { label: 'Scotland', value: 'SCO' },
      { label: 'Wales', value: 'WAL' },
      { label: 'Northern Ireland', value: 'NIR' }
    ]
  },
  {
    label: 'Germany',
    value: 'DE',
    phoneSample: '+49 30 123456',
    states: [
      { value: '', label: 'Select State', disabled: true },
      { label: 'Baden-Württemberg', value: 'BW' },
      { label: 'Bavaria', value: 'BY' },
      { label: 'Berlin', value: 'BE' },
      { label: 'Brandenburg', value: 'BB' },
      { label: 'Bremen', value: 'HB' },
      { label: 'Hamburg', value: 'HH' },
      { label: 'Hesse', value: 'HE' },
      { label: 'Lower Saxony', value: 'NI' },
      { label: 'Mecklenburg-Vorpommern', value: 'MV' },
      { label: 'North Rhine-Westphalia', value: 'NW' },
      { label: 'Rhineland-Palatinate', value: 'RP' },
      { label: 'Saarland', value: 'SL' },
      { label: 'Saxony', value: 'SN' },
      { label: 'Saxony-Anhalt', value: 'ST' },
      { label: 'Schleswig-Holstein', value: 'SH' },
      { label: 'Thuringia', value: 'TH' }
    ]
  },
  {
    label: 'France',
    value: 'FR',
    phoneSample: '+33 1 23456789',
    states: [
      { value: '', label: 'Select State', disabled: true },
      { label: 'Auvergne-Rhône-Alpes', value: 'ARA' },
      { label: 'Bourgogne-Franche-Comté', value: 'BFC' },
      { label: 'Brittany', value: 'BRE' },
      { label: 'Centre-Val de Loire', value: 'CVL' },
      { label: 'Corsica', value: 'COR' },
      { label: 'Grand Est', value: 'GES' },
      { label: 'Hauts-de-France', value: 'HDF' },
      { label: 'Île-de-France', value: 'IDF' },
      { label: 'Normandy', value: 'NOR' },
      { label: 'Nouvelle-Aquitaine', value: 'NAQ' },
      { label: 'Occitanie', value: 'OCC' },
      { label: 'Pays de la Loire', value: 'PDL' },
      { label: 'Provence-Alpes-Côte d\'Azur', value: 'PAC' }
    ]
  },
  {
    label: 'Spain',
    value: 'ES',
    phoneSample: '+34 91 1234567',
    states: [
      { value: '', label: 'Select State', disabled: true },
      { label: 'Andalusia', value: 'AND' },
      { label: 'Aragon', value: 'ARA' },
      { label: 'Asturias', value: 'AST' },
      { label: 'Balearic Islands', value: 'BAL' },
      { label: 'Basque Country', value: 'BAS' },
      { label: 'Canary Islands', value: 'CAN' },
      { label: 'Cantabria', value: 'CAT' },
      { label: 'Castile and León', value: 'CL' },
      { label: 'Castilla-La Mancha', value: 'CM' },
      { label: 'Catalonia', value: 'CAT' },
      { label: 'Extremadura', value: 'EXT' },
      { label: 'Galicia', value: 'GAL' },
      { label: 'La Rioja', value: 'LR' },
      { label: 'Community of Madrid', value: 'MAD' },
      { label: 'Murcia', value: 'MUR' },
      { label: 'Navarre', value: 'NAV' },
      { label: 'Valencian Community', value: 'VAL' }
    ]
  },
  {
    label: 'Portugal',
    value: 'PT',
    phoneSample: '+351 21 1234567',
    states: [
      { value: '', label: 'Select State', disabled: true },
      { label: 'Azores', value: 'AZ' },
      { label: 'Madeira', value: 'MA' },
      { label: 'Alentejo', value: 'ALE' },
      { label: 'Algarve', value: 'ALG' },
      { label: 'Centro', value: 'CEN' },
      { label: 'Lisbon Metropolitan Area', value: 'LIS' },
      { label: 'Norte', value: 'NOR' }
    ]
  },
  {
    label: 'Belgium',
    value: 'BE',
    phoneSample: '+32 2 1234567',
    states: [
      { value: '', label: 'Select State', disabled: true },
      { label: 'Brussels-Capital Region', value: 'BC' },
      { label: 'Flanders', value: 'FL' },
      { label: 'Wallonia', value: 'WA' }
    ]
  },
  {
    label: 'Austria',
    value: 'AT',
    phoneSample: '+43 1 1234567',
    states: [
      { value: '', label: 'Select State', disabled: true },
      { label: 'Burgenland', value: 'BUR' },
      { label: 'Carinthia', value: 'CAR' },
      { label: 'Lower Austria', value: 'LNA' },
      { label: 'Upper Austria', value: 'UPA' },
      { label: 'Salzburg', value: 'SAL' },
      { label: 'Styria', value: 'STY' },
      { label: 'Tyrol', value: 'TYR' },
      { label: 'Vorarlberg', value: 'VOR' },
      { label: 'Vienna', value: 'VIE' }
    ]
  },
  {
    label: 'Bulgaria',
    value: 'BG',
    phoneSample: '+359 2 123456',
    states: [
      { value: '', label: 'Select State', disabled: true },
      { label: 'Blagoevgrad', value: 'BGR' },
      { label: 'Burgas', value: 'BUR' },
      { label: 'Dobrich', value: 'DOB' },
      { label: 'Gabrovo', value: 'GAB' },
      { label: 'Haskovo', value: 'HAS' },
      { label: 'Kardzhali', value: 'KAR' },
      { label: 'Kyustendil', value: 'KYU' },
      { label: 'Lovech', value: 'LOV' },
      { label: 'Montana', value: 'MON' },
      { label: 'Pazardzhik', value: 'PAZ' },
      { label: 'Pernik', value: 'PER' },
      { label: 'Pleven', value: 'PLE' },
      { label: 'Plovdiv', value: 'PLO' },
      { label: 'Razgrad', value: 'RAZ' },
      { label: 'Ruse', value: 'RUS' },
      { label: 'Shumen', value: 'SHU' },
      { label: 'Silistra', value: 'SIL' },
      { label: 'Sliven', value: 'SLI' },
      { label: 'Smolyan', value: 'SMO' },
      { label: 'Sofia City', value: 'SOF' },
      { label: 'Sofia Province', value: 'SOP' },
      { label: 'Stara Zagora', value: 'STA' },
      { label: 'Targovishte', value: 'TAR' },
      { label: 'Varna', value: 'VAR' },
      { label: 'Veliko Tarnovo', value: 'VEL' },
      { label: 'Vidin', value: 'VID' },
      { label: 'Vratsa', value: 'VRA' },
      { label: 'Yambol', value: 'YAM' }
    ]
  },
  {
    label: 'Croatia',
    value: 'HR',
    phoneSample: '+385 1 2345678',
    states: [
      { value: '', label: 'Select State', disabled: true },
      { label: 'Bjelovar-Bilogora County', value: 'BB' },
      { label: 'Brod-Posavina County', value: 'BP' },
      { label: 'Dubrovnik-Neretva County', value: 'DN' },
      { label: 'Istria County', value: 'IS' },
      { label: 'Karlovac County', value: 'KC' },
      { label: 'Koprivnica-Križevci County', value: 'KK' },
      { label: 'Krapina-Zagorje County', value: 'KZ' },
      { label: 'Lika-Senj County', value: 'LS' },
      { label: 'Međimurje County', value: 'ME' },
      { label: 'Osijek-Baranja County', value: 'OB' },
      { label: 'Požega-Slavonia County', value: 'PS' },
      { label: 'Primorje-Gorski Kotar County', value: 'PG' },
      { label: 'Šibenik-Knin County', value: 'SK' },
      { label: 'Sisak-Moslavina County', value: 'SM' },
      { label: 'Split-Dalmatia County', value: 'SD' },
      { label: 'Varaždin County', value: 'VA' },
      { label: 'Virovitica-Podravina County', value: 'VP' },
      { label: 'Vukovar-Syrmia County', value: 'VS' },
      { label: 'Zadar County', value: 'ZD' },
      { label: 'Zagreb County', value: 'ZA' },
      { label: 'City of Zagreb', value: 'ZG' }
    ]
  },
  {
    label: 'Czech Republic',
    value: 'CZ',
    phoneSample: "+420 2 12345678",
    states: [
      { value: '', label: 'Select State', disabled: true },
      { label: 'Central Bohemian Region', value: 'CB' },
      { label: 'Hradec Králové Region', value: 'HK' },
      { label: 'Karlovy Vary Region', value: 'KV' },
      { label: 'Liberec Region', value: 'LI' },
      { label: 'Moravian-Silesian Region', value: 'MS' },
      { label: 'Olomouc Region', value: 'OL' },
      { label: 'Pardubice Region', value: 'PA' },
      { label: 'Plzeň Region', value: 'PL' },
      { label: 'Prague', value: 'PR' },
      { label: 'South Bohemian Region', value: 'SB' },
      { label: 'South Moravian Region', value: 'SM' },
      { label: 'Ústí nad Labem Region', value: 'UL' },
      { label: 'Vysočina Region', value: 'VY' },
      { label: 'Zlín Region', value: 'ZL' }
    ]
  },
  {
    label: 'Estonia',
    value: 'EE',
    phoneSample: "+372 61234567",
    states: [
      { value: '', label: 'Select State', disabled: true },
      { label: 'Harju County', value: 'HA' },
      { label: 'Hiiu County', value: 'HI' },
      { label: 'Ida-Viru County', value: 'IV' },
      { label: 'Jõgeva County', value: 'JG' },
      { label: 'Järva County', value: 'JR' },
      { label: 'Lääne County', value: 'LA' },
      { label: 'Lääne-Viru County', value: 'LV' },
      { label: 'Põlva County', value: 'PL' },
      { label: 'Pärnu County', value: 'PR' },
      { label: 'Rapla County', value: 'RA' },
      { label: 'Saare County', value: 'SA' },
      { label: 'Tartu County', value: 'TA' },
      { label: 'Valga County', value: 'VA' },
      { label: 'Viljandi County', value: 'VI' },
      { label: 'Võru County', value: 'VO' }
    ]
  },
  {
    label: 'Greece',
    value: 'GR',
    phoneSample: "+30 21 23456789",
    states: [
      { value: '', label: 'Select State', disabled: true },
      { label: 'Attica', value: 'AT' },
      { label: 'Central Greece', value: 'CG' },
      { label: 'Central Macedonia', value: 'CM' },
      { label: 'Crete', value: 'CR' },
      { label: 'Eastern Macedonia and Thrace', value: 'EM' },
      { label: 'Epirus', value: 'EP' },
      { label: 'Ionian Islands', value: 'II' },
      { label: 'North Aegean', value: 'NA' },
      { label: 'Peloponnese', value: 'PE' },
      { label: 'South Aegean', value: 'SA' },
      { label: 'Thessaly', value: 'TH' },
      { label: 'Western Greece', value: 'WG' },
      { label: 'Western Macedonia', value: 'WM' }
    ]
  },
  {
    label: 'Hungary',
    value: 'HU',
    phoneSample: "+36 20 2345678",
    states: [
      { value: '', label: 'Select State', disabled: true },
      { label: 'Budapest', value: 'BU' },
      { label: 'Baranya', value: 'BA' },
      { label: 'Bács-Kiskun', value: 'BK' },
      { label: 'Békés', value: 'BE' },
      { label: 'Borsod-Abaúj-Zemplén', value: 'BZ' },
      { label: 'Csongrád', value: 'CS' },
      { label: 'Fejér', value: 'FE' },
      { label: 'Győr-Moson-Sopron', value: 'GS' },
      { label: 'Hajdú-Bihar', value: 'HB' },
      { label: 'Heves', value: 'HE' },
      { label: 'Jász-Nagykun-Szolnok', value: 'JN' },
      { label: 'Komárom-Esztergom', value: 'KE' },
      { label: 'Nógrád', value: 'NO' },
      { label: 'Pest', value: 'PE' },
      { label: 'Somogy', value: 'SO' },
      { label: 'Szabolcs-Szatmár-Bereg', value: 'SZ' },
      { label: 'Tolna', value: 'TO' },
      { label: 'Vas', value: 'VA' },
      { label: 'Veszprém', value: 'VE' },
      { label: 'Zala', value: 'ZA' }
    ]
  },
  {
    label: 'Iceland',
    value: 'IS',
    phoneSample: "+354 1234567",
    states: [
      { value: '', label: 'Select State', disabled: true },
      { label: 'Capital Region', value: 'CR' },
      { label: 'Northeastern Region', value: 'NR' },
      { label: 'Northwestern Region', value: 'NWR' },
      { label: 'Southern Peninsula', value: 'SP' },
      { label: 'Southern Region', value: 'SR' },
      { label: 'Western Region', value: 'WR' }
    ]
  },
  {
    label: 'Latvia',
    value: 'LV',
    phoneSample: "+371 61234567",
    states: [
      { value: '', label: 'Select State', disabled: true },
      { label: 'Riga', value: 'RI' },
      { label: 'Vidzeme', value: 'VI' },
      { label: 'Latgale', value: 'LA' },
      { label: 'Kurzeme', value: 'KU' },
      { label: 'Zemgale', value: 'ZE' }
    ]
  },
  {
    label: 'Lithuania',
    value: 'LT',
    phoneSample: "+370 61234567",
    states: [
      { value: '', label: 'Select State', disabled: true },
      { label: 'Vilnius County', value: 'VI' },
      { label: 'Kaunas County', value: 'KA' },
      { label: 'Klaipėda County', value: 'KL' },
      { label: 'Panevėžys County', value: 'PA' },
      { label: 'Šiauliai County', value: 'SI' },
      { label: 'Tauragė County', value: 'TA' },
      { label: 'Telšiai County', value: 'TE' },
      { label: 'Utena County', value: 'UT' },
      { label: 'Marijampolė County', value: 'MA' },
      { label: 'Alytus County', value: 'AL' }
    ]
  },
  {
    label: 'Norway',
    value: 'NO',
    phoneSample: "+47 21 234567",
    states: [
      { value: '', label: 'Select State', disabled: true },
      { label: 'Oslo', value: 'OS' },
      { label: 'Rogaland', value: 'RO' },
      { label: 'Hordaland', value: 'HO' },
      { label: 'Akershus', value: 'AK' },
      { label: 'Oppland', value: 'OP' },
      { label: 'Hedmark', value: 'HE' },
      { label: 'Vestfold', value: 'VE' },
      { label: 'Buskerud', value: 'BU' },
      { label: 'Østfold', value: 'OSF' },
      { label: 'Telemark', value: 'TE' },
      { label: 'Nordland', value: 'NO' },
      { label: 'Troms', value: 'TR' },
      { label: 'Finnmark', value: 'FI' },
      { label: 'Sogn og Fjordane', value: 'SO' },
      { label: 'Møre og Romsdal', value: 'MR' },
      { label: 'Vest-Agder', value: 'VA' },
      { label: 'Sør-Trøndelag', value: 'ST' },
      { label: 'Nord-Trøndelag', value: 'NT' },
      { label: 'Østfold', value: 'OF' },
      { label: 'Aust-Agder', value: 'AA' }
    ]
  },
  {
    label: 'Poland',
    value: 'PL',
    phoneSample: "+48 12 3456789",
    states: [
      { value: '', label: 'Select State', disabled: true },
      { label: 'Lower Silesian Voivodeship', value: 'LS' },
      { label: 'Kuyavian-Pomeranian Voivodeship', value: 'KP' },
      { label: 'Lubusz Voivodeship', value: 'LV' },
      { label: 'Lublin Voivodeship', value: 'LN' },
      { label: 'Lodz Voivodeship', value: 'LO' },
      { label: 'Lesser Poland Voivodeship', value: 'LPL' },
      { label: 'Masovian Voivodeship', value: 'MV' },
      { label: 'Opole Voivodeship', value: 'OV' },
      { label: 'Podlaskie Voivodeship', value: 'PV' },
      { label: 'Pomeranian Voivodeship', value: 'PM' },
      { label: 'Subcarpathian Voivodeship', value: 'SV' },
      { label: 'Silesian Voivodeship', value: 'SV' },
      { label: 'Świętokrzyskie Voivodeship', value: 'SV' },
      { label: 'Warmian-Masurian Voivodeship', value: 'WM' },
      { label: 'West Pomeranian Voivodeship', value: 'WP' }
    ]
  },
  {
    label: 'Romania',
    value: 'RO',
    phoneSample: "+40 21 2345678",
    states: [
      { value: '', label: 'Select State', disabled: true },
      { label: 'Moldova', value: 'MO' },
      { label: 'Oltenia', value: 'OL' },
      { label: 'Dobruja', value: 'DOB' },
      { label: 'Muntenia', value: 'MUN' },
      { label: 'Banat', value: 'BAN' },
      { label: 'Crișana', value: 'CRI' },
      { label: 'Transylvania', value: 'TRA' }
    ]
  },
  {
    label: 'Slovakia',
    value: 'SK',
    phoneSample: "+421 2 12345678",
    states: [
      { value: '', label: 'Select State', disabled: true },
      { label: 'Bratislava Region', value: 'BR' },
      { label: 'Trnava Region', value: 'TN' },
      { label: 'Trenčín Region', value: 'TC' },
      { label: 'Nitra Region', value: 'NI' },
      { label: 'Žilina Region', value: 'ZI' },
      { label: 'Banská Bystrica Region', value: 'BB' },
      { label: 'Prešov Region', value: 'PV' },
      { label: 'Košice Region', value: 'KE' }
    ]
  },
  {
    label: 'Slovenia',
    value: 'SI',
    phoneSample: "+386 1 1234567",
    states: [
      { value: '', label: 'Select State', disabled: true },
      { label: 'Ajdovščina Municipality', value: 'AJ' },
      { label: 'Beltinci Municipality', value: 'BE' },
      { label: 'Bled Municipality', value: 'BL' },
      { label: 'Bovec Municipality', value: 'BO' },
      { label: 'Brda Municipality', value: 'BR' },
      { label: 'Brežice Municipality', value: 'BG' },
      { label: 'Celje Municipality', value: 'CE' },
      { label: 'Cerknica Municipality', value: 'CR' },
      { label: 'Črnomelj Municipality', value: 'CM' },
      { label: 'Domžale Municipality', value: 'DO' },
      { label: 'Dravograd Municipality', value: 'DV' },
      { label: 'Gorenja Vas–Poljane Municipality', value: 'GV' },
      { label: 'Hrastnik Municipality', value: 'HR' },
      { label: 'Hrpelje-Kozina Municipality', value: 'HK' },
      { label: 'Idrija Municipality', value: 'ID' },
      { label: 'Ig Municipality', value: 'IG' },
      { label: 'Ilirska Bistrica Municipality', value: 'IB' },
      { label: 'Ivančna Gorica Municipality', value: 'IG' },
      { label: 'Izola Municipality', value: 'IZ' },
      { label: 'Jesenice Municipality', value: 'JE' },
      { label: 'Kamnik Municipality', value: 'KA' },
      { label: 'Kanal ob Soči Municipality', value: 'KO' },
      { label: 'Kidričevo Municipality', value: 'KI' },
      { label: 'Kobarid Municipality', value: 'KO' },
      { label: 'Kobilje Municipality', value: 'KB' },
      { label: 'Komen Municipality', value: 'KM' },
      { label: 'Koper City Municipality', value: 'KC' },
      { label: 'Kostel Municipality', value: 'KO' },
      { label: 'Kranj City Municipality', value: 'KR' },
      { label: 'Kranjska Gora Municipality', value: 'KG' },
      { label: 'Krško Municipality', value: 'KR' },
      { label: 'Ljubljana City Municipality', value: 'LJ' },
      { label: 'Ljubno Municipality', value: 'LJ' },
      { label: 'Ljutomer Municipality', value: 'LJ' },
      { label: 'Log–Dragomer Municipality', value: 'LD' },
      { label: 'Logatec Municipality', value: 'LG' },
      { label: 'Loška Dolina Municipality', value: 'LD' },
      { label: 'Loški Potok Municipality', value: 'LP' },
      { label: 'Lukovica Municipality', value: 'LU' },
      { label: 'Makole Municipality', value: 'MA' },
      { label: 'Maribor City Municipality', value: 'MB' },
      { label: 'Markovci Municipality', value: 'MA' },
      { label: 'Medvode Municipality', value: 'ME' },
      { label: 'Mengeš Municipality', value: 'ME' },
      { label: 'Metlika Municipality', value: 'ME' },
      { label: 'Mežica Municipality', value: 'ME' },
      { label: 'Miren–Kostanjevica Municipality', value: 'MI' },
      { label: 'Mislinja Municipality', value: 'MI' },
      { label: 'Moravče Municipality', value: 'MO' },
      { label: 'Mozirje Municipality', value: 'MO' },
      { label: 'Municipality of Ig', value: 'IG' },
      { label: 'Murska Sobota City Municipality', value: 'MS' },
      { label: 'Muta Municipality', value: 'MU' },
      { label: 'Naklo Municipality', value: 'NA' },
      { label: 'Nazrače Municipality', value: 'NA' },
      { label: 'Nova Gorica City Municipality', value: 'NG' },
      { label: 'Novo Mesto City Municipality', value: 'NM' },
      { label: 'Odranci Municipality', value: 'OD' },
      { label: 'Oplotnica Municipality', value: 'OP' },
      { label: 'Ormož Municipality', value: 'OR' },
      { label: 'Osilnica Municipality', value: 'OS' },
      { label: 'Pesnica Municipality', value: 'PE' },
      { label: 'Piran Municipality', value: 'PI' },
      { label: 'Pivka Municipality', value: 'PI' },
      { label: 'Podčetrtek Municipality', value: 'PO' },
      { label: 'Podlehnik Municipality', value: 'PO' },
      { label: 'Podvelka Municipality', value: 'PO' },
      { label: 'Poljčane Municipality', value: 'PO' },
      { label: 'Polzela Municipality', value: 'PO' },
      { label: 'Postojna Municipality', value: 'PO' },
      { label: 'Prebold Municipality', value: 'PR' },
      { label: 'Preddvor Municipality', value: 'PR' },
      { label: 'Prevalje Municipality', value: 'PR' },
      { label: 'Ptuj City Municipality', value: 'PT' },
      { label: 'Puconci Municipality', value: 'PU' },
      { label: 'Rače–Fram Municipality', value: 'RA' },
      { label: 'Radeče Municipality', value: 'RA' },
      { label: 'Radenci Municipality', value: 'RA' },
      { label: 'Radlje ob Dravi Municipality', value: 'RA' },
      { label: 'Radovljica Municipality', value: 'RA' },
      { label: 'Ravne na Koroškem Municipality', value: 'RA' },
      { label: 'Razkrižje Municipality', value: 'RA' },
      { label: 'Rečica ob Savinji Municipality', value: 'RE' },
      { label: 'Renče–Vogrsko Municipality', value: 'RE' },
      { label: 'Ribnica Municipality', value: 'RI' },
      { label: 'Ribnica na Pohorju Municipality', value: 'RI' },
      { label: 'Rogaška Slatina Municipality', value: 'RO' },
      { label: 'Rogašovci Municipality', value: 'RO' },
      { label: 'Rogatec Municipality', value: 'RO' },
      { label: 'Ruše Municipality', value: 'RU' },
      { label: 'Semič Municipality', value: 'SE' },
      { label: 'Sežana Municipality', value: 'SE' },
      { label: 'Slovenj Gradec City Municipality', value: 'SL' },
      { label: 'Slovenska Bistrica Municipality', value: 'SL' },
      { label: 'Slovenske Konjice Municipality', value: 'SL' },
      { label: 'Šmarje pri Jelšah Municipality', value: 'SM' },
      { label: 'Šmartno ob Paki Municipality', value: 'SM' },
      { label: 'Šoštanj Municipality', value: 'SO' },
      { label: 'Starše Municipality', value: 'ST' },
      { label: 'Sveta Ana Municipality', value: 'SV' },
      { label: 'Sveta Trojica v Slovenskih Goricah Municipality', value: 'ST' },
      { label: 'Sveti Andraž v Slovenskih Goricah Municipality', value: 'SV' },
      { label: 'Sveti Jurij ob Ščavnici Municipality', value: 'SJ' },
      { label: 'Sveti Jurij v Slovenskih Goricah Municipality', value: 'SJ' },
      { label: 'Sveti Tomaž Municipality', value: 'ST' },
      { label: 'Tolmin Municipality', value: 'TO' },
      { label: 'Trbovlje Municipality', value: 'TR' },
      { label: 'Trebnje Municipality', value: 'TR' },
      { label: 'Trnovska Vas Municipality', value: 'TV' },
      { label: 'Tržič Municipality', value: 'TR' },
      { label: 'Turnišče Municipality', value: 'TU' },
      { label: 'Velenje Municipality', value: 'VE' },
      { label: 'Velika Polana Municipality', value: 'VP' },
      { label: 'Velike Lašče Municipality', value: 'VL' },
      { label: 'Veržej Municipality', value: 'VE' },
      { label: 'Videm Municipality', value: 'VI' },
      { label: 'Vipava Municipality', value: 'VI' },
      { label: 'Vitanje Municipality', value: 'VI' },
      { label: 'Vodice Municipality', value: 'VO' },
      { label: 'Vojnik Municipality', value: 'VO' },
      { label: 'Vransko Municipality', value: 'VR' },
      { label: 'Vrhnika Municipality', value: 'VR' },
      { label: 'Vuzenica Municipality', value: 'VU' },
      { label: 'Zagorje ob Savi Municipality', value: 'ZA' },
      { label: 'Zavrč Municipality', value: 'ZA' },
      { label: 'Zreče Municipality', value: 'ZR' },
      { label: 'Žalec Municipality', value: 'ZA' },
      { label: 'Železniki Municipality', value: 'ZE' },
      { label: 'Žetale Municipality', value: 'ZE' },
      { label: 'Žiri Municipality', value: 'ZR' },
      { label: 'Žirovnica Municipality', value: 'ZI' },
      { label: 'Žužemberk Municipality', value: 'ZU' }
    ]
  },
  {
    label: 'Switzerland',
    value: 'CH',
    phoneSample: "+41 21 2345678",
    states: [
      { value: '', label: 'Select State', disabled: true },
      { label: 'Aargau', value: 'AG' },
      { label: 'Appenzell Innerrhoden', value: 'AI' },
      { label: 'Appenzell Ausserrhoden', value: 'AR' },
      { label: 'Bern', value: 'BE' },
      { label: 'Basel-Landschaft', value: 'BL' },
      { label: 'Basel-Stadt', value: 'BS' },
      { label: 'Fribourg', value: 'FR' },
      { label: 'Geneva', value: 'GE' },
      { label: 'Glarus', value: 'GL' },
      { label: 'Graubünden', value: 'GR' },
      { label: 'Jura', value: 'JU' },
      { label: 'Lucerne', value: 'LU' },
      { label: 'Neuchâtel', value: 'NE' },
      { label: 'Nidwalden', value: 'NW' },
      { label: 'Obwalden', value: 'OW' },
      { label: 'Schaffhausen', value: 'SH' },
      { label: 'Schwyz', value: 'SZ' },
      { label: 'Solothurn', value: 'SO' },
      { label: 'St. Gallen', value: 'SG' },
      { label: 'Thurgau', value: 'TG' },
      { label: 'Ticino', value: 'TI' },
      { label: 'Uri', value: 'UR' },
      { label: 'Vaud', value: 'VD' },
      { label: 'Valais', value: 'VS' },
      { label: 'Zug', value: 'ZG' },
      { label: 'Zurich', value: 'ZH' }
    ]
  },
  
];

export interface FormData {
  name: string;
  phone: string;
  country: string;
  state: string;
  lineAddress1: string;
  lineAddress2?: string;
  city: string;
  zip: string;
}
export const formDataInitialState = {
  name: '',
  phone: '',
  country: '',
  state: '',
  lineAddress1: '',
  lineAddress2: '',
  city: '',
  zip: ''
}