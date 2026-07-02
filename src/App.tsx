/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const SEQUENCE = [
  "Hey...",
  "I was just thinking about you.",
  "And I wanted to give you something.",
  "Since I can't give you real flowers today...",
  "I made these for you instead.",
];

const Sunflower = ({ x, y, scale = 1, rotation = 0 }: { x: number, y: number, scale?: number, rotation?: number }) => (
  <g transform={`translate(${x}, ${y}) scale(${scale}) rotate(${rotation})`}>
    {Array.from({ length: 32 }).map((_, i) => (
      <path key={`out-${i}`} d="M 0,0 C 15,-40 20,-80 0,-110 C -20,-80 -15,-40 0,0" fill="#FBBF24" transform={`rotate(${i * 11.25})`} stroke="#F59E0B" strokeWidth="0.5" opacity="0.9" />
    ))}
    {Array.from({ length: 24 }).map((_, i) => (
      <path key={`in-${i}`} d="M 0,0 C 10,-30 15,-60 0,-85 C -15,-60 -10,-30 0,0" fill="#FCD34D" transform={`rotate(${i * 15 + 7.5})`} stroke="#D97706" strokeWidth="0.5" />
    ))}
    <circle cx="0" cy="0" r="32" fill="#451A03" />
    <circle cx="0" cy="0" r="28" fill="#78350F" />
    <circle cx="0" cy="0" r="24" fill="#451A03" />
    {Array.from({ length: 40 }).map((_, i) => (
      <circle key={`seed-${i}`} cx={Math.cos(i * 2.4) * (i * 0.55)} cy={Math.sin(i * 2.4) * (i * 0.55)} r="1.5" fill="#B45309" />
    ))}
  </g>
);

const WhiteRose = ({ x, y, scale = 1, rotation = 0 }: { x: number, y: number, scale?: number, rotation?: number }) => (
  <g transform={`translate(${x}, ${y}) scale(${scale}) rotate(${rotation})`}>
    <path d="M0 -55 C 40 -55, 60 -20, 50 15 C 30 40, -10 55, -40 30 C -60 -5, -40 -40, 0 -55 Z" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
    <path d="M -15 -45 C 30 -50, 55 -10, 40 25 C 20 50, -20 45, -45 15 C -60 -15, -45 -40, -15 -45 Z" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
    <path d="M -30 -25 C 15 -45, 45 -15, 30 20 C 10 40, -30 35, -45 5 C -55 -15, -45 -25, -30 -25 Z" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
    <path d="M -20 -10 C 10 -30, 35 0, 20 25 C 0 40, -25 25, -30 0 C -35 -15, -25 -10, -20 -10 Z" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1" />
    <path d="M -10 -5 C 10 -15, 20 5, 10 15 C 0 20, -15 15, -15 0 C -20 -10, -15 -5, -10 -5 Z" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1" />
  </g>
);

const Lily = ({ x, y, scale = 1, rotation = 0 }: { x: number, y: number, scale?: number, rotation?: number }) => (
  <g transform={`translate(${x}, ${y}) scale(${scale}) rotate(${rotation})`}>
    {Array.from({ length: 6 }).map((_, i) => (
      <path key={`p-${i}`} d="M 0,0 C 25,-40 35,-90 0,-130 C -35,-90 -25,-40 0,0" fill="#FAFAF9" transform={`rotate(${i * 60})`} stroke="#E7E5E4" strokeWidth="1.5" />
    ))}
    {Array.from({ length: 6 }).map((_, i) => (
      <path key={`m-${i}`} d="M 0,0 L 0,-110" stroke="#FCA5A5" strokeWidth="2.5" transform={`rotate(${i * 60})`} opacity="0.7" />
    ))}
    {Array.from({ length: 6 }).map((_, i) => (
      <g key={`s-${i}`} transform={`rotate(${i * 60 + 30})`}>
        <path d="M 0,0 Q 10,-35 5,-70" stroke="#A3E635" strokeWidth="1.5" fill="none" />
        <ellipse cx="5" cy="-70" rx="4" ry="8" fill="#B45309" transform="rotate(15 5 -70)" />
      </g>
    ))}
    <circle cx="0" cy="0" r="5" fill="#4ADE80" />
  </g>
);

const BlueOrchid = ({ x, y, scale = 1, rotation = 0 }: { x: number, y: number, scale?: number, rotation?: number }) => (
  <g transform={`translate(${x}, ${y}) scale(${scale}) rotate(${rotation})`}>
    {/* Back Sepals */}
    <path d="M 0,0 C 15,-40 5,-90 0,-110 C -5,-90 -15,-40 0,0" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="1.5" />
    <path d="M 0,0 C 40,-20 80,-20 90,20 C 60,15 30,10 0,0" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="1.5" transform="rotate(25)" />
    <path d="M 0,0 C -40,-20 -80,-20 -90,20 C -60,15 -30,10 0,0" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="1.5" transform="rotate(-25)" />
    
    {/* Lateral Petals */}
    <path d="M 0,0 C 50,-30 90,-50 100,0 C 70,40 40,20 0,0" fill="#DBEAFE" stroke="#93C5FD" strokeWidth="1.5" />
    <path d="M 0,0 C -50,-30 -90,-50 -100,0 C -70,40 -40,20 0,0" fill="#DBEAFE" stroke="#93C5FD" strokeWidth="1.5" />
    
    {/* Lip (Bottom petal) */}
    <path d="M 0,0 C 35,35 45,70 0,90 C -45,70 -35,35 0,0" fill="#60A5FA" stroke="#3B82F6" strokeWidth="1" />
    <path d="M 0,15 C 20,35 25,50 0,65 C -25,50 -20,35 0,15" fill="#2563EB" stroke="#1D4ED8" strokeWidth="1" />
    
    {/* Center column */}
    <circle cx="0" cy="5" r="7" fill="#FEF08A" />
    <circle cx="0" cy="5" r="4" fill="#EAB308" />
  </g>
);

const Bouquet = () => (
  <motion.svg 
    viewBox="-250 -250 500 650" 
    className="w-full max-w-2xl h-auto drop-shadow-[0_20px_30px_rgba(255,255,255,0.05)] overflow-visible"
    animate={{ y: [-15, 15, -15], rotate: [-2, 2, -2] }}
    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
  >
    <g stroke="#22C55E" strokeWidth="6" fill="none" strokeLinecap="round" className="opacity-80">
      <path d="M 0,50 Q 20,150 40,350" strokeWidth="8"/>
      <path d="M -40,30 Q -60,150 -80,350" />
      <path d="M 50,20 Q 80,150 100,350" strokeWidth="5"/>
      <path d="M -80,60 Q -100,150 -120,350" strokeWidth="7"/>
      <path d="M 100,60 Q 120,150 140,350" strokeWidth="6"/>
      <path d="M 0,100 Q 0,200 10,350" strokeWidth="9"/>
      <path d="M -20,80 Q -30,200 -20,350" strokeWidth="7"/>
      <path d="M 30,70 Q 50,180 70,350" strokeWidth="8"/>
    </g>
    <g fill="#15803D" stroke="#166534" strokeWidth="2" className="opacity-90">
      <path d="M 40,200 Q 100,160 120,210 Q 70,240 40,200" />
      <path d="M -60,180 Q -120,150 -140,190 Q -90,220 -60,180" />
      <path d="M 10,220 Q -40,200 -60,250 Q -20,260 10,220" />
      <path d="M 80,150 Q 140,110 160,160 Q 110,190 80,150" />
      <path d="M -80,120 Q -140,80 -160,130 Q -110,160 -80,120" />
    </g>

    {/* Back layer */}
    <BlueOrchid x={-110} y={-90} scale={0.7} rotation={-25} />
    <Lily x={110} y={-80} scale={0.75} rotation={35} />
    <WhiteRose x={0} y={-140} scale={0.95} rotation={5} />
    <BlueOrchid x={80} y={-120} scale={0.65} rotation={15} />
    
    {/* Mid layer */}
    <Lily x={-100} y={10} scale={0.8} rotation={-55} />
    <WhiteRose x={-40} y={-60} scale={1.05} rotation={-15} />
    <BlueOrchid x={60} y={-50} scale={0.9} rotation={20} />
    <WhiteRose x={100} y={20} scale={0.85} rotation={30} />
    <Sunflower x={120} y={-10} scale={0.65} rotation={10} />
    <Lily x={35} y={-15} scale={0.8} rotation={-10} />

    {/* Front layer */}
    <BlueOrchid x={-70} y={70} scale={0.85} rotation={-10} />
    <WhiteRose x={10} y={40} scale={1.25} rotation={8} />
    <Sunflower x={-30} y={20} scale={0.85} rotation={-5} />
    <BlueOrchid x={70} y={90} scale={0.75} rotation={25} />
    <Lily x={-10} y={120} scale={0.9} rotation={-5} />
    <WhiteRose x={-110} y={70} scale={0.75} rotation={-35} />
    <Sunflower x={90} y={80} scale={0.55} rotation={25} />
  </motion.svg>
);

const Particles = () => {
  const particles = Array.from({ length: 40 });
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((_, i) => {
        const size = Math.random() * 3 + 1;
        const isBlue = Math.random() > 0.6;
        return (
          <motion.div
            key={i}
            className={`absolute rounded-full ${isBlue ? 'bg-blue-300/40' : 'bg-white/40'}`}
            style={{
              width: size,
              height: size,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100 + 20}%`,
              boxShadow: `0 0 ${size * 4}px ${isBlue ? 'rgba(147, 197, 253, 0.3)' : 'rgba(255, 255, 255, 0.3)'}`
            }}
            animate={{
              y: ['0vh', '-120vh'],
              x: [0, (Math.random() - 0.5) * 100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10
            }}
          />
        )
      })}
    </div>
  )
}

export default function App() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step > 0 && step <= SEQUENCE.length) {
      const timer = setTimeout(() => {
        setStep(s => s + 1);
      }, 4000); 
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-900/30 font-serif overflow-hidden relative">
      <Particles />
      
      <AnimatePresence>
        {step === 0 && (
          <motion.div
            key="start"
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(15px)' }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer z-50"
            onClick={() => setStep(1)}
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="w-40 h-40 rounded-full border border-blue-100/10 flex flex-col items-center justify-center relative group"
            >
              <div className="absolute inset-0 rounded-full bg-blue-400/5 blur-2xl group-hover:bg-blue-400/10 transition-colors duration-1000" />
              <span className="text-white/50 text-xs tracking-[0.4em] uppercase font-light drop-shadow-md">
                Touch
              </span>
            </motion.div>
          </motion.div>
        )}

        {step > 0 && step <= SEQUENCE.length && (
          <motion.div
            key={`text-${step}`}
            initial={{ opacity: 0, filter: 'blur(15px)', scale: 0.95 }}
            animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
            exit={{ opacity: 0, filter: 'blur(15px)', scale: 1.05 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center p-8 text-center z-40 cursor-pointer"
            onClick={() => setStep(s => s + 1)}
          >
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif italic text-white/90 leading-relaxed tracking-wide drop-shadow-[0_0_25px_rgba(255,255,255,0.2)] max-w-2xl">
              {SEQUENCE[step - 1]}
            </h2>
          </motion.div>
        )}

        {step > SEQUENCE.length && (
          <motion.div
            key="gallery"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 3, ease: "easeInOut" }}
            className="absolute inset-0 z-10 flex flex-col items-center justify-start pt-12 pb-24 overflow-y-auto overflow-x-hidden"
          >
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 2, ease: "easeOut" }}
              className="text-center mb-8 shrink-0 mt-12 md:mt-24"
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-widest text-white/90 mb-8 drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                For You
              </h1>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100px" }}
                transition={{ delay: 2.5, duration: 1.5, ease: "easeInOut" }}
                className="h-[1px] bg-gradient-to-r from-transparent via-blue-200/50 to-transparent mx-auto"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ delay: 2, duration: 3, ease: "easeOut" }}
              className="w-full max-w-3xl flex-1 flex items-center justify-center px-6 shrink-0 pb-32"
            >
              <Bouquet />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
