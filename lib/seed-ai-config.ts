import { db } from './db';
import { aiProviders, aiModels, aiPromptTemplates } from './schema';
import { createProvider, createModel, createPromptTemplate } from './ai-config';

// Seed script to populate initial AI configuration
export async function seedAIConfig() {
  console.log('🌱 Seeding AI configuration...');

  try {
    // Create AI Providers
    const openaiProvider = await createProvider({
      name: 'openai',
      displayName: 'OpenAI',
      baseUrl: 'https://api.openai.com/v1'
    });

    const anthropicProvider = await createProvider({
      name: 'anthropic',
      displayName: 'Anthropic',
      baseUrl: 'https://api.anthropic.com/v1'
    });

    const googleProvider = await createProvider({
      name: 'google',
      displayName: 'Google AI',
      baseUrl: 'https://generativelanguage.googleapis.com/v1'
    });

    console.log('✅ Created AI providers');

    // Create AI Models
    await createModel({
      providerId: openaiProvider.id,
      name: 'gpt-4',
      displayName: 'GPT-4',
      maxTokens: 8192,
      supportsStreaming: true,
      costPer1kTokens: 3 // $0.03 per 1k tokens
    });

    await createModel({
      providerId: openaiProvider.id,
      name: 'gpt-4-turbo',
      displayName: 'GPT-4 Turbo',
      maxTokens: 128000,
      supportsStreaming: true,
      costPer1kTokens: 1 // $0.01 per 1k tokens
    });

    await createModel({
      providerId: openaiProvider.id,
      name: 'gpt-3.5-turbo',
      displayName: 'GPT-3.5 Turbo',
      maxTokens: 16384,
      supportsStreaming: true,
      costPer1kTokens: 0.5 // $0.0005 per 1k tokens
    });

    await createModel({
      providerId: anthropicProvider.id,
      name: 'claude-3-opus',
      displayName: 'Claude 3 Opus',
      maxTokens: 200000,
      supportsStreaming: true,
      costPer1kTokens: 15 // $0.015 per 1k tokens
    });

    await createModel({
      providerId: anthropicProvider.id,
      name: 'claude-3-sonnet',
      displayName: 'Claude 3 Sonnet',
      maxTokens: 200000,
      supportsStreaming: true,
      costPer1kTokens: 3 // $0.003 per 1k tokens
    });

    await createModel({
      providerId: anthropicProvider.id,
      name: 'claude-3-haiku',
      displayName: 'Claude 3 Haiku',
      maxTokens: 200000,
      supportsStreaming: true,
      costPer1kTokens: 0.25 // $0.00025 per 1k tokens
    });

    await createModel({
      providerId: googleProvider.id,
      name: 'gemini-pro',
      displayName: 'Gemini Pro',
      maxTokens: 32768,
      supportsStreaming: true,
      costPer1kTokens: 0.5 // $0.0005 per 1k tokens
    });

    console.log('✅ Created AI models');

    // Create default prompt templates for each feature
    const promptTemplates = [
      {
        name: 'AI Idea Clarifier',
        description: 'Helps users clarify and refine their app ideas',
        phase: 'ideation',
        featureType: 'idea_clarifier',
        systemPrompt: `You are an expert product strategist and AI mentor helping users clarify and refine their app ideas. Your role is to ask probing questions that help users:

1. Articulate their core problem and solution
2. Define their target audience clearly
3. Identify the unique value proposition
4. Consider market viability and competition
5. Refine the scope to be achievable

Be encouraging, insightful, and practical. Ask one thoughtful question at a time and build on their responses. Help them think through potential challenges and opportunities.`,
        userPromptTemplate: 'User\'s app idea: {userInput}\n\nPlease help me clarify and refine this idea by asking insightful questions.',
        modelConfig: { temperature: 0.7, maxTokens: 1000 },
        isDefault: true,
        createdBy: '00000000-0000-0000-0000-000000000000' // System user
      },
      {
        name: 'PRD Generator',
        description: 'Generates Product Requirements Documents',
        phase: 'planning',
        featureType: 'prd_generator',
        systemPrompt: `You are an expert product manager who creates comprehensive Product Requirements Documents (PRDs). Based on the user's app idea and requirements, generate a structured PRD that includes:

1. Executive Summary
2. Problem Statement
3. Solution Overview
4. Target Users & Personas
5. Core Features & Requirements
6. Success Metrics
7. Technical Considerations
8. Timeline & Milestones

Make the PRD clear, actionable, and well-organized. Use professional language while keeping it accessible.`,
        userPromptTemplate: 'App concept: {appConcept}\nTarget audience: {targetAudience}\nCore features: {coreFeatures}\n\nPlease generate a comprehensive PRD for this app.',
        modelConfig: { temperature: 0.5, maxTokens: 2000 },
        isDefault: true,
        createdBy: '00000000-0000-0000-0000-000000000000'
      },
      {
        name: 'User Story Generator',
        description: 'Creates user stories from features',
        phase: 'planning',
        featureType: 'user_stories',
        systemPrompt: `You are an expert agile coach who creates clear, actionable user stories. Transform high-level features into well-structured user stories using the format:

"As a [user type], I want [functionality] so that [benefit/value]."

Include acceptance criteria for each story. Prioritize stories by importance and complexity. Break down complex features into smaller, manageable stories.`,
        userPromptTemplate: 'Features to convert: {features}\nTarget users: {users}\n\nPlease create detailed user stories with acceptance criteria.',
        modelConfig: { temperature: 0.6, maxTokens: 1500 },
        isDefault: true,
        createdBy: '00000000-0000-0000-0000-000000000000'
      },
      {
        name: 'UX Flow Designer',
        description: 'Helps design user experience flows',
        phase: 'design',
        featureType: 'ux_flow',
        systemPrompt: `You are a UX design expert who helps create intuitive user experience flows. Based on user stories and app requirements, design step-by-step user flows that are:

1. Intuitive and user-friendly
2. Efficient and goal-oriented
3. Accessible and inclusive
4. Consistent with platform conventions

Describe each step clearly and suggest UI elements, interactions, and transitions.`,
        userPromptTemplate: 'User story: {userStory}\nApp type: {appType}\n\nPlease design a detailed UX flow for this user story.',
        modelConfig: { temperature: 0.7, maxTokens: 1200 },
        isDefault: true,
        createdBy: '00000000-0000-0000-0000-000000000000'
      },
      {
        name: 'MVP Scope Finalizer',
        description: 'Helps define MVP scope and priorities',
        phase: 'mvp',
        featureType: 'mvp_scope',
        systemPrompt: `You are a lean startup expert who helps define Minimum Viable Product (MVP) scope. Your goal is to help users:

1. Identify core features essential for MVP
2. Prioritize features by impact vs effort
3. Define success metrics for MVP
4. Create a realistic timeline
5. Identify what to exclude from MVP

Be practical and focus on delivering value quickly while learning from users.`,
        userPromptTemplate: 'Full feature list: {features}\nTarget timeline: {timeline}\nResources: {resources}\n\nPlease help me define the optimal MVP scope.',
        modelConfig: { temperature: 0.6, maxTokens: 1500 },
        isDefault: true,
        createdBy: '00000000-0000-0000-0000-000000000000'
      },
      {
        name: 'No-Code Platform Recommender',
        description: 'Recommends suitable no-code/low-code platforms',
        phase: 'development',
        featureType: 'platform_recommender',
        systemPrompt: `You are an expert in no-code/low-code platforms who helps users choose the best platform for their app. Consider:

1. App type and complexity
2. User's technical skills
3. Budget constraints
4. Required features and integrations
5. Scalability needs
6. Platform limitations

Provide specific recommendations with pros/cons for each platform. Include popular options like Bubble, FlutterFlow, Webflow, Airtable, etc.`,
        userPromptTemplate: 'App description: {appDescription}\nTechnical skill level: {skillLevel}\nBudget: {budget}\nRequired features: {features}\n\nPlease recommend the best no-code platforms for this project.',
        modelConfig: { temperature: 0.7, maxTokens: 1800 },
        isDefault: true,
        createdBy: '00000000-0000-0000-0000-000000000000'
      },
      {
        name: 'Test Case Generator',
        description: 'Generates test cases for app features',
        phase: 'testing',
        featureType: 'test_cases',
        systemPrompt: `You are a QA expert who creates comprehensive test cases. Generate test cases that cover:

1. Functional testing (happy path and edge cases)
2. User interface testing
3. Usability testing scenarios
4. Performance considerations
5. Security testing basics
6. Cross-platform/browser testing

Make test cases clear, actionable, and easy to execute for non-technical users.`,
        userPromptTemplate: 'Features to test: {features}\nApp platform: {platform}\nUser scenarios: {scenarios}\n\nPlease generate comprehensive test cases.',
        modelConfig: { temperature: 0.5, maxTokens: 2000 },
        isDefault: true,
        createdBy: '00000000-0000-0000-0000-000000000000'
      },
      {
        name: 'Deployment Guide Generator',
        description: 'Creates deployment checklists and guides',
        phase: 'deployment',
        featureType: 'deployment_guide',
        systemPrompt: `You are a deployment expert who creates comprehensive launch checklists. Help users prepare for deployment by covering:

1. Pre-launch testing checklist
2. Platform-specific deployment steps
3. Domain and hosting setup
4. Analytics and monitoring setup
5. App store submission (if applicable)
6. Marketing and launch strategy
7. Post-launch monitoring

Provide actionable steps and best practices for a successful launch.`,
        userPromptTemplate: 'App platform: {platform}\nTarget audience: {audience}\nLaunch timeline: {timeline}\n\nPlease create a comprehensive deployment guide and checklist.',
        modelConfig: { temperature: 0.6, maxTokens: 2000 },
        isDefault: true,
        createdBy: '00000000-0000-0000-0000-000000000000'
      }
    ];

    // Create all prompt templates
    for (const template of promptTemplates) {
      await createPromptTemplate(template);
    }

    console.log('✅ Created default prompt templates');
    console.log('🎉 AI configuration seeding completed successfully!');

  } catch (error) {
    console.error('❌ Error seeding AI configuration:', error);
    throw error;
  }
}

// Run this script directly
if (require.main === module) {
  seedAIConfig()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}