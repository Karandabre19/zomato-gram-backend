const { validationResult } = require("express-validator");

module.exports = (req, res, next) => {
    const validationError = validationResult(req);

    if(!validationError.isEmpty()){
       return res.status(400).json({
         message: "Validation failed",
         error: validationError.array(),
       });
    }

    next();
};
