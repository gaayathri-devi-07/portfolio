'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'

let registered = false

export function registerGSAPPlugins() {
  if (!registered && typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, TextPlugin)
    registered = true
  }
}

export { gsap, ScrollTrigger, TextPlugin }
