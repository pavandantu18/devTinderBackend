const mongoose = require('mongoose');

const connectDB = async() => {
    await mongoose.connect(
    "mongodb+srv://pavandantu18_db_user:Pavan14318.@devtinder.ebstlnw.mongodb.net/devTinderDB"
)}

module.exports = connectDB



