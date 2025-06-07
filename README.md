# VudAra - AI-Powered App Development Platform

VudAra is an AI-powered platform that guides users through every phase of app development, from initial ideation to deployment, using no-code/low-code platforms.

## Features

- **7-Phase Development Journey**: Ideation, Planning, Design, MVP, Development, Testing, Deployment
- **AI Mentor**: Conversational AI guide for each development phase
- **Project Management**: Track progress, manage artifacts, and handle issues
- **Team Collaboration**: Multi-user projects with role-based access
- **Database Integration**: Powered by Neon PostgreSQL with Drizzle ORM

## Tech Stack

- **Frontend**: Next.js 13, React, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui, Radix UI, Lucide React
- **Database**: Neon PostgreSQL
- **ORM**: Drizzle ORM
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Neon database account

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd vudara
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Update `.env.local` with your Neon database URL:
```env
DATABASE_URL="postgresql://username:password@ep-example-123456.us-east-1.aws.neon.tech/neondb?sslmode=require"
```

5. Generate and run database migrations:
```bash
npm run db:generate
npm run db:migrate
```

6. Start the development server:
```bash
npm run dev
```

7. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Commands

- `npm run db:generate` - Generate migration files
- `npm run db:migrate` - Apply migrations to database
- `npm run db:studio` - Open Drizzle Studio for database management

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── dashboard/         # Dashboard pages
│   ├── ai-mentor/         # AI mentor chat interface
│   ├── project/           # Project management pages
│   └── ...
├── components/            # Reusable UI components
│   └── ui/               # shadcn/ui components
├── lib/                  # Utility functions and configurations
│   ├── db.ts             # Database connection
│   ├── schema.ts         # Database schema
│   └── db-utils.ts       # Database utility functions
├── drizzle/              # Database migrations
└── ...
```

## Development Phases

1. **Ideation & Brainstorming** - AI helps clarify and validate app ideas
2. **Planning & Requirements** - Generate PRDs and user stories
3. **Design Guidance** - UX flows and UI best practices
4. **MVP Definition** - Finalize minimum viable product scope
5. **Development Guidance** - No-code/low-code platform recommendations
6. **Testing & Quality** - Generate test cases and validation guides
7. **Deployment & Growth** - Launch preparation and iteration planning

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License.