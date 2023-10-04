<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Accept: application/json");

require("../../lib/core.php");
require("../../functions/public.php");

$params = $_POST['params']; // for client side

$id = $params['_id'];

$db = getConnection(); // You need to implement this function to get a database connection.
$blog = new Blog($db);

$data = $blog->getComment($id);
echo json_encode($data);
