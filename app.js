// // import path from "path"

// const path = require('path')

// // path.join()
// // path.resolve()

// const dir = __dirname

// const newPath = path.join(dir, '/module')

// const resolvePath = path.resolve(dir, 'ola/me')


// console.log(dir)
// console.log(newPath)
// console.log(resolvePath)

// // const file = __filename
// // console.log(file)

// import http from 'http'

// const server = http.createServer((req, res)=>{

//     // res.write('Hello Backend')
//     // res.end()

// if (req.url === '/'){

//     res.end("Home page")
// }

// if (req.url === '/about'){

//     res.end("About us")
// }

// if (req.url === '/sign'){

//     res.end("Sign in")
// }

// if (req.url === '/contact'){

//     res.end("Contact us")
// }
// })

// const PORT = 5000

// server.listen(PORT, (error)=>{

//     // if(error){

//     //     console.log('Error Occured', error.message)
//     // }else {

//     //     console.log(`Server Listening on ${PORT}`)
//     // }

//     error ? console.log('Error Occured', error.message) : console.log(`Server Listening on ${PORT}`)

// })

// import express from 'express'
// import mongoose from 'mongoose'


// const app = express()

// app.get('/', (req, res)=>{

//     res.send('welcome to express app')
//     res.end()
// })

// app.get('/about', (req, res)=>{

//     res.send('welcome to about express app')
// })


// const PORT = process.env.PORT || 4000

// mongoose.connectn

// app.listen(PORT, (error)=>{

    

//     error ? console.log(`Error Occured: $(error.message)` ): console.log(`Server Listening on port ${PORT}`)

// })

import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userModel from './models/userModel.js'
import userRouter from './routers/userRouter.js'
import vendorRouter from './routers/vendorRouter.js'
import cors from "cors"


const app = express()
dotenv.config()
app.use(express.json())


app.use(cors({
    origin: process.env.CLIENT_DOMAIN,
    methods: 'GET, PUT, DELETE, POST',
    credentials: true,
    headers: ['Content-Type, Authorization']
}))


app.use(userRouter)
app.use(vendorRouter)



// CREATE OPERATIONS
app.post('/user', async (req, res)=>{
   
})

// app.post('/vendor', async (req, res)=>{
//     try{
    
//         const { body } = req
//         const user = new userModel(body)
//         await user.save()
//         return res.status(201).json({ message: 'user created successfully', user: user})
    
//     } catch (error){
    
//         return res.status(500).json({error: error.message})
//     }   
// })


//DELETE OPERATION
app.delete('/users/:id', async(req, res)=>{
    try {
        const id = req.params.id
        // const { params: { id } } = req

        const user = await userModel.findByIdAndDelete(id)
        if(!user){
            return res.status(404).json({ message: "Cannot delete non-existent user"})
        }
        return res.status(200).json({ message: "User successfully deleted" })
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
})


//PUT OPERATION
app.put('/users/:id', async(req,res)=>{
    try {
        const id = req.params.id

        const updatedUser = req.body

        const user = await userModel.findByIdAndUpdate(id, updatedUser, { new: true })
        if(!user){
            return res.status(404).json({ message: "User not found" })
        }
        return res.status(200).json({ message: "User updated successfully", user: user })

        
    } catch (error) {
        return res.status(500).json({error: error.message})        
    }
})


const port = process.env.port

mongoose.connect(process.env.MONGO_URI)
.then (()=>{
    console.log('Connected Successfully to the database')
    app.listen(port, ()=>{

        console.log(`Server listening on ${port}`)
    })

})

.catch((err)=>{


    console.log(`Couldn't connect to the database ${err.message}`)
})


