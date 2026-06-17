'use client'
import React, { useState } from 'react'
import { ArrowRight, ExternalLink, Zap } from 'lucide-react'
import { NICHES, type NicheKey } from '@/lib/data'

export default function Landing({ onSelect }: { onSelect: (key: NicheKey) => void }) {
  const [picked, setPicked] = useState<NicheKey | ''>('')
  const keys = Object.keys(NICHES) as NicheKey[]

  return (
    <div className="min-h-screen w-full flex flex-col items-center" style={{ background: '#0A1612' }}>
      <div className="w-full flex-1 flex flex-col items-center justify-center px-6 py-16" style={{ maxWidth: 600 }}>

        {/* Logo */}
        <div className="flex items-center gap-2.5 mb-8">
          <div className="rounded-full flex items-center justify-center"
            style={{ width: 38, height: 38, background: '#102019', boxShadow: 'inset 0 0 0 1px #1E3A2C' }}>
            <Zap size={18} color="#22C55E" strokeWidth={2.4} />
          </div>
          <span className="text-[15px] font-semibold tracking-tight" style={{ color: '#E5E9E7' }}>Genzic.AI</span>
        </div>

        {/* Badge */}
        <span className="text-[12px] font-semibold px-3 py-1.5 rounded-full mb-6"
          style={{ color: '#4ADE80', background: 'rgba(34,197,94,0.08)', boxShadow: 'inset 0 0 0 1px rgba(74,222,128,0.3)' }}>
          AI-Powered Lead Generation
        </span>

        {/* Headline */}
        <h1 className="text-center font-bold leading-none mb-4"
          style={{ color: '#F5F7F6', fontSize: 'clamp(40px, 8vw, 60px)' }}>
          NicheLead AI
        </h1>
        <p className="text-center mb-10"
          style={{ color: '#8A9690', fontSize: 17, maxWidth: 460, lineHeight: 1.55 }}>
          Pick your industry to launch a dashboard built for how you actually find, score, and close leads.
        </p>

        {/* Dropdown only — no quick-select cards */}
        <div className="w-full" style={{ maxWidth: 480 }}>
          <div className="text-center text-[11px] font-bold tracking-[0.14em] mb-3" style={{ color: '#5C6B63' }}>
            CHOOSE YOUR INDUSTRY
          </div>

          <div className="relative mb-4">
            <select
              value={picked}
              onChange={e => setPicked(e.target.value as NicheKey)}
              className="w-full appearance-none rounded-2xl px-5 py-4 text-[15px] font-medium outline-none cursor-pointer"
              style={{
                background: '#0F1D17',
                color: picked ? '#F5F7F6' : '#5C6B63',
                boxShadow: 'inset 0 0 0 1.5px #22C55E40',
              }}>
              <option value="" disabled style={{ background: '#0F1D17' }}>Select your industry...</option>
              {keys.map(k => (
                <option key={k} value={k} style={{ background: '#0F1D17', color: '#F5F7F6' }}>
                  {NICHES[k].label}
                </option>
              ))}
            </select>
            <svg className="absolute pointer-events-none"
              style={{ right: 18, top: '50%', transform: 'translateY(-50%)' }}
              width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5C6B63" strokeWidth="2.2">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>

          <button
            disabled={!picked}
            onClick={() => picked && onSelect(picked)}
            className="w-full flex items-center justify-center gap-2 rounded-2xl py-4 font-semibold text-[15px] transition-all"
            style={{
              background: picked ? '#22C55E' : '#0F1D17',
              color: picked ? '#08160F' : '#3A4B42',
              boxShadow: picked ? 'none' : 'inset 0 0 0 1px #1A2F22',
              cursor: picked ? 'pointer' : 'not-allowed',
            }}>
            Open dashboard <ArrowRight size={17} />
          </button>

          <p className="text-center mt-5 text-[13px]" style={{ color: '#4A5B53' }}>
            More niches coming soon — the platform is built to scale to 30+ industries.
          </p>
        </div>
      </div>

      {/* Footer links */}
      <div className="w-full flex gap-3 px-6 pb-10" style={{ maxWidth: 480 }}>
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
