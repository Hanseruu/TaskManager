export const getListsFromBoard = async (req, res) => {
        
        const {id} = req.params

        try {
                const lists = await sql`SELECT lists.* FROM lists JOIN boards ON lists.board_id = boards.id WHERE lists.board_id = ${id} AND boards.created_by = ${req.user.id}`; 
                if (lists.length > 0) {
                        return res.status(200).json({success: true, data: lists})
                }

        } catch (err) {
                console.log("Error", err);
                return res.status(500).json({success: false, message: "500 Internal Error Server"})
        }
}

export const createList = async (req, res) => {
        res.status(201).json({message: "list created"});

}

export const deleteList = async (req, res) => {
        res.status(200).json({message: "list deleted"});

}

export const updateList = async (req,  res) => {
    res.status(200).json({message: "updated"});
}