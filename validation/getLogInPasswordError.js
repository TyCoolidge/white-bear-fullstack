const db = require("../db");
const selectUserByEmail = require("../queries/selectUserByEmail");
const bcrypt = require("bcrypt");

module.exports = async function getLogInPasswordError(password, email) {
   //array of unique characters
   if (password === "") {
      return "Please enter your password.";
   }
   if ((await checkIsValidUser(email, password)) === false) {
      return "The email and password combination you entered is invalid.";
   }
   return "";
};

function checkIsValidUser(email, password) {
   // get the user by email address
   return db
      .query(selectUserByEmail, email)
      .then(async (users) => {
         const user = users[0];
         return await bcrypt
            .compare(password, user.password)
            .then((isValidUser) => {
               // isValidUser == true
               console.log(isValidUser);
               return isValidUser;
            })
            .catch((err) => {
               console.log(err);
            });
      })
      .catch((err) => {
         console.log(err);
      });
}
