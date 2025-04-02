import jwt from "jsonwebtoken"

export const authMiddleware = async (req, res, next) =>{
    const authHeader = req.headers['authorization']

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({ message: "No token provided" })
    }

    const token = authHeader.split(' ')[1]

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
        console.log(decodedToken)

        req.user = { id: decodedToken._id, name: decodedToken.name }

        next()
        
    } catch (error) {
        return res.status(500).json({ error: error.message, message: "Unauthorized" })
    }
}