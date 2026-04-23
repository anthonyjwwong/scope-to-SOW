create table projects (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null default 'Untitled Project',
  transcript text not null,
  extracted_data jsonb,
  classified_data jsonb,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

create table sow_drafts (
  id uuid default gen_random_uuid() primary key,
  project_id uuid references projects(id) on delete cascade not null,
  content text not null,
  version integer not null default 1,
  generation_metadata jsonb,
  created_at timestamptz default now() not null
);

create index idx_projects_user_id on projects(user_id);
create index idx_sow_drafts_project_id on sow_drafts(project_id);