import { Router } from 'express'
import {deleteUser, getallusers, oneUser, signup, updateUser,signin,searchbyname,searchbyage,getoldest,searchbyid} from './controller/user.controller.js'
const router = Router()


router.get('/user', getallusers)

// sign up 
router.post('/signup',signup)

router.get('/oneUser/:id', oneUser)

router.patch('/update/:id', updateUser)

router.delete('/delete/:id', deleteUser)

router.post('/signin',signin)

router.get('/searchbyname',searchbyname)

router.get('/searchbyage',searchbyage)

router.get('/getoldest',getoldest)

router.get('/searchbyid',searchbyid)









export default router 