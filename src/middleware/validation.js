import { ZodError } from "zod"

/**
 * 
 * @param {*} schema 
 * @returns 
 */
export const validateBody = (schema) => {
    return (req, res, next) => {
        try {
            req.body = schema.parse(req.body)
            next()
        }
        catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).send({
                    error: 'Validation failed',
                    details: error.issues.map((issue) => issue.message)
                })
            }
            res.status(500).send({
                error: 'Internal server error'
            })
        }
    }
}

/**
 * 
 * @param {*} schema 
 * @returns 
 */
export const validateParams = (schema) => {
    return (req, res, next) => {
        try {
            schema.parse(req.params)
            next()
        }
        catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).send({
                    error: 'Invalid parameters',
                    details: error.issues.map((issue) => issue.message)
                })
            }
            res.status(500).send({
                error: 'Internal server error'
            })
        }
    }
}