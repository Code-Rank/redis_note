import mongoose from "mongoose";

const connect = async () => {
  try {
    const result = await mongoose.connect("mongodb://localhost:27017/NoteDB");
    console.log("Connect to ", result.connections[0].host);
  } catch (error) {
    console.log("error", error);
  }
};

export default connect;
