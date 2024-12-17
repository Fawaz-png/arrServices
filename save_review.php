<?php
// Database configuration
$host = 'localhost';
$dbname = 'arrserv1_Reviews';
$username = 'arrserv1_review';
$password = 'arrserviceslimited';

try {
    // PDO Connection
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Input validation
        $client_name = trim($_POST['client_name'] ?? '');
        $client_event = trim($_POST['client_event'] ?? '');
        $testimonial_message = trim($_POST['testimonial_message'] ?? '');
        $testimonial_rating = filter_var($_POST['testimonial_rating'], FILTER_VALIDATE_INT);

        // Validate required fields
        if (empty($client_name) || empty($client_event) || empty($testimonial_message) || !$testimonial_rating) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'All fields are required and must be valid.']);
            exit;
        }

        // Validate rating range (e.g., 1-5)
        if ($testimonial_rating < 1 || $testimonial_rating > 5) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Rating must be between 1 and 5.']);
            exit;
        }

        // Prepare and execute SQL
        $stmt = $pdo->prepare(
            "INSERT INTO testimonials (client_name, client_event, testimonial_message, testimonial_rating) 
             VALUES (:client_name, :client_event, :testimonial_message, :testimonial_rating)"
        );

        $stmt->execute([
            ':client_name' => $client_name,
            ':client_event' => $client_event,
            ':testimonial_message' => $testimonial_message,
            ':testimonial_rating' => $testimonial_rating,
        ]);

        http_response_code(200);
        echo json_encode(['success' => true, 'message' => 'Review submitted successfully.']);
    } else {
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
    }
} catch (PDOException $e) {
    // Log detailed errors (optional)
    error_log("Database error: " . $e->getMessage());

    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database error. Please try again later.']);
} catch (Exception $e) {
    // Log unexpected errors
    error_log("Unexpected error: " . $e->getMessage());

    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'An unexpected error occurred. Please try again later.']);
}
