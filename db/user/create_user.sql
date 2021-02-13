INSERT INTO helo_users (username, password, profice_pic)
VALUES ($1, $2, $3)
returning *;



