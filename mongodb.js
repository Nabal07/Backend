import mongoose from "mongoose";

const MONGO_DB_URL = 'mongodb+srv://nabalzika:3cjWYFjMo2SIlySW@cluster0.imgt0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

export function connectMongoDb() {
    mongoose.connect(MONGO_DB_URL);
}