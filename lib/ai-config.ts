import { db } from './db';
import { 
  aiProviders, 
  aiModels, 
  aiApiKeys, 
  aiPromptTemplates, 
  aiUsageLogs 
} from './schema';
import { eq, and, desc } from 'drizzle-orm';
import crypto from 'crypto';

// Encryption utilities
const ENCRYPTION_KEY = process.env.AI_ENCRYPTION_KEY || 'your-32-character-secret-key-here!';
const ALGORITHM = 'aes-256-gcm';

export const encryptApiKey = (apiKey: string): string => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipher(ALGORITHM, ENCRYPTION_KEY);
  let encrypted = cipher.update(apiKey, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const authTag = cipher.getAuthTag();
  return iv.toString('hex') + ':' + authTag.toString('hex') + ':' + encrypted;
};

export const decryptApiKey = (encryptedKey: string): string => {
  const parts = encryptedKey.split(':');
  const iv = Buffer.from(parts[0], 'hex');
  const authTag = Buffer.from(parts[1], 'hex');
  const encrypted = parts[2];
  
  const decipher = crypto.createDecipher(ALGORITHM, ENCRYPTION_KEY);
  decipher.setAuthTag(authTag);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

// AI Provider utilities
export const getActiveProviders = async () => {
  return await db.select().from(aiProviders).where(eq(aiProviders.isActive, true));
};

export const getProviderById = async (id: string) => {
  const result = await db.select().from(aiProviders).where(eq(aiProviders.id, id)).limit(1);
  return result[0] || null;
};

export const createProvider = async (providerData: {
  name: string;
  displayName: string;
  baseUrl?: string;
}) => {
  const result = await db.insert(aiProviders).values(providerData).returning();
  return result[0];
};

// AI Model utilities
export const getModelsByProvider = async (providerId: string) => {
  return await db.select().from(aiModels)
    .where(and(eq(aiModels.providerId, providerId), eq(aiModels.isActive, true)));
};

export const getModelById = async (id: string) => {
  const result = await db.select().from(aiModels).where(eq(aiModels.id, id)).limit(1);
  return result[0] || null;
};

export const createModel = async (modelData: {
  providerId: string;
  name: string;
  displayName: string;
  maxTokens?: number;
  supportsStreaming?: boolean;
  costPer1kTokens?: number;
}) => {
  const result = await db.insert(aiModels).values(modelData).returning();
  return result[0];
};

// API Key utilities
export const getApiKeysByUser = async (userId: string) => {
  return await db.select().from(aiApiKeys)
    .where(and(eq(aiApiKeys.userId, userId), eq(aiApiKeys.isActive, true)))
    .orderBy(desc(aiApiKeys.createdAt));
};

export const getApiKeysByTeam = async (teamId: string) => {
  return await db.select().from(aiApiKeys)
    .where(and(eq(aiApiKeys.teamId, teamId), eq(aiApiKeys.isActive, true)))
    .orderBy(desc(aiApiKeys.createdAt));
};

export const getVudAraApiKeys = async () => {
  return await db.select().from(aiApiKeys)
    .where(and(eq(aiApiKeys.userId, null), eq(aiApiKeys.isActive, true)))
    .orderBy(desc(aiApiKeys.createdAt));
};

export const getDefaultApiKey = async (providerId: string, userId?: string, teamId?: string) => {
  let query = db.select().from(aiApiKeys)
    .where(and(
      eq(aiApiKeys.providerId, providerId),
      eq(aiApiKeys.isActive, true),
      eq(aiApiKeys.isDefault, true)
    ));

  if (userId) {
    query = query.where(eq(aiApiKeys.userId, userId));
  } else if (teamId) {
    query = query.where(eq(aiApiKeys.teamId, teamId));
  } else {
    query = query.where(eq(aiApiKeys.userId, null));
  }

  const result = await query.limit(1);
  return result[0] || null;
};

export const createApiKey = async (keyData: {
  providerId: string;
  userId?: string;
  teamId?: string;
  keyName: string;
  apiKey: string;
  isDefault?: boolean;
  createdBy: string;
}) => {
  const encryptedKey = encryptApiKey(keyData.apiKey);
  const result = await db.insert(aiApiKeys).values({
    ...keyData,
    encryptedKey,
    apiKey: undefined, // Remove plain text key
  }).returning();
  return result[0];
};

export const getDecryptedApiKey = async (keyId: string) => {
  const result = await db.select().from(aiApiKeys).where(eq(aiApiKeys.id, keyId)).limit(1);
  if (!result[0]) return null;
  
  return {
    ...result[0],
    decryptedKey: decryptApiKey(result[0].encryptedKey)
  };
};

// Prompt Template utilities
export const getPromptTemplatesByPhase = async (phase: string, userId?: string, teamId?: string) => {
  let query = db.select().from(aiPromptTemplates)
    .where(and(eq(aiPromptTemplates.phase, phase), eq(aiPromptTemplates.isActive, true)));

  if (userId) {
    query = query.where(eq(aiPromptTemplates.userId, userId));
  } else if (teamId) {
    query = query.where(eq(aiPromptTemplates.teamId, teamId));
  } else {
    query = query.where(eq(aiPromptTemplates.userId, null));
  }

  return await query.orderBy(desc(aiPromptTemplates.createdAt));
};

export const getDefaultPromptTemplate = async (featureType: string, phase?: string) => {
  let query = db.select().from(aiPromptTemplates)
    .where(and(
      eq(aiPromptTemplates.featureType, featureType),
      eq(aiPromptTemplates.isDefault, true),
      eq(aiPromptTemplates.isActive, true),
      eq(aiPromptTemplates.userId, null) // VudAra default prompts
    ));

  if (phase) {
    query = query.where(eq(aiPromptTemplates.phase, phase));
  }

  const result = await query.limit(1);
  return result[0] || null;
};

export const createPromptTemplate = async (templateData: {
  name: string;
  description?: string;
  phase?: string;
  featureType: string;
  systemPrompt: string;
  userPromptTemplate?: string;
  modelConfig?: any;
  isDefault?: boolean;
  userId?: string;
  teamId?: string;
  createdBy: string;
}) => {
  const result = await db.insert(aiPromptTemplates).values(templateData).returning();
  return result[0];
};

// Usage logging
export const logAiUsage = async (usageData: {
  userId: string;
  projectId?: string;
  sessionId?: string;
  providerId: string;
  modelId: string;
  apiKeyId: string;
  promptTemplateId?: string;
  tokensUsed: number;
  cost?: number;
  responseTime?: number;
  success?: boolean;
  errorMessage?: string;
}) => {
  const result = await db.insert(aiUsageLogs).values(usageData).returning();
  
  // Update API key usage count
  await db.update(aiApiKeys)
    .set({ 
      usageCount: sql`usage_count + 1`,
      lastUsedAt: new Date()
    })
    .where(eq(aiApiKeys.id, usageData.apiKeyId));
  
  return result[0];
};

export const getUserUsageStats = async (userId: string, startDate?: Date, endDate?: Date) => {
  let query = db.select({
    totalCalls: sql`count(*)`,
    totalTokens: sql`sum(tokens_used)`,
    totalCost: sql`sum(cost)`,
    avgResponseTime: sql`avg(response_time)`,
    successRate: sql`(count(*) filter (where success = true)::float / count(*)) * 100`
  }).from(aiUsageLogs).where(eq(aiUsageLogs.userId, userId));

  if (startDate) {
    query = query.where(gte(aiUsageLogs.createdAt, startDate));
  }
  if (endDate) {
    query = query.where(lte(aiUsageLogs.createdAt, endDate));
  }

  const result = await query;
  return result[0] || null;
};

// AI Service interface
export interface AIServiceConfig {
  provider: string;
  model: string;
  apiKey: string;
  baseUrl?: string;
  maxTokens?: number;
  temperature?: number;
  systemPrompt?: string;
}

export const getAIConfigForUser = async (
  featureType: string, 
  userId: string, 
  teamId?: string,
  phase?: string
): Promise<AIServiceConfig | null> => {
  // Get prompt template (custom user/team first, then default)
  let promptTemplate = null;
  
  if (userId) {
    promptTemplate = await getDefaultPromptTemplate(featureType, phase);
    // TODO: Add logic to check for user/team custom prompts
  }
  
  if (!promptTemplate) {
    promptTemplate = await getDefaultPromptTemplate(featureType, phase);
  }
  
  if (!promptTemplate) return null;

  // Get API key (BYOK first, then VudAra default)
  let apiKeyRecord = null;
  
  if (userId && teamId) {
    // Try team BYOK first
    const teamKeys = await getApiKeysByTeam(teamId);
    apiKeyRecord = teamKeys.find(key => key.isDefault) || teamKeys[0];
  }
  
  if (!apiKeyRecord && userId) {
    // Try user BYOK
    const userKeys = await getApiKeysByUser(userId);
    apiKeyRecord = userKeys.find(key => key.isDefault) || userKeys[0];
  }
  
  if (!apiKeyRecord) {
    // Fall back to VudAra keys
    const vudAraKeys = await getVudAraApiKeys();
    apiKeyRecord = vudAraKeys.find(key => key.isDefault) || vudAraKeys[0];
  }
  
  if (!apiKeyRecord) return null;

  // Get provider and model info
  const provider = await getProviderById(apiKeyRecord.providerId);
  if (!provider) return null;

  const decryptedKey = await getDecryptedApiKey(apiKeyRecord.id);
  if (!decryptedKey) return null;

  // Get default model for provider
  const models = await getModelsByProvider(provider.id);
  const defaultModel = models.find(m => m.name.includes('gpt-4') || m.name.includes('claude')) || models[0];
  
  if (!defaultModel) return null;

  return {
    provider: provider.name,
    model: defaultModel.name,
    apiKey: decryptedKey.decryptedKey,
    baseUrl: provider.baseUrl,
    maxTokens: defaultModel.maxTokens || 4096,
    temperature: promptTemplate.modelConfig?.temperature || 0.7,
    systemPrompt: promptTemplate.systemPrompt
  };
};