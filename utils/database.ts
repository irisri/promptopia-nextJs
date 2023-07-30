import mongoose, { ConnectOptions } from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("mongo is connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI || "", {
      dbName: "sharePrompt",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
    isConnected = true;
  } catch (error) {
    console.error(error);
  }
};
