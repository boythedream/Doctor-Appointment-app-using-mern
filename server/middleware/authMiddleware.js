const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
dotenv.config()
module.exports = async (req, res, next) => {
    try {
        const token = req.headers['authorization'].split(" ")[1];
        if (!token) {
            return res.status(401).send({
                message: "Authentication failed: Token missing",
                success: false
            });
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                return res.status(401).send({
                    message: "Authentication failed: Invalid token",
                    success: false
                });
            } else {
                req.body.userId = decode.userId;
                next();
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            message: "Authentication failed",
            success: false
        });
    }
};
