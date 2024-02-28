import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    content: {
        type: String
    },
    groupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group"
    }
    },{
    timestamps: true
    });

const Note = mongoose.model("Note", noteSchema);
export default Note;