// The users resource
const express = require("express");
const router = express.Router();
const db = require("../../db");
const selectUser = require("../../queries/selectUser");
const { toJson, toSafeParse } = require("../../utils/helpers");

// @route       GET api/v1/users
// @desc        Get a valid user based via email and password
// @access      Public
router.get("/", (req, res) => {
   db.query(selectUser("dylan@gmail.com", "replace_me"))
      .then((dbRes) => {
         const user = toSafeParse(toJson(dbRes))[0];
         // below is the broken down code of the const above
         // const jsonRes = toJson(res);
         // console.log(jsonRes);
         // const parsedRes = toSafeParse(jsonRes);
         // console.log(parsedRes);
         // const firstObj = parsedRes[0];
         // console.log(firstObj);
         // const user = firstObj;
         console.log(user);
         res.json(user);
      })
      .catch((err) => {
         console.log(err);
         res.status(400).json(err);
      });
});

module.exports = router;
