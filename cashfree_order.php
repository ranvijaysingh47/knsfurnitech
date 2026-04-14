<?php
/**
 * cashfree_order.php - KNS Furnitech Cashfree Order Proxy
 * Bridges the frontend and Cashfree API to solve CORS and secure the Secret Key.
 */

// 1. Setup CORS (Allow all origins for testing, restrict to your domain for production)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, x-api-version, x-client-id, x-client-secret");
header("Content-Type: application/json");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// 2. Configuration (KEEP SECURE)
$APP_ID = "TEST110517431c2462771dfa8211719634715011";
$SECRET_KEY = "cfsk_ma_test_69de04e44461b16d8194a728dccfa60d_ffcb5ba8";
$API_URL = "https://sandbox.cashfree.com/pg/orders";

// 3. Process Input
$json = file_get_contents('php://input');
$data = json_decode($json, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(["ok" => false, "msg" => "No order data received"]);
    exit;
}

// 4. Call Cashfree API via cURL
$ch = curl_init($API_URL);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Content-Type: application/json",
    "x-api-version: 2023-08-01",
    "x-client-id: $APP_ID",
    "x-client-secret: $SECRET_KEY"
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if (curl_errno($ch)) {
    http_response_code(500);
    echo json_encode(["ok" => false, "msg" => "cURL Error: " . curl_error($ch)]);
} else {
    http_response_code($http_code);
    echo $response;
}

curl_close($ch);
?>
