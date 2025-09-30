const express = require('express');

const app = express();

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

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})