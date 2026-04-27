-- Enable RLS on both tables
alter table projects enable row level security;
alter table sow_drafts enable row level security;

-- Users can only see their own projects
create policy "Users can view own projects"
  on projects for select
  using (auth.uid() = user_id);

-- Users can only create projects for themselves
create policy "Users can create own projects"
  on projects for insert
  with check (auth.uid() = user_id);

-- Users can only update their own projects
create policy "Users can update own projects"
  on projects for update
  using (auth.uid() = user_id);

-- Users can only delete their own projects
create policy "Users can delete own projects"
  on projects for delete
  using (auth.uid() = user_id);

-- SOW drafts: access through project ownership
create policy "Users can view own drafts"
  on sow_drafts for select
  using (project_id in (
    select id from projects where user_id = auth.uid()
  ));

create policy "Users can create drafts for own projects"
  on sow_drafts for insert
  with check (project_id in (
    select id from projects where user_id = auth.uid()
  ));