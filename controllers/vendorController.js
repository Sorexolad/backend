export const createVendor = async (req,res)=>{
    try{
    
        const { body } = req
        const user = new userModel(body)
        await user.save()
        return res.status(201).json({ message: 'user created successfully', user: user})
    
    } catch (error){
    
        return res.status(500).json({error: error.message})
    }
} 