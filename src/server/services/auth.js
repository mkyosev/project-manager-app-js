const User = require('../models/User');
const Project = require('../models/Project');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { TOKEN_KEY } = require('../config/constants');

async function createUser(fullName, email, password) {
    try {
        if (!(email && password && fullName)) {
            // res.status(400).send("All input is required");
            throw new Error  ("All fields are required!");
        }

        const oldUser = await User.findOne({ email });

        if (oldUser) {
            // return res.status(409).send("User Already Exist. Please Login");
            throw new Error ("User already exists. Please try to login!");

        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ fullName, email, password: encryptedPassword });

        const token = jwt.sign(
            { user_id: user._id, email },
            TOKEN_KEY,
            {
                expiresIn: "7d",
            }
        );

        

        user.token = token;

        const result = {
            fullName: user.fullName,
            email: user.email,
            token: user.token,
            ownProjects: user.ownProjects,
            otherProjects: user.otherProjects,
            _id: user._id
        }

        return result;
    } catch (err) {
        console.log(err);
        return err.message;
    }

}

async function loginUser(email, password) {
    try {
        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign(
                { user_id: user._id, email },
                TOKEN_KEY,
                {
                    expiresIn: "7d",
                });
            user.token = token;
            
            const result = {
                fullName: user.fullName,
                email: user.email,
                ownProjects: user.ownProjects,
                otherProjects: user.otherProjects,
                token: user.token,
                _id: user._id
            }

            return result;
        }
        throw new Error("Invalid credentials!");
    } catch (err) {
        console.log(err.message);
        return err.message;
    }
}

async function getUserByEmail(email) {
    const pattern = new RegExp(`^${email}$`, 'i');
    const user = await User.findOne({ email: { $regex: pattern } });

    return user;
}

async function getUserByToken(token){
    const user = await User.find({ token });
    return user;
}

async function getUserById(userId){
    const user = await User.findById(userId).populate('ownProjects').populate('otherProjects');
    return user;
}

module.exports = {
    createUser,
    getUserByEmail,
    loginUser,
    getUserByToken,
    getUserById
}