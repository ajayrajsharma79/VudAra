'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, 
  Settings, 
  Key, 
  Brain, 
  BarChart3,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  ArrowLeft,
  Save,
  TestTube
} from 'lucide-react';
import Link from 'next/link';

interface AIProvider {
  id: string;
  name: string;
  displayName: string;
  baseUrl?: string;
  isActive: boolean;
  modelCount: number;
}

interface AIModel {
  id: string;
  name: string;
  displayName: string;
  maxTokens: number;
  costPer1kTokens: number;
  isActive: boolean;
}

interface APIKey {
  id: string;
  keyName: string;
  provider: string;
  isDefault: boolean;
  usageCount: number;
  lastUsedAt?: string;
  createdAt: string;
}

interface PromptTemplate {
  id: string;
  name: string;
  featureType: string;
  phase: string;
  isDefault: boolean;
  isActive: boolean;
  createdAt: string;
}

export default function AIConfigAdmin() {
  const [activeTab, setActiveTab] = useState("providers");
  const [providers, setProviders] = useState<AIProvider[]>([]);
  const [models, setModels] = useState<AIModel[]>([]);
  const [apiKeys, setApiKeys] = useState<APIKey[]>([]);
  const [promptTemplates, setPromptTemplates] = useState<PromptTemplate[]>([]);
  const [showApiKey, setShowApiKey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock data - replace with actual API calls
  useEffect(() => {
    // Load mock data
    setProviders([
      { id: '1', name: 'openai', displayName: 'OpenAI', baseUrl: 'https://api.openai.com/v1', isActive: true, modelCount: 3 },
      { id: '2', name: 'anthropic', displayName: 'Anthropic', baseUrl: 'https://api.anthropic.com/v1', isActive: true, modelCount: 3 },
      { id: '3', name: 'google', displayName: 'Google AI', baseUrl: 'https://generativelanguage.googleapis.com/v1', isActive: true, modelCount: 1 }
    ]);

    setModels([
      { id: '1', name: 'gpt-4', displayName: 'GPT-4', maxTokens: 8192, costPer1kTokens: 3, isActive: true },
      { id: '2', name: 'gpt-4-turbo', displayName: 'GPT-4 Turbo', maxTokens: 128000, costPer1kTokens: 1, isActive: true },
      { id: '3', name: 'claude-3-opus', displayName: 'Claude 3 Opus', maxTokens: 200000, costPer1kTokens: 15, isActive: true }
    ]);

    setApiKeys([
      { id: '1', keyName: 'VudAra OpenAI Key', provider: 'OpenAI', isDefault: true, usageCount: 1250, lastUsedAt: '2 hours ago', createdAt: '2024-01-15' },
      { id: '2', keyName: 'VudAra Anthropic Key', provider: 'Anthropic', isDefault: true, usageCount: 890, lastUsedAt: '1 day ago', createdAt: '2024-01-15' }
    ]);

    setPromptTemplates([
      { id: '1', name: 'AI Idea Clarifier', featureType: 'idea_clarifier', phase: 'ideation', isDefault: true, isActive: true, createdAt: '2024-01-15' },
      { id: '2', name: 'PRD Generator', featureType: 'prd_generator', phase: 'planning', isDefault: true, isActive: true, createdAt: '2024-01-15' },
      { id: '3', name: 'User Story Generator', featureType: 'user_stories', phase: 'planning', isDefault: true, isActive: true, createdAt: '2024-01-15' }
    ]);
  }, []);

  const handleAddProvider = () => {
    // TODO: Implement add provider functionality
    console.log('Add provider');
  };

  const handleAddModel = () => {
    // TODO: Implement add model functionality
    console.log('Add model');
  };

  const handleAddApiKey = () => {
    // TODO: Implement add API key functionality
    console.log('Add API key');
  };

  const handleAddPromptTemplate = () => {
    // TODO: Implement add prompt template functionality
    console.log('Add prompt template');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                href="/dashboard"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Settings className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-white">AI Configuration</h1>
              </div>
            </div>
            <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
              Admin Panel
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Active Providers</p>
                  <p className="text-2xl font-bold text-white">{providers.filter(p => p.isActive).length}</p>
                </div>
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Brain className="w-6 h-6 text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">AI Models</p>
                  <p className="text-2xl font-bold text-white">{models.filter(m => m.isActive).length}</p>
                </div>
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <Settings className="w-6 h-6 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">API Keys</p>
                  <p className="text-2xl font-bold text-white">{apiKeys.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Key className="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Prompt Templates</p>
                  <p className="text-2xl font-bold text-white">{promptTemplates.filter(t => t.isActive).length}</p>
                </div>
                <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white/10 border-white/20">
            <TabsTrigger value="providers" className="text-white data-[state=active]:bg-white/20">
              Providers
            </TabsTrigger>
            <TabsTrigger value="models" className="text-white data-[state=active]:bg-white/20">
              Models
            </TabsTrigger>
            <TabsTrigger value="api-keys" className="text-white data-[state=active]:bg-white/20">
              API Keys
            </TabsTrigger>
            <TabsTrigger value="prompts" className="text-white data-[state=active]:bg-white/20">
              Prompt Templates
            </TabsTrigger>
            <TabsTrigger value="usage" className="text-white data-[state=active]:bg-white/20">
              Usage Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="providers" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">AI Providers</h2>
              <Button 
                onClick={handleAddProvider}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Provider
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {providers.map((provider) => (
                <Card key={provider.id} className="bg-white/5 border-white/10">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-white">{provider.displayName}</CardTitle>
                        <CardDescription className="text-gray-300">
                          {provider.name} • {provider.modelCount} models
                        </CardDescription>
                      </div>
                      <Badge 
                        variant={provider.isActive ? "default" : "secondary"}
                        className={provider.isActive ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"}
                      >
                        {provider.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm text-gray-300">
                      <p><strong>Base URL:</strong> {provider.baseUrl}</p>
                    </div>
                    <div className="flex space-x-2 mt-4">
                      <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                        <TestTube className="w-3 h-3 mr-1" />
                        Test
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="models" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">AI Models</h2>
              <Button 
                onClick={handleAddModel}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Model
              </Button>
            </div>
            
            <div className="space-y-4">
              {models.map((model) => (
                <Card key={model.id} className="bg-white/5 border-white/10">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-white font-medium">{model.displayName}</h3>
                          <Badge 
                            variant={model.isActive ? "default" : "secondary"}
                            className={model.isActive ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"}
                          >
                            {model.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm text-gray-300">
                          <div>
                            <span className="font-medium">Model:</span> {model.name}
                          </div>
                          <div>
                            <span className="font-medium">Max Tokens:</span> {model.maxTokens.toLocaleString()}
                          </div>
                          <div>
                            <span className="font-medium">Cost:</span> ${(model.costPer1kTokens / 100).toFixed(3)}/1k tokens
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="ghost" className="text-white hover:bg-white/10">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-white hover:bg-white/10">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="api-keys" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">API Keys</h2>
              <Button 
                onClick={handleAddApiKey}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add API Key
              </Button>
            </div>
            
            <div className="space-y-4">
              {apiKeys.map((apiKey) => (
                <Card key={apiKey.id} className="bg-white/5 border-white/10">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-white font-medium">{apiKey.keyName}</h3>
                          <Badge variant="secondary" className="bg-blue-500/20 text-blue-400">
                            {apiKey.provider}
                          </Badge>
                          {apiKey.isDefault && (
                            <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                              Default
                            </Badge>
                          )}
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm text-gray-300">
                          <div>
                            <span className="font-medium">Usage:</span> {apiKey.usageCount.toLocaleString()} calls
                          </div>
                          <div>
                            <span className="font-medium">Last Used:</span> {apiKey.lastUsedAt}
                          </div>
                          <div>
                            <span className="font-medium">Created:</span> {apiKey.createdAt}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="text-white hover:bg-white/10"
                          onClick={() => setShowApiKey(showApiKey === apiKey.id ? null : apiKey.id)}
                        >
                          {showApiKey === apiKey.id ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                        <Button size="sm" variant="ghost" className="text-white hover:bg-white/10">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-white hover:bg-white/10">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    {showApiKey === apiKey.id && (
                      <div className="mt-4 p-3 bg-black/20 rounded-lg">
                        <p className="text-xs text-gray-400 mb-1">API Key (encrypted in database):</p>
                        <p className="text-sm text-white font-mono">sk-...{apiKey.id.slice(-8)}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="prompts" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Prompt Templates</h2>
              <Button 
                onClick={handleAddPromptTemplate}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Template
              </Button>
            </div>
            
            <div className="space-y-4">
              {promptTemplates.map((template) => (
                <Card key={template.id} className="bg-white/5 border-white/10">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-white font-medium">{template.name}</h3>
                          <Badge variant="secondary" className="bg-purple-500/20 text-purple-400">
                            {template.phase}
                          </Badge>
                          {template.isDefault && (
                            <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                              Default
                            </Badge>
                          )}
                          <Badge 
                            variant={template.isActive ? "default" : "secondary"}
                            className={template.isActive ? "bg-blue-500/20 text-blue-400" : "bg-gray-500/20 text-gray-400"}
                          >
                            {template.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-300">
                          <div>
                            <span className="font-medium">Feature Type:</span> {template.featureType}
                          </div>
                          <div>
                            <span className="font-medium">Created:</span> {template.createdAt}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="ghost" className="text-white hover:bg-white/10">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-white hover:bg-white/10">
                          <TestTube className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-white hover:bg-white/10">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="usage" className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Usage Analytics</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-white/5 border-white/10">
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-gray-300 text-sm">Total API Calls</p>
                    <p className="text-3xl font-bold text-white">12,450</p>
                    <p className="text-green-400 text-sm">+15% this month</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/5 border-white/10">
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-gray-300 text-sm">Tokens Used</p>
                    <p className="text-3xl font-bold text-white">2.1M</p>
                    <p className="text-blue-400 text-sm">+8% this month</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/5 border-white/10">
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-gray-300 text-sm">Total Cost</p>
                    <p className="text-3xl font-bold text-white">$342</p>
                    <p className="text-orange-400 text-sm">+12% this month</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/5 border-white/10">
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-gray-300 text-sm">Avg Response Time</p>
                    <p className="text-3xl font-bold text-white">1.2s</p>
                    <p className="text-green-400 text-sm">-5% this month</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Usage by Provider</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white">OpenAI</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-700 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                      </div>
                      <span className="text-gray-300 text-sm">65%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white">Anthropic</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-700 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                      </div>
                      <span className="text-gray-300 text-sm">30%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white">Google AI</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-700 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '5%' }}></div>
                      </div>
                      <span className="text-gray-300 text-sm">5%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}