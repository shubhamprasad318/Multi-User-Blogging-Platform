import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { config } from 'dotenv';

// Load environment variables from .env.local
config({ path: '.env.local' });

// Ensure DATABASE_URL is loaded
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set. Check your .env.local file.');
}

const connectionString = process.env.DATABASE_URL;

// Create postgres client
const client = postgres(connectionString);

// Create drizzle instance
export const db = drizzle(client, { schema });
