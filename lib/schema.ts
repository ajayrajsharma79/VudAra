import { pgTable, text, timestamp, uuid, integer, boolean, jsonb, pgEnum } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Enums
export const userRoleEnum = pgEnum('user_role', ['individual', 'team_member', 'customer_admin', 'vudara_admin']);
export const projectStatusEnum = pgEnum('project_status', ['active', 'paused', 'completed', 'archived']);
export const phaseEnum = pgEnum('phase', ['ideation', 'planning', 'design', 'mvp', 'development', 'testing', 'deployment']);
export const artifactTypeEnum = pgEnum('artifact_type', ['prd', 'user_stories', 'value_proposition', 'wireframe', 'test_cases', 'deployment_checklist']);
export const issueStatusEnum = pgEnum('issue_status', ['open', 'in_progress', 'resolved', 'closed']);
export const issuePriorityEnum = pgEnum('issue_priority', ['low', 'medium', 'high', 'critical']);

// AI Configuration tables
export const aiProviders = pgTable('ai_providers', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull().unique(), // 'openai', 'anthropic', 'google', etc.
  displayName: text('display_name').notNull(),
  baseUrl: text('base_url'),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const aiModels = pgTable('ai_models', {
  id: uuid('id').defaultRandom().primaryKey(),
  providerId: uuid('provider_id').notNull(),
  name: text('name').notNull(), // 'gpt-4', 'claude-3-sonnet', etc.
  displayName: text('display_name').notNull(),
  maxTokens: integer('max_tokens').default(4096),
  supportsStreaming: boolean('supports_streaming').default(true),
  costPer1kTokens: integer('cost_per_1k_tokens'), // in cents
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const aiApiKeys = pgTable('ai_api_keys', {
  id: uuid('id').defaultRandom().primaryKey(),
  providerId: uuid('provider_id').notNull(),
  userId: uuid('user_id'), // null for VudAra keys, user ID for BYOK
  teamId: uuid('team_id'), // for team-level BYOK
  keyName: text('key_name').notNull(),
  encryptedKey: text('encrypted_key').notNull(), // encrypted API key
  isActive: boolean('is_active').default(true).notNull(),
  isDefault: boolean('is_default').default(false).notNull(),
  usageCount: integer('usage_count').default(0).notNull(),
  lastUsedAt: timestamp('last_used_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  createdBy: uuid('created_by').notNull(),
});

export const aiPromptTemplates = pgTable('ai_prompt_templates', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  phase: phaseEnum('phase'),
  featureType: text('feature_type').notNull(), // 'idea_clarifier', 'prd_generator', etc.
  systemPrompt: text('system_prompt').notNull(),
  userPromptTemplate: text('user_prompt_template'),
  modelConfig: jsonb('model_config'), // temperature, max_tokens, etc.
  isDefault: boolean('is_default').default(false).notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  userId: uuid('user_id'), // null for VudAra prompts, user ID for custom prompts
  teamId: uuid('team_id'), // for team-level custom prompts
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  createdBy: uuid('created_by').notNull(),
});

export const aiUsageLogs = pgTable('ai_usage_logs', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull(),
  projectId: uuid('project_id'),
  sessionId: uuid('session_id'),
  providerId: uuid('provider_id').notNull(),
  modelId: uuid('model_id').notNull(),
  apiKeyId: uuid('api_key_id').notNull(),
  promptTemplateId: uuid('prompt_template_id'),
  tokensUsed: integer('tokens_used').notNull(),
  cost: integer('cost'), // in cents
  responseTime: integer('response_time'), // in milliseconds
  success: boolean('success').default(true).notNull(),
  errorMessage: text('error_message'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Users table
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  role: userRoleEnum('role').notNull().default('individual'),
  avatar: text('avatar'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  lastLoginAt: timestamp('last_login_at'),
  isActive: boolean('is_active').default(true).notNull(),
  teamId: uuid('team_id'),
});

// Teams table
export const teams = pgTable('teams', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  ownerId: uuid('owner_id').notNull(),
});

// Projects table
export const projects = pgTable('projects', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  status: projectStatusEnum('status').notNull().default('active'),
  currentPhase: phaseEnum('current_phase').notNull().default('ideation'),
  progress: integer('progress').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  ownerId: uuid('owner_id').notNull(),
  teamId: uuid('team_id'),
  metadata: jsonb('metadata'), // For storing additional project data
});

// Project artifacts table
export const artifacts = pgTable('artifacts', {
  id: uuid('id').defaultRandom().primaryKey(),
  projectId: uuid('project_id').notNull(),
  type: artifactTypeEnum('type').notNull(),
  title: text('title').notNull(),
  description: text('description'),
  content: jsonb('content').notNull(), // Store the actual artifact content
  phase: phaseEnum('phase').notNull(),
  status: text('status').notNull().default('draft'), // draft, complete, archived
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  createdBy: uuid('created_by').notNull(),
});

// Issues table
export const issues = pgTable('issues', {
  id: uuid('id').defaultRandom().primaryKey(),
  projectId: uuid('project_id').notNull(),
  title: text('title').notNull(),
  description: text('description'),
  status: issueStatusEnum('status').notNull().default('open'),
  priority: issuePriorityEnum('priority').notNull().default('medium'),
  assigneeId: uuid('assignee_id'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  createdBy: uuid('created_by').notNull(),
  resolvedAt: timestamp('resolved_at'),
});

// AI Chat sessions table
export const chatSessions = pgTable('chat_sessions', {
  id: uuid('id').defaultRandom().primaryKey(),
  projectId: uuid('project_id').notNull(),
  userId: uuid('user_id').notNull(),
  title: text('title'),
  phase: phaseEnum('phase'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// AI Chat messages table
export const chatMessages = pgTable('chat_messages', {
  id: uuid('id').defaultRandom().primaryKey(),
  sessionId: uuid('session_id').notNull(),
  role: text('role').notNull(), // 'user' or 'assistant'
  content: text('content').notNull(),
  metadata: jsonb('metadata'), // For storing additional message data
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Project team members (many-to-many relationship)
export const projectMembers = pgTable('project_members', {
  id: uuid('id').defaultRandom().primaryKey(),
  projectId: uuid('project_id').notNull(),
  userId: uuid('user_id').notNull(),
  role: text('role').notNull().default('member'), // owner, admin, member
  joinedAt: timestamp('joined_at').defaultNow().notNull(),
});

// Relations
export const usersRelations = relations(users, ({ one, many }) => ({
  team: one(teams, {
    fields: [users.teamId],
    references: [teams.id],
  }),
  ownedProjects: many(projects),
  projectMemberships: many(projectMembers),
  createdArtifacts: many(artifacts),
  assignedIssues: many(issues, { relationName: 'assignedIssues' }),
  createdIssues: many(issues, { relationName: 'createdIssues' }),
  chatSessions: many(chatSessions),
}));

export const teamsRelations = relations(teams, ({ one, many }) => ({
  owner: one(users, {
    fields: [teams.ownerId],
    references: [users.id],
  }),
  members: many(users),
  projects: many(projects),
}));

export const projectsRelations = relations(projects, ({ one, many }) => ({
  owner: one(users, {
    fields: [projects.ownerId],
    references: [users.id],
  }),
  team: one(teams, {
    fields: [projects.teamId],
    references: [teams.id],
  }),
  artifacts: many(artifacts),
  issues: many(issues),
  members: many(projectMembers),
  chatSessions: many(chatSessions),
}));

export const artifactsRelations = relations(artifacts, ({ one }) => ({
  project: one(projects, {
    fields: [artifacts.projectId],
    references: [projects.id],
  }),
  creator: one(users, {
    fields: [artifacts.createdBy],
    references: [users.id],
  }),
}));

export const issuesRelations = relations(issues, ({ one }) => ({
  project: one(projects, {
    fields: [issues.projectId],
    references: [projects.id],
  }),
  assignee: one(users, {
    fields: [issues.assigneeId],
    references: [users.id],
    relationName: 'assignedIssues',
  }),
  creator: one(users, {
    fields: [issues.createdBy],
    references: [users.id],
    relationName: 'createdIssues',
  }),
}));

export const chatSessionsRelations = relations(chatSessions, ({ one, many }) => ({
  project: one(projects, {
    fields: [chatSessions.projectId],
    references: [projects.id],
  }),
  user: one(users, {
    fields: [chatSessions.userId],
    references: [users.id],
  }),
  messages: many(chatMessages),
}));

export const chatMessagesRelations = relations(chatMessages, ({ one }) => ({
  session: one(chatSessions, {
    fields: [chatMessages.sessionId],
    references: [chatSessions.id],
  }),
}));

export const projectMembersRelations = relations(projectMembers, ({ one }) => ({
  project: one(projects, {
    fields: [projectMembers.projectId],
    references: [projects.id],
  }),
  user: one(users, {
    fields: [projectMembers.userId],
    references: [users.id],
  }),
}));

// AI Configuration Relations
export const aiProvidersRelations = relations(aiProviders, ({ many }) => ({
  models: many(aiModels),
  apiKeys: many(aiApiKeys),
  usageLogs: many(aiUsageLogs),
}));

export const aiModelsRelations = relations(aiModels, ({ one, many }) => ({
  provider: one(aiProviders, {
    fields: [aiModels.providerId],
    references: [aiProviders.id],
  }),
  usageLogs: many(aiUsageLogs),
}));

export const aiApiKeysRelations = relations(aiApiKeys, ({ one, many }) => ({
  provider: one(aiProviders, {
    fields: [aiApiKeys.providerId],
    references: [aiProviders.id],
  }),
  user: one(users, {
    fields: [aiApiKeys.userId],
    references: [users.id],
  }),
  team: one(teams, {
    fields: [aiApiKeys.teamId],
    references: [teams.id],
  }),
  creator: one(users, {
    fields: [aiApiKeys.createdBy],
    references: [users.id],
  }),
  usageLogs: many(aiUsageLogs),
}));

export const aiPromptTemplatesRelations = relations(aiPromptTemplates, ({ one, many }) => ({
  user: one(users, {
    fields: [aiPromptTemplates.userId],
    references: [users.id],
  }),
  team: one(teams, {
    fields: [aiPromptTemplates.teamId],
    references: [teams.id],
  }),
  creator: one(users, {
    fields: [aiPromptTemplates.createdBy],
    references: [users.id],
  }),
  usageLogs: many(aiUsageLogs),
}));

export const aiUsageLogsRelations = relations(aiUsageLogs, ({ one }) => ({
  user: one(users, {
    fields: [aiUsageLogs.userId],
    references: [users.id],
  }),
  project: one(projects, {
    fields: [aiUsageLogs.projectId],
    references: [projects.id],
  }),
  session: one(chatSessions, {
    fields: [aiUsageLogs.sessionId],
    references: [chatSessions.id],
  }),
  provider: one(aiProviders, {
    fields: [aiUsageLogs.providerId],
    references: [aiProviders.id],
  }),
  model: one(aiModels, {
    fields: [aiUsageLogs.modelId],
    references: [aiModels.id],
  }),
  apiKey: one(aiApiKeys, {
    fields: [aiUsageLogs.apiKeyId],
    references: [aiApiKeys.id],
  }),
  promptTemplate: one(aiPromptTemplates, {
    fields: [aiUsageLogs.promptTemplateId],
    references: [aiPromptTemplates.id],
  }),
}));