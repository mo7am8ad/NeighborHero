import mongoose, { Types } from 'mongoose';
const { Schema } = mongoose;

const messageSchema = new Schema({
  conversationId:{
    type: String,
    reqired: true,
  },
  userId:{
    type: String,
    reqired: true,
  },
  desc:{
    type: String,
    reqired:true,
  },
},{
    timestamps:true
});

export default mongoose.model("Message",messageSchema);