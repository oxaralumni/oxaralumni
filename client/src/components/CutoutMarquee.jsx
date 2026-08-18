import React from 'react'
import { motion } from 'framer-motion'

export default function CutoutMarquee({
  text = 'OXAR ALUMNI • EXCELLENCE IN HERITAGE • ST. XAVIER • CONNECTING GENERATIONS •',
  imageUrl = '/IMG_8654.webp',
  paperColor = '#FCFBF7', // Matches your website's cream background
  height = '320px',
  speed = 25, // seconds per full cycle
}) {
  const repeatedText = `${text} ${text} `

  return (
    <div className="relative w-full overflow-hidden" style={{ height }}>
      {/* 1. FIXED/STICKY BACKGROUND IMAGE UNDERNEATH */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url("${imageUrl}")` }}
      />

      {/* 2. SVG CUTOUT STENCIL LAYER ON TOP */}
      <svg
        className="absolute inset-0 h-full w-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <mask id="paper-cutout-marquee">
            {/* White keeps the paper background opaque */}
            <rect width="100%" height="100%" fill="#ffffff" />

            {/* Black punches transparent letter cutouts */}
            <foreignObject width="100%" height="100%">
              <div className="flex h-full w-full items-center whitespace-nowrap overflow-hidden">
                <motion.div
                  className="flex whitespace-nowrap font-heading text-[12vw] sm:text-[8vw] font-black uppercase tracking-tight text-black select-none"
                  animate={{ x: ['0%', '-50%'] }}
                  transition={{
                    repeat: Infinity,
                    ease: 'linear',
                    duration: speed,
                  }}
                >
                  <span>{repeatedText}</span>
                  <span>{repeatedText}</span>
                </motion.div>
              </div>
            </foreignObject>
          </mask>
        </defs>

        {/* The solid paper overlay that uses the mask */}
        <rect
          width="100%"
          height="100%"
          fill={paperColor}
          mask="url(#paper-cutout-marquee)"
        />
      </svg>
    </div>
  )
}
