CREATE TABLE helo_users (
id	serial	primary key,
username	varchar(40)	not null,
password	varchar(40)	not null,
profile_pic	text);

INSERT INTO helo_users (username, password, profile_pic)
VALUES('justin@gmail.com', 'omgHana2','profile pics');


CREATE TABLE helo_posts (
id	serial	primary key,
title	varchar(45)	not null,
content	text,
img text,
author_id integer REFERENCES helo_users(id),
date_created TIMESTAMP);

INSERT INTO helo_posts (title, img)
VALUES ('today has been hard', 'rainyday.png'),
       ('today has been awesome', 'hawaii.png');