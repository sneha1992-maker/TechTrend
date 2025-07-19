import express from 'express'




import { register,login, users, profile } from '../Controllers/user.js';

import { Authenticated } from '../Middlewares/auth.js';

const router = express.Router();

//register user
router.post('/register',register) //register - function name in the controllers    // -> /api/user/register

//login user
router.post('/login',login)

//get all users
router.get('/all',users)

//get user profile
router.get('/profile',Authenticated,profile)

export default router