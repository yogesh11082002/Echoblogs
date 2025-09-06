import mongoose, { connect } from "mongoose";


const connectDB = async ()=>{

    try {

        mongoose.connection.on('connected',()=>console.log('Datbase Connected Succesfully'))
        await mongoose.connect(`${process.env.MONGODB_URI}/Echoblog`)
    } catch (error) {
        console.log(error.message);
    }
}
export default connectDB;