const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = (req, res, next) => {
    const raw = req.headers.authorization;
    if (!raw) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const token = raw.startsWith('Bearer ') ? raw.slice(7) : raw;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Map to shape resolvers expect: user._id
        req.user = { _id: decoded.id || decoded._id, role: decoded.role };
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

const admin = (req, res, next) => {
    if (req.user.role !== 'ADMIN') {
        return res.status(403).json({ message: 'Forbidden' });
    }
    next();
};

module.exports = { auth, admin };