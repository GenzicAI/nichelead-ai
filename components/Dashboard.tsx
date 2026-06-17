'use client'
import React, { useState, useMemo } from 'react'
import {
  Dumbbell, Sparkles, Home, Building2,
  SlidersHorizontal, X, Copy, Check, Search, Bell,
  TrendingUp, ArrowLeft, Zap, Send, BarChart3, Settings,
  Users, LayoutDashboard, DollarSign, FileText, ShieldCheck,
  Target, MapPin, Flame, CalendarCheck, MessageSquare,
  ChevronRight, Clock,
} from 'lucide-react'
import { BarChart, Bar, XAxis, ResponsiveContainer, Cell } from 'recharts'
import { NICHES, LEADS, type NicheKey, type Lead } from '@/lib/data'

// ── Icon map ──────────────────────────────────────────────
const ICON_MAP: Record<string, React.ComponentType<any>> = {
  Dumbbell, Sparkles, Home, Building2, Search, Target, Send, Flame,
  CalendarCheck, DollarSign, FileText, ShieldCheck, Users, MapPin,
}

const NICHE_ICONS: Record<NicheKey, React.ComponentType<any>> = {
  trainer: Dumbbell, esthetician: Sparkles, roofing: Home, realtor: Building2,
}

// ── Theme ─────────────────────────────────────────────────
const BG    = '#0B1512'
const CARD  = '#0F1A15'
const CARD2 = '#142019'
const BORDER = '#1E3028'
const TEXT   = '#E5EDE8'
const MUTED  = '#7B8B83'
const FAINT  = '#253020'

// ── Helpers ───────────────────────────────────────────────
function scoreColor(s: number) {
  if (s >= 85) return { ring: '#22C55E', fg: '#4ADE80', label: 'Hot lead',  labelBg: 'rgba(34,197,94,0.15)',   labelFg: '#4ADE80' }
  if (s >= 70) return { ring: '#F59E0B', fg: '#FCD34D', label: 'Warm lead', labelBg: 'rgba(245,158,11,0.15)',  labelFg: '#FCD34D' }
  return            { ring: '#64748B', fg: '#94A3B8', label: 'Cool lead', labelBg: 'rgba(100,116,139,0.15)', labelFg: '#94A3B8' }
}

function initials(name: string) {
  return name.split(' ').map(w => w[0]).slice(0, 2).join('')
}

// ── Score ring ────────────────────────────────────────────
function ScoreRing({ score }: { score: number }) {
  const c = scoreColor(score)
  return (
    <div className="flex flex-col items-center shrink-0">
      <div className="flex items-center justify-center rounded-full"
        style={{ width: 54, height: 54, border: `2px solid ${c.ring}`, background: `${c.ring}18` }}>
        <span className="font-bold text-[16px]" style={{ color: c.fg }}>{score}</span>
      </div>
      <span className="mt-1 text-[9px] font-bold tracking-widest uppercase" style={{ color: MUTED }}>AI SCORE</span>
    </div>
  )
}

// ── Factor progress bar ───────────────────────────────────
function FactorBar({ label, pct, accent }: { label: string; pct: number; accent: string }) {
  return (
    <div className="mb-3">
      <div className="flex justify-between mb-1">
        <span className="text-[12px]" style={{ color: MUTED }}>{label}</span>
        <span className="text-[12px] font-semibold" style={{ color: TEXT }}>{pct}%</span>
      </div>
      <div className="rounded-full overflow-hidden" style={{ height: 4, background: FAINT }}>
        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: accent }} />
      </div>
    </div>
  )
}

// ── Pipeline stage selector ───────────────────────────────
function StageSelector({ stage, onChange, accent }: { stage: string; onChange: (s: string) => void; accent: string }) {
  const stages = ['New', 'Qualified', 'Contacted', 'Converted']
  return (
    <div className="flex gap-2 flex-wrap">
      {stages.map(s => {
        const on = stage.toLowerCase() === s.toLowerCase()
        return (
          <button key={s} onClick={() => onChange(s.toLowerCase())}
            className="px-3 py-1.5 rounded-full text-[12px] font-semibold transition-colors"
            style={on ? { background: accent, color: '#fff' } : { background: FAINT, color: MUTED, border: `1px solid ${BORDER}` }}>
            {s}
          </button>
        )
      })}
    </div>
  )
}

// ── Lead Profile Panel ────────────────────────────────────
function LeadProfilePanel({ lead, niche, onClose, onContact }: {
  lead: Lead; niche: typeof NICHES[NicheKey]; onClose: () => void; onContact: () => void
}) {
  const [stage, setStage] = useState<string>(lead.stage)
  const c = scoreColor(lead.score)

  return (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={onClose}>
      <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.65)' }} />
      <div className="relative h-full flex flex-col w-full overflow-hidden"
        style={{ maxWidth: 400, background: CARD, borderLeft: `1px solid ${BORDER}` }}
        onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4"
          style={{ borderBottom: `1px solid ${BORDER}` }}>
          <div>
            <h2 className="font-bold text-[18px]" style={{ color: TEXT }}>Lead profile</h2>
            <p className="text-[12px] mt-0.5" style={{ color: MUTED }}>{niche.label} pipeline</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl" style={{ background: FAINT }}>
            <X size={18} style={{ color: MUTED }} />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {/* Avatar + name */}
          <div className="flex items-center gap-3 mb-5">
            <div className="rounded-full flex items-center justify-center font-bold text-white text-[15px] shrink-0"
              style={{ width: 52, height: 52, background: `linear-gradient(135deg, ${niche.accent}, ${niche.accent}99)` }}>
              {initials(lead.name)}
            </div>
            <div>
              <h3 className="font-bold text-[17px]" style={{ color: TEXT }}>{lead.name}</h3>
              <p className="text-[12px] mt-0.5 flex items-center gap-1" style={{ color: MUTED }}>
                <MapPin size={11} /> {lead.location} · {lead.timeAgo}
              </p>
            </div>
          </div>

          {/* Score row */}
          <div className="flex items-center gap-3 p-3 rounded-2xl mb-5"
            style={{ background: CARD2, border: `1px solid ${BORDER}` }}>
            <Zap size={18} style={{ color: niche.accent }} />
            <span className="font-bold text-[24px]" style={{ color: TEXT }}>{lead.score}</span>
            <span className="text-[13px]" style={{ color: MUTED }}>/ 100</span>
            <span className="ml-auto px-2.5 py-1 rounded-full text-[12px] font-bold"
              style={{ background: c.labelBg, color: c.labelFg }}>{c.label}</span>
          </div>

          {/* AI factors */}
          <div className="mb-5">
            <h4 className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: MUTED }}>
              AI SCORE FACTORS
            </h4>
            {lead.aiFactors.map(f => (
              <FactorBar key={f.label} label={f.label} pct={f.pct} accent={niche.accent} />
            ))}
          </div>

          {/* Summary */}
          <div className="mb-5">
            <h4 className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: MUTED }}>SUMMARY</h4>
            <p className="text-[13px] leading-relaxed" style={{ color: MUTED }}>{lead.description}</p>
            <div className="flex flex-wrap gap-1.5 mt-2.5">
              {lead.tags.map(t => (
                <span key={t} className="px-2 py-0.5 rounded-full text-[11px] font-medium"
                  style={{ background: `${niche.accent}20`, color: niche.accent }}>{t}</span>
              ))}
            </div>
          </div>

          {/* Pipeline stage */}
          <div className="mb-5">
            <h4 className="text-[10px] font-bold uppercase tracking-widest mb-2.5" style={{ color: MUTED }}>PIPELINE STAGE</h4>
            <StageSelector stage={stage} onChange={setStage} accent={niche.accent} />
          </div>

          {/* Notes */}
          <div className="mb-2">
            <h4 className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: MUTED }}>NOTES</h4>
            <textarea
              rows={3}
              placeholder="Add context, call outcomes, follow-up reminders…"
              className="w-full rounded-xl px-4 py-3 text-[13px] leading-relaxed resize-none outline-none"
              style={{ background: CARD2, border: `1px solid ${BORDER}`, color: TEXT }}
            />
            <button className="mt-2 px-4 py-2 rounded-xl text-[13px] font-semibold"
              style={{ background: FAINT, color: MUTED }}>
              Save notes
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 pb-6 pt-4 flex gap-3" style={{ borderTop: `1px solid ${BORDER}` }}>
          <button onClick={onClose} className="flex-1 py-3 rounded-xl font-semibold text-[14px]"
            style={{ background: FAINT, color: MUTED }}>Close</button>
          <button onClick={onContact}
            className="flex-1 py-3 rounded-xl font-semibold text-[14px] text-white flex items-center justify-center gap-2"
            style={{ background: niche.accent }}>
            <Send size={15} /> Contact
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Outreach / Templates Panel ────────────────────────────
function OutreachPanel({ lead, niche, onClose }: {
  lead: Lead; niche: typeof NICHES[NicheKey]; onClose: () => void
}) {
  const [tplIdx, setTplIdx] = useState(0)
  const [copied, setCopied] = useState(false)
  const tpl = niche.templates[tplIdx]
  const firstName = lead.name.split(' ')[0]

  const body = tpl.body
    .replace(/\{\{name\}\}/g, firstName)
    .replace(/\{\{goal\}\}/g, lead.tags[0] || 'your goals')
    .replace(/\{\{city\}\}/g, lead.location.split(',')[0])
    .replace(/\{\{concern\}\}/g, lead.tags[0] || 'your concern')
    .replace(/\{\{service\}\}/g, lead.tags[1] || lead.tags[0] || 'our service')
    .replace(/\{\{month\}\}/g, 'July')
    .replace(/\{\{street\}\}/g, lead.location)
    .replace(/\{\{date\}\}/g, 'end of month')
    .replace(/\{\{area\}\}/g, lead.location.split(',')[0])
    .replace(/\{\{budget\}\}/g, lead.tags[0] || 'your budget')

  const subject = `${firstName}, let's talk ${lead.tags[0] || niche.short} ✨`

  const doCopy = () => {
    try { navigator.clipboard?.writeText(body) } catch {}
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={onClose}>
      <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.65)' }} />
      <div className="relative h-full flex flex-col w-full overflow-hidden"
        style={{ maxWidth: 420, background: CARD, borderLeft: `1px solid ${BORDER}` }}
        onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="px-5 pt-5 pb-4" style={{ borderBottom: `1px solid ${BORDER}` }}>
          <div className="flex items-center justify-between mb-1">
            <h2 className="font-bold text-[18px] flex items-center gap-2" style={{ color: TEXT }}>
              <MessageSquare size={18} style={{ color: niche.accent }} />
              Outreach Templates
            </h2>
            <button onClick={onClose} className="p-2 rounded-xl" style={{ background: FAINT }}>
              <X size={18} style={{ color: MUTED }} />
            </button>
          </div>
          <p className="text-[12px]" style={{ color: MUTED }}>
            Reaching out to <span style={{ color: niche.accent }}>{lead.name}</span>
          </p>
        </div>

        {/* Template tabs */}
        <div className="flex gap-2 px-5 py-3 overflow-x-auto shrink-0"
          style={{ borderBottom: `1px solid ${BORDER}`, scrollbarWidth: 'none' }}>
          {niche.templates.map((t, i) => (
            <button key={i} onClick={() => setTplIdx(i)}
              className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-semibold transition-colors"
              style={tplIdx === i
                ? { background: niche.accent, color: '#fff' }
                : { background: FAINT, color: MUTED, border: `1px solid ${BORDER}` }}>
              ✉ {t.title}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {/* Channel badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-4"
            style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.25)' }}>
            <span className="text-[11px] font-bold" style={{ color: '#4ADE80' }}>EMAIL</span>
          </div>

          {/* Subject */}
          <div className="mb-4">
            <label className="text-[11px] font-bold uppercase tracking-widest block mb-1.5" style={{ color: MUTED }}>
              Subject
            </label>
            <div className="px-4 py-3 rounded-xl text-[13px]"
              style={{ background: CARD2, border: `1px solid ${BORDER}`, color: TEXT }}>
              {subject}
            </div>
          </div>

          {/* Message */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[11px] font-bold uppercase tracking-widest" style={{ color: MUTED }}>Message</label>
              <button onClick={doCopy} className="flex items-center gap-1 text-[12px] font-semibold"
                style={{ color: niche.accent }}>
                {copied ? <><Check size={13} /> Copied</> : <><Copy size={13} /> Copy</>}
              </button>
            </div>
            <div className="px-4 py-3 rounded-xl text-[13px] leading-relaxed whitespace-pre-wrap"
              style={{ background: CARD2, border: `1px solid ${BORDER}`, color: TEXT, minHeight: 160 }}>
              {`Hi ${firstName},\n\n${body}\n\nWarmly,`}
            </div>
          </div>

          <p className="text-[11px]" style={{ color: FAINT }}>
            Tokens like {'{{name}}'} are auto-filled per lead at send time.
          </p>
        </div>

        {/* Footer */}
        <div className="px-5 pb-6 pt-4 flex gap-3" style={{ borderTop: `1px solid ${BORDER}` }}>
          <button onClick={onClose} className="flex-1 py-3 rounded-xl font-semibold text-[14px]"
            style={{ background: FAINT, color: MUTED }}>Cancel</button>
          <button className="flex-1 py-3 rounded-xl font-semibold text-[14px] text-white flex items-center justify-center gap-2"
            style={{ background: niche.accent }}>
            <Send size={15} /> Send Email
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Filter Sheet ──────────────────────────────────────────
function FilterSheet({ niche, open, onClose, active, setActive }: {
  niche: typeof NICHES[NicheKey]; open: boolean; onClose: () => void
  active: Record<string, string[]>; setActive: React.Dispatch<React.SetStateAction<Record<string, string[]>>>
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
    <div className="fixed inset-0 z-50 flex items-end justify-center" onClick={onClose}>
      <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.65)' }} />
      <div className="relative w-full rounded-t-3xl p-5 pb-8 overflow-y-auto"
        style={{ maxWidth: 480, maxHeight: '78%', background: CARD, border: `1px solid ${BORDER}` }}
        onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-bold text-[18px]" style={{ color: TEXT }}>Filters</h2>
          <button onClick={onClose} className="p-2 rounded-xl" style={{ background: FAINT }}>
            <X size={18} style={{ color: MUTED }} />
          </button>
        </div>
        {niche.filters.map(f => (
          <div key={f.name} className="mb-5">
            <h3 className="text-[11px] font-bold uppercase tracking-widest mb-2.5" style={{ color: MUTED }}>{f.name}</h3>
            <div className="flex flex-wrap gap-2">
              {f.options.map(opt => {
                const on = (active[f.name] || []).includes(opt)
                return (
                  <button key={opt} onClick={() => toggle(f.name, opt)}
                    className="text-[13px] font-medium px-3 py-1.5 rounded-full transition-colors"
                    style={on
                      ? { background: niche.accent, color: '#fff' }
                      : { background: FAINT, color: MUTED, border: `1px solid ${BORDER}` }}>
                    {opt}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
        <button onClick={onClose} className="w-full mt-2 py-3.5 rounded-xl font-semibold text-white"
          style={{ background: niche.accent }}>
          Show results
        </button>
      </div>
    </div>
  )
}

// ── Stat Card ─────────────────────────────────────────────
function StatCard({ stat, accent }: { stat: typeof NICHES['trainer']['stats'][number]; accent: string }) {
  const Icon = ICON_MAP[stat.iconName] || Search
  return (
    <div className="shrink-0 rounded-2xl p-4"
      style={{ background: CARD2, border: `1px solid ${BORDER}`, minWidth: 150, flex: '1 1 0' }}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: MUTED }}>{stat.label}</span>
        <div className="rounded-lg flex items-center justify-center"
          style={{ width: 30, height: 30, background: `${accent}18` }}>
          <Icon size={16} style={{ color: accent }} strokeWidth={2} />
        </div>
      </div>
      <div className="text-[32px] font-bold leading-none tracking-tight" style={{ color: TEXT }}>{stat.value}</div>
    </div>
  )
}

// ── Lead Card ─────────────────────────────────────────────
function LeadCard({ lead, niche, onProfile, onContact }: {
  lead: Lead; niche: typeof NICHES[NicheKey]; onProfile: () => void; onContact: () => void
}) {
  const c = scoreColor(lead.score)
  return (
    <div className="rounded-2xl p-4" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
      <div className="flex gap-3">
        {/* Avatar */}
        <div className="shrink-0 rounded-xl flex items-center justify-center font-bold text-white text-[14px] self-start"
          style={{ width: 44, height: 44, background: `linear-gradient(135deg, ${niche.accent}, ${niche.accent}99)` }}>
          {initials(lead.name)}
        </div>

        {/* Body */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-bold text-[15px]" style={{ color: TEXT }}>{lead.name}</h3>
            {lead.type && (
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                style={{ background: `${niche.accent}25`, color: niche.accent }}>{lead.type}</span>
            )}
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(34,197,94,0.12)', color: '#4ADE80' }}>Qualified</span>
          </div>
          <p className="text-[12px] mt-0.5 flex items-center gap-1" style={{ color: MUTED }}>
            <MapPin size={11} /> {lead.location} · {lead.timeAgo}
          </p>
          <p className="text-[13px] mt-1.5 leading-snug line-clamp-2" style={{ color: MUTED }}>
            {lead.description}
          </p>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {lead.tags.map(t => (
              <span key={t} className="px-2 py-0.5 rounded-full text-[11px] font-medium"
                style={{ background: `${niche.accent}18`, color: niche.accent }}>{t}</span>
            ))}
            {lead.urgency && (
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold"
                style={{
                  background: lead.urgency === 'Emergency' ? 'rgba(220,38,38,0.15)' : 'rgba(100,116,139,0.12)',
                  color: lead.urgency === 'Emergency' ? '#F87171' : MUTED,
                }}>
                <Clock size={11} /> {lead.urgency}
              </span>
            )}
          </div>
        </div>

        {/* Score */}
        <ScoreRing score={lead.score} />
      </div>

      {/* Buttons */}
      <div className="flex gap-2 mt-3.5">
        <button onClick={onContact}
          className="flex-1 py-2.5 rounded-xl font-semibold text-[13px] text-white flex items-center justify-center gap-1.5"
          style={{ background: niche.accent }}>
          <Send size={13} /> Contact
        </button>
        <button onClick={onProfile}
          className="flex-1 py-2.5 rounded-xl font-semibold text-[13px]"
          style={{ background: FAINT, color: MUTED, border: `1px solid ${BORDER}` }}>
          View profile
        </button>
      </div>
    </div>
  )
}

// ── Campaigns Tab ─────────────────────────────────────────
function CampaignsTab({ niche }: { niche: typeof NICHES[NicheKey] }) {
  const rows = [
    { name: 'Cold DM — Week 1', sent: 120, reply: 28, status: 'Active' },
    { name: 'Free Offer Blast',  sent:  86, reply: 19, status: 'Active' },
    { name: 'Re-engagement',    sent:  54, reply:  7, status: 'Paused' },
  ]
  return (
    <div className="px-4 pt-4 pb-12">
      <h2 className="font-bold text-[18px] mb-4" style={{ color: TEXT }}>Campaigns</h2>
      <div className="flex flex-col gap-3 lg:grid lg:grid-cols-2 lg:gap-4">
        {rows.map(r => (
          <div key={r.name} className="rounded-2xl p-4" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-[15px]" style={{ color: TEXT }}>{r.name}</h3>
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full"
                style={r.status === 'Active'
                  ? { background: `${niche.accent}20`, color: niche.accent }
                  : { background: FAINT, color: MUTED }}>
                {r.status}
              </span>
            </div>
            <div className="flex gap-6">
              {[['Sent', r.sent], ['Replies', r.reply], ['Reply rate', `${Math.round(r.reply / r.sent * 100)}%`]].map(([l, v]) => (
                <div key={l as string}>
                  <div className="font-bold text-[20px]" style={{ color: TEXT }}>{v}</div>
                  <div className="text-[11px] mt-0.5" style={{ color: MUTED }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Analytics Tab ─────────────────────────────────────────
function AnalyticsTab({ niche }: { niche: typeof NICHES[NicheKey] }) {
  const data = [
    { d: 'Mon', v: 18 }, { d: 'Tue', v: 31 }, { d: 'Wed', v: 24 },
    { d: 'Thu', v: 42 }, { d: 'Fri', v: 38 }, { d: 'Sat', v: 51 }, { d: 'Sun', v: 29 },
  ]
  const metrics: [string, string][] = [
    ['Conversion rate', '8.5%'], ['Avg AI score', '78'], ['Reply rate', '23%'], ['Cost / lead', '$1.90'],
  ]
  return (
    <div className="px-4 pt-4 pb-12">
      <h2 className="font-bold text-[18px] mb-4" style={{ color: TEXT }}>Analytics</h2>
      <div className="rounded-2xl p-4 mb-4" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
        <div className="text-[12px] font-semibold" style={{ color: MUTED }}>New leads · last 7 days</div>
        <div className="text-[28px] font-bold tracking-tight mt-0.5" style={{ color: TEXT }}>233</div>
        <div style={{ width: '100%', height: 140 }} className="mt-3">
          <ResponsiveContainer>
            <BarChart data={data} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
              <XAxis dataKey="d" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: MUTED }} />
              <Bar dataKey="v" radius={[6, 6, 0, 0]}>
                {data.map((_, i) => <Cell key={i} fill={i === 5 ? niche.accent : `${niche.accent}40`} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {metrics.map(([l, v]) => (
          <div key={l} className="rounded-2xl p-4" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
            <div className="text-[24px] font-bold tracking-tight" style={{ color: TEXT }}>{v}</div>
            <div className="text-[11px] mt-1" style={{ color: MUTED }}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Settings Tab ──────────────────────────────────────────
function SettingsTab() {
  const groups: [string, string[]][] = [
    ['Account', ['Profile', 'Business details', 'Connected inbox']],
    ['Lead sourcing', ['Target niche', 'Search radius', 'Daily lead cap']],
    ['Automation', ['Auto-score threshold', 'Outreach schedule', 'CRM sync']],
  ]
  return (
    <div className="px-4 pt-4 pb-12">
      <h2 className="font-bold text-[18px] mb-4" style={{ color: TEXT }}>Settings</h2>
      <div className="flex flex-col gap-4 lg:grid lg:grid-cols-3 lg:gap-4">
        {groups.map(([title, items]) => (
          <div key={title}>
            <h3 className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: MUTED }}>{title}</h3>
            <div className="rounded-2xl overflow-hidden" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
              {items.map((it, i) => (
                <button key={it} className="w-full flex items-center justify-between px-4 py-3.5 text-left"
                  style={{ borderTop: i ? `1px solid ${BORDER}` : 'none' }}>
                  <span className="text-[14px]" style={{ color: TEXT }}>{it}</span>
                  <ChevronRight size={16} style={{ color: MUTED }} />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center text-[12px]" style={{ color: MUTED }}>
        NicheLead AI is built and operated by Genzic.AI ·{' '}
        <a href="https://tanxusa.com" target="_blank" rel="noopener noreferrer" style={{ color: MUTED, textDecoration: 'underline' }}>
          TanXUSA.com
        </a>
      </div>
    </div>
  )
}

// ── Nav tabs config ───────────────────────────────────────
const NAV_TABS = [
  { key: 'dashboard', label: 'Dashboard', Icon: LayoutDashboard },
  { key: 'leads',     label: 'Leads',     Icon: Users },
  { key: 'campaigns', label: 'Campaigns', Icon: Send },
  { key: 'analytics', label: 'Analytics', Icon: BarChart3 },
  { key: 'settings',  label: 'Settings',  Icon: Settings },
]

// ── Main Dashboard component ──────────────────────────────
export default function Dashboard({ initialNiche, onBack }: { initialNiche: NicheKey; onBack: () => void }) {
  const [nicheKey, setNicheKey] = useState<NicheKey>(initialNiche)
  const [tab, setTab]           = useState('dashboard')
  const [filterOpen, setFilterOpen]   = useState(false)
  const [profileLead, setProfileLead] = useState<Lead | null>(null)
  const [outreachLead, setOutreachLead] = useState<Lead | null>(null)
  const [active, setActive]     = useState<Record<string, string[]>>({})
  const [search, setSearch]     = useState('')

  const niche  = NICHES[nicheKey]
  const leads  = LEADS[nicheKey]
  const NIcon  = NICHE_ICONS[nicheKey]
  const activeChips = useMemo(() => Object.values(active).flat().filter(Boolean), [active])

  const filteredLeads = useMemo(() => {
    if (!search) return leads
    const q = search.toLowerCase()
    return leads.filter(l =>
      l.name.toLowerCase().includes(q) ||
      l.tags.some(t => t.toLowerCase().includes(q)) ||
      l.location.toLowerCase().includes(q)
    )
  }, [leads, search])

  const switchNiche = (k: NicheKey) => { setNicheKey(k); setActive({}); setSearch('') }

  return (
    <div className="min-h-screen w-full" style={{ background: BG }}>

      {/* ── HEADER ── */}
      <header className="sticky top-0 z-30" style={{ background: CARD, borderBottom: `1px solid ${BORDER}` }}>

        {/* Row 1 */}
        <div className="flex items-center gap-2 px-4 pt-3 pb-2 lg:px-8">
          <button onClick={onBack}
            className="shrink-0 flex items-center gap-1 text-[12px] font-semibold px-2.5 py-1.5 rounded-xl"
            style={{ background: FAINT, color: MUTED }}>
            <ArrowLeft size={14} /> Industries
          </button>

          <div className="flex items-center gap-2 mx-1">
            <div className="shrink-0 rounded-lg flex items-center justify-center"
              style={{ width: 28, height: 28, background: niche.accent }}>
              <NIcon size={15} color="#fff" strokeWidth={2.2} />
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-[14px] leading-none" style={{ color: TEXT }}>{niche.label}</div>
              <div className="text-[10px] mt-0.5" style={{ color: MUTED }}>Genzic.AI</div>
            </div>
          </div>

          {/* Niche pills */}
          <div className="flex-1 flex gap-1.5 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
            {(Object.keys(NICHES) as NicheKey[]).map(k => {
              const n = NICHES[k]; const on = k === nicheKey
              const KIcon = NICHE_ICONS[k]
              return (
                <button key={k} onClick={() => switchNiche(k)}
                  className="shrink-0 flex items-center gap-1 text-[12px] font-semibold px-2.5 py-1 rounded-full transition-colors"
                  style={on
                    ? { background: n.accent, color: '#fff' }
                    : { background: FAINT, color: MUTED, border: `1px solid ${BORDER}` }}>
                  <KIcon size={13} /> {n.short}
                </button>
              )
            })}
          </div>

          <button className="shrink-0 relative p-1.5 ml-1">
            <Bell size={18} style={{ color: MUTED }} />
            <span className="absolute top-1.5 right-1.5 rounded-full"
              style={{ width: 6, height: 6, background: niche.accent }} />
          </button>
          <div className="shrink-0 rounded-full" style={{ width: 28, height: 28, background: FAINT }} />
        </div>

        {/* Row 2 — nav tabs */}
        <div className="flex overflow-x-auto px-4 lg:px-8" style={{ scrollbarWidth: 'none' }}>
          {NAV_TABS.map(t => {
            const on = t.key === tab
            const TIcon = t.Icon
            return (
              <button key={t.key} onClick={() => setTab(t.key)}
                className="shrink-0 flex items-center gap-1.5 px-3 py-2.5 text-[13px] font-semibold border-b-2 transition-colors whitespace-nowrap"
                style={on
                  ? { borderColor: niche.accent, color: niche.accent }
                  : { borderColor: 'transparent', color: MUTED }}>
                <TIcon size={14} /> {t.label}
              </button>
            )
          })}
        </div>
      </header>

      {/* ── BODY ── */}
      <main className="max-w-[1180px] mx-auto">

        {(tab === 'dashboard' || tab === 'leads') && (
          <>
            {/* Stats (dashboard only) */}
            {tab === 'dashboard' && (
              <section className="px-4 lg:px-8 pt-5 pb-2">
                <p className="text-[12px] font-medium mb-3" style={{ color: MUTED }}>{niche.description}</p>
                <div className="flex gap-3 overflow-x-auto pb-1 lg:grid lg:grid-cols-4 lg:overflow-visible"
                  style={{ scrollbarWidth: 'none' }}>
                  {niche.stats.map(s => <StatCard key={s.label} stat={s} accent={niche.accent} />)}
                </div>
              </section>
            )}

            {/* Search + filter bar */}
            <section className="px-4 lg:px-8 pt-4 pb-2 flex items-center gap-2">
              <div className="flex-1 flex items-center gap-2 rounded-xl px-3 py-2.5"
                style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                <Search size={15} style={{ color: MUTED }} />
                <input value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="Search leads..."
                  className="flex-1 bg-transparent outline-none text-[13px] placeholder:text-[#4B5B53]"
                  style={{ color: TEXT }}
                />
              </div>

              <button onClick={() => setFilterOpen(true)}
                className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-[13px] font-semibold"
                style={{ background: CARD, border: `1px solid ${BORDER}`, color: MUTED }}>
                <SlidersHorizontal size={15} /> Filters
                {activeChips.length > 0 && (
                  <span className="text-[10px] font-bold px-1.5 rounded-full text-white"
                    style={{ background: niche.accent }}>{activeChips.length}</span>
                )}
              </button>
              <button onClick={() => setOutreachLead(leads[0] as Lead)}
                className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-[13px] font-semibold text-white"
                style={{ background: niche.accent }}>
                <MessageSquare size={15} /> Templates
              </button>
            </section>

            <div className="px-4 lg:px-8 pb-2">
              <span className="text-[12px] font-medium" style={{ color: MUTED }}>{filteredLeads.length} leads</span>
            </div>

            {/* Lead cards */}
            <section className="px-4 lg:px-8 pb-12 flex flex-col gap-3 lg:grid lg:grid-cols-2 xl:grid-cols-3 lg:gap-4">
              {filteredLeads.map(lead => (
                <LeadCard key={lead.name} lead={lead} niche={niche}
                  onProfile={() => setProfileLead(lead)}
                  onContact={() => setOutreachLead(lead)}
                />
              ))}
            </section>
          </>
        )}

        {tab === 'campaigns' && <CampaignsTab niche={niche} />}
        {tab === 'analytics'  && <AnalyticsTab niche={niche} />}
        {tab === 'settings'   && <SettingsTab />}
      </main>

      {/* ── PANELS ── */}
      {profileLead && (
        <LeadProfilePanel lead={profileLead} niche={niche}
          onClose={() => setProfileLead(null)}
          onContact={() => { setOutreachLead(profileLead); setProfileLead(null) }}
        />
      )}
      {outreachLead && (
        <OutreachPanel lead={outreachLead} niche={niche} onClose={() => setOutreachLead(null)} />
      )}
      <FilterSheet niche={niche} open={filterOpen} onClose={() => setFilterOpen(false)}
        active={active} setActive={setActive} />
    </div>
  )
}
