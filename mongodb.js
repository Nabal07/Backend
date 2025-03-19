import mongoose from "mongoose";

const MONGO_DB_URL = 'mongodb+srv://usuario:euCLpvRNKNSsK7iS@cluster0.52cvz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

export function connectMongoDb() {
    mongoose.connect(MONGO_DB_URL);
}