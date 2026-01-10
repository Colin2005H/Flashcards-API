import { db } from "../db/database.js"
import { usersTable, collectionsTable, flashcardsTable, revisionsTable } from "../db/schema.js"
import { eq, desc } from "drizzle-orm"
import 'dotenv/config'

/**
 * List users sorted by creation date
 * @param {*} req 
 * @param {*} res 
 */
export const listUsers = async (req, res) => {
    try {
        const users = await db.select({
            id: usersTable.id,
            email: usersTable.email,
            firstName: usersTable.firstName,
            lastName: usersTable.lastName,
            role: usersTable.role,
            createdAt: usersTable.createdAt
        })
        .from(usersTable)
        .orderBy(desc(usersTable.createdAt))

        res.status(200).json({
            message: 'Users retrieved successfully',
            data: users,
            count: users.length
        })
    } catch (error){
        console.error(error)
        res.status(500).json({
            error: 'Failed to retrieve users'
        })
    }
}

/**
 * Get a user by its ID
 * @param {*} req 
 * @param {*} res 
 */
export const getUser = async (req, res) => {
    try {
        const { userId } = req.params

        const [user] = await db.select({
            id: usersTable.id,
            email: usersTable.email,
            firstName: usersTable.firstName,
            lastName: usersTable.lastName,
            role: usersTable.role,
            createdAt: usersTable.createdAt,
            modifiedAt: usersTable.modifiedAt
        })
        .from(usersTable)
        .where(eq(usersTable.id, userId))

        if(!user) {
            return res.status(404).json({
                error: 'User not found'
            })
        }

        const collectionsCount = await db.select()
            .from(collectionsTable)
            .where(eq(collectionsTable.userId, userId))

        const flashcardsCount = await db.select()
            .from(flashcardsTable)
            .innerJoin(collectionsTable, eq(flashcardsTable.collectionsId, collectionsTable.id))
            .where(eq(collectionsTable.userId, userId))

        res.status(200).json({
            message: 'User retrieved successfully',
            data: {
                ...user,
                collectionsCount: collectionsCount.length,
                flashcardsCount: flashcardsCount.length
            }
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: 'Failed to retrieve user'
        })
    }
}

/**
 * Delete a user and the its data
 * @param {*} req 
 * @param {*} res 
 */
export const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params

        const [user] = await db.select()
            .from(usersTable)
            .where(eq(usersTable.id, userId))

        if (!user) {
            return res.status(404).json({
                error: 'User not found'
            })
        }

        //check if it's an admin, if so -> error
        if (user.role === 'ADMIN') {
            return res.status(403).json({
                error: 'Cannot delete admin users'
            })
        }

        await db.delete(usersTable)
            .where(eq(usersTable.id, userId))

        res.status(200).json({
            message: 'User deleted successfully',
            deletedUser: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            },
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: 'Failed to delete user'
        })
    }
}
