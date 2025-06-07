'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { AuthGuard } from '@/components/auth-guard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, 
  Lightbulb, 
  FileText, 
  Palette, 
  Rocket, 
  Code, 
  TestTube, 
  Upload,
  MessageCircle,
  Settings,
  BarChart3,
  Users,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const mockProjects = [
  {
    id: 1,
    name: "EcoTracker Mobile App",
    description: "Personal carbon footprint tracking application",
    phase: "Planning & Requirements",
    progress: 35,
    status: "active",
    lastActivity: "2 hours ago",
    phaseNumber: 2
  },
  {
    id: 2,
    name: "Local Business Directory",
    description: "Community-focused business discovery platform",
    phase: "Design Guidance",
    progress: 65,
    status: "active",
    lastActivity: "1 day ago",
    phaseNumber: 3
  },
  {
    id: 3,
    name: "Fitness Goal Tracker",
    description: "Social fitness tracking and motivation app",
    phase: "MVP Definition",
    progress: 80,
    status: "completed",
    lastActivity: "3 days ago",
    phaseNumber: 4
  }
];

const phases = [
  { icon: Lightbulb, name: "Ideation", color: "purple" },
  { icon: FileText, name: "Planning", color: "blue" },
  { icon: Palette, name: "Design", color: "green" },
  { icon: Rocket, name: "MVP", color: "orange" },
  { icon: Code, name: "Development", color: "teal" },
  { icon: TestTube, name: "Testing", color: "purple" },
  { icon: Upload, name: "Deployment", color: "pink" }
];

const recentActivities = [
  {
    id: 1,
    type: "ai_suggestion",
    message: "AI suggested 3 new user stories for EcoTracker",
    time: "2 hours ago",
    project: "EcoTracker Mobile App"
  },
  {
    id: 2,
    type: "phase_complete",
    message: "Completed Ideation phase for Local Business Directory",
    time: "1 day ago",
    project: "Local Business Directory"
  },
  {
    id: 3,
    type: "milestone",
    message: "MVP scope finalized for Fitness Goal Tracker",
    time: "3 days ago",
    project: "Fitness Goal Tracker"
  }
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("projects");
  const { user, logout } = useAuth();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500";
      case "completed": return "bg-blue-500";
      case "paused": return "bg-yellow-500";
      default: return "bg-gray-500";
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "ai_suggestion": return MessageCircle;
      case "phase_complete": return CheckCircle;
      case "milestone": return AlertCircle;
      default: return Clock;
    }
  };

  return (
    <AuthGuard>
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-6">
              <div>
                <h1 className="text-2xl font-bold text-white">Dashboard</h1>
                {user && (
                  <p className="text-gray-300 text-sm">Welcome back, {user.firstName}!</p>
                )}
              </div>
              <div className="hidden md:flex space-x-4">
                <Button variant="ghost" className="text-white hover:bg-white/10">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  AI Mentor
                </Button>
                <Button variant="ghost" className="text-white hover:bg-white/10">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Analytics
                </Button>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-white hover:bg-white/10">
                <Users className="w-4 h-4 mr-2" />
                Team
              </Button>
              <Button 
                variant="ghost" 
                className="text-white hover:bg-white/10"
                onClick={logout}
              >
                <Settings className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Active Projects</p>
                  <p className="text-2xl font-bold text-white">3</p>
                </div>
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Rocket className="w-6 h-6 text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Avg. Progress</p>
                  <p className="text-2xl font-bold text-white">60%</p>
                </div>
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">AI Interactions</p>
                  <p className="text-2xl font-bold text-white">127</p>
                </div>
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Team Members</p>
                  <p className="text-2xl font-bold text-white">4</p>
                </div>
                <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white/10 border-white/20">
            <TabsTrigger value="projects" className="text-white data-[state=active]:bg-white/20">
              Projects
            </TabsTrigger>
            <TabsTrigger value="activity" className="text-white data-[state=active]:bg-white/20">
              Recent Activity
            </TabsTrigger>
            <TabsTrigger value="templates" className="text-white data-[state=active]:bg-white/20">
              Templates
            </TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Your Projects</h2>
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                <Plus className="w-4 h-4 mr-2" />
                New Project
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {mockProjects.map((project) => (
                <Card key={project.id} className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 group cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-white text-lg group-hover:text-purple-400 transition-colors">
                          {project.name}
                        </CardTitle>
                        <CardDescription className="text-gray-300">
                          {project.description}
                        </CardDescription>
                      </div>
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(project.status)}`} />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-300">Phase {project.phaseNumber}</span>
                        <span className="text-sm text-gray-300">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="bg-white/10 text-gray-300">
                        {project.phase}
                      </Badge>
                      <span className="text-xs text-gray-400">{project.lastActivity}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Recent Activity</h2>
            
            <div className="space-y-4">
              {recentActivities.map((activity) => {
                const Icon = getActivityIcon(activity.type);
                return (
                  <Card key={activity.id} className="bg-white/5 border-white/10">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-purple-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-white">{activity.message}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-sm text-gray-400">{activity.project}</span>
                            <span className="text-xs text-gray-500">{activity.time}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Project Templates</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {phases.map((phase, index) => (
                <Card key={index} className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 group cursor-pointer">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <phase.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-white">{phase.name} Template</CardTitle>
                    <CardDescription className="text-gray-300">
                      Start a new project with pre-configured {phase.name.toLowerCase()} phase setup
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                      Use Template
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
    </AuthGuard>
  );
}