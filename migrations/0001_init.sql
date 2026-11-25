-- Orders, wholesale requests and contact messages. No customer accounts on this site.
CREATE TABLE orders (
  id TEXT PRIMARY KEY,
  order_number TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  country TEXT NOT NULL CHECK (country IN ('US','CA')),
  region TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  postal TEXT NOT NULL,
  payment TEXT NOT NULL CHECK (payment IN ('btc','eth','usdt','usdc','wire')),
  notes TEXT,
  items TEXT NOT NULL,
  subtotal_usd REAL NOT NULL,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
);
CREATE INDEX orders_created ON orders (created_at);
CREATE TABLE wholesale_requests (
  id TEXT PRIMARY KEY,
  company TEXT NOT NULL, name TEXT NOT NULL, email TEXT NOT NULL, phone TEXT NOT NULL,
  country TEXT NOT NULL, biz_type TEXT NOT NULL, tax_id TEXT, cond TEXT NOT NULL, qty TEXT, brands TEXT NOT NULL, budget TEXT, message TEXT,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
);
CREATE TABLE contact_messages (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL, email TEXT NOT NULL, phone TEXT, topic TEXT, message TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
);
