const express = require("express");
const router = express.Router();
const SqliteAdapter = require("../adapters/sqlite");
const validateParams = require("../utils/paramsValidator");

/*
route for adding new user
*/
router.post("/api/addUser", async (req, res) => {
    try {

        let missingParams = validateParams(req.body, ['first_name', 'last_name', 'email', 'password']);
        if (missingParams.length > 0) {
            res.status(500).json({
                success: false,
                error: `missing parameter(s): ${missingParams.join(',')}`
            });
            return;
        }

        let sqlite = new SqliteAdapter();
        let userInfo = Object.assign({},req.body);
        if(!userInfo.description) {
            userInfo.description = "";
        }
        let insertRes = await sqlite.addNewUser(userInfo);
        if (insertRes.success) {
            res.json({
                success: true,
                error: null
            });
        } else {
            res.json({
                success: false,
                emailExists: insertRes.emailExists,
                error: insertRes.error
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
});

module.exports = router;
