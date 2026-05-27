import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

// ── System Item Types ─────────────────────────────────────────────────────────

const SYSTEM_ITEM_TYPES = [
  { id: "system-snippet", name: "Snippet", icon: "Code", color: "#3b82f6" },
  { id: "system-prompt", name: "Prompt", icon: "Sparkles", color: "#8b5cf6" },
  { id: "system-command", name: "Command", icon: "Terminal", color: "#f97316" },
  { id: "system-note", name: "Note", icon: "StickyNote", color: "#fde047" },
  { id: "system-file", name: "File", icon: "File", color: "#6b7280" },
  { id: "system-image", name: "Image", icon: "Image", color: "#ec4899" },
  { id: "system-link", name: "Link", icon: "Link", color: "#10b981" },
];

// ── Collections & Items ───────────────────────────────────────────────────────

const COLLECTIONS = [
  {
    name: "React Patterns",
    description: "Reusable React patterns and hooks",
    items: [
      {
        typeId: "system-snippet",
        title: "useDebounce & useLocalStorage Hooks",
        contentType: "text",
        language: "typescript",
        content: `import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    setStoredValue(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  return [storedValue, setValue] as const;
}`,
        description: "Commonly used custom hooks for debouncing values and persisting state to localStorage.",
      },
      {
        typeId: "system-snippet",
        title: "Context Provider Pattern",
        contentType: "text",
        language: "typescript",
        content: `import { createContext, useContext, useState, ReactNode } from 'react';

interface ThemeContextValue {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}`,
        description: "Type-safe React context provider with a custom hook — the standard pattern for shared state.",
      },
      {
        typeId: "system-snippet",
        title: "Compound Component Pattern",
        contentType: "text",
        language: "typescript",
        content: `import { createContext, useContext, ReactNode } from 'react';

interface CardContextValue { variant: 'default' | 'outlined' }
const CardContext = createContext<CardContextValue>({ variant: 'default' });

function Card({ variant = 'default', children }: { variant?: 'default' | 'outlined'; children: ReactNode }) {
  return (
    <CardContext.Provider value={{ variant }}>
      <div className={\`rounded-lg p-4 \${variant === 'outlined' ? 'border' : 'bg-zinc-900'}\`}>
        {children}
      </div>
    </CardContext.Provider>
  );
}

Card.Header = function CardHeader({ children }: { children: ReactNode }) {
  const { variant } = useContext(CardContext);
  return <div className={\`font-semibold mb-2 \${variant === 'outlined' ? 'text-zinc-200' : 'text-white'}\`}>{children}</div>;
};

Card.Body = function CardBody({ children }: { children: ReactNode }) {
  return <div className="text-zinc-400 text-sm">{children}</div>;
};

export default Card;`,
        description: "Compound component pattern that shares implicit state between parent and child sub-components.",
      },
    ],
  },
  {
    name: "AI Workflows",
    description: "AI prompts and workflow automations",
    items: [
      {
        typeId: "system-prompt",
        title: "Code Review Prompt",
        contentType: "text",
        language: null,
        content: `You are a senior software engineer performing a code review. Review the following code for:

1. **Correctness** — logic errors, edge cases, off-by-one errors
2. **Security** — injection vulnerabilities, improper auth checks, exposed secrets
3. **Performance** — unnecessary re-renders, N+1 queries, missing indexes
4. **Readability** — naming clarity, function length, unnecessary complexity
5. **Patterns** — does it match the existing codebase conventions?

For each issue found, provide:
- Severity: critical / warning / suggestion
- Location: file and line number if known
- Explanation: why it's a problem
- Fix: concrete code example

Be direct and specific. Skip praise unless something is genuinely non-obvious.

\`\`\`
[PASTE CODE HERE]
\`\`\``,
        description: "Structured prompt for thorough, actionable code reviews across correctness, security, performance, and style.",
      },
      {
        typeId: "system-prompt",
        title: "Documentation Generation Prompt",
        contentType: "text",
        language: null,
        content: `Generate concise developer documentation for the following code.

Requirements:
- One-line summary of what it does
- Parameters/props table with name, type, required, and description columns
- Return value description
- One practical usage example
- Note any non-obvious behavior or gotchas

Output in Markdown. Do not repeat what the function name already communicates. Keep it tight.

\`\`\`
[PASTE CODE HERE]
\`\`\``,
        description: "Generates tight, developer-focused docs — summary, props table, return value, example, and gotchas.",
      },
      {
        typeId: "system-prompt",
        title: "Refactoring Assistant Prompt",
        contentType: "text",
        language: null,
        content: `Refactor the following code with these goals:
1. Reduce complexity without changing behavior
2. Improve naming for clarity
3. Extract repeated logic into well-named helpers
4. Remove unnecessary abstractions or indirection
5. Keep it idiomatic for the language/framework

Rules:
- Do NOT change public API signatures unless asked
- Do NOT add new features
- Do NOT add comments explaining what the code does
- Show the refactored code first, then a brief bullet list of what changed and why

\`\`\`
[PASTE CODE HERE]
\`\`\``,
        description: "Focused refactoring prompt that reduces complexity and improves clarity without changing behavior or adding features.",
      },
    ],
  },
  {
    name: "DevOps",
    description: "Infrastructure and deployment resources",
    items: [
      {
        typeId: "system-snippet",
        title: "GitHub Actions — Next.js CI",
        contentType: "text",
        language: "yaml",
        content: `name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run lint
      - run: npm run build
        env:
          DATABASE_URL: \${{ secrets.DATABASE_URL }}`,
        description: "Minimal GitHub Actions workflow that lints and builds a Next.js app on push and pull requests.",
      },
      {
        typeId: "system-command",
        title: "Deploy to Vercel (CLI)",
        contentType: "text",
        language: "bash",
        content: `# Install Vercel CLI
npm i -g vercel

# Link project (first time)
vercel link

# Deploy to preview
vercel

# Deploy to production
vercel --prod

# Set environment variable
vercel env add DATABASE_URL production`,
        description: "Vercel CLI commands for linking, deploying to preview/production, and managing environment variables.",
      },
      {
        typeId: "system-link",
        title: "Neon PostgreSQL Docs",
        contentType: "text",
        language: null,
        url: "https://neon.tech/docs/introduction",
        content: null,
        description: "Official Neon serverless PostgreSQL documentation — connection strings, branching, and scaling.",
      },
      {
        typeId: "system-link",
        title: "Vercel Deployment Docs",
        contentType: "text",
        language: null,
        url: "https://vercel.com/docs/deployments/overview",
        content: null,
        description: "Vercel deployment overview — build configuration, environment variables, and preview deployments.",
      },
    ],
  },
  {
    name: "Terminal Commands",
    description: "Useful shell commands for everyday development",
    items: [
      {
        typeId: "system-command",
        title: "Git — Useful Everyday Commands",
        contentType: "text",
        language: "bash",
        content: `# Undo last commit, keep changes staged
git reset --soft HEAD~1

# Stash including untracked files
git stash -u

# Rebase interactively (last 3 commits)
git rebase -i HEAD~3

# Delete all local branches already merged to main
git branch --merged main | grep -v main | xargs git branch -d

# Show commits not yet in remote
git log origin/main..HEAD --oneline`,
        description: "Git commands for undoing commits, stashing, rebasing, and cleaning up merged branches.",
      },
      {
        typeId: "system-command",
        title: "Docker — Common Commands",
        contentType: "text",
        language: "bash",
        content: `# Build image with tag
docker build -t myapp:latest .

# Run container with env file and port mapping
docker run --env-file .env -p 3000:3000 myapp:latest

# Remove all stopped containers and dangling images
docker system prune -f

# Shell into running container
docker exec -it <container_id> sh

# View logs (follow)
docker logs -f <container_id>`,
        description: "Essential Docker commands for building, running, cleaning up, and debugging containers.",
      },
      {
        typeId: "system-command",
        title: "Process Management",
        contentType: "text",
        language: "bash",
        content: `# Find process using a port
lsof -i :3000

# Kill process by port
kill -9 $(lsof -ti :3000)

# List all node processes
ps aux | grep node

# Monitor CPU/memory usage
top -o cpu

# Run process in background, keep after terminal close
nohup npm run start > app.log 2>&1 &`,
        description: "Commands for finding, killing, and monitoring processes — handy when a port is already in use.",
      },
      {
        typeId: "system-command",
        title: "Package Manager Utilities",
        contentType: "text",
        language: "bash",
        content: `# List outdated packages
npm outdated

# Upgrade all packages to latest (respects semver)
npx npm-check-updates -u && npm install

# Check for vulnerabilities
npm audit

# Clean install (delete node_modules + reinstall)
rm -rf node_modules package-lock.json && npm install

# List globally installed packages
npm list -g --depth=0`,
        description: "npm commands for auditing, updating, and cleaning up packages in a Node.js project.",
      },
    ],
  },
  {
    name: "Design Resources",
    description: "UI/UX resources and references",
    items: [
      {
        typeId: "system-link",
        title: "Tailwind CSS Docs",
        contentType: "text",
        language: null,
        url: "https://tailwindcss.com/docs",
        content: null,
        description: "Official Tailwind CSS documentation — utility classes, configuration, and v4 migration guide.",
      },
      {
        typeId: "system-link",
        title: "shadcn/ui Components",
        contentType: "text",
        language: null,
        url: "https://ui.shadcn.com/docs/components",
        content: null,
        description: "shadcn/ui component library — copy-paste accessible components built on Radix UI and Tailwind.",
      },
      {
        typeId: "system-link",
        title: "Radix UI Primitives",
        contentType: "text",
        language: null,
        url: "https://www.radix-ui.com/primitives/docs/overview/introduction",
        content: null,
        description: "Radix UI unstyled, accessible component primitives — the foundation under shadcn/ui.",
      },
      {
        typeId: "system-link",
        title: "Lucide Icons",
        contentType: "text",
        language: null,
        url: "https://lucide.dev/icons",
        content: null,
        description: "Lucide icon library — searchable reference for all icon names used throughout DevStash.",
      },
    ],
  },
];

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  // 1. System item types
  console.log("Seeding system item types...");
  for (const type of SYSTEM_ITEM_TYPES) {
    await prisma.itemType.upsert({
      where: { id: type.id },
      update: { name: type.name, icon: type.icon, color: type.color },
      create: { ...type, isSystem: true, userId: null },
    });
    console.log(`  ✓ ${type.name}`);
  }

  // 2. Demo user
  console.log("Seeding demo user...");
  const hashedPassword = await bcrypt.hash("12345678", 12);
  const user = await prisma.user.upsert({
    where: { email: "demo@devstash.io" },
    update: {},
    create: {
      email: "demo@devstash.io",
      name: "Demo User",
      password: hashedPassword,
      isPro: false,
      emailVerified: new Date(),
    },
  });
  console.log(`  ✓ ${user.email}`);

  // 3. Collections & items
  console.log("Seeding collections and items...");
  for (const col of COLLECTIONS) {
    const collection = await prisma.collection.upsert({
      where: {
        // upsert by userId + name via a raw find since there's no unique constraint
        // use a stable id pattern instead
        id: `demo-${col.name.toLowerCase().replace(/\s+/g, "-")}`,
      },
      update: { name: col.name, description: col.description },
      create: {
        id: `demo-${col.name.toLowerCase().replace(/\s+/g, "-")}`,
        name: col.name,
        description: col.description,
        userId: user.id,
      },
    });

    for (const item of col.items) {
      const itemId = `demo-${collection.id}-${item.title.toLowerCase().replace(/\W+/g, "-").slice(0, 40)}`;
      await prisma.item.upsert({
        where: { id: itemId },
        update: {},
        create: {
          id: itemId,
          title: item.title,
          contentType: item.contentType,
          content: item.content ?? null,
          url: ("url" in item ? item.url : null) ?? null,
          description: item.description,
          language: item.language ?? null,
          typeId: item.typeId,
          userId: user.id,
          collectionId: collection.id,
        },
      });
    }
    console.log(`  ✓ ${col.name} (${col.items.length} items)`);
  }

  console.log("Done.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
