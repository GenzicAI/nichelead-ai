export type NicheKey = 'trainer' | 'esthetician' | 'roofing' | 'realtor'
export type StageKey = 'new' | 'qualified' | 'contacted' | 'converted'

export interface StatItem { label: string; value: string; iconName: string }
export interface FilterGroup { name: string; options: string[] }
export interface Template { title: string; channel: 'email' | 'sms'; subject: string; body: string }
export interface AiFactor { label: string; pct: number }
export interface Lead {
  name: string
  score: number
  location: string
  timeAgo: string
  description: string
  stage: StageKey
  tags: string[]
  aiFactors: AiFactor[]
  urgency?: string
  type?: string
}
export interface NicheConfig {
  key: NicheKey
  label: string
  short: string
  description: string
  iconName: string
  accent: string
  stats: StatItem[]
  filters: FilterGroup[]
  templates: Template[]
}

// ── Lead generation helpers ───────────────────────────────
// Esthetician: 24 leads generated to match original
const estLeads = (): Lead[] => {
  const names = [
    'Ava Okafor','Ava Greene','Ava Park','Ava Coleman',
    'Ava Brooks','Ava Sullivan','Ava Foster','Ava Flores',
    'Ava Brooks','Ava Nguyen','Ava Foster','Ava Sato',
    'Ava Patel','Ava Reyes','Ava Diaz','Ava Sato',
    'Ava Hughes','Ava Carter','Ava Murphy','Ava Bennett',
    'Ava Rivera','Ava Carter','Ava Khan','Ava Coleman',
  ]
  const locations = [
    'Denver, CO','Phoenix, AZ','Boise, ID','Mesa, AZ',
    'Mesa, AZ','Plano, TX','Phoenix, AZ','Nashville, TN',
    'Charlotte, NC','Plano, TX','Henderson, NV','Frisco, TX',
    'Frisco, TX','Columbus, OH','Columbus, OH','Sacramento, CA',
    'Frisco, TX','Austin, TX','Tampa, FL','Tampa, FL',
    'Raleigh, NC','Raleigh, NC','Boise, ID','Tampa, FL',
  ]
  const times = [
    '5h ago','1h ago','5h ago','1h ago',
    '2m ago','Yesterday','2d ago','Today',
    '3h ago','Today','3h ago','18m ago',
    '2d ago','2m ago','Yesterday','5h ago',
    'Today','3h ago','1h ago','2m ago',
    '18m ago','2d ago','Today','Yesterday',
  ]
  const descs = [
    'Interested in a dermaplaning to address redness.',
    'Interested in a facial to address dry skin.',
    'Interested in a microdermabrasion to address redness.',
    'Interested in a dermaplaning to address aging / fine lines.',
    'Interested in a lash lift to address dull skin.',
    'Interested in a chemical peel to address dry skin.',
    'Interested in a facial to address redness.',
    'Interested in a lash lift to address aging / fine lines.',
    'Interested in a chemical peel to address dull skin.',
    'Interested in a facial to address aging / fine lines.',
    'Interested in a lash lift to address redness.',
    'Interested in a chemical peel to address dry skin.',
    'Interested in a microdermabrasion to address dull skin.',
    'Interested in a lash lift to address aging / fine lines.',
    'Interested in a chemical peel to address redness.',
    'Interested in a dermaplaning to address dry skin.',
    'Interested in a lash lift to address redness.',
    'Interested in a microdermabrasion to address aging / fine lines.',
    'Interested in a dermaplaning to address dull skin.',
    'Interested in a facial to address dry skin.',
    'Interested in a microdermabrasion to address redness.',
    'Interested in a dermaplaning to address aging / fine lines.',
    'Interested in a facial to address dull skin.',
    'Interested in a microdermabrasion to address aging / fine lines.',
  ]
  const tagSets = [
    ['Redness','Dermaplaning','Millennial'],
    ['Dry Skin','Facial','Gen X'],
    ['Redness','Microdermabrasion','Bridal'],
    ['Aging / Fine Lines','Dermaplaning','New Mom'],
    ['Dull Skin','Lash Lift','Millennial'],
    ['Dry Skin','Chemical Peel','Bridal'],
    ['Redness','Facial','Bridal'],
    ['Aging / Fine Lines','Lash Lift','Gen Z'],
    ['Dull Skin','Chemical Peel','Millennial'],
    ['Aging / Fine Lines','Facial','Gen X'],
    ['Redness','Lash Lift','Bridal'],
    ['Dry Skin','Chemical Peel','Gen Z'],
    ['Dull Skin','Microdermabrasion','Millennial'],
    ['Aging / Fine Lines','Lash Lift','Gen X'],
    ['Redness','Chemical Peel','Bridal'],
    ['Dry Skin','Dermaplaning','Gen Z'],
    ['Redness','Lash Lift','Gen Z'],
    ['Aging / Fine Lines','Microdermabrasion','Gen X'],
    ['Dull Skin','Dermaplaning','New Mom'],
    ['Dry Skin','Facial','Gen Z'],
    ['Redness','Microdermabrasion','Millennial'],
    ['Aging / Fine Lines','Dermaplaning','Gen X'],
    ['Dull Skin','Facial','New Mom'],
    ['Aging / Fine Lines','Microdermabrasion','New Mom'],
  ]
  const stages: StageKey[] = [
    'qualified','qualified','qualified','qualified',
    'contacted','contacted','contacted','contacted',
    'contacted','contacted','contacted','new',
    'new','new','new','new',
    'new','new','new','new',
    'new','new','new','new',
  ]
  const scores = [97,94,91,88, 85,82,79,77, 75,73,71,69, 67,65,63,61, 59,57,55,53, 51,49,47,45]

  return names.map((name, i) => ({
    name,
    score: scores[i],
    location: locations[i],
    timeAgo: times[i],
    description: descs[i],
    stage: stages[i],
    tags: tagSets[i],
    aiFactors: [
      { label: 'Timeline urgency',      pct: Math.max(20, scores[i] - 9) },
      { label: 'Engagement intent',     pct: Math.max(20, scores[i] - 21) },
      { label: 'Profile completeness',  pct: Math.max(20, scores[i] - 27) },
      { label: 'Channel responsiveness',pct: Math.max(20, scores[i] - 39) },
      { label: 'Budget fit',            pct: Math.max(20, scores[i] - 45) },
    ],
  }))
}

// Trainer: 20 leads
const trainerLeads = (): Lead[] => {
  const names = [
    'Jordan Reyes','Mia Chen','Devon Pratt','Sara Okafor',
    'Chris Lee','Tara Smith','Marcus Hall','Priya Nair',
    'Jake Torres','Amy Kim','Ben Ortiz','Lily Shah',
    'Ryan Clark','Emma Davis','Noah Brown','Zoe Wilson',
    'Liam Jones','Chloe White','Ethan Moore','Ava Taylor',
  ]
  const locations = [
    'Austin, TX','Round Rock, TX','Cedar Park, TX','Austin, TX',
    'Pflugerville, TX','Georgetown, TX','Kyle, TX','Buda, TX',
    'Leander, TX','Austin, TX','Round Rock, TX','Cedar Park, TX',
    'Austin, TX','Pflugerville, TX','Georgetown, TX','Kyle, TX',
    'Buda, TX','Leander, TX','Austin, TX','Round Rock, TX',
  ]
  const times = [
    '3h ago','1h ago','6h ago','12h ago',
    '2h ago','4h ago','Yesterday','2d ago',
    '5h ago','Today','8h ago','3h ago',
    '1h ago','Yesterday','2h ago','4h ago',
    '6h ago','Today','2m ago','18m ago',
  ]
  const descs = [
    'Searched "online coach" 3× this week. Focused on weight loss and strength.',
    'Recently joined a local running group. Looking for postpartum mobility support.',
    'Signed up for a 10k in March. Needs structured marathon prep coaching.',
    'Asked about low-impact mobility training for chronic back pain.',
    'Wants to lose 20 lbs before summer. Searching for a certified trainer.',
    'New mom looking for postpartum fitness and core recovery program.',
    'Competitive cyclist adding strength training to improve race performance.',
    'Searching for a trainer for HIIT and nutrition coaching near Austin.',
    'Recently diagnosed pre-diabetic, looking for low-impact exercise guidance.',
    'Training for first triathlon, needs swim-bike-run periodization help.',
    'Retired athlete returning to fitness after 5-year break.',
    'Yoga practitioner adding strength training to routine.',
    'College student looking for affordable online coaching for muscle gain.',
    'Busy executive seeking 30-min daily home workout plans.',
    'Looking for senior-friendly strength training program.',
    'Postpartum mom wanting to regain core strength safely.',
    'Searching for accountability partner and certified coach for fat loss.',
    'Wants to prep for a local 5k race in 8 weeks.',
    'Former athlete recovering from knee injury, needs rehab-friendly program.',
    'First-time gym-goer overwhelmed by options, wants structured beginner plan.',
  ]
  const tagSets = [
    ['Weight loss','Strength'],['Postpartum','Mobility'],['Marathon prep','Running'],['Mobility','Low-impact'],
    ['Weight loss','HIIT'],['Postpartum','Core'],['Strength','Cycling'],['HIIT','Nutrition'],
    ['Low-impact','Medical'],['Triathlon','Endurance'],['Strength','Return-to-fitness'],['Yoga','Strength'],
    ['Muscle gain','Online'],['Home workout','Busy exec'],['Senior fitness','Strength'],['Postpartum','Core'],
    ['Fat loss','Accountability'],['5k prep','Running'],['Injury rehab','Knee'],['Beginner','Structure'],
  ]
  const stages: StageKey[] = [
    'qualified','qualified','contacted','new',
    'qualified','qualified','contacted','contacted',
    'new','new','contacted','new',
    'new','new','new','new',
    'new','new','new','new',
  ]
  const scores = [92,81,74,66,89,85,78,75,70,68,65,63,61,59,57,55,53,51,49,47]

  return names.map((name, i) => ({
    name, score: scores[i], location: locations[i], timeAgo: times[i],
    description: descs[i], stage: stages[i], tags: tagSets[i],
    aiFactors: [
      { label: 'Search intent',    pct: Math.max(20, scores[i] - 2) },
      { label: 'Location match',   pct: Math.max(20, scores[i] + 3) > 99 ? 97 : scores[i] + 3 },
      { label: 'Goal alignment',   pct: Math.max(20, scores[i] - 10) },
      { label: 'Engagement',       pct: Math.max(20, scores[i] - 17) },
      { label: 'Budget fit',       pct: Math.max(20, scores[i] - 27) },
    ],
  }))
}

// Roofing: 18 leads
const roofingLeads = (): Lead[] => {
  const addresses = [
    '412 Maple Dr','27 Birch Ln','9 Oakridge Ct','55 Elm St',
    '301 Cedar Ave','88 Pinecrest Blvd','14 Walnut Way','7 Cypress Ct',
    '230 Spruce St','66 Aspen Dr','118 Magnolia Ln','45 Willow Rd',
    '500 Oak Blvd','33 Chestnut Ave','77 Redwood Ct','21 Sycamore Dr',
    '409 Hickory Ln','62 Poplar St',
  ]
  const locations = [
    'Cedar Park, TX','Leander, TX','Austin, TX','Round Rock, TX',
    'Pflugerville, TX','Georgetown, TX','Kyle, TX','Buda, TX',
    'Cedar Park, TX','Leander, TX','Austin, TX','Round Rock, TX',
    'Pflugerville, TX','Georgetown, TX','Kyle, TX','Buda, TX',
    'Cedar Park, TX','Austin, TX',
  ]
  const times = [
    '2h ago','4h ago','1d ago','3h ago',
    '1h ago','5h ago','2d ago','Yesterday',
    '6h ago','2m ago','Today','18m ago',
    '3h ago','2d ago','1h ago','Yesterday',
    '4h ago','Today',
  ]
  const urgencies = [
    'Emergency','This month','Researching','Emergency',
    'This month','Emergency','Researching','This month',
    'Emergency','Researching','This month','Emergency',
    'Researching','This month','Emergency','Researching',
    'This month','Emergency',
  ]
  const descs = [
    '18-yr roof hit by hail. Visible shingle damage and potential leak confirmed.',
    'Two shingles missing after wind. Requesting urgent estimate this week.',
    '9-yr-old roof. Homeowner researching general replacement options.',
    'Post-storm inspection needed. Gutters damaged and flashing lifted.',
    'Leak reported in master bedroom after last week\'s rain event.',
    'Emergency — large tree branch fell on carport section of roof.',
    'Planning a full reroof next quarter, getting 3 estimates.',
    'HOA flagged missing shingles. Owner needs repair before month-end.',
    'Hail damage documented by neighbor, requesting free inspection.',
    'Aging 22-yr-old roof, insurance renewal may require replacement.',
    '15-yr-old roof with visible granule loss, gutters sagging.',
    'Storm damage reported. Insurance adjuster scheduled for this week.',
    'Homeowner comparing quotes for full tear-off and replacement.',
    'Flashing around chimney leaking into attic. Needs prompt repair.',
    'Emergency — soffit damage after strong winds last night.',
    'Researching metal roof upgrade to improve energy efficiency.',
    'Multiple soft spots detected during inspection. Replace recommended.',
    'Storm claim opened with insurance. Needs contractor before deadline.',
  ]
  const stages: StageKey[] = [
    'new','qualified','new','new',
    'qualified','new','new','contacted',
    'new','new','contacted','new',
    'new','contacted','new','new',
    'qualified','new',
  ]
  const scores = [90,78,64,87,82,91,60,75,85,58,72,88,62,70,89,55,76,86]

  return addresses.map((name, i) => ({
    name, score: scores[i], location: locations[i], timeAgo: times[i],
    description: descs[i], stage: stages[i], urgency: urgencies[i],
    tags: [urgencies[i]], // urgency as primary tag
    aiFactors: [
      { label: 'Damage severity',      pct: Math.max(20, scores[i] - 0) > 99 ? 98 : scores[i] },
      { label: 'Property age',         pct: Math.max(20, scores[i] - 5) },
      { label: 'Urgency signal',       pct: Math.max(20, scores[i] + 2) > 99 ? 97 : scores[i] + 2 },
      { label: 'Contact response',     pct: Math.max(20, scores[i] - 20) },
      { label: 'Insurance likelihood', pct: Math.max(20, scores[i] - 12) },
    ],
  }))
}

// Realtor: 16 leads
const realtorLeads = (): Lead[] => {
  const names = [
    'Priya & Sam Nair','Marcus Hill','Greenfield Parcel','Sarah Johnson',
    'Tom & Lee Martinez','Kim Park','Sunset Acres (8ac)','David Chen',
    'Rachel & Mike Green','Westlake Lot','Ana Torres','James Wright',
    'The Patel Family','Oak Hill Tract','Nina Okafor','Carlos Rivera',
  ]
  const types = [
    'Buyer','Seller','Land','Buyer',
    'Buyer','Seller','Land','Buyer',
    'Buyer','Land','Seller','Seller',
    'Buyer','Land','Seller','Buyer',
  ]
  const locations = [
    'Austin, TX','Round Rock, TX','Leander, TX','Cedar Park, TX',
    'Georgetown, TX','Pflugerville, TX','Kyle, TX','Buda, TX',
    'Austin, TX','Cedar Park, TX','Round Rock, TX','Leander, TX',
    'Georgetown, TX','Pflugerville, TX','Austin, TX','Kyle, TX',
  ]
  const times = [
    '2h ago','5h ago','1d ago','3h ago',
    '1h ago','Yesterday','2d ago','4h ago',
    '2m ago','Today','6h ago','18m ago',
    '3h ago','Yesterday','1h ago','2d ago',
  ]
  const descs = [
    'Pre-approved buyers actively touring homes in the $600k–$1M range every weekend.',
    'Comparing agents, ready to list $450k home within 1–3 months.',
    '12-acre land parcel with development potential. Owner open to offers above $1M.',
    'First-time buyer pre-approved at $350k. Wants 3-bed home near Cedar Park schools.',
    'Relocating from California. Seeking $800k+ home with home office and pool.',
    'Downsizing after kids left home. 4-bed $520k home, needs quick close.',
    '8-acre rural lot, owner motivated to sell, zoned ag/residential.',
    'Investor looking for duplex or small multifamily under $500k.',
    'Growing family needs 5-bed home in top school district. Budget $750k.',
    '2-acre lake-view lot, rare opportunity, owner entertaining offers.',
    'Estate sale — 3-bed home needs TLC. Priced to sell at $280k.',
    'Military relocation, must sell 4-bed home within 45 days.',
    'Family of 6 pre-approved at $950k, needs large home near Georgetown.',
    '5-acre tract ideal for custom build. Owner open to financing.',
    'Inherited property, wants clean sale with minimal hassle.',
    'Young couple pre-approved at $425k, searching Kyle/Buda area.',
  ]
  const stages: StageKey[] = [
    'qualified','contacted','new','qualified',
    'qualified','new','new','contacted',
    'qualified','new','new','contacted',
    'new','new','contacted','new',
  ]
  const scores = [93,80,72,88,86,75,68,82,89,70,65,78,84,66,74,71]

  return names.map((name, i) => ({
    name, score: scores[i], location: locations[i], timeAgo: times[i],
    description: descs[i], stage: stages[i], type: types[i],
    tags: [types[i]],
    aiFactors: [
      { label: 'Purchase timeline',   pct: Math.max(20, scores[i] + 2) > 99 ? 97 : scores[i] + 2 },
      { label: 'Financial readiness', pct: Math.max(20, scores[i] - 3) },
      { label: 'Engagement level',    pct: Math.max(20, scores[i] - 5) },
      { label: 'Area match',          pct: Math.max(20, scores[i] - 11) },
      { label: 'Budget fit',          pct: Math.max(20, scores[i] - 8) },
    ],
  }))
}

export const NICHES: Record<NicheKey, NicheConfig> = {
  trainer: {
    key: 'trainer', label: 'Personal Trainer', short: 'Trainer',
    description: 'Find clients chasing weight loss, strength, and mobility goals near you.',
    iconName: 'Dumbbell', accent: '#EA580C',
    stats: [
      { label: 'Leads Found',  value: '248', iconName: 'Search' },
      { label: 'Qualified',    value: '112', iconName: 'Target' },
      { label: 'Contacted',    value: '67',  iconName: 'Send' },
      { label: 'Converted',    value: '21',  iconName: 'Flame' },
    ],
    filters: [
      { name: 'Location', options: ['Austin, TX', 'Within 10 mi', 'Within 25 mi'] },
      { name: 'Age', options: ['18–29', '30–44', '45–59', '60+'] },
      { name: 'Fitness Goal', options: ['Weight loss', 'Strength', 'Mobility', 'Marathon prep', 'Postpartum'] },
    ],
    templates: [
      {
        title: 'First touch', channel: 'email',
        subject: '{{name}}, free starter week for {{goal}}?',
        body: 'Hi {{name}},\n\nI saw you\'re working toward {{goal}}. I help clients in {{city}} hit exactly that with a simple 3-day plan.\n\nWant me to send you a free starter week — no strings attached?\n\nWarmly,',
      },
      {
        title: 'Free assessment', channel: 'email',
        subject: '{{name}} — free 20-min movement assessment',
        body: 'Hey {{name}},\n\nI\'m offering a free 20-min movement assessment this week. No pitch — just a clear read on where to start and what\'ll get you results fastest.\n\nOpen Thursday or Saturday?\n\nBest,',
      },
      {
        title: 'Re-engage', channel: 'sms',
        subject: '',
        body: '{{name}}, still working on {{goal}}? I just opened 2 coaching spots for next month. First session\'s on me if you want to test the fit. — [Your name]',
      },
    ],
  },
  esthetician: {
    key: 'esthetician', label: 'Esthetician', short: 'Esthetician',
    description: 'Book skin consults and facials with leads matched by concern and service.',
    iconName: 'Sparkles', accent: '#DB2777',
    stats: [
      { label: 'Leads Found',         value: '24',     iconName: 'Search' },
      { label: 'Appointments Booked', value: '0',      iconName: 'CalendarCheck' },
      { label: 'Revenue Generated',   value: '$18,450', iconName: 'DollarSign' },
    ],
    filters: [
      { name: 'Skin Concern', options: ['Redness', 'Dry Skin', 'Aging / Fine Lines', 'Dull Skin', 'Acne'] },
      { name: 'Service', options: ['Facial', 'Chemical Peel', 'Microdermabrasion', 'Dermaplaning', 'Lash Lift'] },
      { name: 'Demographic', options: ['Gen Z', 'Millennial', 'Gen X', 'New Mom', 'Bridal'] },
    ],
    templates: [
      {
        title: 'Complimentary Skin Consult', channel: 'email',
        subject: '{{name}}, let\'s clear up that {{concern}} ✨',
        body: 'Hi {{name}},\n\nI specialize in treating {{concern}} and I\'d love to offer you a complimentary skin consultation. We\'ll build a custom plan and I\'ll recommend the right {{service}} for your goals.\n\nWhich day this week works for you?\n\nWarmly,',
      },
      {
        title: 'New Client Promo', channel: 'email',
        subject: '{{name}} — 20% off your first {{service}}',
        body: 'Hey {{name}} ✨\n\nFirst-time clients get 20% off their first {{service}}. I have limited spots this week and would love to hold one for you.\n\nJust reply and we\'ll get you scheduled!\n\nBest,',
      },
      {
        title: 'Booking Reminder', channel: 'sms',
        subject: '',
        body: '{{name}}, this is a quick reminder about your upcoming {{service}} appointment. Reply YES to confirm or let me know a better time. Looking forward to seeing you! ✨',
      },
    ],
  },
  roofing: {
    key: 'roofing', label: 'Roofing Contractor', short: 'Roofing',
    description: 'Catch storm and damage leads the moment urgency hits, ranked by AI score.',
    iconName: 'Home', accent: '#4F46E5',
    stats: [
      { label: 'Leads Found', value: '97', iconName: 'Search' },
      { label: 'Quotes Sent', value: '41', iconName: 'FileText' },
      { label: 'Jobs Won',    value: '13', iconName: 'ShieldCheck' },
    ],
    filters: [
      { name: 'Urgency', options: ['Emergency', 'This month', 'Researching'] },
      { name: 'Damage Type', options: ['Storm/hail', 'Missing shingles', 'Leak', 'Wear', 'Flashing'] },
      { name: 'Roof Age', options: ['0–10 yrs', '11–20 yrs', '20+ yrs'] },
    ],
    templates: [
      {
        title: 'Free inspection', channel: 'email',
        subject: '{{name}} — free roof inspection after the storm',
        body: 'Hi,\n\nWe noticed homes on {{street}} took storm damage recently. We offer free, no-obligation roof inspections — and if there\'s damage, we\'ll document it for your insurance claim.\n\nCan we swing by this week?\n\nBest,',
      },
      {
        title: 'Insurance assist', channel: 'email',
        subject: 'Your insurance may cover most of the repair',
        body: 'Hi,\n\nIf your roof was hit in the last storm, your insurance may cover most or all of the repair. We handle the claim paperwork alongside you so you\'re not navigating it alone.\n\nWant a quick walkthrough — no cost, no commitment?\n\nBest,',
      },
      {
        title: 'Quote follow-up', channel: 'sms',
        subject: '',
        body: 'Hi — following up on your roof quote. The estimate holds through end of month. Happy to answer any questions or get the crew scheduled. Just reply here!',
      },
    ],
  },
  realtor: {
    key: 'realtor', label: 'Realtor', short: 'Realtor',
    description: 'Surface buyers, sellers, and land leads sorted by budget and timeline.',
    iconName: 'Building2', accent: '#059669',
    stats: [
      { label: 'Buyers',     value: '64', iconName: 'Users' },
      { label: 'Sellers',    value: '38', iconName: 'Home' },
      { label: 'Land Deals', value: '9',  iconName: 'MapPin' },
    ],
    filters: [
      { name: 'Type', options: ['Buy', 'Sell', 'Land'] },
      { name: 'Budget', options: ['< $300k', '$300k–$600k', '$600k–$1M', '$1M+'] },
      { name: 'Timeline', options: ['ASAP', '1–3 months', '3–6 months', 'Just looking'] },
    ],
    templates: [
      {
        title: 'Buyer consult', channel: 'email',
        subject: '{{name}} — off-market listings in {{area}}',
        body: 'Hi {{name}},\n\nI can send you off-market listings in {{area}} that fit your {{budget}} range before they hit Zillow. Want to grab 15 min this week to map your search?\n\nBest,',
      },
      {
        title: 'Seller valuation', channel: 'email',
        subject: '{{name}} — free home valuation (no obligation)',
        body: 'Hi {{name}},\n\nHomes near you are selling fast and often above asking. I\'d love to send a free, no-pressure valuation of your property — accurate to within 1–2%.\n\nCould I drop it by email today?\n\nBest,',
      },
      {
        title: 'Land outreach', channel: 'sms',
        subject: '',
        body: 'Hi {{name}}, I work with buyers actively seeking land in {{area}}. If you\'ve considered selling your parcel, I may already have a match. Worth a 10-min call? — [Your name]',
      },
    ],
  },
}

export const LEADS: Record<NicheKey, Lead[]> = {
  esthetician: estLeads(),
  trainer: trainerLeads(),
  roofing: roofingLeads(),
  realtor: realtorLeads(),
}
