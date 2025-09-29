const express = require('express');

const app = express();

// Order of the routes matters

// This will match all the HTTP methods (GET, POST, PUT, DELETE, etc.)

// app.use("/test",(req,res) => {
//     res.send('Hello World');
// })

// app.use("/",(req,res) => {
//     res.send('Welcome to the Home Page');
// })

// If we want to match only specific HTTP methods, we can use app.get, app.post, etc.
app.get("/user",(req,res) => {
    res.send('Hello World from /user');
})

app.post("/user",(req,res) => {
    res.send('user data updated');
})

app.delete("/user",(req,res) => {
    res.send('user deleted');
})

app.listen(3000,() => {
    console.log('Server is running on port 3000');
})