'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Send, 
  Lightbulb, 
  FileText, 
  Palette, 
  Rocket, 
  Code, 
  TestTube, 
  Upload,
  MessageCircle,
  Sparkles,
  ArrowLeft,
  User,
  Bot
} from 'lucide-react';
import Link from 'next/link';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: string;
  phase?: string;
}

const phases = [
  { icon: Lightbulb, name: "Ideation", description: "Brainstorm and validate ideas" },
  { icon: FileText, name: "Planning", description: "Create PRDs and user stories" },
  { icon: Palette, name: "Design", description: "UX flows and UI guidance" },
  { icon: Rocket, name: "MVP", description: "Define scope and priorities" },
  { icon: Code, name: "Development", description: "No-code platform guidance" },
  { icon: TestTube, name: "Testing", description: "Test cases and validation" },
  { icon: Upload, name: "Deployment", description: "Launch and iteration" }
];

const quickPrompts = [
  "Help me validate my app idea",
  "Generate a PRD for my project",
  "Suggest UI best practices",
  "Create user stories",
  "Recommend a no-code platform",
  "Generate test cases"
];

export default function AIMentor() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hello! I'm your AI mentor, here to guide you through every phase of app development. What would you like to work on today?",
      timestamp: new Date().toLocaleTimeString(),
      phase: 'general'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activePhase, setActivePhase] = useState<string | null>(null);

  const handleSendMessage = async (message?: string) => {
    const messageText = message || inputValue.trim();
    if (!messageText) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: messageText,
      timestamp: new Date().toLocaleTimeString()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: generateAIResponse(messageText),
        timestamp: new Date().toLocaleTimeString(),
        phase: activePhase || 'general'
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const generateAIResponse = (userMessage: string): string => {
    // Simple response generation based on keywords
    const message = userMessage.toLowerCase();
    
    if (message.includes('idea') || message.includes('validate')) {
      return "Great! Let's validate your app idea. Can you tell me: 1) What problem does your app solve? 2) Who is your target audience? 3) What makes your solution unique? These questions will help us refine your concept.";
    } else if (message.includes('prd') || message.includes('requirements')) {
      return "I'll help you create a Product Requirements Document. Let's start with the basics: What's your app's main purpose? What are the core features users need? I'll guide you through creating user stories and prioritizing features for your MVP.";
    } else if (message.includes('design') || message.includes('ui')) {
      return "For UI/UX design, let's consider: 1) Your target users' needs and preferences, 2) Industry best practices for your app type, 3) Essential user flows. Would you like me to suggest wireframe elements or review design principles for your specific use case?";
    } else if (message.includes('no-code') || message.includes('platform')) {
      return "Based on your project requirements, I can recommend suitable no-code/low-code platforms. Popular options include Bubble for web apps, FlutterFlow for mobile, and Webflow for websites. What type of app are you building and what's your technical background?";
    } else {
      return "I understand you're looking for guidance. Could you provide more details about your project or specify which phase you'd like to focus on? I'm here to help with ideation, planning, design, development, testing, or deployment.";
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
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
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-white">AI Mentor</h1>
              </div>
            </div>
            <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
              Online
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-12rem)]">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Phase Selector */}
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-lg">Development Phases</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {phases.map((phase, index) => (
                  <button
                    key={index}
                    onClick={() => setActivePhase(phase.name)}
                    className={`w-full p-3 rounded-lg text-left transition-colors ${
                      activePhase === phase.name 
                        ? 'bg-purple-500/20 border border-purple-500/50' 
                        : 'bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <phase.icon className={`w-5 h-5 ${
                        activePhase === phase.name ? 'text-purple-400' : 'text-gray-400'
                      }`} />
                      <div>
                        <div className={`font-medium ${
                          activePhase === phase.name ? 'text-purple-400' : 'text-white'
                        }`}>
                          {phase.name}
                        </div>
                        <div className="text-xs text-gray-400">{phase.description}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Quick Prompts */}
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-lg">Quick Prompts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {quickPrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => handleSendMessage(prompt)}
                    className="w-full p-2 text-sm text-left text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3 flex flex-col">
            <Card className="bg-white/5 border-white/10 flex-1 flex flex-col">
              {/* Messages */}
              <ScrollArea className="flex-1 p-6">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex items-start space-x-3 ${
                        message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.type === 'user' 
                          ? 'bg-blue-500' 
                          : 'bg-gradient-to-r from-purple-500 to-pink-500'
                      }`}>
                        {message.type === 'user' ? (
                          <User className="w-4 h-4 text-white" />
                        ) : (
                          <Sparkles className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <div className={`flex-1 max-w-3xl ${
                        message.type === 'user' ? 'text-right' : ''
                      }`}>
                        <div className={`inline-block p-4 rounded-lg ${
                          message.type === 'user'
                            ? 'bg-blue-500 text-white'
                            : 'bg-white/10 text-white'
                        }`}>
                          <p className="whitespace-pre-wrap">{message.content}</p>
                        </div>
                        <div className="mt-1 text-xs text-gray-400">
                          {message.timestamp}
                          {message.phase && ` • ${message.phase}`}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isLoading && (
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-white/10 rounded-lg p-4">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Input Area */}
              <div className="border-t border-white/10 p-4">
                <div className="flex space-x-4">
                  <div className="flex-1 relative">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me anything about app development..."
                      className="bg-white/10 border-white/20 text-white placeholder-gray-400 pr-12"
                      disabled={isLoading}
                    />
                    <Button
                      onClick={() => handleSendMessage()}
                      disabled={!inputValue.trim() || isLoading}
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                {activePhase && (
                  <div className="mt-2 text-sm text-gray-400">
                    Currently focused on: <span className="text-purple-400">{activePhase}</span>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}