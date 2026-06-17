export type NicheKey = 'trainer' | 'esthetician' | 'roofing' | 'realtor'

export interface StatItem { label: string; value: string; delta: string; iconName: string }
export interface FilterGroup { name: string; options: string[] }
export interface Template { title: string; body: string }
export interface Lead {
  name: string; score: number; sub: string; tags: string[]
  note: string; action: string; img?: [string, string]
  urgency?: string; type?: string
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
      { title: 'Re-engage', body: '{{name}}, still chasing {{goal}}? I just opened 2 coaching spots for {{month}}. First session\'s on me if you want to test the fit.' },
    ],
  },
  esthetician: {
    key: 'esthetician', label: 'Esthetician', short: 'Esthetician',
    description: 'Book skin consults and facials with leads matched by concern and service.',
    iconName: 'Sparkles', accent: '#DB2777', soft: '#FCE7F3',
    stats: [
      { label: 'Leads Found', value: '186', delta: '+22', iconName: 'Search' },
      { label: 'Appointments Booked', value: '54', delta: '+11', iconName: 'CalendarCheck' },
      { label: 'Revenue', value: '$8.4k', delta: '+$1.2k', iconName: 'DollarSign' },
    ],
    filters: [
      { name: 'Skin Concern', options: ['Acne', 'Anti-aging', 'Hyperpigmentation', 'Rosacea', 'Texture'] },
      { name: 'Service Type', options: ['Facial', 'Chemical peel', 'Microneedling', 'Dermaplaning', 'Consultation'] },
      { name: 'Demographic', options: ['18–24', '25–34', '35–44', '45+'] },
    ],
    templates: [
      { title: 'Consult invite', body: 'Hi {{name}}! I\'d love to build a custom plan for your {{concern}}. I have complimentary skin consults open this week — would a morning or evening slot suit you better?' },
      { title: 'New-client offer', body: 'Hey {{name}} ✨ First-time clients get 20% off their first {{service}}. Want me to hold a spot for you this week?' },
      { title: 'Post-consult follow-up', body: '{{name}}, lovely chatting today! Here\'s the {{service}} plan we discussed. Ready to book your first session?' },
    ],
  },
  roofing: {
    key: 'roofing', label: 'Roofing', short: 'Roofing',
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
      { title: 'Quote follow-up', body: 'Hi {{name}}, following up on your roof quote. The estimate holds through {{date}}. Happy to answer any questions or schedule the crew.' },
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
    { name: 'Jordan Reyes', score: 92, sub: '32 · Austin, TX', tags: ['Weight loss', 'Strength'], note: 'Searched "online coach" 3× this week', action: 'Message' },
    { name: 'Mia Chen', score: 81, sub: '27 · Round Rock', tags: ['Postpartum', 'Mobility'], note: 'Joined a local running group', action: 'Message' },
    { name: 'Devon Pratt', score: 74, sub: '41 · Cedar Park', tags: ['Marathon prep'], note: 'Signed up for a 10k in March', action: 'Message' },
    { name: 'Sara Okafor', score: 66, sub: '55 · Austin, TX', tags: ['Mobility'], note: 'Asked about low-impact training', action: 'Message' },
  ],
  esthetician: [
    { name: 'Ava Bennett', score: 95, img: ['#FBCFE8', '#F472B6'], sub: '29 · regular spa-goer', tags: ['Acne', 'Texture'], note: 'Booked facials twice last quarter', action: 'Book consult' },
    { name: 'Leah Romano', score: 83, img: ['#FBCFE8', '#EC4899'], sub: '34 · new to area', tags: ['Anti-aging'], note: 'Searching "best facial near me"', action: 'Book consult' },
    { name: 'Noor Hassan', score: 71, img: ['#FCE7F3', '#DB2777'], sub: '41 · returning client', tags: ['Hyperpigmentation'], note: 'Asked about peel pricing', action: 'Book consult' },
  ],
  roofing: [
    { name: '412 Maple Dr', score: 90, img: ['#C7D2FE', '#6366F1'], sub: 'Cedar Park · 18-yr roof', tags: ['Storm/hail'], urgency: 'Emergency', note: 'Hail event 6 days ago', action: 'Send quote' },
    { name: '27 Birch Ln', score: 78, img: ['#E0E7FF', '#4F46E5'], sub: 'Leander · 14-yr roof', tags: ['Missing shingles'], urgency: 'This month', note: 'Two shingles down after wind', action: 'Send quote' },
    { name: '9 Oakridge Ct', score: 64, img: ['#E0E7FF', '#818CF8'], sub: 'Austin · 9-yr roof', tags: ['Wear'], urgency: 'Researching', note: 'Requested a general estimate', action: 'Send quote' },
  ],
  realtor: [
    { name: 'Priya & Sam Nair', type: 'Buyer', score: 93, sub: '$600k–$1M · ASAP', tags: ['Buy'], note: 'Pre-approved, touring weekends', action: 'Book consult' },
    { name: 'Marcus Hill', type: 'Seller', score: 80, sub: '$450k home · 1–3 mo', tags: ['Sell'], note: 'Comparing agents now', action: 'Book consult' },
    { name: 'Greenfield Parcel', type: 'Land', score: 72, sub: '12 acres · $1M+', tags: ['Land'], note: 'Owner open to offers', action: 'Book consult' },
  ],
}
