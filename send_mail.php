<?php
require 'vendor/autoload.php'; // Include PHPMailer

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    header('Content-Type: application/json');
    $response = ['success' => false, 'message' => ''];

    // Sanitize and validate input
    $name = htmlspecialchars(trim($_POST['from_name']));
    $email = filter_var(trim($_POST['from_email']), FILTER_SANITIZE_EMAIL);
    $phone = htmlspecialchars(trim($_POST['phone_number']));
    $message = htmlspecialchars(trim($_POST['message']));

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $response['message'] = "Invalid email format.";
        echo json_encode($response);
        exit;
    }

    // Initialize PHPMailer
    $mail = new PHPMailer(true);

    try {
        // SMTP configuration
        $mail->isSMTP();
        $mail->Host = 'mail.arrservicesltd.co.uk'; // SMTP server
        $mail->SMTPAuth = true;
        $mail->Username = 'support1@arrservicesltd.co.uk'; // Email address
        $mail->Password = 'arrservicesltd'; // Email password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // Use SSL encryption
        $mail->Port = 465; // SMTP port for SSL

        // Email content setup
        $mail->setFrom('support1@arrservicesltd.co.uk', 'ArrServices Ltd');
        $mail->addAddress('info@arrservices.co.uk'); // Recipient
        $mail->addBCC('bellofawazolatunde@gmail.com'); // BCC recipient
        $mail->addReplyTo($email, $name);

        $mail->isHTML(true);
        $mail->CharSet = 'UTF-8';
        $mail->Subject = "New Event Inquiry from {$name}";
        $mail->Body = "
            <h2>New Event Inquiry</h2>
            <p><strong>Name:</strong> {$name}</p>
            <p><strong>Email:</strong> {$email}</p>
            <p><strong>Phone Number:</strong> {$phone}</p>
            <p><strong>Message:</strong></p>
            <p>{$message}</p>
        ";
        $mail->AltBody = "New Event Inquiry\n\nName: {$name}\nEmail: {$email}\nPhone: {$phone}\nMessage:\n{$message}";

        $mail->send();

        // If email is sent successfully
        $response['success'] = true;
        $response['message'] = "Message sent successfully!";
    } catch (Exception $e) {
        $response['message'] = "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }

    echo json_encode($response);
}
