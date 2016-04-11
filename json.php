<?php
header('Content-Type: application/json; charset=utf-8');
$response = array(
    'name' => $_POST['user'],
    'password' => $_POST['pwd'],
);
echo json_encode($response, true);
?>
