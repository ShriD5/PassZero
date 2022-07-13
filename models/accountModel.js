import { Schema } from "mongoose";
import "mongoose-field-encryption";
const AccountSchema = new Schema({
  fid: {
    type: String,
    unique: true,
    index: true,
    required: true,
  },
  name: String,
  password: {
    type: String,
    trim: true,
  },
  domain: String,
  username: String,
  MasterPassword: {
    type: String,
    trim: true,
  },
});

AccountSchema.plugin(mongooseFieldEncryption, {
  fields: ["password"],
  secret: ["MasterPassword"],
});

const modelName = "Account";
const modelAccount = (conn) => {
  return conn.models[modelName] || conn.model(modelName, AccountSchema);
};

export default modelAccount;
