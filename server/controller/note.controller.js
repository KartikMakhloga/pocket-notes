import Note from "../model/Note.model.js";
import Group from "../model/Group.model.js";

export const createNote = async (req, res) => {
    try {
        const { content, groupId } = req.body;

        // validate
        if (!content) {
            return res.status(400).json({ error: "Content is required" });
        }

        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ error: "Group not found" });
        }

        const note = await Note.create({ content, groupId });
        group.note.push(note._id);
        await group.save();
        res.status(201).json(note);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getNotes = async (req, res) => {
    try {
        const notes = await Note.find();
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getNotesByGroup = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "Group id is required" });
        }
        const notes = await Note.find({ groupId: id });
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Share notes
export const shareNote = async (req, res) => {
    try {
        const { noteId, groupId } = req.body;
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ error: "Group not found" });
        }
        const note = await Note.findById(noteId);
        if (!note) {
            return res.status(404).json({ error: "Note not found" });
        }
        group.note.push(note._id);
        await group.save();
        res.status(200).json({ message: "Note shared successfully" });

    }catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Share group - all notes that belongs to group should be shown
export const shareGroup = async (req, res) => {
    try {
        const { groupId } = req.body;
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ error: "Group not found" });
        }
        const notes = await Note.find({ groupId });
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Search by group name/notes content
export const search = async (req, res) => {
    try {
        const { search } = req.query;
        if (!search) {
            return res.status(400).json({ error: "Search query is required" });
        }
        const notes = await Note.find({ content: { $regex: search, $options: "i" } });
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
