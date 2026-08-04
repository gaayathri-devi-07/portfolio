'use client'

import { useEffect } from 'react'

const DEFAULT_TITLE = 'Lets look at my portfolio \u2615'
const AWAY_TITLE = ' Come Back To Space...'

export default function TabTitleChanger() {
  useEffect(() => {
    document.title = DEFAULT_TITLE

    function handleVisibility() {
      document.title = document.hidden ? AWAY_TITLE : DEFAULT_TITLE
    }

    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [])

  return null
}
