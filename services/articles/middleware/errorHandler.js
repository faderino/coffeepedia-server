const errorHandler = async (error, req, res, next) => {
    switch (error.name) {
        case "Data not found":
            res.status(404).json({ message: error.name })
            break;
        default:
            res.status(500).json({message: 'Internal Server Error'})
            break
    }
}

module.exports = errorHandler