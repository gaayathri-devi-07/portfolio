import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono, Bebas_Neue } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: ["300", "400", "500", "700"],
});


export const metadata: Metadata = {
  title: "Gaayathri Devi — Full-Stack Developer & 3D Artist",
  description:
    "Immersive 3D portfolio of Gaayathri Devi — architecting full-stack ecosystems, integrating AI capabilities, and crafting immersive web experiences.",
  keywords: [
    "Gaayathri Devi",
    "Full-Stack Developer",
    "3D Portfolio",
    "AI Engineer",
    "Next.js",
    "React",
    "WebGL",
  ],
  authors: [{ name: "Gaayathri Devi" }],
  openGraph: {
    title: "Gaayathri Devi — Full-Stack Developer & 3D Artist",
    description:
      "Immersive 3D portfolio — architecting ecosystems, integrating AI, and crafting experiences.",
    type: "website",
  },
};

import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { AudioProvider } from "@/components/providers/AudioProvider";
import Navbar from "@/components/layout/Navbar";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import GlobalScrollTracker from "@/components/layout/GlobalScrollTracker";
import GrainOverlay from "@/components/ui/GrainOverlay";
import CustomCursor from "@/components/ui/CustomCursor";
import BackgroundParticles from "@/components/3d/BackgroundParticles";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} ${bebasNeue.variable} h-full antialiased scroll-smooth`}
      suppressHydrationWarning
    >
      <body 
        className="min-h-full flex flex-col bg-[var(--bg)] text-[var(--fg)] transition-colors duration-500 overflow-x-hidden"
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
          <AudioProvider>
            <SmoothScrollProvider>
              <CustomCursor />
              <BackgroundParticles />
              <GlobalScrollTracker />
              <GrainOverlay />
              <Navbar />
              {children}
            </SmoothScrollProvider>
          </AudioProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
