import {sql} from '../config/db.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const registerUser = async (req, res) => {
    
    // destructurizamos la request 
    const { name, email, password } = req.body
    
    // variable para confirmar que no existe 
    let user;

    //validacion de datos
    if ( !name || !email || !password ) return res.status(400).json({error: "Campos inválidos", error});
    

    //confirmacion y reasignamos valor
    try {
        user = await sql`SELECT * FROM users WHERE email=${email}`; //estas consultas devuelven arrays
    } catch (error) {
        console.log("Error", error);
        return res.status(500).json({error: "Server Internal error", error})
    };

    // Password Hashing

        // la consulta si no encuentra nada devuelve un array vacio, entonces...
        // usamos .length para comparar con la longitud del array.
    if (user.length === 0 ) {
        try {
            const hashedPassword = await bcrypt.hash(password, 10)

            await sql`INSERT INTO users (name, email, password)
            VALUES (${name}, ${email}, ${hashedPassword})
            RETURNING *`;
            
            console.log("User successfully registered.");
            res.status(201).json({message: "User successfully registered."});
        
        } catch (error) {
            
            console.log("Error trying to register the user", error);
            res.status(500).json({message: "Internal server error", error});
       
        };
    } else {
        res.status(409).json({message: "Conflict. This email is already in use"});
    }

}

export const loginUser = async (req, res) => {
        // destructurizacion
        const {email, password} = req.body;
        let user;
        let hashedPassword;

        //validacion de datos
        if (!email || !password) { 
            return res.status(400).json({message: "Email and Password fields are required."});
        }

        //verificacion de existencia
        try {
            user = await sql`SELECT * FROM users WHERE email = ${email}`;

        } catch (err) {
            console.log("error", err);
            return res.status(500).json({message: "Internal Server Error"});
        }

        // si no;
        if (user.length === 0) {
            return res.status(404).json({message: "Wrong Email or Password, try again."});
        } else { // si existe;  
            try {
                hashedPassword = await bcrypt.compare(password, user[0].password);

            } catch (err) {
                console.log("error", err);
                return res.status(500).json({message: "Internal Error Server"});
            }
        }
        
        //si la hashed password matchea con la del usuario;
        if (hashedPassword) {
            // Crear JWT para el inicio de sesion
            const payload = {id: user[0].id}
            const options = {
                expiresIn: "1d"
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, options);
            
            return res.status(200).json({message: "Successfully authenticated", token})
        } else {
            return res.status(404).json({message: "Wrong Email or Password, try again"});
        }

    
}