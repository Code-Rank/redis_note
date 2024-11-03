import { createClient } from "redis";
import { redisClient } from "../db/redis.db.js";
import NoteModel from "../model/note.model.js";
const getNotes = async (req, res) => {
  try {
    const cachedNotes = await redisClient.get("notes");

    if (cachedNotes) {
      return res.status(200).json({
        status: 200,
        data: JSON.parse(cachedNotes),
      });
    } else {
      const notes = await NoteModel.find();

      await redisClient.set("notes", JSON.stringify(notes));

      setTimeout(() => {
        return res.status(200).json({
          status: 200,
          data: notes,
        });
      }, 3000);
    }
  } catch (error) {
    console.error("Error fetching notes:", error);
    return res.status(500).json({
      status: 500,
      message: "An error occurred while fetching notes",
    });
  }
};

const addNote = async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({
      status: 400,
      message: "Missing required fields: title and description",
    });
  }
  try {
    const note = await NoteModel.create({
      title,
      description,
    });
    const notes = await NoteModel.find();

    await redisClient.set("notes", JSON.stringify(notes));
    return res.status(201).json({
      status: 201,
      data: note,
      message: "Note created successfully",
    });
  } catch (error) {
    console.error("Error creating note:", error);
    return res.status(500).json({
      status: 500,
      message: "An error occurred while creating note",
    });
  }
};

export { addNote, getNotes };
