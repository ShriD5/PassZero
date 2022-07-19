import { Schema } from "mongoose";

const UserSchema = new Schema({
  fid: {
    type: String,
    unique: true,
    index: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
  },
  name: String,
  masterPassword: { type: String, trim: true },
});

const modelName = "User";
const modelUser = (conn) => {
  return conn.models[modelName] || conn.model(modelName, UserSchema);
};

export default modelUser;
