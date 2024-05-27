import mongoose from "mongoose";

const questionSchema = mongoose.Schema({
    id: {type: String, required: true},
    user_id: {type: String, required: false},
    question_text: {type: String, required: true},
    date: {type: String, required: true},
});

export default mongoose.model("Question", questionSchema);