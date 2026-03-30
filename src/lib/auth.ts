import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "../generated/prisma";
import { Pool } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { dash } from "@better-auth/infra";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaNeon(pool as any); 
const prisma = new PrismaClient({ adapter });

export const auth = betterAuth({
  baseURL: process.env.NODE_ENV === "development" ? "http://localhost:3000" : process.env.BETTER_AUTH_URL,
  trustedOrigins: ["http://localhost:3000", "https://aloraa.vercel.app"],
  
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  plugins: [
    dash()
  ]
});