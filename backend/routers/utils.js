import jwt from 'jsonwebtoken';
import { base64encode } from 'nodejs-base64';

export const generateToken = (user) => {
    return jwt.sign(
        {
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        },
        process.env.JWT_SECRET || 'somethingsecret',
        {
            expiresIn: '30d',
        }
    );
};

export const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (authorization) {
        const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
        jwt.verify(
            token,
            process.env.JWT_SECRET || 'somethingsecret',
            (err, decode) => {
                if (err) {
                    res.status(401).send({ message: 'Invalid Token' });
                } else {
                    //Decode container information about user in the token
                    req.user = decode; //we assign user as a property of the request
                    next(); //we pass user as a property of request to the next middleware
                }
            }
        );
    } else {
        res.status(401).send({ message: 'No Token' });
    }
};


export const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401).send({ message: 'Invalid Admin Token' });
    }
};

export const Base64EncodeMethod = (consumer_key, consumer_secret) => {
    let encoded = base64encode(`${consumer_key}:${consumer_secret}`);
    return encoded;
}