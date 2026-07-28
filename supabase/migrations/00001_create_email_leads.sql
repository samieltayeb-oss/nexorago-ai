create table public.email_leads (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  email_normalized text not null unique,
  source text not null default 'footer',
  locale text not null default 'en',
  consent_given boolean not null default false,
  consent_text_version text,
  status text not null default 'subscribed'
    check (status in ('subscribed', 'unsubscribed', 'suppressed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unsubscribed_at timestamptz,
  metadata jsonb not null default '{}'::jsonb
);

-- Enable Row Level Security (RLS)
alter table public.email_leads enable row level security;

-- No public SELECT, UPDATE, or DELETE policies as per requirements.
-- Insertion is handled server-side via the Service Role Key, which bypasses RLS,
-- so we do not even need a public INSERT policy. This keeps the table completely locked down from the browser.
