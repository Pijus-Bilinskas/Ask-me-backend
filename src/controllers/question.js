import { v4 as uuidv4 } from "uuid";
import QuestionModel from "../models/question.js";
import UserModel from "../models/user.js";
import AnswerModel from "../models/answer.js";




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

        // const user = await UserModel.findOne({ id: req.body.userid })

        // if (!user) {
        //     return res.status(404).json({ message: "User not found" });
        // }



        const question = new QuestionModel({
            id: uuidv4(),
            user_id: req.body.userid,
            question_text: req.body.question_text,
            date: new Date(), 
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

       const response = await question.deleteOne();

        return res.status(200).json({ message: "Question deleted successfully", response });
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

        return res.status(200).json({ message: "answer was successufully added", response })
    } catch (err) {
        return res.status(500).json({ message: "Eroor occurred", err })
    }
};

export const DELETE_ANSWER = async (req, res) => {
    try{
        const answer = await AnswerModel.findOne({ id: req.params.id })

        if(!answer) {
            return res.status(404).json({ message: "No answer with such ID was found" })
        }

        const response = await answer.deleteOne();

        return res.status(200).json({ message: response, message: "Answer was successfully deleted" })
    } catch (err) {
        return res.status(500).json({ message: "Eroor occurred", err })
    }
}

export const LIKE_ANSWER = async (req, res) => {
    try{
        const answer = await AnswerModel.findOne({ id: req.params.id})

        if(!answer) {
            return res.status(404).json({ message: "No answer wtih such ID was found" })
        }

        answer.gained_likes_number += 1;
        await answer.save();

        return res.status(200).json({ message: "Answer was successfully liked", likes: answer.gained_likes_number })
    } catch (err) {
        return res.status(500).json({message: "Error occurred", err })
    }
}
