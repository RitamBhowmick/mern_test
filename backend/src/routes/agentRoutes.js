import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import { createAgent, createAgentValidators, listAgents } from '../controllers/agentController.js';

const router = Router(); 

router.post('/', auth, createAgentValidators, createAgent); 
router.get('/', auth, listAgents); 

export default router;