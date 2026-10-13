'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Sparkles } from 'lucide-react';

interface InvitationSectionProps {
  guestName?: string;
}

export default function InvitationSection({ guestName }: InvitationSectionProps) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section
      ref={ref}
      className="relative flex flex-col items-center justify-center bg-[linear-gradient(180deg,#fff8ee_0%,#fff1df_100%)] px-6 py-24 sm:px-8 md:py-32 overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-[0.2]" style={{
        backgroundImage: 'radial-gradient(circle at 10px 10px, rgba(201,162,39,0.3) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />
      
      <div className="absolute -left-[10%] top-[10%] h-[40vw] w-[40vw] rounded-full bg-gradient-to-tr from-[#C9A227]/10 to-[#ffdce1]/20 opacity-70 blur-[80px] pointer-events-none" />
      <div className="absolute -right-[10%] bottom-[10%] h-[40vw] w-[40vw] rounded-full bg-gradient-to-bl from-[#C9A227]/10 to-[#ffe2ea]/20 opacity-70 blur-[80px] pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="relative z-10 mx-auto max-w-3xl text-center"
      >
        <motion.div variants={itemVariants} className="mb-8 flex items-center justify-center gap-4">
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-[#C9A227]/70" />
          <p className="text-xs uppercase tracking-[0.3em] text-[#C9A227] font-semibold">
            Wedding Invitation
          </p>
          <span className="h-px w-16 bg-gradient-to-l from-transparent to-[#C9A227]/70" />
        </motion.div>

        {guestName && (
          <motion.div variants={itemVariants} className="mb-12">
            <p className="text-sm md:text-base text-[#8c6a16]">We cordially invite</p>
            <p className="my-3 break-words font-serif text-3xl md:text-4xl italic text-[#6d1424]">
              {guestName}
            </p>
            <p className="text-sm md:text-base text-[#8c6a16]">
              to celebrate our special day with us.
            </p>
            <span className="mx-auto mt-8 block h-px w-24 bg-gradient-to-r from-transparent via-[#C9A227]/70 to-transparent" />
          </motion.div>
        )}

        <motion.p variants={itemVariants} className="mb-12 text-base md:text-lg text-[#6a4d0d] leading-relaxed">
          With joyful hearts, we invite you to celebrate the wedding of
        </motion.p>

        <motion.div variants={itemVariants} className="mb-10">
          <h2 className="font-serif text-5xl md:text-6xl font-light tracking-[0.08em] text-[#6d1424] drop-shadow-sm">
            NILAGA
          </h2>
          <p className="mt-3 text-sm md:text-base text-[#8c6a16]">
            beloved son of Mr. &amp; Mrs. Chandrasiri
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="my-8 flex items-center justify-center">
          <Sparkles className="h-6 w-6 text-[#C9A227]/60" />
        </motion.div>

        <motion.div variants={itemVariants} className="mb-14">
          <h2 className="font-serif text-5xl md:text-6xl font-light tracking-[0.08em] text-[#6d1424] drop-shadow-sm">
            DINUSHA
          </h2>
          <p className="mt-3 text-sm md:text-base text-[#8c6a16]">
            beloved daughter of Mr. &amp; Mrs. Ravinthiran
          </p>
        </motion.div>

        <motion.p variants={itemVariants} className="mx-auto max-w-[420px] text-sm md:text-base leading-relaxed text-[#6a4d0d]">
          Together with our families, we invite you to share in the joy, love &amp; happiness of our special day.
        </motion.p>
      </motion.div>
    </section>
  );
}
