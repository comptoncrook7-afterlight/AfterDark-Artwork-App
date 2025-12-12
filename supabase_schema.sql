
create table images (
  id text primary key,
  title text,
  prompt_meta text,
  preview_url text,
  full_path text,
  price_one_time numeric,
  created_at timestamptz default now()
);

create table purchases (
  id uuid primary key default gen_random_uuid(),
  user_id text,
  image_id text references images(id),
  purchase_type text,
  stripe_payment_id text,
  unlocked_at timestamptz default now()
);

create table subscriptions (
  id text primary key,
  customer text,
  status text,
  current_period_end timestamptz
);
