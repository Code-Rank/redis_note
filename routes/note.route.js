import express from "express";
const router = express.Router();
import { getNotes, addNote } from "../controller/note.controller.js";
router.route("/get-notes").get(getNotes);
router.route("/add-note").post(addNote);

export default router;
