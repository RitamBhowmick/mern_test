import bcrypt from 'bcryptjs';
import User from '../models/User.js';

export default async function ensureAdmin(){

  const email = process.env.ADMIN_EMAIL || 'admin@example.com';
  const plain = process.env.ADMIN_PASSWORD || 'Admin@123';
  const existing = await User.findOne({ email });
  const hashed = await bcrypt.hash(plain, 10);

  if (existing) { 

    existing.password = hashed; 
    await existing.save(); 
    console.log('[Admin] updated', email); 

  } else { 

    await User.create({ email, password: hashed, role: 'admin' }); 
    console.log('[Admin] created', email); 
  }
}