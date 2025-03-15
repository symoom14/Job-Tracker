<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

include 'config.php';

// Get JSON input data
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['id'], $data['status'])) {
    echo json_encode(["error" => "Missing job ID or status"]);
    exit();
}

$id = intval($data['id']);
$status = $conn->real_escape_string($data['status']);

$sql = "UPDATE jobs SET status = '$status' WHERE id = $id";

if ($conn->query($sql)) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["error" => "Database error: " . $conn->error]);
}
?>
