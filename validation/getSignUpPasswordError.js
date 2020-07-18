module.exports = function getSignUpPasswordError(password, email) {
   //array of unique characters
   if (password === "") {
      return "Please create a password.";
   }
   if (password.length < 9) {
      return "Your password must be at least 9 characters.";
   }
   if (checkHasLocalPart(password, email)) {
      return "Your email address cannot be used in your password.";
   }
   const uniqChars = [...new Set(password)];
   if (uniqChars.length < 3) {
      return "Your password must contain at least 3 unique characters.";
   }
   return "";
};

function checkHasLocalPart(password, email) {
   const localPart = email.split("@")[0];
   if (localPart === "") return false;
   //removes bug of displaying uniqChars error message
   else if (localPart.length < 4) return false;
   else return password.includes(localPart); // returns boolean(true)
}
