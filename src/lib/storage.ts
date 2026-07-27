import { useCallback, useState } from 'react';

const STORAGE_KEY = 'girlfriends-day:unlocked-gifts';
const STORAGE_VERSION = 1;

interface UnlockedState {
  version: number;
  unlocked: string[];
}

function readStorage(): UnlockedState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { version: STORAGE_VERSION, unlocked: [] };
    const parsed = JSON.parse(raw) as Partial<UnlockedState>;
    if (!Array.isArray(parsed.unlocked)) return { version: STORAGE_VERSION, unlocked: [] };
    return { version: STORAGE_VERSION, unlocked: parsed.unlocked };
  } catch {
    return { version: STORAGE_VERSION, unlocked: [] };
  }
}

function writeStorage(state: UnlockedState) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage unavailable (private mode, quota, etc.) — fail silently.
  }
}

export function useUnlockedGifts() {
  const [unlocked, setUnlocked] = useState<string[]>(() => readStorage().unlocked);

  const isUnlocked = useCallback((id: string) => unlocked.includes(id), [unlocked]);

  const unlock = useCallback((id: string) => {
    setUnlocked((prev) => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      writeStorage({ version: STORAGE_VERSION, unlocked: next });
      return next;
    });
  }, []);

  const resetAll = useCallback(() => {
    writeStorage({ version: STORAGE_VERSION, unlocked: [] });
    setUnlocked([]);
  }, []);

  return { isUnlocked, unlock, resetAll, hasAnyUnlocked: unlocked.length > 0 };
}
