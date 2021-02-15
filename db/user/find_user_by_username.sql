select * from helo_users
where username = $1
returning *;