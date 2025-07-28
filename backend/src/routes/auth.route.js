import express from 'express'
import { checkAuth, login, logout, signup, update } from '../controllers/auth.controller.js'
import protectRoute from '../middlewares/auth.middleware.js'

const router = express.Router()

router.post('/signup',signup)
router.post('/login',login)
router.get('/logout',logout)
router.put('/update',protectRoute,update)
router.get('/check',protectRoute,checkAuth)
export default router