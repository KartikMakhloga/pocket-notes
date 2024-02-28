import Group from "../model/Group.model.js";

export const createGroup = async (req, res) => {
    try {
        const { name, color } = req.body;

        // validate
        if (!name) {
            return res.status(400).json({ error: "Name is required" });
        }
        if (!color) {
            return res.status(400).json({ error: "Color is required" });
        }
        const group = await Group.create({ name, color });
        res.status(201).json(group);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getGroups = async (req, res) => {
    try {
        const groups = await Group.find();
        res.status(200).json(groups);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
