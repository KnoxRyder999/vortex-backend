const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {

    try {
        const authHeader = req.headers['authorization'];

        // Format: Bearer <token>
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) return res.status(401).json({ message: 'Access token required' });

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if(!decoded.dataValues.isAdmin) return res.status(403).send("only admin access!")
            req.user = decoded; // Attach user payload to request
            next(); // Continue to route handler
        } catch (err) {
            return res.status(403).json({ message: 'Invalid or expired token' });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send("header error!")
    }
};

module.exports = authenticateToken;
