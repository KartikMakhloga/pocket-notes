import express from 'express';
const router = express.Router();
import {getGroups,createGroup} from "../controller/group.controller.js";
import {createNote,getNotesByGroup} from "../controller/note.controller.js";


router.post('/createGroup',createGroup);
router.get('/groups',getGroups);
router.post('/createNotes',createNote);
router.get('/notes/:id',getNotesByGroup);

export default router;