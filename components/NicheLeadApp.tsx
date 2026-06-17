'use client'
import React, { useState, useMemo } from 'react'
import {
  Dumbbell, Sparkles, Home, Building2, LayoutDashboard, Users, Send,
  BarChart3, Settings, SlidersHorizontal, MessageSquareText, X, Copy,
  Check, Search, Bell, ChevronRight, Flame, Clock, MapPin, Target,
  CalendarCheck, DollarSign, FileText, ShieldCheck, TrendingUp, ArrowUpRight,
} from 'lucide-react'
import { BarChart, Bar, XAxis, ResponsiveContainer, Cell } from 'recharts'
import { NICHES, LEADS, type NicheKey } from '@/lib/data'

const ICON_MAP: Record<string, any> = {
  Dumbbell, Sparkles, Home, Building2, Search, Target, Send, Flame,
  CalendarCheck, DollarSign, FileText, ShieldCheck, Users, MapPin,
}

function scoreColor(s: number) {
  if (s >= 85) return { bg: '#DCFCE7', fg: '#15803D', ring: '#22C55E', label: 'Hot' }
  if (s >= 70) return { bg: '#FEF3C7', fg: '#B45309', ring: '#F59E0B', label: 'Warm' }
  return { bg: '#F1F5F9', fg: '#475569', ring: '#94A3B8', label: 'Cool' }
}

function AIScore({ score }: { score: number }) {
  const c = scoreColor(score)
  return (
    <div className="flex flex-col items-center justify-center shrink-0" style={{ width: 56 }}>
      <div className="relative flex items-center justify-center rounded-full"
        style={{ width: 48, height: 48, background: c.bg, boxShadow: `inset 0 0 0 2px ${c.ring}` }}>
        <span className="font-bold text-sm" style={{ color: c.fg }}>{score}</span>
      </div>
      <span className="mt-1 text-[10px] font-semibold uppercase tracking-wide" style={{ color: c.fg }}>{c.label}</span>
    </div>
  )
}

function Pill({ children, accent, soft }: { children: React.ReactNode; accent: string; soft: string }) {
  return (
    <span className="inline-flex items-center text-[11px] font-medium px-2 py-1 rounded-full"
      style={{ background: soft, color: accent }}>{children}</span>
  )
}

function StatCard({ stat, accent, soft }: { stat: { label: string; value: string; delta: string; iconName: string }; accent: string; soft: string }) {
  const Icon = ICON_MAP[stat.iconName] ?? Search
  return (
    <div className="shrink-0 rounded-2xl bg-white border border-slate-100 p-4"
      style={{ width: 150, boxShadow: '0 1px 2px rgba(15,23,42,0.04)' }}>
      <div className="flex items-center justify-center rounded-xl mb-3"
        style={{ width: 34, height: 34, background: soft }}>
        <Icon size={18} color={accent} strokeWidth={2.2} />
      </div>
      <div className="text-2xl font-bold text-slate-900 tracking-tight leading-none">{stat.value}</div>
      <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
      <div className="inline-flex items-center gap-1 mt-2 text-[11px] font-semibold" style={{ color: accent }}>
        <TrendingUp size={12} /> {stat.delta} this week
      </div>
    </div>
  )
}

function LeadCard({ nicheKey, lead, accent, soft }: {
  nicheKey: NicheKey; lead: ReturnType<typeof LEADS[NicheKey][number] extends infer T ? () => T : never>
  accent: string; soft: string
}) {
  const l = lead as typeof LEADS['trainer'][number] & { img?: [string,string]; urgency?: string; type?: string }
  return (
    <div className="rounded-2xl bg-white border border-slate-100 p-3.5 flex gap-3"
      style={{ boxShadow: '0 1px 2px rgba(15,23,42,0.04)' }}>
      {l.img ? (
        <div className="shrink-0 rounded-xl flex items-center justify-center"
          style={{ width: 56, height: 56, background: `linear-gradient(135deg, ${l.img[0]}, ${l.img[1]})` }}>
          {nicheKey === 'roofing' ? <Home size={22} color="#fff" /> : <Sparkles size={22} color="#fff" />}
        </div>
      ) : (
        <div className="shrink-0 rounded-xl flex items-center justify-center font-bold text-white"
          style={{ width: 56, height: 56, fontSize: 16, background: `linear-gradient(135deg, ${accent}, ${accent}cc)` }}>
          {l.name.split(' ').map((w: string) => w[0]).slice(0,2).join('')}
        </div>
      )}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-slate-900 text-[15px] truncate">{l.name}</h3>
          {l.type && (
            <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded shrink-0"
              style={{ background: soft, color: accent }}>{l.type}</span>
          )}
        </div>
        <p className="text-xs text-slate-500 mt-0.5">{l.sub}</p>
        <div className="flex flex-wrap gap-1.5 mt-2">
          {l.tags.map((t: string) => <Pill key={t} accent={accent} soft={soft}>{t}</Pill>)}
          {l.urgency && (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-1 rounded-full"
              style={{ background: l.urgency === 'Emergency' ? '#FEE2E2' : '#F1F5F9', color: l.urgency === 'Emergency' ? '#DC2626' : '#475569' }}>
              <Clock size={11} /> {l.urgency}
            </span>
          )}
        </div>
        <p className="text-[11px] text-slate-400 mt-2 flex items-center gap-1">
          <Flame size={11} /> {l.note}
        </p>
        <button className="mt-2.5 inline-flex items-center gap-1.5 text-[13px] font-semibold px-3 py-1.5 rounded-lg text-white active:scale-95 transition-transform"
          style={{ background: accent }}>
          {l.action} <ChevronRight size={14} />
        </button>
      </div>
      <AIScore score={l.score} />
    </div>
  )
}

function FilterSheet({ niche, open, onClose, active, setActive }: {
  niche: typeof NICHES[NicheKey]; open: boolean; onClose: () => void
  active: Record<string,string[]>; setActive: React.Dispatch<React.SetStateAction<Record<string,string[]>>>
}) {
  if (!open) return null
  const toggle = (group: string, opt: string) => {
    setActive(prev => {
      const cur = prev[group] || []
      const next = cur.includes(opt) ? cur.filter(o => o !== opt) : [...cur, opt]
      return { ...prev, [group]: next }
    })
  }
  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-slate-900/40" />
      <div className="relative w-full bg-white rounded-t-3xl p-5 pb-8"
        style={{ maxWidth: 440, maxHeight: '78%', overflowY: 'auto' }}
        onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-slate-900 text-lg">Filters</h2>
          <button onClick={onClose} className="p-2 -mr-2 text-slate-400"><X size={20} /></button>
        </div>
        {niche.filters.map(f => (
          <div key={f.name} className="mb-5">
            <h3 className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-2">{f.name}</h3>
            <div className="flex flex-wrap gap-2">
              {f.options.map(opt => {
                const on = (active[f.name] || []).includes(opt)
                return (
                  <button key={opt} onClick={() => toggle(f.name, opt)}
                    className="text-[13px] font-medium px-3 py-1.5 rounded-full border transition-colors"
                    style={on ? { background: niche.accent, borderColor: niche.accent, color: '#fff' }
                      : { background: '#fff', borderColor: '#E2E8F0', color: '#475569' }}>
                    {opt}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
        <button onClick={onClose} className="w-full mt-2 py-3 rounded-xl font-semibold text-white"
          style={{ background: niche.accent }}>Show results</button>
      </div>
    </div>
  )
}

function TemplatePanel({ niche, open, onClose }: {
  niche: typeof NICHES[NicheKey]; open: boolean; onClose: () => void
}) {
  const [copied, setCopied] = useState<number|null>(null)
  if (!open) return null
  const copy = (i: number, body: string) => {
    try { navigator.clipboard?.writeText(body) } catch {}
    setCopied(i); setTimeout(() => setCopied(null), 1400)
  }
  return (
    <div className="fixed inset-0 z-40 flex justify-end" onClick={onClose}>
      <div className="absolute inset-0 bg-slate-900/40" />
      <div className="relative h-full bg-white w-full p-5"
        style={{ maxWidth: 380, overflowY: 'auto' }}
        onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-1">
          <h2 className="font-bold text-slate-900 text-lg flex items-center gap-2">
            <MessageSquareText size={18} color={niche.accent} /> Outreach templates
          </h2>
          <button onClick={onClose} className="p-2 -mr-2 text-slate-400"><X size={20} /></button>
        </div>
        <p className="text-xs text-slate-500 mb-4">Tap copy, then personalize the <code className="font-mono">{`{{fields}}`}</code>.</p>
        <div className="flex flex-col gap-3">
          {niche.templates.map((t, i) => (
            <div key={i} className="rounded-2xl border border-slate-100 p-4" style={{ background: '#FCFCFD' }}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-slate-800 text-sm">{t.title}</h3>
                <button onClick={() => copy(i, t.body)}
                  className="inline-flex items-center gap-1 text-[12px] font-semibold px-2.5 py-1 rounded-lg"
                  style={{ background: niche.soft, color: niche.accent }}>
                  {copied === i ? <><Check size={13} /> Copied</> : <><Copy size={13} /> Copy</>}
                </button>
              </div>
              <p className="text-[13px] text-slate-600 leading-relaxed">{t.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function CampaignsScreen({ niche }: { niche: typeof NICHES[NicheKey] }) {
  const rows = [
    { name: 'Cold DM — week 1', sent: 120, reply: 28, status: 'Active' },
    { name: 'Free offer blast', sent: 86, reply: 19, status: 'Active' },
    { name: 'Re-engagement', sent: 54, reply: 7, status: 'Paused' },
  ]
  return (
    <div className="px-4 pt-2 pb-28">
      <h2 className="font-bold text-slate-900 text-lg mb-3">Campaigns</h2>
      <div className="flex flex-col gap-3">
        {rows.map(r => (
          <div key={r.name} className="rounded-2xl bg-white border border-slate-100 p-4"
            style={{ boxShadow: '0 1px 2px rgba(15,23,42,0.04)' }}>
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-slate-800 text-sm">{r.name}</h3>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
                style={{ background: r.status === 'Active' ? niche.soft : '#F1F5F9', color: r.status === 'Active' ? niche.accent : '#64748B' }}>
                {r.status}
              </span>
            </div>
            <div className="flex gap-6 mt-3 text-sm">
              <div><div className="font-bold text-slate-900">{r.sent}</div><div className="text-xs text-slate-500">Sent</div></div>
              <div><div className="font-bold text-slate-900">{r.reply}</div><div className="text-xs text-slate-500">Replies</div></div>
              <div><div className="font-bold text-slate-900">{Math.round(r.reply/r.sent*100)}%</div><div className="text-xs text-slate-500">Reply rate</div></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function AnalyticsScreen({ niche }: { niche: typeof NICHES[NicheKey] }) {
  const data = [
    { d: 'Mon', v: 18 }, { d: 'Tue', v: 31 }, { d: 'Wed', v: 24 },
    { d: 'Thu', v: 42 }, { d: 'Fri', v: 38 }, { d: 'Sat', v: 51 }, { d: 'Sun', v: 29 },
  ]
  return (
    <div className="px-4 pt-2 pb-28">
      <h2 className="font-bold text-slate-900 text-lg mb-3">Analytics</h2>
      <div className="rounded-2xl bg-white border border-slate-100 p-4 mb-3"
        style={{ boxShadow: '0 1px 2px rgba(15,23,42,0.04)' }}>
        <div className="text-xs text-slate-500">New leads · last 7 days</div>
        <div className="text-2xl font-bold text-slate-900 tracking-tight">233</div>
        <div style={{ width: '100%', height: 140 }} className="mt-2">
          <ResponsiveContainer>
            <BarChart data={data} margin={{ top: 8, right: 0, left: 0, bottom: 0 }}>
              <XAxis dataKey="d" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#94A3B8' }} />
              <Bar dataKey="v" radius={[6,6,0,0]}>
                {data.map((_,i) => <Cell key={i} fill={i === 5 ? niche.accent : niche.soft} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {([['Conversion rate','8.5%'],['Avg AI score','78'],['Reply rate','23%'],['Cost / lead','$1.90']] as [string,string][]).map(([l,v]) => (
          <div key={l} className="rounded-2xl bg-white border border-slate-100 p-4"
            style={{ boxShadow: '0 1px 2px rgba(15,23,42,0.04)' }}>
            <div className="text-2xl font-bold text-slate-900 tracking-tight">{v}</div>
            <div className="text-xs text-slate-500 mt-1">{l}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SettingsScreen() {
  const groups: [string, string[]][] = [
    ['Account', ['Profile', 'Business details', 'Connected inbox']],
    ['Lead sourcing', ['Target niche', 'Search radius', 'Daily lead cap']],
    ['Automation', ['Auto-score threshold', 'Outreach schedule', 'CRM sync']],
  ]
  return (
    <div className="px-4 pt-2 pb-28">
      <h2 className="font-bold text-slate-900 text-lg mb-3">Settings</h2>
      <div className="flex flex-col gap-4">
        {groups.map(([title, items]) => (
          <div key={title}>
            <h3 className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-2">{title}</h3>
            <div className="rounded-2xl bg-white border border-slate-100 overflow-hidden"
              style={{ boxShadow: '0 1px 2px rgba(15,23,42,0.04)' }}>
              {items.map((it, i) => (
                <button key={it} className="w-full flex items-center justify-between px-4 py-3.5 text-left"
                  style={{ borderTop: i ? '1px solid #F1F5F9' : 'none' }}>
                  <span className="text-sm text-slate-700">{it}</span>
                  <ChevronRight size={16} className="text-slate-300" />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const TABS = [
  { key: 'dashboard', label: 'Dashboard', Icon: LayoutDashboard },
  { key: 'leads', label: 'Leads', Icon: Users },
  { key: 'campaigns', label: 'Campaigns', Icon: Send },
  { key: 'analytics', label: 'Analytics', Icon: BarChart3 },
  { key: 'settings', label: 'Settings', Icon: Settings },
]

export default function NicheLeadApp() {
  const [nicheKey, setNicheKey] = useState<NicheKey>('trainer')
  const [tab, setTab] = useState('dashboard')
  const [filterOpen, setFilterOpen] = useState(false)
  const [tplOpen, setTplOpen] = useState(false)
  const [active, setActive] = useState<Record<string,string[]>>({})

  const niche = NICHES[nicheKey]
  const leads = LEADS[nicheKey]
  const activeChips = useMemo(() => Object.values(active).flat().filter(Boolean), [active])
  const switchNiche = (k: NicheKey) => { setNicheKey(k); setActive({}) }
  const NicheIcon = ICON_MAP[niche.iconName] ?? Home

  return (
    <div className="min-h-screen w-full flex justify-center" style={{ background: '#EEF1F4' }}>
      <div className="relative w-full bg-[#F6F7F9] flex flex-col md:max-w-[1100px]"
        style={{ minHeight: '100vh', boxShadow: '0 0 60px rgba(15,23,42,0.08)' }}>

        {/* TOP BAR */}
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-slate-100">
          <div className="px-4 pt-3.5 pb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="rounded-xl flex items-center justify-center font-bold"
                style={{ width: 30, height: 30, background: '#0F172A' }}>
                <span style={{ color: '#22C55E', fontSize: 15, fontFamily: 'Georgia, serif' }}>G</span>
              </div>
              <div>
                <div className="font-bold text-slate-900 text-[15px] leading-none tracking-tight">NicheLead AI</div>
                <div className="text-[11px] text-slate-400 mt-0.5">{niche.label} workspace</div>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <a href="https://tanxusa.com" target="_blank" rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1.5 rounded-lg border border-slate-200 text-slate-500 mr-1">
                TanXUSA.com <ArrowUpRight size={12} />
              </a>
              <button className="p-2 text-slate-400 relative">
                <Bell size={19} />
                <span className="absolute top-1.5 right-1.5 rounded-full"
                  style={{ width: 7, height: 7, background: niche.accent }} />
              </button>
              <div className="rounded-full bg-slate-200" style={{ width: 30, height: 30 }} />
            </div>
          </div>
          <div className="px-3 pb-2.5 flex gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
            {(Object.keys(NICHES) as NicheKey[]).map(k => {
              const n = NICHES[k]; const on = k === nicheKey
              const NIcon = ICON_MAP[n.iconName] ?? Home
              return (
                <button key={k} onClick={() => switchNiche(k)}
                  className="shrink-0 inline-flex items-center gap-1.5 text-[13px] font-semibold px-3 py-1.5 rounded-full border transition-colors"
                  style={on ? { background: n.accent, borderColor: n.accent, color: '#fff' }
                    : { background: '#fff', borderColor: '#E8ECF1', color: '#64748B' }}>
                  <NIcon size={15} /> {n.short}
                </button>
              )
            })}
          </div>
        </header>

        {/* BODY */}
        <main className="flex-1">
          {(tab === 'dashboard' || tab === 'leads') && (
            <>
              {tab === 'dashboard' && (
                <section className="pt-4">
                  <div className="px-4 flex gap-3 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
                    {niche.stats.map(s => <StatCard key={s.label} stat={s} accent={niche.accent} soft={niche.soft} />)}
                  </div>
                </section>
              )}
              <section className="px-4 pt-4 pb-2 flex items-center gap-2">
                <button onClick={() => setFilterOpen(true)}
                  className="inline-flex items-center gap-1.5 text-[13px] font-semibold px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-600">
                  <SlidersHorizontal size={15} /> Filters
                  {activeChips.length > 0 && (
                    <span className="ml-0.5 text-[11px] font-bold px-1.5 rounded-full text-white"
                      style={{ background: niche.accent }}>{activeChips.length}</span>
                  )}
                </button>
                <button onClick={() => setTplOpen(true)}
                  className="inline-flex items-center gap-1.5 text-[13px] font-semibold px-3 py-2 rounded-xl border text-white"
                  style={{ background: niche.accent, borderColor: niche.accent }}>
                  <MessageSquareText size={15} /> Templates
                </button>
                <div className="ml-auto text-xs text-slate-400 font-medium">{leads.length} leads</div>
              </section>
              {activeChips.length > 0 && (
                <div className="px-4 pb-1 flex gap-1.5 flex-wrap">
                  {activeChips.map(c => (
                    <span key={c} className="inline-flex items-center gap-1 text-[12px] font-medium px-2.5 py-1 rounded-full"
                      style={{ background: niche.soft, color: niche.accent }}>{c}</span>
                  ))}
                </div>
              )}
              <section className="px-4 pt-2 pb-28 grid grid-cols-1 md:grid-cols-2 gap-3">
                {leads.map(lead => (
                  <LeadCard key={lead.name} nicheKey={nicheKey} lead={lead as any}
                    accent={niche.accent} soft={niche.soft} />
                ))}
              </section>
            </>
          )}
          {tab === 'campaigns' && <div className="pt-4"><CampaignsScreen niche={niche} /></div>}
          {tab === 'analytics' && <div className="pt-4"><AnalyticsScreen niche={niche} /></div>}
          {tab === 'settings' && <div className="pt-4"><SettingsScreen /></div>}
        </main>

        {/* BOTTOM NAV */}
        <nav className="sticky bottom-0 z-30 bg-white/95 backdrop-blur border-t border-slate-100">
          <div className="flex items-stretch justify-between px-2 py-1.5">
            {TABS.map(t => {
              const on = t.key === tab; const TIcon = t.Icon
              return (
                <button key={t.key} onClick={() => setTab(t.key)}
                  className="flex-1 flex flex-col items-center gap-0.5 py-1.5 rounded-xl transition-colors">
                  <TIcon size={21} color={on ? niche.accent : '#94A3B8'} strokeWidth={on ? 2.4 : 2} />
                  <span className="text-[10px] font-semibold" style={{ color: on ? niche.accent : '#94A3B8' }}>{t.label}</span>
                </button>
              )
            })}
          </div>
        </nav>

        <FilterSheet niche={niche} open={filterOpen} onClose={() => setFilterOpen(false)} active={active} setActive={setActive} />
        <TemplatePanel niche={niche} open={tplOpen} onClose={() => setTplOpen(false)} />
      </div>
    </div>
  )
}
