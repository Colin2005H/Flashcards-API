/**
 * Check if the user is an admin
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
export const requireAdmin = (req, res, next) =>{
    try {
        if(!req.user) {
            return res.status(401).json({
                error: 'Authentication required'
            })
        }

        if (req.user.userRole !== 'ADMIN') {
            return res.status(403).json({
                error: 'Admin required'
            })
        }
        next()
    } catch (error){
        return res.status(500).json({
            error: 'Authorization failed'
        })
    }
}
