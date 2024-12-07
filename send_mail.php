<?php
require 'vendor/autoload.php'; // Include PHPMailer

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    header('Content-Type: application/json');
    $response = ['success' => false, 'message' => ''];

    // Sanitize and validate input
    $name = htmlspecialchars($_POST['from_name']);
    $email = filter_var($_POST['from_email'], FILTER_SANITIZE_EMAIL);
    $phone = htmlspecialchars($_POST['phone_number']);
    $message = htmlspecialchars($_POST['message']);

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $response['message'] = "Invalid email format";
        echo json_encode($response);
        exit;
    }

    // Initialize PHPMailer
    $mail = new PHPMailer(true);

    try {
        // SMTP configuration
        $mail->isSMTP();
        $mail->Host = 'smtp.example.com'; // Replace with your SMTP host
        $mail->SMTPAuth = true;
        $mail->Username = 'your_smtp_username'; // Replace with your SMTP username
        $mail->Password = 'your_smtp_password'; // Replace with your SMTP password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // Email content setup
        $mail->setFrom('your_email@example.com', 'Your Company Name'); // Use an email from your domain
        $mail->addAddress('fawazbello613@gmail.com'); // Recipient
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

        // Send email
        $mail->send();
        $response['success'] = true;
        $response['message'] = "Message sent successfully!";
    } catch (Exception $e) {
        $response['message'] = "Message could not be sent. Error: {$mail->ErrorInfo}";
    }

    echo json_encode($response);
}
