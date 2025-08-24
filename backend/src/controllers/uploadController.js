import multer from 'multer';
import { parse } from 'csv-parse/sync';
import xlsx from 'xlsx';
import Agent from '../models/Agent.js';
import Task from '../models/Task.js';
import { distribute } from '../utils/distribute.js';

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {

  const allowed = ['text/csv','application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];

  const ok = allowed.includes(file.mimetype) || ['.csv','.xls','.xlsx'].some(ext => file.originalname.toLowerCase().endsWith(ext));

  if (!ok) 
    return cb(new Error('Only csv, xls, xlsx files are allowed')); 
  cb(null,true);
};

export const upload = multer({ storage, fileFilter }).single('file');

const normalize = (rows) => rows.map(r=>{ const o={}; 
for(const k in r) o[k.trim().toLowerCase()] = r[k];
  return { 

    firstName:String(o.firstname||o.first_name||o['first name']||'')
    .trim(), phone:Number(String(o.phone||'')
    .replace(/[^0-9]/g,'')), 
  notes:String(o.notes||'')
  .trim() 
};
})
.filter(x=>x.firstName && x.phone);

export const handleUpload = async (req,res,next)=>{

  try{

    if(!req.file) 
      return res.status(400).json({message:'File is required'});

    let rows=[]; const name=req.file.originalname.toLowerCase();

    if(name.endsWith('.csv')) { 
      const raw=req.file.buffer.toString('utf-8'); 
      rows=parse(raw,{columns:true,skip_empty_lines:true}); 
    }
    else if(name.endsWith('.xlsx') || name.endsWith('.xls')) { 

      const wb=xlsx.read(req.file.buffer,{type:'buffer'}); 
      const ws=wb.Sheets[wb.SheetNames[0]]; 
      rows=xlsx.utils.sheet_to_json(ws); 

    } else {
      return res.status(400).json({message:'Unsupported file type'});
    }

    const tasks = normalize(rows); 
    if(!tasks.length) 
      return res.status(400).json({message:'No valid rows found'});

    const agents = await Agent.find().sort({createdAt:1}).limit(5); 

    if(agents.length<5) 
      return res.status(400).json({message:'Need at least 5 agents to distribute'});

    const assigned = distribute(tasks, agents.slice(0,5)); const created = await Task.insertMany(assigned);
    res.json({ inserted: created.length, sample: created.slice(0,5) });

  } catch(err){ 
    next(err); 
  }
};

export const listTasksByAgent = async (req,res,next)=>{

  try{

    const agents = await Agent.find().sort({createdAt:1});
    const tasks = await Task.find().populate('assignedTo','name email');
    const grouped = agents.map(a=>({ agent:{ id:a._id, name:a.name, email:a.email }, 
      tasks: tasks.filter(t=> String(t.assignedTo?._id)===String(a._id)) }));
    res.json(grouped);
    
  } catch(err){ 
    next(err); 
  }
};