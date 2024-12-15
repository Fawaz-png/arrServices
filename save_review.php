<?php
include 'config.php'; // Include your database connection

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $client_name = $_POST['client_name'];
    $client_event = $_POST['client_event'];
    $testimonial_message = $_POST['testimonial_message'];
    $testimonial_rating = $_POST['testimonial_rating'];

    // Validate inputs
    if (empty($client_name) || empty($client_event) || empty($testimonial_message) || empty($testimonial_rating)) {
        echo json_encode(['success' => false, 'message' => 'All fields are required.']);
        exit;
    }

    // Save to database
    $stmt = $conn->prepare("INSERT INTO testimonials (client_name, client_event, testimonial_message, testimonial_rating) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("sssi", $client_name, $client_event, $testimonial_message, $testimonial_rating);

    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to save review.']);
    }

    $stmt->close();
    $conn->close();
}
