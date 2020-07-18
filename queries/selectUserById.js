const selectUserById = ` 
    SELECT 
        id, email, created_at
    FROM
        users
    WHERE
        email = ?
    LIMIT 1;
   `;
module.exports = selectUserById;
