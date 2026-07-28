-- Migration: 00002_create_trip_shares.sql
-- Description: Creates the trips and trip_shares tables with Row Level Security.

create table if not exists public.trips (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references auth.users(id) on delete set null,

  title text not null,
  destination_summary text,
  check_in date,
  check_out date,

  adults integer not null default 1
    check (adults >= 1),

  children integer not null default 0
    check (children >= 0),

  trip_data jsonb not null default '{}'::jsonb,
  itinerary_data jsonb,
  budget_data jsonb,
  hotel_data jsonb,
  advisory_data jsonb,

  schema_version integer not null default 1,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.trip_shares (
  id uuid primary key default gen_random_uuid(),

  trip_id uuid not null
    references public.trips(id)
    on delete cascade,

  share_id text not null unique,

  visibility text not null default 'link'
    check (
      visibility in (
        'private',
        'link',
        'password'
      )
    ),

  password_hash text,
  expires_at timestamptz,

  is_active boolean not null default true,

  allow_comments boolean not null default false,
  allow_voting boolean not null default false,

  view_count bigint not null default 0,
  last_viewed_at timestamptz,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Indexes
create index if not exists idx_trip_shares_share_id on public.trip_shares(share_id);
create index if not exists idx_trip_shares_trip_id on public.trip_shares(trip_id);
create index if not exists idx_trips_owner_id on public.trips(owner_id);

-- RLS Enablement
alter table public.trips enable row level security;
alter table public.trip_shares enable row level security;

-- Policies for trips
create policy "Users can view own trips" 
on public.trips for select 
using (auth.uid() = owner_id);

create policy "Users can insert own trips" 
on public.trips for insert 
with check (auth.uid() = owner_id);

create policy "Users can update own trips" 
on public.trips for update 
using (auth.uid() = owner_id);

create policy "Users can delete own trips" 
on public.trips for delete 
using (auth.uid() = owner_id);

-- Policies for trip_shares
create policy "Users can view shares for own trips" 
on public.trip_shares for select 
using (exists (
  select 1 from public.trips where trips.id = trip_shares.trip_id and trips.owner_id = auth.uid()
));

create policy "Users can insert shares for own trips" 
on public.trip_shares for insert 
with check (exists (
  select 1 from public.trips where trips.id = trip_shares.trip_id and trips.owner_id = auth.uid()
));

create policy "Users can update shares for own trips" 
on public.trip_shares for update 
using (exists (
  select 1 from public.trips where trips.id = trip_shares.trip_id and trips.owner_id = auth.uid()
));

-- NOTE: Public access to trip_shares is not granted here. 
-- The public view is handled via the server-side API which uses the service role to safely fetch and project the data.
