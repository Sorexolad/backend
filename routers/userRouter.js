import { Router } from 'express'
import { authStatus, getSingleUser, getUser, loginUser, registerUser } from '../controllers/userController.js'
import { authMiddleware } from '../utils/authMiddleware.js'



const router = Router()


router.get('/users', authMiddleware, getUser)
router.get("/users/:id", getSingleUser)
router.post('/user/signup', registerUser)
router.post('/user/login', loginUser)
router.get('/user/auth/status', authMiddleware, authStatus)



export default router