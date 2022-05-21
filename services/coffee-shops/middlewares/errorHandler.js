const errorHandler = (err, req, res, next) => {
  switch (err.name) {
    case "place_id required":
      res.status(err.statusCode).json({
        error: {
          message: "place_id is Required",
        },
      });
      break;
    case "name required":
      res.status(err.statusCode).json({
        error: {
          message: "name is Required",
        },
      });
      break;
    case "not found":
      res.status(err.statusCode).json({
        error: {
          message: "Data not Found",
        },
      });
      break;
    default:
      res.status(500).json({
        error: {
          message: "Internal Server Error",
        },
      });
      break;
  }
};

module.exports = errorHandler
