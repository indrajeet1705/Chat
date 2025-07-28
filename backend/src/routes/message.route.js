import express from 'express'
import protectRoute from '../middlewares/auth.middleware.js'
import { getAlluser, getMessages, sendMessage } from '../controllers/message.controller.js'


const router = express.Router()

router.get('/users',protectRoute,getAlluser)
router.get('/:id',protectRoute,getMessages)
router.post('/send/:id',protectRoute,sendMessage)
export default router