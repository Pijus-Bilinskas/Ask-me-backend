import { v4 as uuidv4 } from "uuid";
import QuestionModel from "../models/question.js";
import UserModel from "../models/user.js";
import AnswerModel from "../models/answer.js";
import answer from "../models/answer.js";



export const GET_ALL_QUESTIONS = async (req, res) => {
    try{
        const questions = await QuestionModel.find();

        return res.status(200).json({ questions: questions })
    } catch (err) {
        return console.log(err)
    }
}

export const INSERT_QUESTION = async (req, res) => {
    try{

        const user = await UserModel.findOne({ id: req.body.userId })


        const question = new QuestionModel({
            id: uuidv4(),
            user_id: user.id,
            question_text: req.body.question_text,
            date: Date(), 
        })

        const response = await question.save();

        return res.status(200).json({ question: response, message: "Question added successfully" })
    } catch (err){
        return console.log(err);
    }
};

export const DELETE_QUESTION_BY_ID = async (req, res) => {
    try{
        const question = await QuestionModel.findOne({ id: req.params.id });

        if(!question) {
            return res.status(404).json({ message: "No user with such ID was found" })
        }

        await question.remove();

        return res.status(200).json({ message: "Question deleted successfully", question });
    } catch (err) {
        console.log(err)
        return res.status(500).json("An error occorred while deleting the question")
    }
};

export const GET_ANSWERS_FOR_QUESTION_BY_ID = async (req, res) => {
    try{
       const question = await QuestionModel.findOne({ id: req.params.id })
        const answers = await AnswerModel.find({ question_id: req.params.id })        

        return res.status(200).json({ 
            question: question,
            answers: answers
         })
    } catch (err) {
        return res.status(500).json({ message: "Eroor occurred", err })
    }
}

export const POST_ANSWER_FOR_QUESTION_BY_ID = async (req, res) => {
    try{
        const question = await QuestionModel.findOne( {id: req.params.id} )
        
        const answer = new AnswerModel({
            id: uuidv4(),
            answer_text: req.body.answer_text,
            date: Date(),
            gained_likes_number: 0,
            question_id: question.id,
        });

        const response = await answer.save();

        return res.status(200).json({ message: "answer was successufully added" })
    } catch (err) {
        return res.status(500).json({ message: "Eroor occurred", err })
    }
};

export const DELETE_ANSWER = async (req, res) => {
    try{
        const answer = await AnswerModel.findOne({ id: req.params.id })

        const response = await answer.remove();

        return res.status(200).json({ message: response, message: "Answer was successfully deleted" })
    } catch (err) {
        return res.status(500).json({ message: "Eroor occurred", err })
    }
}

