import { Router } from "express";
import * as massegeController from "./message.controller.js";
import { auth } from "../middleware/Auth.js";
import { asyncHandler } from "../../utils/errorHandling.js";

const router = Router();

router.get('/',asyncHandler(auth),massegeController.getMessages);
router.post('/:receiverId',massegeController.sendMessage);

export default router;