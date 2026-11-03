export const getListsFromBoard = async (req, res) => {
        
        const {id} = req.params

        if (!id) {
                
                console.log("Not valid id. Try again.");
                return res.status(400).json({success: false, message: "Field not valid"});
        }

        try {
                const board = await sql`FROM lists JOIN boards ON lists.board_id `; 
                if (board.length > 0) {
                        return res.status(200).json({success: true, data: board[0]})
                } else {
                        return res.status(404).json({success: false, message: "List not found"})
                }

        } catch (err) {
                console.log("Error", err);
                res.status(500).json({success: false, message: "500 Internal Error Server"})
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