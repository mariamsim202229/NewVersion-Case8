import jwt from 'jsonwebtoken';

const secretKey = "secret-key-randomized-string";

function authenticateWebToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({result: 'Access denied'});

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.status(403).json({result: 'Invalid token'});
        req.user = user;
        next();
    }); 
}

export { secretKey, authenticateWebToken }