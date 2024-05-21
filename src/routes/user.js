import express from "express";
import {
        SIGN_UP,
        LOG_IN,
        GET_NEW_JWT_TOKEN,
        }
        from "../controllers/user.js";

import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", auth, SIGN_UP);
router.post("/login", auth, LOG_IN);

router.get("/refresh-token", auth, GET_NEW_JWT_TOKEN);

export default router;