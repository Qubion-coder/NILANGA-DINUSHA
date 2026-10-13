export const PREFIXES = [
  { key: 'mr', label: 'Mr.' },
  { key: 'mrs', label: 'Mrs.' },
  { key: 'miss', label: 'Miss' },
  { key: 'mr-mrs', label: 'Mr. & Mrs.' },
  { key: 'family', label: 'Family' },
  { key: 'dear', label: 'Dear' },
] as const;

export type PrefixKey = (typeof PREFIXES)[number]['key'];

const cleanName = (name: string) => name.trim().replace(/\s+/g, ' ');

// "Dear" is a greeting style, not a title: it adds nothing to the display name
// because the greeting itself already starts with "Dear".
export function formatDisplayName(prefix: PrefixKey, guestName: string) {
  const name = cleanName(guestName);
  if (!name) return '';
  if (prefix === 'dear') return name;
  if (prefix === 'family') return `${name} and Family`;
  const label = PREFIXES.find((p) => p.key === prefix)?.label;
  return label ? `${label} ${name}` : name;
}

// {baseURL}/{guestName}, with the prefix carried as ?p= (omitted for "Dear").
export function buildInviteLink(baseUrl: string, prefix: PrefixKey, guestName: string) {
  const path = encodeURIComponent(cleanName(guestName));
  const query = prefix === 'dear' ? '' : `?p=${prefix}`;
  return `${baseUrl.replace(/\/+$/, '')}/${path}${query}`;
}

export function displayNameFromUrl(guestSegment: string, prefixParam?: string) {
  let name = guestSegment;
  try {
    name = decodeURIComponent(guestSegment);
  } catch {
    // keep the raw segment if it is not valid percent-encoding
  }
  const prefix = PREFIXES.find((p) => p.key === prefixParam)?.key ?? 'dear';
  return formatDisplayName(prefix, name);
}

export function buildInviteMessage(
  displayName: string,
  link: string,
  groomName: string,
  brideName: string,
) {
  return `Dear ${displayName} ❤️

With joyful hearts, we warmly invite you to celebrate one of the most special days of our lives as we begin our journey together.

Please view our wedding invitation and all the event details through the link below 🌐:

${link}

Your presence would truly mean the world to us, and we would be honored to celebrate this beautiful moment together.

With love,
❤️ ${groomName} & ${brideName}`;
}
