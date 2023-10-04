<?php

class Admin {
  private $db;

  public function __construct($db) {
    $this->db = $db;
  }

  public function addBlog($title, $content) {
    $query = "INSERT INTO `blog_tbl` (`title`, `content`, `createdAt`) 
              VALUES (:title, :content, NOW())";
    
    try {
      $statement = $this->db->prepare($query);
      $arr = array(
        ":title" => $title,
        ":content" => $content,
      );

      if ($statement->execute($arr)) {
        $data = array(
          "message" => "New blog has been added successfully.",
          "status" => true,
        );

        return $data;
      } else {
        $data = array(
          "message" => "Error: Please try again",
          "status" => false,
        );

        return $data;
      }

    } catch (PDOException $e) {
      echo '{"error":{"text" ' . __FUNCTION__ . ':' . $e->getMessage() . '}}';
    }
  }
}
