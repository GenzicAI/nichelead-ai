'use client'
import React, { useState } from 'react'
import { Dumbbell, Sparkles, Home, Building2, ChevronDown, ArrowRight, ExternalLink, Zap } from 'lucide-react'
import { NICHES, type NicheKey } from '@/lib/data'

const ICON_MAP: Record<string, any> = { Dumbbell, Sparkles, Home, Building2 }

export default function Landing({ onSelect }: { onSelect: (key: NicheKey) => void }) {
  const [picked, setPicked] = useState<NicheKey | ''>('')
  const keys = Object.keys(NICHES) as NicheKey[]

  return (
    <div className="min-h-screen w-full flex flex-col items-center" style={{ background: '#0A1612' }}>
      <div className="w-full flex-1 flex flex-col items-center justify-center px-6 py-16 lg:py-24" style={{ maxWidth: 640 }}>

        {/* LOGO */}
        <div className="flex items-center gap-2.5 mb-10">
          <div className="rounded-full flex items-center justify-center" style={{ width: 36, height: 36, background: '#102019', boxShadow: 'inset 0 0 0 1px #1E3A2C' }}>
            <Zap size={18} color="#22C55E" strokeWidth={2.4} />
          </div>
          <span className="text-[15px] font-semibold tracking-tight" style={{ color: '#E5E9E7' }}>Genzic.AI</span>
        </div>

        {/* BADGE */}
        <span className="text-[12px] font-semibold px-3 py-1.5 rounded-full mb-6"
          style={{ color: '#4ADE80', background: 'rgba(34,197,94,0.08)', boxShadow: 'inset 0 0 0 1px rgba(74,222,128,0.35)' }}>
          AI-Powered Lead Generation
        </span>

        {/* HEADLINE */}
        <h1 className="text-center font-bold leading-none mb-4" style={{ color: '#F5F7F6', fontSize: 'clamp(40px, 7vw, 56px)' }}>
          NicheLead AI
        </h1>
        <p className="text-center mb-10" style={{ color: '#8A9690', fontSize: 17, maxWidth: 480, lineHeight: 1.5 }}>
          Pick your industry to launch a dashboard built for how you actually find, score, and close leads.
        </p>

        {/* INDUSTRY PICKER */}
        <div className="w-full" style={{ maxWidth: 460 }}>
          <div className="text-center text-[12px] font-semibold tracking-[0.12em] mb-3" style={{ color: '#6B7B73' }}>
            CHOOSE YOUR INDUSTRY
          </div>

          <div className="relative mb-3">
            <select
              value={picked}
              onChange={e => setPicked(e.target.value as NicheKey)}
              className="w-full appearance-none rounded-2xl px-5 py-4 text-[15px] font-medium outline-none cursor-pointer"
              style={{ background: '#0F1D17', color: picked ? '#F5F7F6' : '#5C6B63', boxShadow: 'inset 0 0 0 1px #1E2F26' }}
            >
              <option value="" disabled>Select your industry...</option>
              {keys.map(k => <option key={k} value={k}>{NICHES[k].label}</option>)}
            </select>
            <ChevronDown size={18} className="absolute pointer-events-none" style={{ right: 20, top: '50%', transform: 'translateY(-50%)', color: '#5C6B63' }} />
          </div>

          {/* QUICK SELECT CARDS */}
          <div className="grid grid-cols-2 gap-2.5 mb-6">
            {keys.map(k => {
              const n = NICHES[k]; const Icon = ICON_MAP[n.iconName] ?? Home; const on = picked === k
              return (
                <button key={k} onClick={() => setPicked(k)}
                  className="flex items-center gap-2.5 rounded-xl px-3.5 py-3 text-left transition-colors"
                  style={on
                    ? { background: 'rgba(34,197,94,0.10)', boxShadow: 'inset 0 0 0 1px #22C55E' }
                    : { background: '#0F1D17', boxShadow: 'inset 0 0 0 1px #1E2F26' }}>
                  <Icon size={16} color={on ? '#4ADE80' : '#6B7B73'} strokeWidth={2.2} />
                  <span className="text-[13px] font-semibold truncate" style={{ color: on ? '#E5F7EC' : '#8A9690' }}>{n.short}</span>
                </button>
              )
            })}
          </div>

          <button
            disabled={!picked}
            onClick={() => picked && onSelect(picked)}
            className="w-full flex items-center justify-center gap-2 rounded-2xl py-4 font-semibold text-[15px] transition-opacity"
            style={{ background: picked ? '#22C55E' : '#173025', color: picked ? '#08160F' : '#4A5D52', cursor: picked ? 'pointer' : 'not-allowed' }}>
            Open dashboard <ArrowRight size={18} />
          </button>

          <p className="text-center mt-5 text-[13px]" style={{ color: '#5C6B63' }}>
            More niches coming soon — the platform is built to scale to 30+ industries.
          </p>
        </div>
      </div>

      {/* FOOTER LINKS */}
      <div className="w-full flex gap-3 px-6 pb-10" style={{ maxWidth: 460 }}>
        <a href="https://genzic.ai" target="_blank" rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 rounded-xl py-3.5 text-[14px] font-semibold"
          style={{ background: '#22C55E', color: '#08160F' }}>
          Visit Genzic.AI <ExternalLink size={14} />
        </a>
        <a href="https://tanxusa.com" target="_blank" rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 rounded-xl py-3.5 text-[14px] font-semibold"
          style={{ background: 'transparent', color: '#E5E9E7', boxShadow: 'inset 0 0 0 1px #2A3B33' }}>
          Visit TanXUSA.com <ExternalLink size={14} />
        </a>
      </div>
    </div>
  )
}
