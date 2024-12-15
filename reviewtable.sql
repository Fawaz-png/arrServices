CREATE TABLE testimonials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_name VARCHAR(255) NOT NULL,
    client_event VARCHAR(255) NOT NULL,
    testimonial_message TEXT NOT NULL,
    testimonial_rating INT NOT NULL CHECK (testimonial_rating BETWEEN 1 AND 5),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
