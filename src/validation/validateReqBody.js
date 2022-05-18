const validateReqBody = (req) => {
    if (typeof req.body.name !== "string") {
        throw {
            _message: "name must be a string",
            error: "Format Error",
        };
    }
    if (typeof req.body.cardnumber !== "string") {
        throw {
            _message: "cardnumber must be a string",
            error: "Format Error",
        };
    }
    if (typeof req.body.limit !== "number") {
        throw {
            _message: "limit must be a number",
            error: "Format Error",
        };
    }
};
exports.validateReqBody = validateReqBody;
