const STORAGE_KEY_BIRTHDATE = "eternal_birthdate";
const STORAGE_KEY_STATS = "eternal_stats";

export function getBirthDate() {
  return localStorage.getItem(STORAGE_KEY_BIRTHDATE);
}

export function setBirthDate(date) {
  localStorage.setItem(STORAGE_KEY_BIRTHDATE, date);
}

export function getStats() {
  const stored = localStorage.getItem(STORAGE_KEY_STATS);
  return stored ? JSON.parse(stored) : { yes: 0, no: 0 };
}

export function updateStats(type) {
  const current = getStats();
  const updated = { ...current, [type]: current[type] + 1 };
  localStorage.setItem(STORAGE_KEY_STATS, JSON.stringify(updated));
  return updated;
}
