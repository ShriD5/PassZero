import mongoose from 'mongoose';
let conn = null;
const connectDB = async () => {
  if (conn == null) {
    // Use new db connection
    // eslint-disable-next-line no-undef
    conn = mongoose
      .connect(process.env.MONGO_URI, {
        useUnifiedTopology: true,
        bufferCommands: false, // Disable mongoose buffering
        serverSelectionTimeoutMS: 8000,
      })
      .then(() => mongoose);
    conn.mode;
    await conn;
  }
  return conn;
};

export default connectDB;
