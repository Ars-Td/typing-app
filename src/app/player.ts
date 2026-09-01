const PLAYER_KEY = "henuchi-player-id";

export function getPlayerId(): string {
  const existing = localStorage.getItem(PLAYER_KEY);
  if (existing) {
    return existing;
  }
  const id = crypto.randomUUID();
  localStorage.setItem(PLAYER_KEY, id);
  return id;
}
