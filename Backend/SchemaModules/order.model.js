import mongoose, { Types } from 'mongoose';
const { Schema } = mongoose;

const OrderSchema = new Schema({
  gigId:{
    type: Number,
    reqired:true,
  },
  img:{
    type: String,
    reqired:false,
  },
  title:{
    type: String,
    reqired:true,
  },
  price:{
    type: String,
    reqired:true,
  },
  sellerId:{
    type: String,
    reqired:true,
  },
  buyerId:{
    type: String,
    reqired:true,
  },
  isCompleted:{
    type: Boolean,
    default: false,
  },
  payment_intent:{
    type: String,
    reqired:true,
  },
},{
    timestamps:true
});

export default mongoose.model("Order",OrderSchema);