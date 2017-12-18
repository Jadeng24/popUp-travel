INSERT INTO users
(   first_name,
    last_name,
    email,
    location_city,
    location_state,
    is_admin,
    auth_id,
    new_user)
VALUES
($1, $2, $3, $4, $5, $6, $7, $8)
RETURNING *;