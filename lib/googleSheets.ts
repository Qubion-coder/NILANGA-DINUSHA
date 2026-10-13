export type GoogleSheetFormType = 'rsvp' | 'wish';

interface SubmitPayload {
  formType: GoogleSheetFormType;
  name: string;
  guests?: string;
  dietary?: string;
  message?: string;
}

const GOOGLE_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbzFlPDeb4kR_qwbt86FZlxYxpzbgn2Jx5-N_FAZofJGdeqUerTibICRmQZn7yV3aVyt/exec';

export async function submitToGoogleSheets(payload: SubmitPayload): Promise<void> {
  await fetch(GOOGLE_SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'text/plain;charset=utf-8',
    },
    body: JSON.stringify({
      ...payload,
      submittedAt: new Date().toISOString(),
      source: 'wedding-site',
    }),
  });
}
