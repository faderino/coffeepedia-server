const errorHandler = async (error, req, res, next) => {
    switch (error.name) {
        case "Data not found":
            res.status(404).json({ message: error.name })
            break;
        default:
            break;
    }
}

module.exports = errorHandler