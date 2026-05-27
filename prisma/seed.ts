import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const SYSTEM_ITEM_TYPES = [
  { name: "Snippet", icon: "code-2", color: "#6366f1" },
  { name: "Prompt", icon: "sparkles", color: "#a855f7" },
  { name: "Note", icon: "file-text", color: "#f59e0b" },
  { name: "Command", icon: "terminal", color: "#10b981" },
  { name: "File", icon: "file", color: "#3b82f6" },
  { name: "Image", icon: "image", color: "#ec4899" },
  { name: "URL", icon: "link", color: "#14b8a6" },
];

async function main() {
  console.log("Seeding system item types...");

  for (const type of SYSTEM_ITEM_TYPES) {
    await prisma.itemType.upsert({
      where: { id: `system-${type.name.toLowerCase()}` },
      update: { icon: type.icon, color: type.color },
      create: {
        id: `system-${type.name.toLowerCase()}`,
        name: type.name,
        icon: type.icon,
        color: type.color,
        isSystem: true,
        userId: null,
      },
    });
    console.log(`  ✓ ${type.name}`);
  }

  console.log("Done.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
