<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Accept: application/json");

require("../../lib/core.php");
require("../../functions/admin.php");

$params = $_POST['params']; // for client side

$title = $params['_title'];
$content = $params['_content'];

$db = getConnection(); // You need to implement this function to get a database connection.
$admin = new Admin($db);

$data = $admin->addBlog($title, $content);
echo json_encode($data);
