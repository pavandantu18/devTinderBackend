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
// app.get("/user",(req,res) => {
//     res.send('Hello World from /user');
// })

app.get("/user/:id/:name",(req,res) => {
    console.log(req.params);
    res.send(`Hello World from /user with id ${req.params.id}`);
})

app.get("/user",(req,res) => {
    // /user?id=123&name=pavan
    console.log(req.query);
    res.send(`Hello World from /user with id ${req.query.id}`);
})

app.post("/user",(req,res) => {
    res.send('user data updated');
})

app.delete("/user",(req,res) => {
    res.send('user deleted');
})

// ab?c -> ac, abc, abbc
// app.get("/ab?c",(req,res) => {
//     res.send('Hello World from /ab?c');
// })

// ab+c -> abc, abbc, abbbc
// app.get("/ab+c",(req,res) => {
//     res.send('Hello World from /ab+c');
// })

// ab*c ->  abc, abbc, abbbc, abxc
// app.get("/ab*c",(req,res) => {
//     res.send('Hello World from /ab*c');
// })

// ab[cd]e -> abce, abde
// app.get("/ab[cd]e",(req,res) => {
//     res.send('Hello World from /ab[cd]e');
// })



app.listen(3000,() => {
    console.log('Server is running on port 3000');
})