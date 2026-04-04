<?php
/**
 * mail.php - KNS Furnitech Hostinger Mailer
 * Handles contact form submissions and sends emails directly from the server.
 */

// 1. Setup CORS (Allow your domain to talk to this script)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// 2. Configuration
$to_email = "Knsfurnitech@gmail.com"; // Change this if needed
$subject = "New Inquiry from KNS Furnitech Website";

// 3. Process Input
$json = file_get_contents('php://input');
$data = json_decode($json, true);

if (!$data) {
    echo json_encode(["ok" => false, "msg" => "No data received"]);
    exit;
}

$firstName = strip_tags($data['firstName'] ?? 'N/A');
$lastName = strip_tags($data['lastName'] ?? 'N/A');
$email = strip_tags($data['email'] ?? 'N/A');
$phone = strip_tags($data['phone'] ?? 'N/A');
$message = strip_tags($data['message'] ?? 'N/A');

// 4. Construct Email Body
$body = "
You have received a new inquiry from the KNS Furnitech contact form.

-------------------------------------------
Name: $firstName $lastName
Email: $email
Phone: $phone
-------------------------------------------

Message:
$message

-------------------------------------------
Sent from: " . $_SERVER['HTTP_HOST'] . "
Date: " . date("Y-m-d H:i:s") . "
";

$headers = "From: webmaster@" . $_SERVER['HTTP_HOST'] . "\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// 5. Send Email
if (mail($to_email, $subject, $body, $headers)) {
    echo json_encode(["ok" => true, "msg" => "Email sent successfully via Hostinger"]);
} else {
    echo json_encode(["ok" => false, "msg" => "Failed to send email. Check server mail logs."]);
}
?>
