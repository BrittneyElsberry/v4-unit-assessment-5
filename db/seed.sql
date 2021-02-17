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
author_id integer NOT NULL REFERENCES helo_users(id),
date_created TIMESTAMP);





INSERT INTO helo_posts (title, img)
VALUES ('today has been hard', 'rainyday.png'),
       ('today has been awesome', 'hawaii.png');


INSERT INTO helo_posts (title, content, img, author_id)
VALUES ('today was awesome', 'i killed it on my assessment', 'mydogiscool.png', 1);

DELETE FROM helo_posts
WHERE author_id IS null;

ALTER TABLE helo_posts
ALTER COLUMN author_id
SET NOT NULL;



INSERT INTO helo_posts (title, content, img, author_id)
VALUES ('snow', 'it snowed today', 'snow.png', 2);

