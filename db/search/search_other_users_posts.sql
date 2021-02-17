select p.id as post_id, title, content, img, profile_pic, date_created, username as author_username from helo_posts p
join helo_users u on u.id = p.author_id
where u.username != $1 ;