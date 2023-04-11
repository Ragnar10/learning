// Core
import jwt from 'jsonwebtoken';

export const checkAuth = (req, res, next) => {
    const token = req.headers.authorization ? req.headers.authorization.replace(/Bearer\s?/, '') : null;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            req.userId = decoded.id;

            next();
        } catch (error) {
            return res.status(403).json('Немає доступа');
        }
    } else {
        return res.status(403).json('Немає доступа');
    }
};
