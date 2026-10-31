export const getListsFromBoard = async (req, res) => {
        res.status(200).json({message: "getting all lists from a board"});
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