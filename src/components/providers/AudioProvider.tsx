'use client'

import { createContext, useContext, useCallback, useRef, useState, type ReactNode } from 'react'

interface AudioContextType {
  isPlaying: boolean
  toggleAudio: () => void
}

const AudioCtx = createContext<AudioContextType>({
  isPlaying: false,
  toggleAudio: () => {},
})

export function useAudio() {
  return useContext(AudioCtx)
}

/**
 * Procedural ambient audio generator using Web Audio API.
 * Creates layered rain noise + occasional keyboard click sounds.
 */
export function AudioProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioContextRef = useRef<AudioContext | null>(null)
  const rainNodeRef = useRef<AudioBufferSourceNode | null>(null)
  const gainRef = useRef<GainNode | null>(null)
  const keyboardIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const createRainNoise = useCallback((ctx: AudioContext) => {
    // Generate white noise buffer (2 seconds, looping)
    const bufferSize = 2 * ctx.sampleRate
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const output = noiseBuffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1
    }

    const whiteNoise = ctx.createBufferSource()
    whiteNoise.buffer = noiseBuffer
    whiteNoise.loop = true

    // Bandpass filter to shape white noise into rain-like sound
    const bandpass = ctx.createBiquadFilter()
    bandpass.type = 'bandpass'
    bandpass.frequency.value = 800
    bandpass.Q.value = 0.5

    // Subtle lowpass for warmth
    const lowpass = ctx.createBiquadFilter()
    lowpass.type = 'lowpass'
    lowpass.frequency.value = 3000
    lowpass.Q.value = 1

    // Master gain for rain (very low volume)
    const gain = ctx.createGain()
    gain.gain.value = 0.035

    whiteNoise.connect(bandpass)
    bandpass.connect(lowpass)
    lowpass.connect(gain)
    gain.connect(ctx.destination)
    whiteNoise.start()

    return { whiteNoise, gain }
  }, [])

  const playKeyboardClick = useCallback((ctx: AudioContext) => {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    const now = ctx.currentTime

    osc.type = 'sine'
    // Random pitch between 600-1200Hz for mechanical key variety
    osc.frequency.value = 600 + Math.random() * 600

    gain.gain.setValueAtTime(0.02, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04)

    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(now)
    osc.stop(now + 0.04)
  }, [])

  const startKeyboardLoop = useCallback((ctx: AudioContext) => {
    const scheduleClick = () => {
      if (Math.random() > 0.25) {
        playKeyboardClick(ctx)
      }
      // Random interval 150-500ms for natural typing rhythm
      const nextDelay = 150 + Math.random() * 350
      keyboardIntervalRef.current = setTimeout(scheduleClick, nextDelay) as unknown as ReturnType<typeof setInterval>
    }
    scheduleClick()
  }, [playKeyboardClick])

  const toggleAudio = useCallback(() => {
    if (isPlaying) {
      // Stop audio
      if (rainNodeRef.current) {
        try { rainNodeRef.current.stop() } catch { /* already stopped */ }
        rainNodeRef.current = null
      }
      if (keyboardIntervalRef.current) {
        clearTimeout(keyboardIntervalRef.current)
        keyboardIntervalRef.current = null
      }
      if (audioContextRef.current) {
        audioContextRef.current.close()
        audioContextRef.current = null
      }
      setIsPlaying(false)
    } else {
      // Start audio
      const ctx = new AudioContext()
      audioContextRef.current = ctx

      const { whiteNoise } = createRainNoise(ctx)
      rainNodeRef.current = whiteNoise

      startKeyboardLoop(ctx)
      setIsPlaying(true)
    }
  }, [isPlaying, createRainNoise, startKeyboardLoop])

  return (
    <AudioCtx.Provider value={{ isPlaying, toggleAudio }}>
      {children}
    </AudioCtx.Provider>
  )
}
