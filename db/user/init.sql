DROP TABLE IF EXISTS helo_posts;
DROP TABLE IF EXISTS helo_users;

CREATE TABLE helo_users (
id	serial	primary key,
username	varchar(40)	not null,
password	varchar(5000) not null,
profile_pic	text);


CREATE TABLE helo_posts (
id	serial	primary key,
title	varchar(200)	not null,
content	text,
img text,
author_id integer NOT NULL REFERENCES helo_users(id),
date_created TIMESTAMP);


