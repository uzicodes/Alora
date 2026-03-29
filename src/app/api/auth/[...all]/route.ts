import { auth } from "@/lib/auth"; 
import { toNextJsHandler } from "better-auth/next-js";

// This automatically handles all GET and POST requests sent to /api/auth/*
export const { GET, POST } = toNextJsHandler(auth);