import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Lightbulb, FileText, Palette, Rocket, Code, TestTube, Upload, Users, Shield, BarChart3, Brain, Sparkles } from 'lucide-react';
import Link from 'next/link';

const phases = [
  {
    icon: Lightbulb,
    title: "Ideation & Brainstorming",
    description: "AI helps clarify and validate your app idea",
    features: ["AI Idea Clarifier", "Value Proposition Crafter", "Target Audience Definer"],
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: FileText,
    title: "Planning & Requirements",
    description: "Generate structured PRDs and user stories",
    features: ["PRD Generator", "User Story Suggester", "Feature Prioritization"],
    color: "from-blue-500 to-purple-500"
  },
  {
    icon: Palette,
    title: "Design Guidance",
    description: "UX flows and UI best practices",
    features: ["UX Flow Outliner", "UI Best Practices", "Wireframe Suggester"],
    color: "from-green-500 to-blue-500"
  },
  {
    icon: Rocket,
    title: "MVP Definition",
    description: "Finalize your minimum viable product scope",
    features: ["MVP Scope Finalizer", "Feature Validation", "Success Metrics"],
    color: "from-orange-500 to-red-500"
  },
  {
    icon: Code,
    title: "Development Guidance",
    description: "No-code/low-code platform recommendations",
    features: ["Platform Recommender", "Prompt Generator", "How-To Guides"],
    color: "from-teal-500 to-green-500"
  },
  {
    icon: TestTube,
    title: "Testing & Quality",
    description: "Generate test cases and usability guides",
    features: ["Test Case Generator", "Usability Testing", "Quality Checklists"],
    color: "from-purple-500 to-blue-500"
  },
  {
    icon: Upload,
    title: "Deployment & Growth",
    description: "Launch preparation and iteration planning",
    features: ["Deployment Checklist", "Feedback Planning", "Growth Strategy"],
    color: "from-pink-500 to-purple-500"
  }
];

const features = [
  {
    icon: Brain,
    title: "AI Mentor",
    description: "Conversational AI guide through every step of your development journey"
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Multi-user projects with role-based access and admin dashboards"
  },
  {
    icon: Shield,
    title: "Bring Your Own Key",
    description: "Use your own AI model API keys for enhanced privacy and control"
  },
  {
    icon: BarChart3,
    title: "Project Analytics",
    description: "Track progress, monitor usage, and optimize your development process"
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                VudAra
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="ghost" className="text-white hover:bg-white/10">
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-500/20 text-purple-300 text-sm font-medium mb-6 border border-purple-500/30">
            <Sparkles className="w-4 h-4 mr-2" />
            AI-Powered Development Platform
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Transform Ideas Into
            <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Apps with AI
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            VudAra guides you through every phase of app development with AI mentorship, 
            from initial ideation to deployment, using no-code/low-code platforms.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/register">
              <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-lg px-8 py-3">
                Start Building
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/demo">
              <Button 
                size="lg" 
                variant="outline" 
                className="group relative border-2 border-purple-400/50 bg-white/5 text-white hover:border-purple-300 hover:bg-purple-500/10 text-lg px-8 py-3 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
              >
                <span className="group-hover:text-purple-200 transition-colors duration-300">Watch Demo</span>
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Development Phases */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Complete Development Journey
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Follow our AI-guided 7-phase process to turn your idea into a production-ready application
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {phases.map((phase, index) => (
              <Card key={index} className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 group">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${phase.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <phase.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-white text-lg">
                    Phase {index + 1}: {phase.title}
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    {phase.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {phase.features.map((feature, featureIndex) => (
                      <Badge key={featureIndex} variant="secondary" className="bg-white/10 text-gray-300 border-white/20">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Platform Features
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Everything you need to build, test, and deploy your application with confidence
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Build Your App?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of creators who are building amazing applications with AI guidance
          </p>
          <Link href="/register">
            <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-lg px-12 py-4">
              Start Your Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/20 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                VudAra
              </span>
            </div>
            <div className="text-gray-400 text-sm">
              © 2024 VudAra. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}