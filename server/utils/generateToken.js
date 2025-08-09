import jwt from "jsonwebtoken";

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: 10 * 24 * 60 * 60                // 10 days
    })
};

export default generateToken;