import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title:String,
    content:String,
    authorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
});

const taskModel = mongoose.model('Task',taskSchema);

export default taskModel;