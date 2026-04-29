import type { VercelRequest, VercelResponse } from '@vercel/node';
import { db } from '../../src/db/index.js';
import { users } from '../../src/db/schema.js';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  role: z.enum(['admin', 'presenter', 'reviewer', 'viewer']).optional().default('viewer'),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Validation failed', details: parsed.error.issues });
    }

    const { email, password, role } = parsed.data;

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Insert user
    const [newUser] = await db.insert(users).values({
      email,
      passwordHash,
      role,
    }).returning({
      id: users.id,
      email: users.email,
      role: users.role,
    });

    return res.status(201).json({
      message: 'User registered successfully',
      user: newUser,
    });
  } catch (error: any) {
    console.error('Registration Error:', error);
    if (error.code === '23505') { // Postgres unique violation code
      return res.status(409).json({ error: 'Email already exists' });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
}
