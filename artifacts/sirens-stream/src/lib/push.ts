/** Notification dispatch — routes all calls to the backend Telegram endpoint. */

  const API_BASE = ((import.meta.env.VITE_API_URL as string | undefined) ?? '').replace(/\/$/, '');

  export const VAPID_PUBLIC_KEY = '';

  export async function checkPushInDB(_userId: string): Promise<boolean> {
    return false;
  }

  export async function checkPushEndpointInDB(_userId: string): Promise<boolean> {
    return false;
  }

  export function wasManuallyUnsubscribed(_userId: string): boolean {
    return false;
  }

  export async function subscribeToPush(
    _userId: string
  ): Promise<'granted' | 'denied' | 'error'> {
    return 'error';
  }

  export async function unsubscribeFromPush(_userId: string): Promise<boolean> {
    return true;
  }

  export async function sendPushViaApi(
    userIds: string[],
    title: string,
    body: string,
    url: string,
    fire = false
  ): Promise<{ sent: number; error?: string }> {
    if (!userIds.length) return { sent: 0 };
    try {
      const res = await fetch(`${API_BASE}/api/push/notify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userIds, title, body, url, fire }),
      });
      if (!res.ok) {
        const text = await res.text();
        return { sent: 0, error: text };
      }
      const data = await res.json() as { sent: number };
      return { sent: data.sent ?? 0 };
    } catch (e) {
      return { sent: 0, error: String(e) };
    }
  }
  