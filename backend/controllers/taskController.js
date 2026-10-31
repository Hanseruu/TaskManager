export const getTasksFromList = async (req, res) => {
        res.status(200).json({message: "fectching all the tasks from list"});

}

export const deleteTask = async (req, res) => {
        res.status(200).json({message: "task deleted"});

}

export const moveTask = async (req, res) => {
    res.status(200).json({message: "task moved successfully"});

}

export const createTask = async (req, res) => {
        res.status(201).json({message: "task created."})

}

