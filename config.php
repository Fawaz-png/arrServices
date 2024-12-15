<?php
// Database configuration
$host = 'localhost';       // Your database host (usually 'localhost')
$dbname = 'your_database'; // Replace with your database name
$username = 'root';        // Your database username
$password = '';            // Your database password (leave empty for default XAMPP setup)

try {
    // Create a new PDO connection
    $conn = new mysqli($host, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
} catch (Exception $e) {
    // Handle exceptions (optional)
    die("Database connection error: " . $e->getMessage());
}
