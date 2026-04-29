import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

// This uses the pooled connection string from the environment variables
const sql = neon(process.env.DATABASE_URL!);

// Initialize Drizzle with the schema for type-safe queries
export const db = drizzle(sql, { schema });
