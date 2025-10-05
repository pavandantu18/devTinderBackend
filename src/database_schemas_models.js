const express = require('express');
const connectDB = require("./config/database");
const app = express();
const UserModel = require("./models/user");
const { validateSignUpData } = require('./utils/validation');
const bcrypt = require('bcrypt');

app.use(express.json());

app.post("/signup",async (req,res) => {
    // console.log(req.body);
    // const userObj = {
    //     firstName : "Pavan",
    //     lastName : "Dantu",
    //     emailId : "pavan@gmail.com",
    //     password : "Pavan14318.",
    //     age : 23,
    //     gender: "Male"
    // }

    // Validation of data
    try {
        validateSignUpData(req);

        const {firstName, lastName, emailId, password } = req.body;

        // Encrpt the password
        const passwordHash = await bcrypt.hash(password, 10);


        // Creating a new user model instance
        
        // const user = new UserModel(userObj);
        const user = new UserModel({
            firstName,
            lastName,
            emailId,
            password : passwordHash
        });
        
        await user.save()
        res.send("User signed up successfully")
    } catch(err) {
        res.status(400).send("Error saving the user:" + err.message)
    }

})

app.post("/login", async (req,res) => {
    
    try {
        const { emailId, password } = req.body;

        const user = await UserModel.findOne({emailId: emailId})
        if(!user) {
            return res.status(404).send("User not found")
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if(!isPasswordMatch) {
            return res.status(401).send("Invalid credentials")
        } else {
            res.send("User logged in successfully")
        }
    } catch(err) {
        res.status(400).send("Error logging in the user")
    }

})

// Get user by email API - GET /
app.get("/user", async (req,res) => {
    try {
        const userEmail = req.body.emailId;
        const user = await UserModel.findOne({emailId: userEmail})
        if(user) {
            res.send(user)
        } else {
            res.status(404).send("User not found")
        }
    } catch(err) {
        res.status(400).send("Error fetching user by email")
    }
})

// FEED API - Get /feed - get all users from the database
app.get("/feed", async (req,res) => {
    try {
        const users = await UserModel.find({})
        res.send(users)
    } catch(err) {
        res.status(400).send("Error fetching users:")
    }
})

// Delete user by ID - DELETE /user
app.delete("/user",async (req,res) => {
    const userId = req.body.userId
    try {
        // const user = await UserModel.findByIdAndDelete({_id : userId})
        const user = await UserModel.findByIdAndDelete(userId)

        if(user) {
            res.send("User deleted successfully")
        } else {
            res.status(404).send("User not found")
        }
        
    } catch(err) {
        res.status(400).send("Error deleting the user")
    }
})

// Delete user by email - DELETE /user

app.delete("/userEmail", async (req,res) => {
    const userEmail = req.body.emailId
    console.log(userEmail);
    try {
        const user = await UserModel.findOneAndDelete({emailId: userEmail})
        if(user) {
            res.send("User deleted successfully by email")
        } else {
            res.status(404).send("User not found")
        }
    }
    catch(err) {
        res.status(400).send("Error deleting user by email")
    }
})

// Update user by ID - PATCH /user

app.patch("/user/:userId", async (req,res) => {
    const userId = req.params.userId
    const data = req.body

    try {

        const ALLOWED_UPDATES = ["firstName", "lastName", "password", "age", "photoUrl", "about", "skills"]

        const isUpdateAllowed = Object.keys(data).every((key) => ALLOWED_UPDATES.includes(key))

        if(!isUpdateAllowed) {
            throw new Error("Invalid updates!")
        }

        if(data?.skills.length > 10) {
            throw new Error("Skills cannot be more than 10")
        } 

        // const user = await UserModel.findByIdAndUpdate(userId, data)
        const user = await UserModel.findByIdAndUpdate({_id : userId}, data, {
            returnDocument : "after",
            runValidators : true
        })
        if(user) {
            res.send("User updated successfully by ID")
        } else {
            res.status(404).send("User not found")
        }
    } catch(err) {
        res.status(400).send("Error updating user by ID" 
            + err.message
        )
    }
})

// Update user by email - PATCH /userEmail
app.patch("/userEmail", async (req,res) => {
    const userEmail = req.body.emailId
    const data = req.body
    try {
        const user = await UserModel.findOneAndUpdate({emailId: userEmail}, data)
        if(user) {
            res.send("User updated successfully by email")
        } else {
            res.status(404).send("User not found")
        }
    } catch(err) {
        res.status(400).send("Error updating user by email")
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

