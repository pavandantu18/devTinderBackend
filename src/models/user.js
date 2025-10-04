const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 30,
    },
    lastName: {
        type: String,
    },
    emailId: {
        type: String,
        lowercase: true,
        trim: true,
        required: true,
        unique: true,
        validate(value) {
            if(!validator.isEmail(value))  {
                throw new Error("Email is not valid " + value)
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if(!validator.isStrongPassword(value))  {
                throw new Error("Your password is not strong " + value)
            }
        }
    },
    age: {
        type: Number,
        min: 18
    },
    gender: {
        type: String,
        validate(value) {
            if(!["male","female","other"].includes(value.toLowerCase())) {
                throw new Error("Gender data is not valid")
        }
    }
    },
    photoUrl: {
        type: String,
        default: "https://imgs.search.brave.com/jsVbZV6BjaDYzQ7yJeuhY25hGZMy7Wxngx1o7ijrpvg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvODcx/NzUyNDYyL3ZlY3Rv/ci9kZWZhdWx0LWdy/YXktcGxhY2Vob2xk/ZXItbWFuLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz00YVV0/OTlNUVlPNGR5by1y/UEltSDJrc3pZZTFF/Y3VST0M2ZjJpTVFt/bjhvPQ",
        validate(value) {
            if(!validator.isURL(value))  {
                throw new Error("URL is not valid " + value)
            }
        }
    },
    about: {
        type: String,
        default: "Hey there! I am using DevTinder.",
    },
    skills: {
        type: [String],
    }
},
{
    timestamps: true,
})

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;