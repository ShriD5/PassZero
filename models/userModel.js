import { Schema } from "mongoose";
// const bcrypt = require("bcrypt");

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

// UserSchema.pre("save", function (next) {
//   const user = this;

//   if (this.isModified("masterPassword") && user.masterPassword) {
//     bcrypt.genSalt(8, function (saltError, salt) {
//       if (saltError) {
//         return next(saltError);
//       } else {
//         bcrypt.hash(user.masterPassword, salt, function (hashError, hash) {
//           if (hashError) {
//             return next(hashError);
//           }

//           user.masterPassword = hash;
//           next();
//         });
//       }
//     });
//   } else {
//     return next();
//   }
// });
const SALT_WORK_FACTOR = 10;

UserSchema.pre("save", async function save(next) {
  if (!this.isModified("masterPassword")) return next();
  try {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.masterPassword = await bcrypt.hash(this.masterPassword, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

const modelName = "User";
const modelUser = (conn) => {
  return conn.models[modelName] || conn.model(modelName, UserSchema);
};

export default modelUser;
