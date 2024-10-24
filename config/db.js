// const mongoose=require('mongoose')
// const colors=require('colors')

// //function mongodb database coonection
// const connectDB=async(req,res)=>{
//     try{
//         await mongoose.connect(process.env.MONGO_URL)
//         console.log(`Connected to database ${mongoose.connection.host}`.bgWhite)
//     }catch(error){
//         console.log('DB Error',error);
//     }
// }
// module.exports=connectDB

const mongoose = require('mongoose');
const colors = require('colors');

// function for MongoDB database connection
const connectDB = async (req,res) => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected to database ${mongoose.connection.host}`.red.bgWhite);
    } catch (error) {
        console.log('DB Error:', error.message.bgRed);  // Use error.message for clarity
    }
}

module.exports = connectDB;
