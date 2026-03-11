import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    // CLI commands like 'db push' need the Direct (non-pooled) connection
    url: process.env.DIRECT_URL,
  },
});
