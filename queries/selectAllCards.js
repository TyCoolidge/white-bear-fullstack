const selectAllCards = ` 
    SELECT 
        *
    FROM
        memory_cards
    WHERE
        memory_cards.user_id = ?
    ORDER BY 
        created_at DESC;
   `;
module.exports = selectAllCards;
