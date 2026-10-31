import {sql} from '../config/db.js'

export const getBoards = async (req, res) => {
    
    try {
        const boards = await sql`SELECT * FROM boards WHERE created_by=${req.user.id}`
        console.log("Successfully showing")
        return res.status(200).json({sucess: true, data: boards})
        } catch (err) {
        console.log("Error", err)
        return res.status(500).json({success: false, message: "500 internal server error"});
    }

}

export const getBoardId = async(req, res) => {
    
    const {id} = req.params

    try {
        
        const data = await sql`SELECT * FROM boards WHERE id = ${id} AND created_by = ${req.user.id}`;

        if (data.length === 0) {
            return res.status(200).json({success: false, data: undefined})
        }
        return res.status(200).json({success: true, data: data[0]});
    
    } catch(err) {
        
        console.log("error", err);
        
        return res.status(500).json({success: false, message: "500 Internal Server Error"});
    
    }

}

export const createBoard = async (req, res) => {
    
    const {name} = req.body 
    const cleanName = name?.trim()
    if (!cleanName) {
        return res.status(400).json({success: false, message: "Enter valid name"})
    }

    try {
       
            const data = await sql`INSERT INTO boards (name, created_by) 
                      VALUES (${cleanName}, ${req.user.id})
                      RETURNING *`;

    return res.status(201).json({success: true, message: `Board succesfully created`, data: data[0]})
    } catch (err) {
        console.log("Error", err)

        return res.status(500).json({success: false, message: "500 Internal Server Error"}); 
    }
}

export const deleteBoard = async (req, res) => {
    const {id} = req.params
    
    try {
           const delete_board = await sql`DELETE FROM boards WHERE created_by =${req.user.id} AND id = ${id}
                     RETURNING *`;
   
        if (delete_board.length === 0) { 
        
            return res.status(404).json({success: false, message: "No board was found" })

        } 

        return res.status(200).json({success: true, message: "Successfully deleted" });

    } catch (err) {
        console.log("error", err)
        return res.status(500).json({success: false, message: "Internal error server"});
       
    }
}

export const updateBoard = async (req, res) => {
    const {name} = req.body
    const {id} = req.params

    if (!name) {
        return res.status(400).json({success: false, message: "All fields need to be completed."})
    }

    try {
        
        await sql`UPDATE boards
                  SET name = ${name}
                  WHERE created_by = ${id}`;

    } catch(err) {
        console.log("Error", err);
        return res.status(500).json({success: false, message: "500 Internal error server."});
    }
}