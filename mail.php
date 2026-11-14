<?php
/**
 * mail.php — KNS Furnitech Unified Email Notification Engine
 * Handles:
 * 1. Newsletter Subscriptions (Alert to Admin + Welcome Email to Subscriber)
 * 2. Contact Inquiries & Bulk Orders (Alert to Admin with WhatsApp & Reply Links)
 * 3. Customer Order Confirmation (Branded Invoice to Customer + Alert to Admin)
 *
 * Runs self-hosted on Hostinger / cPanel PHP server without third-party subscriptions.
 */

// 1. CORS & Response Headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Only accept POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["ok" => false, "msg" => "Method Not Allowed. Use POST."]);
    exit;
}

// 2. Configuration
$ADMIN_EMAIL = "Knsfurnitech@gmail.com";
$COMPANY_NAME = "KNS Furnitech";
$SUPPORT_PHONE = "+91 73034 03811";
$COMPANY_WEBSITE = "https://" . ($_SERVER['HTTP_HOST'] ?? 'knsfurnitech.in');

// 3. Helper: Send Clean HTML Email
function sendKnsMail($to, $subject, $htmlBody, $replyTo = null) {
    $cleanTo = filter_var(trim($to), FILTER_VALIDATE_EMAIL);
    if (!$cleanTo) return false;

    $cleanSubject = str_replace(["\r", "\n"], '', $subject);
    $host = $_SERVER['HTTP_HOST'] ?? 'knsfurnitech.in';
    $host = explode(':', $host)[0]; // Remove port if any

    $headers = [];
    $headers[] = "MIME-Version: 1.0";
    $headers[] = "Content-Type: text/html; charset=UTF-8";
    $headers[] = "From: KNS Furnitech <no-reply@" . $host . ">";
    if ($replyTo && filter_var(trim($replyTo), FILTER_VALIDATE_EMAIL)) {
        $headers[] = "Reply-To: " . filter_var(trim($replyTo), FILTER_VALIDATE_EMAIL);
    }
    $headers[] = "X-Mailer: PHP/" . phpversion();

    return @mail($cleanTo, $cleanSubject, $htmlBody, implode("\r\n", $headers));
}

// 4. Parse JSON Input
$json = file_get_contents('php://input');
$data = json_decode($json, true);

if (!$data || !is_array($data)) {
    http_response_code(400);
    echo json_encode(["ok" => false, "msg" => "Invalid or empty JSON payload."]);
    exit;
}

$action = $data['action'] ?? '';

// Auto-detect action if not specified
if (empty($action)) {
    if (isset($data['order'])) {
        $action = 'order_confirmation';
    } elseif (isset($data['email']) && !isset($data['message']) && !isset($data['firstName']) && !isset($data['name'])) {
        $action = 'subscribe';
    } else {
        $action = 'inquiry';
    }
}

$currentDate = date("d M Y, h:i A");

// =========================================================================
// ACTION 1: NEWSLETTER SUBSCRIPTION
// =========================================================================
if ($action === 'subscribe') {
    $subscriberEmail = filter_var(trim($data['email'] ?? ''), FILTER_VALIDATE_EMAIL);

    if (!$subscriberEmail) {
        http_response_code(400);
        echo json_encode(["ok" => false, "msg" => "Please provide a valid email address."]);
        exit;
    }

    // Email to Admin
    $adminSubject = "New Newsletter Subscriber: " . $subscriberEmail;
    $adminHtml = "
    <div style='font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Arial, sans-serif; max-width: 580px; margin: 0 auto; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05);'>
        <div style='background: #111827; padding: 24px; text-align: center; border-bottom: 4px solid #8CC63F;'>
            <h1 style='color: #ffffff; margin: 0; font-size: 22px; letter-spacing: 1px;'>KNS FURNITECH</h1>
            <p style='color: #8CC63F; margin: 6px 0 0; font-size: 13px; font-weight: 600;'>Newsletter Notification</p>
        </div>
        <div style='padding: 28px; color: #1f2937;'>
            <h2 style='font-size: 18px; margin-top: 0; color: #111827;'>🎉 New Subscriber Joined!</h2>
            <p style='color: #4b5563; font-size: 14px; line-height: 1.5;'>A visitor has subscribed to the KNS Furnitech newsletter from your website.</p>
            <div style='background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; margin: 20px 0;'>
                <p style='margin: 0; font-size: 14px; color: #111827;'><strong>Email:</strong> <a href='mailto:{$subscriberEmail}' style='color: #8CC63F; text-decoration: none;'>{$subscriberEmail}</a></p>
                <p style='margin: 8px 0 0; font-size: 12px; color: #6b7280;'>Timestamp: {$currentDate}</p>
            </div>
            <p style='font-size: 12px; color: #9ca3af; margin-top: 24px; text-align: center;'>This is an automated notification from your website's self-hosted mailer.</p>
        </div>
    </div>";

    // Welcome Email to Subscriber
    $welcomeSubject = "Welcome to KNS Furnitech! 🛋️";
    $welcomeHtml = "
    <div style='font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Arial, sans-serif; max-width: 580px; margin: 0 auto; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05);'>
        <div style='background: #111827; padding: 24px; text-align: center; border-bottom: 4px solid #8CC63F;'>
            <h1 style='color: #ffffff; margin: 0; font-size: 22px; letter-spacing: 1px;'>KNS FURNITECH</h1>
            <p style='color: #8CC63F; margin: 6px 0 0; font-size: 13px; font-weight: 600;'>Ergonomic & Modular Furniture Specialists</p>
        </div>
        <div style='padding: 28px; color: #374151; font-size: 14px; line-height: 1.6;'>
            <h2 style='color: #111827; font-size: 20px; margin-top: 0;'>Thank you for subscribing!</h2>
            <p>Welcome to <strong>KNS Furnitech</strong>. We're excited to have you with us!</p>
            <p>As a subscriber, you will receive:</p>
            <ul style='color: #4b5563; padding-left: 20px;'>
                <li>Exclusive previews of our newest ergonomic and executive chair collections</li>
                <li>Commercial workspace & cafeteria furniture catalogs</li>
                <li>Special promotional offers and seasonal discounts</li>
            </ul>
            <div style='text-align: center; margin: 28px 0;'>
                <a href='{$COMPANY_WEBSITE}/shop.html' style='background: #8CC63F; color: #ffffff; padding: 12px 26px; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block; font-size: 14px;'>Explore Collections</a>
            </div>
            <hr style='border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;'>
            <p style='font-size: 12px; color: #6b7280; margin: 0;'>Have questions or need custom commercial furniture quotes? Contact our team at <a href='mailto:{$ADMIN_EMAIL}' style='color: #8CC63F;'>{$ADMIN_EMAIL}</a> or call <strong>{$SUPPORT_PHONE}</strong>.</p>
        </div>
    </div>";

    $adminSent = sendKnsMail($ADMIN_EMAIL, $adminSubject, $adminHtml, $subscriberEmail);
    $welcomeSent = sendKnsMail($subscriberEmail, $welcomeSubject, $welcomeHtml, $ADMIN_EMAIL);

    echo json_encode([
        "ok" => true,
        "msg" => "Subscription successful! Welcome email sent.",
        "adminNotified" => $adminSent,
        "welcomeSent" => $welcomeSent
    ]);
    exit;
}

// =========================================================================
// ACTION 2: CONTACT FORM / INQUIRY / BULK REQUEST
// =========================================================================
if ($action === 'inquiry') {
    $fn = htmlspecialchars($data['firstName'] ?? '', ENT_QUOTES, 'UTF-8');
    $ln = htmlspecialchars($data['lastName'] ?? '', ENT_QUOTES, 'UTF-8');
    $name = trim($fn . ' ' . $ln);
    if (empty($name)) {
        $name = htmlspecialchars($data['name'] ?? 'Website Visitor', ENT_QUOTES, 'UTF-8');
    }

    $email = filter_var(trim($data['email'] ?? ''), FILTER_VALIDATE_EMAIL) ?: 'No Email';
    $phone = htmlspecialchars($data['phone'] ?? $data['phoneNumber'] ?? 'N/A', ENT_QUOTES, 'UTF-8');
    $company = htmlspecialchars($data['companyName'] ?? '', ENT_QUOTES, 'UTF-8');
    $qty = htmlspecialchars(strval($data['quantity'] ?? ''), ENT_QUOTES, 'UTF-8');
    $productName = htmlspecialchars($data['productName'] ?? '', ENT_QUOTES, 'UTF-8');
    $message = nl2br(htmlspecialchars($data['message'] ?? 'No message text provided.', ENT_QUOTES, 'UTF-8'));
    $type = htmlspecialchars($data['type'] ?? 'General Inquiry', ENT_QUOTES, 'UTF-8');

    $isBulk = !empty($company) || !empty($qty) || $type === 'Bulk Inquiry';

    // WhatsApp clean number for quick reply
    $cleanPhone = preg_replace('/\D/', '', $phone);
    if (strlen($cleanPhone) === 10) $cleanPhone = '91' . $cleanPhone;
    $waUrl = !empty($cleanPhone) ? "https://wa.me/{$cleanPhone}?text=" . urlencode("Hello {$name}, thank you for contacting KNS Furnitech regarding your inquiry. How can we assist you?") : null;

    $adminSubject = ($isBulk ? "🏢 Bulk Inquiry: " : "✉️ New Inquiry: ") . $name;
    if (!empty($productName)) $adminSubject .= " (" . $productName . ")";

    $adminHtml = "
    <div style='font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05);'>
        <div style='background: #111827; padding: 24px; text-align: center; border-bottom: 4px solid #8CC63F;'>
            <h1 style='color: #ffffff; margin: 0; font-size: 22px; letter-spacing: 1px;'>KNS FURNITECH</h1>
            <p style='color: #8CC63F; margin: 6px 0 0; font-size: 13px; font-weight: 600;'>" . ($isBulk ? "Corporate Bulk Inquiry" : "Customer Inquiry") . "</p>
        </div>
        <div style='padding: 28px; color: #1f2937;'>
            <h2 style='font-size: 18px; margin-top: 0; color: #111827;'>New Message Received</h2>
            
            <table style='width: 100%; border-collapse: collapse; margin: 18px 0; font-size: 14px;'>
                <tr>
                    <td style='padding: 10px; border-bottom: 1px solid #f3f4f6; color: #6b7280; width: 35%;'><strong>Full Name:</strong></td>
                    <td style='padding: 10px; border-bottom: 1px solid #f3f4f6; color: #111827; font-weight: 600;'>{$name}</td>
                </tr>
                <tr>
                    <td style='padding: 10px; border-bottom: 1px solid #f3f4f6; color: #6b7280;'><strong>Email Address:</strong></td>
                    <td style='padding: 10px; border-bottom: 1px solid #f3f4f6; color: #111827;'><a href='mailto:{$email}' style='color: #8CC63F; text-decoration: none;'>{$email}</a></td>
                </tr>
                <tr>
                    <td style='padding: 10px; border-bottom: 1px solid #f3f4f6; color: #6b7280;'><strong>Phone:</strong></td>
                    <td style='padding: 10px; border-bottom: 1px solid #f3f4f6; color: #111827;'>{$phone}</td>
                </tr>";

    if (!empty($company)) {
        $adminHtml .= "
                <tr>
                    <td style='padding: 10px; border-bottom: 1px solid #f3f4f6; color: #6b7280;'><strong>Company:</strong></td>
                    <td style='padding: 10px; border-bottom: 1px solid #f3f4f6; color: #111827;'>{$company}</td>
                </tr>";
    }

    if (!empty($qty)) {
        $adminHtml .= "
                <tr>
                    <td style='padding: 10px; border-bottom: 1px solid #f3f4f6; color: #6b7280;'><strong>Required Quantity:</strong></td>
                    <td style='padding: 10px; border-bottom: 1px solid #f3f4f6; color: #111827; font-weight: 600;'>{$qty} Units</td>
                </tr>";
    }

    if (!empty($productName)) {
        $adminHtml .= "
                <tr>
                    <td style='padding: 10px; border-bottom: 1px solid #f3f4f6; color: #6b7280;'><strong>Product of Interest:</strong></td>
                    <td style='padding: 10px; border-bottom: 1px solid #f3f4f6; color: #111827; font-weight: 600;'>{$productName}</td>
                </tr>";
    }

    $adminHtml .= "
                <tr>
                    <td style='padding: 10px; border-bottom: 1px solid #f3f4f6; color: #6b7280;'><strong>Received At:</strong></td>
                    <td style='padding: 10px; border-bottom: 1px solid #f3f4f6; color: #6b7280;'>{$currentDate}</td>
                </tr>
            </table>

            <div style='background: #f9fafb; border-left: 4px solid #8CC63F; padding: 16px; border-radius: 4px; margin: 20px 0;'>
                <p style='margin: 0 0 6px 0; font-size: 12px; color: #6b7280; font-weight: 600; text-transform: uppercase;'>Customer Message:</p>
                <p style='margin: 0; font-size: 14px; line-height: 1.6; color: #374151;'>{$message}</p>
            </div>

            <div style='text-align: center; margin: 26px 0;'>";
    if ($email !== 'No Email') {
        $adminHtml .= "<a href='mailto:{$email}?subject=Regarding your inquiry at KNS Furnitech' style='background: #111827; color: #ffffff; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-size: 13px; font-weight: 600; display: inline-block; margin-right: 10px;'>Reply via Email</a>";
    }
    if ($waUrl) {
        $adminHtml .= "<a href='{$waUrl}' target='_blank' style='background: #25D366; color: #ffffff; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-size: 13px; font-weight: 600; display: inline-block;'>Chat on WhatsApp</a>";
    }
    $adminHtml .= "
            </div>
        </div>
    </div>";

    $replyToEmail = ($email !== 'No Email') ? $email : null;
    $sent = sendKnsMail($ADMIN_EMAIL, $adminSubject, $adminHtml, $replyToEmail);

    echo json_encode([
        "ok" => true,
        "msg" => "Inquiry received successfully! Admin notified.",
        "adminNotified" => $sent
    ]);
    exit;
}

// =========================================================================
// ACTION 3: ORDER CONFIRMATION & INVOICE
// =========================================================================
if ($action === 'order_confirmation') {
    $order = $data['order'] ?? $data;

    $orderId = htmlspecialchars($order['id'] ?? $order['orderNumber'] ?? 'KNS-' . time(), ENT_QUOTES, 'UTF-8');
    $customerName = htmlspecialchars($order['customerName'] ?? 'Valued Customer', ENT_QUOTES, 'UTF-8');
    $customerEmail = filter_var(trim($order['customerEmail'] ?? $order['email'] ?? ''), FILTER_VALIDATE_EMAIL);
    $phone = htmlspecialchars($order['phone'] ?? 'N/A', ENT_QUOTES, 'UTF-8');
    $address = htmlspecialchars(($order['address'] ?? '') . ', ' . ($order['city'] ?? '') . ' - ' . ($order['pincode'] ?? ''), ENT_QUOTES, 'UTF-8');
    $paymentMethod = htmlspecialchars($order['paymentMethod'] ?? 'Cash on Delivery', ENT_QUOTES, 'UTF-8');
    $paymentStatus = htmlspecialchars($order['paymentStatus'] ?? 'Confirmed', ENT_QUOTES, 'UTF-8');
    $totalAmount = number_format(floatval($order['total'] ?? 0), 2);
    $items = $order['items'] ?? [];

    // Build Items Table Rows
    $itemsHtml = '';
    foreach ($items as $item) {
        $iName = htmlspecialchars($item['name'] ?? 'Furniture Product', ENT_QUOTES, 'UTF-8');
        $iQty = intval($item['qty'] ?? 1);
        $iPrice = number_format(floatval($item['price'] ?? 0), 2);
        $iSubtotal = number_format(floatval(($item['price'] ?? 0) * $iQty), 2);
        $itemsHtml .= "
        <tr>
            <td style='padding: 12px 10px; border-bottom: 1px solid #f3f4f6; color: #111827;'>{$iName}</td>
            <td style='padding: 12px 10px; border-bottom: 1px solid #f3f4f6; color: #4b5563; text-align: center;'>{$iQty}</td>
            <td style='padding: 12px 10px; border-bottom: 1px solid #f3f4f6; color: #4b5563; text-align: right;'>₹{$iPrice}</td>
            <td style='padding: 12px 10px; border-bottom: 1px solid #f3f4f6; color: #111827; text-align: right; font-weight: 600;'>₹{$iSubtotal}</td>
        </tr>";
    }

    if (empty($itemsHtml)) {
        $itemsHtml = "<tr><td colspan='4' style='padding: 15px; text-align: center; color: #9ca3af;'>Furniture Order Items</td></tr>";
    }

    // 1. Email to Customer (Tax Invoice & Order Confirmation)
    $customerSubject = "Order Confirmed: #{$orderId} — KNS Furnitech";
    $customerHtml = "
    <div style='font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Arial, sans-serif; max-width: 620px; margin: 0 auto; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05);'>
        <div style='background: #111827; padding: 26px; text-align: center; border-bottom: 4px solid #8CC63F;'>
            <h1 style='color: #ffffff; margin: 0; font-size: 22px; letter-spacing: 1px;'>KNS FURNITECH</h1>
            <p style='color: #8CC63F; margin: 6px 0 0; font-size: 13px; font-weight: 600;'>Order Confirmation & Invoice Receipt</p>
        </div>
        <div style='padding: 30px; color: #374151;'>
            <div style='text-align: center; margin-bottom: 24px;'>
                <span style='background: #ecfdf5; color: #059669; padding: 6px 14px; border-radius: 20px; font-size: 13px; font-weight: 600;'>✓ Order #{$orderId} Placed Successfully</span>
                <h2 style='font-size: 20px; margin: 14px 0 6px 0; color: #111827;'>Thank you, {$customerName}!</h2>
                <p style='color: #6b7280; font-size: 14px; margin: 0;'>Your furniture order has been received and is being prepared for fulfillment.</p>
            </div>

            <div style='background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 18px; margin-bottom: 24px;'>
                <table style='width: 100%; border-collapse: collapse; font-size: 13px;'>
                    <tr>
                        <td style='color: #6b7280; padding-bottom: 6px;'>Order Date:</td>
                        <td style='color: #111827; font-weight: 600; text-align: right; padding-bottom: 6px;'>{$currentDate}</td>
                    </tr>
                    <tr>
                        <td style='color: #6b7280; padding-bottom: 6px;'>Payment Method:</td>
                        <td style='color: #111827; font-weight: 600; text-align: right; padding-bottom: 6px;'>{$paymentMethod} ({$paymentStatus})</td>
                    </tr>
                    <tr>
                        <td style='color: #6b7280;'>Delivery Address:</td>
                        <td style='color: #111827; font-weight: 600; text-align: right;'>{$address}</td>
                    </tr>
                </table>
            </div>

            <h3 style='font-size: 16px; margin: 20px 0 10px 0; color: #111827;'>Order Summary</h3>
            <table style='width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 20px;'>
                <thead>
                    <tr style='background: #f3f4f6; color: #4b5563; text-align: left;'>
                        <th style='padding: 10px;'>Item</th>
                        <th style='padding: 10px; text-align: center;'>Qty</th>
                        <th style='padding: 10px; text-align: right;'>Price</th>
                        <th style='padding: 10px; text-align: right;'>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {$itemsHtml}
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan='3' style='padding: 14px 10px; font-weight: 700; color: #111827; text-align: right; font-size: 15px;'>Grand Total:</td>
                        <td style='padding: 14px 10px; font-weight: 800; color: #111827; text-align: right; font-size: 16px; border-top: 2px solid #111827;'>₹{$totalAmount}</td>
                    </tr>
                </tfoot>
            </table>

            <div style='text-align: center; margin: 30px 0;'>
                <a href='{$COMPANY_WEBSITE}/track-order.html?id={$orderId}' style='background: #8CC63F; color: #ffffff; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block; font-size: 14px;'>Track Order Status</a>
            </div>

            <hr style='border: none; border-top: 1px solid #e5e7eb; margin: 26px 0;'>
            <p style='font-size: 12px; color: #6b7280; text-align: center; margin: 0;'>
                Questions about your delivery? Reply directly to this email or call our desk at <strong>{$SUPPORT_PHONE}</strong>.<br>
                &copy; " . date('Y') . " KNS Furnitech. All Rights Reserved.
            </p>
        </div>
    </div>";

    // 2. Email to Admin (New Order Alert)
    $adminOrderSubject = "🛍️ New Order Received: #{$orderId} (₹{$totalAmount})";
    $adminOrderHtml = "
    <div style='font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Arial, sans-serif; max-width: 620px; margin: 0 auto; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05);'>
        <div style='background: #111827; padding: 24px; text-align: center; border-bottom: 4px solid #8CC63F;'>
            <h1 style='color: #ffffff; margin: 0; font-size: 22px; letter-spacing: 1px;'>KNS FURNITECH</h1>
            <p style='color: #8CC63F; margin: 6px 0 0; font-size: 13px; font-weight: 600;'>🚨 New Website Order Alert</p>
        </div>
        <div style='padding: 28px; color: #1f2937;'>
            <h2 style='font-size: 18px; margin-top: 0; color: #111827;'>Order #{$orderId} Received</h2>
            <div style='background: #ecfdf5; border-left: 4px solid #059669; padding: 14px; border-radius: 4px; margin-bottom: 20px;'>
                <p style='margin: 0; font-size: 15px; color: #065f46; font-weight: bold;'>Total: ₹{$totalAmount} &bull; {$paymentMethod} ({$paymentStatus})</p>
            </div>

            <h3 style='font-size: 15px; color: #111827; margin: 16px 0 8px 0;'>Customer & Shipping Details</h3>
            <table style='width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 20px;'>
                <tr>
                    <td style='padding: 6px 0; color: #6b7280; width: 35%;'>Customer Name:</td>
                    <td style='padding: 6px 0; color: #111827; font-weight: 600;'>{$customerName}</td>
                </tr>
                <tr>
                    <td style='padding: 6px 0; color: #6b7280;'>Email:</td>
                    <td style='padding: 6px 0; color: #111827;'>{$customerEmail}</td>
                </tr>
                <tr>
                    <td style='padding: 6px 0; color: #6b7280;'>Phone:</td>
                    <td style='padding: 6px 0; color: #111827; font-weight: 600;'>{$phone}</td>
                </tr>
                <tr>
                    <td style='padding: 6px 0; color: #6b7280;'>Shipping Address:</td>
                    <td style='padding: 6px 0; color: #111827;'>{$address}</td>
                </tr>
            </table>

            <h3 style='font-size: 15px; color: #111827; margin: 20px 0 8px 0;'>Items</h3>
            <table style='width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 20px;'>
                <thead>
                    <tr style='background: #f3f4f6; color: #4b5563;'>
                        <th style='padding: 8px; text-align: left;'>Item</th>
                        <th style='padding: 8px; text-align: center;'>Qty</th>
                        <th style='padding: 8px; text-align: right;'>Price</th>
                        <th style='padding: 8px; text-align: right;'>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    {$itemsHtml}
                </tbody>
            </table>

            <div style='text-align: center; margin: 26px 0;'>
                <a href='{$COMPANY_WEBSITE}/admin.html' style='background: #111827; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-size: 13px; font-weight: 600; display: inline-block;'>View in Admin Dashboard</a>
            </div>
        </div>
    </div>";

    $customerSent = false;
    if ($customerEmail) {
        $customerSent = sendKnsMail($customerEmail, $customerSubject, $customerHtml, $ADMIN_EMAIL);
    }
    $adminSent = sendKnsMail($ADMIN_EMAIL, $adminOrderSubject, $adminOrderHtml, $customerEmail);

    echo json_encode([
        "ok" => true,
        "msg" => "Order emails dispatched successfully.",
        "customerEmailSent" => $customerSent,
        "adminNotified" => $adminSent
    ]);
    exit;
}

// Fallback for unknown action
http_response_code(400);
echo json_encode(["ok" => false, "msg" => "Unknown action specified."]);
?>
