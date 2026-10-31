import jwt from 'jsonwebtoken'

export const authMiddleware = async (req, res, next) => {
    
    const authHeader = req.headers.authorization
    let payload;

    if (!authHeader) {
    console.log("Reached authheader...")
    return res.status(401).json({message: "401 Error, Not Authorized"});

    }

    const arrayAuth = authHeader.split(" ");
    const token = arrayAuth[1];
    
    try {
        // verificar el token y la llave secreta
        payload = jwt.verify(token, process.env.JWT_SECRET)
        
        req.user = payload;
        next();

    } catch (error) {
        return res.status(401).json({message: "Not authorized"})
    }


}