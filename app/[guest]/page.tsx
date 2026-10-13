import InvitationPage from '@/components/InvitationPage';
import { displayNameFromUrl } from '@/lib/guest';

interface GuestPageProps {
  params: Promise<{ guest: string }>;
  searchParams: Promise<{ p?: string | string[] }>;
}

export default async function GuestPage({ params, searchParams }: GuestPageProps) {
  const { guest } = await params;
  const { p } = await searchParams;
  const prefix = Array.isArray(p) ? p[0] : p;

  return <InvitationPage guestName={displayNameFromUrl(guest, prefix)} />;
}
