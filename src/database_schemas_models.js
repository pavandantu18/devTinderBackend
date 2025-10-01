const express = require('express');
const connectDB = require("./config/database");
const app = express();
const UserModel = require("./models/user");

app.post("/signup",async (req,res) => {
    const userObj = {
        firstName : "Pavan",
        lastName : "Dantu",
        emailId : "pavan@gmail.com",
        password : "Pavan14318.",
        age : 23,
        gender: "Male"
    }

    // Creating a new user model instance
    
    const user = new UserModel(userObj);
    try {
    await user.save()
    res.send("User signed up successfully")
    } catch(err) {
        res.status(400).send("Error saving the user:" + err.message)
    }

})


connectDB().then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => {
    console.log('Server is running on port 3000');
})
}).catch((err) => {
    console.log("Error connecting to MongoDB", err);
})

