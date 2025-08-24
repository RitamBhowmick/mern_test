import bcrypt from 'bcryptjs';
import { body, validationResult } from 'express-validator';
import Agent from '../models/Agent.js';

export const createAgentValidators = [
  body('name').trim().notEmpty(),
  body('email').isEmail(),
  body('mobile').matches(/^\+?[0-9]{7,15}$/).withMessage('Mobile with country code'),
  body('password').isLength({ min: 6 })
];

export const createAgent = async (req, res, next) => {

  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) 
      return res.status(400).json({ errors: errors.array() });

    const { name, email, mobile, password } = req.body;
    const exists = await Agent.findOne({ email });

    if (exists) 
      return res.status(409).json({ message: 'Agent already exists' });
    
    const hashed = await bcrypt.hash(password, 10);
    const agent = await Agent.create({ name, email, mobile, password: hashed });
    res.status(201).json(agent);

  } catch (err) { 
    next(err); 
  }
};

export const listAgents = async (req, res, next) => {

  try { 
    const agents = await Agent.find().sort({ createdAt: -1 }); res.json(agents); 
    
  } catch (err) { 
    next(err); 
  }
};