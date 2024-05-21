import mongoose from "mongoose";

const answerSchema = mongoose.Schema({
    id: {type: String, required: true},
    answer_text: {type: String, required: true},
    date: {type: String, required: true},
    gained_likes_number: {type: Number, required: false},
    question_id: {type: String, required: true},
});

export default mongoose.model("Answer", answerSchema);
