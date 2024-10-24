import mongoose, { Types } from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password:{
    type:String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  isSeller: {
    type: Boolean,
    default: false,
  },
  phone: {
    type: String,
    required: false,
  },
  description:{
    type: String,
    required: false,
  },
  img: {
    type: String,
    required:false,
  }
},{
    timestamps:true
});

export default mongoose.model("User",userSchema);