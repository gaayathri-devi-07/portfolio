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

    // Bandpass filter to shape white noise into mild rain-like sound
    const bandpass = ctx.createBiquadFilter()
    bandpass.type = 'bandpass'
    bandpass.frequency.value = 1000 // Slightly higher for "mild" feel
    bandpass.Q.value = 0.4

    // Subtle lowpass for warmth and "milkiness"
    const lowpass = ctx.createBiquadFilter()
    lowpass.type = 'lowpass'
    lowpass.frequency.value = 2500
    lowpass.Q.value = 0.8

    // Master gain for rain (very mild volume)
    const gain = ctx.createGain()
    gain.gain.value = 0.025

    whiteNoise.connect(bandpass)
    bandpass.connect(lowpass)
    lowpass.connect(gain)
    gain.connect(ctx.destination)
    whiteNoise.start()

    return { whiteNoise, gain }
  }, [])

  const playBirdChirp = useCallback((ctx: AudioContext) => {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    const now = ctx.currentTime

    osc.type = 'sine'
    // Bird chirp: quick frequency sweep from 3000Hz to 5000Hz
    const baseFreq = 3000 + Math.random() * 1000
    osc.frequency.setValueAtTime(baseFreq, now)
    osc.frequency.exponentialRampToValueAtTime(baseFreq + 1500, now + 0.1)

    // Very soft volume for "mild" birds
    gain.gain.setValueAtTime(0, now)
    gain.gain.linearRampToValueAtTime(0.015, now + 0.02)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12)

    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(now)
    osc.stop(now + 0.15)
  }, [])

  const startBirdLoop = useCallback((ctx: AudioContext) => {
    const scheduleChirp = () => {
      // Occasional birds, not constant
      if (Math.random() > 0.7) {
        // Sometimes a double chirp
        playBirdChirp(ctx)
        if (Math.random() > 0.5) {
          setTimeout(() => playBirdChirp(ctx), 150)
        }
      }
      // Sparse intervals for peace: 3s to 8s
      const nextDelay = 3000 + Math.random() * 5000
      keyboardIntervalRef.current = setTimeout(scheduleChirp, nextDelay) as unknown as ReturnType<typeof setInterval>
    }
    scheduleChirp()
  }, [playBirdChirp])

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

      startBirdLoop(ctx)
      setIsPlaying(true)
    }
  }, [isPlaying, createRainNoise, startBirdLoop])

  return (
    <AudioCtx.Provider value={{ isPlaying, toggleAudio }}>
      {children}
    </AudioCtx.Provider>
  )
}
