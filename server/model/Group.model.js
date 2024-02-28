import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    color: {
        type: String
    },
    note: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Note"
        }
    ]
    },{
    timestamps: true
    });

const Group = mongoose.model("Group", groupSchema);
export default Group;