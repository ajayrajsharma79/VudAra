import { db } from './db';
import { users, projects, artifacts, issues, chatSessions, chatMessages } from './schema';
import { eq, desc, and } from 'drizzle-orm';

// Re-export AI utilities
export * from './ai-config';

// User utilities
export const getUserById = async (id: string) => {
  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return result[0] || null;
};

export const getUserByEmail = async (email: string) => {
  const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
  return result[0] || null;
};

// Project utilities
export const getProjectsByUserId = async (userId: string) => {
  return await db.select().from(projects).where(eq(projects.ownerId, userId)).orderBy(desc(projects.updatedAt));
};

export const getProjectById = async (id: string) => {
  const result = await db.select().from(projects).where(eq(projects.id, id)).limit(1);
  return result[0] || null;
};

// Artifact utilities
export const getArtifactsByProjectId = async (projectId: string) => {
  return await db.select().from(artifacts).where(eq(artifacts.projectId, projectId)).orderBy(desc(artifacts.updatedAt));
};

// Issue utilities
export const getIssuesByProjectId = async (projectId: string) => {
  return await db.select().from(issues).where(eq(issues.projectId, projectId)).orderBy(desc(issues.createdAt));
};

// Chat utilities
export const getChatSessionsByProjectId = async (projectId: string) => {
  return await db.select().from(chatSessions).where(eq(chatSessions.projectId, projectId)).orderBy(desc(chatSessions.updatedAt));
};

export const getChatMessagesBySessionId = async (sessionId: string) => {
  return await db.select().from(chatMessages).where(eq(chatMessages.sessionId, sessionId)).orderBy(chatMessages.createdAt);
};

// Create utilities
export const createUser = async (userData: {
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  role?: 'individual' | 'team_member' | 'customer_admin' | 'vudara_admin';
}) => {
  const result = await db.insert(users).values(userData).returning();
  return result[0];
};

export const createProject = async (projectData: {
  name: string;
  description?: string;
  ownerId: string;
  teamId?: string;
}) => {
  const result = await db.insert(projects).values(projectData).returning();
  return result[0];
};

export const createArtifact = async (artifactData: {
  projectId: string;
  type: 'prd' | 'user_stories' | 'value_proposition' | 'wireframe' | 'test_cases' | 'deployment_checklist';
  title: string;
  description?: string;
  content: any;
  phase: 'ideation' | 'planning' | 'design' | 'mvp' | 'development' | 'testing' | 'deployment';
  createdBy: string;
}) => {
  const result = await db.insert(artifacts).values(artifactData).returning();
  return result[0];
};

export const createIssue = async (issueData: {
  projectId: string;
  title: string;
  description?: string;
  priority?: 'low' | 'medium' | 'high' | 'critical';
  assigneeId?: string;
  createdBy: string;
}) => {
  const result = await db.insert(issues).values(issueData).returning();
  return result[0];
};

export const createChatSession = async (sessionData: {
  projectId: string;
  userId: string;
  title?: string;
  phase?: 'ideation' | 'planning' | 'design' | 'mvp' | 'development' | 'testing' | 'deployment';
}) => {
  const result = await db.insert(chatSessions).values(sessionData).returning();
  return result[0];
};

export const createChatMessage = async (messageData: {
  sessionId: string;
  role: 'user' | 'assistant';
  content: string;
  metadata?: any;
}) => {
  const result = await db.insert(chatMessages).values(messageData).returning();
  return result[0];
};