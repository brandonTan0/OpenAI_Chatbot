import { connect, disconnect } from "mongoose";
async function connectToDatabase() {
    try {
        await connect(process.env.MONGODB_URL);
    } catch(err) {
        console.log(err);
        throw new Error("There was an error in conencting to MongoDB");
    }
} 
async function disconnectFromDatabase() {
    try {
        await disconnect();
    } catch(err) {
        console.log(err);
        throw new Error("There was an error in disconnecting to MongoDB");
    }
}

export { connectToDatabase, disconnectFromDatabase };