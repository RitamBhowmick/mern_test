import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {

  const header = req.header('Authorization');

  if (!header) 
    return res.status(401).json({ message: 'No token provided' });

  const token = header.split(' ')[1];

  if (!token) 
    return res.status(401).json({ message: 'Invalid token format' });

  try { 

    const decoded = jwt.verify(token, process.env.JWT_SECRET); req.userId = decoded.id; next(); 

  } catch (e) { 

    return res.status(401).json({ message: 'Token invalid or expired' }); 
    
  }
};