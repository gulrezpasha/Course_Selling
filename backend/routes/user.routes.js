import express from 'express'
import { signup,login ,logout, purchases} from '../controllers/user.controllers.js';
import userMiddleware from '../middleware/user.mid.js';


const router= express.Router();

router.post("/signup",signup);

router.post("/login",login);

router.post("/logout",logout);

router.get("/purchases",userMiddleware,purchases);

export default router;