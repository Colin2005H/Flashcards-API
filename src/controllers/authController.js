import { request } from "express"
import { eq } from "drizzle-orm"
import { db } from "../db/database.js"
import { usersTable } from "../db/schema.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import 'dotenv/config'

/**
 * 
 * @param {request} req 
 * @param {*} res 
 */
export const register = async (req, res) => {
    try {
        const { email, firstName, lastName, password, role } = req.body
    
        const hashedPassword = await bcrypt.hash(password, 12)

        const [user] = await db.insert(usersTable).values({
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: hashedPassword,
            role: role
        })
        .returning({
            id: usersTable.id,
            email: usersTable.email,
            firstName: usersTable.firstName,
            lastName: usersTable.lastName,
            role: usersTable.role
        })

        const token = jwt.sign({userId: user.id, userRole: user.role}, process.env.JWT_SECRET, {expiresIn: '24h'})

        res.status(201).json([{
            message: 'User created successfully',
            userData : user,
            token
        }])
    }
    catch (err) {
        console.error(err)
        res.status(500).json({
            error: "Registration failed"
        })
    }
}

/** * Get current user info
 * @param {request} req 
 * @param {*} res
 */
export const getMe = async (req, res) => {
    try {
        const userId = req.user?.userId

        if (!userId) {
            return res.status(401).json({
                error: 'Unauthorized'
            })
        }

        const [user] = await db.select({
            id: usersTable.id,
            email: usersTable.email,
            firstName: usersTable.firstName,
            lastName: usersTable.lastName,
            role: usersTable.role,
            createdAt: usersTable.createdAt
        })
        .from(usersTable)
        .where(eq(usersTable.id, userId))

        if (!user) {
            return res.status(404).json({
                error: 'User not found'
            })
        }

        res.status(200).json({
            message: 'User retrieved successfully',
            userData: user
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({
            error: 'Failed to retrieve user'
        })
    }
}

/** * 
 * @param {request} req 
 * @param {*} res
 */
export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const [user] = await db.select()
        .from(usersTable)
        .where(
            eq(usersTable.email, email)
        )

        if(!user) {
            return res.status(401).json([{
                message: 'Invalid credentials'
            }])
        }

        const passwordMatches = await bcrypt.compare(password, user.password)

        if(!passwordMatches) {
            return res.status(401).json([{
                message: 'Invalid credentials'
            }])
        }

        const token = jwt.sign({userId: user.id, userRole: user.role}, process.env.JWT_SECRET, {expiresIn: '24h'})

        res.status(200).json([{
            message: 'User connected successfully',
            userData: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role
            },
            token
        }])

    } catch (err) {
        console.error(err)
        res.status(500).json({
            error: "Registration failed"
        })
    }
}