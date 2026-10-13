'use client';

import { useState, useEffect } from 'react';
import { EnvelopeOpener } from '@/components/envelope-opener';
import HeroSection from '@/components/sections/HeroSection';
import InvitationSection from '@/components/sections/InvitationSection';
import CeremonyDetails from '@/components/sections/CeremonyDetails';
import CountdownSection from '@/components/sections/CountdownSection';

import VenueLocation from '@/components/sections/VenueLocation';
import RSVPSection from '@/components/sections/RSVPSection';
import BlessingsSection from '@/components/sections/BlessingsSection';
import FooterSection from '@/components/sections/FooterSection';
import MusicPlayer from '@/components/MusicPlayer';

interface InvitationPageProps {
  guestName?: string;
}

export default function InvitationPage({ guestName }: InvitationPageProps) {
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    html.classList.add('scroll-smooth');
  }, []);

  return (
    <div className="relative w-full overflow-x-hidden bg-background">
      {/* Persistent floating music player */}
      <MusicPlayer />

      {!isOpened ? (
        <EnvelopeOpener onEnvelopeOpen={() => setIsOpened(true)} />
      ) : (
        <>
          <HeroSection />
          <InvitationSection guestName={guestName} />
          <CeremonyDetails />
          <CountdownSection />

          <VenueLocation />
          <RSVPSection />
          <BlessingsSection />
          <FooterSection />
        </>
      )}
    </div>
  );
}
