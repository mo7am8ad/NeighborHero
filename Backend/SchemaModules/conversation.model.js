import mongoose, { Types } from 'mongoose';
const { Schema } = mongoose;

const ConversationSchema = new Schema({
  id:{
    type: String,
    reqired: true,
    unique: true,
  },
  sellerId:{
    type: String,
    reqired: true,
  },
  buyerId:{
    type: String,
    reqired:true,
  },
  readBySeller:{
    type: Boolean,
    reqired: true,
  },
  readByBuyer:{
    type: Boolean,
    reqired: true,
  },
  lastMessage:{
    type: String,
    reqired:false,
  },
},{
    timestamps:true
});

export default mongoose.model("Conversation",ConversationSchema);