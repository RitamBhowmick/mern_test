export const distribute = (tasks, agents) => {

  const out = []; 
  const n = agents.length; 

  if (!n) return out;

  for (let i=0;i<tasks.length;i++){ 
    const idx = i % n; 
    out.push({ ...tasks[i], assignedTo: agents[idx]._id }); 
  }
  
  return out;
};