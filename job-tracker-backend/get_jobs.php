<?php
header("Access-Control-Allow-Origin: *"); // Allow all origins
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include 'config.php';

$result = $conn->query("SELECT * FROM jobs");
echo json_encode($result->fetch_all(MYSQLI_ASSOC));
?>
