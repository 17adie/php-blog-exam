CREATE DATABASE php_blog_exam_db;


CREATE TABLE blog_tbl(
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  createdAt DATETIME NOT NULL
);

CREATE TABLE blog_comments_tbl(
  id INT PRIMARY KEY AUTO_INCREMENT,
  comment TEXT NOT NULL,
  createdAt DATETIME NOT NULL,
  blogId INT,
  status INT
)