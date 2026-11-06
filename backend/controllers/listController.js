export const getListsFromBoard = async (req, res) => {
        
        const {id} = req.params

        try {
        
        const lists = await sql`SELECT lists.* 
                                FROM lists JOIN boards 
                                ON lists.board_id = boards.id 
                                WHERE lists.board_id = ${id} 
                                AND boards.created_by = ${req.user.id}`; 
                                
        return res.status(200).json({success: true, data: lists})
        
        } catch (err) {
                console.log("Error", err);
                return res.status(500).json({success: false, message: "500 Internal Error Server"})
        }
}

export const createList = async (req, res) => {
        const {id} = req.params
        const {name} = req.body
        const correctName = name?.trim()
        if (!correctName) {
                return res.status(400).json({success: false, message: "name field is required"});
        }

        try{
                const isYours = await sql`SELECT * FROM boards WHERE boards.id = ${id} and boards.created_by = ${req.user.id}`
                if (isYours.length > 0) {
                        const list = await sql`INSERT INTO lists (name, board_id)
                                   VALUES (${correctName}, ${id}) 
                                   RETURNING *`
                        if (list.length === 0) {
                                res.status(400).json({success: false, message: "Error creating the list"});
                        } else {
                                return res.status(201).json({success: true, data: list[0] })
                        }
                }
                return res.status(404).json({success: false, message: "Not exist"});
        } catch (err) {
                console.log("error", err)
                return res.status(500).json({success: false, message: "Internal Error Server"});
        }
}

export const deleteList = async (req, res) => {
        res.status(200).json({message: "list deleted"});

}

export const updateList = async (req,  res) => {
    res.status(200).json({message: "updated"});
}