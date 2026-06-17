export type NicheKey = 'trainer' | 'esthetician' | 'roofing' | 'realtor'

export interface StatItem { label: string; value: string; delta: string; iconName: string }
export interface FilterGroup { name: string; options: string[] }
export interface Template { title: string; body: string }
export interface AiFactor { label: string; pct: number }
export interface Lead {
  name: string
  score: number
  sub: string
  location: string
  timeAgo: string
  description: string
  stage: 'new' | 'qualified' | 'contacted' | 'converted'
  tags: string[]
  note: string
  action: string
  aiFactors: AiFactor[]
  img?: [string, string]
  urgency?: string
  type?: string
}
export interface NicheConfig {
  key: NicheKey; label: string; short: string; description: string
  iconName: string; accent: string; soft: string
  stats: StatItem[]; filters: FilterGroup[]
  templates: Template[]
}

export const NICHES: Record<NicheKey, NicheConfig> = {
  trainer: {
    key: 'trainer', label: 'Personal Trainer', short: 'Trainer',
    description: 'Find clients chasing weight loss, strength, and mobility goals near you.',
    iconName: 'Dumbbell', accent: '#EA580C', soft: '#FFEDD5',
    stats: [
      { label: 'Leads Found', value: '248', delta: '+34', iconName: 'Search' },
      { label: 'Qualified', value: '112', delta: '+18', iconName: 'Target' },
      { label: 'Contacted', value: '67', delta: '+9', iconName: 'Send' },
      { label: 'Converted', value: '21', delta: '+4', iconName: 'Flame' },
    ],
    filters: [
      { name: 'Location', options: ['Austin, TX', 'Within 10 mi', 'Within 25 mi'] },
      { name: 'Age', options: ['18–29', '30–44', '45–59', '60+'] },
      { name: 'Fitness Goal', options: ['Weight loss', 'Strength', 'Mobility', 'Marathon prep', 'Postpartum'] },
    ],
    templates: [
      { title: 'First touch', body: 'Hi {{name}} — saw you\'re working toward {{goal}}. I help clients in {{city}} hit that with a simple 3-day plan. Want me to send a free starter week?' },
      { title: 'Free assessment', body: 'Hey {{name}}, I\'m offering a free 20-min movement assessment this week. No pitch — just a clear read on where to start. Open Thursday or Saturday?' },
      { title: 'Re-engage', body: '{{name}}, still chasing {{goal}}? I just opened 2 coaching spots for July. First session\'s on me if you want to test the fit.' },
    ],
  },
  esthetician: {
    key: 'esthetician', label: 'Esthetician', short: 'Esthetician',
    description: 'Book skin consults and facials with leads matched by concern and service.',
    iconName: 'Sparkles', accent: '#DB2777', soft: '#FCE7F3',
    stats: [
      { label: 'Leads Found', value: '186', delta: '+22', iconName: 'Search' },
      { label: 'Appointments Booked', value: '54', delta: '+11', iconName: 'CalendarCheck' },
      { label: 'Revenue Generated', value: '$18,450', delta: '+$2.1k', iconName: 'DollarSign' },
    ],
    filters: [
      { name: 'Skin Concern', options: ['Acne', 'Anti-aging', 'Hyperpigmentation', 'Rosacea', 'Texture'] },
      { name: 'Service Type', options: ['Facial', 'Chemical peel', 'Microneedling', 'Dermaplaning', 'Consultation'] },
      { name: 'Demographic', options: ['18–24', '25–34', '35–44', '45+'] },
    ],
    templates: [
      { title: 'Complimentary Skin Consult', body: 'Hi {{name}}! I\'d love to build a custom plan for your {{concern}}. I have complimentary skin consults open this week — would a morning or evening slot suit you better?' },
      { title: 'New Client Promo', body: 'Hey {{name}} ✨ First-time clients get 20% off their first {{service}}. Want me to hold a spot for you this week?' },
      { title: 'Booking Reminder', body: '{{name}}, lovely chatting today! Here\'s the {{service}} plan we discussed. Ready to book your first session? I have openings Thursday and Friday.' },
    ],
  },
  roofing: {
    key: 'roofing', label: 'Roofing Contractor', short: 'Roofing',
    description: 'Catch storm and damage leads the moment urgency hits, ranked by AI score.',
    iconName: 'Home', accent: '#4F46E5', soft: '#E0E7FF',
    stats: [
      { label: 'Leads Found', value: '97', delta: '+15', iconName: 'Search' },
      { label: 'Quotes Sent', value: '41', delta: '+8', iconName: 'FileText' },
      { label: 'Jobs Won', value: '13', delta: '+3', iconName: 'ShieldCheck' },
    ],
    filters: [
      { name: 'Roof Age', options: ['0–5 yrs', '6–12 yrs', '13–20 yrs', '20+ yrs'] },
      { name: 'Damage Type', options: ['Storm/hail', 'Missing shingles', 'Leak', 'Wear', 'Flashing'] },
      { name: 'Urgency', options: ['Emergency', 'This month', 'This quarter', 'Researching'] },
    ],
    templates: [
      { title: 'Free inspection', body: 'Hi {{name}}, we noticed homes on {{street}} took storm damage recently. We offer free, no-obligation roof inspections — can we swing by this week?' },
      { title: 'Insurance assist', body: '{{name}}, if your roof was hit in the last storm, your insurance may cover most of the repair. We handle the claim paperwork with you. Want a quick walkthrough?' },
      { title: 'Quote follow-up', body: 'Hi {{name}}, following up on your roof quote. The estimate holds through end of month. Happy to answer any questions or schedule the crew.' },
    ],
  },
  realtor: {
    key: 'realtor', label: 'Realtor', short: 'Realtor',
    description: 'Surface buyers, sellers, and land leads sorted by budget and timeline.',
    iconName: 'Building2', accent: '#059669', soft: '#D1FAE5',
    stats: [
      { label: 'Buyers', value: '64', delta: '+12', iconName: 'Users' },
      { label: 'Sellers', value: '38', delta: '+6', iconName: 'Home' },
      { label: 'Land Deals', value: '9', delta: '+2', iconName: 'MapPin' },
    ],
    filters: [
      { name: 'Type', options: ['Buy', 'Sell', 'Land'] },
      { name: 'Budget', options: ['< $300k', '$300k–$600k', '$600k–$1M', '$1M+'] },
      { name: 'Timeline', options: ['ASAP', '1–3 months', '3–6 months', 'Just looking'] },
    ],
    templates: [
      { title: 'Buyer consult', body: 'Hi {{name}}, I can send you off-market listings in {{area}} that fit your {{budget}} range. Want to grab 15 min this week to map your search?' },
      { title: 'Seller valuation', body: '{{name}}, homes near you are selling fast. I\'d love to send a free, no-pressure valuation of your property. Could I drop it by email today?' },
      { title: 'Land outreach', body: 'Hi {{name}}, I work with buyers actively seeking land in {{area}}. If you\'ve considered selling your parcel, I may already have a match.' },
    ],
  },
}

export const LEADS: Record<NicheKey, Lead[]> = {
  trainer: [
    {
      name: 'Jordan Reyes', score: 92, sub: '32 · Austin, TX',
      location: 'Austin, TX', timeAgo: '3h ago',
      description: 'Searching for an online coach to help with weight loss and strength training. Searched "online coach" 3× this week.',
      stage: 'qualified', tags: ['Weight loss', 'Strength'], note: 'Searched "online coach" 3× this week', action: 'Message',
      aiFactors: [
        { label: 'Search intent', pct: 90 }, { label: 'Location match', pct: 88 },
        { label: 'Goal alignment', pct: 82 }, { label: 'Engagement', pct: 75 }, { label: 'Budget fit', pct: 65 },
      ],
    },
    {
      name: 'Mia Chen', score: 81, sub: '27 · Round Rock',
      location: 'Round Rock, TX', timeAgo: '1h ago',
      description: 'Recently joined a local running group and looking for postpartum fitness and mobility support.',
      stage: 'qualified', tags: ['Postpartum', 'Mobility'], note: 'Joined a local running group', action: 'Message',
      aiFactors: [
        { label: 'Search intent', pct: 80 }, { label: 'Location match', pct: 85 },
        { label: 'Goal alignment', pct: 78 }, { label: 'Engagement', pct: 72 }, { label: 'Budget fit', pct: 60 },
      ],
    },
    {
      name: 'Devon Pratt', score: 74, sub: '41 · Cedar Park',
      location: 'Cedar Park, TX', timeAgo: '6h ago',
      description: 'Signed up for a 10k in March and needs structured marathon prep coaching to hit his goal.',
      stage: 'contacted', tags: ['Marathon prep'], note: 'Signed up for a 10k in March', action: 'Message',
      aiFactors: [
        { label: 'Search intent', pct: 72 }, { label: 'Location match', pct: 80 },
        { label: 'Goal alignment', pct: 70 }, { label: 'Engagement', pct: 65 }, { label: 'Budget fit', pct: 58 },
      ],
    },
    {
      name: 'Sara Okafor', score: 66, sub: '55 · Austin, TX',
      location: 'Austin, TX', timeAgo: '12h ago',
      description: 'Asked about low-impact mobility and flexibility training options for managing chronic back pain.',
      stage: 'new', tags: ['Mobility'], note: 'Asked about low-impact training', action: 'Message',
      aiFactors: [
        { label: 'Search intent', pct: 65 }, { label: 'Location match', pct: 75 },
        { label: 'Goal alignment', pct: 62 }, { label: 'Engagement', pct: 55 }, { label: 'Budget fit', pct: 50 },
      ],
    },
  ],
  esthetician: [
    {
      name: 'Ava Okafor', score: 97, sub: '29 · Denver, CO',
      location: 'Denver, CO', timeAgo: '5h ago',
      description: 'Interested in a dermaplaning treatment to address redness. Regular spa-goer, booked facials twice last quarter.',
      stage: 'qualified', tags: ['Redness', 'Dermaplaning', 'Millennial'], note: 'Booked facials twice last quarter', action: 'Book consult',
      img: ['#FBCFE8', '#F472B6'],
      aiFactors: [
        { label: 'Timeline urgency', pct: 88 }, { label: 'Engagement intent', pct: 76 },
        { label: 'Profile completeness', pct: 70 }, { label: 'Channel responsiveness', pct: 58 }, { label: 'Budget fit', pct: 52 },
      ],
    },
    {
      name: 'Ava Greene', score: 94, sub: '34 · Phoenix, AZ',
      location: 'Phoenix, AZ', timeAgo: '1h ago',
      description: 'Interested in a facial to address dry skin. New to area, searching for the best facial and anti-aging treatments.',
      stage: 'qualified', tags: ['Dry Skin', 'Facial', 'Gen X'], note: 'Searching "best facial near me"', action: 'Book consult',
      img: ['#FBCFE8', '#EC4899'],
      aiFactors: [
        { label: 'Timeline urgency', pct: 92 }, { label: 'Engagement intent', pct: 82 },
        { label: 'Profile completeness', pct: 78 }, { label: 'Channel responsiveness', pct: 70 }, { label: 'Budget fit', pct: 65 },
      ],
    },
    {
      name: 'Noor Hassan', score: 71, sub: '41 · Dallas, TX',
      location: 'Dallas, TX', timeAgo: '8h ago',
      description: 'Returning client asking about chemical peel pricing for hyperpigmentation and texture improvement.',
      stage: 'contacted', tags: ['Hyperpigmentation', 'Chemical peel'], note: 'Asked about peel pricing', action: 'Book consult',
      img: ['#FCE7F3', '#DB2777'],
      aiFactors: [
        { label: 'Timeline urgency', pct: 70 }, { label: 'Engagement intent', pct: 65 },
        { label: 'Profile completeness', pct: 68 }, { label: 'Channel responsiveness', pct: 55 }, { label: 'Budget fit', pct: 48 },
      ],
    },
  ],
  roofing: [
    {
      name: '412 Maple Dr', score: 90, sub: 'Cedar Park · 18-yr roof',
      location: 'Cedar Park, TX', timeAgo: '2h ago',
      description: 'Home affected by recent hail storm. 18-year-old roof showing visible shingle damage and potential leak.',
      stage: 'new', tags: ['Storm/hail'], urgency: 'Emergency', note: 'Hail event 6 days ago', action: 'Send quote',
      img: ['#C7D2FE', '#6366F1'],
      aiFactors: [
        { label: 'Damage severity', pct: 90 }, { label: 'Property age', pct: 85 },
        { label: 'Urgency signal', pct: 92 }, { label: 'Contact response', pct: 70 }, { label: 'Insurance likelihood', pct: 78 },
      ],
    },
    {
      name: '27 Birch Ln', score: 78, sub: 'Leander · 14-yr roof',
      location: 'Leander, TX', timeAgo: '4h ago',
      description: 'Two shingles missing after wind event. Homeowner requesting urgent repair estimate this week.',
      stage: 'qualified', tags: ['Missing shingles'], urgency: 'This month', note: 'Two shingles down after wind', action: 'Send quote',
      img: ['#E0E7FF', '#4F46E5'],
      aiFactors: [
        { label: 'Damage severity', pct: 78 }, { label: 'Property age', pct: 72 },
        { label: 'Urgency signal', pct: 80 }, { label: 'Contact response', pct: 68 }, { label: 'Insurance likelihood', pct: 65 },
      ],
    },
    {
      name: '9 Oakridge Ct', score: 64, sub: 'Austin · 9-yr roof',
      location: 'Austin, TX', timeAgo: '1d ago',
      description: '9-year-old roof, homeowner researching general replacement options and getting cost estimates.',
      stage: 'new', tags: ['Wear'], urgency: 'Researching', note: 'Requested a general estimate', action: 'Send quote',
      img: ['#E0E7FF', '#818CF8'],
      aiFactors: [
        { label: 'Damage severity', pct: 60 }, { label: 'Property age', pct: 55 },
        { label: 'Urgency signal', pct: 40 }, { label: 'Contact response', pct: 65 }, { label: 'Insurance likelihood', pct: 50 },
      ],
    },
  ],
  realtor: [
    {
      name: 'Priya & Sam Nair', score: 93, sub: '$600k–$1M · ASAP',
      location: 'Austin, TX', timeAgo: '2h ago',
      description: 'Pre-approved buyers actively touring homes in the $600k–$1M range every weekend. Ready to move fast.',
      stage: 'qualified', tags: ['Buy'], type: 'Buyer', note: 'Pre-approved, touring weekends', action: 'Book consult',
      aiFactors: [
        { label: 'Purchase timeline', pct: 95 }, { label: 'Financial readiness', pct: 90 },
        { label: 'Engagement level', pct: 88 }, { label: 'Area match', pct: 82 }, { label: 'Budget fit', pct: 85 },
      ],
    },
    {
      name: 'Marcus Hill', score: 80, sub: '$450k home · 1–3 mo',
      location: 'Round Rock, TX', timeAgo: '5h ago',
      description: 'Comparing agents and ready to list his $450k home within the next 1–3 months. High close potential.',
      stage: 'contacted', tags: ['Sell'], type: 'Seller', note: 'Comparing agents now', action: 'Book consult',
      aiFactors: [
        { label: 'Listing timeline', pct: 82 }, { label: 'Property value', pct: 78 },
        { label: 'Engagement level', pct: 75 }, { label: 'Agent readiness', pct: 70 }, { label: 'Market knowledge', pct: 65 },
      ],
    },
    {
      name: 'Greenfield Parcel', score: 72, sub: '12 acres · $1M+',
      location: 'Leander, TX', timeAgo: '1d ago',
      description: '12-acre land parcel with development potential. Owner open to offers above $1M, motivated to sell.',
      stage: 'new', tags: ['Land'], type: 'Land', note: 'Owner open to offers', action: 'Book consult',
      aiFactors: [
        { label: 'Property potential', pct: 75 }, { label: 'Owner motivation', pct: 68 },
        { label: 'Market timing', pct: 72 }, { label: 'Deal size', pct: 80 }, { label: 'Area demand', pct: 65 },
      ],
    },
  ],
}
