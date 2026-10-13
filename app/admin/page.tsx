'use client';

import { useEffect, useState } from 'react';
import { Check, Copy, Link2 } from 'lucide-react';
import {
  PREFIXES,
  type PrefixKey,
  buildInviteLink,
  buildInviteMessage,
  formatDisplayName,
} from '@/lib/guest';
import { wedding } from '@/lib/wedding';

interface Generated {
  displayName: string;
  link: string;
  message: string;
}

const fieldClass =
  'w-full rounded-xl border border-[#C9A227]/40 bg-white px-4 py-3 text-[#4a0f18] outline-none transition focus:border-[#C9A227] focus:ring-2 focus:ring-[#C9A227]/25';

const copyButtonClass =
  'flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#6d1424] px-4 py-3 text-sm font-medium text-[#6d1424] transition hover:bg-[#6d1424] hover:text-white disabled:cursor-not-allowed disabled:border-[#6d1424]/25 disabled:text-[#6d1424]/35 disabled:hover:bg-transparent';

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for browsers without clipboard permission (e.g. non-HTTPS)
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(textarea);
    return ok;
  }
}

export default function AdminPage() {
  const [prefix, setPrefix] = useState<PrefixKey>('mr');
  const [guestName, setGuestName] = useState('');
  const [generated, setGenerated] = useState<Generated | null>(null);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(''), 2000);
    return () => clearTimeout(timer);
  }, [notice]);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    const displayName = formatDisplayName(prefix, guestName);
    if (!displayName) return;

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || window.location.origin;
    const link = buildInviteLink(baseUrl, prefix, guestName);
    setGenerated({
      displayName,
      link,
      message: buildInviteMessage(displayName, link, wedding.groomName, wedding.brideName),
    });
  };

  const handleCopy = async (text: string, successNotice: string) => {
    const ok = await copyText(text);
    setNotice(ok ? successNotice : 'Could not copy. Please copy manually.');
  };

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#fff8ee_0%,#fff1df_100%)] px-4 py-10 sm:py-16">
      <div className="mx-auto max-w-xl">
        <header className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C9A227]">
            {wedding.groomName} &amp; {wedding.brideName}
          </p>
          <h1 className="mt-2 font-serif text-3xl text-[#6d1424]">Invitation Link Generator</h1>
        </header>

        <form
          onSubmit={handleGenerate}
          className="space-y-5 rounded-2xl border border-[#C9A227]/25 bg-white/80 p-6 shadow-sm"
        >
          <div>
            <label htmlFor="prefix" className="mb-2 block text-sm font-medium text-[#6a4d0d]">
              Select Prefix
            </label>
            <select
              id="prefix"
              value={prefix}
              onChange={(e) => {
                setPrefix(e.target.value as PrefixKey);
                setGenerated(null);
              }}
              className={fieldClass}
            >
              {PREFIXES.map((p) => (
                <option key={p.key} value={p.key}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="guestName" className="mb-2 block text-sm font-medium text-[#6a4d0d]">
              Guest Name
            </label>
            <input
              id="guestName"
              type="text"
              value={guestName}
              onChange={(e) => {
                setGuestName(e.target.value);
                setGenerated(null);
              }}
              placeholder="e.g. Sanjaya"
              autoComplete="off"
              className={fieldClass}
            />
          </div>

          <button
            type="submit"
            disabled={!guestName.trim()}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#6d1424] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#4a0f18] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Link2 className="h-4 w-4" /> Generate Link
          </button>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              disabled={!generated}
              onClick={() => generated && handleCopy(generated.link, 'Link copied!')}
              className={copyButtonClass}
            >
              <Copy className="h-4 w-4" /> Copy Link Only
            </button>
            <button
              type="button"
              disabled={!generated}
              onClick={() => generated && handleCopy(generated.message, 'Message copied!')}
              className={copyButtonClass}
            >
              <Copy className="h-4 w-4" /> Copy Full Message
            </button>
          </div>
        </form>

        {generated && (
          <section className="mt-6 space-y-5 rounded-2xl border border-[#C9A227]/25 bg-white/80 p-6 shadow-sm">
            <div>
              <h2 className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#8c6a16]">
                Generated Link
              </h2>
              <a
                href={generated.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block break-all rounded-xl bg-[#fff8ee] px-4 py-3 text-sm text-[#6d1424] underline underline-offset-2"
              >
                {generated.link}
              </a>
            </div>

            <div>
              <h2 className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#8c6a16]">
                Message Preview
              </h2>
              <p className="whitespace-pre-wrap break-words rounded-xl bg-[#fff8ee] px-4 py-3 text-sm leading-relaxed text-[#4a0f18]">
                {generated.message}
              </p>
            </div>
          </section>
        )}
      </div>

      {notice && (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-[#4a0f18] px-5 py-2.5 text-sm text-white shadow-lg"
        >
          <Check className="h-4 w-4 text-[#f0d18b]" /> {notice}
        </div>
      )}
    </main>
  );
}
