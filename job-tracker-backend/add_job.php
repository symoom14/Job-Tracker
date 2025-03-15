<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Get raw POST data
$data = json_decode(file_get_contents("php://input"), true);

// Debug: Log received request
error_log("Received Data: " . print_r($data, true));

// If no data received, return error
if (!$data) {
    echo json_encode(["error" => "No data received"]);
    exit();
}

// Check if required fields are present
if (!isset($data['company'], $data['position'], $data['applied_date'])) {
    echo json_encode(["error" => "Missing required fields"]);
    exit();
}

include 'config.php';

// Escape input values to prevent SQL injection
$company = $conn->real_escape_string($data['company']);
$position = $conn->real_escape_string($data['position']);
$applied_date = $conn->real_escape_string($data['applied_date']);
$status = 'Applied';
$notes = isset($data['notes']) ? $conn->real_escape_string($data['notes']) : '';

// Insert into database
$sql = "INSERT INTO jobs (company, position, applied_date, status, notes) 
        VALUES ('$company', '$position', '$applied_date', '$status', '$notes')";

if ($conn->query($sql)) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["error" => "Database error: " . $conn->error]);
}
?>
