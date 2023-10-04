<?php

class Blog {
  private $db;

  public function __construct($db) {
    $this->db = $db;
  }

  public function getBlog(){
    $query = "SELECT id, title, content, createdAt FROM blog_tbl";

    try{
      $statement = $this->db->prepare($query);
      $statement->execute();
      $response = $statement->fetchAll(PDO::FETCH_OBJ);
      return $response;
    } catch(PDOException $e){
      echo '{"error":{"text" ' . __FUNCTION__ . ':' . $e->getMessage() . '}}';
    }

  }

  public function getPost($id){
    $query = "SELECT id, title, content, createdAt FROM blog_tbl WHERE id = :id";

    try{
      $statement = $this->db->prepare($query);
      $statement->bindParam(':id', $id, PDO::PARAM_INT);
      $statement->execute();
      $response = $statement->fetchAll(PDO::FETCH_OBJ);
      return $response;
    } catch(PDOException $e){
      echo '{"error":{"text" ' . __FUNCTION__ . ':' . $e->getMessage() . '}}';
    }

  }

  public function getComment($id){
    $query = "SELECT id, comment, createdAt, blogId FROM blog_comments_tbl WHERE blogId = :id ORDER BY createdAt DESC";

    try{
      $statement = $this->db->prepare($query);
      $statement->bindParam(':id', $id, PDO::PARAM_INT);
      $statement->execute();
      $response = $statement->fetchAll(PDO::FETCH_OBJ);
      return $response;
    } catch(PDOException $e){
      echo '{"error":{"text" ' . __FUNCTION__ . ':' . $e->getMessage() . '}}';
    }

  }


public function addComment($comment, $post_id) {
    $query = "INSERT INTO `blog_comments_tbl` (`comment`, `blogId`, `createdAt`) 
              VALUES (:comment, :post_id, NOW())";
    
    try {
      $statement = $this->db->prepare($query);
      $arr = array(
        ":comment" => $comment,
        ":post_id" => $post_id,
      );

      if ($statement->execute($arr)) {
        $data = array(
          "message" => "New comment has been added successfully.",
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
