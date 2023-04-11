// Core
import jwt from 'jsonwebtoken';

export const checkAuth = (res, req, next) => {
    const token = req.header.authorization.replace(/Bearer\s?/, '');

    if (token) {
        try {
            const decoded = jwt.verify(token);
            req.userId = decoded.id;

            next();
        } catch (error) {
            return res.status(403).json({ error: true });
        }
    } else {
        return res.status(403).json({ error: true });
    }
};
