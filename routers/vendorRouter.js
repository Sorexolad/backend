import { Router } from 'express'
import { createVendor } from '../controllers/vendorController.js'


const router = Router()


router.post('/vendor', createVendor)

export default router