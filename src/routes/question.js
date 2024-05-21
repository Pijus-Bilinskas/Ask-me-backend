import express from "express";
import {
        GET_ALL_QUESTIONS,
        INSERT_QUESTION,
        DELETE_QUESTION_BY_ID,
        GET_ANSWERS_FOR_QUESTION_BY_ID,
        POST_ANSWER_FOR_QUESTION_BY_ID,
        DELETE_ANSWER,
        } from "../controllers/question.js";

import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/questions", auth, GET_ALL_QUESTIONS)
router.post("/question", auth, INSERT_QUESTION)
router.delete("/question/:id", auth, DELETE_QUESTION_BY_ID)

router.get("/question/:id/answers", auth, GET_ANSWERS_FOR_QUESTION_BY_ID)
router.post("/question/:id/answers", auth, POST_ANSWER_FOR_QUESTION_BY_ID)
router.delete("/answer/:id", auth, DELETE_ANSWER)

export default router;