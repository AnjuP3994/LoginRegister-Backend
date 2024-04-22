//1. import schema
const users = require('../Models/userSchema')

//6. import jwt
const jwt = require('jsonwebtoken')

//4. import bcrypt - used for hashing passwords securely.
const bcrypt = require('bcrypt')

//5. define the number of salt rounds for bcrypt
const saltRounds = 10; 


//2. To define register logic
exports.userRegister = async(req,res)=>{
    console.log("Inside the register function");

    const {fname,surname,phone,email,password} = req.body;
    console.log(`userData: ${fname} ${surname} ${phone} ${email} ${password}`);

    try {
        const existingUser = await users.findOne({email})
        console.log('existingUser',existingUser); 
        if (existingUser) {
            res.status(406).json("User already registered")
        }
        else {
            const hashedPassword = await bcrypt.hash(password, saltRounds)  //hash the password before saving to the database
            const newUser = await new users({
                fname,
                surname,
                phone,
                email,
                password: hashedPassword
            })
            await newUser.save() //data is saved in db

            //response send to client
            res.status(200).json(newUser)
        }
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}


//3. To define login logic
exports.userLogin = async(req,res)=>{
    
    console.log("Inside the login function");

    const {email,password} = req.body;
    console.log(`${email} ${password}`);

    try {
        const existingUser = await users.findOne({email})
        if (existingUser) {
            const isPasswordValid = await bcrypt.compare(password, existingUser.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid username or password' });
            }
            //Token generation
            const token = jwt.sign({userId:existingUser._id}, "superkey2024")
            res.status(200).json({existingUser,token})
        } else {
            //response send to client
            res.status(401).json("Invalid credentials.")
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}


