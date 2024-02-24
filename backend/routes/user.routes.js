import express from "express";
import protectRoute  from "../middleware/protectRoute.js";
import { getUserForSidebar } from "../controllers/user.controller.js";

const router= express.Router();

router.get("/",protectRoute,getUserForSidebar)     //getUserForSidebar is from user.controller.js

export default router;