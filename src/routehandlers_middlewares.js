const express = require('express');

const app = express();

const { adminAuth, userAuth } = require('./middlewares/auth');

// app.use("/route",rh1,rh2,rh3) or app.use("/route",[rh1,rh2,rh3]) or app.use("/route",rh1,[rh2,rh3]) all are same

app.use("/user", (req,res,next) => {
    // Route Handler
    // If there is no send or end method called, the request will hang
    console.log('Middleware 1');
    // res.send('Route Handler 1');
    // When we call next(), the next matching route handler will be called
    // Dont send res and next() in the same route handler
    next();
    },
    (req,res,next) => {
        // route handler
        console.log('Route Handler 2');
        res.send('Route Handler 2'); 
    }
)

// Can also use app.get() twice with same route to achieve the same thing

// app.get("/user",(req,res,next) => {
//     console.log('Middleware 1');
//     next();
// })
// app.get("/user",(req,res,next) => {
//     console.log('Middleware 2');
//     res.send('Hello World from /user');
// })

// Route handlers are middlewares
// Middlewares are functions that have access to the request and response objects
// Middlewares can modify the request and response objects
// Middlewares can end the request-response cycle
// Middlewares can call the next middleware in the stack

// GET /users => middleware chain => Request Handler (sends the response)
// Why do we need middlewares?
// 1. Code Reusability
// 2. Separation of Concerns
// 3. Pre-processing and Post-processing of requests and responses
// 4. Error Handling
// 5. Authentication and Authorization

// Handle Auth Middleware for all the routes starting with /admin
// If we want just for specific routes, we can use it in that route only
app.use("/admin",adminAuth)
app.use("/users",userAuth, (req,res,next) => {
    console.log('User Middleware');
    res.send('Welcome to the user panel');
})

app.get("/admin/getAllData",(req,res) => {
    res.send('Welcome to the admin panel. Here is all the data.');
})

app.get("/admin/deleteAllData",(req,res) => {
    res.send('All data deleted successfully.');
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})