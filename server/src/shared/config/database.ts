import "dotenv/config";
import mongoose from 'mongoose';
import { DB_NAME } from "../constant";


const URI = `${process.env.MONGO_URI}/${DB_NAME}`;

const connectDB = async (): Promise<void> => {
    try {
        const conn = await mongoose.connect(URI, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });
        console.log(
            `\n✅ MongoDB Connected Successfully at ${new Date().toLocaleString()}\n` +
            `   Host: ${conn.connection.host}\n` +
            `   Database: ${conn.connection.name}\n`
        );
    } catch (error: any) {
        console.error(
            `\n❌ Failed to Connect to MongoDB at ${new Date().toLocaleString()}\n` +
            `   Error: ${error.message}\n`
        );
        process.exit(1);
    }
}

export default connectDB;