'use client'
import React, { useState } from 'react'
import Landing from './Landing'
import Dashboard from './Dashboard'
import type { NicheKey } from '@/lib/data'

export default function App() {
  const [niche, setNiche] = useState<NicheKey | null>(null)

  if (!niche) {
    return <Landing onSelect={setNiche} />
  }

  return <Dashboard initialNiche={niche} onBack={() => setNiche(null)} />
}
