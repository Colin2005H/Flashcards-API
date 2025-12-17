import { db } from "../db/database.js"
import { flashcardsTable } from "../db/schema.js"
import { eq } from "drizzle-orm"
import {request, response} from 'express'
import 'dotenv/config'

/**
 * 
 * @param {request} req 
 * @param {response} res 
 * @returns 
 */
export const createFlashcards = async (req, res) => {
    const {frontText, backText, frontURL, backURL} = req.body

    if (!frontText || !backText || !frontURL || !backURL){
        return res.status(400).send({ error: 'Invalid request'})
    }
    
    try {
        const Flashcard = await db.insert(flashcardsTable).values({frontText: frontText, backText: backText, frontURL: frontURL, backURL: backURL, modifiedAt: Date()})
        
        res.status(201).json({
            message:'Flashcard added successfully.', 
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: "Error while creating the flashcard.",
        })
    }
}

export const updateFlashcards = async (req, res) => {

    const { id } = req.params

    const {frontText, backText, frontURL, backURL} = req.body

    if (!frontText || !backText || !frontURL || !backURL){
        return res.status(400).send({ error: 'Invalid request'})
    }
    
    try {
        const Flashcard = await db.update(flashcardsTable).values({frontText: frontText, backText: backText, frontURL: frontURL, backURL: backURL, modifiedAt: Date()}).where(eq(flashcardsTable.id, id))
        
        res.status(201).json({
            message:'Flashcard updated successfully.', 
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: "Error while updating the flashcard.",
        })
    }
}

export const deleteFlashcards = async (req, res) => {

    const { id } = req.params
    
    try {
        const Flashcard = await db.delete(flashcardsTable).where(eq(flashcardsTable.id, id))
        
        res.status(201).json({
            message:'Flashcard deleted successfully.', 
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: "Error while deleting the flashcard.",
        })
    }
}