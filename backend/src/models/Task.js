import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({ 
    firstName:{
        type:String,
        required:true
    }, 
    phone:{
        type:Number,
        required:true
    }, 
    notes:{
        type:String
    }, 
    assignedTo:{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref:'Agent', 
        required:true 
    } 
},
{ timestamps:true });

export default mongoose.model('Task', taskSchema);