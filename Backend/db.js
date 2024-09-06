import mongoose from "mongoose";

const connectDb = async () => {
    try {
        let connection = await mongoose.connect("mongodb+srv://prathameshsm0425:prathamesh123@cluster0.atbnfrf.mongodb.net/project?retryWrites=true&w=majority&appName=Cluster0");
        console.log("MongoDb Connected");
        
    } catch (error) {
        console.log("Error connecting Database", error);
        
    }
};

export default connectDb;