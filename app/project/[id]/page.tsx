'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft,
  MessageCircle,
  Settings,
  Share2,
  Download,
  FileText,
  Users,
  Clock,
  CheckCircle,
  AlertTriangle,
  Plus,
  Edit,
  Trash2
} from 'lucide-react';
import Link from 'next/link';

// Mock data for the project
const mockProject = {
  id: "1",
  name: "EcoTracker Mobile App",
  description: "Personal carbon footprint tracking application that helps users monitor and reduce their environmental impact through daily activity tracking and gamified challenges.",
  phase: "Planning & Requirements",
  phaseNumber: 2,
  progress: 35,
  status: "active",
  created: "2024-01-15",
  lastUpdated: "2024-01-20",
  team: [
    { id: 1, name: "Sarah Johnson", role: "Project Lead", avatar: "SJ" },
    { id: 2, name: "Mike Chen", role: "Developer", avatar: "MC" },
    { id: 3, name: "Lisa Park", role: "Designer", avatar: "LP" }
  ]
};

const phases = [
  { number: 1, name: "Ideation", completed: true },
  { number: 2, name: "Planning", completed: false, active: true },
  { number: 3, name: "Design", completed: false },
  { number: 4, name: "MVP", completed: false },
  { number: 5, name: "Development", completed: false },
  { number: 6, name: "Testing", completed: false },
  { number: 7, name: "Deployment", completed: false }
];

const artifacts = [
  {
    id: 1,
    type: "PRD",
    title: "Product Requirements Document",
    description: "Comprehensive requirements and specifications",
    phase: "Planning",
    lastModified: "2 hours ago",
    status: "draft"
  },
  {
    id: 2,
    type: "User Stories",
    title: "Core User Stories",
    description: "Essential user stories for MVP",
    phase: "Planning", 
    lastModified: "1 day ago",
    status: "complete"
  },
  {
    id: 3,
    type: "Value Proposition",
    title: "Value Proposition Canvas",
    description: "Validated value proposition and market fit",
    phase: "Ideation",
    lastModified: "3 days ago",
    status: "complete"
  }
];

const issues = [
  {
    id: 1,
    title: "Define data privacy requirements",
    description: "Need to clarify GDPR compliance for user data",
    priority: "high",
    status: "open",
    assignee: "Sarah Johnson",
    created: "2 days ago"
  },
  {
    id: 2,
    title: "Research carbon calculation APIs",
    description: "Find reliable APIs for carbon footprint calculations",
    priority: "medium",
    status: "in-progress",
    assignee: "Mike Chen",
    created: "1 day ago"
  },
  {
    id: 3,
    title: "User persona validation",
    description: "Validate target user personas with user interviews",
    priority: "low",
    status: "resolved",
    assignee: "Lisa Park",
    created: "5 days ago"
  }
];

export default function ProjectDetail({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("overview");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "complete": return "bg-green-500";
      case "draft": return "bg-yellow-500";
      case "in-progress": return "bg-blue-500";
      default: return "bg-gray-500";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-500/20 text-red-400 border-red-500/30";
      case "medium": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "low": return "bg-green-500/20 text-green-400 border-green-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
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
              <div>
                <h1 className="text-2xl font-bold text-white">{mockProject.name}</h1>
                <p className="text-gray-300">{mockProject.description}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="ghost" className="text-white hover:bg-white/10">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="ghost" className="text-white hover:bg-white/10">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button variant="ghost" className="text-white hover:bg-white/10">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Project Status Bar */}
        <Card className="bg-white/5 border-white/10 mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <Badge variant="secondary" className="bg-purple-500/20 text-purple-400">
                  Phase {mockProject.phaseNumber}: {mockProject.phase}
                </Badge>
                <Badge variant="secondary" className={`${getStatusColor(mockProject.status)} text-white`}>
                  {mockProject.status}
                </Badge>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-400">Overall Progress</div>
                <div className="text-lg font-semibold text-white">{mockProject.progress}%</div>
              </div>
            </div>
            <Progress value={mockProject.progress} className="h-2" />
            
            {/* Phase Progress */}
            <div className="mt-6">
              <div className="flex items-center space-x-2 overflow-x-auto">
                {phases.map((phase, index) => (
                  <div key={index} className="flex items-center space-x-2 flex-shrink-0">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      phase.completed 
                        ? 'bg-green-500 text-white' 
                        : phase.active 
                          ? 'bg-purple-500 text-white' 
                          : 'bg-gray-600 text-gray-300'
                    }`}>
                      {phase.completed ? <CheckCircle className="w-4 h-4" /> : phase.number}
                    </div>
                    <span className={`text-sm ${
                      phase.active ? 'text-purple-400' : phase.completed ? 'text-green-400' : 'text-gray-400'
                    }`}>
                      {phase.name}
                    </span>
                    {index < phases.length - 1 && (
                      <div className="w-8 h-0.5 bg-gray-600" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white/10 border-white/20">
            <TabsTrigger value="overview" className="text-white data-[state=active]:bg-white/20">
              Overview
            </TabsTrigger>
            <TabsTrigger value="artifacts" className="text-white data-[state=active]:bg-white/20">
              Artifacts
            </TabsTrigger>
            <TabsTrigger value="issues" className="text-white data-[state=active]:bg-white/20">
              Issues
            </TabsTrigger>
            <TabsTrigger value="team" className="text-white data-[state=active]:bg-white/20">
              Team
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Project Info */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">Project Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-400">Description</h4>
                      <p className="text-white mt-1">{mockProject.description}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-400">Created</h4>
                        <p className="text-white mt-1">{mockProject.created}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-400">Last Updated</h4>
                        <p className="text-white mt-1">{mockProject.lastUpdated}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/5 border-white/10">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white">AI Mentor Chat</CardTitle>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-white/20 text-white hover:bg-white/10"
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Chat with AI
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300">
                      Get AI-powered guidance for your current phase. Ask questions about requirements, 
                      user stories, or get suggestions for next steps.
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card className="bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Artifact
                    </Button>
                    <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Report Issue
                    </Button>
                    <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                      <FileText className="w-4 h-4 mr-2" />
                      Generate Report
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">Team Members</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {mockProject.team.map((member) => (
                      <div key={member.id} className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                          {member.avatar}
                        </div>
                        <div>
                          <div className="text-white text-sm font-medium">{member.name}</div>
                          <div className="text-gray-400 text-xs">{member.role}</div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="artifacts" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Project Artifacts</h2>
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                <Plus className="w-4 h-4 mr-2" />
                Create Artifact
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {artifacts.map((artifact) => (
                <Card key={artifact.id} className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 group cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-white text-lg group-hover:text-purple-400 transition-colors">
                          {artifact.title}
                        </CardTitle>
                        <CardDescription className="text-gray-300">
                          {artifact.description}
                        </CardDescription>
                      </div>
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(artifact.status)}`} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="bg-white/10 text-gray-300">
                        {artifact.phase}
                      </Badge>
                      <span className="text-xs text-gray-400">{artifact.lastModified}</span>
                    </div>
                    <div className="flex items-center space-x-2 mt-4">
                      <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                        <Download className="w-3 h-3 mr-1" />
                        Export
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="issues" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Issue Tracking</h2>
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                <Plus className="w-4 h-4 mr-2" />
                New Issue
              </Button>
            </div>
            
            <div className="space-y-4">
              {issues.map((issue) => (
                <Card key={issue.id} className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-white font-medium">{issue.title}</h3>
                          <Badge className={getPriorityColor(issue.priority)}>
                            {issue.priority}
                          </Badge>
                          <Badge variant="secondary" className="bg-white/10 text-gray-300">
                            {issue.status}
                          </Badge>
                        </div>
                        <p className="text-gray-300 text-sm mb-3">{issue.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-400">
                          <span>Assigned to: {issue.assignee}</span>
                          <span>Created: {issue.created}</span>
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

          <TabsContent value="team" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Team Management</h2>
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                <Plus className="w-4 h-4 mr-2" />
                Invite Member
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockProject.team.map((member) => (
                <Card key={member.id} className="bg-white/5 border-white/10">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                      {member.avatar}
                    </div>
                    <h3 className="text-white font-medium mb-1">{member.name}</h3>
                    <p className="text-gray-400 text-sm mb-4">{member.role}</p>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                        Message
                      </Button>
                      <Button size="sm" variant="ghost" className="text-white hover:bg-white/10">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}