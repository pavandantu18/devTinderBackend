const validator = require('validator');

const validateSignUpData = (req) => {
    const { firstName, lastName, emailId, password} = req.body;

    if(!firstName || firstName.length < 4 || firstName.length > 30) {
        throw new Error("First name is required and should be between 4 to 30 characters");
    }

    if(!lastName) {
        throw new Error("Last name is required");
    }

    else if(!validator.isEmail(emailId)) {
        throw new Error("Email is not valid");
    }

    else if(!validator.isStrongPassword(password)) {
        throw new Error("Password is not strong");
    }
}

module.exports = {
    validateSignUpData
}