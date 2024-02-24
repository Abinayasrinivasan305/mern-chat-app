import express from "express"
import {sendMessage} from '../controllers/message.controller.js'
import protectRoute from "../middleware/protectRoute.js";
import { getMessages } from "../controllers/message.controller.js";

const router=express.Router();

router.get('/:id',protectRoute,getMessages)
router.post("/send/:id",protectRoute,sendMessage)  //sendMessage we create function which is in controller -->message.controller.js
                            //before running the sendMessage we need to check whether the user logged in or not (protectRoute is a kind of authorization)
export default router;