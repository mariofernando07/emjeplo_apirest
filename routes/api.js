var express = require("express");
var router = express.Router();

//otra forma para crear un midleware
router.param("collection", function (req, res, next, c) {
    req.c = req.db.collection(c);
});

module.exports = router;