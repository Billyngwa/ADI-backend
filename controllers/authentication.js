const user = require("../models/user");
const crypto = require("crypto");
const { default: mongoose } = require("mongoose");
const model = require("../models/user");
const jwt = require("jsonwebtoken");
const mailService = require("../utils/smtp");

const encryptPassword = (password) => {
    let hash = crypto.createHash("sha256");
    hash.update(password);
    return hash.digest('hex');

}


const webTokenGen = (email, id) => {
    return jwt.sign(
        {
            email, id
        },
        process.env.JWTSECRET,
        {
            expiresIn: 120,

        }
    )
}

const  validateUser = async (email) => {
    const userObject = await user.findOne({ email: email });
    if (!userObject) {
        return {
            status: 400,
            data: null,
            message: { message: "User not found", }
        }
    }
    return {
        status: 200,
        data: userObject,
        message: { message: "User exist" }
    }
}
async function validateUserEmail(email) {
    const userObject = await user.findOne({ email: email });
    if (!userObject) {
        return {
            status: 400,
            data: null,
            message: { message: "User not found", }
        }
    }
    return {
        status: 200,
        data: userObject,
        message: { message: "User exist" }
    }
}
const authentication = {
    register: async (req, res) => {
        //getting user inputs from request
        try {
            let { firstName, lastName, email, password } = req.body;

            // check if all the data is present in the body else return a proper error message
            if (!firstName || !lastName || !email || !password) {
                return res.status(400).json({ success: false, message: "corrupted payload" });
            }

            password = encryptPassword(password);

                    //CHECKING IF USER EXIST OR NOT
            const ted = await validateUser(email);
            if (ted.status === 200) {
                res.status(409).json(ted.message);
            } else {

                // creating a user in the database
                const created = await user.create({ firstName, lastName, email, password });

                //generating a webtoken for user
                const accessToken = { token: webTokenGen(email, created["_id"]) };
                
                res.status(201).json(accessToken);

                mailService.send(`${created.email}`, "Welcome to ADI", `Hi ${created["firstName"]
            },👋 you just joined our incubator pleased to see you with us 😊. Welcome on board.`);
            }

        } catch (error) {
            return res.status(500).json({ success: false, message:error.message })

        }




    },
    signIn: async (req, res) => {
        try {
            let { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ success: false, message: "corrupted payload" });

            }

            const ted = await validateUser(email);

            if (ted.data["password"] !== encryptPassword(password)) {
                res.status(400).json({ message: "Invalid Login" })
                return
            }

            const accessToken = { token: webTokenGen(email, ted.data["_id"]) };
           
            res.status(ted.status).json(accessToken);

        } catch (error) {
            return res.status(500).json({ success: false, message: error.message })

        }


    },
    forgotPassword: (req,res) => {

    }
};

module.exports = authentication;
