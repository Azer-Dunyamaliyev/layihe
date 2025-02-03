import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URL)
        console.log('Data-Base qaldirildi', connection.connection.host);
        
    } catch (error) {
        console.log('Data-Base error',connection.connection.host);
    }
}

export default connectDB
















// MONGO_USERNAME = naviboy687@andinews.com
// MONGO_PASSWORD = naviboy555
// MONGODB_USERNAME = naviboy687
// MONGODB_PASSWORD = iNcRhkMwJeTQrqZH
// MONGO_URL = mongodb+srv://naviboy687:iNcRhkMwJeTQrqZH@cluster0.fujyd.mongodb.net/