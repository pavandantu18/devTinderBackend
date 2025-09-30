const adminAuth = (req,res,next) => {
    console.log('Admin Middleware');
    const token = "admin";
    if(token === "admin"){
        next();
    } else {
        res.status(401).send('Forbidden');
    }
}

const userAuth = (req,res,next) => {
    console.log('Admin Middleware');
    const token = "admin";
    if(token === "admin"){
        next();
    } else {
        res.status(401).send('Forbidden');
    }
}

module.exports = { adminAuth, userAuth };
