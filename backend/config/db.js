// import mongoose from "mongoose";

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log(`Successfully connnected to mongoDB 👍`);
//     console.log("MongoDB connected to database:", connection.connection.name);
//   } catch (error) {
//     console.error(`ERROR: ${error.message}`);
//     process.exit(1);
//   }
// };

// export default connectDB;
import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected to database:", connection.connection.name);
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1); // Exit process with failure
    }
};

export default connectDB;
