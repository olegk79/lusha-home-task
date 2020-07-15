const express = require("express");
const router = express.Router();
const SqliteAdapter = require("../adapters/sqlite");
const validateParams = require("../utils/paramsValidator");

/*
route for fetching users
*/
router.get("/api/users", async (req, res) => { 
    try {
        // if there are params supplied - validate first
        if(Object.keys(req.query).length > 0) {
            let missingParams = validateParams(req.query,['skip','limit']);
            if(missingParams.length>0) {
                res.json({
                    success: false,
                    error: `missing parameter(s): ${missingParams.join(',')}`,
                    data: null
                });
                return;
            }
        }

        let sqlite = new SqliteAdapter();
        let queryResult;
        if(Object.keys(req.query).length === 0) {
            queryResult = await sqlite.getAllUsers();
        } else {
            queryResult = await sqlite.getUsersPage(req.query.skip, req.query.limit);
        }
        res.json({
            success: true,
            data: queryResult,
            error: null
        });
    }
    catch(error) {
        res.status(500).json({
            success: false,
            error: error.message,
            data: null
        });
    }
});

module.exports = router;
