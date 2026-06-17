'use client'
import React, { useState, useMemo } from 'react'
import {
  Dumbbell, Sparkles, Home, Building2,
  SlidersHorizontal, X, Copy, Check, Search, Bell,
  TrendingUp, ArrowLeft, Zap, Send, BarChart3, Settings,
  Users, LayoutDashboard, DollarSign, FileText, ShieldCheck,
  Target, MapPin, Flame, CalendarCheck, MessageSquare,
  ChevronRight, Clock, GitBranch, Megaphone, Plus,
  Mail, MessageCircle, Play, Pause, User,
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

  const subject = tpl.subject || `${firstName}, let's talk ${lead.tags[0] || niche.short} ✨`

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
  const stageLabel = lead.stage.charAt(0).toUpperCase() + lead.stage.slice(1)
  const stageBg = lead.stage === 'qualified' ? 'rgba(34,197,94,0.12)'
    : lead.stage === 'contacted' ? 'rgba(245,158,11,0.12)'
    : lead.stage === 'converted' ? 'rgba(99,102,241,0.12)'
    : FAINT
  const stageFg = lead.stage === 'qualified' ? '#4ADE80'
    : lead.stage === 'contacted' ? '#FCD34D'
    : lead.stage === 'converted' ? '#818CF8'
    : MUTED

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
              style={{ background: stageBg, color: stageFg }}>{stageLabel}</span>
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

// ── Pipeline Tab ──────────────────────────────────────────
type StageKey = 'new' | 'qualified' | 'contacted' | 'converted'

function PipelineTab({ leads, niche, onProfile }: {
  leads: Lead[]; niche: typeof NICHES[NicheKey]; onProfile: (l: Lead) => void
}) {
  const [stages, setStages] = useState<Record<string, StageKey>>(
    Object.fromEntries(leads.map(l => [l.name, l.stage as StageKey]))
  )

  const cols: { key: StageKey; label: string }[] = [
    { key: 'new',       label: 'New' },
    { key: 'qualified', label: 'Qualified' },
    { key: 'contacted', label: 'Contacted' },
    { key: 'converted', label: 'Converted' },
  ]

  const moveStage = (name: string, to: StageKey) => {
    setStages(prev => ({ ...prev, [name]: to }))
  }

  const nextStage = (current: StageKey): StageKey | null => {
    const order: StageKey[] = ['new', 'qualified', 'contacted', 'converted']
    const idx = order.indexOf(current)
    return idx < order.length - 1 ? order[idx + 1] : null
  }

  return (
    <div className="px-4 lg:px-8 pt-5 pb-24 overflow-x-auto">
      <div className="flex gap-4 min-w-max lg:min-w-0 lg:grid lg:grid-cols-4">
        {cols.map(col => {
          const colLeads = leads.filter(l => (stages[l.name] || l.stage) === col.key)
          const colColor = col.key === 'qualified' ? '#22C55E'
            : col.key === 'contacted' ? '#F59E0B'
            : col.key === 'converted' ? '#818CF8'
            : MUTED

          return (
            <div key={col.key} className="w-72 lg:w-auto">
              {/* Column header */}
              <div className="flex items-center gap-2 mb-3">
                <span className="font-bold text-[13px]" style={{ color: colColor }}>{col.label}</span>
                <span className="text-[12px] px-2 py-0.5 rounded-full font-semibold"
                  style={{ background: FAINT, color: MUTED }}>{colLeads.length}</span>
              </div>

              {/* Cards */}
              <div className="flex flex-col gap-3">
                {colLeads.length === 0 ? (
                  <div className="rounded-2xl p-4 text-center text-[13px]"
                    style={{ background: CARD, border: `1px solid ${BORDER}`, color: MUTED }}>
                    No leads
                  </div>
                ) : colLeads.map(lead => {
                  const c = scoreColor(lead.score)
                  const next = nextStage(stages[lead.name] as StageKey || col.key)
                  return (
                    <div key={lead.name} className="rounded-2xl p-3"
                      style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="rounded-lg flex items-center justify-center font-bold text-white text-[12px] shrink-0"
                          style={{ width: 32, height: 32, background: `linear-gradient(135deg, ${niche.accent}, ${niche.accent}88)` }}>
                          {initials(lead.name)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-[13px] truncate" style={{ color: TEXT }}>{lead.name}</div>
                          <div className="text-[11px]" style={{ color: MUTED }}>{lead.location}</div>
                        </div>
                        <div className="flex items-center justify-center rounded-full shrink-0"
                          style={{ width: 32, height: 32, border: `2px solid ${c.ring}`, background: `${c.ring}18` }}>
                          <span className="font-bold text-[11px]" style={{ color: c.fg }}>{lead.score}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-2.5">
                        {lead.tags.slice(0, 2).map(t => (
                          <span key={t} className="px-1.5 py-0.5 rounded-full text-[10px] font-medium"
                            style={{ background: `${niche.accent}18`, color: niche.accent }}>{t}</span>
                        ))}
                      </div>
                      {next && (
                        <button
                          onClick={() => moveStage(lead.name, next)}
                          className="w-full py-1.5 rounded-xl text-[12px] font-semibold"
                          style={{ background: FAINT, color: MUTED, border: `1px solid ${BORDER}` }}>
                          Move to {next.charAt(0).toUpperCase() + next.slice(1)}
                        </button>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Campaigns Tab ─────────────────────────────────────────
function CampaignsTab({ niche }: { niche: typeof NICHES[NicheKey] }) {
  const [campaigns, setCampaigns] = useState([
    { name: 'Complimentary Skin Consult', sent: 126, replyRate: 12, status: 'Active' as 'Active' | 'Paused', icon: 'email' },
    { name: 'New Client Promo',           sent: 593, replyRate: 18, status: 'Paused' as 'Active' | 'Paused', icon: 'email' },
    { name: 'SMS — Booking Reminder',     sent: 413, replyRate: 21, status: 'Active' as 'Active' | 'Paused', icon: 'sms'   },
  ])

  const toggle = (i: number) => {
    setCampaigns(prev => prev.map((c, idx) =>
      idx === i ? { ...c, status: c.status === 'Active' ? 'Paused' : 'Active' } : c
    ))
  }

  return (
    <div className="px-4 lg:px-8 pt-5 pb-24">
      <div className="flex items-start justify-between mb-1">
        <div>
          <h2 className="font-bold text-[20px]" style={{ color: TEXT }}>Campaigns</h2>
          <p className="text-[13px] mt-0.5" style={{ color: MUTED }}>Automated outreach sequences, powered by Zapier.</p>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[13px] font-semibold text-white"
          style={{ background: niche.accent }}>
          <Plus size={15} /> New
        </button>
      </div>

      {/* Banner */}
      <div className="flex items-center gap-3 rounded-2xl px-4 py-3 mt-4 mb-5"
        style={{ background: `${niche.accent}14`, border: `1px solid ${niche.accent}30` }}>
        <Zap size={18} style={{ color: niche.accent }} />
        <p className="text-[13px]" style={{ color: TEXT }}>
          Outreach is fully automated — every campaign sends email &amp; SMS for you through the NicheLead backend. Just write your message and hit send.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {campaigns.map((c, i) => (
          <div key={c.name} className="rounded-2xl p-4" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                {c.icon === 'sms'
                  ? <MessageCircle size={18} style={{ color: niche.accent }} />
                  : <Mail size={18} style={{ color: niche.accent }} />
                }
                <h3 className="font-semibold text-[15px]" style={{ color: TEXT }}>{c.name}</h3>
              </div>
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full"
                style={c.status === 'Active'
                  ? { background: `${niche.accent}20`, color: niche.accent }
                  : { background: FAINT, color: MUTED }}>
                {c.status}
              </span>
            </div>

            <div className="flex gap-6 mb-3">
              <div>
                <div className="font-bold text-[22px]" style={{ color: TEXT }}>{c.sent}</div>
                <div className="text-[11px]" style={{ color: MUTED }}>Sent</div>
              </div>
              <div>
                <div className="font-bold text-[22px]" style={{ color: niche.accent }}>{c.replyRate}%</div>
                <div className="text-[11px]" style={{ color: MUTED }}>Reply rate</div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="rounded-full overflow-hidden mb-3" style={{ height: 5, background: FAINT }}>
              <div className="h-full rounded-full" style={{ width: `${c.replyRate}%`, background: niche.accent }} />
            </div>

            <button onClick={() => toggle(i)}
              className="w-full py-2.5 rounded-xl font-semibold text-[13px] flex items-center justify-center gap-2"
              style={{ background: FAINT, color: MUTED, border: `1px solid ${BORDER}` }}>
              {c.status === 'Active'
                ? <><Pause size={14} /> Pause</>
                : <><Play size={14} /> Resume</>
              }
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Analytics Tab ─────────────────────────────────────────
function AnalyticsTab({ niche, leads }: { niche: typeof NICHES[NicheKey]; leads: Lead[] }) {
  const hotCount  = leads.filter(l => l.score >= 85).length
  const warmCount = leads.filter(l => l.score >= 70 && l.score < 85).length
  const coolCount = leads.filter(l => l.score < 70).length
  const total     = leads.length
  const hotPct    = Math.round(hotCount / total * 100)

  const weekData = [
    { d: 'Mon', v: 20 },
    { d: 'Tue', v: 31 },
    { d: 'Wed', v: 86 },
    { d: 'Thu', v: 55 },
    { d: 'Fri', v: 57 },
    { d: 'Sat', v: 25 },
    { d: 'Sun', v: 96 },
  ]

  return (
    <div className="px-4 lg:px-8 pt-5 pb-24">
      <h2 className="font-bold text-[20px] mb-1" style={{ color: TEXT }}>Analytics</h2>
      <p className="text-[13px] mb-5" style={{ color: MUTED }}>Lead quality and pipeline performance for {niche.label}.</p>

      {/* Top metrics */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { label: 'Avg AI Score', value: Math.round(leads.reduce((a, l) => a + l.score, 0) / total) },
          { label: 'Hot Leads (85+)', value: `${hotPct}%` },
          { label: 'Qualify Rate', value: `${Math.round((leads.filter(l => l.stage !== 'new').length / total) * 100)}%` },
        ].map(m => (
          <div key={m.label} className="rounded-2xl p-3 text-center" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
            <div className="font-bold text-[22px] tracking-tight" style={{ color: niche.accent }}>{m.value}</div>
            <div className="text-[11px] mt-1" style={{ color: MUTED }}>{m.label}</div>
          </div>
        ))}
      </div>

      {/* Weekly chart */}
      <div className="rounded-2xl p-4 mb-5" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
        <div className="text-[13px] font-semibold mb-1" style={{ color: TEXT }}>Leads discovered this week</div>
        <div style={{ width: '100%', height: 140 }} className="mt-3">
          <ResponsiveContainer>
            <BarChart data={weekData} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
              <XAxis dataKey="d" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: MUTED }} />
              <Bar dataKey="v" radius={[6, 6, 0, 0]}>
                {weekData.map((_, i) => (
                  <Cell key={i} fill={i === 6 ? niche.accent : `${niche.accent}40`} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-between mt-1 text-[11px]" style={{ color: MUTED }}>
          {weekData.map(d => (
            <span key={d.d}>{d.v} leads</span>
          ))}
        </div>
      </div>

      {/* Score distribution */}
      <div className="rounded-2xl p-4" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
        <div className="font-semibold text-[14px] mb-3" style={{ color: TEXT }}>Score distribution</div>
        {[
          { label: '85-100 · Hot',    count: hotCount,  pct: hotPct,                              color: '#22C55E' },
          { label: '70-84 · Warm',   count: warmCount, pct: Math.round(warmCount / total * 100), color: '#F59E0B' },
          { label: 'Below 70 · Nurture', count: coolCount, pct: Math.round(coolCount / total * 100), color: '#64748B' },
        ].map(row => (
          <div key={row.label} className="mb-3">
            <div className="flex justify-between mb-1">
              <span className="text-[12px]" style={{ color: MUTED }}>{row.label}</span>
              <span className="text-[12px] font-semibold" style={{ color: TEXT }}>{row.count} ({row.pct}%)</span>
            </div>
            <div className="rounded-full overflow-hidden" style={{ height: 6, background: FAINT }}>
              <div className="h-full rounded-full" style={{ width: `${row.pct}%`, background: row.color }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Settings Tab ──────────────────────────────────────────
function SettingsTab({ niche }: { niche: typeof NICHES[NicheKey] }) {
  const [name, setName]       = useState('Jordan Rivera')
  const [biz, setBiz]         = useState('Glow Studio')
  const [email, setEmail]     = useState('you@yourbusiness.com')
  const [ig, setIg]           = useState('')
  const [tiktok, setTiktok]   = useState('')
  const [fb, setFb]           = useState('')
  const [tw, setTw]           = useState('')
  const [saved, setSaved]     = useState(false)
  const [chatOn, setChatOn]   = useState(false)
  const [tawkId, setTawkId]   = useState('')
  const [widgetId, setWidgetId] = useState('default')

  const doSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000) }

  const inputStyle = {
    background: CARD2, border: `1px solid ${BORDER}`, color: TEXT,
    borderRadius: 12, padding: '10px 14px', fontSize: 14, width: '100%', outline: 'none',
  }

  return (
    <div className="px-4 lg:px-8 pt-5 pb-24 max-w-2xl">
      <h2 className="font-bold text-[20px] mb-1" style={{ color: TEXT }}>Settings</h2>
      <p className="text-[13px] mb-5" style={{ color: MUTED }}>Your profile and workspace for {niche.label}.</p>

      {/* Profile section */}
      <div className="rounded-2xl p-5 mb-4" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-bold text-[15px]" style={{ color: TEXT }}>Your Profile</h3>
          {saved && (
            <span className="text-[12px] font-semibold px-2.5 py-1 rounded-full"
              style={{ background: 'rgba(34,197,94,0.15)', color: '#4ADE80' }}>Saved</span>
          )}
        </div>
        <p className="text-[12px] mb-4" style={{ color: MUTED }}>
          Used to personalize every email &amp; message. Saved on this device automatically.
        </p>

        <div className="flex flex-col gap-3">
          <div>
            <label className="block text-[12px] font-semibold mb-1.5" style={{ color: MUTED }}>Full name</label>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Jordan Rivera" style={inputStyle} />
          </div>
          <div>
            <label className="block text-[12px] font-semibold mb-1.5" style={{ color: MUTED }}>Business name</label>
            <input value={biz} onChange={e => setBiz(e.target.value)} placeholder="Glow Studio" style={inputStyle} />
          </div>
          <div>
            <label className="block text-[12px] font-semibold mb-1.5" style={{ color: MUTED }}>Email address</label>
            <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="you@yourbusiness.com" style={inputStyle} />
          </div>

          <div>
            <label className="block text-[12px] font-semibold mb-2" style={{ color: MUTED }}>Social handles</label>
            <div className="flex flex-col gap-2">
              {[
                { label: 'Instagram', val: ig, set: setIg },
                { label: 'TikTok',    val: tiktok, set: setTiktok },
                { label: 'Facebook',  val: fb, set: setFb, ph: 'Your Page name' },
                { label: 'X (Twitter)', val: tw, set: setTw },
              ].map(s => (
                <div key={s.label} className="flex items-center gap-2">
                  <label className="text-[12px] w-24 shrink-0" style={{ color: MUTED }}>{s.label}</label>
                  <input value={s.val} onChange={e => s.set(e.target.value)}
                    placeholder={s.ph || '@yourhandle'} style={{ ...inputStyle }} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Signature preview */}
        <div className="mt-4 p-3 rounded-xl" style={{ background: CARD2, border: `1px solid ${BORDER}` }}>
          <div className="text-[11px] font-bold mb-2" style={{ color: MUTED }}>Email signature preview</div>
          <div className="text-[13px] font-semibold" style={{ color: TEXT }}>{name || 'Your Name'}</div>
          <div className="text-[12px]" style={{ color: MUTED }}>{biz || 'Your Business'}</div>
          <div className="text-[12px]" style={{ color: MUTED }}>{email}</div>
        </div>

        {/* Token reference */}
        <div className="mt-3">
          <div className="text-[11px] mb-1" style={{ color: MUTED }}>Tokens available in templates:</div>
          <div className="flex flex-wrap gap-1.5">
            {['{{name}}', '{{business}}', '{{email}}', '{{instagram}}', '{{tiktok}}'].map(t => (
              <span key={t} className="px-2 py-0.5 rounded text-[11px] font-mono"
                style={{ background: `${niche.accent}18`, color: niche.accent }}>{t}</span>
            ))}
          </div>
        </div>

        <button onClick={doSave} className="mt-4 px-5 py-2.5 rounded-xl font-semibold text-[13px] text-white"
          style={{ background: niche.accent }}>
          Save changes
        </button>
      </div>

      {/* Live chat section */}
      <div className="rounded-2xl p-5 mb-4" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-bold text-[15px]" style={{ color: TEXT }}>Live Chat Integration</h3>
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
            style={{ background: chatOn ? `${niche.accent}20` : FAINT, color: chatOn ? niche.accent : MUTED }}>
            {chatOn ? 'On' : 'Off'}
          </span>
        </div>
        <p className="text-[12px] mb-4" style={{ color: MUTED }}>Add a Tawk.to live-chat widget to your dashboard.</p>

        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-[13px] font-semibold" style={{ color: TEXT }}>Enable live chat widget</div>
            <div className="text-[12px]" style={{ color: MUTED }}>Shows the chat bubble in the bottom-right corner.</div>
          </div>
          <button onClick={() => setChatOn(v => !v)}
            className="relative rounded-full transition-colors"
            style={{
              width: 44, height: 24,
              background: chatOn ? niche.accent : FAINT,
              border: `1px solid ${BORDER}`,
            }}>
            <span className="absolute top-0.5 rounded-full transition-all"
              style={{
                width: 20, height: 20,
                background: '#fff',
                left: chatOn ? 22 : 2,
              }} />
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <div>
            <label className="block text-[12px] font-semibold mb-1.5" style={{ color: MUTED }}>Tawk.to Property ID</label>
            <input value={tawkId} onChange={e => setTawkId(e.target.value)}
              placeholder="e.g. 5f9a1b2c3d4e5f6a7b8c9d0e" style={inputStyle} />
          </div>
          <div>
            <label className="block text-[12px] font-semibold mb-1.5" style={{ color: MUTED }}>
              Widget ID <span style={{ color: MUTED, fontWeight: 400 }}>(optional)</span>
            </label>
            <input value={widgetId} onChange={e => setWidgetId(e.target.value)}
              placeholder="default" style={inputStyle} />
          </div>
        </div>
        <p className="text-[11px] mt-3" style={{ color: MUTED }}>
          Leads do not need a Tawk.to account. This widget will appear on your own website for live chat.
        </p>
      </div>

      {/* Workspace status */}
      <div className="rounded-2xl p-5" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-bold text-[15px]" style={{ color: TEXT }}>Workspace status</h3>
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
            style={{ background: 'rgba(34,197,94,0.15)', color: '#4ADE80' }}>Connected</span>
        </div>
        <p className="text-[13px] mb-3" style={{ color: MUTED }}>
          Your workspace is fully configured. Lead discovery, AI scoring, and email &amp; SMS outreach are managed automatically.
        </p>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ background: '#22C55E' }} />
          <span className="text-[13px]" style={{ color: TEXT }}>All systems operational</span>
        </div>
      </div>
    </div>
  )
}

// ── Nav tabs config ───────────────────────────────────────
const NAV_TABS = [
  { key: 'dashboard', label: 'Dashboard', Icon: LayoutDashboard },
  { key: 'leads',     label: 'Leads',     Icon: Users },
  { key: 'pipeline',  label: 'Pipeline',  Icon: GitBranch },
  { key: 'campaigns', label: 'Campaigns', Icon: Megaphone },
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
            className="shrink-0 p-2 rounded-xl"
            style={{ background: FAINT }}>
            <ArrowLeft size={16} style={{ color: MUTED }} />
          </button>

          {/* Logo */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="rounded-full flex items-center justify-center"
              style={{ width: 32, height: 32, background: '#102019', boxShadow: 'inset 0 0 0 1px #1E3A2C' }}>
              <Zap size={14} color="#22C55E" strokeWidth={2.4} />
            </div>
          </div>

          <div className="min-w-0">
            <div className="font-bold text-[14px] leading-none" style={{ color: TEXT }}>{niche.label}</div>
            <div className="text-[10px] mt-0.5" style={{ color: MUTED }}>Genzic</div>
          </div>

          {/* Niche pills */}
          <div className="flex-1 flex gap-1.5 overflow-x-auto justify-end" style={{ scrollbarWidth: 'none' }}>
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

          <button className="shrink-0 flex items-center gap-1.5 text-[12px] font-semibold px-2.5 py-1.5 rounded-xl ml-1"
            style={{ background: FAINT, color: MUTED }}>
            <User size={14} /> Profile
          </button>
        </div>

        {/* Row 2 — nav tabs */}
        <nav className="flex overflow-x-auto px-4 lg:px-8" style={{ scrollbarWidth: 'none' }}>
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
        </nav>
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
            <section className="px-4 lg:px-8 pb-24 flex flex-col gap-3 lg:grid lg:grid-cols-2 xl:grid-cols-3 lg:gap-4">
              {filteredLeads.map(lead => (
                <LeadCard key={lead.name} lead={lead} niche={niche}
                  onProfile={() => setProfileLead(lead)}
                  onContact={() => setOutreachLead(lead)}
                />
              ))}
            </section>
          </>
        )}

        {tab === 'pipeline'  && <PipelineTab leads={leads} niche={niche} onProfile={l => setProfileLead(l)} />}
        {tab === 'campaigns' && <CampaignsTab niche={niche} />}
        {tab === 'analytics' && <AnalyticsTab niche={niche} leads={leads} />}
        {tab === 'settings'  && <SettingsTab niche={niche} />}
      </main>

      {/* ── BOTTOM NAV ── */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 flex"
        style={{ background: CARD, borderTop: `1px solid ${BORDER}` }}>
        {NAV_TABS.map(t => {
          const on = t.key === tab
          const TIcon = t.Icon
          return (
            <button key={t.key} onClick={() => setTab(t.key)}
              className="flex-1 flex flex-col items-center justify-center py-2.5 gap-0.5 transition-colors"
              style={{ color: on ? niche.accent : MUTED }}>
              <TIcon size={20} />
              <span className="text-[10px] font-semibold">{t.label}</span>
            </button>
          )
        })}
      </nav>

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
