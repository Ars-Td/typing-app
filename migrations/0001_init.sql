CREATE TABLE problems (
  id TEXT PRIMARY KEY,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  channel TEXT NOT NULL,
  incoming_json TEXT NOT NULL,
  reply TEXT NOT NULL,
  yomi TEXT NOT NULL,
  base_reward INTEGER NOT NULL
);

CREATE TABLE plays (
  id TEXT PRIMARY KEY,
  player_id TEXT NOT NULL,
  difficulty TEXT NOT NULL,
  duration_sec INTEGER NOT NULL,
  salary INTEGER NOT NULL,
  wpm REAL NOT NULL,
  cpm REAL NOT NULL,
  accuracy REAL NOT NULL,
  miss_count INTEGER NOT NULL,
  max_streak INTEGER NOT NULL,
  sent_count INTEGER NOT NULL,
  key_stats_json TEXT NOT NULL,
  finger_stats_json TEXT NOT NULL,
  bigram_stats_json TEXT NOT NULL,
  created_at INTEGER NOT NULL
);

CREATE INDEX idx_plays_player ON plays (player_id, created_at DESC);
