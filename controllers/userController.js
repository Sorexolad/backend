import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js"
import bcrypt from "bcryptjs"


// READ ALL OPERATIONS
export const getUser = async (req, res) => {
    try {
        const users = await userModel.find()
        if (users.length === 0) {
            return res.status(404).json({ message: 'No users found' })
        }
        return res.status(200).json({ users: users, message: 'users fetched successfully' })

    } catch (error) {

        return res.status(500).json({ error: error.message })
    }
}

//READ SINGLE OPERATION
export const getSingleUser = async (req, res) => {
    try {
        const id = req.params.id

        const user = await userModel.findById(id)
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        return res.status(200).json({ mesage: "User found successfully", user: user })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}


//REGISTER USER
export const registerUser = async (req, res) => {
    try {
        const { body } = req
        const { password } = body

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = new userModel({
            ...body,
            password: hashedPassword
        })

        await user.save()
        return res.status(201).json({ message: "User created successfully", user })

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}


//LOGIN USER
export const loginUser = async (req, res) => {
    try {
        const { body } = req
        const { email, password } = body

        const user = await userModel.findOne({ email })

        if (!user) {
            return res.status(404).json({ message: "Invalid credentials" })
        }

        const passwordCompare = await bcrypt.compare(password, user.password)

        if (!passwordCompare) {
            return res.status(400).json({ message: "Email or Password incorrect" })
        }

        const accessToken = jwt.sign(
            {
                user: {
                    name: user.name,
                    id: user._id
                }
            },
            process.env.JWT_ACCESS_SECRET,
            { expiresIn: '1h', subject: "accessToken" }
        )

        return res.status(200).json({ message: "Login success", accessToken })

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

//check user authentication status (if loggedin or not)
export const authStatus = async (req, res) =>{
    console.log(req.headers)
    try {
        if(!req.user){
            return res.status(400).json({ mesage: "Invalid Token" })
        }

        const user = await userModel.findOne({ id: req.user._id})

        if(!user){
            return res.status(404).json({ message: "User not found" })
        }

        return res.status(200).json({ id: user._id, name: user.name })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}